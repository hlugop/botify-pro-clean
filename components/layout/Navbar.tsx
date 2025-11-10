"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-ai-2 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-ai-2 text-white font-bold text-xl px-3 py-2 rounded-lg">
                B
              </div>
            </div>
            <span className="text-2xl font-bold text-gradient">
              Botify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Inicio
            </Link>
            <Link
              href="/quienes-somos"
              className="text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Quiénes Somos
            </Link>
            <Link
              href="/#caracteristicas"
              className="text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Características
            </Link>
            <Link
              href="/#precios"
              className="text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Precios
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contacto"
              className="px-4 py-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Contacto
            </Link>
            <Link
              href="/demo"
              className="px-6 py-2.5 bg-gradient-ai-2 text-white rounded-lg font-semibold hover:shadow-glow transition-all duration-300 hover-scale"
            >
              Solicitar Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 shadow-lg animate-fade-in-down">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/quienes-somos"
              className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Quiénes Somos
            </Link>
            <Link
              href="/#caracteristicas"
              className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Características
            </Link>
            <Link
              href="/#precios"
              className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Precios
            </Link>
            <Link
              href="/contacto"
              className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </Link>
            <Link
              href="/demo"
              className="block px-3 py-2 mt-2 bg-gradient-ai-2 text-white rounded-lg text-center font-semibold hover:shadow-glow transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Solicitar Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
