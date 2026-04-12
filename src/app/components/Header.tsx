"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ReactNode, MouseEventHandler } from "react";
import {
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 md:px-8 lg:px-[180px] mx-auto py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 relative">
            <Image src="/logo.png" alt="ViaVerde" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            ViaVerde
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          <NavItem href="/" label="Início" />
          <NavItem href="/about" label="Sobre" />
          <NavItem href="/history" label="Histórico" />
          <NavItem href="/dashboard" label="Painel" />
        </nav>

        {/* Desktop CTA Button */}
        <button
          onClick={() => router.push("/registar-ocorrencia")}
          className="hidden md:inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Registar Ocorrência
        </button>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-6 space-y-3 bg-white border-t border-gray-200 animate-fadeIn">
          <NavItem href="/" label="Início" block onClick={toggleMenu} />
          <NavItem href="/about" label="Sobre" block onClick={toggleMenu} />
          <NavItem href="/history" label="Histórico" block onClick={toggleMenu} />
          <NavItem href="/dashboard" label="Painel" block onClick={toggleMenu} />
          
          <button
            onClick={() => {
              router.push("/registar-ocorrencia");
              toggleMenu();
            }}
            className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mt-4"
          >
            Registar Ocorrência
          </button>
        </nav>
      )}

      {/* Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

type NavItemProps = {
  href: string;
  label: string;
  block?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const NavItem = ({
  href,
  label,
  block = false,
  onClick,
}: NavItemProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`${
      block ? "block" : "inline-block"
    } text-gray-700 hover:text-green-600 transition-colors duration-150 py-2`}
  >
    {label}
  </Link>
);