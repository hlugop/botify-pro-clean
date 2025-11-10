"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Navbar - Componente de barra de navegación principal
 * =====================================================
 * 
 * Componente de navegación responsive con las siguientes características:
 * - Navegación sticky que cambia de apariencia al hacer scroll
 * - Menú hamburguesa para dispositivos móviles
 * - Animaciones suaves y efectos de hover
 * - Accesibilidad mejorada con ARIA labels
 * 
 * @component
 * @example
 * ```tsx
 * import Navbar from '@/components/layout/Navbar';
 * 
 * export default function Layout() {
 *   return (
 *     <>
 *       <Navbar />
 *       <main>{children}</main>
 *     </>
 *   );
 * }
 * ```
 * 
 * @returns {JSX.Element} Componente de navegación renderizado
 * 
 * @author Equipo Botify Pro
 * @version 1.0.0
 */
export default function Navbar(): JSX.Element {
  
  // ==========================================================================
  // ESTADO DEL COMPONENTE
  // ==========================================================================
  
  /**
   * Estado que controla si el usuario ha hecho scroll en la página.
   * Se utiliza para cambiar el estilo del navbar (transparente vs. sólido)
   * 
   * @type {boolean}
   */
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  
  /**
   * Estado que controla la visibilidad del menú móvil.
   * true: menú abierto, false: menú cerrado
   * 
   * @type {boolean}
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  
  // ==========================================================================
  // EFECTOS Y LISTENERS
  // ==========================================================================
  
  /**
   * Effect Hook que maneja el comportamiento del navbar al hacer scroll.
   * 
   * Funcionalidad:
   * - Agrega un listener al evento 'scroll' del window
   * - Actualiza isScrolled cuando el usuario scrollea más de 10px
   * - Limpia el listener al desmontar el componente (previene memory leaks)
   * 
   * Optimización:
   * - Considera agregar throttle/debounce para mejor performance en scroll intensivo
   * 
   * @see https://react.dev/reference/react/useEffect
   */
  useEffect(() => {
    /**
     * Handler que actualiza el estado isScrolled basado en la posición del scroll.
     * Threshold: 10px desde el top de la página.
     */
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Registramos el listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup: removemos el listener al desmontar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Array vacío: solo se ejecuta al montar/desmontar

  
  // ==========================================================================
  // RENDER DEL COMPONENTE
  // ==========================================================================
  
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* ================================================================ */}
          {/* SECCIÓN: Logo y Branding */}
          {/* ================================================================ */}
          
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            aria-label="Ir a página de inicio"
          >
            {/* Logo con efecto de glow animado */}
            <div className="relative">
              {/* Capa de blur para efecto glow */}
              <div className="absolute inset-0 bg-gradient-ai-2 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
              
              {/* Logo principal */}
              <div className="relative bg-gradient-ai-2 text-white font-bold text-xl px-3 py-2 rounded-lg">
                B
              </div>
            </div>
            
            {/* Texto del brand con gradiente */}
            <span className="text-2xl font-bold text-gradient">
              Botify
            </span>
          </Link>

          
          {/* ================================================================ */}
          {/* SECCIÓN: Navegación Desktop */}
          {/* ================================================================ */}
          
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

          
          {/* ================================================================ */}
          {/* SECCIÓN: CTA Buttons Desktop */}
          {/* ================================================================ */}
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Botón secundario - Contacto */}
            <Link
              href="/contacto"
              className="px-4 py-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Contacto
            </Link>
            
            {/* Botón primario - CTA principal */}
            <Link
              href="/demo"
              className="px-6 py-2.5 bg-gradient-ai-2 text-white rounded-lg font-semibold hover:shadow-glow transition-all duration-300 hover-scale"
            >
              Solicitar Demo
            </Link>
          </div>

          
          {/* ================================================================ */}
          {/* SECCIÓN: Botón de Menú Móvil */}
          {/* ================================================================ */}
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {/* SVG Icon con animación de transición entre hamburger y X */}
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
                // Icono de cerrar (X)
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                // Icono de hamburger (tres líneas)
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      
      {/* ==================================================================== */}
      {/* SECCIÓN: Menú Móvil (Responsive) */}
      {/* ==================================================================== */}
      
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden bg-white border-t border-neutral-200 shadow-lg animate-fade-in-down"
          role="menu"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {/* 
              Cada link del menú móvil cierra el menú automáticamente 
              al hacer click para mejorar la UX
            */}
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
            >
              Inicio
            </Link>
            <Link
              href="/quienes-somos"
              className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
            >
              Quiénes Somos
            </Link>
            <Link
              href="/#caracteristicas"
              className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
            >
              Características
            </Link>
            <Link
              href="/#precios"
              className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
            >
              Precios
            </Link>
            <Link
              href="/contacto"
              className="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
            >
              Contacto
            </Link>
            
            {/* CTA principal en versión móvil */}
            <Link
              href="/demo"
              className="block px-3 py-2 mt-2 bg-gradient-ai-2 text-white rounded-lg text-center font-semibold hover:shadow-glow transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
            >
              Solicitar Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/**
 * MEJORAS FUTURAS Y CONSIDERACIONES
 * ==================================
 * 
 * 1. Performance:
 *    - Implementar throttle en handleScroll para reducir re-renders
 *    - Considerar usar IntersectionObserver en lugar de scroll listener
 * 
 * 2. Accesibilidad:
 *    - Agregar navegación por teclado (Tab, Enter, Escape)
 *    - Implementar trap focus en menú móvil
 *    - Agregar skip-to-content link
 * 
 * 3. Funcionalidad:
 *    - Active state para indicar página actual
 *    - Animación de cierre del menú móvil
 *    - Soporte para submenús dropdown
 * 
 * 4. Testing:
 *    - Unit tests para lógica de scroll
 *    - Integration tests para navegación
 *    - Accessibility tests con Jest-Axe
 * 
 * 5. Internacionalización:
 *    - Preparar para i18n (next-intl o react-i18next)
 *    - Extraer strings a archivos de traducción
 */