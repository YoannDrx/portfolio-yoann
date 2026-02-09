import ContentManager from "@/components/admin/ContentManager";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-slate-900">Public Content Control</h2>
        <p className="text-sm text-slate-500">
          Versionne les contenus publics sans toucher la vitrine recruteurs. Preview d'abord, publication ensuite.
        </p>
      </section>

      <ContentManager />
    </div>
  );
}
