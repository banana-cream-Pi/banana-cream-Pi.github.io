//Michael Griffin Assignment #5
window.onload = initAll();
//when the page loads
function initAll() {
     var x = [
          //list of form item names
          "fname",
          "lname",
          "address",
          "city",
          "zip",
          "phone",
          "state",
          "bAddress",
          "bCity",
          "bZip",
          "bState",
     ];
     for (i = 0; i < x.length; i++) {
          //if the cookie exists this loop will set the appropriate form value to equal the cookie value
          if (checkCookie(x[i])) {
               document.forms["inputForm"][x[i]].value = getCookie(x[i]);
          }
     }
     if (checkCookie("same")) {
          //this checks if the check box has a cookie value and sets it accordingly
          if (getCookie("same") == "true") {
               document.getElementById("bCB").checked = true;
          } else {
               document.getElementById("bCB").checked = false;
          }
     }
}
//set cookie function
function setCookie(cname, cvalue, exdays) {
     const d = new Date();
     d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
     let expires = "expires=" + d.toUTCString();
     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//returns value of specified cookie
function getCookie(cname) {
     let name = cname + "=";
     let ca = document.cookie.split(";");
     for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == " ") {
               c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
               return c.substring(name.length, c.length);
          }
     }
     return "";
}
//returns boolean depending on whether or not the cookie exists
function checkCookie(cookie) {
     let cook = getCookie(cookie);
     if (cook != "") {
          return true;
     } else {
          return false;
     }
}
//when the submit button is pressed this function validates the form as well as sets cookies
function orderSubmitted() {
     var names = [
          "fname",
          "lname",
          "address",
          "city",
          "zip",
          "phone",
          "bAddress",
          "bCity",
          "bZip",
          "bState",
          "state",
     ];
     //Responses based on which field is left blank
     var failRespo = [
          "First Name must be filled out",
          "Last Name must be filled out",
          "Address must be filled out",
          "City must be filled out",
          "Must be valid zip code",
          "Must be valid phone number",
          "Billing address must be filled out",
          "Billing city must be filled out",
          "Must be valid billing zip code",
     ];
     //this loops over each form item checks if it is blank/valid
     for (i = 0; i < names.length; i++) {
          var check = document.forms["inputForm"][names[i]].value;

          if (names[i] == "zip" || names[i] == "bZip") {
               if (!validZip(check)) {
                    window.alert(failRespo[i]);
                    return false;
               } else {
                    var cookVal = document.forms["inputForm"][names[i]].value;
                    setCookie(names[i], cookVal, 100);
               }
          } else if (names[i] == "phone") {
               if (!validPhone(check)) {
                    window.alert(failRespo[i]);
                    return false;
               } else {
                    var cookVal = document.forms["inputForm"][names[i]].value;
                    setCookie(names[i], cookVal, 100);
               }
          } else if (check == "") {
               window.alert(failRespo[i]);

               return false;
          }
     }
     //since all feild are valid at this point this loop sets a cookie for each one
     for (i = 0; i < names.length; i++) {
          var cookVal = document.forms["inputForm"][names[i]].value;
          setCookie(names[i], cookVal, 100);
     }
     if (document.getElementById("bCB").checked) {
          //sets check box cookie
          setCookie("same", "true", 100);
     } else {
          setCookie("same", "false", 100);
     }
     window.alert("Order Submitted!");
}
//returns true or false depending on zip validity
function validZip(zip) {
     return /^[0-9]{5}(?:-[0-9]{4})?$/.test(zip);
}
//returns true or false depending on phone validity
function validPhone(phone) {
     return /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
}
//this function copies over information to the billing address section depending on whether or not the check box is clicked, it runs each time the check box is clicked
function copyBilling() {
     var names = [
          "address",
          "bAddress",
          "city",
          "bCity",
          "zip",
          "bZip",
          "state",
          "bState",
     ];
     //if check box checked it loops through each billing address field and sets it to the appropriate value
     if (document.getElementById("bCB").checked) {
          for (i = 0; i < 8; i += 2) {
               var newV = document.forms["inputForm"][names[i]].value;
               document.forms["inputForm"][names[i + 1]].value = newV;
          }
     } else {
          //if the check box is un-checked it erases the billing address section
          document.forms["inputForm"]["bAddress"].value = "";
          document.forms["inputForm"]["bCity"].value = "";
          document.forms["inputForm"]["bZip"].value = "";
     }
}
