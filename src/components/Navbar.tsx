import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900">
          D. Nelson
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          Blog
        </Link>
      </nav>
    </header>
  );
}
