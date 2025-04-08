import { ONLYOFFICE_VOLTO_FILES_CONVERT } from '../../constants/ActionTypes';

export function convertFile(path, targetType) {
  return {
    request: {
      data: {
        path,
        targetType,
      },
      op: 'post',
      path: '/@onlyoffice-volto-convert-file',
    },
    type: ONLYOFFICE_VOLTO_FILES_CONVERT,
  };
}

export function resetConvertedFileState() {
  return {
    type: ONLYOFFICE_VOLTO_FILES_CONVERT + '_RESET',
  };
}
