


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


const obtenerDato = (key) => {
  const item = localStorage.getItem(key);
  return item !== null ? JSON.parse(item) : [];
};
const setearDato = (key, array) => localStorage.setItem(key, JSON.stringify(array))




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

const renderCategoriasOpciones = (categorias) => {
  limpiarContenedor("#categorias-filtro");
  for (const { nombre, id } of categorias) {
    $("#categorias-filtro").innerHTML += `
            <option value="${id}">${nombre}</option>
        `;
    }
};


const renderCategoriasTabla = (categorias) => {
  limpiarContenedor("#categorias-tabla");
  $("#categorias-tabla").classList.add("w-full");

  let tableHTML = `<table class="w-full">`;

  for (const { nombre, id } of categorias) {
    tableHTML += `
            <tr class="w-full">
                <td class="w-1/2 pr-4">${nombre}</td>
                <td class="w-1/2 flex justify-end">
                    <button class="px-1 py-0.5 bg-red-500 text-white text-xs rounded mr-2" id="eliminar-categoria-${id}">Eliminar</button>
                    <button class="px-1 py-0.5 bg-yellow-500 text-white text-xs rounded" id="editar-categoria-${id}">Editar</button>
                </td>
            </tr>
        `;
  }

  tableHTML += `</table>`;

  $("#categorias-tabla").innerHTML = tableHTML;
};




const enviarNuevoDato = (key, callback) => {
  let datoActual = obtenerDato(key);
  if (!datoActual) {
    datoActual = [];
  }
  const nuevoDato = callback();
  datoActual.push(nuevoDato);
  setDato(key, datoActual);
};





/* SECCION BOTON OPERACIONES QUE NO LOGRO RESOLVER*/



/*const todasOperaciones = obtenerDato("operaciones") || []

const renderOperaciones = (operaciones) =>{
  limpiarContenedor("#tabla-operaciones")
  if (operaciones.length){
    hide ("#reportes-vista")
    for(const {id, descripcion, monto, tipo, categoria, fecha} of operaciones){
    $("#tabla-operaciones").innerHTML += `
    <td>${descripcion}</td>
    <td>${monto}</td>
    <td>${tipo}</td>
    <td>${categoria}</td>
    <td>${fecha}</td>
    <td>
    <button class="text-sm text-green-500" onclick="editarOperacion('${id}')">Editar</button>
    <button class="text-sm text-red-500" onclick="eliminarOperacion('${id}')">Eliminar</button>
    </td>
    `
  }
  }else{
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


}

//FUNCION QUE ME TRAE PROBLEMAS PORQUE NO ME FUNCIONAN LOS BOTONES - FUNCION PARA INICIAR CON ARRAY VACIO


const agregarOperacion = () => {
  const actualOperacion = obtenerDato("operaciones")
  const nuevosDatosOperacion = guardarNuevaOperacion()
  actualOperacion.push(nuevaOperacion)
  setearDato("operaciones", actualOperacion)
}

//FUNCION ELIMINAR OPERACIONES

const eliminarOperacion = (id) => {
  const actualOperacion = obtenerDato("operaciones").filter(operacion => operacion.id !== id)
  setearDato("operaciones", actualOperacion)
  renderOperaciones(actualOperacion)
}

//FUNCION EDITAR OPERACIONES

const operacionEditar =() => {
  const operacionId = $("#btn-editar-operacion").getAttribute("data-id")
  const operacionesEditadas = obtenerDato("operaciones").map(operacion => {
    if (operacion.id === operacionId) {
      return guardarNuevaOperacion(operacion.id)
    }
    return operacion

  })
  setearDato("operaciones", operacionesEditadas) 
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
  //setDato("categorias", todasCategorias);
  //setDato("operaciones", todasOperaciones);
  //renderCategoriasOpciones(todasCategorias);
  //renderCategoriasTabla(todasCategorias);
 
  $("#btn-nueva-operacion").addEventListener("click", () => {
      show("#vista-operacion")
      hide("#home")
      hide("#reportes-vista")
      hide("#categorias-vista")
  })

  $("#mostrar-categorias").addEventListener("click", () => {
      show("#categorias-vista")
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

  $("#btn-agregar-operacion").addEventListener("click", (e) => {
    e.preventDefault()
    agregarOperacion()
  })

  

  /*$("#agregar-categoria").addEventListener("click", (e) => {
    e.preventDefault();
    enviarNuevoDato("categorias", guardarCategoriaDato);
    const categoriasActuales = obtenerDato("categorias");
    renderCategoriasOpciones(categoriasActuales);
    renderCategoriasTabla(categoriasActuales);
  });*/

  //setearDato("operaciones", todasOperaciones)
  //renderOperaciones(todasOperaciones)

  //$("#btn-editar-operacion").addEventListener("click", (e) =>{
   // e.preventDefault()
   // editarOpeacion()
   //hide("#vista-editar-operacion")
   //show("#tabla-operaciones")
   //renderOperaciones(obtenerDato("operaciones "))
  //})

}


  window.addEventListener("load", initializeApp)