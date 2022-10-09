import { CapacitorConfig } from '@capacitor/cli';

let config: CapacitorConfig;

function generateConfig(platform?: 'dev-ios' | 'dev-android') {
  const config: CapacitorConfig = {
    appId: 'app.remembit',
    appName: 'remembit',
    webDir: 'dist',
    bundledWebRuntime: false
  };

  if (platform === 'dev-android') {
    config.webDir = `${config.webDir}-${platform}`;
    config.android = {
      flavor: 'dev'
    };
  } else if (platform === 'dev-ios') {
    config.webDir = `${config.webDir}-${platform}`;
  } else {
    config.android = { flavor: 'prod' };
  }

  return config;
}

switch (process.env.CAP_PLAT) {
  case 'dev-ios':
    config = generateConfig('dev-ios');
    break;
  case 'dev-android':
    config = generateConfig('dev-android');
    break;
  default:
    config = generateConfig();
    break;
}

console.log(config);

export default config;
