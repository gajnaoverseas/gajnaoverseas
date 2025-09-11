import Link from 'next/link';
import Image from 'next/image';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Simple Header for Blog Pages */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.webp" alt="Gajna Coffee" width={40} height={40} />
              <span className="text-xl font-bold text-coffee-brown">Gajna Coffee</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-coffee-brown">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-coffee-brown">Products</Link>
              <Link href="/blog" className="text-coffee-brown font-medium">Blog</Link>
              <Link href="/contact" className="text-gray-700 hover:text-coffee-brown">Contact</Link>
            </nav>
          </div>
        </div>
      </header>
      
      {children}
      
      {/* Simple Footer for Blog Pages */}
      <footer className="bg-coffee-brown text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Gajna Coffee. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="/" className="hover:text-coffee-gold">Home</Link>
            <Link href="/products" className="hover:text-coffee-gold">Products</Link>
            <Link href="/contact" className="hover:text-coffee-gold">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  );
}