(function() {
    "use strict";
    var key = sessionStorage.getItem('key');
    $(document).ready(() => {
        console.log(key);


        firebase.database()
            .ref(`/driver/${key}`)
            .once('value')
            .then(function(snapshot) {
                console.log(snapshot);

                let name = snapshot.val().driver_name;
                let sp_name = name.split(" ");

                $('#carNumber').val(snapshot.val().carNumber)
                $('#drivername').val(sp_name[0])
                $('#driversurname').val(sp_name[1])
                $('#drivercitizen').val(snapshot.val().driver_citizen);
                $('#drivertel').val(snapshot.val().driver_tel)
                $('#driveremail').val(snapshot.val().driver_email)
                $('#driver_id').val(snapshot.val().driver_id)
                $('#showpic').attr("src", snapshot.val().driver_pic);
            });


    });
    // Clicking to add a new item
    document.querySelector("#buttonedit").addEventListener("click", event => {
        // Get the user input

        let value1 = document.querySelector("#carNumber").value;
        let value2 = document.querySelector("#drivername").value;
        let value3 = document.querySelector("#driversurname").value;
        let value4 = document.querySelector("#drivercitizen").value;
        let value5 = document.querySelector("#drivertel").value;
        let value6 = document.querySelector("#driveremail").value;
        let value7 = document.querySelector("#showpic").src;

        // Remove whitespace from start and end of input
        //value = value.trim();

        // Nothing entered, return early from this function
        if (!value1) {
            alert("ให้กรอกทะเบียนรถ");
            return false;
        }
        if (!value2) {
            alert("ให้กรอกชื่อคนขับ");
            return false;
        }
        if (!value3) {
            alert("ให้กรอกนามสกุลคนขับ");
            return false;
        }
        if (!value4) {
            alert("ให้กรอกรหัสคนขับ");
            return false;
        }
        if (!value5) {
            alert("ให้กรอกเบอร์โทรคนขับ");
            return false;
        }
        if (!value6) {
            alert("ให้กรอกอีเมลล์คนขับ");
            return false;
        }
        if (value7 != 'http://placehold.it/180' && !value7) {
            alert("ให้เลือกรูปลูกค้า");
            return false;
        } else {

            setTimeout(() => {
                UpdateDriver(value1, value2, value3, value4, value5, value6, value7)
            }, 2000);

        }

    });

    function UpdateDriver(value1, value2, value3, value4, value5, value6, value7) {

        if (value6 != null) {
            firebase.database().ref(`driver/${key}/`).update({
                carNumber: value1
                    // driver_id: key,
                    // driver_name: value2 + " " + value3,
                    // driver_citizen: value4,
                    // driver_tel: value5,
                    // driver_email: value6,
                    // driver_pic: value7
            }).then(function() {
                alert("Added data successful");
            }).finally(function() {
                console.log("key", key);

                // Reset the input value ready for a new item
                document.querySelector("#carNumber").value = "";
                document.querySelector("#drivername").value = "";
                document.querySelector("#driversurname").value = "";
                document.querySelector("#drivercitizen").value = "";
                document.querySelector("#drivertel").value = "";
                document.querySelector('#showpic').src = 'http://placehold.it/180';
                sessionStorage.removeItem('ImgURL');
                changecontent('driver.html');

            });
        }
    }
    // We added the `data-id` attribute when we rendered the items
    function getKeyFromClosestElement(element) {
        // Search for the closest parent that has an attribute `data-id`
        let closestItemWithId = closest(event.delegateTarget, "[data-id]");

        if (!closestItemWithId) {
            throw new Error("Unable to find element with expected data key");
        }

        // Extract and return that attribute
        return closestItemWithId.getAttribute("data-id");
    }
})();

let driver_key = state.list[key].driver_by;
            tableDriver.child(`${driver_key}`).once('value', function(mediasnap) {

                if (mediasnap.exists()) {
                    driver_name = mediasnap.val().driver_name;
                    console.log(driver_name);

                } else {
                    driver_name = "ไม่พบข้อมูลคนขับ";
                    console.log(driver_name);
                }
            })