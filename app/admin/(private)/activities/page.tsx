import ActivitiesManager from "@/components/admin/ActivitiesManager";

export default function AdminActivitiesPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-slate-900">Activities & Personas</h2>
        <p className="text-sm text-slate-500">Base de connaissance multi-activite qui alimente le matching et le CV Lab.</p>
      </section>

      <ActivitiesManager />
    </div>
  );
}
