# Prodify

O Prodify é uma aplicação móvel de produtividade e gestão de estudos que utiliza elementos de gamificação para incentivar o engajamento dos usuários. O sistema permite a criação de grupos de estudo, acompanhamento de metas coletivas e monitoramento de desempenho individual.

## Funcionalidades Principais

### 1. Grupos de Estudo (Squads)
Funcionalidade social que permite aos usuários colaborarem em torno de objetivos comuns.
- **Criação e Gestão:** Usuários podem criar grupos ou ingressar em existentes.
- **Metas Coletivas:** Visualização de progresso semanal onde o desempenho de todos os membros contribui para uma meta comum.
- **Ranking Interno:** Classificação dos membros do grupo baseada na contribuição (horas estudadas/tarefas concluídas).

### 2. Gamificação e Progresso
Sistema de recompensas para manter a consistência nos estudos.
- **Sistema de XP:** Pontuação adquirida ao completar tarefas e sessões de estudo.
- **Níveis:** Progressão de nível do usuário baseada no acúmulo de experiência.
- **Streak (Ofensiva):** Monitoramento de dias consecutivos de atividade.

### 3. Rankings Globais
Visualização competitiva para comparar desempenho.
- Classificação geral de usuários.
- Classificação entre grupos de estudo.

### 4. Perfil do Usuário
Área de gestão pessoal e configurações.
- Visualização de estatísticas individuais (XP total, missões cumpridas).
- Edição de perfil (foto, biografia e dados cadastrais).
- Configurações de privacidade e notificações.

---

## Tecnologias Utilizadas

**Mobile (Frontend)**
- React Native (Expo)
- TypeScript
- Expo Router (Navegação)
- Expo Image Picker (Manipulação de imagens)

**Backend**
- NestJS
- PostgreSQL
- Docker

---

## Como Executar o Projeto

### Pré-requisitos
- Node.js
- Gerenciador de pacotes (NPM ou Yarn)
- Ambiente Expo configurado

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/prodify.git](https://github.com/seu-usuario/prodify.git)
   cd prodify
2.Execute o Frontend (Mobile):

  cd mobile
  npm install
  npx expo start

3. Execute o Backend
   
  cd backend
  npm install
  npm run start:dev



   
