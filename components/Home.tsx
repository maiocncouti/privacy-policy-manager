import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, Settings, FileText, ChevronRight, Lock } from 'lucide-react';
import { Policy } from '../types';

interface HomeProps {
  policies: Policy[];
}

const Home: React.FC<HomeProps> = ({ policies }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 relative overflow-hidden flex flex-col">
      {/* Background FX */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-12 flex-1 flex flex-col justify-center max-w-5xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-xl mb-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Shield className="w-10 h-10 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gerenciador de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Privacidade
              </span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Central de controle para termos de uso e políticas de privacidade dos seus aplicativos.
            </p>
          </motion.div>

          {/* Action Cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
            
            {/* Card 1: Lista de Políticas (Visualizar) */}
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:border-cyan-500/30 transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FileText size={100} />
               </div>
               
               <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                 <Eye className="text-cyan-400" />
                 Políticas Ativas
               </h2>
               
               <div className="space-y-3 mb-6">
                 {policies.length === 0 ? (
                   <p className="text-slate-500 italic">Nenhuma política cadastrada.</p>
                 ) : (
                   policies.map(policy => (
                     <Link 
                        key={policy.id}
                        to={`/policy/${policy.id}`}
                        className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:bg-slate-700 hover:border-cyan-500/50 transition-all group/link"
                     >
                        <span className="font-medium text-slate-300 group-hover/link:text-white">{policy.appName}</span>
                        <ChevronRight size={16} className="text-slate-600 group-hover/link:text-cyan-400" />
                     </Link>
                   ))
                 )}
               </div>
               
               <p className="text-sm text-slate-500">
                 Selecione uma política acima para visualizar a versão pública.
               </p>
            </div>

            {/* Card 2: Admin (Gerenciar) */}
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:border-blue-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Settings size={100} />
               </div>

               <div>
                 <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                   <Lock className="text-blue-400" />
                   Painel Administrativo
                 </h2>
                 <p className="text-slate-400 mb-6 leading-relaxed">
                   Acesse a área restrita para criar, editar ou excluir políticas de privacidade. Requer autenticação.
                 </p>
               </div>

               <Link 
                 to="/admin"
                 className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
               >
                 <Settings size={20} />
                 Gerenciar Políticas
               </Link>
            </div>

          </motion.div>
        </motion.div>
      </div>

      <div className="py-6 text-center text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} Privacy Manager. v1.0.0
      </div>
    </div>
  );
};

export default Home;