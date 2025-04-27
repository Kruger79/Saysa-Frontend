import { useEffect, useState } from 'react';
import { obtenerProductos } from '../api/productos';
import ProductoCard from '../components/ProductoCard';
import Navbar from '../components/Navbar';
import '../public/css/Productos.css';

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const data = await obtenerProductos();
        console.log("Productos cargados:", data);
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    }

    cargarProductos();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>🛒 Productos disponibles</h1>
      <div className="grid">
        {productos.map(producto => (
          <ProductoCard key={producto.IdProducto} producto={producto} />
        ))}
      </div>
    </div>
  );
}
