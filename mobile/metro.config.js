const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuração para resolver problemas de conexão com emulador
config.server = {
  ...config.server,
  port: 8081, // Porta padrão do Metro
  // Aumentar timeout do servidor
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Timeout de 5 minutos para requisições
      req.setTimeout(300000);
      res.setTimeout(300000);
      res.setHeader('Access-Control-Allow-Origin', '*');
      return middleware(req, res, next);
    };
  },
};

// Configuração do resolver
config.resolver = {
  ...config.resolver,
  // Desabilitar symlinks se estiver usando WSL
  unstable_enableSymlinks: false,
};

// Configuração do watcher com timeout maior
config.watcher = {
  ...config.watcher,
  // Usar polling para WSL (mais confiável)
  watchman: false,
  healthCheck: {
    enabled: true,
    interval: 60000,
    timeout: 30000,
    filePrefix: '.metro-health-check',
  },
};

// Aumentar o timeout do transformer
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;