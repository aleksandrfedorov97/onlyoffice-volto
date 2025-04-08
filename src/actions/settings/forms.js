import { ONLYOFFICE_VOLTO_SETTINGS_FORMS } from '../../constants/ActionTypes';

export function getForms() {
  const params = new URLSearchParams({
    q: 'onlyoffice.plone',
  });
  return {
    request: {
      op: 'get',
      path: `/@registry?${params.toString()}`,
    },
    type: ONLYOFFICE_VOLTO_SETTINGS_FORMS,
  };
}

export function resetFormsState() {
  return {
    type: ONLYOFFICE_VOLTO_SETTINGS_FORMS + '_RESET',
  };
}
