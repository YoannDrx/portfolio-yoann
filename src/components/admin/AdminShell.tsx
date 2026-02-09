"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LogOut, PanelLeftClose, PanelLeftOpen, ShieldCheck } from "lucide-react";
import { adminNavItems } from "./admin-nav";
import { cn } from "@/lib/utils";

interface AdminShellProps {
  email: string;
  children: React.ReactNode;
}

export default function AdminShell({ email, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pageTitle = useMemo(() => {
    const item = adminNavItems.find((nav) => nav.href === pathname);
    return item?.label || "Admin";
  }, [pathname]);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,116,144,0.12),transparent_40%),radial-gradient(circle_at_90%_10%,_rgba(16,185,129,0.14),transparent_32%),linear-gradient(180deg,#f8fafc,#f1f5f9)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-4 p-4 lg:p-6">
        <aside
          className={cn(
            "relative rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-all duration-300",
            collapsed ? "w-[92px]" : "w-[300px]"
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className={cn("flex items-center gap-3", collapsed && "justify-center")}> 
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 text-white shadow-md">
                <ShieldCheck className="h-5 w-5" />
              </div>
              {!collapsed && (
                <div>
                  <p className="text-sm font-semibold tracking-wide text-slate-900">Yoann Admin</p>
                  <p className="text-xs text-slate-500">Dashboard prive</p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:text-slate-900"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          </div>

          <nav className="space-y-2">
            {adminNavItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl border px-3 py-3 transition",
                    active
                      ? "border-cyan-200 bg-cyan-50 shadow-sm"
                      : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      active
                        ? "bg-gradient-to-br from-cyan-500 to-teal-500 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {!collapsed && (
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{item.label}</p>
                      <p className="truncate text-xs text-slate-500">{item.description}</p>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className={cn("mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3", collapsed && "text-center")}> 
            {!collapsed && (
              <>
                <p className="text-xs text-slate-500">Session</p>
                <p className="truncate text-sm font-medium text-slate-900">{email}</p>
              </>
            )}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={cn(
                "mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-70",
                collapsed && "w-full justify-center"
              )}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && (isLoggingOut ? "Deconnexion..." : "Se deconnecter")}
            </button>
          </div>
        </aside>

        <div className="flex-1 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.5)] backdrop-blur-xl md:p-8">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Private workspace</p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600">
              Evidence-first mode active
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
