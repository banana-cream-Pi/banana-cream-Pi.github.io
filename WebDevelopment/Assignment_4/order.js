//Michael Griffin Assignment #4
function orderSubmitted() {
  /* check if first name is blank */

  var firstName = document.forms["inputForm"]["fname"].value;
  if (firstName == "") {
    window.alert("First Name must be filled out");
    return false;
  }

  var lastName = document.forms["inputForm"]["lname"].value;
  if (lastName == "") {
    window.alert("Last Name must be filled out");
    return false;
  }
  var address = document.forms["inputForm"]["address"].value;
  if (address == "") {
    window.alert("Address must be filled out");
    return false;
  }
  var city = document.forms["inputForm"]["city"].value;
  if (city == "") {
    window.alert("City must be filled out");
    return false;
  }

  var zip = document.forms["inputForm"]["zip"].value;
  if (!validZip(zip)) {
    window.alert("Must be valid zip code");
    return false;
  }
  var phone = document.forms["inputForm"]["phone"].value;
  if (!validPhone(phone)) {
    window.alert("Must be valid phone number");
    return false;
  }


  var bAddress = document.forms["inputForm"]["billingAddress"].value;
  if (bAddress == "") {
    window.alert("Billing address must be filled out");
    return false;
  }
  var bCity = document.forms["inputForm"]["billingCity"].value;
  if (bCity == "") {
    window.alert("Billing city must be filled out");
    return false;
  }
  var bZip = document.forms["inputForm"]["billingZip"].value;
  if (!validZip(bZip)) {
    window.alert("Must be valid billing zip code");
    return false;
  }
  window.alert("Order Submitted!");
}

function validZip(zip) {
  return /^[0-9]{5}(?:-[0-9]{4})?$/.test(zip);
}

function validPhone(phone) {
  return /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
}
function copyBilling() {
  if (document.getElementById("billingCB").checked) {
    var address = document.forms["inputForm"]["address"].value;
    document.forms["inputForm"]["billingAddress"].value = address;
    var city = document.forms["inputForm"]["city"].value;
    document.forms["inputForm"]["billingCity"].value = city;
    var zip = document.forms["inputForm"]["zip"].value;
    document.forms["inputForm"]["billingZip"].value = zip;
    var state = document.forms["inputForm"]["state"].value;
    document.forms["inputForm"]["billingState"].value = state;
  } else {
    document.forms["inputForm"]["billingAddress"].value = "";
    document.forms["inputForm"]["billingCity"].value = "";
    document.forms["inputForm"]["billingZip"].value = "";
  }
}
