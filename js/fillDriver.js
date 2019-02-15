(function() {
  "use strict";
  var key = "";
  //auto gen keyId
  key = firebase
    .database()
    .ref()
    .push().key;
  // Clicking to add a new item
  document.querySelector("#buttonsuccess").addEventListener("click", event => {
    // Get the user input
    let value1 = document.querySelector("#carid").value;
    let value2 = document.querySelector("#drivername").value;
    let value3 = document.querySelector("#driversurname").value;
    let value4 = document.querySelector("#drivercitizen").value;
    let value5 = document.querySelector("#drivertel").value;
    let value6 = document.querySelector("#driveremail").value;
    let value8 = document.querySelector("#driverpic").value;

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
    } 
    if (!value6) {
        return;
      }
    if (!value8) {
      return;
    }else{
        value8=0;
    }

    firebase
      .database()
      .ref("driver/")
      .push({
        car_id: value1,
        driver_id: key,
        driver_name: value2 + " " + value3,
        driver_citizen: value4,
        driver_tel: value5,
        driver_pic: value8
      })
      .then(function() {
        alert("Added data successful");
      });
    console.log("key", key);

    // Reset the input value ready for a new item
    document.querySelector("#carid").value = "";
    document.querySelector("#drivername").value = "";
    document.querySelector("#driversurname").value = "";
    document.querySelector("#drivercitizen").value = "";
    document.querySelector("#drivertel").value = "";
    document.querySelector("#driverpic").value = "";
    document.querySelector("#driveremail").value = "";
    key="";
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
