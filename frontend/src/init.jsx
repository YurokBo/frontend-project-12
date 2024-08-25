import React from 'react';
import leoProfanity from 'leo-profanity';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import store from './store';
import initSocket from './store/socket/socketApi';
import i18next from './i18next';
import App from './App';
import rollbarConfig from './rollbarConfig';

const init = () => {
  initSocket(store);

  leoProfanity.add(leoProfanity.getDictionary('ru'));
  leoProfanity.add(leoProfanity.getDictionary('en'));

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <StoreProvider store={store}>
            <BrowserRouter>
              <I18nextProvider i18n={i18next}>
                <App />
              </I18nextProvider>
            </BrowserRouter>
          </StoreProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default init;
