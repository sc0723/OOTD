import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { OutfitsContextProvider } from './context/OutfitContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OutfitsContextProvider>
      <App />
    </OutfitsContextProvider>
  </React.StrictMode>
);



