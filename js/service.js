window.onload = function() {
    showData();
}

function fillDataDriver() {
    //Set this fill value from frontend
    var car_id = document.getElementById('carid');
    var driver_name = document.getElementById('drivername');
    var driver_surname = document.getElementById('driversurname');
    var driver_citizen = document.getElementById('driverciti');
    var driver_tel = document.getElementById('drivertel');
    var driver_address = document.getElementById('driveraddress');
    var driver_gender = document.getElementById('drivergender');
    var driver_pic = document.getElementById('driverpic');

    setDataDriver(car_id.value, driver_name.value,
        driver_surname.value, driver_citizen.value, driver_tel.value,
        driver_address.value, driver_gender.value, driver_pic.value);
}

function setDataDriver(car_id, driver_name, driver_surname, driver_citizen, driver_tel, driver_address, driver_gender, driver_pic) {
    //push Data from frontend to db
    let firebaseRef = firebase.database().ref("driver");
    firebaseRef.push({
        car_id: car_id,
        driver_name: driver_name,
        driver_surname: driver_surname,
        driver_citizen: driver_citizen,
        driver_tel: driver_tel,
        driver_address: driver_address,
        driver_gender: driver_address,
        driver_pic: driver_pic
    });
    console.log("Insert Success");
}

function showData() {
    let firebaseRef = firebase.database().ref("driver");
    let listContainer = document.querySelector('.outputLoop');
    let state = {};

    firebaseRef.once('value').then(function(dataSnapshot) {
        state.list = dataSnapshot.val();

        renderList(listContainer, state)
    });
}

function renderList(into, state) {
    // Iterate over each element in the object
    into.innerHTML = Object.keys(state.list).map((key) => {
        return `
            <tr>
                <th>${state.list[key].car_id}</th>
                <td>${state.list[key].driver_name}</td>
                <td>${state.list[key].driver_surname}</td>
                <td></td>
                <td><button type="button" class="btn btn-warning">แก้ไข</button></td>
                <td><button type="button" class="btn btn-danger" onclick="delBtn()">ลบ</button></td>
            </tr>
        `;
    }).join('');
}



function getKeyFromClosestElement(element) {

    // Search for the closest parent that has an attribute `data-id`
    let closestItemWithId = closest(event.delegateTarget, '[data-id]')

    if (!closestItemWithId) {
        throw new Error('Unable to find element with expected data key');
    }

    // Extract and return that attribute
    return closestItemWithId.getAttribute('data-id');
}

//const cafeList = document.querySelector('#cafe-list');
//const form = document.querySelector('#add-cafe-form');

// create element & render cafe
//function renderCafe(doc) {
//let li = document.createElement('li');
//let name = document.createElement('span');
//let city = document.createElement('span');
//let cross = document.createElement('div');

//li.setAttribute('data-id', doc.id);
//name.textContent = doc.data().name;
//city.textContent = doc.data().city;
//cross.textContent = 'x';

//li.appendChild(name);
//li.appendChild(city);
//li.appendChild(cross);

//cafeList.appendChild(li);

// deleting data
//cross.addEventListener('click', (e) => {
//e.stopPropagation();
//let id = e.target.parentElement.getAttribute('data-id');
//db.collection('cafes').doc(id).delete();
//});
//}

// real-time listener
//db.collection('driver').orderBy('car_id').onSnapshot(snapshot => {
//let changes = snapshot.docChanges();
//changes.forEach(change => {
//console.log(change.doc.data());
//if(change.type == 'added'){
//renderCafe(change.doc);
//} else if (change.type == 'removed'){
//let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
//cafeList.removeChild(li);
//}
//});
//});