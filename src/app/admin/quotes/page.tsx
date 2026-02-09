export default function QuotesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quotes</h1>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Quote #</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Customer</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Style</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Total</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-8 text-center text-gray-500" colSpan={6}>
                No quotes yet. Connect Supabase to see submitted quotes.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
