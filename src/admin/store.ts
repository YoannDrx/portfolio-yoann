import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createAdminStoreSeed } from "@/admin/data";
import {
  AdminUser,
  AdminStore,
  ApplicationItem,
  ApplicationStatus,
  ContentSnapshot,
  ExperienceAsset,
  Persona,
} from "@/admin/types";
import { hashPassword } from "@/lib/password";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "admin-store.json");

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(STORE_FILE);
  } catch {
    const seed = createAdminStoreSeed();
    await fs.writeFile(STORE_FILE, JSON.stringify(seed, null, 2), "utf8");
  }
}

function normalizeStore(value: AdminStore): AdminStore {
  const seed = createAdminStoreSeed();
  const hasBusinessData =
    Boolean(value.activities?.length) ||
    Boolean(value.personas?.length) ||
    Boolean(value.experienceAssets?.length) ||
    Boolean(value.applications?.length) ||
    Boolean(value.contentSnapshots?.length);

  return {
    activities: hasBusinessData ? value.activities || [] : seed.activities,
    personas: hasBusinessData ? value.personas || [] : seed.personas,
    experienceAssets: hasBusinessData ? value.experienceAssets || [] : seed.experienceAssets,
    applications: hasBusinessData ? value.applications || [] : seed.applications,
    contentSnapshots: hasBusinessData ? value.contentSnapshots || [] : seed.contentSnapshots,
    adminUsers: value.adminUsers || [],
    updatedAt: value.updatedAt || new Date().toISOString(),
  };
}

export async function readAdminStore(): Promise<AdminStore> {
  await ensureStoreFile();

  try {
    const raw = await fs.readFile(STORE_FILE, "utf8");
    const parsed = JSON.parse(raw) as AdminStore;
    return normalizeStore(parsed);
  } catch {
    const seed = createAdminStoreSeed();
    await fs.writeFile(STORE_FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
}

async function writeAdminStore(store: AdminStore) {
  const normalized: AdminStore = {
    ...store,
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(STORE_FILE, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}

export async function mutateAdminStore(mutator: (current: AdminStore) => void | AdminStore) {
  const current = await readAdminStore();
  const draft = structuredClone(current);
  const maybeNext = mutator(draft);
  const next = maybeNext || draft;
  return writeAdminStore(next);
}

export function createId(prefix: string) {
  return `${prefix}-${randomUUID().slice(0, 8)}`;
}

export async function addAsset(input: {
  activityId: ExperienceAsset["activityId"];
  title: string;
  organization: string;
  period: string;
  location: string;
  highlights: string[];
  skills: string[];
  metrics?: string[];
}) {
  return mutateAdminStore((store) => {
    const asset: ExperienceAsset = {
      id: createId("asset"),
      activityId: input.activityId,
      title: input.title,
      organization: input.organization,
      period: input.period,
      location: input.location,
      verified: false,
      highlights: input.highlights,
      skills: input.skills,
      metrics: input.metrics?.length ? input.metrics : [],
    };

    store.experienceAssets.unshift(asset);
  });
}

export async function setAssetVerified(assetId: string, verified: boolean) {
  return mutateAdminStore((store) => {
    const asset = store.experienceAssets.find((item) => item.id === assetId);
    if (!asset) {
      throw new Error("Asset not found");
    }
    asset.verified = verified;
  });
}

export async function addApplication(input: {
  company: string;
  role: string;
  personaId: string;
  source: string;
  status?: ApplicationStatus;
}) {
  return mutateAdminStore((store) => {
    const personaExists = store.personas.some((persona) => persona.id === input.personaId);
    if (!personaExists) {
      throw new Error("Persona not found");
    }

    const application: ApplicationItem = {
      id: createId("app"),
      company: input.company,
      role: input.role,
      personaId: input.personaId,
      source: input.source,
      status: input.status || "target",
      lastUpdate: new Date().toISOString().slice(0, 10),
    };

    store.applications.unshift(application);
  });
}

export async function setApplicationStatus(applicationId: string, status: ApplicationStatus) {
  return mutateAdminStore((store) => {
    const application = store.applications.find((item) => item.id === applicationId);
    if (!application) {
      throw new Error("Application not found");
    }

    application.status = status;
    application.lastUpdate = new Date().toISOString().slice(0, 10);
  });
}

export async function addSnapshot(input: {
  label: string;
  notes: string;
  updatedBy: string;
}) {
  return mutateAdminStore((store) => {
    const snapshot: ContentSnapshot = {
      id: createId("snapshot"),
      label: input.label,
      status: "draft",
      updatedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      updatedBy: input.updatedBy,
      notes: input.notes,
    };

    store.contentSnapshots.unshift(snapshot);
  });
}

export async function publishSnapshot(snapshotId: string) {
  return mutateAdminStore((store) => {
    let exists = false;

    store.contentSnapshots = store.contentSnapshots.map((snapshot) => {
      if (snapshot.id === snapshotId) {
        exists = true;
        return {
          ...snapshot,
          status: "published",
          updatedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        };
      }

      return {
        ...snapshot,
        status: "draft",
      };
    });

    if (!exists) {
      throw new Error("Snapshot not found");
    }
  });
}

export async function addPersona(input: {
  activityId: Persona["activityId"];
  name: string;
  headline: string;
  targetRoles: string[];
  baseSummary: string;
  coreSkills: string[];
  atsKeywords: string[];
}) {
  return mutateAdminStore((store) => {
    const persona: Persona = {
      id: createId("persona"),
      activityId: input.activityId,
      name: input.name,
      headline: input.headline,
      targetRoles: input.targetRoles,
      baseSummary: input.baseSummary,
      coreSkills: input.coreSkills,
      atsKeywords: input.atsKeywords,
    };

    store.personas.unshift(persona);
  });
}

export async function upsertAdminUser(input: { email: string; password: string }) {
  const normalizedEmail = input.email.trim().toLowerCase();
  const passwordData = hashPassword(input.password);

  return mutateAdminStore((store) => {
    const now = new Date().toISOString();
    const existingUser = store.adminUsers.find((user) => user.email.toLowerCase() === normalizedEmail);

    if (existingUser) {
      existingUser.passwordHash = passwordData.hash;
      existingUser.passwordSalt = passwordData.salt;
      existingUser.updatedAt = now;
      existingUser.isActive = true;
      return;
    }

    const user: AdminUser = {
      id: createId("admin"),
      email: normalizedEmail,
      passwordHash: passwordData.hash,
      passwordSalt: passwordData.salt,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    store.adminUsers.unshift(user);
  });
}

export async function markAdminLogin(email: string) {
  return mutateAdminStore((store) => {
    const user = store.adminUsers.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!user) return;

    const now = new Date().toISOString();
    user.lastLoginAt = now;
    user.updatedAt = now;
  });
}
