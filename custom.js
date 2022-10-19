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