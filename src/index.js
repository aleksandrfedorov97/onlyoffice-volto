import {
  OnlyofficeConfiguration,
  OnlyofficeEditor,
  ToolbarOpen,
} from './components';
import { getFormatsWithConvertOptions, getSupportedFormats } from './helpers';
import reducers from './reducers';

const applyConfig = (config) => {

  config.addonReducers = {
    ...(config.addonReducers || []),
    ...reducers,
  };

  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      component: ToolbarOpen,
      match: {
        exact: true,
        path: getSupportedFormats(),
        strict: false,
      },
    },
  ];

  config.settings.controlpanels = [
    ...(config.settings.controlpanels || []),
    {
      '@id': '/onlyoffice-configuration',
      group: 'Add-on Configuration',
      title: 'ONLYOFFICE Configuration',
    },
  ];

  config.addonRoutes = [
    ...config.addonRoutes,
    {
      component: OnlyofficeConfiguration,
      path: '/controlpanel/onlyoffice-configuration',
    },
    {
      component: OnlyofficeEditor,
      path: '*/onlyoffice-edit',
    },
  ];

  return config;
};

export default applyConfig;
