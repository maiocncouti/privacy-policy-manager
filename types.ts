export interface PolicySection {
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
}

export interface Policy {
  id: string;
  appName: string; // Nome da Política / App
  createdAt: string; // Data de Postagem
  lastUpdated: string; // Data de Atualização
  intro: string;
  sections: PolicySection[];
  contactEmail: string;
  developerName: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}
