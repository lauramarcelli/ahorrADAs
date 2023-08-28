
//Selector DOM:

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


//Ocultar or Mostrar Funciones

const esconder = (selector) => $(selector).classList.add("hidden");
const mostrar = (selector) => $(selector).classList.remove("hidden");
const limpiarContenedor = (selector) => $(selector).innerHTML = ""


//Generador Aleatorio ID

const randomId = () => self.crypto.randomUUID()


//Localstorage Funciones

const obtenerDato = (key) => JSON.parse(localStorage.getItem(key))
const guardarDato = (key, array) => localStorage.setItem(key, JSON.stringify(array))

////////////////////////////////////////////////////////////////////////

/* SECCION CATEGORIAS*/

const categoriasPorDefault = [
  {
    id: randomId(),
    nombre: "Todas"
  },
  {
    id: randomId(),
    nombre: "Comida"
  },
  {
    id: randomId(),
    nombre: "Servicios"
  },
  {
    id: randomId(),
    nombre: "Salud"
  },
  {
    id: randomId(),
    nombre: "Educación"
  },
  {
    id: randomId(),
    nombre: "Salidas"
  },
  {
    id: randomId(),
    nombre: "Transporte"
  },
  {
    id: randomId(),
    nombre: "Trabajo"
  }
]

const todasCategorias = obtenerDato("categorias") || categoriasPorDefault
const todasOperaciones = obtenerDato("operaciones") || []



const renderCategoriasOpciones = (categorias) => {
  limpiarContenedor("#categorias-filtro");
  for (const { nombre, id } of categorias) {
    $("#categorias-filtro").innerHTML += `
            <option value="${id}">${nombre}</option>
        `
  $("#categoria-form").innerHTML += `
          <option value="${id}">${nombre}</option>
   `    

  $("#categoria-select").innerHTML += `
   <option value="${id}">${nombre}</option>
   `     
  }
    
};


const renderCategoriasTabla = (categorias) => {
  limpiarContenedor("#categorias-tabla");
  $("#categorias-tabla").classList.add("w-full");

  let tableHTML = `<table class="w-full">`;  

  for (const { nombre, id } of categorias) {

    tableHTML += `
            <tr class="w-full">
                <td class="w-1/2 pt-4 pb-4 pl-6">${nombre}</td>
                <td class="w-1/2 flex justify-end">
                <div id="btns-categoriaTabla">
                <button onclick="eliminarCategoria('${id}')" class="px-1 py-1 bg-[#facc15] text-white text-xs rounded ml-4 mb-2 mt-2 mr-2" data-id="${id}"> Eliminar </button>
                <button class="px-1 py-1 bg-[#84cc16] text-white text-xs rounded ml-4 mb-2 mt-2 mr-2" id="editar-categoria-${id}" onclick=editarCategoria("${id}") =>Editar</button>
                </div>
                    
                </td>
            </tr>
        `;
  }

  tableHTML += `</table>`;

  $("#categorias-tabla").innerHTML = tableHTML;

}

const guardarCategoriaDato =() => {
  const nombre = $("#categoriaPorEditar-input").value;
  return {
    id: randomId(),
    nombre,
  }
};
 

const enviarNuevoDato = (key, callback) => {
  let datoActual = obtenerDato(key);
  if (!datoActual) {
    datoActual = [];
  }
  const nuevoDato = callback();
  datoActual.push(nuevoDato);
  guardarDato(key, datoActual);
};

//SECCION PARA EDITAR y ELIMINAR CATEGORIA


let categoriaEditar = null;


const editarCategoria = (id) => {
 
  const categoria = todasCategorias.find((cat) => cat.id === id);
  if (categoria) {   
    categoriaEditar = id;
    mostrar("#editarcategorias-vista");
    esconder("#categorias-vista");
    $("#categoriaEditada-input").value = categoria.nombre;
    
  }
  console.log (categoria)
};


const confirmarCategoriaEditada = () => {
  if (categoriaEditar) {
    const nuevoNombre = $("#categoriaEditada-input").value;
    const categoria = todasCategorias.find((cat) => cat.id === categoriaEditar);
    if (categoria) {
      categoria.nombre = nuevoNombre;
      guardarDato("categorias", todasCategorias);
      esconder("#editarcategorias-vista");
      mostrar("#categorias-vista");
      renderCategoriasOpciones(todasCategorias);
      renderCategoriasTabla(todasCategorias);
    }
  }
};


const eliminarCategoria = (id) => {
  const actualesCategorias = todasCategorias.filter((cat) => cat.id !== id);
  guardarDato("categorias", actualesCategorias);
  renderCategoriasTabla(todasCategorias);
  renderCategoriasOpciones(todasCategorias);
};


//CANCELANDO EDICION DE CATEGORIAS

const cancelarEditarCategoria = () => {
  esconder("#editarcategorias-vista");
  mostrar("#categorias-vista");
};


/////////////////////////////////////////////////////////////////////


/*SECCION OPERACIONES*/



const guardarNuevaOperacion = (operacionId) => {
  return {
      id: operacionId ? operacionId :  randomId(),
      descripcion: $("#descripcion-form").value,
      monto: $("#monto-form").valueAsNumber,
      tipo: $("#tipo-form").value,
      categoria: $("#categoria-form").value,
      fecha: $("#fecha-form").value,

  }
}

const renderOperaciones = (operaciones) => {
  limpiarContenedor("#tabla-operaciones")
  if (operaciones.length){
    esconder("#reportes-vista")
    for(const {id, descripcion, monto, categoria, fecha} of operaciones){
      const categoriaSeleccionada = todasCategorias.find((cat) => cat.id === categoria)
      $("#tabla-operaciones").innerHTML += `
      <td class="font-medium pl-6 pb-3 pt-3">${descripcion}</td>
      <td class="text-xs font-semibold inline-block py-1 px-2 rounded text-purple-600 bg-purple-200 mt-4 ml-6 mr-4 mb-4">${categoriaSeleccionada.nombre}</td>
      <td class="pl-3 pb-3 pt-3">${fecha}</td>
      <td class="pl-6 pb-3 pt-3">${monto}</td>
        
      <td>
        <button class="pl-6 pb-3 pt-3 text-sm text-green-500" onclick="editarOperacionForm('${id}')"=>Editar</button>
        <button class="pl-3 pb-3 pt-3 text-sm text-red-500" onclick="eliminarOperacion('${id}')"=>Eliminar</button>
      </td>
    `
  }
  } else {
    mostrar ("#home")

  }
  
}

const agregarOperacion = () => {
  const actualOperacion = obtenerDato("operaciones")
  const nuevosDatosOperacion = guardarNuevaOperacion()
  actualOperacion.push(nuevosDatosOperacion)
  guardarDato("operaciones", actualOperacion)
  renderOperaciones(actualOperacion)
  
}

const eliminarOperacion = (id) => {
  const actualOperacion = obtenerDato("operaciones").filter(operacion => operacion.id !== id)
  guardarDato("operaciones", actualOperacion)
  renderOperaciones(actualOperacion)
}

const operacionEditar =() => {
  const operacionId = $("#btn-editar-operacion").getAttribute("data-id")
  const operacionesEditadas = obtenerDato("operaciones").map(operacion => {
    if (operacion.id === operacionId) {
      return guardarNuevaOperacion(operacion.id)
    }
    return operacion

  })
  guardarDato("operaciones", operacionesEditadas) 
}

const editarOperacionForm =(id) =>{
  esconder("#home")
  mostrar("#vista-editar-operacion")
  $("#btn-editar-operacion").setAttribute("data-id", id)
  const operacionSeleccionada = obtenerDato("operaciones").find(operacion => operacion.id === id)
  $("#descripcion-form").value = operacionSeleccionada.descripcion
  $("#monto-form").valueAsNumber= operacionSeleccionada.monto
  $("#tipo-form").value= operacionSeleccionada.tipo
  $("#categoria-form").value= operacionSeleccionada.categoria
  $("#fecha-form").value= operacionSeleccionada.fecha
  
}

/////////////////////////////////////////////////////////////////////


/*SECCION FILTROS*/


/*$("#tipo-filtro").onchange = () => {
  const operacionesFiltradasporTipo = obtenerDato("operaciones").filter(operacion =>  {
    if ($("#tipo-filtro").value === "Todas") {
      return operacion;
    }
    return operacion.tipo === $("#tipo-filtro").value;
  })

  renderOperaciones(operacionesFiltradasporTipo);
  console.log($("#tipo-filtro").value);
};

$("#categorias-filtro")= () => {
  const operacionesFiltradasporCategoria = obtenerDato("operaciones").filter(operacion => {
    if ($("#categorias-filtro").value === "Todas") {
      return operacion;
    }
    return operacion.categoria === $("#categorias-filtro").value;
  });

  renderOperaciones(operacionesFiltradasporCategoria);

  console.log($("#categorias-filtro").value);
};
*/

/////////////////////////////////////////////////////////////////////

// Filtros de operaciones//





//

const fecha = new Date();
document.getElementById("fecha-actual").value = fecha.toJSON().slice(0,10);



const initializeApp = () => {
  guardarDato("categorias", todasCategorias);
  guardarDato("operaciones", todasOperaciones);
  renderCategoriasOpciones(todasCategorias);
  renderCategoriasTabla(todasCategorias);
  renderOperaciones(todasOperaciones)

  if (todasOperaciones.length) {
    mostrar("#operaciones-tabla-home") 
    esconder("#sin-resultados")
    } else {
    esconder("#operaciones-tabla-home") 
    mostrar("#sin-resultados")
    }
 

$("#mostrar-categorias").addEventListener("click", () => {
  mostrar("#categorias-vista")
  mostrar("#categorias-tabla")
  esconder("#home")
  esconder("#reportes-vista")
  esconder("#vista-operacion")
  esconder("#editarcategorias-vista")
});
$("#mostrar-balance").addEventListener("click", () =>{
  mostrar("#home")
  esconder("#categorias-vista")
  esconder("#vista-operacion")
  esconder("#reportes-vista")
  esconder("#editarcategorias-vista")
});
$("#mostrar-reportes").addEventListener("click", () =>{
  mostrar("#reportes-vista")
  esconder("#home")
  esconder("#categorias-vista")
  esconder("#vista-operacion")
  esconder("#editarcategorias-vista")
});
$("#titulo-ahorradas").addEventListener("click", () =>{
  mostrar("#home")
  esconder("#categorias-vista")
  esconder("#vista-operacion")
  esconder("#reportes-vista")
  esconder("#editarcategorias-vista")
});
$("#ocultar-filtros").addEventListener("click", () =>{
  mostrar("#mostrar-filtros")
  esconder("#menu-tipo")
  esconder("#menu-categorias")
  esconder("#menu-desde")
  esconder("#menu-ordenarpor")
  esconder("#ocultar-filtros")
  });
  $("#mostrar-filtros").addEventListener("click", () =>{
    mostrar("#ocultar-filtros")
    mostrar("#menu-tipo")
    mostrar("#menu-categorias")
    mostrar("#menu-desde")
    mostrar("#menu-ordenarpor")
    esconder("#mostrar-filtros")
      });
  
        $("#agregar-categoria").addEventListener("click", (e) => {
          e.preventDefault();
          enviarNuevoDato("categorias", guardarCategoriaDato);
          const categoriasActuales = obtenerDato("categorias");
          renderCategoriasOpciones(categoriasActuales);
          renderCategoriasTabla(categoriasActuales);
          mostrar("#categorias-tabla")
          });

          $("#agregar-categoria").addEventListener("click", () => {
            $("#categoriaPorEditar-input").value = ""
              });

          $("#editarcategoria-btn").addEventListener("click", confirmarCategoriaEditada);

          $("#cancelarcategoria-btn").addEventListener("click", cancelarEditarCategoria);

          $("#btn-nueva-operacion").addEventListener("click", () => {
            mostrar("#vista-operacion")
            esconder("#home")
            esconder("#reportes-vista")
            esconder("#categorias-vista")
            esconder("#editarcategorias-vista")
           });
          
          $("#btn-nueva-operacion").addEventListener("click", () => {
            $("#descripcion-form").value = ""
            $("#monto-form").valueAsNumber = ""
            $("#tipo-form").value = ""
            $("#categoria-form").value = ""
            $("#fecha-form").value = ""

            }); 
        
          $("#btn-cancelar-operacion").addEventListener("click", () => {
            mostrar("#home") 
            esconder("#vista-operacion")
        
          })

          $("#btn-agregar-operacion").addEventListener("click", (e) => {
            e.preventDefault()
            agregarOperacion()
            mostrar("#operaciones-tabla-home")
            mostrar("#home")
            esconder("#vista-operacion")
            esconder("#sin-resultados")
          }); 
          
          $("#btn-editar-operacion").addEventListener("click", (e) =>{
            e.preventDefault()
            operacionEditar()
            esconder("#vista-editar-operacion")
            mostrar("#home")
            renderOperaciones(obtenerDato("operaciones"))
            });

          
                                       

}

window.addEventListener("load", initializeApp)
