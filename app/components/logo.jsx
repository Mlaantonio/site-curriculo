// src/components/logo.jsx
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="nav-logo">
      <span className="logo-main">Mario Antonio</span>
      <span className="logo-sub">Coldor</span>
    </Link>
  );
}