(function() {
        'use strict';

        var html = "";
        getData();

        function getData() {
            let keyOld = sessionStorage.getItem('key');
            firebase.database().ref(`bookings`).child(`${keyOld}`).on('value', function(snapshot) {
                if (snapshot.exists()) {
                    snapshot.forEach(childSnapshot => {
                        if (childSnapshot.val().book_id != undefined) {
                            getDriver(childSnapshot.val());
                        } else {
                            return false;
                        }

                    });
                } else {
                    alert('ไม่พบข้อมูลการจอง');
                    changecontent('passenger.html');
                }
            });

        }

        function getDriver(snap_booking) {
            firebase.database().ref('driver').child(`${snap_booking.driver_by}`).once('value').then(dataDriver => {
                if (dataDriver.exists()) {
                    showBooks(snap_booking, dataDriver.val())
                } else {
                    showBooksErr(snap_booking, "ไม่พบชื่อคนขับ")
                }

            })
        }


        function showBooks(snap_booking, snap_driver) {

            let datetime = new Date(snap_booking.time_book);
            let formatted_date = datetime.getDate() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getFullYear() + " " + datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds();

            html += `
    <tr>
      <td class='col-md-1'>${snap_booking.book_id}</td>
      <td>${snap_booking.load_person} คน</td>
      <td>${snap_booking.load_baggage} ใบ</td>
      <td>${snap_booking.price} บาท</td>
      <td>${formatted_date}</td>
      <td> <button type="button" id="des" class=" done-it btn btn-info" onclick="gotoMap(${snap_booking.start_lat},${snap_booking.start_long},${snap_booking.latitude},${snap_booking.longitude})" >${snap_booking.route_name}</button></td>
      <td>${snap_driver.driver_name? `${snap_driver.driver_name}`: "ไม่พบชื่อคนขับ"}</td>
      <td>${snap_booking.status_book}</td>
    </tr>
  `;
    return document.querySelector('#outputDesPass').innerHTML = html;
}

function showBooksErr(snap_booking, snap_driver) {

    let datetime = new Date(snap_booking.time_book);
    let formatted_date = datetime.getDate() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getFullYear() + " " + datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds();
    html += `
<tr>
  <td class='col-md-1'>${snap_booking.book_id}</td>
  <td>${snap_booking.load_person} คน</td>
  <td>${snap_booking.load_baggage} ใบ</td>
  <td>${snap_booking.price} บาท</td>
  <td>${formatted_date}</td>
  <td> <button type="button" id="des" class=" done-it btn btn-info" onclick="gotoMap(${snap_booking.start_lat},${snap_booking.start_long},${snap_booking.latitude},${snap_booking.longitude})" >${snap_booking.route_name}</button></td>
  <td>${snap_driver}</td>
  <td>${snap_booking.status_book}</td>
</tr>
`;
return document.querySelector('#outputDesPass').innerHTML = html;
}

})()