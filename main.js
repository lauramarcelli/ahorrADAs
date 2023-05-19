//Selector DOM:
const $ = (selector) => document.querySelector(selector);

const hide = (selector) => $(selector).classList.add("hidden");
const show = (selector) => $(selector).classList.remove("hidden");

//CLEAN
const cleanContainer = (selector) => ($(selector).innerHTML = "");

//Random Id Generator
const randomId = () => self.crypto.randomUUID();

//Localstorage Handlers

const getOperations = (key) => JSON.parse(localStorage.getItem(key))//para obetener cualquier dato del localstorage
const setOperations = (key, array) => localStorage.setItem(key, JSON.stringify(array))



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
}



window.addEventListener("load", initializeApp)