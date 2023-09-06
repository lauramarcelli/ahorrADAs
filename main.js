//Selector DOM:

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

//Hide or show Functions

const hide = (selector) => $(selector).classList.add("hidden");
const show = (selector) => $(selector).classList.remove("hidden");
const cleanContainer = (selector) => ($(selector).innerHTML = "");

//Random Generator

const randomId = () => self.crypto.randomUUID();

//Localstorage Funciones

const getData = (key) => JSON.parse(localStorage.getItem(key));
const saveData = (key, array) =>
  localStorage.setItem(key, JSON.stringify(array));

////////////////////////////////////////////////////////////////////////

/* SECCION categories*/

const categoriesByDefault = [
  {
    id: randomId(),
    name: "Comida",
  },
  {
    id: randomId(),
    name: "Servicios",
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
    name: "Salidas",
  },
  {
    id: randomId(),
    name: "Transporte",
  },
  {
    id: randomId(),
    name: "Trabajo",
  },
];

const allCategories = getData("categories") || categoriesByDefault;

const allOperations = getData("operations") || [];

const renderCategoriesOptions = (categories) => {
  cleanContainer("#categories-filter");
  for (const { name, id } of categories) {
    $("#categories-filter").innerHTML += `
            <option value="${id}">${name}</option>
        `;
    $("#category-form").innerHTML += `
          <option value="${id}">${name}</option>
   `;

    $("#category-select").innerHTML += `
   <option value="${id}">${name}</option>
   `;
  }
};

const renderCategoriesTable = (categories) => {
  cleanContainer("#categories-table");
  $("#categories-table").classList.add("w-full");

  let tableHTML = `<table class="w-full">`;

  for (const { name, id } of categories) {
    tableHTML += `
            <tr class="w-full">
                <td class="w-1/2 pt-4 pb-4 pl-6">${name}</td>
                <td class="w-1/2 flex justify-end">
                <div id="btns-categorytable">
                <button onclick="deleteCategory('${id}')" class="px-1 py-1 bg-[#facc15] text-white text-xs rounded ml-4 mb-2 mt-2 mr-2" data-id="${id}"> Eliminar </button>
                <button class="px-1 py-1 bg-[#84cc16] text-white text-xs rounded ml-4 mb-2 mt-2 mr-2" id="edit-category-${id}" onclick=editcategory("${id}") =>Editar</button>
                </div>
                    
                </td>
            </tr>
        `;
  }

  tableHTML += `</table>`;

  $("#categories-table").innerHTML = tableHTML;
};

const saveCategoryData = () => {
  const name = $("#categorieToEdit-input").value;
  return {
    id: randomId(),
    name,
  };
};

const sendNewData = (key, callback) => {
  let currentData = getData(key);
  if (!currentData) {
    currentData = [];
  }
  const newData = callback();
  currentData.push(newData);
  saveData(key, currentData);
};

//SECCION PARA EDITAR y ELIMINAR category

let categoryEdit = null;

const editcategory = (id) => {
  const category = allCategories.find((cat) => cat.id === id);
  if (category) {
    categoryEdit = id;
    show("#editcategories-view");
    hide("#categories-view");
    $("#categorieEdit-input").value = category.name;
  }
  console.log(category);
};

const confirmCategoryEdited = () => {
  if (categoryEdit) {
    const newName = $("#categorieEdit-input").value;
    const category = allCategories.find((cat) => cat.id === categoryEdit);
    if (category) {
      category.name = newName;
      saveData("categories", allCategories);
      hide("#editcategories-view");
      show("#categories-view");
      renderCategoriesOptions(allCategories);
      renderCategoriesTable(allCategories);
    }
  }
};

const deleteCategory = (id) => {
  const currentCategories = allCategories.filter((cat) => cat.id !== id);
  saveData("categories", currentCategories);
  renderCategoriesTable(allCategories);
  renderCategoriesOptions(allCategories);
};

//CANCELANDO EDICION DE categories

const cancelEditCategory = () => {
  hide("#editcategories-view");
  show("#categories-view");
};

/////////////////////////////////////////////////////////////////////

/*SECCION OPERACIONES*/

const saveNewOperation = (operationId) => {
  return {
    id: operationId ? operationId : randomId(),
    description: $("#description-form").value,
    amount: $("#amount-form").valueAsNumber,
    type: $("#type-form").value,
    category: $("#category-form").value,
    date: $("#date-form").value,
  };
};

const renderOperations = (operations) => {
  cleanContainer("#table-operations");
  if (operations.length) {
    hide("#report-view");
    for (const {
      id,
      description,
      type,
      amount,
      category,
      date,
    } of operations) {
      const categorieSelected = allCategories.find(
        (cat) => cat.id === category
      );
      $("#table-operations").innerHTML += `
      <td class="font-medium pl-6 pb-3 pt-3">${description}</td>
      <td class="text-xs font-semibold inline-block py-1 px-2 rounded text-purple-600 bg-purple-200 mt-4 ml-6 mr-4 mb-4">${
        categorieSelected.name
      }</td>
      <td class="pl-6 pb-3 pt-3">${
        type == "Ganancia" ? accEarnings.push(amount) : accSpendt.push(amount)
      }</td>
      <td class="pl-3 pb-3 pt-3">${date}</td>
      <td class="pl-6 pb-3 pt-3"> ${
        type === "spent" ? "-" : "+"
      }  $ ${amount}</td>    
      <td>
        <button class="pl-6 pb-3 pt-3 text-sm text-green-500" onclick="editOperationForm('${id}')"=>Editar</button>
        <button class="pl-3 pb-3 pt-3 text-sm text-red-500" onclick="deleteOperation('${id}')"=>Eliminar</button>
      </td>
    `;
    }
  } else {
    show("#home");
  }
  if (accEarnings == 0) {
    $("#show-earnings").innerHTML = "0";
  } else {
    for (let i = 0; i < accEarnings.length; i++) {
      accE = accE + accEarnings[i];
      $("#show-earnings").innerHTML = accE;
    }
  }

  if (accSpendt == 0) {
    $("#show-spendings").innerHTML = "0";
  } else {
    for (let i = 0; i < accSpendt.length; i++) {
      accS = accS + accSpendt[i];
      $("#show-spendings").innerHTML = accS;
    }
  }
};

const addOperation = () => {
  const currentOperation = getData("operations");
  const newDataOperation = saveNewOperation();
  currentOperation.push(newDataOperation);
  saveData("operations", currentOperation);
  renderOperations(currentOperation);
};

const deleteOperation = (id) => {
  const currentOperation = getData("operations").filter(
    (operation) => operation.id !== id
  );
  saveData("operations", currentOperation);
  renderOperations(currentOperation);
};

const operationEdit = () => {
  const operationId = $("#btn-edit-operation").getAttribute("data-id");
  const operationEdited = getData("operations").map((operation) => {
    if (operation.id === operationId) {
      return saveNewOperation(operation.id);
    }
    return operation;
  });
  saveData("operations", operationEdited);
};

const editOperationForm = (id) => {
  hide("#home");
  show("#view-edit-operation");
  $("#btn-edit-operation").setAttribute("data-id", id);
  const operationSelected = getData("operations").find(
    (operation) => operation.id === id
  );
  $("#description-form").value = operationSelected.description;
  $("#amount-form").valueAsNumber = operationSelected.amount;
  $("#type-form").value = operationSelected.type;
  $("#category-form").value = operationSelected.category;
  $("#date-form").value = operationSelected.date;
};

/////////////////////////////////////////////////////////////////////

/*SECCION filterS*/

/*$("#type-filter").onchange = () => {
  const operationsFiltradasportype = getData("operations").filter(operation =>  {
    if ($("#type-filter").value === "Todas") {
      return operation;
    }
    return operation.type === $("#type-filter").value;
  })

  renderOperations(operationsFiltradasportype);
  console.log($("#type-filter").value);
};

$("#categories-filter")= () => {
  const operationsFiltradasporcategory = getData("operations").filter(operation => {
    if ($("#categories-filter").value === "Todas") {
      return operation;
    }
    return operation.category === $("#categories-filter").value;
  });

  renderOperations(operationsFiltradasporcategory);

  console.log($("#categories-filter").value);
};
*/

/////////////////////////////////////////////////////////////////////

//Filtrar operaciones//
const allFilters = () => {
  const selectType = $("#type-filter").value;
  console.log(allOperations);
  const filterType = allOperations.filter((operacion) => {
    if (selectType === "") {
      return allCategories;
    }
    return selectType === operacion.type;
  });
 
  const selectCategory = $("#categories-filter").value;
  const filterCategory = filterType.filter((operacion) => {
    if (selectCategory === "") {
      return operacion;
    }
    return selectCategory === operacion.category;
  });

  const inputDate = $("#today-date").value;
  console.log(inputDate)
  const filterDate = filterCategory.filter((operacion) => {
    return new Date(operacion.date) > new Date(inputDate);
  });
 
  const selectSortBy = $("#order-by").value;
  console.log(selectSortBy);
  const filterSort = filterDate.filterSort((a,b) =>{
 if(selectSortBy === "more"){
  return a.date > b.date ? 1 : -1;
 }
 if(selectSortBy === "less"){
  return a.date < b.date ? 1 : -1
 }
//  if(selectSortBy === "")


  })
};

//
const fecha = new Date();
// document.getElementById("fecha-actual").value = fecha.toJSON().slice(0,10);

const initializeApp = () => {
  saveData("categories", allCategories);
  saveData("operations", allOperations);
  renderCategoriesOptions(allCategories);
  renderCategoriesTable(allCategories);
  renderOperations(allOperations);

  if (allOperations.length) {
    show("#operations-table-home");
    hide("#no-results");
  } else {
    hide("#operations-table-home");
    show("#no-results");
  }

  $("#show-categories").addEventListener("click", () => {
    show("#categories-view");
    show("#categories-table");
    hide("#home");
    hide("#report-view");
    hide("#operation-view");
    hide("#editcategories-view");
  });
  $("#show-balance").addEventListener("click", () => {
    show("#home");
    hide("#categories-view");
    hide("#operation-view");
    hide("#report-view");
    hide("#editcategories-view");
  });
  $("#show-reports").addEventListener("click", () => {
    show("#report-view");
    hide("#home");
    hide("#categories-view");
    hide("#operation-view");
    hide("#editcategories-view");
  });
  $("#title-ahorradas").addEventListener("click", () => {
    show("#home");
    hide("#categories-view");
    hide("#operation-view");
    hide("#report-view");
    hide("#editcategories-view");
  });
  $("#hide-filters").addEventListener("click", () => {
    show("#show-filters");
    hide("#menu-type");
    hide("#menu-categories");
    hide("#menu-from");
    hide("#menu-arrangeby");
    hide("#hide-filters");
  });
  $("#show-filters").addEventListener("click", () => {
    show("#hide-filters");
    show("#menu-type");
    show("#menu-categories");
    show("#menu-from");
    show("#menu-arrangeby");
    hide("#show-filters");
  });

  $("#toAdd-categorie").addEventListener("click", (e) => {
    e.preventDefault();
    sendNewData("categories", saveCategoryData);
    const currentCategories = getData("categories");
    renderCategoriesOptions(currentCategories);
    renderCategoriesTable(currentCategories);
    show("#categories-table");
  });

  $("#toAdd-categorie").addEventListener("click", () => {
    $("#categorieToEdit-input").value = "";
  });

  $("#editcategorie-btn").addEventListener("click", confirmCategoryEdited);

  $("#cancelcategorie-btn").addEventListener("click", cancelEditCategory);

  $("#btn-new-operation").addEventListener("click", () => {
    show("#operation-view");
    hide("#home");
    hide("#report-view");
    hide("#categories-view");
    hide("#editcategories-view");
  });

  $("#btn-new-operation").addEventListener("click", () => {
    $("#description-form").value = "";
    $("#amount-form").valueAsNumber = "";
    $("#type-form").value = "";
    $("#category-form").value = "";
    $("#date-form").value = "";
  });

  $("#btn-cancel-operation").addEventListener("click", () => {
    show("#home");
    hide("#operation-view");
  });

  $("#btn-add-operation").addEventListener("click", (e) => {
    e.preventDefault();
    addOperation();
    show("#operations-table-home");
    show("#home");
    hide("#operation-view");
    hide("#no-results");
  });

  $("#btn-edit-operation").addEventListener("click", (e) => {
    e.preventDefault();
    operationEdit();
    hide("#view-edit-operation");
    show("#home");
    renderOperations(getData("operations"));
  });

  $("#type-filter").addEventListener("input", () => {
    const filterType = allFilters();
    console.log(filterType);
    // renderOperations(operationType)
  });

  $("#categories-filter").addEventListener("input",() =>{
    const filterCategories = allFilters()
    console.log(filterCategories)
  })

  $("#today-date").addEventListener("input", () =>{
    const filterDate = allFilters()
    console.log(filterDate)
  })

  $("#order-by").addEventListener("input", () =>{
    const filterSort = allFilters()
    console.log(filterSort)
  })
};

window.addEventListener("load", initializeApp);
