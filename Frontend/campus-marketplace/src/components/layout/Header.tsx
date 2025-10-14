// This could be a 'use client' component if it handles cart interaction state
'use client'; 
import Link from 'next/link';

export default function Header() {
  // Assume a hook for cart state (e.g., useCart)
  const cartItemCount = 3; // Placeholder for actual state

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MyECommerce
        </Link>
        <nav className="flex space-x-4">
          <Link href="/product" className="text-gray-600 hover:text-gray-900">
            Shop
          </Link>
          <Link href="/cart" className="text-gray-600 hover:text-gray-900 flex items-center">
            Cart ({cartItemCount})
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-gray-900">
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}