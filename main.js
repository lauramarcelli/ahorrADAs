//Selector DOM:
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const hide = (selector) => $(selector).classList.add("hidden");
const show = (selector) => $(selector).classList.remove("hidden");

//CLEAN
const cleanContainer = (selector) => ($(selector).innerHTML = "");

//Random Id Generator
const randomId = () => self.crypto.randomUUID();

//Localstorage Handlers

const obtenerOperaciones = (key) => JSON.parse(localStorage.obtenerItem(key))//para obtener cualquier dato del localstorage
const setearOperaciones = (key, array) => localStorage.setItem(key, JSON.stringify(array))

//funcion para guardar datos del formulario de boton nueva operacion
const guardarNuevaOperacion = () => {
    return{
        id: randomId(),
        descripcion: $("#descripcion-form").value,
        monto: $("#monto-form").valueAsNumber,
        tipo: $("#tipo-form").value,
        categoria: $("#categoria-form").value,
        fecha: $("#fecha-form").value,
    }
    
}

const agregarOperacion = () => {
    const nuevosDatosOperacion = guardarNuevaOperacion()
    console.log(nuevosDatosOperacion)
}

//agregar categorias
const defaultCategorias = [
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

const initializeApp = () =>{
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

    $("#btn-agregar-operacion").addEventListener("click", (e) =>{
      e.preventDefault()
      agregarOperacion()
    })
}


window.addEventListener("load", initializeApp)