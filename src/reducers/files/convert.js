import { ONLYOFFICE_VOLTO_FILES_CONVERT } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  nutsnames: {},
};

export const convert = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${ONLYOFFICE_VOLTO_FILES_CONVERT}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };

    case `${ONLYOFFICE_VOLTO_FILES_CONVERT}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${ONLYOFFICE_VOLTO_FILES_CONVERT}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        nutsnames: action.result,
      };

    case `${ONLYOFFICE_VOLTO_FILES_CONVERT}_RESET`:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
