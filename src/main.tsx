// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AuthProvider from './context/AuthContext';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import './styles/main.scss'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  // </StrictMode>,
)
