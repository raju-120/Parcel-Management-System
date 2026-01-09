import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import {RouterProvider} from "react-router";
import { router } from './router/router.jsx';
import { ThemeProvider } from './Context/ThemeContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <div className='font-urbanist max-w-[2300px] mx-auto mt-10'>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  </StrictMode>,
)
