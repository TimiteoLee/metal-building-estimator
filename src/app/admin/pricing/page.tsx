export default function PricingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pricing Management</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Building Styles</h2>
          <p className="text-gray-500 text-sm mb-4">Manage base prices for each building style and size combination.</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            Connect Supabase and run the seed migration to populate pricing data. Prices can then be edited directly here.
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Option Pricing</h2>
          <p className="text-gray-500 text-sm mb-4">Manage prices for gauge upgrades, bracing, trusses, and other options.</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            Connect Supabase to manage option pricing.
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Wall & Door Pricing</h2>
          <p className="text-gray-500 text-sm">Manage wall enclosure and door option prices.</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Lean-To Pricing</h2>
          <p className="text-gray-500 text-sm">Manage lean-to base prices and connection fees.</p>
        </div>
      </div>
    </div>
  )
}
