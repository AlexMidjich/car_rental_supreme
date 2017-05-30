$(document).ready(function(){
  //This function makes sure that the datepicker on "hyr" page is working on browser that dose'nt support html5
  //With the use of Modernizr the function checks automaticly to see if there is browsersupport.
  $(function(){
      if (!Modernizr.inputtypes.date) {
      // If not native HTML5 support, fallback to jQuery datePicker
          $('.datum').datepicker({
              // Consistent format with the HTML5 picker
                  dateFormat : 'yy-mm-dd'
              }
          );
      }
  });

//Enables past dates in the HTML5 datepicker

  var input = document.getElementById("dateOne");
  var input2 = document.getElementById("dateTwo");
  var today = new Date();
  var day = today.getDate();
  // Set month to string to add leading 0
  var mon = new String(today.getMonth()+1); //January is 0!
  var yr = today.getFullYear();

    if(mon.length < 2) { mon = "0" + mon; }

    var date = new String( yr + '-' + mon + '-' + day );

  input.disabled = false;
  input.setAttribute('min', date);
  input2.disabled = false;
  input2.setAttribute('min', date);

  //Calculate the days between start date and stop date
  var dayCalc = document.getElementById('calc');

    dayCalc.addEventListener('click', function days_between(dateOne, dateTwo) {
      dayCalc.style.display = 'none';
      event.preventDefault();
      var dateOne = document.getElementById('dateOne').value;
      var dateTwo = document.getElementById('dateTwo').value;
      var dateOne_ms = Date.parse(dateOne)
      var dateTwo_ms = Date.parse(dateTwo)
      // The number of milliseconds in one day
      var ONE_DAY = 1000 * 60 * 60 * 24
      // Calculate the difference in milliseconds
      var difference_ms = Math.abs(dateOne_ms - dateTwo_ms)
      // Convert back to days and return
      //return Math.round(difference_ms/ONE_DAY)
      var numberOfDays = Math.round(difference_ms/ONE_DAY);
      var pricePerDay = document.getElementById('price').value;
      document.getElementById('answ').innerHTML = numberOfDays * pricePerDay + ' kr';
    });

});
