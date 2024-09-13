import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppRouter } from './router';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer 
        position="top-left"
        theme="dark"
      />
    </BrowserRouter> 
  )
}

export default App
