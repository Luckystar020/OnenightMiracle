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

    let listContainer = document.querySelector('.outputDriver');
    let state = {};

    // Whenever a new value is received from Firebase (once at initial page load,
    // then every time something changes)
    firebase.database().ref('driver/').on('value', function(snapshot) {

        // Pull the list value from firebase
        state.list = snapshot.val();

        renderList(listContainer, state)
    });

    // Clicking to add a new item
    document.querySelector('#add-button').addEventListener('click', (event) => {

        // Get the user input
        let value1 = document.querySelector('#carid').value;
        let value2 = document.querySelector('#drivername').value;
        let value3 = document.querySelector('#driversurname').value;
        let value4 = document.querySelector('#driverciti').value;
        let value5 = document.querySelector('#drivertel').value;
        let value6 = document.querySelector('#driveraddress').value;
        let value7 = document.querySelector('#drivergender').value;
        let value8 = document.querySelector('#driverpic').value;


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
        if (!value7) {
            return;
        }
        if (!value8) {
            return;
        }

        firebase.database().ref('driver/').push({
            car_id: value1,
            driver_name: value2,
            driver_surname: value3,
            driver_citizen: value4,
            driver_tel: value5,
            driver_address: value6,
            driver_gender: value7,
            driver_pic: value8,
            done: false // Default all tasks to not-done
        });

        // Reset the input value ready for a new item
        document.querySelector('#carid').value = '';
        document.querySelector('#drivername').value = '';
        document.querySelector('#driversurname').value = '';
        document.querySelector('#driverciti').value = '';
        document.querySelector('#drivertel').value = '';
        document.querySelector('#driveraddress').value = '';
        document.querySelector('#drivergender').value = '';
        document.querySelector('#driverpic').value = '';
    });

    // Clicking to delete an item
    delegate('.outputDriver', 'click', '.delete', (event) => {

        let key = getKeyFromClosestElement(event.delegateTarget);

        // Remove that particular key
        firebase.database().ref(`driver/${key}/`).remove();
    });

    // Clicking to do / undo an item
    delegate('.outputDriver', 'click', '.done-it', (event) => {

        let key = getKeyFromClosestElement(event.delegateTarget);

        // Update the `done` value of that particular key to be the `checked` state of
        // the `<input>` checkbox.
        firebase.database().ref(`driver/${key}/`).update({
            done: event.delegateTarget.checked
        });
    });

    function renderList(into, state) {
        // Iterate over each element in the object
        into.innerHTML = Object.keys(state.list).map((key) => {
            return `
            <tr>
        <li data-id="${key}" ${state.list[key].done ? "style='text-decoration: line-through'" : ""}>
            <input class="done-it" type="checkbox" ${state.list[key].done ? "checked" : ""} />
            car id : ${state.list[key].car_id}
            Driver name : ${state.list[key].driver_name}
            Driver Surname : ${state.list[key].driver_surname}
            Driver Tel : ${state.list[key].driver_tel}
            <button class="delete">[Delete]</button>
          </li>
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