import './index.css';
import Layout from './components/Layout.jsx';
// import ItemListContainer from './components/Productos/ItemListContainer.jsx';
import Contacto from './components/Contacto.jsx';
import { FormularioContainer } from './components/Formulario/FormularioContainer.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Nosotros from './pages/About.jsx';
import ProductoDetalle from './components/Productos/ProductoDetalle.jsx';
import Cart from './components/Cart/Cart.jsx'
import Favoritos from './pages/Favoritos.jsx';
import CatalogoFiltrable from './components/Productos/Filtros.jsx';
import GuiaMolienda from './components/Membresia/Guiamolienda.jsx';
import MembresiaClub from './components/Membresia/MembresiaClub.jsx';




export default function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

      <Route path="/" element={<Home />} />
      
{/* <Route
    path="/productos"
    element={
        <section className="productos">
            <ItemListContainer Mensaje="Productos Seleccionados" />
        </section>
    }
/>*/}

<Route
    path="/productos"
    element={
      <>
        <section className="productos">
            <CatalogoFiltrable sincronizarUrl />
        </section>

      <GuiaMolienda />
      <MembresiaClub />

    </>
    }
/>

                <Route
          path="/nosotros"
          element={<Nosotros />}
        />    

        <Route
          path="/contacto"
          element={<Contacto />}
        />

        <Route path="/favoritos" element={<Favoritos />} />

        <Route
          path="/login"
          element={<FormularioContainer />}
        />

          <Route path = "/producto/:id" element={<ProductoDetalle />}></Route>

          <Route path="/carrito" element={<Cart />} />

      </Route>
          

          


    </Routes>
  );
}
