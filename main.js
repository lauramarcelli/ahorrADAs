////////////////////////////////////////////////////////////////////////

/* Selector Dom*/

///////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////

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


const validateNewCategory = () =>{
  const newCategoryForm = $("#categorieToEdit-input").value
  if(newCategoryForm == ""){
    show ("#complete-field-category")
  }
  return newCategoryForm !== ""
}



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
                <button class="px-1 py-1 bg-[#84cc16] text-white text-xs rounded ml-4 mb-2 mt-2 mr-2" id="edit-category-${id}" onclick="editcategory('${id}')" >Editar</button>
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
    console.log(category)
  }
  ;
  return category
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
  currentCategories = getData("categories").filter((cat) => cat.id !== id);
  console.log(currentCategories)
  saveData("categories", currentCategories);
  renderCategoriesTable(currentCategories);
  renderCategoriesOptions(currentCategories);

};



//CANCELANDO EDICION DE categories

const cancelEditCategory = () => {
  hide("#editcategories-view");
  show("#categories-view");
};

////////////////////////////////////////////////////////////////////////

/* SECCION operaciones*/

///////////////////////////////////////////////////////////////////////

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
  let accE = 0;
  let accS = 0;
  let accEarnings = [];
  let accSpendt = [];
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
      <td class=" justify-self-auto font-medium pl-6 pb-3 pt-3">${description}</td>
      <td class="justify-self-auto text-xs font-semibold inline-block py-1 px-2 rounded text-purple-600 bg-purple-200 mt-4 ml-6 mr-4 mb-4">${
      categorieSelected.name
      }</td>
      <td class="justify-self-auto pl-[30px] pt-4 font-bold max-sm:pl-[5px]"${
        type === "earnings" ? accEarnings.push(amount) : accSpendt.push(amount)
      }
      </td>
      <td class="justify-self-auto pl-3 pb-3 pt-3">${new Date(
        date + "T00:00:00-03:00"
      ).getDate()}/${new Date(date).getMonth() + 1}/${new Date(
        date
      ).getFullYear()}</td>
      <td id ="amount-result" class=" justify-self-auto font-semibold pl-6 pb-3 pt-3  ${
        type === "earnings" ? "text-[#22c55e]" : "text-[#ef4444]"
      }"> ${type === "spent" ? "-" : "+"}$${amount}</td>    
      <td>
        <button class=" pl-6 pb-3 pt-3 text-sm text-green-500" onclick="editOperationForm('${id}')"=>Editar</button>
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

  let accAll = accE - accS;

  if (accAll === 0) {
    $("#show-results").innerHTML = "0";
    $("#show-results").classList.add("text-black");
    $("#local-currency").classList.add("text-black");
  } else if (accAll > 0) {
    $("#show-results").classList.add("text-[#22c55e]");
    $("#local-currency").classList.add("text-[#22c55e]");
    $("#show-results").innerHTML = accAll;
  } else {
    $("#show-results").classList.add("text-[#ef4444]");
    $("#local-currency").classList.add("text-[#ef4444]");
    $("#show-results").innerHTML = accAll;
  }
};

const description = $("#description-form")
const validateDescriptionOperation = () =>{
  if(description.value == ""){
    show("#complete-field")
  }
  return description.value !== ""
}



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
  hide("#new-operation-title");
  hide("#btn-add-operation");
  show("#operation-view");
  show("#title-edit");
  show("#btn-edit-operation");

  const operationSelected = getData("operations").find(
    (operation) => operation.id === id
  );
  $("#btn-edit-operation").setAttribute("data-id", id);
  $("#description-form").value = operationSelected.description;
  $("#amount-form").valueAsNumber = operationSelected.amount;
  $("#type-form").value = operationSelected.type;
  $("#category-form").value = operationSelected.category;
  $("#date-form").value = operationSelected.date;
};



//------------Filtros de Operaciones---------------------//

const filterType = (operations, myType) => {
  let filteredOperations = operations.filter(
  (operation) => operation.type === myType
  );
  console.log(filteredOperations);
  return filteredOperations;
};

const filterCategory = (operations, typeCategory) => {
  let filterCategory = operations.filter(
  (operation) => operation.category === typeCategory);
  console.log(filterCategory);
  return filterCategory;
};


const filterDate = (operations, dateOperation) => {
  let filterDate = operations.filter(
  (operation) => new Date(operation.date) >= new Date(dateOperation));
  console.log(filterDate);
  return filterDate;
};



const orderBy = (operation, orderOperation) =>{
let filterOrder = operation.sort((a, b) => {
      if (orderOperation === "more") {
        return a.date < b.date ? 1 : -1;
      }
      if (orderOperation === "less") {
        return a.date > b.date ? 1 : -1;
      }
      if (orderOperation === "lower-amount") {
        
        return a.amount > b.amount ? 1 : -1;
      }
      if (orderOperation === "greater-amount") {
        return a.amount < b.amount ? 1 : -1;
      }
      if (orderOperation === "az") {
    return a.description > b.description ? 1 : -1;
      }
      if (orderOperation === "za") {
      return a.description < b.description ? 1 : -1;
      }
    });
    console.log(filterOrder)
    return filterOrder
}

//Aplicar filtros//

const applyFilter = () => {
  let filteredOperations = [...allOperations];
  let myType = $("#type-filter").value;
  let typeCategory = $("#categories-filter").value;
  let dateOperation = $("#today-date").value;
  let orderOperation = $("#order-by").value;

  if (myType != "all") {
    console.log(filterType(filteredOperations, myType));
    filteredOperations = filterType(filteredOperations, myType);
  }

  if (typeCategory != "all-category") {
    console.log(filterCategory(filteredOperations, typeCategory));
    filteredOperations = filterCategory(filteredOperations, typeCategory);
  }

  if (dateOperation != "all") {
    console.log(filterDate(filteredOperations, dateOperation));
    filteredOperations = filterDate(filteredOperations, dateOperation);
    
  }

  filteredOperations = orderBy(allOperations, orderOperation)

  console.log(filteredOperations);
  renderOperations(filteredOperations);
};

$("#type-filter").addEventListener("input", () => applyFilter());

$("#categories-filter").addEventListener("change", () => applyFilter());

$("#today-date").addEventListener("change", () => applyFilter());

$("#order-by").addEventListener("input", () =>{
applyFilter()
})


////////////////////////////////////////////////////////////////////////

/*MANEJO DEL DOM*/

///////////////////////////////////////////////////////////////////////

const selecDateFilter= () => {
  var fecha = new Date();
  var mes = fecha.getMonth() + 1;
  var dia = fecha.getDate();
  var ano = fecha.getFullYear();
  if (dia < 10) dia = "0" + dia;
  if (mes < 10) mes = "0" + mes;
  $("#today-date").value = ano + "-" + mes + "-" + dia;
  $("#date-form").value = ano + "-" + mes + "-" + dia;

};


const initializeApp = () => {

  saveData("categories", allCategories);
  saveData("operations", allOperations);
  renderCategoriesOptions(allCategories);
  renderCategoriesTable(allCategories);
  renderOperations(allOperations);
  selecDateFilter()

  
  const currentDay = () => {
    $$(".today").forEach((input) => {
      input.valueAsDate = new Date();
      console.log(input);
    });
    console.log($$(".today"));
  };

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
    hide("#complete-field-category")

  });
  $("#show-balance").addEventListener("click", () => {
    show("#home");
    hide("#categories-view");
    hide("#operation-view");
    hide("#report-view");
    hide("#editcategories-view");
    hide("#complete-field")
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
    if(validateNewCategory()){
          sendNewData("categories", saveCategoryData);
    const currentCategories = getData("categories");
    renderCategoriesOptions(currentCategories);
    renderCategoriesTable(currentCategories);
    show("#categories-table");
    hide("#complete-field-category")
    }

  });

  $("#toAdd-categorie").addEventListener("click", () => {
    $("#categorieToEdit-input").value = "";
  });

  $("#editcategorie-btn").addEventListener("click", confirmCategoryEdited);

  $("#cancelcategorie-btn").addEventListener("click", cancelEditCategory);

  $("#btn-new-operation").addEventListener("click", () => {
  
    show("#operation-view");
    show("#btn-add-operation");
    show("#new-operation-title");
    hide("#btn-edit-operation");
    hide("#title-edit");
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
    if(validateDescriptionOperation()){
      addOperation();
       show("#operations-table-home");
    show("#home");
    hide("#operation-view");
    hide("#no-results");
    }
  
  });

  $("#btn-edit-operation").addEventListener("click", (e) => {
    e.preventDefault();
    operationEdit();
    hide("#operation-view");
    show("#home");
    renderOperations(getData("operations"));
  })

};

window.addEventListener("load", initializeApp);

