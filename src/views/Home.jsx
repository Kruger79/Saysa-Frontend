import Navbar from "../components/Navbar";
import "../../public/css/Home.css";

export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="home-section">
        {/* Quiénes somos */}
        <div className="about-section">
          <div className="about-text">
            <h1>¿Quiénes somos?</h1>
            <p>
              Soluciones SaYsa es la conexión primaria que conecta el ámbito
              agrícola bananero y piñero, automatizando el proceso de
              importación de manera eficiente.
            </p>
          </div>

          <div className="about-image">
            <img
              src="https://i.pinimg.com/736x/ef/26/c7/ef26c79cf9004f1faa245a02c8dd6a84.jpg"
              alt="Banano"
            />
          </div>
        </div>

        {/* Proceso de cotización */}
        <div className="process-section">
          <h2>Proceso de Cotización</h2>
          <div className="cards-container">
            <div className="card active">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2xtOsxUkULZdXTc_De9JRJdVjit0tWMe5w&s"
                alt="Registro"
              />
              <h3>Registrarse</h3>
              <p>Crea tu cuenta fácilmente.</p>
            </div>

            <div className="card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzWtopO5fMn-XVLseal1CnHIP4iFhfGnQj7Q&s"
                alt="Seleccionar Productos"
              />
              <h3>Seleccionar Productos</h3>
              <p>Agrega los productos que necesites al carrito.</p>
               </div>

            <div className="card">
              <img
                src="https://cdn-icons-png.freepik.com/256/5952/5952806.png?semt=ais_hybrid"
                alt="Confirmar Pedido"
              />
              <h3>Confirmar Pedido</h3>
              <p>Finaliza tu pedido y nosotros nos encargamos.</p>
            </div>
          </div>
        </div>

        {/* Botón de WhatsApp */}
        <p style={{ textAlign: "center", marginTop: 32 }}>
          Si no encuentras el producto deseado envíanos un mensaje para ayudarte
        </p>
        <a
          href="https://wa.me/50689864016"
          className="whatsapp-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 Contáctanos por WhatsApp
        </a>
      </section>
    </div>
  );
}
