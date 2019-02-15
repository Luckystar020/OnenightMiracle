(function() {
    'use strict';

    let listContainer = document.querySelector('.outputcustomer');
    let state = {};

    // Whenever a new value is received from Firebase (once at initial page load,
    // then every time something changes)
    firebase.database().ref('customer/').on('value', function(snapshot) {

        // Pull the list value from firebase
        state.list = snapshot.val();

        renderList(listContainer, state)
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