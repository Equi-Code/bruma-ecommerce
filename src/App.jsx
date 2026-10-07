import './index.css'
import Layout from './components/Layout.jsx';
// import TarjetaProducto from './components/TarjetaProducto.jsx';
import ItemListContainer from './components/ItemListContainer.jsx';
import Contacto from './components/Contacto.jsx';

export default function App() {

  return (
    <>


      <Layout>

        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Bienvenido a Bruma</h1>
            <p className="hero-description">Descubre nuestra selección de productos de alta calidad.</p>
            <a href="#" className="hero-button">Explorar productos</a>
          </div>
        </section>

        <section className="productos">
          <h2 className="productos-title">Productos Seleccionados</h2>
          <p className="productos-description">Descubre nuestra selección de productos de alta calidad.</p>

          <div className='productos-grid'>

        <ItemListContainer />

          </div>

        </section>



        <Contacto />

        

      </Layout>



    </>
  )
}

