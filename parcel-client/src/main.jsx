import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import {RouterProvider} from "react-router";
import { router } from './router/router.jsx';
import { ThemeProvider } from './Context/ThemeContext.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';

AOS.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <div className='font-urbanist max-w-[2300px] mx-auto mt-10'>
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
