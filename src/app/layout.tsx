import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Project Gutenberg Explorer',
  description: 'Explore and analyze books from Project Gutenberg.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" passHref>
                <div className="text-xl font-bold text-gray-800">Gutenberg Explorer</div>
              </Link>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                </li>
                <li>
                  <Link href="/books" className="text-gray-700 hover:text-gray-900">Books</Link>
                </li>
              </ul>
            </nav>
          </header>

          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="bg-white border-t border-gray-200 py-4 text-center">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} Project Gutenberg Explorer. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
