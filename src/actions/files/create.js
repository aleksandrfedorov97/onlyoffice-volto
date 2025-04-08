import { ONLYOFFICE_VOLTO_FILES_CREATE } from '../../constants/ActionTypes';

export function createFile(documentType, folderUID) {
  return {
    request: {
      data: {
        documentType,
        folderUID,
      },
      op: 'post',
      path: '/@onlyoffice-volto-create-file',
    },
    type: ONLYOFFICE_VOLTO_FILES_CREATE,
  };
}

export function resetCreatedFileState() {
  return {
    type: ONLYOFFICE_VOLTO_FILES_CREATE + '_RESET',
  };
}
