import {
  OnlyofficeConfiguration,
  OnlyofficeEditor,
  ToolbarConvert,
  ToolbarCreate,
  ToolbarMenu,
  ToolbarOpen,
} from './components';
import { getFormatsWithConvertOptions, getSupportedFormats } from './helpers';
import reducers from './reducers';

const applyConfig = (config) => {
  config.settings.supportedLanguages = [ 
    'de',
    'en',
    'es',
    'fr',
    'it',
    'ja',
    'nl',
    'pt', 
    'ru', 
    'zh_CN',
  ];
  config.settings.isMultilingual = false;

  config.addonReducers = {
    ...(config.addonReducers || []),
    ...reducers,
  };

  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      component: ToolbarCreate,
      match: '*/contents',
    },
    {
      component: ToolbarOpen,
      match: {
        exact: true,
        path: getSupportedFormats(),
        strict: false,
      },
    },
    {
      component: ToolbarConvert,
      match: {
        exact: true,
        path: getFormatsWithConvertOptions(),
        strict: false,
      },
    },
  ];

  config.settings.additionalToolbarComponents = {
    onlyofficeToolbarMenu: {
      component: ToolbarMenu,
      wrapper: null,
    },
  };

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
