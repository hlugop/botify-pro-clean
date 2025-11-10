import Link from 'next/link';
import { Metadata } from 'next';

/**
 * Metadata para SEO y Open Graph
 * ===============================
 * 
 * Configuración de metadata para optimización de motores de búsqueda (SEO)
 * y compartición en redes sociales (Open Graph).
 * 
 * Esta metadata es procesada por Next.js 14+ y se renderiza en el <head>
 * de la página automáticamente.
 * 
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: 'Quiénes Somos | Botify',
  description: 'Conoce la historia detrás de Botify y nuestro compromiso con democratizar la inteligencia artificial para empresas de todos los tamaños.',
  // TODO: Agregar Open Graph tags para redes sociales
  // openGraph: {
  //   title: 'Quiénes Somos | Botify',
  //   description: '...',
  //   images: ['/og-image-about.jpg'],
  // },
};

/**
 * QuienesSomos - Página institucional "Acerca de Nosotros"
 * ==========================================================
 * 
 * Página que presenta la información corporativa de Botify, incluyendo:
 * - Misión y visión de la empresa
 * - Información del fundador/CEO
 * - Valores corporativos
 * - Estadísticas de impacto
 * - Call-to-action para conversión
 * 
 * Arquitectura de la página:
 * 1. Hero Section: Presentación principal con gradientes animados
 * 2. Mission Section: Descripción de misión con grid de 2 columnas
 * 3. Founder Section: Perfil del líder con card estilizado
 * 4. Values Section: Grid de valores con iconografía
 * 5. Stats Section: Métricas de impacto en formato destacado
 * 6. CTA Section: Llamados a la acción finales
 * 
 * @component
 * @page
 * @returns {JSX.Element} Página completa "Quiénes Somos"
 * 
 * @author Equipo Botify Pro
 * @version 1.0.0
 */
export default function QuienesSomos(): JSX.Element {
  return (
    <div className="relative">
      
      {/* ==================================================================== */}
      {/* SECCIÓN 1: Hero Section - Presentación Principal */}
      {/* ==================================================================== */}
      
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-neutral-50 via-white to-primary-50 overflow-hidden">
        
        {/* Elementos de fondo animados (decorativos) */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* Orbe flotante 1 - Degradado primario */}
          <div 
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          />
          
          {/* Orbe flotante 2 - Degradado secundario con delay */}
          <div 
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" 
            style={{ animationDelay: '2s' }}
          />
        </div>

        {/* Contenido principal del hero */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Democratizando la <span className="text-gradient">Inteligencia Artificial</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Creemos que toda empresa, sin importar su tamaño, merece tener acceso a tecnología de IA de clase mundial.
            </p>
          </div>
        </div>
      </section>

      
      {/* ==================================================================== */}
      {/* SECCIÓN 2: Mission Section - Nuestra Misión */}
      {/* ==================================================================== */}
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Grid de 2 columnas: Texto + Card de valores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Columna izquierda: Texto de misión */}
            <div className="animate-fade-in-up">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                Nuestra Misión
              </h2>
              <div className="space-y-4 text-lg text-neutral-700">
                <p>
                  En Botify, estamos en una misión para transformar la forma en que las empresas se comunican con sus clientes. Creemos que la inteligencia artificial no debería ser un lujo reservado para las grandes corporaciones.
                </p>
                <p>
                  Nuestra plataforma permite a las pequeñas y medianas empresas competir en igualdad de condiciones, ofreciendo una atención al cliente excepcional, disponible 24/7, sin la necesidad de grandes inversiones en personal o infraestructura.
                </p>
                <p>
                  Cada día, ayudamos a cientos de empresas a liberar a sus equipos de tareas repetitivas, permitiéndoles enfocarse en lo que realmente importa: innovar, crecer y construir relaciones significativas con sus clientes.
                </p>
              </div>
            </div>

            {/* Columna derecha: Card con pilares */}
            <div 
              className="relative animate-fade-in" 
              style={{ animationDelay: '0.2s' }}
            >
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  
                  {/* Pilar 1: Innovación Continua */}
                  <MissionPillar
                    icon={<LightningIcon />}
                    title="Innovación Continua"
                    description="Siempre a la vanguardia de la tecnología de IA"
                  />

                  {/* Pilar 2: Enfoque en el Cliente */}
                  <MissionPillar
                    icon={<UsersIcon />}
                    title="Enfoque en el Cliente"
                    description="Tu éxito es nuestra prioridad número uno"
                  />

                  {/* Pilar 3: Accesibilidad */}
                  <MissionPillar
                    icon={<ShieldIcon />}
                    title="Accesibilidad"
                    description="IA de clase mundial al alcance de todos"
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* ==================================================================== */}
      {/* SECCIÓN 3: Founder Section - Perfil del Líder */}
      {/* ==================================================================== */}
      
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header de la sección */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Liderazgo con Visión
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Conoce a la persona detrás de Botify
            </p>
          </div>

          {/* Card del fundador */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-ai overflow-hidden">
              
              {/* Grid: Foto (2 cols) + Contenido (3 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-0">
                
                {/* Sección de foto con placeholder */}
                <div className="lg:col-span-2 bg-gradient-to-br from-primary-500 to-secondary-500 p-8 lg:p-12 flex items-center justify-center">
                  <div className="relative">
                    {/* Avatar placeholder con círculos concéntricos */}
                    <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-44 h-44 lg:w-60 lg:h-60 rounded-full bg-white/30 flex items-center justify-center">
                        <svg 
                          className="w-24 h-24 lg:w-32 lg:h-32 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de contenido */}
                <div className="lg:col-span-3 p-8 lg:p-12">
                  
                  {/* Nombre y cargo */}
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-neutral-900 mb-2">
                      Sofía Restrepo
                    </h3>
                    <p className="text-xl text-gradient font-semibold">
                      Fundadora y CEO
                    </p>
                  </div>

                  {/* Biografía */}
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      Sofía fundó Botify con una visión clara: hacer que la inteligencia artificial sea accesible para todas las empresas, no solo para las grandes corporaciones con presupuestos multimillonarios.
                    </p>
                    <p>
                      Con más de 10 años de experiencia en tecnología y servicio al cliente, Sofía identificó una brecha crítica en el mercado. Las pequeñas y medianas empresas necesitaban herramientas poderosas de automatización, pero las soluciones existentes eran demasiado complejas o costosas.
                    </p>
                    
                    {/* Quote destacada */}
                    <p>
                      &ldquo;Vi a demasiados emprendedores perder oportunidades de venta simplemente porque no podían estar disponibles 24/7. La IA puede resolver ese problema, y esa es nuestra misión en Botify.&rdquo;
                    </p>
                  </div>

                  {/* Redes sociales del fundador */}
                  <div className="mt-8 pt-6 border-t border-neutral-200">
                    <div className="flex items-center gap-4">
                      
                      {/* LinkedIn */}
                      <SocialButton
                        href="https://linkedin.com/in/sofia-restrepo"
                        ariaLabel="Perfil de LinkedIn de Sofía Restrepo"
                        icon={<LinkedInIcon />}
                      />
                      
                      {/* Twitter */}
                      <SocialButton
                        href="https://twitter.com/sofiarestrepo"
                        ariaLabel="Perfil de Twitter de Sofía Restrepo"
                        icon={<TwitterIcon />}
                      />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* ==================================================================== */}
      {/* SECCIÓN 4: Values Section - Nuestros Valores */}
      {/* ==================================================================== */}
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Los principios que guían cada decisión que tomamos
            </p>
          </div>

          {/* Grid de valores: 1-2-4 columnas (responsive) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES_DATA.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      
      {/* ==================================================================== */}
      {/* SECCIÓN 5: Stats Section - Nuestro Impacto */}
      {/* ==================================================================== */}
      
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Nuestro Impacto
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Números que reflejan nuestro compromiso
            </p>
          </div>

          {/* Grid de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS_DATA.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      
      {/* ==================================================================== */}
      {/* SECCIÓN 6: CTA Section - Llamados a la Acción */}
      {/* ==================================================================== */}
      
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Listo para unirte a nuestra misión?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Descubre cómo Botify puede transformar tu atención al cliente
          </p>
          
          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* CTA Primario */}
            <Link
              href="/demo"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-all duration-300 hover-scale"
            >
              Solicitar Demo Gratis
            </Link>
            
            {/* CTA Secundario */}
            <Link
              href="/contacto"
              className="px-8 py-4 bg-transparent text-white rounded-lg font-semibold text-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              Contactar al Equipo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


// ============================================================================
// COMPONENTES AUXILIARES (Sub-componentes reutilizables)
// ============================================================================

/**
 * MissionPillar - Componente para mostrar un pilar de misión
 * ===========================================================
 * 
 * Sub-componente que renderiza un ítem individual de los pilares
 * de la misión de la empresa.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {JSX.Element} props.icon - Ícono SVG del pilar
 * @param {string} props.title - Título del pilar
 * @param {string} props.description - Descripción breve del pilar
 * @returns {JSX.Element}
 */
interface MissionPillarProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

function MissionPillar({ icon, title, description }: MissionPillarProps): JSX.Element {
  return (
    <div className="flex items-start gap-4">
      {/* Contenedor del ícono con fondo semi-transparente */}
      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      
      {/* Contenido textual */}
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-white/90">{description}</p>
      </div>
    </div>
  );
}


/**
 * ValueCard - Tarjeta de valor corporativo
 * =========================================
 * 
 * Componente card que muestra un valor individual de la empresa
 * con ícono, título y descripción.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {JSX.Element} props.icon - Ícono del valor
 * @param {string} props.title - Título del valor
 * @param {string} props.description - Descripción del valor
 * @returns {JSX.Element}
 */
interface ValueCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps): JSX.Element {
  return (
    <div className="bg-neutral-50 rounded-xl p-8 hover:shadow-ai transition-all duration-300 hover:-translate-y-2 text-center">
      {/* Ícono con gradiente */}
      <div className="w-16 h-16 bg-gradient-ai-2 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
        {icon}
      </div>
      
      {/* Título */}
      <h3 className="text-xl font-bold text-neutral-900 mb-3">
        {title}
      </h3>
      
      {/* Descripción */}
      <p className="text-neutral-600">
        {description}
      </p>
    </div>
  );
}


/**
 * StatCard - Tarjeta de estadística
 * ==================================
 * 
 * Componente que muestra una métrica de impacto con ícono,
 * valor grande y etiqueta descriptiva.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.value - Valor de la estadística (ej: "500+")
 * @param {string} props.label - Etiqueta descriptiva
 * @param {JSX.Element} props.icon - Ícono de la estadística
 * @returns {JSX.Element}
 */
interface StatCardProps {
  value: string;
  label: string;
  icon: JSX.Element;
}

function StatCard({ value, label, icon }: StatCardProps): JSX.Element {
  return (
    <div className="text-center">
      {/* Ícono */}
      <div className="flex justify-center mb-4 text-primary-400">
        {icon}
      </div>
      
      {/* Valor con gradiente */}
      <div className="text-4xl font-bold text-gradient mb-2">
        {value}
      </div>
      
      {/* Etiqueta */}
      <div className="text-neutral-400">{label}</div>
    </div>
  );
}


/**
 * SocialButton - Botón de red social
 * ===================================
 * 
 * Componente de botón para enlaces a redes sociales con estilos
 * consistentes y accesibilidad mejorada.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.href - URL del perfil social
 * @param {string} props.ariaLabel - Etiqueta de accesibilidad
 * @param {JSX.Element} props.icon - Ícono de la red social
 * @returns {JSX.Element}
 */
interface SocialButtonProps {
  href: string;
  ariaLabel: string;
  icon: JSX.Element;
}

function SocialButton({ href, ariaLabel, icon }: SocialButtonProps): JSX.Element {
  return (
    
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors"
      aria-label={ariaLabel}
    >
      {icon}
    </a>
  );
}


// ============================================================================
// COMPONENTES DE ÍCONOS SVG
// ============================================================================

/**
 * Colección de componentes de íconos SVG utilizados en la página.
 * Estos íconos están inline para evitar requests HTTP adicionales.
 */

function LightningIcon(): JSX.Element {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function UsersIcon(): JSX.Element {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function ShieldIcon(): JSX.Element {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function CheckCircleIcon(): JSX.Element {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SparklesIcon(): JSX.Element {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

function LinkedInIcon(): JSX.Element {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon(): JSX.Element {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );
}

function BuildingIcon(): JSX.Element {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function ChatIcon(): JSX.Element {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function SmileIcon(): JSX.Element {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ClockIcon(): JSX.Element {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}


// ============================================================================
// DATOS ESTÁTICOS (Configuración de contenido)
// ============================================================================

/**
 * VALUES_DATA - Datos de valores corporativos
 * ============================================
 * 
 * Array que contiene la información de cada valor de la empresa.
 * Extraer estos datos facilita el mantenimiento y la internacionalización.
 */
const VALUES_DATA = [
  {
    icon: <CheckCircleIcon />,
    title: 'Transparencia',
    description: 'Comunicación clara y honesta en todo momento.',
  },
  {
    icon: <LightningIcon />,
    title: 'Innovación',
    description: 'Siempre buscando formas mejores de hacer las cosas.',
  },
  {
    icon: <UsersIcon />,
    title: 'Empatía',
    description: 'Entendemos los desafíos de nuestros clientes.',
  },
  {
    icon: <SparklesIcon />,
    title: 'Excelencia',
    description: 'Comprometidos con la calidad en cada detalle.',
  },
];

/**
 * STATS_DATA - Datos de estadísticas de impacto
 * ==============================================
 * 
 * Array que contiene las métricas clave de la empresa.
 */
const STATS_DATA = [
  {
    value: '500+',
    label: 'Empresas Confiando en Nosotros',
    icon: <BuildingIcon />,
  },
  {
    value: '1M+',
    label: 'Conversaciones Procesadas Mensualmente',
    icon: <ChatIcon />,
  },
  {
    value: '98%',
    label: 'Satisfacción del Cliente',
    icon: <SmileIcon />,
  },
  {
    value: '24/7',
    label: 'Soporte Disponible Siempre',
    icon: <ClockIcon />,
  },
];


/**
 * MEJORAS FUTURAS Y ROADMAP
 * ==========================
 * 
 * 1. Gestión de Contenido:
 *    - Migrar datos estáticos (VALUES_DATA, STATS_DATA) a un CMS
 *    - Implementar API para contenido dinámico
 *    - Permitir actualizaciones sin re-deploy
 * 
 * 2. Performance:
 *    - Lazy loading de secciones below the fold
 *    - Optimizar imágenes (cuando se agreguen fotos reales)
 *    - Implementar skeleton loaders
 * 
 * 3. Interactividad:
 *    - Animaciones scroll-triggered con Intersection Observer
 *    - Contador animado para estadísticas
 *    - Parallax en hero section
 * 
 * 4. Contenido:
 *    - Agregar timeline de la empresa
 *    - Sección de equipo completo
 *    - Testimonios de clientes
 *    - Galería de oficinas/cultura
 * 
 * 5. SEO Avanzado:
 *    - Schema.org markup para Organization
 *    - Schema.org markup para Person (fundador)
 *    - Breadcrumbs estructurados
 *    - FAQ schema si agregamos preguntas frecuentes
 * 
 * 6. Analytics:
 *    - Tracking de scroll depth
 *    - Heatmaps de interacción
 *    - Conversión de CTAs
 *    - A/B testing de copy
 * 
 * 7. Internacionalización:
 *    - Soporte multi-idioma con next-intl
 *    - Contenido localizado por región
 *    - Detección automática de idioma del navegador
 */