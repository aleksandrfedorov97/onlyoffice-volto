import { OnlyofficeConfiguration } from './components';
import reducers from './reducers';

const applyConfig = (config) => {

  config.addonReducers = {
    ...(config.addonReducers || []),
    ...reducers
  };

  config.settings.controlpanels = [
    ...(config.settings.controlpanels || []),
    {
      '@id': '/onlyoffice-configuration',
      group: 'Add-on Configuration',
      title: 'ONLYOFFICE Configuration',
    }
  ];

  config.addonRoutes = [
    ...config.addonRoutes,
    {
      component: OnlyofficeConfiguration,
      path: '/controlpanel/onlyoffice-configuration',
    }
  ];

  return config;
};

export default applyConfig;
