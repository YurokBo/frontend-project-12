import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { ErrorBoundary } from '@rollbar/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { initSocket } from './store/socket/socketApi';
import i18next from './i18next';

initSocket(store);

leoProfanity.add(leoProfanity.getDictionary('ru'));
leoProfanity.add(leoProfanity.getDictionary('en'));

const rollbarConfig = {
  accessToken: 'c3e3993a84fb4e40a2f0f21ce8966092',
  environment: 'production',
  // accessToken: '23bd92fae990454b8789ad3be0601895',
  // environment: 'testenv',
};

// function TestError() {
//   const a = null;
//   return a.hello();
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <I18nextProvider i18n={i18next}>
            {/* <TestError /> */}
            <App />
          </I18nextProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
