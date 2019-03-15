(function() {
    "use strict";
    var key = sessionStorage.getItem('key');
    $(document).ready(() => {
        console.log(key);


        firebase.database()
            .ref(`/passenger/${key}`)
            .once('value')
            .then(function(snapshot) {
                console.log(snapshot);

                let name = snapshot.val().customer_name;
                let sp_name = name.split(" ");

                $('#customername').val(sp_name[0])
                $('#customersurname').val(sp_name[1])
                $('#customeremail').val(snapshot.val().customer_email)
                $('#customertel').val(snapshot.val().customer_tel)
                $('#providerId').val(snapshot.val().providerId)
                $('#showpic').attr("src", snapshot.val().customer_pic);
            });


    });
    // Clicking to add a new item
    document.querySelector("#buttoneditpass").addEventListener("click", event => {
        // Get the user input
        let value1 = document.querySelector('#customername').value;
        let value2 = document.querySelector('#customersurname').value;
        let value3 = document.querySelector('#customeremail').value;
        let value4 = document.querySelector('#customertel').value;
        let value5 = document.querySelector('#providerId').value;
        var value6 = document.querySelector('#showpic').src;

        // Remove whitespace from start and end of input
        //value = value.trim();

        // Nothing entered, return early from this function
        if (!value1) {
            alert("ให้กรอกชื่อลูกค้า");
            return false;
        }
        if (!value2) {
            alert("ให้กรอกสกุลลูกค้า");
            return false;
        }
        if (!value3) {
            alert("ให้กรอกอีเมลลูกค้า");
            return false;
        }
        if (!value4) {
            alert("ให้กรอกเบอร์โทรลูกค้า");
            return false;
        }
        if (!value5) {
            alert("ให้กรอกรหัสลูกค้า");
            return false;
        }
        if (value6 != 'http://placehold.it/180' && !value6) {
            alert("ให้เลือกรูปลูกค้า");
            return false;
        } else {
            confirmUpload();
            setTimeout(() => {
                UpdatePassenger(value1, value2, value3, value4, value5, value6)
            }, 2000);

        }

    });

    function UpdatePassenger(value1, value2, value3, value4, value5, value6) {
        // console.log("In Method InsertPassenger");

        value6 = sessionStorage.getItem('ImgURL');
        // console.log("sessionImg : ", value6);
        if (value6 != null) {
            // console.log("sessionImg : ", value6);
            firebase.database().ref(`passenger/${key}/`).update({
                customerId: key,
                customer_name: value1 + " " + value2,
                customer_email: value3,
                customer_tel: value4,
                customer_pic: value6,
                providerId: value5
            }).then(function() {
                alert("Added data successful");

            }).finally(function() {
                // console.log("Clear all Data in Fields");

                // Reset the input value ready for a new item
                document.querySelector('#customername').value = '';
                document.querySelector('#customersurname').value = '';
                document.querySelector('#customeremail').value = '';
                document.querySelector('#customertel').value = '';
                document.querySelector('#showpic').src = 'http://placehold.it/180';
                document.querySelector('#providerId').value = '';
                key = '';
                sessionStorage.removeItem('ImgURL');
                //console.log("Success Add customer");
                changecontent('passenger.html');
            });
        }
    }
})();