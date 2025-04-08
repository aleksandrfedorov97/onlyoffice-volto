import { get as onlyofficeConfig } from './config/get';
import { forms as onlyofficeForms } from './settings/forms';
import { save as onlyofficeSave } from './settings/save';

const reducers = {
  onlyofficeConfig,
  onlyofficeForms,
  onlyofficeSave,
};

export default reducers;
