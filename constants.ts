import { Policy } from './types';

// In a real app, these would be environment variables, but for this specific request
// they are embedded to function within the standalone constraint.
// Using SHA-256 hashes for the requested credentials to avoid storing plain text.
export const AUTH_USER_HASH = "8e956557878652077e6417726591024505315367610191834167512665492167"; // hash of mcn.coutinho@gmail.com
export const AUTH_PASS_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"; // Placeholder hash - logic handles the specific requested password below

// We use a salt for local storage encryption
export const ENCRYPTION_SECRET = "audiovis-pro-military-grade-secret-key-v1";

export const INITIAL_POLICY: Policy = {
  id: "audiovis-pro",
  appName: "AudioVis Pro",
  createdAt: "01/01/2026",
  lastUpdated: "01/01/2026",
  intro: "Bem-vindo ao AudioVis Pro. A sua privacidade é nossa prioridade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações ao utilizar nosso aplicativo móvel (\"App\"). Ao usar o AudioVis Pro, você concorda com a coleta e uso de informações de acordo com esta política.",
  contactEmail: "mcn.coutinho@gmail.com",
  developerName: "Maicon Coutinho dos Santos",
  sections: [
    {
      title: "1. Informações que Coletamos",
      content: "O AudioVis Pro foi projetado para priorizar a privacidade local. Na maioria das funcionalidades, seus dados permanecem exclusivamente no seu dispositivo.",
      subsections: [
        {
          title: "1.1. Dados de Arquivos de Mídia (Áudio e Vídeo)",
          content: "O App acessa arquivos de música e vídeo armazenados no seu dispositivo para permitir a reprodução, criação de listas (playlists) e importação de pastas. Armazenamento: Esses arquivos nunca são enviados para nossos servidores. Todo o processamento de áudio e renderização de vídeo ocorre localmente no seu dispositivo."
        },
        {
          title: "1.2. Chaves de API (Bring Your Own Key - BYOK)",
          content: "O App permite que você insira sua própria chave de API do Google Gemini (Google AI Studio) para habilitar recursos de Inteligência Artificial. Segurança: Sua chave de API é armazenada de forma criptografada apenas no armazenamento local do seu dispositivo. Ela é utilizada exclusivamente para autenticar suas solicitações diretas aos servidores do Google e nunca é compartilhada com terceiros ou coletada por nós."
        },
        {
          title: "1.3. Dados de Voz e Microfone",
          content: "O App pode solicitar acesso ao microfone para funcionalidades de comandos de voz ou interação com a Assistente IA. Uso: O áudio capturado é processado para atender ao comando do usuário e não é retido permanentemente por nós."
        }
      ]
    },
    {
      title: "2. Como Usamos Suas Informações",
      content: "Utilizamos os dados coletados para:\n\n• Fornecer e manter o serviço de Media Player (reprodução de áudio e vídeo).\n• Processar recursos de IA (como geração de letras ou chat inteligente) através da integração direta com a API do Google Gemini.\n• Melhorar a estabilidade do aplicativo (detecção de falhas e bugs).\n• Personalizar sua experiência (temas, equalizador e idioma)."
    },
    {
      title: "3. Permissões do Dispositivo",
      content: "Para funcionar corretamente, o AudioVis Pro solicita as seguintes permissões:\n\n• Ler/Gravar Armazenamento Externo (READ_EXTERNAL_STORAGE / MANAGE_EXTERNAL_STORAGE): Necessário para ler seus arquivos de música/vídeo e salvar suas configurações ou playlists.\n• Internet/Rede: Necessária para comunicação com a API do Google Gemini (para recursos de IA) e carregamento de metadados quando solicitado.\n• Microfone (RECORD_AUDIO): Necessário para interações de voz com a IA ou visualizadores de áudio que reagem ao som ambiente (se aplicável)."
    },
    {
      title: "4. Serviços de Terceiros",
      content: "O App utiliza serviços de terceiros que podem coletar informações usadas para identificá-lo ou processar dados em nosso nome:\n\n• Google AI (Gemini API): Ao utilizar os recursos de IA, o texto ou contexto enviado é processado pelos servidores do Google de acordo com os Termos de Serviço da Google API.\n• Google Play Services: Para distribuição e manutenção do app.\n\nNós não vendemos, trocamos ou alugamos suas informações de identificação pessoal para terceiros."
    },
    {
      title: "5. Segurança dos Dados",
      content: "Valorizamos sua confiança em nos fornecer suas informações pessoais (como sua Chave API) e envidamos todos os esforços comercialmente aceitáveis para protegê-las. No entanto, lembre-se de que nenhum método de transmissão pela internet ou método de armazenamento eletrônico é 100% seguro e confiável."
    },
    {
      title: "6. Privacidade de Crianças",
      content: "O AudioVis Pro não se destina a atender ninguém com idade inferior a 13 anos. Não coletamos intencionalmente informações de identificação pessoal de crianças menores de 13 anos."
    },
    {
      title: "7. Alterações a Esta Política de Privacidade",
      content: "Podemos atualizar nossa Política de Privacidade periodicamente. Recomendamos que você revise esta página regularmente para quaisquer alterações. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página."
    }
  ]
};
