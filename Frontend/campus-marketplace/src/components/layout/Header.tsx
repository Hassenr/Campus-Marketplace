// This could be a 'use client' component if it handles cart interaction state
'use client'; 
import Link from 'next/link';

export default function Header() {

  //useState for message count could be added here in the future
  const messageCount = 5; // Placeholder for actual state
  
  //useState for user authentication state could be added here in the future
  const isAuthenticated = false; // Placeholder for actual state

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        {isAuthenticated ? (
          <Link href="/dashboard" className="text-2xl font-bold text-gray-800">
            Campus Marketplace
          </Link>
        ) : (
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Campus Marketplace
          </Link>
        )}
        <nav className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard/listing" className="text-gray-600 hover:text-gray-900">
                Browse
              </Link>
              <Link href="/dashboard/post" className="text-gray-600 hover:text-gray-900">
                Post
              </Link>
              <Link href="/dashboard/message" className="text-gray-600 hover:text-gray-900 flex items-center">
                Messages ({messageCount})
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Sign Out
              </Link>
            </>
          ) : (
            <Link href="/signin" className="text-gray-600 hover:text-gray-900">
              Sign In / Sign Up
            </Link>
          )}
          
        </nav>
      </div>
    </header>
  );
}