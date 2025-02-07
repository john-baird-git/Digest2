import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-semibold text-xl">
          AI Digest
        </Link>
        <div className="flex gap-6">
          <Link href="/demos" className="text-gray-600 hover:text-gray-900">
            Demos and explainers
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Link href="/careers" className="text-gray-600 hover:text-gray-900">
            Careers
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}

