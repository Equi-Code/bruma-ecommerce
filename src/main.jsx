// import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './components/Cart/CartProvider.jsx'
import { createRoot } from 'react-dom/client'
import { FavoritosProvider } from './context/FavoritosProvider.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CartProvider>
    <FavoritosProvider>
    <App />
    </FavoritosProvider>
    </CartProvider>
  </BrowserRouter>,
)
