$(document).ready(function () { //jQeury to detect state of readiness to safely manipulate page
  console.log("Document loaded");

  let pickupDate = document.getElementById("calendar_4").children['element_4_datepick']; // Pickup date
  var sandwich_checkbox = document.getElementById("element_60_1"); // sandwich meal selection checkbox
  let protein_cup = document.getElementById('element_15_41'); // Protein cup checkbox under additional items

  let eggs = [
    document.getElementById("element_10_30"), // Egg salad under salad selection
    document.getElementById("element_41_3"), // Egg salad under protein cup options
    document.getElementById("element_8_12") // Egg salad under build your own sandwich toppings
  ]

  let sandwich_none = document.getElementById('element_74_1'); // None option for sandwich selection
  sandwich_none.parentElement.style.display = 'none'; // Hide none option

  let bread_none = document.getElementById('element_76_3'); // None option for bread selection
  bread_none.parentElement.style.display = 'none'; // Hide none option

  let protein_none = document.getElementById('element_82_4'); // None option for protein cup size
  protein_none.parentElement.style.display = 'none'; // Hide none option


  const mouseOut_event = new Event('mouseout'); // Create mouseout event object to trigger OnMouseOut events
  let drink = document.querySelector('#li_78 input'); // drink checkbox
  let drink_quantity = document.getElementById('element_80'); // drink quantity checkbox
  let total_cost = document.querySelector('.total_main').children[0].children[0]; // price total box

  let sandwich_options = document.querySelectorAll('#li_75 input'); // Sandwich Options (pressed,toasted)
  let cheese_options = document.querySelectorAll('#li_39 input'); // Cheese selection options
  let blt_options = document.getElementById('li_33').querySelectorAll('input'); // BLT options
  let grilledCheese_options = document.getElementById('li_34').querySelectorAll('input'); // Grilled Cheese options
  let side_salad_checkbox = document.getElementById('element_15_42'); // side salad selection checkbox
  let salad_checkbox = document.getElementById('element_60_3'); // salad meal selection checkbox
  let byo_sandwich_checkbox = document.getElementById('element_74_6'); // build-your-own-sandwich radio button

  // Build your own sandwich toppings
  let byos_toppings = Array.from(document.querySelectorAll('#li_8 input')); // build-your-own-sandwich toppings
  let byos_protein_quantity = document.querySelector('#li_99 input'); // build-your-own-sandwich quantity

  // Salad protein
  let salad_toppings = Array.from(document.querySelectorAll('#li_10 input')); // salad toppings
  let salad_protein_quantity = document.querySelector('#li_84 input');

  // Salad dressing
  let salad_dressing_options = Array.from(document.querySelectorAll('#li_11 input')); // salad dressings
  let salad_dressing_quantity = document.querySelector('#li_88 input');

  // Side Salad toppings
  let side_salad_toppings = document.querySelectorAll('#li_26 input');
  let side_salad_quantity = document.getElementById('element_89');

  // side salad dressing
  let side_salad_dressings = document.querySelectorAll('#li_91 input');
  let side_salad_dressing_quantity = document.getElementById('element_93');
  
  // Get protein options from salad toppings
  let salad_protein_options = [];
  salad_toppings.forEach( (topping) => {topping.parentElement.textContent.match(/\(P\)/) ? salad_protein_options.push(topping) : ''});

  // Get protein options from sandwich toppings
  let byos_protein_options = [];
  byos_toppings.forEach( (topping) => {topping.parentElement.textContent.match(/\(P\)/) ? byos_protein_options.push(topping) : ''});

  // Hot Entree days
  let days = document.getElementById('li_63').querySelectorAll('input'); // all hot meal days

  // Gets day of the week from passed date and sets daily meal and other input accordingly
  function setDay(pickup_date){
      var weekday = new Date(pickup_date).getDay() - 1; // subtract 1 from day of week to get proper index
      for (let day of days) {
          if (day === days[weekday]) { 
            day.disabled = false;
            day.click();
          } else {
            day.disabled = true;
            day.checked = false;
          }
      }
      // disables egg salad options when it's not wednesday
      if (weekday === 2) {
        eggs.forEach((egg) => egg.disabled = false);
      } else {
        eggs.forEach((egg) => {egg.disabled = true; egg.checked = false;});
      }
  }
  // Clears all radio or checkboxes from passed array
  function clearAll(itemArray) {
    itemArray = !Array.isArray(itemArray) ? Array.from(itemArray) : itemArray;

    if (itemArray[0].type === 'checkbox') {
        itemArray.forEach((option) => option.checked ? option.click() : '');
    } else if (itemArray[0].type === 'radio') {
        itemArray.forEach((option) => option.checked = false);
    }
  }
  // Returns number of selected items from array/collection of inputs
  function selectedOptions(input_array){
    let selected = 0;
    Array.from(input_array).forEach( (input) => input.checked ? selected++ : '');
    return selected;
  }

  // Checks that the form exists
  if ($('#form_181105').length) {
    console.log("Form loaded");

    // set serving day for meal selection on form load
    setDay(pickupDate.value);
  
    $(document).change(function () {
      //set serving day for meal selection on doc change
      setDay(pickupDate.value);

      // when sandwich selection is unchecked hide bread selection and sandwich options (toasted,pressed)
      if (!sandwich_checkbox.checked) {
        bread_none.click();
        sandwich_none.click();
        clearAll(sandwich_options);
        clearAll(cheese_options);
        clearAll(blt_options);
        clearAll(grilledCheese_options);
        }   
      
      // When the total cost is $4.50 or greater remove cost (via quantity) to zero
      if (parseFloat(total_cost.textContent) >= 4.5){
          drink_quantity.value = '';
          drink_quantity.dispatchEvent(mouseOut_event);
      } else if (drink_quantity.value != '1') {
          drink_quantity.value = '1';
          drink_quantity.dispatchEvent(mouseOut_event);
      }
      
      // If the protein cup additional is deselected select the 'none' option (prevent phantom price)
      if (!protein_cup.checked) {
        protein_none.click();
      }

      // First build-your-own-sandwich protein is free after that charge
      if (byo_sandwich_checkbox.checked && selectedOptions(byos_protein_options) >= 2) {
        byos_protein_quantity.value = (selectedOptions(byos_protein_options) - 1).toString();
        byos_protein_quantity.dispatchEvent(mouseOut_event);
      } else if (byo_sandwich_checkbox.checked && selectedOptions(byos_protein_options) < 2) {
        byos_protein_quantity.value = '';
        byos_protein_quantity.dispatchEvent(mouseOut_event);
      } else {
        clearAll(byos_protein_options);
        byos_protein_quantity.value = '';
        byos_protein_quantity.dispatchEvent(mouseOut_event);
      }

      // First salad protein is free after that charge
      if (salad_checkbox.checked && selectedOptions(salad_protein_options) >= 2) {
        salad_protein_quantity.value = (selectedOptions(salad_protein_options) - 1).toString();
        salad_protein_quantity.dispatchEvent(mouseOut_event);
      } else if (salad_checkbox.checked && selectedOptions(salad_protein_options) < 2) {
        salad_protein_quantity.value = '';
        salad_protein_quantity.dispatchEvent(mouseOut_event);
      } else {
        clearAll(salad_toppings);
        salad_protein_quantity.value = '';
        salad_protein_quantity.dispatchEvent(mouseOut_event);
      }

      // First salad dressing is free after that charge
      if (salad_checkbox.checked && selectedOptions(salad_dressing_options) >= 2) {
        salad_dressing_quantity.value = (selectedOptions(salad_dressing_options) - 1).toString(); // if 2 or more dressings selected 
        salad_dressing_quantity.dispatchEvent(mouseOut_event);
      } else if (salad_checkbox.checked && selectedOptions(salad_dressing_options) < 2) {
        salad_dressing_quantity.value = '';
        salad_dressing_quantity.dispatchEvent(mouseOut_event);
      } else {
        clearAll(salad_dressing_options);
        salad_dressing_quantity.value = '';
        salad_dressing_quantity.dispatchEvent(mouseOut_event);
      }

      // First three toppings on side salad are free after that charge
      if (side_salad_checkbox.checked && selectedOptions(side_salad_toppings) >= 4) {
        side_salad_quantity.value = (selectedOptions(side_salad_toppings) - 3).toString(); // if 2 or more toppings selected 
        side_salad_quantity.dispatchEvent(mouseOut_event);
      } else if (side_salad_checkbox.checked && selectedOptions(side_salad_toppings) < 4) {
        side_salad_quantity.value = '';
        side_salad_quantity.dispatchEvent(mouseOut_event);
      } else {
        clearAll(side_salad_toppings);
        side_salad_quantity.value = '';
        side_salad_quantity.dispatchEvent(mouseOut_event);
      }

      // First side salad dressing is free after that charge
      if (side_salad_checkbox.checked && selectedOptions(side_salad_dressings) >= 2) {
        side_salad_dressing_quantity.value = (selectedOptions(side_salad_dressings) - 1).toString(); // if 2 or more dressings selected 
        side_salad_dressing_quantity.dispatchEvent(mouseOut_event);
      } else if (side_salad_checkbox.checked && selectedOptions(side_salad_dressings) < 2) {
        side_salad_dressing_quantity.value = '';
        side_salad_dressing_quantity.dispatchEvent(mouseOut_event);
      } else {
        clearAll(side_salad_dressings);
        side_salad_dressing_quantity.value = '';
        side_salad_dressing_quantity.dispatchEvent(mouseOut_event);
      }

    });
  }
});