(function() {
    'use strict';

    // Clicking to add a new item
    document.querySelector('#buttonsuccess1').addEventListener('click', (event) => {

        // Get the user input
        let value1 = document.querySelector('#customerid').value;
        let value2 = document.querySelector('#customername').value;
        let value3 = document.querySelector('#customersurname').value;
        let value4 = document.querySelector('#customertel').value;
        let value5 = document.querySelector('#customerpic').value;


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
        } else {
            value5 = 0;
        }

        firebase.database().ref('customer/').push({
            id_customer: value1,
            customer_name: value2,
            customer_surname: value3,
            customer_tel: value4,
            customer_pic: value5,

            done: false // Default all tasks to not-done
        });

        // Reset the input value ready for a new item
        document.querySelector('#customerid').value = '';
        document.querySelector('#customername').value = '';
        document.querySelector('#customersurname').value = '';
        document.querySelector('#customertel').value = '';
        document.querySelector('#customerpic').value = '';

        console.log("Success Add customer");

    });


})();