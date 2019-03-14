(function() {
    'use strict';

    let listContainer = document.querySelector('.outputcustomer');
    let state = {};

    // Whenever a new value is received from Firebase (once at initial page load,
    // then every time something changes)
    firebase.database().ref('passenger/').on('value', function(snapshot) {

        // Pull the list value from firebase
        state.list = snapshot.val();

        renderList(listContainer, state)
    });

    // Clicking to delete an item
    delegate('.outputcustomer', 'click', '.delete', (event) => {

        if (event) {

            let key = getKeyFromClosestElement(event.delegateTarget);

            if (window.confirm(`ยืนยันการลบ ID ${key}`)) {
                // They clicked Yes
                // Remove that particular key
                firebase.database().ref(`passenger/${key}/`).remove();
            } else {
                // They clicked no
                return;
            }

        }

    });

    //edit clicking 
    delegate('.outputcustomer', 'click', '#edit', (event) => {
        if (event) {

            let key = getKeyFromClosestElement(event.delegateTarget);

            if (window.confirm(`ต้องการแก้ไขข้อมูลหรือๆไม่ ? ${key}`)) {
                // They clicked Yes
                // Remove that particular key
                sessionStorage.setItem('key', key);
                changecontent('editPassenger.html');
            } else {
                // They clicked no
                return;
            }

        }
    });
    // Clicking to do / undo an item
    delegate('.outputcustomer', 'click', '#des', (event) => {
        if (event) {

            let key = getKeyFromClosestElement(event.delegateTarget);

            if (window.confirm(`ต้องการตรวจสอบรายละเอียดหรือไม่ ? ${key}`)) {
                // They clicked Yes
                // Remove that particular key
                sessionStorage.setItem('key', key);
                changecontent('descriptionPassenger.html');
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
            <td>${state.list[key].customerId}</td>
            <td>${state.list[key].customer_email}</td>
            <td>${state.list[key].customer_name}</td>
            <td><img class="zoom" src="${state.list[key].customer_pic}" height="50" width="50"></td>
            <td>${state.list[key].customer_tel}</td>
            <td>${state.list[key].providerId}</td>
            <td data-id="${key}">
            <button type="button" class="delete btn btn-danger">ลบ</button>
            <button type="button" id ="edit" class=" done-it btn btn-warning" >แก้ไข</button>
            <button type="button" id="des" class=" done-it btn btn-info" >รายละเอียด</button>
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