import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="inline-block mb-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                🚀 Inteligencia Artificial para tu Negocio
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Transforma tu Atención al Cliente con{' '}
                <span className="text-gradient">IA 24/7</span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 mb-8 max-w-2xl">
                Respuestas instantáneas, automatización inteligente y clientes satisfechos.
                Libera a tu equipo para enfocarse en lo que realmente importa: hacer crecer tu negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/demo"
                  className="px-8 py-4 bg-gradient-ai-2 text-white rounded-lg font-semibold text-lg hover:shadow-glow-lg transition-all duration-300 hover-scale text-center"
                >
                  Solicitar Demo Gratis
                </Link>
                <Link
                  href="/#como-funciona"
                  className="px-8 py-4 bg-white text-neutral-700 rounded-lg font-semibold text-lg border-2 border-neutral-300 hover:border-primary-500 hover:text-primary-600 transition-all duration-300 text-center"
                >
                  Ver Cómo Funciona
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary-400 to-secondary-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-400 to-accent-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600">
                    <span className="font-semibold">500+ empresas</span> confían en nosotros
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-ai p-6 md:p-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-ai-2 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Chatbot IA</h3>
                      <p className="text-sm text-neutral-500">En línea</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-neutral-100 rounded-lg p-3">
                      <p className="text-sm text-neutral-700">¿Cuál es el horario de atención?</p>
                    </div>
                    <div className="bg-gradient-ai-2 text-white rounded-lg p-3 ml-8">
                      <p className="text-sm">¡Estamos disponibles 24/7! Puedo ayudarte ahora mismo con cualquier consulta.</p>
                    </div>
                    <div className="bg-neutral-100 rounded-lg p-3">
                      <p className="text-sm text-neutral-700">¿Cómo puedo hacer seguimiento a mi pedido?</p>
                    </div>
                    <div className="bg-gradient-ai-2 text-white rounded-lg p-3 ml-8">
                      <p className="text-sm">Te ayudo de inmediato. Por favor, compárteme tu número de pedido.</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -right-4 -top-4 bg-white rounded-xl shadow-lg p-4 animate-float">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">98%</div>
                    <div className="text-xs text-neutral-600">Satisfacción</div>
                  </div>
                </div>

                <div className="absolute -left-4 -bottom-4 bg-white rounded-xl shadow-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">&lt;2s</div>
                    <div className="text-xs text-neutral-600">Respuesta</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              ¿Te suena familiar?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Los desafíos que enfrentan las pymes hoy en día
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Clientes sin atención',
                description: 'Fuera del horario laboral, tus clientes quedan sin respuesta. Las oportunidades de venta se pierden mientras duermes.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Equipo sobrecargado',
                description: 'Tu personal responde las mismas preguntas repetitivas todo el día, sin tiempo para tareas estratégicas.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                ),
                title: 'Costos crecientes',
                description: 'Contratar más personal es costoso, y la calidad del servicio es inconsistente según quién responda.',
              },
            ].map((problem, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-6">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-neutral-600">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              La Solución: <span className="text-gradient">Botify</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Un asistente inteligente que transforma la atención al cliente
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Disponibilidad sin límites
              </h3>
              <div className="space-y-4">
                {[
                  'Responde automáticamente 24/7, incluso fines de semana y festivos',
                  'Atiende múltiples clientes simultáneamente sin demoras',
                  'Integración perfecta con WhatsApp, tu sitio web y redes sociales',
                  'Respuestas instantáneas en menos de 2 segundos',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-neutral-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-ai p-8">
              <div className="aspect-video bg-gradient-ai-2 rounded-lg flex items-center justify-center">
                <svg className="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-white rounded-2xl shadow-ai p-8">
              <div className="aspect-video bg-gradient-ai rounded-lg flex items-center justify-center">
                <svg className="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Inteligencia que aprende de tu negocio
              </h3>
              <div className="space-y-4">
                {[
                  'Se entrena con la información específica de tu empresa',
                  'Entiende el contexto y da respuestas precisas y relevantes',
                  'Escala ventas sin contratar más personal',
                  'Panel de control con métricas y análisis en tiempo real',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-neutral-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="caracteristicas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Características Principales
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Todo lo que necesitas para transformar tu atención al cliente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'IA Conversacional Avanzada',
                description: 'Chatbots que comprenden el lenguaje natural y mantienen conversaciones fluidas y coherentes.',
              },
              {
                icon: '📱',
                title: 'Integración WhatsApp',
                description: 'Conéctate directamente con tus clientes en la plataforma que más usan.',
              },
              {
                icon: '⚡',
                title: 'Respuestas Instantáneas',
                description: 'Menos de 2 segundos de tiempo de respuesta, sin importar la cantidad de consultas.',
              },
              {
                icon: '🎯',
                title: 'Personalización Total',
                description: 'Entrena el bot con tu información específica y personaliza la experiencia.',
              },
              {
                icon: '📊',
                title: 'Analytics Avanzados',
                description: 'Dashboard completo con métricas, conversaciones y análisis de rendimiento.',
              },
              {
                icon: '🔒',
                title: 'Seguridad Garantizada',
                description: 'Encriptación de extremo a extremo y cumplimiento con normativas de privacidad.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-xl p-8 hover:shadow-ai transition-all duration-300 hover:-translate-y-2 card-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Empresas que confían en nosotros
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Más de 500 empresas ya están transformando su atención al cliente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: 'Botify redujo nuestro tiempo de respuesta de horas a segundos. Nuestros clientes están más satisfechos que nunca.',
                author: 'María González',
                role: 'CEO, TechCommerce',
                rating: 5,
              },
              {
                quote: 'Implementamos Botify y en el primer mes respondimos 3x más consultas con el mismo equipo. Increíble ROI.',
                author: 'Carlos Ramírez',
                role: 'Director de Operaciones, FastShop',
                rating: 5,
              },
              {
                quote: 'La integración con WhatsApp fue perfecta. Ahora atendemos clientes 24/7 sin necesidad de turnos nocturnos.',
                author: 'Ana Martínez',
                role: 'Gerente de Servicio, BeautyPlus',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-neutral-800 rounded-xl p-8 hover:bg-neutral-700 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-300 mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Empresas Activas' },
              { value: '1M+', label: 'Conversaciones al Mes' },
              { value: '98%', label: 'Satisfacción del Cliente' },
              { value: '<2s', label: 'Tiempo de Respuesta' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Listo para transformar tu atención al cliente?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a las 500+ empresas que ya están brindando atención 24/7 con Botify
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-all duration-300 hover-scale"
            >
              Solicitar Demo Gratis
            </Link>
            <Link
              href="/contacto"
              className="px-8 py-4 bg-transparent text-white rounded-lg font-semibold text-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              Hablar con Ventas
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-75">
            Sin tarjeta de crédito • Configuración en 5 minutos • Soporte en español
          </p>
        </div>
      </section>
    </div>
  );
}
