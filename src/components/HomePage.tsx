import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Menu,
  X,
  Users,
  Star,
  Lock,
  CheckCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'areas', 'features', 'software', 'about'];
      let current = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Inicio', id: 'home' },
    { href: '#areas', label: 'Áreas', id: 'areas' },
    { href: '#features', label: 'Servicios', id: 'features' },
    { href: '#software', label: 'Software', id: 'software' },
    { href: '#about', label: '¿Quiénes Somos?', id: 'about' },
  ];

  return (
    <nav className="bg-background/80 border-border/40 relative sticky top-0 z-50 flex w-full items-center justify-center border-b px-6 py-6 shadow-sm backdrop-blur-lg md:px-12">
      {/* Desktop Nav */}
      <div className="hidden items-center gap-8 font-medium md:flex">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            data-testid={`link-${link.id}`}
            className={`relative w-fit transition-colors ${
              activeSection === link.id
                ? 'text-primary font-bold'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="bg-primary absolute right-0 bottom-0 left-0 h-1 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.div>
          </a>
        ))}
      </div>

      {/* Contact Button - Desktop */}
      <a href="#footer" className="absolute right-6 hidden md:block md:right-12">
        <button
          data-testid="button-join-nav"
          className="font-heading bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2 shadow-lg transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          Contactanos
        </button>
      </a>

      {/* Mobile Nav Toggle */}
      <button
        className="text-foreground bg-primary/10 hover:bg-primary/25 rounded-full p-2 transition-colors md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-menu-toggle"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Nav Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-card border-border/60 absolute top-full right-4 left-4 z-50 mt-2 flex w-[calc(100%-2rem)] flex-col gap-6 rounded-2xl border p-8 shadow-2xl md:hidden"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                data-testid={`link-${link.id}-mobile`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  delay: idx * 0.08,
                  duration: 0.25,
                  ease: 'easeOut',
                }}
                whileHover={{ x: 4 }}
                className={`w-fit text-center text-lg font-medium transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-primary font-bold'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              className="border-border/40 border-t pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: navLinks.length * 0.08 + 0.1,
                duration: 0.25,
              }}
            >
              <a
                href="#footer"
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    data-testid="button-join-mobile"
                    className="font-heading bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-full py-4 font-medium shadow-lg transition-all hover:shadow-xl cursor-pointer"
                  >
                    Contactanos
                  </button>
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col items-center overflow-hidden px-6 py-12 md:flex-row md:px-12 lg:px-24"
    >
      {/* Decorative Blobs */}
      <div className="bg-primary/10 absolute top-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full blur-3xl" />
      <div className="bg-accent/30 absolute right-[-5%] bottom-[10%] -z-10 h-[400px] w-[400px] rounded-full blur-3xl" />

      <div className="relative z-10 w-full space-y-8 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-hand text-primary mb-4 inline-block -rotate-2 text-2xl">
            Bienvenido!
          </span>
          <h1 className="font-heading text-foreground mb-6 text-5xl leading-[1.1] font-bold md:text-7xl">
            Gestión{' '}
            <span className="text-primary relative inline-block">
              integral
              <svg
                className="text-accent absolute -bottom-1 left-0 -z-10 h-3 w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>{' '}
            <br />
            de la tecnología a tu servicio
          </h1>
          <p className="text-muted-foreground max-w-md text-lg leading-relaxed md:text-xl">
            Acompañamos a nuestros clientes en la optimización y gestión de sus recursos tecnológicos, mediante soluciones técnicas especializadas que garantizan seguridad, cumplimiento normativo y calidad en la prestación de sus servicios..
          </p>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { icon: Star, label: '5 estrellas', color: 'text-yellow-600' },
              { icon: Lock, label: '100% Seguro', color: 'text-green-600' },
              {
                icon: CheckCircle,
                label: 'Certificado en Calidad',
                color: 'text-purple-600',
              },
              { icon: Heart, label: 'Respaldado por Profesionales', color: 'text-red-600' },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-secondary/30 border-border/40 flex items-center justify-center gap-2 rounded-full border px-3 py-2"
              >
                <badge.icon
                  className={`h-4 w-4 flex-shrink-0 ${badge.color}`}
                />
                <span className="text-foreground text-xs font-semibold">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mt-12 w-full md:mt-0 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          <img
            src="/images/Cara Frontal Tarjeta.jpg"
            alt="Gato zen durmiendo en una nube"
            className="h-auto w-full transform rounded-[3rem] shadow-2xl transition-transform duration-700 hover:rotate-0 md:rotate-3"
          />

          {/* Floating Cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="bg-rose-100 absolute -bottom-8 -left-4 hidden md:flex max-w-[200px] items-center gap-3 rounded-2xl p-4 shadow-lg md:left-10"
          >
            <div className="rounded-full bg-red-100 p-2 text-red-600">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">Soluciones tecnológicas</p>
              <p className="text-muted-foreground text-xs">Cumplimiento garantizado</p>
            </div>
          </motion.div>

          {/* Second Badge */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="bg-sky-100 absolute -top-4 -right-4 hidden md:flex max-w-[200px] items-center gap-3 rounded-2xl p-4 shadow-lg md:-right-8"
          >
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">Confianza de nuestros clientes</p>
              <p className="text-muted-foreground text-xs">Tu tranquilidad es nuestra prioridad</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  title,
  desc,
  img,
  delay,
  testId,
}: {
  title: string;
  desc: string;
  img: string;
  delay: number;
  testId: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10 }}
    data-testid={testId}
  >
    <div className="bg-card h-full overflow-hidden rounded-[2rem] border-none shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="flex h-full flex-col p-0">
        <div className="bg-secondary/30 flex h-48 w-full items-center justify-center p-0 overflow-hidden">
          <motion.img
            src={img}
            alt={title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
          />
        </div>
        <div className="flex flex-1 flex-col items-center p-8 text-center">
          <h3 className="font-heading text-foreground mb-3 text-2xl font-bold">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Areas = () => {
  const areasData = [
    {
      title: "Servicios clínicos",
      items: [
        "Consulta externa",
        "Vacunación",
        "Imagenología",
        "Rehabilitación",
        "Odontología",
        "Laboratorio"
      ]
    },
    {
      title: "Instituciones",
      items: [
        "Hospitales y clínicas",
        "Centros y puestos de salud",
        "Ambulancias",
        "Consultorios",
        "Veterinarias",
        "Centrales de esterilización"
      ]
    }
  ];

  return (
    <section id="areas" className="relative px-6 py-24 md:px-12 lg:px-24" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="font-hand text-primary text-xl">Áreas</span>
          <h2 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
            Áreas de aplicación
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">
            Prestamos servicios en múltiples entornos clínicos e industriales.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {areasData.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white rounded-[2rem] p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-primary/10"
            >
              <h3 className="font-heading text-foreground text-2xl font-bold mb-8">
                {area.title}
              </h3>
              <ul className="space-y-4">
                {area.items.map((item, itemIdx) => (
                  <motion.li
                    key={itemIdx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + itemIdx * 0.05 }}
                    className="flex items-center gap-3 group"
                  >
                    <CheckCircle className="text-primary h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-foreground text-base group-hover:text-primary transition-colors duration-200">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section
      id="features"
      className="relative bg-white/50 px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <span className="font-hand text-primary text-xl">Nuestros servicios</span>
          <h2 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
            Servicios de gestión integral
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            title="Mantenimiento"
            desc="Mantenimiento preventivo, correctivo y predictivo para equipos biomédicos e industriales."
            img="/images/Mantenimiento.jpg"
            delay={0.1}
            testId="card-service-maintenance"
          />
          <FeatureCard
            title="Verificación metrológica"
            desc="Servicios de metrología para energía, humedad, frecuencia, saturación de O2 y más."
            img="/images/Metrologia.jpg"
            delay={0.2}
            testId="card-service-metrology"
          />
          <FeatureCard
            title="Comercialización"
            desc="Suministro de dispositivos, repuestos y accesorios, y soporte para implementación."
            img="/images/Comercializacion.jpg"
            delay={0.3}
            testId="card-service-commercialization"
          />
        </div>
      </div>
    </section>
  );
};

const Software = () => {
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Gestión Documental",
      desc: "Organización y control de documentación técnica de equipos"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Habilitación Resolución 3100",
      desc: "Cumplimiento normativo según regulación colombiana"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Trazabilidad",
      desc: "Seguimiento completo de procesos y auditorías"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Reportes Automáticos",
      desc: "Generación de informes y reportes en tiempo real"
    }
  ];

  return (
    <section id="software" className="relative px-6 py-24 md:px-12 lg:px-24" style={{ backgroundColor: '#e8f2f7' }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          {/* Contenido izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-hand text-primary text-xl">Software</span>
            <h2 className="font-heading text-foreground text-4xl font-bold mt-2 mb-6">
              Gestión Documental y Habilitación
            </h2>
            <p className="text-foreground text-lg leading-relaxed mb-8">
              Solución integral para la gestión documental y cumplimiento de la <strong>Resolución 3100 de 2019</strong> del Ministerio de Salud colombiano.
            </p>

            <div className="space-y-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + idx * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-200 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-foreground font-bold text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#footer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-block mt-8"
            >
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Solicitar demostración
              </button>
            </motion.a>
          </motion.div>

          {/* Contenido derecho */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[2.5rem] p-10 shadow-lg border border-primary/10"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-primary text-2xl font-bold mb-3">
                  Resolución 3100/2019
                </h3>
                <p className="text-foreground leading-relaxed">
                  Cumple con todos los requisitos de habilitación para instituciones prestadoras de servicios de salud, garantizando seguridad del paciente y eficiencia operativa.
                </p>
              </div>

              <div className="border-t border-primary/20 pt-6">
                <h4 className="font-heading text-foreground font-bold mb-4">Módulos principales:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-foreground">Gestión de Documentos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-foreground">Control de Versiones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-foreground">Auditoría y Trazabilidad</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-foreground">Reportería Automática</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-foreground">Integraciones Personalizadas</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 lg:px-24 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="font-hand text-primary text-xl">Quiénes somos</span>
          <h2 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
            Novamed Ingeniería
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">
            Somos un equipo multidisciplinario enfocado en diseñar soluciones
            ingenieriles que mejoren la calidad de vida.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Misión */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2.5rem] p-10 shadow-md border border-primary/10 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="font-heading text-foreground text-2xl font-bold mb-6">
              Misión
            </h3>
            <p className="text-foreground leading-relaxed text-base">
              Brindar soluciones integrales de gestión de la tecnología garantizando el correcto funcionamiento, la fiabilidad y la eficiencia de dispositivos médicos y veterinarios, equipos industriales y de refrigeración, a través de servicios técnicos especializados, capacitación, asesoría, comercialización de tecnología y desarrollo de software para gestión integral.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[2.5rem] p-10 shadow-md border border-primary/10 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="font-heading text-foreground text-2xl font-bold mb-6">
              Visión
            </h3>
            <p className="text-foreground leading-relaxed text-base">
              Ser reconocidos en Colombia como empresa líder en la prestación de servicios de gestión integral de tecnología, por la excelencia, la innovación y la generación de valor en cada proyecto, consolidando alianzas estratégicas y ofreciendo soluciones sostenibles que impacten positivamente en la seguridad del paciente y la eficiencia de las instituciones.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Community = () => {
  return null;
};

const QuoteSection = () => {
  return null;
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const socialLinks = [
    { 
      icon: '📞', 
      label: 'Teléfono', 
      href: 'tel:+573226942370',
      text: '+57 322 694 2370'
    },
    { 
      icon: '✉️', 
      label: 'Email', 
      href: 'mailto:novamedingenieria@gmail.com',
      text: 'novamedingenieria@gmail.com'
    },
    { 
      icon: '💬', 
      label: 'WhatsApp', 
      href: 'https://wa.me/573226942370',
      text: 'WhatsApp'
    },
    { 
      icon: '📸', 
      label: 'Instagram', 
      href: 'https://instagram.com/novamedingenieria',
      text: '@novamedingenieri      className="px-4 md:px-12 py-6 md:py-12"a'
    },
  ];

  return (
    <footer id="footer" className="bg-black text-white px-6 py-20 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Top Section: Logo and Contact */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 mb-16">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start"
          >
            <img 
              src="/images/Logo%20Blanco.png" 
              alt="Novamed Ingeniería" 
              className="h-16 w-auto mb-4" 
            />
            <p className="text-gray-300 text-sm leading-relaxed text-center md:text-left">
              Soluciones integrales de gestión tecnológica para instituciones de salud.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="font-heading text-lg font-bold mb-6">Contacto</h3>
            <div className="space-y-4">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200 group"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {link.text}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="font-heading text-lg font-bold mb-6">Contáctanos</h3>
            <p className="text-gray-300 text-sm mb-4 text-center md:text-left">
              Déjanos tu correo y nos pondremos en contacto pronto.
            </p>
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg"
              >
                {submitted ? '✓ Enviado' : 'Enviar'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-12" />

        {/* Bottom: Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 text-center text-xs text-gray-400 md:flex-row"
        >
          <p>
            &copy; {new Date().getFullYear()} Novamed Ingeniería. Todos los derechos reservados.
          </p>
          <p className="flex items-center justify-center gap-1">
            Desarrollado por <Heart className="h-3 w-3 text-red-400" /> Novamed Ingeniería S.A.S
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="bg-background selection:bg-primary/20 selection:text-primary-foreground min-h-screen">
      <Navigation />
      <Hero />
      <Areas />
      <Features />
      <Software />
      <About />
      <Footer />
    </div>
  );
}
