$(document).ready(function(){
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

  var dayCalc = $('#hyrbtn');

  dayCalc.on('click', function days_between(date1, date2) {
    //event.preventDefault();
    console.log('click');

      // The number of milliseconds in one day
      var ONE_DAY = 1000 * 60 * 60 * 24

      // Convert both dates to milliseconds
      var date1_ms = $('#dateOne')
      var date2_ms = $('#dateTwo')

      // Calculate the difference in milliseconds
      var difference_ms = Math.abs(date1_ms - date2_ms)

      // Convert back to days and return
      //return Math.round(difference_ms/ONE_DAY)
      console.log(Math.round(difference_ms/ONE_DAY));
  });

});
