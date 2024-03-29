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

const validateNewCategory = () => {
  const newCategoryForm = $("#categorieToEdit-input").value;
  if (newCategoryForm == "") {
    show("#complete-field-category");
  }
  return newCategoryForm !== "";
};

const renderCategoriesOptions = (categories) => {
  cleanContainer("#categories-filter");
  $("#categories-filter").innerHTML = `
<option value="">Todas</option>
`;
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
                <td class="w-1/2 pt-4 pb-4 pl-5">${name}</td>
                <td class="mr-4 flex justify-end">
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
    console.log(category);
  }

  return category;
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
      renderOperations(allOperations)
    }
  }

};


const deleteCategory = (id) => {
  currentCategories = getData("categories").filter((cat) => cat.id !== id);

  saveData("categories", currentCategories);
  renderCategoriesTable(currentCategories);
  renderCategoriesOptions(currentCategories);

  //elimina operacion relacionada a la categoria eliminada//
  const currentOperation = getData("operations").filter(
    (operation) => operation.category !== id
  );
  saveData("operations", currentOperation);
  renderOperations(currentOperation);
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
      const categorieSelected = getData("categories").find(
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

const description = $("#description-form");
const validateDescriptionOperation = () => {
  if (description.value == "") {
    show("#complete-field");
  }
  return description.value !== "";
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

//------------FILTROS---------------------//

const filterType = (operations, myType) => {
  let filteredOperations = operations.filter(
    (operation) => operation.type === myType
  );
  return filteredOperations;
};

const filterCategory = (operations, typeCategory) => {
  let filterCategory = operations.filter(
    (operation) => operation.category === typeCategory
  );
  return filterCategory;
};

const filterDate = (operations, dateOperation) => {
  let filterDate = operations.filter(
    (operation) => new Date(operation.date) >= new Date(dateOperation)
  );
  return filterDate;
};

const orderBy = (operation, orderOperation) => {
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
  return filterOrder;
};

//Aplicar filtros//

const applyFilter = () => {
  let filteredOperations = getData("operations");
  let myType = $("#type-filter").value;
  let typeCategory = $("#categories-filter").value;
  let dateOperation = $("#today-date").value;
  let orderOperation = $("#order-by").value;

  if (myType != "all") {
    filteredOperations = filterType(filteredOperations, myType);
  }
  if (typeCategory != "") {
    filteredOperations = filterCategory(filteredOperations, typeCategory);
  }

  filteredOperations = filterDate(filteredOperations, dateOperation);

  filteredOperations = orderBy(filteredOperations, orderOperation);

  console.log("operacionesordenadas", filteredOperations);
  renderOperations(filteredOperations);
};

//Eventos filtros//

$("#type-filter").addEventListener("input", () => applyFilter());

$("#categories-filter").addEventListener("change", () => applyFilter());

$("#today-date").addEventListener("change", () => applyFilter());

$("#order-by").addEventListener("change", () => applyFilter());


////////////////////////////////////////////////////////////////////////

/* SECCION reportes*/

///////////////////////////////////////////////////////////////////////


const resumenCategory = (allOperations) => {

  //------categoria mayor ganancia ---------//

  let profitCategory = "";
  let highestProfitAmount = 0;
  //mayor gasto//
  let higherExpenseCategory = "";
  let amountExpenseCategory = 0;

  // balance//
  let nombreBalance = ""
   let montoBlance = 0

for (let { name, id } of allCategories) {
  let operationCategories = allOperations.filter((operation) => operation.category === id);
  const highestProfitCategory = operationCategories.filter((operation) => operation.type === "earnings");
  let totalProfit = highestProfitCategory.reduce((acc, monto) => acc + monto.amount,0);
  if(profitCategory === "" && highestProfitAmount === 0){
      profitCategory = name;
      highestProfitAmount = totalProfit;
  }else if(highestProfitAmount < totalProfit){
      profitCategory = name;
      highestProfitAmount = totalProfit;
  }

 let opeCategory = allOperations.filter( (operation) => operation.category === id);
  const largestExpenseCategory = opeCategory.filter((operation) => operation.type === "spent");
  let totalAmountExpense = largestExpenseCategory.reduce((accSpent, amountSpent) => accSpent + amountSpent.amount,0 );
  if (higherExpenseCategory === "" && amountExpenseCategory === 0) {
    higherExpenseCategory = name;
    amountExpenseCategory = totalAmountExpense;
  } else if (amountExpenseCategory < totalAmountExpense) {
    higherExpenseCategory = name;
    amountExpenseCategory = totalAmountExpense;
  }
      let balance = totalProfit - totalAmountExpense
 console.log(name, balance)
  if(nombreBalance === "" && montoBlance === 0){
   nombreBalance = name
 montoBlance = balance
  }else if(montoBlance < balance){
   nombreBalance = name
   montoBlance = balance
    console.log(nombreBalance, balance)
  }
     //MONTOS BALANCE POR CATEGORIA//
  $("#table-totals").innerHTML += `
    <tr>
    <td class="justify-self-auto text-xs font-semibold inline-block py-1 px-1 rounded text-purple-600 bg-purple-200 mt-4 ml-6 mr-4 mb-4"> ${name}</td>
    <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3 text-[#22c55e]"> +$${totalProfit}</td>
    <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3 text-[#ef4444]"> $${totalAmountExpense}</td>
    <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3 "> $${balance}</td>
   </tr>`;

   }

   $("#highest-balance-category").innerHTML = `
   <td class="whitespace-nowrap px-6 py-4 font-medium">Categoría con mayor balance</td>
   <td class="justify-self-auto text-xs font-semibold inline-block py-1 px-1 rounded text-purple-600 bg-purple-200 mt-4 ml-6 mr-4 mb-4"> ${nombreBalance}</td>
   <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3 text-[#22c55e]"> +$${montoBlance}</td>
   `

 $("#most-profitable-category").innerHTML = `
   <td class="whitespace-nowrap px-6 py-4 font-medium">Categoria con mayor ganancia</td>
   <td class="justify-self-auto text-xs font-semibold inline-block py-1 px-1 rounded text-purple-600 bg-purple-200 mt-4 ml-6 mr-4 mb-4"> ${profitCategory}</td>
   <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3 text-[#22c55e]"> +$${highestProfitAmount}</td>
  `;
  $("#largest-expense-category").innerHTML += `
   <td class="whitespace-nowrap px-6 py-4 font-medium">Categoría con mayor gasto</td>
   <td class="justify-self-auto text-xs font-semibold inline-block py-1 px-1 rounded text-purple-600 bg-purple-200 mt-4 ml-6 mr-4 mb-4"> ${higherExpenseCategory}</td>
   <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3 text-[#ef4444]"> -$${amountExpenseCategory} </td>
 `;
  //---------mes con mayor ganancia-----------//
  let highestProfitMonth = "";
  let totalMonth = 0;

  for (let { date, amount } of allOperations) {
  let   dateYearMonth = date.slice(0, 7);
    let operEarnings = allOperations.filter(
      (operations) => operations.type === "earnings"
    );
    let forMonth = operEarnings.filter(
      (operations) => operations.date.slice(0, 7) === dateYearMonth);
    let totalEarnings = forMonth.reduce(
      (acc, amountMonth) => acc + amountMonth.amount,0);
  if (highestProfitMonth === "" && totalMonth === 0) {
      highestProfitMonth = dateYearMonth;
      totalMonth = totalEarnings;
  } else if (totalMonth < totalEarnings) {
      highestProfitMonth = dateYearMonth;
      totalMonth = totalEarnings;
  }
  $("#highest-profit-month").innerHTML = `
    <td class="whitespace-nowrap px-6 py-4 font-medium">Mes con mayor ganancia</td>
    <td class="pl-6 text-black-400 font-semibold "> ${highestProfitMonth}</td>
   <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3 text-[#22c55e] flex"> $${totalMonth} </td>
  `;
  //----------mes mayor gasto--------//
   let highestSpendingMonth = "";
   let largestAmountSpendt = 0;
   let opeSpents = allOperations.filter(
      (operations) => operations.type === "spent");
   let opeMonth = opeSpents.filter(
      (operations) => operations.date.slice(0, 7) === dateYearMonth
    );
    let totalSpents = opeMonth.reduce((accSpe, spentMonth) =>
     accSpe + spentMonth.amount,0);
  if (highestSpendingMonth === "" && largestAmountSpendt === 0) {
      highestSpendingMonth = dateYearMonth;
      largestAmountSpendt = totalSpents;
  } else if (largestAmountSpendt < totalSpents) {
      highestSpendingMonth = dateYearMonth;
      largestAmountSpendt = totalSpents;
  }
 
  $("#highest-spending-month").innerHTML = `
   <td class="whitespace-nowrap px-6 py-4 font-medium">Mes con mayor gasto</td>
   <td class="pl-6 text-black-400 font-semibold "> ${highestSpendingMonth}</td>
   <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3 text-[#ef4444] "> $${largestAmountSpendt} </td>
  `
  
  }
  
};
resumenCategory(allOperations)


//-----Totales por Mes-----------------//

const resumenMonth = (operations) => {
const totalsByMonth = {};

operations.forEach((operation) => {
  const date = operation.date.slice(0, 7);
  const amounth = operation.amount;

  if(!totalsByMonth[date]) {
  totalsByMonth[date] = {
    totalSpents: 0,
    totalEarnings:0,
  };
}
  
if(operation.type === "spent"){
  totalsByMonth[date].totalSpents += amounth;
} else if(operation.type === "earnings"){
  totalsByMonth[date].totalEarnings += amounth;
}
});
const renderMonthTotals = Object.entries(totalsByMonth).map(
  ([month, amount]) => ({
    month,
    totalSpents: amount.totalSpents,
    totalEarnings: amount.totalEarnings,
    total: amount.totalEarnings - amount.totalSpents,
  })
);

return renderMonthTotals;
}

const totalsByMonth = resumenMonth(allOperations);

totalsByMonth.forEach(({month, totalSpents, totalEarnings, total}) =>
{
  $("#table-totalsbymonth").innerHTML += `
  <td class="pl-6 text-black-400 font-semibold "> ${month}</td>
  <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3 text-[#22c55e] "> $${totalEarnings} </td>
  <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3 text-[#ef4444] "> $${totalSpents} </td>
  <td class="justify-self-auto font-semibold pl-4 pb-3 pt-3"> $${total} </td>
  `;
})



////////////////////////////////////////////////////////////////////////

/*MANEJO DEL DOM*/

///////////////////////////////////////////////////////////////////////

const selecDateFilter = () => {
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
  selecDateFilter();

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
    hide("#report-with-results");
  });
  $("#show-balance").addEventListener("click", () => {
    show("#home");
    hide("#categories-view");
    hide("#operation-view");
    hide("#report-view");
    hide("#editcategories-view");
    hide("#report-with-results");
  });
  
  $("#show-reports").addEventListener("click", () => {
    if (allOperations.length > 0) {
      show("#report-with-results");
      hide("#report-view");  
      hide("#home");
      hide("#categories-view");
      hide("#operation-view");
      hide("#editcategories-view");
    } else {
      show("#report-view");
      hide("#report-with-results");
      hide("#home");
      hide("#categories-view");
      hide("#operation-view");
      hide("#editcategories-view");
    }
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
    addOperation();
    show("#operations-table-home");
    show("#home");
    hide("#operation-view");
    hide("#no-results");
  });

  $("#btn-edit-operation").addEventListener("click", (e) => {
    e.preventDefault();
    operationEdit();
    hide("#operation-view");
    show("#home");
    renderOperations(getData("operations"));
  });
};

window.addEventListener("load", initializeApp);
