import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';
import backSVG from '@plone/volto/icons/back.svg';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { getConfig, resetConfigState } from '../../actions';

const OnlyofficeEditor = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userSession.token);
  const onlyofficeConfig = useSelector((state) => state.onlyofficeConfig);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && token) {
      const path = pathname.replace('/onlyoffice-edit', '');
      dispatch(getConfig(path));
      return () => {
        dispatch(resetConfigState());
      };
    }
  }, [isClient, token, pathname, dispatch]);

  useEffect(() => {
    if (!onlyofficeConfig.loaded) return;

    const script = document.createElement('script');
    script.src = `${onlyofficeConfig.nutsnames.docUrl}web-apps/apps/api/documents/api.js`;
    script.async = true;

    const initializeEditor = () => {
      let docEditor;
      const config = JSON.parse(onlyofficeConfig.nutsnames.editorCfg);
      const { demo } = onlyofficeConfig;

      const onAppReady = () => {
        if (demo) {
          docEditor.showMessage(demo.message);
        }
      };

      const editorConfig = {
        ...config,
        events: { onAppReady },
        height: '600px',
        width: '100%',
      };

      if (typeof DocsAPI === 'undefined') {
        document.getElementById('onlyofficeErrorNotAccessible').style.display =
          'block';
        return;
      }

      const docsVersion = DocsAPI.DocEditor.version().split('.');
      const majorVersion = parseInt(docsVersion[0], 10);
      const minorVersion = parseInt(docsVersion[1], 10);

      if (majorVersion < 6 || (majorVersion === 6 && minorVersion === 0)) {
        document.getElementById(
          'onlyofficeErrorNotSupportedVersion',
        ).style.display = 'block';
        return;
      }

      if (
        (editorConfig.document.fileType === 'docxf' ||
          editorConfig.document.fileType === 'oform') &&
        majorVersion < 7
      ) {
        document.getElementById(
          'onlyofficeErrorNotSupportedVersionForm',
        ).style.display = 'block';
        return;
      }

      docEditor = new DocsAPI.DocEditor('onlyofficeEditor', editorConfig);
    };

    script.onload = initializeEditor;
    script.onerror = (error) => {
      console.error('Failed to load ONLYOFFICE script:', error);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [onlyofficeConfig]);

  if (!isClient || !token) {
    return <Unauthorized />;
  }

  const basePath = pathname.replace(/\/onlyoffice-edit$/, '');

  return (
    <Container className="onlyoffice-editor-container">
      <>
        <div id="onlyofficeEditor" />

        <div id="onlyofficeErrorNotAccessible" style={{ display: 'none' }}>
          DocumentServer not accessible.
        </div>
        <div
          id="onlyofficeErrorNotSupportedVersion"
          style={{ display: 'none' }}
        >
          Not supported version of DocumentServer.
        </div>
        <div
          id="onlyofficeErrorNotSupportedVersionForm"
          style={{ display: 'none' }}
        >
          Please update ONLYOFFICE Docs to version 7.0 to work on fillable forms
          online.
        </div>
        {isClient &&
          createPortal(
            <Toolbar
              pathname={pathname}
              hideDefaultViewButtons
              inner={
                <Link to={basePath} className="cancel">
                  <Icon
                    name={backSVG}
                    className="circled"
                    size="30px"
                    title="Back to document"
                  />
                </Link>
              }
            />,
            document.getElementById('toolbar'),
          )}
      </>
    </Container>
  );
};

export default OnlyofficeEditor;
