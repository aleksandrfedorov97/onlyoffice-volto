import { ONLYOFFICE_VOLTO_SETTINGS_SAVE } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  nutsnames: {},
};

export const save = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${ONLYOFFICE_VOLTO_SETTINGS_SAVE}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };

    case `${ONLYOFFICE_VOLTO_SETTINGS_SAVE}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${ONLYOFFICE_VOLTO_SETTINGS_SAVE}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        nutsnames: action.result,
      };

    case `${ONLYOFFICE_VOLTO_SETTINGS_SAVE}_RESET`:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
