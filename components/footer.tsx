import { SubscribeForm } from "./subscribe-form"

export function Footer() {
  return (
    <footer className="bg-[#2F3E1F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay ahead of the curve</h3>
            <SubscribeForm />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-gray-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-300">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/donate" className="hover:text-gray-300">
                    Donate
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            AI Digest is a project of Sage, a 501(c)(3) charity registered in the US.
          </p>
          <p className="text-sm text-gray-400 mt-1">Our mission is to build tools to make sense of the future.</p>
        </div>
      </div>
    </footer>
  )
}

