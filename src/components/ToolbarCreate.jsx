import { Plug } from '@plone/volto/components/manage/Pluggable';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import addDocumentSVG from '@plone/volto/icons/add-document.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  onlyofficeCreateTitle: {
    defaultMessage: 'Create in ONLYOFFICE',
    id: 'onlyoffice_create_title',
  },
});

const ToolbarCreate = (props) => {
  const { token } = props;
  const intl = useIntl();

  if (!__CLIENT__ || (__CLIENT__ && !token)) {
    return null;
  }

  return (
    <>
      <Plug pluggable="main.toolbar.bottom" id="onlyoffice-menu">
        {({ onClickHandler }) => {
          return (
            <button
              className="show-onlyoffice-toolbar-menu"
              aria-label={intl.formatMessage(messages.onlyofficeCreateTitle)}
              onClick={(e) => onClickHandler(e, 'onlyofficeToolbarMenu')}
              tabIndex={0}
              id="show-onlyoffice-toolbar-menu"
            >
              <Icon
                name={addDocumentSVG}
                className="circled"
                size="30px"
                title={intl.formatMessage(messages.onlyofficeCreateTitle)}
              />
            </button>
          );
        }}
      </Plug>
    </>
  );
};

ToolbarCreate.propTypes = {
  token: PropTypes.string,
};

export default ToolbarCreate;
