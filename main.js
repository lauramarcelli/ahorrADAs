


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

  //setearOperaciones("operaciones", todasOperaciones)
  //renderOperaciones(todasOperaciones)

}



/* SECCION CATEGORIAS*/

const categoriasPorDefault = [
  {
    id: randomId(),
    name: "Comida",
  },
  {
    id: randomId(),
    name: "Transporte",
  },
  {
    id: randomId(),
    name: "Salud",
  },
  {
    id: randomId(),
    name: "Educación",
  },
  {
    id: randomId(),
    name: "Entretenimiento",
  },
];

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
    <button class="text-sm text-green-500">Editar</button>
    <button class="text-sm text-red-500" onclick="eliminarOperacion('${id}')">Eliminar</button>
    </td>
    `
  }
  }else{
    show ("#reportes-vista")

  }
  
}



//funcion para guardar datos del formulario de boton nueva operacion
const guardarNuevaOperacion = () => {
    return {
        id: randomId(),
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

const eliminarOperacion = (id) => {
  const actualOperacion = obtenerOperaciones("operaciones").filter(operacion => operacion.id !== id)
  setearOperaciones("operaciones", actualOperacion)
  renderOperaciones(actualOperacion)
}
*/




  window.addEventListener("load", initializeApp)