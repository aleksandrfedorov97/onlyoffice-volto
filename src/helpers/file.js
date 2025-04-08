import formatsData from './onlyoffice-docs-formats.json';

export const getDefaultExtByType = (str) => {
  if (str === 'word') {
    return 'docx';
  }
  if (str === 'cell') {
    return 'xlsx';
  }
  if (str === 'slide') {
    return 'pptx';
  }
  if (str === 'form') {
    return 'docxf';
  }
  return null;
};

export const getDefaultNameByType = (str) => {
  if (str === 'word') {
    return 'Document';
  }
  if (str === 'cell') {
    return 'Spreadsheet';
  }
  if (str === 'slide') {
    return 'Presentation';
  }
  if (str === 'form') {
    return 'PDF form';
  }
  return null;
};

export const getSupportedFormats = () => {
  const supportedFormats = formatsData
    .filter(
      (format) =>
        format.actions?.includes('view') || format.actions?.includes('edit'),
    )
    .map((format) => format.name);
  return `*(${supportedFormats.join('|')})`;
};

export const getFormatsWithConvertOptions = () => {
  const formatsWithConvert = formatsData
    .filter((format) => format.convert && format.convert.length > 0)
    .map((format) => format.name);

  return formatsWithConvert.length > 0
    ? `*(${formatsWithConvert.join('|')})`
    : '';
};

export const getConvertOptionsForFormat = (formatName) => {
  const format = formatsData.find((item) => item.name === formatName);
  return format?.convert || [];
};
