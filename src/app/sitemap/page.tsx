import Link from "next/link";

export const metadata = {
  title: "Sitemap | Gajna Overseas Private Limited",
  description:
    "Browse all pages of Gajna Overseas — products, registrations, blog, gallery, enquiries, suppliers, and contact.",
};

export default function SitemapPage() {
  const lastUpdated = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const sections: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Primary Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Arabica", href: "/arabica" },
        { label: "Robusta", href: "/robusta" },
        { label: "Search Coffee Grades", href: "/search" },
        { label: "Registrations & Certificates", href: "/registrations" },
        { label: "Blog", href: "/blog" },
        { label: "Gallery", href: "/gallery" },
      ],
    },
    {
      title: "Business",
      links: [
        { label: "Trade Enquiry", href: "/trade-enquiry" },
        { label: "Become a Supplier", href: "/coffee-suppliers" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ — Contact Page", href: "/contact#frequently-asked-questions" },
        { label: "About Us", href: "/about" },
      ],
    },
  ];

  return (
    <section className="bg-white min-h-screen py-56">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Sitemap</h1>
          <p className="mt-2 text-gray-600">Last updated: {lastUpdated}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {s.title}
              </h2>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-700 border border-gray-200"
                    >
                      <span className="text-sm sm:text-base">{l.label}</span>
                      <span aria-hidden className="text-xs text-gray-500">
                        {l.href}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-block rounded-full bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}