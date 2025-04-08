import { ONLYOFFICE_VOLTO_CONFIG_GET } from '../../constants/ActionTypes';

export function getConfig(path) {
  return {
    request: {
      op: 'get',
      path: `/@onlyoffice-volto-get-config${path}`,
    },
    type: ONLYOFFICE_VOLTO_CONFIG_GET,
  };
}

export function resetConfigState() {
  return {
    type: ONLYOFFICE_VOLTO_CONFIG_GET + '_RESET',
  };
}
