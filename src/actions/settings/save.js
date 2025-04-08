import { ONLYOFFICE_VOLTO_SETTINGS_SAVE } from '../../constants/ActionTypes';

export function saveSettings(
  docUrl,
  demoEnabled,
  jwtSecret,
  ploneUrl,
  docInnerUrl,
) {
  return {
    request: {
      data: {
        demoEnabled,
        docInnerUrl,
        docUrl,
        docUrlPublicValidation: true,
        jwtSecret,
        ploneUrl,
      },
      op: 'post',
      path: '/@onlyoffice-volto-settings-save',
    },
    type: ONLYOFFICE_VOLTO_SETTINGS_SAVE,
  };
}

export function resetSaveState() {
  return {
    type: ONLYOFFICE_VOLTO_SETTINGS_SAVE + '_RESET',
  };
}
