import { ModalForm } from '@plone/volto/components/manage/Form';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import onlyofficeConvertSVG from 'onlyoffice-volto/icons/onlyoffice-convert.svg';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { convertFile, resetConvertedFileState } from '../actions';
import { getConvertOptionsForFormat } from '../helpers';

const messages = defineMessages({
  onlyofficeConvertTitle: {
    defaultMessage: 'Convert',
    id: 'onlyoffice_convert_title',
  },
  onlyofficeConvertTypeDescription: {
    defaultMessage: 'Select file type you want to download',
    id: 'onlyoffice_convert_type_description',
  },
  onlyofficeConvertTypeTitle: {
    defaultMessage: 'Target type:',
    id: 'onlyoffice_convert_type_title',
  },
});

const ToolbarConvert = ({ token }) => {
  const { pathname } = useLocation();
  const intl = useIntl();
  const dispatch = useDispatch();

  const [convertModalOpen, setConvertModalOpen] = useState(false);
  const [convertError, setConvertError] = useState(null);
  const [convertFormats, setConvertFormats] = useState([]);

  const onlyofficeConvert = useSelector((state) => state.onlyofficeConvert);
  const data = useSelector((state) => state.content.data);

  useEffect(() => {
    if (__CLIENT__) {
      dispatch(resetConvertedFileState());
      setConvertError(null);
      return () => {
        dispatch(resetConvertedFileState());
        setConvertError(null);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, __CLIENT__]);

  useEffect(() => {
    if (data?.id) {
      const formatName = data.id.split('.').pop().toLowerCase();
      const formats = getConvertOptionsForFormat(formatName);
      setConvertFormats((prev) => {
        if (
          prev.length !== formats.length ||
          prev.some((val, i) => val !== formats[i])
        ) {
          return formats;
        }
        return prev;
      });
    } else {
      setConvertFormats([]);
    }
  }, [data?.id]);

  useEffect(() => {
    if (onlyofficeConvert.loaded && onlyofficeConvert.nutsnames) {
      const result = JSON.parse(onlyofficeConvert.nutsnames);

      if (result.error) {
        setConvertError(result.error);
      } else if (result.fileUrl) {
        const link = document.createElement('a');
        link.href = result.fileUrl;
        link.setAttribute('download', '');
        link.click();
        link.remove();
        setConvertModalOpen(false);
      }
    }
  }, [onlyofficeConvert]);

  const handleConvert = (formData) => {
    dispatch(convertFile(pathname, formData.targetType));
  };

  if (!__CLIENT__ || (__CLIENT__ && !token)) {
    return null;
  }

  return (
    <>
      <Plug
        pluggable="main.toolbar.top"
        id="toolbar-onlyoffice-convert"
        order={99}
      >
        <div className=" toolbar-onlyoffice-convert">
          <Button
            basic
            onClick={() => setConvertModalOpen(true)}
            aria-label={intl.formatMessage(messages.onlyofficeConvertTitle)}
          >
            <Icon
              name={onlyofficeConvertSVG}
              size="30px"
              title={intl.formatMessage(messages.onlyofficeConvertTitle)}
            />
          </Button>
        </div>
      </Plug>

      {convertModalOpen && convertFormats.length > 0 && (
        <ModalForm
          open={convertModalOpen}
          loading={onlyofficeConvert.loading}
          onSubmit={handleConvert}
          onCancel={() => setConvertModalOpen(false)}
          title={intl.formatMessage(messages.onlyofficeConvertTitle)}
          submitError={convertError}
          schema={{
            fieldsets: [
              {
                fields: ['targetType'],
                id: 'default',
              },
            ],
            properties: {
              targetType: {
                choices: convertFormats.map((type) => [type, type]),
                description: intl.formatMessage(
                  messages.onlyofficeConvertTypeDescription,
                ),
                title: intl.formatMessage(messages.onlyofficeConvertTypeTitle),
                type: 'string',
              },
            },
            required: ['targetType'],
          }}
        />
      )}
    </>
  );
};

ToolbarConvert.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ToolbarConvert;
