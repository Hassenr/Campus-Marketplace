import '@/src/app/globals.css';
import Footer from '@/src/components/layout/Footer';
import Header from '../components/layout/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen max-w-7xl mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}