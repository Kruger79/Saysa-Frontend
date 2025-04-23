import { useEffect, useState } from 'react';
import { obtenerProductos } from '../api/productos';
import ProductoCard from '../components/ProductoCard';
import '../../public/css/Home.css';

export default function Home() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    async function cargarProductos() {
      try {
        debugger;
        const data = await obtenerProductos();
        console.log("Productos cargados:", data); // 👀 Debug
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    }

    cargarProductos();
  }, []);

  return (
    <div>
      <h1>🛒 Productos</h1>
      <div className="grid">
        {productos.map(producto => (
          <ProductoCard key={producto.IdProducto} producto={producto} />
        ))}
      </div>
    </div>
  );
}