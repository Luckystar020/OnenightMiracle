(function() {
    'use strict';
    var key = "";
    //auto gen keyId
    key = firebase
      .database()
      .ref()
      .push().key;
    // Clicking to add a new item
    document.querySelector('#buttonsuccess1').addEventListener('click', (event) => {

        // Get the user input
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
        }
        if (!value6) {
            return;
        } else {
            value5 = 0;
        }

        firebase.database().ref('passenger/').push({
            customerId: key,
            customer_name: value1+" "+value2,
            customer_email: value3,
            customer_tel: value4,
            customer_pic: value5,
            providerId: value6
            
        }).then(function() {
            alert("Added data successful");
        });
        // Reset the input value ready for a new item
        document.querySelector('#customername').value = '';
        document.querySelector('#customersurname').value = '';
        document.querySelector('#customeremail').value = '';
        document.querySelector('#customertel').value = '';
        document.querySelector('#customerpic').value = '';
        document.querySelector('#providerId').value = '';
        key ='';

        console.log("Success Add customer");

    });


})();