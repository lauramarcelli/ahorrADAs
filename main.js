


//Selector DOM:
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const hide = (selector) => $(selector).classList.add("hidden");
const show = (selector) => $(selector).classList.remove("hidden");

//LIMPIAR
const limpiarContenedor = (selector) => ($(selector).innerHTML = "");


//Random Id Generator
const randomId = () => self.crypto.randomUUID();

//Localstorage Handlers


const obtenerDato = (key) => JSON.parse(localStorage.getItem(key))
const setDato = (key, array) => localStorage.setItem(key, JSON.stringify(array))
/*editarCategoria: () => {
  const categoriaId = $("#editar-categoria").getAttribute("id")
  const categoriasEditadas = obtenerDato("categorias").map(categoria => {
      if (categoria.id === categoriaId) {
          return guardarCategoriaDato(user.id)
      }
      return categoria
  })
  setDato("categorias", categoriasEditadas)
},*/



/* SECCION CATEGORIAS*/

const categoriasPorDefault = [
  {
    id: randomId(),
    nombre: "Comida",
  },
  {
    id: randomId(),
    nombre: "Transporte",
  },
  {
    id: randomId(),
    nombre: "Salud",
  },
  {
    id: randomId(),
    nombre: "Educación",
  },
  {
    id: randomId(),
    nombre: "Entretenimiento",
  },
];

const todasCategorias = obtenerDato("categorias") || categoriasPorDefault

const guardarCategoriaDato =() => {
  const nombre = $("#categoria-input").value;
  return {
    id: randomId(),
    nombre,
  }
};

const renderCategoriasOpciones = (categorias) => {
  limpiarContenedor("#categorias-filtro");
  for (const { nombre, id } of categorias) {
    $("#categorias-filtro").innerHTML += `
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
                    <button class="px-1 py-1 bg-[#facc15] text-white text-xs rounded ml-4 mb-2 mt-2 mr-2" id="eliminar-categoria-${id}">Eliminar</button>
                    <button class="px-1 py-1 bg-[#84cc16] text-white text-xs rounded ml-4 mb-2 mt-2 mr-2" id="editar-categoria-${id}">Editar</button>
                </td>
            </tr>
        `;
  }

  tableHTML += `</table>`;

  $("#categorias-tabla").innerHTML = tableHTML;

  /*for (const btnEditar of $$("#editar-categoria")) {
    btnEditar.addEventListener("click", () => {
        const categoriaId = btnEditar.getAttribute("id")
        Render.editarCategoriaTabla(categoriaId)
    })
}*/
}




const enviarNuevoDato = (key, callback) => {
  let datoActual = obtenerDato(key);
  if (!datoActual) {
    datoActual = [];
  }
  const nuevoDato = callback();
  datoActual.push(nuevoDato);
  setDato(key, datoActual);
};





/* SECCION OPERACIONES QUE NO LOGRO RESOLVER*/



/*const todasOperaciones = obtenerDato("operaciones") || []

const renderOperaciones = (operaciones) =>{
  limpiarContenedor("#tabla-operaciones")
  if (operaciones.length){
    hide ("#reportes-vista")
    for(const {id, descripcion, monto, tipo, categoria, fecha} of operaciones){
      const categoriaSeleccionada = obtenerDato("catgorias").find(cat => cat.id === categoria)
      $("#tabla-operaciones").innerHTML += `
      <td>${descripcion}</td>
      <td>${monto}</td>
      <td>${tipo}</td>
      <td>${categoriaSeleccionada.nombre}</td>
      <td>${fecha}</td>
      <td>
        <button class="text-sm text-green-500" onclick="editarOperacion('${id}')">Editar</button>
        <button class="text-sm text-red-500" onclick="eliminarOperacion('${id}')">Eliminar</button>
      </td>
    `
  }
  } else {
    show ("#reportes-vista")

  }
  
}



//funcion para guardar datos del formulario de boton nueva operacion
const guardarNuevaOperacion = (operacionId) => {
    const categoriaId = $("categorias").options[$("categorias").selectedIndex ].getAttribute("data-id")
    return {
        id: operacionId ? operacionId :  randomId(),
        descripcion: $("#descripcion-form").value,
        monto: $("#monto-form").valueAsNumber,
        tipo: $("#tipo-form").value,
        categoria: categoriaId,
        fecha: $("#fecha-form").value,
    }
    
}




//FUNCION QUE ME TRAE PROBLEMAS PORQUE NO ME FUNCIONAN LOS BOTONES - FUNCION PARA INICIAR CON ARRAY VACIO


const agregarOperacion = () => {
  const actualOperacion = obtenerDato("operaciones")
  const nuevosDatosOperacion = guardarNuevaOperacion()
  actualOperacion.push(nuevaOperacion)
  setDato("operaciones", actualOperacion)
}



const eliminarOperacion = (id) => {
  const actualOperacion = obtenerDato("operaciones").filter(operacion => operacion.id !== id)
  setDato("operaciones", actualOperacion)
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
  setDato("operaciones", operacionesEditadas) 
}

const editarOperacionForm =(id) =>{
  hide("#home")
  show("#vista-editar-operacion")
  $("#btn-editar-operacion").setAttribute("data-id", id)
  const operacionSeleccionada = obtenerDato("operaciones").find(operacion => operacion.id === id)
  $("#descripcion-form").value = operacionSeleccionada.descripcion-form
  $("#monto-form").valueAsNumber= operacionSeleccionada.monto-form
  $("#tipo-form").value= operacionSeleccionada.tipo-form
  $("#categoria-form").value= operacionSeleccionada.categoria-form
  $("#fecha-form").value= operacionSeleccionada.fecha-form
  
}

*/


const initializeApp = () => {
  setDato("categorias", todasCategorias);
  //setDato("operaciones", todasOperaciones);
  renderCategoriasOpciones(todasCategorias);
  renderCategoriasTabla(todasCategorias);

  $("#btn-nueva-operacion").addEventListener("click", () => {
      show("#vista-operacion")
      hide("#home")
      hide("#reportes-vista")
      hide("#categorias-vista")
  })

  $("#mostrar-categorias").addEventListener("click", () => {
      show("#categorias-vista")
      show("#categorias-tabla")
      hide("#home")
      hide("#reportes-vista")
      hide("#vista-operacion")
  })

  $("#mostrar-balance").addEventListener("click", () =>{
      show("#home")
      hide("#categorias-vista")
      hide("#vista-operacion")
      hide("#reportes-vista")
  })

  $("#mostrar-reportes").addEventListener("click", () =>{
      show("#reportes-vista")
      hide("#home")
      hide("#categorias-vista")
      hide("#vista-operacion")
  })

  $("#titulo-ahorradas").addEventListener("click", () =>{
      show("#home")
      hide("#categorias-vista")
      hide("#vista-operacion")
      hide("#reportes-vista")
  })

  $("#ocultar-filtros").addEventListener("click", () =>{
    show("#mostrar-filtros")
    hide("#menu-tipo")
    hide("#menu-categorias")
    hide("#menu-desde")
    hide("#menu-ordenarpor")
    hide("#ocultar-filtros")
    
})

$("#mostrar-filtros").addEventListener("click", () =>{
  show("#ocultar-filtros")
  show("#menu-tipo")
  show("#menu-categorias")
  show("#menu-desde")
  show("#menu-ordenarpor")
  hide("#mostrar-filtros")
  
})


  $("#btn-agregar-operacion").addEventListener("click", (e) => {
    e.preventDefault()
    agregarOperacion()
  })

  

  $("#agregar-categoria").addEventListener("click", (e) => {
    e.preventDefault();
    enviarNuevoDato("categorias", guardarCategoriaDato);
    const categoriasActuales = obtenerDato("categorias");
    renderCategoriasOpciones(categoriasActuales);
    renderCategoriasTabla(categoriasActuales);
    show("#categorias-tabla")
    });

  //setDato("operaciones", todasOperaciones)
 // renderOperaciones(todasOperaciones)

/* $("#btn-editar-operacion").addEventListener("click", (e) =>{
  e.preventDefault()
  editarOpeacion()
  hide("#vista-editar-operacion")
  show("#tabla-operaciones")
  renderOperaciones(obtenerDato("operaciones "))
  })*/

}


  window.addEventListener("load", initializeApp)