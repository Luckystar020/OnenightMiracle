(function() {
    'use strict';

    let listContainer = document.querySelector('.outputDriver');
    let state = {};

    // Whenever a new value is received from Firebase (once at initial page load,
    // then every time something changes)
    firebase.database().ref('driver/').on('value', function(snapshot) {

        // Pull the list value from firebase
        state.list = snapshot.val();

        renderList(listContainer, state)
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
        renderFormList(into, state)
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
            <th>${state.list[key].car_id}</th>
            <td>${state.list[key].driver_name}</td>
            <td>${state.list[key].driver_surname}</td>
            <td>${state.list[key].driver_citizen}</td>
            <th>${state.list[key].driver_tel}</th>
            <td>${state.list[key].driver_address}</td>
            <td>${state.list[key].driver_gender}</td>
            <td>${state.list[key].driver_pic}</td>
            <td data-id="${key}">
            <button type="button" class="delete btn btn-danger">ลบ</button>
            <button type="button" class=" done-itbtn btn-warning">แก้ไข</button>
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