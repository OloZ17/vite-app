// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';

///createRoot(document.getElementById('root')!).render(
///  <StrictMode>
///    <App />
///  </StrictMode>,
///)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function enableMocking() {
  if (!import.meta.env.VITE_ENABLE_MSW) {
    return
  }

  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );


});