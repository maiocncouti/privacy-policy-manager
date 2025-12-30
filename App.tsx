import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Policy, AuthState } from './types';
import { INITIAL_POLICY } from './constants';
import { encryptData, decryptData } from './utils/crypto';
import AuthModal from './components/AuthModal';
import PolicyViewer from './components/PolicyViewer';
import AdminPanel from './components/AdminPanel';
import PolicyEditor from './components/PolicyEditor';
import Home from './components/Home';

const STORAGE_KEY = 'privacy_policies_encrypted_db';

const PolicyRoute: React.FC<{ policies: Policy[] }> = ({ policies }) => {
  const { id } = useParams();
  const policy = policies.find(p => p.id === id);

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-400">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Política não encontrada</h2>
          <p>A política solicitada não existe ou foi removida.</p>
        </div>
      </div>
    );
  }

  return <PolicyViewer policy={policy} />;
};

const AdminRoute: React.FC<{ 
  policies: Policy[], 
  setPolicies: React.Dispatch<React.SetStateAction<Policy[]>> 
}> = ({ policies, setPolicies }) => {
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null });
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

  const handleLogin = (success: boolean) => {
    if (success) {
      setAuth({ isAuthenticated: true, user: 'Admin' });
    }
  };

  const handleSavePolicy = (policy: Policy) => {
    let updatedPolicies;
    if (view === 'edit') {
      updatedPolicies = policies.map(p => p.id === policy.id ? policy : p);
    } else {
      updatedPolicies = [...policies, policy];
    }
    
    setPolicies(updatedPolicies);
    const encrypted = encryptData(updatedPolicies);
    localStorage.setItem(STORAGE_KEY, encrypted);
    
    setView('list');
    setEditingPolicy(null);
  };

  if (!auth.isAuthenticated) {
    return <AuthModal onLogin={handleLogin} onCancel={() => window.location.hash = '/'} />;
  }

  if (view === 'add') {
    return <PolicyEditor onSave={handleSavePolicy} onCancel={() => setView('list')} />;
  }

  if (view === 'edit' && editingPolicy) {
    return <PolicyEditor initialPolicy={editingPolicy} onSave={handleSavePolicy} onCancel={() => { setView('list'); setEditingPolicy(null); }} />;
  }

  return (
    <AdminPanel 
      policies={policies}
      onAdd={() => setView('add')}
      onEdit={(p) => { setEditingPolicy(p); setView('edit'); }}
      onLogout={() => setAuth({ isAuthenticated: false, user: null })}
    />
  );
};

const App: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const decrypted = decryptData(saved);
      if (decrypted && Array.isArray(decrypted)) {
        return decrypted;
      }
    }
    return [INITIAL_POLICY];
  });

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home policies={policies} />} />
        <Route path="/policy/:id" element={<PolicyRoute policies={policies} />} />
        <Route path="/admin" element={<AdminRoute policies={policies} setPolicies={setPolicies} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;