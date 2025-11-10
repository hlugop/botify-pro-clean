import Link from 'next/link';

/**
 * Footer - Componente de pie de página corporativo
 * =================================================
 * 
 * Componente que renderiza el footer de la aplicación con:
 * - Información corporativa y branding
 * - Enlaces de navegación organizados por categorías
 * - Enlaces a redes sociales
 * - Copyright dinámico con año actual
 * - Enlaces legales (privacidad, términos, cookies)
 * 
 * El footer está diseñado con un layout responsive que se adapta a diferentes
 * tamaños de pantalla utilizando CSS Grid.
 * 
 * @component
 * @example
 * ```tsx
 * import Footer from '@/components/layout/Footer';
 * 
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       <main>{children}</main>
 *       <Footer />
 *     </>
 *   );
 * }
 * ```
 * 
 * @returns {JSX.Element} Componente de footer renderizado
 * 
 * @author Equipo Botify Pro
 * @version 1.0.0
 */
export default function Footer(): JSX.Element {
  
  // ==========================================================================
  // DATOS DINÁMICOS
  // ==========================================================================
  
  /**
   * Año actual obtenido dinámicamente para el copyright.
   * Se actualiza automáticamente cada año sin necesidad de modificar código.
   * 
   * @type {number}
   */
  const currentYear: number = new Date().getFullYear();

  
  // ==========================================================================
  // RENDER DEL COMPONENTE
  // ==========================================================================
  
  return (
    <footer 
      className="bg-neutral-900 text-neutral-300"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* ================================================================== */}
        {/* SECCIÓN: Grid Principal con Columnas de Navegación */}
        {/* ================================================================== */}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* ================================================================ */}
          {/* COLUMNA 1: Branding y Redes Sociales */}
          {/* ================================================================ */}
          
          <div className="col-span-1 md:col-span-1">
            {/* Logo y nombre de la marca */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 mb-4 group"
              aria-label="Ir a página de inicio"
            >
              {/* Logo con efecto glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-ai-2 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-ai-2 text-white font-bold text-xl px-3 py-2 rounded-lg">
                  B
                </div>
              </div>
              
              {/* Texto de marca con gradiente */}
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                Botify
              </span>
            </Link>
            
            {/* Tagline de la empresa */}
            <p className="text-sm text-neutral-400 mb-4">
              Transforma tu atención al cliente con inteligencia artificial. Disponible 24/7.
            </p>
            
            {/* Enlaces a redes sociales */}
            <div className="flex space-x-4">
              {/* Twitter/X */}
              
                href="https://twitter.com/botify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
                aria-label="Síguenos en Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              {/* LinkedIn */}
              
                href="https://linkedin.com/company/botify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
                aria-label="Conéctate con nosotros en LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              
              {/* Instagram */}
              
                href="https://instagram.com/botify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          
          {/* ================================================================ */}
          {/* COLUMNA 2: Enlaces de Producto */}
          {/* ================================================================ */}
          
          <div>
            <h3 className="text-white font-semibold mb-4">Producto</h3>
            <nav aria-label="Enlaces de producto">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/#caracteristicas" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Características
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#precios" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Precios
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/integraciones" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Integraciones
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/demo" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Solicitar Demo
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          
          {/* ================================================================ */}
          {/* COLUMNA 3: Enlaces de Empresa */}
          {/* ================================================================ */}
          
          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <nav aria-label="Enlaces de empresa">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/quienes-somos" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Quiénes Somos
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/casos-de-exito" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Casos de Éxito
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contacto" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          
          {/* ================================================================ */}
          {/* COLUMNA 4: Enlaces de Recursos */}
          {/* ================================================================ */}
          
          <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <nav aria-label="Enlaces de recursos">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/ayuda" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/documentacion" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Documentación
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/privacidad" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terminos" 
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    Términos de Servicio
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        
        {/* ==================================================================== */}
        {/* SECCIÓN: Barra Inferior - Copyright y Enlaces Legales */}
        {/* ==================================================================== */}
        
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright dinámico */}
            <p className="text-sm text-neutral-400">
              © {currentYear} Botify. Todos los derechos reservados.
            </p>
            
            {/* Enlaces legales */}
            <nav 
              className="flex space-x-6 mt-4 md:mt-0"
              aria-label="Enlaces legales"
            >
              <Link 
                href="/privacidad" 
                className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
              >
                Privacidad
              </Link>
              <Link 
                href="/terminos" 
                className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
              >
                Términos
              </Link>
              <Link 
                href="/cookies" 
                className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
              >
                Cookies
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * ARQUITECTURA Y CONSIDERACIONES DE DISEÑO
 * =========================================
 * 
 * 1. Responsive Design:
 *    - Mobile: 1 columna (stacked)
 *    - Tablet: 2 columnas
 *    - Desktop: 4 columnas
 *    - Se utiliza CSS Grid para layout flexible
 * 
 * 2. SEO y Accesibilidad:
 *    - role="contentinfo" para identificar semánticamente el footer
 *    - aria-label en navegaciones para screen readers
 *    - aria-hidden="true" en iconos decorativos
 *    - Enlaces con descripciones claras
 * 
 * 3. Enlaces Externos:
 *    - target="_blank" para abrir en nueva pestaña
 *    - rel="noopener noreferrer" para seguridad
 *      * noopener: previene acceso a window.opener
 *      * noreferrer: no envía información del referrer
 * 
 * 4. Performance:
 *    - SVG inline para evitar requests HTTP adicionales
 *    - Clases de Tailwind optimizadas
 *    - No se cargan scripts externos pesados
 * 
 * MEJORAS FUTURAS
 * ===============
 * 
 * 1. Funcionalidad:
 *    - Newsletter subscription form
 *    - Selector de idioma
 *    - Sitemap dinámico
 * 
 * 2. Datos:
 *    - Extraer enlaces a un archivo de configuración
 *    - Crear tipos TypeScript para estructura de enlaces
 *    - Implementar CMS para gestión de contenido
 * 
 * 3. Analytics:
 *    - Tracking de clicks en enlaces sociales
 *    - Heatmap de interacción con footer
 * 
 * 4. Internacionalización:
 *    - Soporte multi-idioma con i18n
 *    - Detección automática de región
 */

/**
 * TIPOS DE DATOS SUGERIDOS (para refactoring futuro)
 * ===================================================
 */

/**
 * @typedef {Object} FooterLink
 * @property {string} label - Texto visible del enlace
 * @property {string} href - URL de destino
 * @property {boolean} [external] - Si el enlace es externo
 */

/**
 * @typedef {Object} FooterSection
 * @property {string} title - Título de la sección
 * @property {FooterLink[]} links - Array de enlaces
 */

/**
 * @typedef {Object} SocialLink
 * @property {string} name - Nombre de la red social
 * @property {string} href - URL del perfil
 * @property {JSX.Element} icon - Componente del icono SVG
 */