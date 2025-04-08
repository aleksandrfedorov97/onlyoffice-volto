import { ONLYOFFICE_VOLTO_SETTINGS_FORMS } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  nutsnames: {},
};

export const forms = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${ONLYOFFICE_VOLTO_SETTINGS_FORMS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };

    case `${ONLYOFFICE_VOLTO_SETTINGS_FORMS}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${ONLYOFFICE_VOLTO_SETTINGS_FORMS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        nutsnames: action.result,
      };

    case `${ONLYOFFICE_VOLTO_SETTINGS_FORMS}_RESET`:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
