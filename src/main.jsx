import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import router from './routes/routes.jsx';
import { store } from './redux/store.js';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <RouterProvider router={router} />
        <Toaster />
      </>
    </Provider>
  </React.StrictMode>
);
