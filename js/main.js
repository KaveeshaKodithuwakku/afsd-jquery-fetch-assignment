
function loadHome() {
    document.getElementById('home').style.display = "block";
    document.getElementById('viewData').style.display = "none";
}

function loadView() {
    document.getElementById('viewData').style.display = "block";
    document.getElementById('home').style.display = "none";
    showAllData();
}

function saveData() {
 
    if ($("#id").val() == "" || $("#name").val() == "" || $("#address").val() == "" || $("#salary").val() == "") {
        $("#response").html("<div class='alert alert-warning col p-1 m-0' role='alert'>"
            + "Please fill all the fileds" + "</div>")
    } else {
        var sId = $("#id").val();
        var sName = $("#name").val();
        var sAddress = $("#address").val();
        var sSalary = $("#salary").val();
        console.log('AAAA');
        fetch('http://localhost:8080/student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: sId,
                name: sName,
                address: sAddress,
                salary: sSalary
            })
        }).then(res => {
                if (res.ok) {
                    console.log('Student save successfully');
                    $("#response").html("<div class='alert alert-success col p-1 m-0' role='alert'>"
                        + "Student details saved successfully" + "</div>")         
                } else {
                    console.log('Student save failed');
                    $("#response").html("<div class='alert alert-danger col p-1 m-0' role='alert'>"
                        + "Student details save failed" + "</div>")
                }      
        }).catch(err => {
                console.log(err.message)
                $("#message").html("<div class='alert alert-danger col p-1 m-0' role='alert'>"
                    + "An error occurred" + "</div>")
        }).finally(clearFeilds())
    }
}

function clearFeilds(){
    $("#id").val("");
    $("#name").val("");
    $("#address").val("");
    $("#salary").val("");
}

function showAllData() {
    console.log('show');
    fetch('http://localhost:8080/student/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(dataset => {
            $("#dTable").DataTable({
                data: dataset,
                "columns": [
                    { "data": "id" },
                    { "data": "name" },
                    { "data": "address" },
                    { "data": "salary" },
                ]
            })
        })
        .catch(err => {
            console.log(err.message)
            $("#response").html("<div class='alert alert-dark m-0 p-2 w-50 text-center opacity-75 text-danger' role='alert'>" +
                "An Error occurred when loading data" +
                "</div>")
        })
}

