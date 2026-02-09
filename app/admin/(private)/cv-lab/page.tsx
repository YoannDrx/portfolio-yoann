import CvLabComposer from "@/components/admin/CvLabComposer";

export default function AdminCvLabPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">CV Lab</h2>
        <p className="text-sm text-slate-500">
          Compose des versions CV par persona, en controlant precisement les preuves incluses.
        </p>
      </div>
      <CvLabComposer />
    </div>
  );
}
