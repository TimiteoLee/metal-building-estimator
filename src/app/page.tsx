import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Metal Buildings Co.
          </h1>
          <nav className="flex items-center gap-6">
            <Link href="/configure" className="text-sm text-gray-600 hover:text-gray-900">
              Design Your Building
            </Link>
            <Link href="/admin/login" className="text-sm text-gray-500 hover:text-gray-700">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Design Your Custom<br />Metal Building
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Use our interactive 3D configurator to design your metal building, carport, or shed.
            Choose your style, dimensions, colors, doors, and more — get instant pricing
            and a detailed PDF proposal sent to your email.
          </p>
          <Link
            href="/configure"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
          >
            Start Designing
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </section>

        {/* Features */}
        <section className="bg-white border-t border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Interactive 3D Viewer</h3>
                <p className="text-gray-600 text-sm">
                  See your building come to life in real-time 3D as you configure every detail.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Instant Pricing</h3>
                <p className="text-gray-600 text-sm">
                  Get live pricing updates as you customize. No waiting for a callback.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">PDF Proposal</h3>
                <p className="text-gray-600 text-sm">
                  Receive a professional proposal with 3D renders, specs, and pricing emailed directly to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Building Types */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-center mb-10">What We Build</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Metal Buildings', desc: 'Workshops, garages, storage buildings' },
                { title: 'Post Frame', desc: 'Barns, agricultural buildings, pole barns' },
                { title: 'Carports', desc: 'Vehicle shelters, RV covers' },
                { title: 'Sheds', desc: 'Storage sheds, garden buildings' },
              ].map((item) => (
                <Link
                  key={item.title}
                  href="/configure"
                  className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="w-full h-32 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400 text-sm">
                    3D Preview
                  </div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Metal Buildings Co. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
