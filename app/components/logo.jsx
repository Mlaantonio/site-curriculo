// src/components/logo.jsx
import Link from 'next/link';

export default function Logo({ onClick }) {
  return (
    <Link href="/" className="nav-logo" onClick={onClick}>
      <span className="logo-main">Mario Antonio</span>
    </Link>
  );
}