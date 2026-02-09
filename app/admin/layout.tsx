export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#f1f5f9_60%,#ecfeff_100%)]">
      {children}
    </div>
  );
}
