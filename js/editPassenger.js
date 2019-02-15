(function() {
    "use strict";
    var key = "";
    //auto gen keyId
    key = firebase
      .database()
      .ref()
      .push().key;
    // Clicking to add a new item
    document.querySelector("#buttoneditpass").addEventListener("click", event => {
      // Get the user input
      let value7 = document.querySelector('#customerId').value;
      let value1 = document.querySelector('#customername').value;
      let value2 = document.querySelector('#customersurname').value;
      let value3 = document.querySelector('#customeremail').value;
      let value4 = document.querySelector('#customertel').value;
      let value5 = document.querySelector('#customerpic').value;
      let value6 = document.querySelector('#providerId').value;

  
      // Remove whitespace from start and end of input
      //value = value.trim();
  
      // Nothing entered, return early from this function
      if (!value1) {
        return;
      }
      if (!value2) {
        return;
      }
      if (!value3) {
        return;
      }
      if (!value4) {
        return;
      }
      if (!value5) {
        return;
      }else{
        value5=0;
      }
      if (!value6) {
        return;
      }
      if (!value7) {
        return;
      }
      
      firebase.database().ref(`passenger/${value7}/`).update({
        customerId: value7,
        customer_name: value1+" "+value2,
        customer_email: value3,
        customer_tel: value4,
        customer_pic: value5,
        providerId: value6
      }).then(function() {
          alert("Update data successful");
        });
      console.log("key", key);
  
    });
  
    // We added the `data-id` attribute when we rendered the items
    function getKeyFromClosestElement(element) {
      // Search for the closest parent that has an attribute `data-id`
      let closestItemWithId = closest(event.delegateTarget, "[data-id]");
  
      if (!closestItemWithId) {
        throw new Error("Unable to find element with expected data key");
      }
  
      // Extract and return that attribute
      return closestItemWithId.getAttribute("data-id");
    }
  })();
  