import '@/src/app/globals.css';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';

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