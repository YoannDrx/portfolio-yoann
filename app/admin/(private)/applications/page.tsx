import ApplicationsManager from "@/components/admin/ApplicationsManager";

export default function AdminApplicationsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Applications Pipeline</h2>
        <p className="text-sm text-slate-500">
          Suivi unifie des candidatures par persona, du ciblage initial a l'offre finale.
        </p>
      </div>

      <ApplicationsManager />
    </div>
  );
}
