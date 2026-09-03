const BASE_URL = "https://rickandmortyapi.com/api/character";

// validando status y content-type antes de intentar parsear JSON.
async function fetchJson(url) {
  const respuesta = await fetch(url);

  if (!respuesta.ok) { // en vez de seguir intentando parsear el json
    const texto = await respuesta.text();
    throw new Error(
      `Error HTTP ${respuesta.status} en ${url}. Respuesta: ${texto.slice(0, 150)}`
    );
  }

  return respuesta.json();
}

async function obtenerInfoInicial() {
  const data = await fetchJson(BASE_URL);
  return data.info; 
}

// generando dinámicamente las URLs de las páginas.
function generarUrlsDePaginas(totalPaginas) {
  const urls = [];
  for (let pagina = 1; pagina <= totalPaginas; pagina++) {
    urls.push(`${BASE_URL}?page=${pagina}`);
  }
  return urls;
}

module.exports = {
  fetchJson,
  obtenerInfoInicial,
  generarUrlsDePaginas,
};