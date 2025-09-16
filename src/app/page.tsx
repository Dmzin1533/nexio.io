import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CEOsSection from "@/components/sections/CEOsSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import FeedbackSection from "@/components/sections/FeedbackSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="pt-16 animate-fade-in" style={{ backgroundColor: 'var(--background)' }}>
      <HeroSection />
      {/* Separador Code Flow Hero -> About */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'var(--separator-gradient)' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-px" style={{ backgroundColor: 'var(--separator-accent)' }}></div>
        {/* Elementos de código fluindo */}
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 text-xs font-mono" style={{ color: 'var(--separator-accent)', animation: 'codeFlow 4s ease-in-out infinite' }}>&lt;/&gt;</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-mono" style={{ color: 'var(--separator-accent)', animation: 'codeFlow 4s ease-in-out infinite 1s' }}>function()</div>
        <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 text-xs font-mono" style={{ color: 'var(--separator-accent)', animation: 'codeFlow 4s ease-in-out infinite 2s' }}>{'{}'}</div>
      </div>
      <div style={{ height: '2rem' }}></div>
      <AboutSection />
      {/* Separador Data Transfer About -> CEOs */}
       <div className="relative h-16 overflow-hidden">
         <div className="absolute inset-0" style={{ background: 'var(--separator-gradient)' }}></div>
         <div className="absolute top-1/2 left-1/4 right-1/4 h-px transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', opacity: '0.3' }}></div>
         {/* Pacotes de dados sendo transferidos */}
         <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'dataTransfer 3s ease-in-out infinite' }}></div>
         <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 rounded transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'dataTransfer 3s ease-in-out infinite 0.8s' }}></div>
         <div className="absolute top-1/2 left-1/4 w-1 h-1 rounded transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'dataTransfer 3s ease-in-out infinite 1.6s' }}></div>
         {/* Nós de conexão */}
         <div className="absolute top-1/2 left-1/4 w-1 h-1 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)' }}></div>
         <div className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)' }}></div>
       </div>
      <div style={{ height: '2rem' }}></div>
      <CEOsSection />
      {/* Separador Network Pulse CEOs -> Technologies */}
       <div className="relative h-16 overflow-hidden">
         <div className="absolute inset-0" style={{ background: 'var(--separator-gradient)' }}></div>
         {/* Linhas de conexão */}
         <div className="absolute top-1/2 left-1/4 right-1/4 h-px transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', opacity: '0.2' }}></div>
         {/* Nós de rede com pulso */}
         <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'networkPulse 2s ease-in-out infinite' }}></div>
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--separator-accent)', animation: 'networkPulse 2s ease-in-out infinite 0.7s' }}></div>
         <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'networkPulse 2s ease-in-out infinite 1.4s' }}></div>
         {/* Indicadores de conectividade */}
         <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', opacity: '0.6' }}></div>
         <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', opacity: '0.6' }}></div>
       </div>
      <div style={{ height: '2rem' }}></div>
      <TechnologiesSection />
      {/* Separador Deploy Animation Technologies -> Projects */}
       <div className="relative h-16 overflow-hidden">
         <div className="absolute inset-0" style={{ background: 'var(--separator-gradient)' }}></div>
         {/* Barra de progresso do build */}
         <div className="absolute top-1/2 left-1/4 right-1/4 h-1 rounded transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', opacity: '0.2' }}></div>
         <div className="absolute top-1/2 left-1/4 h-1 rounded transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'loadingProgress 3s ease-in-out infinite' }}></div>
         {/* Ícones de deploy */}
         <div className="absolute top-1/2 left-1/3 w-3 h-3 transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'deployAnimation 4s ease-in-out infinite' }}></div>
         <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'deployAnimation 4s ease-in-out infinite 1s' }}></div>
         {/* Status indicators */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-mono" style={{ color: 'var(--separator-accent)', opacity: '0.7' }}>BUILD</div>
       </div>
      <div style={{ height: '2rem' }}></div>
      <ProjectsSection />
      {/* Separador Feedback Flow Projects -> Feedback */}
       <div className="relative h-16 overflow-hidden">
         <div className="absolute inset-0" style={{ background: 'var(--separator-gradient)' }}></div>
         {/* Linha de feedback */}
         <div className="absolute top-1/2 left-1/4 right-1/4 h-px transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', opacity: '0.3' }}></div>
         {/* Ícones de feedback animados */}
         <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'feedbackPulse 2s ease-in-out infinite' }}></div>
         <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'feedbackPulse 2s ease-in-out infinite 0.5s' }}></div>
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--separator-accent)', animation: 'feedbackPulse 2s ease-in-out infinite 1s' }}></div>
         <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'feedbackPulse 2s ease-in-out infinite 1.5s' }}></div>
         <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'feedbackPulse 2s ease-in-out infinite 0.3s' }}></div>
         {/* Indicadores de opinião */}
         <div className="absolute top-1/2 left-1/4 text-xs font-mono transform -translate-y-1/2" style={{ color: 'var(--separator-accent)', opacity: '0.6' }}>💭</div>
         <div className="absolute top-1/2 right-1/4 text-xs font-mono transform -translate-y-1/2" style={{ color: 'var(--separator-accent)', opacity: '0.6' }}>⭐</div>
       </div>
      <div style={{ height: '2rem' }}></div>
      <FeedbackSection />
      {/* Separador Digital Communication Feedback -> Contact */}
       <div className="relative h-16 overflow-hidden">
         <div className="absolute inset-0" style={{ background: 'var(--separator-gradient)' }}></div>
         {/* Linha base de comunicação */}
         <div className="absolute top-1/2 left-1/4 right-1/4 h-px transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', opacity: '0.3' }}></div>
         {/* Sinais digitais animados */}
         <div className="absolute top-1/2 left-1/4 w-0.5 transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'digitalSignal 1.5s ease-in-out infinite' }}></div>
         <div className="absolute top-1/2 left-1/3 w-0.5 transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'digitalSignal 1.5s ease-in-out infinite 0.3s' }}></div>
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5" style={{ backgroundColor: 'var(--separator-accent)', animation: 'digitalSignal 1.5s ease-in-out infinite 0.6s' }}></div>
         <div className="absolute top-1/2 right-1/3 w-0.5 transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'digitalSignal 1.5s ease-in-out infinite 0.9s' }}></div>
         <div className="absolute top-1/2 right-1/4 w-0.5 transform -translate-y-1/2" style={{ backgroundColor: 'var(--separator-accent)', animation: 'digitalSignal 1.5s ease-in-out infinite 1.2s' }}></div>
         {/* Indicadores de comunicação */}
         <div className="absolute top-1/2 left-1/4 text-xs font-mono transform -translate-y-1/2" style={{ color: 'var(--separator-accent)', opacity: '0.6' }}>TX</div>
         <div className="absolute top-1/2 right-1/4 text-xs font-mono transform -translate-y-1/2" style={{ color: 'var(--separator-accent)', opacity: '0.6' }}>RX</div>
       </div>
      <div style={{ height: '2rem' }}></div>
      <ContactSection />
    </main>
  );
}
