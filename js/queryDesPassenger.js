(function() {
    'use strict';

    let listContainer = document.querySelector('.outputDesPass');
    let state = {};
    let keyOld = sessionStorage.getItem('key');
    // Whenever a new value is received from Firebase (once at initial page load,
    // then every time something changes)
    firebase.database().ref(`bookings/${keyOld}`).on('value', function(snapshot) {
        console.log(`${keyOld}`);

        //Condition check value in snapshot
        if (snapshot.exists()) {
            // Pull the list value from firebase
            state.list = snapshot.val();

            renderList(listContainer, state);
        } else {
            alert('ไม่พบข้อมูลการจอง');
            changecontent('passenger.html');
        }

    });



    // Clicking to delete an item
    // delegate('.outputcustomer', 'click', '.delete', (event) => {

    //     if (event) {

    //         let key = getKeyFromClosestElement(event.delegateTarget);

    //         if (window.confirm(`ยืนยันการลบ ID ${key}`)) {
    //             // They clicked Yes
    //             // Remove that particular key
    //             firebase.database().ref(`passenger/${key}/`).remove();
    //         } else {
    //             // They clicked no
    //             return;
    //         }

    //     }

    // });

    //Clicking to do / undo an item
    // delegate('.outputDesPass', 'click', '#des', (event) => {
    //     if (event) {

    //         let start = getKeyFromClosestElement(event.delegateTarget);
    //         let end = getIdFromClosestElement(event.delegateTarget);
    //         if (window.confirm(`ยืนยันการลบ ID ${start} ${end}`)) {
    //             // They clicked Yes
    //             // Remove that particular key
    //             sessionStorage.setItem('start', start);
    //             sessionStorage.setItem('end', end);
    //             changecontent('destinationMap.html');
    //         } else {
    //             // They clicked no
    //             return;
    //         }

    //     }
    //     // let key = getKeyFromClosestElement(event.delegateTarget);
    //     // renderFormList(into, state)
    //     //     // Update the `done` value of that particular key to be the `checked` state of
    //     //     // the `<input>` checkbox.
    //     // firebase.database().ref(`passenger/${key}/`).update({
    //     //     done: event.delegateTarget.checked
    //     // });
    // });

    function renderList(into, state) {
        // Iterate over each element in the object

        into.innerHTML = Object.keys(state.list).map((key) => {
            let datetime = new Date(state.list[key].time_book);
            console.log(datetime);

            let formatted_date = datetime.getDate() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getFullYear() + " " + datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds()

            return `
            <tr>
            <td class='col-md-1'>${state.list[key].book_id}</td>
            <td>${state.list[key].load_person} คน</td>
            <td>${state.list[key].load_baggage} ใบ</td>
            <td>${state.list[key].price} บาท</td>
            <td>${formatted_date}</td>
            <td> <button type="button" id="des" class=" done-it btn btn-info" onclick="gotoMap(${state.list[key].start_lat},${state.list[key].start_long},${state.list[key].latitude},${state.list[key].longitude})" >รายละเอียด</button></td>
            <td>${state.list[key].status_book}</td>
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