import OfferMatcher from "@/components/admin/OfferMatcher";

export default function AdminOffersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Offer Matching</h2>
        <p className="text-sm text-slate-500">
          Colle une offre, selectionne ta persona, puis genere des recommandations activables pour ton CV.
        </p>
      </div>
      <OfferMatcher />
    </div>
  );
}
