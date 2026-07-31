// app/page.tsx
// Develop by Mario Coldor 
// #russiaisaterroriststate 
'use client';
import React, { useState, useEffect } from 'react';
import Logo from './components/logo';
//  IMPORTAÇÕES DO SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importação dos estilos nativos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GitHubCalendar } from 'react-github-calendar';

interface GithubActivity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Extrai as chaves 'pt' e 'en' do objeto translations
type Language = keyof typeof translations;

// Dicionário completo com os textos em Português e Inglês
const translations = {
  pt: {
// CATEGORIAS DO MENU
    navAbout: "Sobre",
    navSkills: "Habilidades",
    navPortfolio: "Portfólio",
    navResume: "Currículo",
    navJson: "Currículo JSON (Formato ATS)",
    navContact: "Contato",
// CATEGORIAS DE BOAS VINDAS
    heroTitle: "Olá, eu sou o ",
    heroSubtitle: "Desenvolvedor de Software | Analista de Sistemas | Full Stack (React/PHP/SQL) | Cloud (GCP) | Ex-Engenheiro",
    heroBtn: "Ver Meus Projetos",
// CATEGORIAS SEÇÃO SOBRE
    aboutTitle: "Sobre Mim / Histórico",
    aboutP1: "Engenheiro de software em formação, analista de Sistemas desenvolvedor full-stack (PHP, React, Java). Possui visão multidisciplinar como Engenheiro Têxtil (UNESP) com pós-graduações em Marketing e RH (UNICAMP). Combina essa base de negócios com 5 anos de experiência coordenando projetos na indústria e comércio, traduzindo necessidades corporativas em soluções técnicas eficientes. Busca recolocação em equipes de desenvolvimento ágil de software para agregar valor técnico e estratégico imediato.",
    aboutP2: "Atualmente, amplio essa atuação técnica através da graduação em Engenharia de Software e por certificações contínuas em arquitetura e infraestrutura de nuvem (Google Cloud Platform), com foco em ambientes escaláveis e redes seguras. Com histórico consolidado nos mercados de varejo corporativo e B2B, combino proficiência no desenvolvimento de aplicações modernas — dominando ecossistemas como React, Next.js e Prisma ORM — com uma forte visão analítica. Essa capacidade de arquitetar soluções de ponta a ponta, da interface ao banco de dados, permite entregar produtos que geram eficiência operacional e impulsionam o real crescimento dos negócios.",
// CATEGORIAS DE HABILIDADES
    skillsTitle: "Minhas Habilidades",
    skillsCat0: "Backend & Dados",
    skillsCat0A: "SQL / MySQL",
    skillsCat0B: "Java & C++",
    skillsCat0C: "PHP",
    skillsCat0D: "VBA / Visual Basic",
    skillsCat0E: "Prisma ORM",
    skillsCat1: "Frontend",
    skillsCat1A: "HTML5 & CSS3",
    skillsCat1B: "JavaScript",
    skillsCat1C: "React.js",
    skillsCat1D: "Next.js",
    skillsCat2: "Cloud & Infraestrutura",
    skillsCat2A: "Google Cloud Platform (GCP)",
    skillsCat2B: "Infraestrutura e Redes",
    skillsCat2C: "Google Cloud Platform",
    skillsCat2D: "Vercel",
    skillsCat3: "Metodologias & Gestão",
    skillsCat3A: "Resolução de Problemas (PDCA)",
    skillsCat3B: "Tráfego WEB (SEO Google)",
    skillsCat3C: "Gerenciamento de Projetos",
    skillsCat3D: "Gestão de Equipes",
    skillsCat3E: "Normatização ISO 9000",
    skillsCat4: "Habilidades Destacadas",
    skillsCat4A: "Trabalho em equipe",
    skillsCat4B: "Comunicação",
    skillsCat4C: "Negociação",
    skillsCat4D: "Resolução de conflitos",
    skillsCat5: "Infraestrutura & Hardware",
    skillsCat5A: "Montagem e diagnóstico",
    skillsCat5B: "Redes locais (LAN/WLAN)",
    skillsCat5C: "Dimensionamento de hardware",
    skillsCat5D: "Substituição de componentes",
// CATEGORIAS DE PORTIFÓLIO
    portfolioTitle: "Meu Portfólio",
    portfolioSubtitle: "Aqui estão alguns dos projetos técnicos que desenvolvi ou gerenciei:",
    proj1Title: "Sistema de Gestão CRM Interno - LEGUMINA",
    proj1Desc: "Desenvolvimento e manutenção completa de um sistema de CRM corporativo utilizando Visual Basic e arquitetura de dados MySQL para controle de faturamento, cadastros de clientes e outros processos operacionais. Criação de site institucional da empresa e configuração de e-mails",
    proj2Title: "Estatísticas do Processo Industrial - VICUNHA TEXTIL",
    proj2Desc: "Criação de banco de dados e interface para importação, cadastro e consultas dos dados de metrologia no laboratório. Utilizando as estatísticas do processo para monitoramento, identificação de melhorias e de correções.",
    proj3Title: "Otimização e SEO de site - SANGATI BERGA",
    proj3Desc: "Avaliação e reestruturação de site da empresa, incluindo mais produtos e links relacionados a produtos complementares, sugeridos ao perfil do cliente.",
    proj4Title: "Aplicações Interativas & Web - GITHUB",
    proj4Desc: "Estruturação de portais institucionais e landing pages focadas em performance, semântica moderna de tags (HTML5/CSS3) e otimização para mecanismos de busca (SEO).",
    proj5Title: "Infraestrutura Ágil em Nuvem - GOOGLE PLATFORM",
    proj5Desc: "Implementação e configuração de ambientes de desenvolvimento, redes seguras e balanceamento de carga utilizando a infraestrutura do laboratório Google Cloud Platform.",
    proj6Title: "MarioPlay PRO - Hub de Jogos com React",
    proj6Desc: "Desenvolvimento e implantação de um portal moderno de jogos web, migrando componentes interativos como Bingo e Jogo da Forca para Next.js para praticar habilidades avançadas em React, roteamento e arquitetura frontend responsiva.",
// CATEGORIAS DE CONTATO
    contactTitle: "Contato",
    contactSubtitle: "Vamos conversar sobre tecnologia ou oportunidades de projetos?",
    cardLinkedin: "Desenvolvedor de Software & Analista de Sistmas | Full Stack (React, PHP, SQL) | Cloud (GCP) | Ex-engenheiro",
    teleTitulo: "Telefone",
    footerText: "Desenvolvido com React, HTML5 e CSS3."
  },
  en: {
    navAbout: "About",
    navSkills: "Skills",
    navPortfolio: "Portfolio",
    navResume: "Resume",
    navJson: "Resume JSON (ATS Format)",
    navContact: "Contact",
    heroTitle: "Hi, I am ",
    heroSubtitle: "Software Developer | Systems Analyst | Full Stack (React/PHP/SQL) | Cloud (GCP) | Former Engineer",
    heroBtn: "View My Projects",
    aboutTitle: "About Me / History",
    aboutP1: "Software engenier in training, systems Analyst full-stack developer (PHP, React, Java). Brings a multidisciplinary perspective as a Textile Engineer (UNESP) with postgraduate degrees in Marketing and HR (UNICAMP). Combines this business foundation with 5 years of experience coordinating projects in industry and commerce, translating corporate needs into efficient technical solutions. Seeking a position in agile software development teams to add immediate technical and strategic value.",
    aboutP2: "urrently, I am expanding my technical expertise through a degree in Software Engenier and ongoing certifications in cloud architecture and infrastructure (Google Cloud Platform), focusing on scalable environments and secure networks. With a solid background in the corporate retail and B2B markets, I combine proficiency in modern application development — mastering ecosystems such as React, Next.js, and Prisma ORM — with a strong analytical mindset. This ability to architect end-to-end solutions, from the user interface to the database, enables me to deliver products that drive operational efficiency and fuel real business growth.",
// SKILLS CATEGORIES ENGLISH
    skillsTitle: "My Skills",
    skillsCat0: "Backend & Data",
    skillsCat0A: "SQL / MySQL",
    skillsCat0B: "Java & C++",
    skillsCat0C: "PHP",
    skillsCat0D: "VBA / Visual Basic",
    skillsCat0E: "Prisma ORM",
    skillsCat1: "Frontend",
    skillsCat1A: "HTML5 & CSS3",
    skillsCat1B: "JavaScript",
    skillsCat1C: "React.js",
    skillsCat1D: "Next.js",
    skillsCat2: "Cloud & Infrastructure",
    skillsCat2A: "Google Cloud Platform (GCP)",
    skillsCat2B: "Infrastructure e Networks",
    skillsCat2C: "Google Cloud Platform",
    skillsCat2D: "Vercel",
    skillsCat3: "Methodologies & Management",
    skillsCat3A: "Problem Solving (PDCA Method)",
    skillsCat3B: "Web Traffic (Google SEO)",
    skillsCat3C: "Project Management",
    skillsCat3D: "Team Leadership",
    skillsCat3E: "ISO 9000 Compliance",
    skillsCat4: "Core Skills",
    skillsCat4A: "Teamwork",
    skillsCat4B: "Communication",
    skillsCat4C: "Negotiation",
    skillsCat4D: "Conflict Resolution",
    skillsCat5: "Physical Infrastructure & Hardware",
    skillsCat5A: "Assembly & Diagnostics",
    skillsCat5B: "Local Networks (LAN/WLAN)",
    skillsCat5C: "Hardware Sizing",
    skillsCat5D: "Component Replacement",
// CATEGORIAS DE PORTIFÓLIO EM INGLÊS
    portfolioTitle: "My Portfolio",
    portfolioSubtitle: "Here are some of the technical projects I have developed or managed:",
    proj1Title: "Internal CRM Management System - LEGUMINA",
    proj1Desc: "Complete development and maintenance of a corporate CRM system using Visual Basic and MySQL data architecture for invoicing control, customer registration, and other operational processes. Deployment of the institutional website and enterprise email configuration.",
    proj2Title: "Industrial Process Statistics - VICUNHA TEXTIL",
    proj2Desc: "Creation of a database and interface for laboratory metrology data importing, registration, and querying. Utilizing process statistics for monitoring, continuous improvement, and corrective action identification.",
    proj3Title: "Website Optimization & SEO - SANGATI BERGA",
    proj3Desc: "Evaluation and restructuring of the company's website, expanding the product catalog and integrating smart links for complementary products tailored to the customer profile.",
    proj4Title: "Interactive & Web Applications - GITHUB",
    proj4Desc: "Structuring institutional portals and landing pages focused on high performance, modern tag semantics (HTML5/CSS3), and Search Engine Optimization (SEO).",
    proj5Title: "Agile Cloud Infrastructure - GOOGLE PLATFORM",
    proj5Desc: "Implementation and configuration of development environments, secure networks, and load balancing using the Google Cloud Platform infrastructure laboratory.",
    proj6Title: "MarioPlay PRO - React Gaming Hub",
    proj6Desc: "Development and deployment of a modern web gaming hub, migrating interactive components like Bingo and Hangman to Next.js to practice advanced React skills, routing, and responsive frontend architecture.",
// Seção contato
    contactTitle: "Contact",
    contactSubtitle: "Let's talk about technology or project opportunities?",
    cardLinkedin: "Software Developer & Systems Analyst | Full Stack (React, PHP, SQL) | Cloud (GCP) | Former Engineer",
    teleTitulo: "Call",
    footerText: "Developed with React, HTML5, and CSS3."
  }
};

export default function App() {
  // Controle de estado para garantir renderização segura no cliente (Next.js)
  const [isMounted, setIsMounted] = useState(false);
// Informa que lang só pode ser 'pt' ou 'en'
  const [lang, setLang] = useState<Language>("pt");
  const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
    setIsMounted(true);
    const savedLang = localStorage.getItem("preferredLanguage");
    
    // Checa se o que veio do localStorage é uma chave válida do nosso tipo
    if (savedLang === "pt" || savedLang === "en") {
      setLang(savedLang);
    }
  }, []);

  // Função para alternar o idioma
  const toggleLanguage = () => {
    const nextLang = lang === "pt" ? "en" : "pt";
    setLang(nextLang);
    localStorage.setItem("preferredLanguage", nextLang);
  };

  const closeMenu = () => setMenuOpen(false);

 // Função para filtrar apenas os últimos 90 dias do calendário do GitHub
  const filtrarUltimos3Meses = (contributions: GithubActivity[]) => {
    const hoje = new Date();
    const tresMesesAtras = new Date(hoje.getTime() - (90 * 24 * 60 * 60 * 1000));

    return contributions.filter((dia) => {
      const dataContribuicao = new Date(dia.date);
      return dataContribuicao >= tresMesesAtras && dataContribuicao <= hoje;
    });
  };

  // Atalho para o dicionário atual
  const t = translations[lang];

  return (
    <div>
      {/* Menu de Navegação Fixo com Menu Hambúrguer */}
      <header className="navbar-header">
        <nav className="navbar-container">
          {/* Logo */}
          <a href="#" className="nav-logo" onClick={closeMenu}>
            <span className="logo-main">Mario Antonio</span>
            <span className="logo-sub">Coldor</span>
          </a>

          {/* O Botão Hambúrguer */}
          <button 
            className={`menu-toggle ${menuOpen ? 'open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {/* Lista de Links */}
          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li><a href="#sobre" onClick={closeMenu}>{t.navAbout}</a></li>
            <li><a href="#habilidades" onClick={closeMenu}>{t.navSkills}</a></li>
            <li><a href="#portfolio" onClick={closeMenu}>{t.navPortfolio}</a></li>
            <li>
              <a href={`/curriculo.html?lang=${lang}`} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                {t.navResume}
              </a>
            </li>
            <li><a href="#contato" onClick={closeMenu}>{t.navContact}</a></li>
            <li>
              <button id="language-toggle" className="btn-lang" onClick={() => { toggleLanguage(); closeMenu(); }}>
                {lang === "pt" ? (
                  <>
                    <span role="img" aria-label="English" style={{ marginRight: '5px' }}>🇺🇸</span> EN
                  </>
                ) : (
                  <>
                    <span role="img" aria-label="Português" style={{ marginRight: '5px' }}>🇧🇷</span> PT
                  </>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Seção de Boas-Vindas (Hero Section) */}
      <section className="hero">
        <div className="hero-content">
          <h1>{t.heroTitle}<span>Mario</span></h1>
          <p>{t.heroSubtitle}</p>
          <a href="#portfolio" className="btn-primary">{t.heroBtn}</a>
        </div>
      </section>

      {/* Seção Sobre / Histórico */}
      <section id="sobre" className="section-container">
        <h2>{t.aboutTitle}</h2>
        <div className="about-content">
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
          <div style={{ marginTop: '20px' }}>
            <a href="/curriculo.html" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', marginLeft: '10px' }}>
              {t.navResume}
            </a>
            <a href="/curriculo.json" download="Mario_Antonio_Resume.json" className="btn-primary" style={{ display: 'inline-block', marginLeft: '10px'}}>
              {t.navJson}
            </a>
                        <a href="/curriculo.pdf" download="Mario_Antonio_Resume.pdf" className="btn-primary" style={{ display: 'inline-block', marginLeft: '10px'}}>
              Currículo PDF
            </a>
          </div>
        </div>
      </section>

      {/* Seção de Habilidades */}
      <section id="habilidades" className="section-container bg-light">
        <h2>{t.skillsTitle}</h2>
        <div className="skills-grid">
          <div className="skills-category">
            <h3>{t.skillsCat0}</h3>
            <ul className="skills-buttons-list">
              <li>{t.skillsCat0A}</li>
              <li>{t.skillsCat0B}</li>
              <li>{t.skillsCat0C}</li>
              <li>{t.skillsCat0D}</li>
              <li>{t.skillsCat0E}</li>
            </ul>
          </div>
          <div className="skills-category">
            <h3>{t.skillsCat1}</h3>
            <ul className="skills-buttons-list">
              <li>{t.skillsCat1A}</li>
              <li>{t.skillsCat1B}</li>
              <li>{t.skillsCat1C}</li>
              <li>{t.skillsCat1D}</li>
            </ul>
          </div>
          <div className="skills-category">
            <h3>{t.skillsCat2}</h3>
            <ul className="skills-buttons-list">
              <li>{t.skillsCat2A}</li>
              <li>{t.skillsCat2B}</li>
              <li>{t.skillsCat2C}</li>
              <li>{t.skillsCat2D}</li>
            </ul>
          </div>
          <div className="skills-category">
            <h3>{t.skillsCat3}</h3>
            <ul className="skills-buttons-list">
              <li>{t.skillsCat3A}</li>
              <li>{t.skillsCat3B}</li>
              <li>{t.skillsCat3C}</li>
              <li>{t.skillsCat3D}</li>
              <li>{t.skillsCat3E}</li>
            </ul>
          </div>
          <div className="skills-category">
            <h3>{t.skillsCat4}</h3>
            <ul className="skills-buttons-list text-center">
              <li>{t.skillsCat4A}</li>
              <li>{t.skillsCat4B}</li>
              <li>{t.skillsCat4C}</li>
              <li>{t.skillsCat4D}</li>
            </ul>
          </div>
          <div className="skills-category">
            <h3>{t.skillsCat5}</h3>
            <ul className="skills-buttons-list text-center">
              <li>{t.skillsCat5A}</li>
              <li>{t.skillsCat5B}</li>
              <li>{t.skillsCat5C}</li>
              <li>{t.skillsCat5D}</li>
            </ul>      
          </div>
        </div>
      </section>

      {/* Seção do Portfólio */}
      <section id="portfolio" className="section-container">
        <h2>{t.portfolioTitle}</h2>
        <p className="section-subtitle">{t.portfolioSubtitle}</p>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 15000, disableOnInteraction: false }}
          className="portfolio-swiper"
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          <SwiperSlide>
            <div className="portfolio-card">
              <div className="card-body">
                <h3>{t.proj1Title}</h3>
                <p>{t.proj1Desc}</p>
                <p><a href="https://www.legumina.com.br" target="_blank" rel="noopener noreferrer" className="btn-primary">www.legumina.com.br</a></p>
                <span className="badge">VBA</span> <span className="badge">MySQL</span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="portfolio-card">
              <div className="card-body">
                <h3>{t.proj2Title}</h3>
                <p>{t.proj2Desc}</p>
                <span className="badge">VBA</span> <span className="badge">MySQL</span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="portfolio-card">
              <div className="card-body">
                <h3>{t.proj3Title}</h3>
                <p>{t.proj3Desc}</p>
                <p><a href="https://www.sangatiberga.com.br" target="_blank" rel="noopener noreferrer" className="btn-primary">www.sangatiberga.com.br</a></p>
                <span className="badge">HTML5</span> <span className="badge">CSS3</span> <span className="badge">SEO</span> <span className="badge">Sketchup</span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="portfolio-card">
              <div className="card-body">
                <h3>{t.proj4Title}</h3>
                <p>{t.proj4Desc}</p>
                <p><a href="https://github.com/Mlaantonio" target="_blank" rel="noopener noreferrer" className="btn-primary">github.com</a></p>
                <span className="badge">HTML5</span> <span className="badge">SEO</span> <span className="badge">UX</span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="portfolio-card">
              <div className="card-body">
                <h3>{t.proj5Title}</h3>
                <p>{t.proj5Desc}</p>
                <p><a href="https://www.credly.com/users/mario-luis-alves-antonio" target="_blank" rel="noopener noreferrer" className="btn-primary">credly.com</a></p>
                <span className="badge">GoogleCloud</span> <span className="badge">GCP</span> <span className="badge">CloudComputing</span> <span className="badge">DevOps</span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="portfolio-card">
              <div className="card-body">
                <h3>{t.proj6Title}</h3>
                <p>{t.proj6Desc}</p>
                <p><a href="https://marioplay.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-primary">marioplay.vercel.app</a></p>
                <span className="badge">React</span> <span className="badge">Next.js</span> <span className="badge">MongoDB</span> <span className="badge">NoSQL</span> <span className="badge">Backend Integration</span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Seção de Contato */}
      <section id="contato" className="section-container bg-light">
        <h2>{t.contactTitle}</h2>
        <p className="section-subtitle">{t.contactSubtitle}</p>
        
        <div className="badges-wrapper">
          {/* LinkedIn card */}
          <div className="linkedin-card">
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <a href="https://linkedin.com/in/mlaantonio" target="_blank" rel="noopener noreferrer">
                <img src="/logolinkedin.png" alt="LinkedIn Logo" style={{ height: '35px', width: 'auto', marginRight: '10px', verticalAlign: 'middle' }} />
              </a>
            </div>
            <div className='linkedin-text'>
              <p>{t.cardLinkedin}</p>
            </div>
            <hr className="linha-divisoria" />
            <div className="button-card">
              <a href="https://linkedin.com/in/mariocoldor" target="_blank" rel="noopener noreferrer">Perfil Linkedin</a>
            </div>
          </div>

          {/* GitHub Card com Proteção de Hydration */}
          <div className="github-card">
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <a href="https://github.com/Mlaantonio" target="_blank" rel="noopener noreferrer">
                <img src="/logogithub.png" alt="GitHub Logo" style={{ height: '35px', width: 'auto', marginRight: '10px', verticalAlign: 'middle' }} />
              </a>
            </div>

            {isMounted ? (
              <GitHubCalendar 
                username="Mlaantonio" 
                transformData={filtrarUltimos3Meses} 
                colorScheme="dark"
                showWeekdayLabels={false}
                blockSize={8}
                blockMargin={6}
              />
            ) : (
              <div style={{ padding: '20px', color: '#666', textAlign: 'center' }}>Carregando atividades...</div>
            )}
          </div>

          {/* Card do WhatsApp */}
          <div className="whatsapp-card">
            <div className="whatsapp-header">
              <a href="https://wa.me/5585997128493" target="_blank" rel="noopener noreferrer">
                <img src="/logowhatsapp.png" alt="WhatsApp Logo" style={{ height: '35px', width: 'auto', marginRight: '10px', verticalAlign: 'middle' }} />
              </a>
            </div>
            <div className="button-card">
              <a href="https://wa.me/5585997128493" target="_blank" rel="noopener noreferrer">+55 85 99712-8493</a>
            </div>
            <hr className="linha-divisoria" />
            <div className='whatsapp-header'>
              <a href="https://wa.me/5585997128493" target="_blank" rel="noopener noreferrer">
                <div className='tele-title'>
                  <img src="/logofone.png" alt="telefone Logo" style={{ height: '35px', width: 'auto', marginRight: '10px', verticalAlign: 'middle' }} />
                  {t.teleTitulo}
                </div>
              </a>
              <div className="button-card">
                <a href="tel:+5585997128493" style={{textDecoration:'none' }}>+55 85 99712-8493</a>
              </div>                  
            </div>
          </div>

          {/* Card do E-mail */}
          <div className="email-card"> 
            <div className='email-header'>
              <a href="mailto:mario.a.coldor@gmail.com" target="_blank" rel="noopener noreferrer">
                <img src="/logoemail.png" alt="E-mail Logo" style={{ height: '35px', width: 'auto', marginLeft: '0px', marginBottom: '10px' }} />
              </a>
              <div className="button-card">
                <a href="mailto:mario.a.coldor@gmail.com" target="_blank" rel="noopener noreferrer" style={{fontSize:'small'}}>mario.a.coldor@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Card Map */}
          <div className='map-card'>
            <div className='map-logo'>
              <a href="https://maps.app.goo.gl/YdpM4SQuM3chaC4t6" target="_blank" rel="noopener noreferrer">
                <div className='map-title'>
                  <img src="/logomap.png" alt="Map Logo" style={{ height: '35px', width: 'auto', marginLeft: '0px' }} />
                </div>
              </a>
            </div>
            <hr className="linha-divisoria" />
            <div>
              <a href="https://maps.app.goo.gl/YdpM4SQuM3chaC4t6" target="_blank" rel="noopener noreferrer">
                <div className='map-title'>
                  <img src="/logobra.png" alt="Mapa Brasil" style={{ height: '30px', width: 'auto', marginLeft: '0px' }} />
                </div>
              </a>
            </div>
            <hr className="linha-divisoria" />
            <div>
              <img src="/logofilhos.png" alt="logo filhos" style={{ height: '20px', width: 'auto', marginLeft: '0px' }} />
            </div>
            <hr className="linha-divisoria" />
            <div>
              <img src="/logocasado.png" alt="logo casado" style={{ height: '20px', width: 'auto', marginLeft: '0px' }} />
            </div>
          </div>

        </div>
      </section>

      {/* Rodapé */}
      <footer>
        <p>©2026 Mario Luís Alves Antonio by Mario Coldor. {t.footerText}
            <a href="/cadastro" target="_blank" className="btn-mini" style={{ display: 'inline-block', marginLeft: '10px'}}>
              CADASTRO
            </a>
        </p>
      </footer>
    </div>
  );
}