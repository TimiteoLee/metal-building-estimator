export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Total Quotes</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-400 mt-1">Connect Supabase to see data</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">This Week</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Estimated Revenue</p>
          <p className="text-3xl font-bold text-green-600">$0</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Quotes</h2>
        <p className="text-gray-500 text-sm">No quotes yet. Quotes will appear here once customers submit designs.</p>
      </div>
    </div>
  )
}
