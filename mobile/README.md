# Prodify Mobile

> Aplicativo mobile de produtividade desenvolvido com **React Native** e **Expo**, focado em ajudar usuários a acompanhar suas tarefas, metas e atividades diárias em grupos com amigos e competindo de forma saudável.

![Expo](https://img.shields.io/badge/Expo-54.0-000020?style=flat-square&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)

## ✨ Funcionalidades

- **Home** - Dashboard com visão geral da produtividade ( mockado )
- **Atividades** - Histórico e acompanhamento de tarefas ( mockado )
- **Perfil** - Configurações e estatísticas do usuário ( mockado )

## 🛠️ Tecnologias

- [Expo](https://expo.dev) - Framework de desenvolvimento
- [Expo Router](https://docs.expo.dev/router/introduction/) - Navegação baseada em arquivos
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animações fluidas
- [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) - Efeitos de blur nativos
- TypeScript - Tipagem estática

## 📁 Estrutura do Projeto

```
mobile/
├── app/                    # Rotas (Expo Router)
│   ├── _layout.tsx        # Layout principal
│   ├── index.tsx          # Tela de entrada
│   └── (tabs)/            # Navegação por abas
│       ├── home/          # Tela Home
│       ├── activity/      # Tela de Atividades
│       └── profile/       # Tela de Perfil
├── components/            # Componentes reutilizáveis
│   ├── screens/          # Componentes específicos por tela
│   ├── Header.tsx        # Header global
│   ├── StatCard.tsx      # Cards de estatísticas
│   └── ActivityCard.tsx  # Cards de atividades
├── constants/            # Constantes e tema
│   └── theme.ts         # Cores, espaçamentos, tipografia
└── assets/              # Imagens e ícones
```

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Android Studio](https://developer.android.com/studio) (para emulador Android)
- [Xcode](https://developer.apple.com/xcode/) (para simulador iOS - apenas macOS)

### Instalação

1. Clone o repositório e acesse a pasta mobile:
   ```bash
   cd mobile
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Gere o build nativo (primeira vez):
   ```bash
   npx expo prebuild
   ```

### Executando

**Development Build (Recomendado):**
```bash
# Android
npx expo run:android

# iOS (apenas macOS)
npx expo run:ios
```

**Com Expo Go (funcionalidades limitadas):**
```bash
npx expo start
```

**Com Tunnel (para dispositivos físicos em redes diferentes):**
```bash
npx expo start --tunnel
```

## 🔧 Solução de Problemas

### SocketTimeoutException / Connection Reset

Se encontrar erros de conexão com o Metro bundler:

1. Configure o ADB reverse:
   ```bash
   adb reverse tcp:8081 tcp:8081
   ```

2. Verifique se a porta 8081 está livre:
   ```bash
   netstat -ano | findstr :8081
   ```

3. Execute o Metro e o build em terminais separados do **Windows** (não WSL)

### Limpar Cache

```bash
npx expo start --clear
```

## 🎨 Design System

O app utiliza um tema escuro com verde como cor primária:

| Cor | Hex | Uso |
|-----|-----|-----|
| Background | `#0D0D0D` | Fundo principal |
| Surface | `#1A1A1A` | Cards e containers |
| Primary | `#22C55E` | Ações e destaques |
| Text | `#FFFFFF` | Texto principal |
| Text Secondary | `#8A8A8A` | Texto secundário |

## 📄 Licença

Este projeto é privado e pertence à Prodify Startup.

---

Desenvolvido com 💚 pela equipe Prodify
