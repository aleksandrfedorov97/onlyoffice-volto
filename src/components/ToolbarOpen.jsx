import { Plug } from '@plone/volto/components/manage/Pluggable';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import editingSVG from '@plone/volto/icons/editing.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

const messages = defineMessages({
  onlyofficeOpenTitle: {
    defaultMessage: 'Open in ONLYOFFICE',
    id: 'onlyoffice_open_title',
  },
});

const ToolbarOpen = ({ token }) => {
  const { pathname } = useLocation();
  const intl = useIntl();

  if (!__CLIENT__ || (__CLIENT__ && !token)) {
    return null;
  }

  const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  return (
    <Plug pluggable="main.toolbar.top" id="toolbar-onlyoffice-open" order={99}>
      <div className=" toolbar-onlyoffice-open" id="toolbar-onlyoffice-open">
        <Link to={`${path}/onlyoffice-edit`}>
          <Icon
            name={editingSVG}
            className="circled"
            size="30px"
            title={intl.formatMessage(messages.onlyofficeOpenTitle)}
          />
        </Link>
      </div>
    </Plug>
  );
};

ToolbarOpen.propTypes = {
  token: PropTypes.string,
};

export default ToolbarOpen;
