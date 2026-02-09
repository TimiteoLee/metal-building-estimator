import Link from 'next/link'

export const metadata = {
  title: 'Your Quote | Metal Building Estimator',
}

export default function QuoteViewPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">Metal Buildings Co.</h1>
          <Link href="/configure" className="text-sm text-blue-600 hover:text-blue-700">
            Design a New Building
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quote #{params.id}</h2>
          <p className="text-gray-600 mb-6">
            This page will display the full quote details with an interactive 3D viewer,
            spec sheet, and pricing breakdown once Supabase is connected.
          </p>

          <div className="flex gap-4 justify-center">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
              Download PDF
            </button>
            <a
              href="mailto:info@metalbuildings.com?subject=Quote Changes"
              className="inline-flex items-center px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Request Changes
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
