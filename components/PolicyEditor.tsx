import React, { useState } from 'react';
import { Policy, PolicySection } from '../types';
import { Save, ArrowLeft, Trash2, PlusCircle } from 'lucide-react';

interface PolicyEditorProps {
  initialPolicy?: Policy | null;
  onSave: (policy: Policy) => void;
  onCancel: () => void;
}

const PolicyEditor: React.FC<PolicyEditorProps> = ({ initialPolicy, onSave, onCancel }) => {
  // Utility to create a slug from name
  const createId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const [formData, setFormData] = useState<Policy>(initialPolicy || {
    id: '',
    appName: '',
    createdAt: '', // Will be set on save
    lastUpdated: '', // Will be set on save
    intro: '',
    sections: [],
    contactEmail: '',
    developerName: ''
  });

  const handleChange = (field: keyof Policy, value: string) => {
    setFormData(prev => {
      const updates = { ...prev, [field]: value };
      if (field === 'appName' && !initialPolicy) {
        updates.id = createId(value);
      }
      return updates;
    });
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: 'Nova Seção', content: '' }]
    }));
  };

  const updateSection = (index: number, field: keyof PolicySection, value: string) => {
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData(prev => ({ ...prev, sections: newSections }));
  };
  
  const removeSection = (index: number) => {
     const newSections = formData.sections.filter((_, i) => i !== index);
     setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date().toLocaleDateString('pt-BR');
    
    const policyToSave: Policy = {
      ...formData,
      // If it's new (no createdAt), set it to now. Otherwise keep existing.
      createdAt: initialPolicy?.createdAt || formData.createdAt || now,
      // Always update lastUpdated to now
      lastUpdated: now
    };

    onSave(policyToSave);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-12">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        
        <div className="p-6 border-b border-slate-700 bg-slate-800 sticky top-0 z-20 flex justify-between items-center">
          <button type="button" onClick={onCancel} className="text-slate-400 hover:text-white flex items-center gap-2">
            <ArrowLeft size={20} /> Voltar
          </button>
          <h2 className="text-xl font-bold text-white">
            {initialPolicy ? 'Editar Política' : 'Nova Política'}
          </h2>
          <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors">
            <Save size={18} /> Salvar
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Nome da Política / App</label>
              <input
                required
                value={formData.appName}
                onChange={(e) => handleChange('appName', e.target.value)}
                placeholder="Ex: AudioVis Pro"
                className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">ID (Link Slug)</label>
              <input
                required
                value={formData.id}
                readOnly={!!initialPolicy} // Can't change ID of existing
                onChange={(e) => handleChange('id', e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-slate-400 focus:ring-2 focus:ring-cyan-500 outline-none font-mono"
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Nome do Desenvolvedor</label>
              <input
                required
                value={formData.developerName}
                onChange={(e) => handleChange('developerName', e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Email de Contato</label>
              <input
                required
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Introdução</label>
            <textarea
              required
              rows={4}
              value={formData.intro}
              onChange={(e) => handleChange('intro', e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 outline-none leading-relaxed"
            />
          </div>

          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
             <p className="text-sm text-slate-400">
               <span className="text-cyan-400 font-bold">Nota:</span> A data de postagem e atualização serão preenchidas automaticamente ao salvar.
             </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <h3 className="text-lg font-bold text-white">Seções da Política</h3>
              <button type="button" onClick={addSection} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm font-bold">
                <PlusCircle size={16} /> Adicionar Seção
              </button>
            </div>
            
            {formData.sections.map((section, index) => (
              <div key={index} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 relative group">
                <button 
                  type="button" 
                  onClick={() => removeSection(index)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
                <div className="space-y-4">
                  <input
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    placeholder="Título da Seção (ex: 1. Coleta de Dados)"
                    className="w-full p-2 bg-transparent border-b border-slate-600 text-cyan-200 font-bold focus:border-cyan-500 outline-none"
                  />
                  <textarea
                    rows={5}
                    value={section.content}
                    onChange={(e) => updateSection(index, 'content', e.target.value)}
                    placeholder="Conteúdo da seção..."
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 focus:ring-1 focus:ring-cyan-500 outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </form>
    </div>
  );
};

export default PolicyEditor;
