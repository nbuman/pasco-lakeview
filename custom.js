$(document).ready(function () { //jQeury to detect state of readiness to safely manipulate page
  console.log("Document loaded");

  let pickup = document.getElementById("calendar_4").children['element_4_datepick']; // Pickup date
  var swc = document.getElementById("li_57"); // sandwich selection
  var egg = document.getElementById("element_8_12"); // Egg salad option
  var bread = document.getElementById("li_56"); // Bread selection
  var bread_opt = document.getElementById("li_55"); // Bread options (i.e. toasted, pressed, plain)

  // Hot Entree days
  let days = document.getElementById('li_7').querySelectorAll('input'); // all hot meal days

  function setDay(pickup_date){
      var dow = new Date(pickup_date).getDay(); // (0-6 sun to sat)
      for (let day of days) {
          
          if (day == days[dow - 1]) { // subtract 1 from day of week to get proper index
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

  if ($('#form_162747').length) {
    console.log("Form loaded");

    // set serving day for meal selection on form load
    setDay(pickup.value);

      $(document).change(function () {
        //set serving day for meal selection on doc change
        setDay(pickup.value);

        // when sandwich selection is unchecked hide bread selection and sandwich options (toasted,pressed)
        if (swc.style.display) {
          Array.from(swc.getElementsByClassName('element radio')).forEach(
                function (sandwich) {
                sandwich.checked = false;
                bread.style.display = 'none';
                bread_opt.style.display = 'none';
                });

          // Uncheck bread selection
          Array.from(bread.getElementsByClassName('element radio')).forEach(
            function (bread) {
            bread.checked = false;
            });
          
          // Uncheck bread options
          Array.from(bread_opt.getElementsByClassName('element radio')).forEach(
            function (option) {
            option.checked = false;
            }); 

          }   

  });
}
});