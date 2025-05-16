import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-4 text-indigo-600">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-indigo-600 hover:underline">Go back home</Link>
    </div>
  );
} 