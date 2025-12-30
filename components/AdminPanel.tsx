import React, { useState } from 'react';
import { Policy } from '../types';
import { Plus, Edit2, Link as LinkIcon, ExternalLink, ChevronRight, LogOut } from 'lucide-react';

interface AdminPanelProps {
  policies: Policy[];
  onAdd: () => void;
  onEdit: (policy: Policy) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ policies, onAdd, onEdit, onLogout }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyLink = (id: string) => {
    // Generate the URL assuming HashRouter
    const url = `${window.location.origin}${window.location.pathname}#/policy/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Painel de Gerenciamento</h1>
            <p className="text-slate-400">Gerencie suas políticas de privacidade com segurança.</p>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-red-400 hover:bg-slate-700 hover:text-red-300 rounded-lg transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              Sair
            </button>
            <button 
              onClick={onAdd}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-cyan-900/20 transition-all transform hover:scale-105"
            >
              <Plus size={20} />
              Criar Nova
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {policies.map((policy) => (
            <div key={policy.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-cyan-500/30 transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{policy.appName}</h3>
                  <span className="px-2 py-0.5 bg-cyan-900/50 text-cyan-300 text-xs rounded border border-cyan-800">Ativa</span>
                </div>
                <p className="text-slate-400 text-sm mb-1">ID: <span className="font-mono text-slate-500">{policy.id}</span></p>
                <p className="text-slate-400 text-sm">Atualizado em: {policy.lastUpdated}</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => window.open(`#/policy/${policy.id}`, '_blank')}
                  className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors tooltip"
                  title="Visualizar"
                >
                  <ExternalLink size={20} />
                </button>
                
                <button
                  onClick={() => copyLink(policy.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    copiedId === policy.id 
                      ? 'bg-green-600 text-white' 
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  <LinkIcon size={18} />
                  {copiedId === policy.id ? 'Link Copiado!' : 'Copiar Link'}
                </button>

                <button
                  onClick={() => onEdit(policy)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all"
                >
                  <Edit2 size={18} />
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-slate-800/50 rounded-xl border border-dashed border-slate-700 text-center">
            <h4 className="text-slate-300 font-medium mb-2">Integração com Play Store e GitHub</h4>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
              Para usar na Play Store, copie o link da política desejada acima. O link funcionará mesmo hospedado no GitHub Pages, pois utilizamos roteamento por hash (#) que é compatível com servidores estáticos.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
