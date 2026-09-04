const BASE_URL = "https://rickandmortyapi.com/api/character";

// Realiza una pausa que evita que la API se sature de peticiones
function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url) {
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
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

// Genera dinámicamente las URLs de  las todas páginas
function generarUrlsDePaginas(totalPaginas) {
  const urls = [];
  for (let pagina = 1; pagina <= totalPaginas; pagina++) {
    urls.push(`${BASE_URL}?page=${pagina}`);
  }
  return urls;
}

// Consume todas las páginas de la API y devuelve un único arreglo con todos los personajes
async function obtenerTodosLosPersonajes() {
  const { pages: totalPaginas } = await obtenerInfoInicial();
  const urls = generarUrlsDePaginas(totalPaginas);

  let personajes = [];
  for (const url of urls) {
    const data = await fetchJson(url);
    personajes = personajes.concat(data.results);
    await esperar(500);
  }

  return personajes;
}

module.exports = {
  fetchJson,
  obtenerInfoInicial,
  generarUrlsDePaginas,
  obtenerTodosLosPersonajes,
};