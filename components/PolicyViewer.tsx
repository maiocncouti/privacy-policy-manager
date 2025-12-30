import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Policy } from '../types';
import { Shield, Mail, Calendar, Clock, Activity, Lock } from 'lucide-react';

interface PolicyViewerProps {
  policy: Policy;
}

const PolicyViewer: React.FC<PolicyViewerProps> = ({ policy }) => {
  
  // Prevent going back via browser history manipulation
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 50 } 
    }
  };

  // Custom Header Component for AudioVis Pro style
  const AudioVisHeader = () => (
    <div className="flex flex-col items-center justify-center mb-12">
      {/* Logo Container */}
      <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
         {/* Background Glow */}
         <div className="absolute inset-0 bg-purple-600/40 blur-2xl rounded-full animate-pulse" />
         
         {/* Dashed Rotating Ring */}
         <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
         
         {/* Inner Circle */}
         <div className="relative w-24 h-24 bg-[#0F111A] rounded-full flex items-center justify-center border border-white/10 shadow-2xl z-10">
            <Activity className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
         </div>
      </div>
      
      {/* Text Branding */}
      <div className="text-center">
        <span className="block text-xs font-bold tracking-[0.25em] text-slate-500 uppercase mb-2">
          BEM-VINDO
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-2">
          AudioVis <span className="text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">Pro</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-medium">
          Política de Privacidade
        </p>
      </div>
    </div>
  );

  // Default Header for other apps
  const DefaultHeader = () => (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 rounded-2xl mb-6 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30">
        <Shield className="w-8 h-8 text-cyan-400" />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        Política de Privacidade
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
        {policy.appName}
      </h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 overflow-x-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Conditional Header Render */}
        <motion.div variants={itemVariants}>
          {policy.id === 'audiovis-pro' ? <AudioVisHeader /> : <DefaultHeader />}
        </motion.div>

        {/* Intro */}
        <motion.div variants={itemVariants} className="mb-10 bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-800/60 shadow-xl">
          <p className="text-lg leading-relaxed text-slate-200">
            {policy.intro}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {policy.sections.map((section, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group relative bg-slate-900/30 p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 hover:bg-slate-900/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-cyan-500 rounded-full" />
                {section.title}
              </h3>
              
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>

              {section.subsections && (
                <div className="mt-6 space-y-6 pl-4 border-l-2 border-slate-800">
                  {section.subsections.map((sub, sIndex) => (
                    <div key={sIndex} className="relative">
                      <h4 className="text-lg font-semibold text-cyan-100 mb-2">
                        {sub.title}
                      </h4>
                      <div className="text-slate-400 text-sm leading-relaxed">
                        {sub.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer / Contact */}
        <motion.div variants={itemVariants} className="mt-16 pt-10 border-t border-slate-800 text-center relative">
          <h3 className="text-2xl font-bold text-white mb-6">Contato</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-3 px-6 py-4 bg-slate-800 rounded-xl">
              <Mail className="text-cyan-400" />
              <div className="text-left">
                <p className="text-xs text-slate-400 uppercase tracking-wider">E-mail</p>
                <p className="text-white font-medium">{policy.contactEmail}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-slate-500 bg-slate-900/40 py-4 px-6 rounded-2xl border border-slate-800/50 inline-flex mx-auto">
            <div className="flex items-center gap-2">
               <Calendar size={14} className="text-slate-400" />
               <span>Postada em: <strong className="text-slate-300">{policy.createdAt || policy.lastUpdated}</strong></span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full"></div>
            <div className="flex items-center gap-2">
               <Clock size={14} className="text-slate-400" />
               <span>Atualizada em: <strong className="text-slate-300">{policy.lastUpdated}</strong></span>
            </div>
          </div>

          <p className="mt-8 text-slate-500 text-sm">
            Desenvolvido por <span className="text-slate-300">{policy.developerName}</span>
          </p>
          <p className="mt-2 text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} {policy.appName}. Todos os direitos reservados.
          </p>

          {/* Admin shortcut since we removed Home Page */}
          <div className="absolute bottom-0 right-0 p-4 opacity-0 hover:opacity-100 transition-opacity">
            <Link to="/admin" className="text-slate-800 hover:text-slate-600">
                <Lock size={16} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PolicyViewer;