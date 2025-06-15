// Esta función usa el mismo backend de cotizaciones
export async function crearCotizacion(datos) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cotizaciones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Error al guardar cotización:", text);
    throw new Error("Error al guardar cotización");
  }

  return await response.json();
}
