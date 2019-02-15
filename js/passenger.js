(function() {
    'use strict';

    // Initialize Firebase
    let firebaseAppName = "<APP-NAME-HERE>";
    let firebaseKey = "<KEY-HERE>";

    var config = {
        apiKey: "AIzaSyBb9WUnsR9xzp_T8wK564-DuxW3w4YHP6Q",
        authDomain: "example-6b911.firebaseapp.com",
        databaseURL: "https://example-6b911.firebaseio.com",
        projectId: "example-6b911",
        storageBucket: "example-6b911.appspot.com",
        messagingSenderId: "541906244701"
    };
    firebase.initializeApp(config);

    let listContainer = document.querySelector('.outputcustomer');
    let state = {};

    // Whenever a new value is received from Firebase (once at initial page load,
    // then every time something changes)
    firebase.database().ref('customer/').on('value', function(snapshot) {

        // Pull the list value from firebase
        state.list = snapshot.val();

        renderList(listContainer, state)
    });

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

        console.console.log("Success Add customer");

    });

    // Clicking to delete an item
    delegate('.outputcustomer', 'click', '.delete', (event) => {

        let key = getKeyFromClosestElement(event.delegateTarget);

        // Remove that particular key
        firebase.database().ref(`customer/${key}/`).remove();
    });

    // Clicking to do / undo an item
    delegate('.outputcustomer', 'click', '.done-it', (event) => {

        let key = getKeyFromClosestElement(event.delegateTarget);
        renderFormList(into, state)
            // Update the `done` value of that particular key to be the `checked` state of
            // the `<input>` checkbox.
        firebase.database().ref(`customer/${key}/`).update({
            done: event.delegateTarget.checked
        });
    });

    function renderFormList(into, state) {
        // Iterate over each element in the object
        into.innerHTML = Object.keys(state.list).map((key) => {
            return `
            <tr>
            <th>${state.list[key].id_customer}</th>
            <td>${state.list[key].customer_name}</td>
            <td>${state.list[key].customer_surname}</td>
            <td>${state.list[key].customer_tel}</td>
            <td data-id="${key}">
            <button class="delete btn btn-danger">ลบ</button>
            <button type="button" class="btn btn-warning">แก้ไข</button>
            </td>
          </tr>
        `;
        }).join('');
    }

    function renderList(into, state) {
        // Iterate over each element in the object
        into.innerHTML = Object.keys(state.list).map((key) => {
            return `
            <tr>
            <th>${state.list[key].id_customer}</th>
            <td>${state.list[key].customer_name}</td>
            <td>${state.list[key].customer_surname}</td>
            <td>${state.list[key].customer_tel}</td>
            <td data-id="${key}">
            <button class="delete btn btn-danger">ลบ</button>
            <button type="button" class="btn btn-warning">แก้ไข</button>
            </td>
          </tr>
        `;
        }).join('');
    }

    // We added the `data-id` attribute when we rendered the items
    function getKeyFromClosestElement(element) {

        // Search for the closest parent that has an attribute `data-id`
        let closestItemWithId = closest(event.delegateTarget, '[data-id]')

        if (!closestItemWithId) {
            throw new Error('Unable to find element with expected data key');
        }

        // Extract and return that attribute
        return closestItemWithId.getAttribute('data-id');
    }
})();