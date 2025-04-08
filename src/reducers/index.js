import { get as onlyofficeConfig } from './config/get';
import { convert as onlyofficeConvert } from './files/convert';
import { create as onlyofficeCreate } from './files/create';
import { forms as onlyofficeForms } from './settings/forms';
import { save as onlyofficeSave } from './settings/save';

const reducers = {
  onlyofficeConfig,
  onlyofficeConvert,
  onlyofficeCreate,
  onlyofficeForms,
  onlyofficeSave,
};

export default reducers;
