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
    delegate('.outputDriver', 'click', '#delete', (event) => {
        if (event) {

            let key = getKeyFromClosestElement(event.delegateTarget);

            if (window.confirm(`ยืนยันการลบ ID ${key}`)) {
                // They clicked Yes
                // Remove that particular key
                firebase.database().ref(`driver/${key}/`).remove();
            } else {
                // They clicked no
                return;
            }

        }

        // let key = getKeyFromClosestElement(event.delegateTarget);

        // Remove that particular key
    });

    // Clicking to do / undo an item
    delegate('.outputDriver', 'click', '#edit', (event) => {
        if (event) {

            let keyEdit = getKeyFromClosestElement(event.delegateTarget);

            if (window.confirm(`ต้องการแก้ไขข้อมูลหรือๆไม่ ? ${keyEdit}`)) {
                sessionStorage.setItem('key', keyEdit);

                // They clicked Yes
                // Remove that particular key
                changecontent('editDriver.html');
            } else {
                // They clicked no
                return;
            }
        }
    });

    function renderList(into, state) {
        // Iterate over each element in the object
        into.innerHTML = Object.keys(state.list).map((key) => {
            return `
            <tr>
            <td>${state.list[key].driver_id}</td>
            <td>${state.list[key].driver_name}</td>
            <td>${state.list[key].driver_email}</td>
            <td>${state.list[key].driver_tel}</td>
            <td><img class="zoom" src="${state.list[key].driver_pic}" height="50" width="50"></td>
            <td>${state.list[key].driver_citizen}</td>
            <td>${state.list[key].carNumber}</td>
            <td data-id="${key}">
            <button type="button" id="delete" class="delete btn btn-danger">ลบ</button>
            <button type="button" id="edit" class="done-it btn btn btn-warning">แก้ไข</button>
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