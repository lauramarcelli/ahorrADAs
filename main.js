


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



const initializeApp = () => {
  $("#btn-nueva-operacion").addEventListener("click", () => {
      show ("#vista-operacion")
      hide ("#home")
      hide("#reportes-vista")
      hide("#categorias-vista")
  })

  $("#mostrar-categorias").addEventListener("click", () => {
      show ("#categorias-vista")
      hide ("#home")
      hide("#reportes-vista")
      hide("#vista-operacion")
  })

  $("#mostrar-balance").addEventListener("click", () =>{
      show("#home")
      hide("#categorias-vista")
      hide("#vista-operacion")
      hide ("#reportes-vista")
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
      hide ("#reportes-vista")
  })

  $("#btn-agregar-operacion").addEventListener("click", (e) => {
    e.preventDefault()
    agregarOperacion()
  })

  setDato("categorias", todasCategorias);
  setDato("operaciones", todasOperaciones);
  renderCategoriasOpciones(todasCategorias);
  renderCategoriasTabla(todasCategorias);

  $("#agregar-categoria").addEventListener("click", (e) => {
    e.preventDefault();
    enviarNuevoDato("categorias", guardarCategoriaDato);
    const categoriasActuales = obtenerDato("categorias");
    renderCategoriasOptciones(categoriasActuales);
    renderCategoriasTabla(categoriasActuales);
  });

  //setearOperaciones("operaciones", todasOperaciones)
  //renderOperaciones(todasOperaciones)

  //$("#btn-editar-operacion").addEventListener("click", (e) =>{
   // e.preventDefault()
   // editarOpeacion()
   //hide("#vista-editar-operacion")
   //show("#tabla-operaciones")
   //renderOperaciones(obtenerOperaciones("operaciones "))
  //})

}



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

const renderCategoriasOpciones = (categorias) => {
  limpiarContenedor("#categorias-filtro");
  for (const { nombre, id } of categorias) {
    $("#categorias-filtro").innerHTML += `
            <option value="${id}">${nombre}</option>
        `;
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
  const datoActual = obtenerDato(key);
  const nuevoDato = callback();
  datoActual.push(nuevoDato);
  setDato(key, datoActual);
};



/*const initializeApp = () => {
  setData("categories", allCategories);
  //setData("operations", allOperations);
  renderCategoriesOptions(allCategories);
  renderCategoriesTable(allCategories);

  $("#add-category").addEventListener("click", (e) => {
    e.preventDefault();
    sendNewData("categories", saveCategoryData);
    const currentCategories = getData("categories");
    renderCategoriesOptions(currentCategories);
    renderCategoriesTable(currentCategories);
  });
};
initializeApp();
*/

/* SECCION BOTON OPERACIONES QUE NO LOGRO RESOLVER

const obtenerOperaciones = (key) => JSON.parse(localStorage.obtenerItem(key))//para obtener cualquier dato del localstorage
const setearOperaciones = (key, array) => localStorage.setItem(key, JSON.stringify(array))

const todasOperaciones = obtenerOperaciones("operaciones") || []

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
    return {
        id: operacionId ? operacionId :  randomId(),
        descripcion: $("#descripcion-form").value,
        monto: $("#monto-form").valueAsNumber,
        tipo: $("#tipo-form").value,
        categoria: $("#categoria-form").value,
        fecha: $("#fecha-form").value,
    }
    
}

//FUNCION QUE ME TRAE PROBLEMAS PORQUE NO ME FUNCIONAN LOS BOTONES - FUNCION PARA INICIAR CON ARRAY VACIO


const agregarOperacion = () => {
  const actualOperacion = obtenerOperaciones("operaciones")
  const nuevosDatosOperacion = guardarNuevaOperacion()
  actualOperacion.push(nuevaOperacion)
  setearOperaciones("operaciones", actualOperacion)
}

//FUNCION ELIMINAR OPERACIONES

const eliminarOperacion = (id) => {
  const actualOperacion = obtenerOperaciones("operaciones").filter(operacion => operacion.id !== id)
  setearOperaciones("operaciones", actualOperacion)
  renderOperaciones(actualOperacion)
}

//FUNCION EDITAR OPERACIONES

const operacionEditar =() => {
  const operacionId = $("#btn-editar-operacion").getAttribute("data-id")
  const operacionesEditadas = obtenerOperaciones("operaciones").map(operacion => {
    if (operacion.id === operacionId) {
      return guardarNuevaOperacion(operacion.id)
    }
    return operacion

  })
  setearOperaciones("operaciones", operacionesEditadas) 
}

const editarOperacionForm =(id) =>{
  hide("#home")
  show("#vista-editar-operacion")
  $("#btn-editar-operacion").setAttribute("data-id", id)
  const operacionSeleccionada = obtenerOperaciones("operaciones").find(operacion => operacion.id === id)
  $("#descripcion-form").value = operacionSeleccionada.descripcion-form
  $("#monto-form").valueAsNumber= operacionSeleccionada.monto-form
  $("#tipo-form").value= operacionSeleccionada.tipo-form
  $("#categoria-form").value= operacionSeleccionada.categoria-form
  $("#fecha-form").value= operacionSeleccionada.fecha-form
  
}



*/




  window.addEventListener("load", initializeApp)