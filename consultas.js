//Punto B consultas

// 1. filter -> vivos y de especie Human
function obtenerHumanosVivos(personajes) {
  return personajes.filter(
    p => p.estado === "Alive" && p.especie === "Human"
  );
}

// 2. filter -> personajes con 20 o más episodios
function obtenerMuchosEpisodios(personajes) {
  return personajes.filter(
    p => p.cantidadEpisodios >= 20
  );
}

// 3. find -> primer personaje de especie Alien y género Female
function obtenerAlienFemale(personajes) {
  return personajes.find(
    p => p.especie === "Alien" && p.genero === "Female"
  );
}

// 4. some -> al menos un personaje con tipo definido
function existeConTipo(personajes) {
  return personajes.some(
    p => p.tipo && p.tipo.trim() !== ""
  );
}

// 5. every -> todos los personajes tienen imagen y al menos un episodio
function todosCumplenImagenEpisodios(personajes) {
  return personajes.every(
    p => Boolean(p.imagen) && p.cantidadEpisodios >= 1
  );
}

// 6. reduce -> agrupar por especie, cantidad, promedio de episodios y cantidad de vivos
function agruparPorEspecie(personajes) {
  const acumulado = personajes.reduce((acc, p) => {
    if (!acc[p.especie]) {
      acc[p.especie] = {
        cantidad: 0,
        sumaEpisodios: 0,
        vivos: 0,
      };
    }
 
    acc[p.especie].cantidad += 1;
    acc[p.especie].sumaEpisodios += p.cantidadEpisodios;
    if (p.estado === "Alive") {
      acc[p.especie].vivos += 1;
    }
 
    return acc;
  }, {});
 
  // Segunda pasada para calcular el promedio y quitar el sumaEpisodios por el promedio
  const resultado = {};
  for (const especie in acumulado) {
    const datos = acumulado[especie];
    resultado[especie] = {
      cantidad: datos.cantidad,
      promedioEpisodios: (datos.sumaEpisodios / datos.cantidad),
      vivos: datos.vivos,
    };
  }
 
  return resultado;
}

// 7. reduce -> clasificar por rango de episodios
function clasificarPorRangoEpisodios(personajes) {
  return personajes.reduce((acc, p) => {
    

    if (p.cantidadEpisodios >= 1 && p.cantidadEpisodios <= 5) {
      acc["1-5"] += 1;
    } else if (p.cantidadEpisodios >= 6 && p.cantidadEpisodios <= 15) {
      acc["6-15"] += 1;
    } else if (p.cantidadEpisodios >= 16 && p.cantidadEpisodios <= 30) {
      acc["16-30"] += 1;
    } else if (p.cantidadEpisodios > 30) {
      acc["30+"] += 1;
    } 

    return acc;
  }, { "1-5": 0, "6-15": 0, "16-30": 0, "30+": 0 });
}

module.exports = {
    obtenerHumanosVivos,
    obtenerMuchosEpisodios,
    obtenerAlienFemale,
    existeConTipo,
    todosCumplenImagenEpisodios,
    agruparPorEspecie,
    clasificarPorRangoEpisodios
};