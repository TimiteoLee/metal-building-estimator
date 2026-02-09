import Link from 'next/link'

export const metadata = {
  title: 'Admin | Metal Building Estimator',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Admin sidebar */}
      <aside className="w-56 bg-gray-900 text-white flex-shrink-0">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-sm font-bold">Metal Buildings Co.</h1>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>
        <nav className="p-3 space-y-1">
          {[
            { href: '/admin', label: 'Dashboard' },
            { href: '/admin/quotes', label: 'Quotes' },
            { href: '/admin/pricing', label: 'Pricing' },
            { href: '/admin/settings', label: 'Settings' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-3 border-t border-gray-800">
          <Link href="/" className="block px-3 py-2 rounded text-xs text-gray-500 hover:text-gray-300">
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
