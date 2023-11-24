import React from 'react';
import ReactDOM from 'react-dom/client';
import FetchCard from '././fetchCard';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FetchCard />
  </React.StrictMode>
);
