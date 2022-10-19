$(document).ready(function () { //jQeury to detect state of readiness to safely manipulate page
    
  let pickup = document.getElementById("calendar_4").children['element_4_datepick']; // Pickup date

  var weekday = document.getElementById("element_5"); //field to hold day of week for mach form logic
  var swc = document.getElementById("li_38"); // sandwich selection
  var egg = document.getElementById("element_8_12"); // Egg salad option
  var bread = document.getElementById("li_37"); // Bread selection

  // Hot Entree days
  var mon = document.getElementById("element_63_1");
  var tue = document.getElementById("element_63_10");
  var wed = document.getElementById("element_63_4");
  var thu = document.getElementById("element_63_5");
  var fri = document.getElementById("element_63_6");

  // Array of all days
  var days = [mon,tue,wed,thu,fri];

  function setDay(pickup_date){
      var dow = new Date(pickup_date).getDay(); // (0-6 sun to sat)
      for (let day of days) {
          
          if (day == days[dow - 1]) {
            day.disabled = false;
            day.checked = true;
          } else {
            day.disabled = true;
            day.checked = false;
          }
      }
    
      if (dow == 3) {
        egg.disabled = false;
      } else {
        egg.disabled = true;
        egg.checked = false;
      }
    
    }

  if ($('#form_156295').length) {

    setDay(pickup.value);

      $(document).change(function () {
        // Update created varaibles on form change
        setDay(pickup.value);
        // when sandwich selection is hidden uncheck all radio buttons and hide bread options
        if (swc.style.display == 'none') {
          Array.from(swc.getElementsByClassName('element radio')).forEach( // change to element checkbox for checkbox
                function (item) {
                //if (item.checked) {item.click();} // used for checkbox option
                item.checked = false;
                bread.style.display = 'none';
                });
          }

  });
}
});





https://cdn.jsdelivr.net/gh/nbuman/pasco-lakeview@v1/custom.js

let total = document.querySelector('.total_main h3 var');


let drinks = document.querySelectorAll('#li_3 input');


document.querySelectorAll('#li_3 input').forEach((option,index,array) => console.log(option));




function setPrice(array,price) {
    array.forEach((option,i,a) => a[i].setAttribute('data-pricedef',price.toString()));
}

if (parseFloat(total.innerText) >= 4.25) {
    setPrice(drinks,0.00);
} else {
    setPrice(drinks,1.25);
}


function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

let pickup_time = new Date().getTime(); // current time

let start = new Date().setHours(10,10); // 10:10 AM
let end = new Date().setHours(12,30); // 12:30pm (30min prior to close)


if (start >= pickup_time && pickup_time <= end) {
  console.log("within pickup time 10am to 1pm");
} else {
  console.log("Missed the order window");
}

// Questions for Chef

// Sandwich or salad selection - what and why?
// can we add soup as a meal selection
// rename meal selection 'salad' to 'Entree Salad'
// if soup is selected, what is the daily soup?
// do we need pickup time? can we just check that the order will be 30 before 1pm?
// what things (e.g. egg salad sandwich) are only available on certain days
// drink is self serve. can we just list available drinks rather than seperate radio boxes? and a checkbox as to whether you want a drink
// how are comments used (mention of side salad/soup even though we have "sandwich or salad" radio group)

// change input type
//    chips selection
//    drink
//    sandwich (blt,grilled cheese, build your own)
//    bread selection

// New inputs
// Breakout sandwich options (toasted/pressed)

function unchecker(checkboxes) {
  for (let box of checkboxes) {
    if (box.checked && box.type == 'checkbox') {
      box.click();
    } else if (box.type == 'radio') {box.checked = false;}
  }
}


let combo = {};
let meal_select = document.querySelectorAll('#li_60 input');

meal_select.forEach((item,index) => combo[item.parentElement.querySelector('label').innerHTML] = item.checked);