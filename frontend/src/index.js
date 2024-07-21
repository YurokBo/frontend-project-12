import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { initSocket } from './store/socket/socketApi';
import i18next from './i18next';

initSocket(store);

leoProfanity.add(leoProfanity.getDictionary('ru'));
leoProfanity.add(leoProfanity.getDictionary('en'));

const rollbarConfig = {
  accessToken: process.env.POST_CLIENT_ITEM,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

console.log(rollbarConfig.accessToken);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
