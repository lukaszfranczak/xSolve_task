// ************************
// Input data
// ************************

var objJson = [
    {
        "id": 1,
        "firstName": "Jan",
        "lastName": "Kowalski",
        "dateOfBirth": "1.7.1990 11:35",
        "company": "XSolve",
        "note": 90
    },
    {
        "id": 4,
        "firstName": "Justyna",
        "lastName": "Kowalska",
        "dateOfBirth": "4.02.1976 14:37",
        "company": "XSolve",
        "note": 91
    },
    {
        "id": 2,
        "firstName": "Krzysztof",
        "lastName": "Krawczyk",
        "dateOfBirth": "28.10.1950 2:15",
        "company": "Chilid",
        "note": 27
    },
    {
        "id": 3,
        "firstName": "Bogusław",
        "lastName": "Linda",
        "dateOfBirth": "03.01.1963 23:10",
        "company": "XSolve",
        "note": 50
    },
    {
        "id": 5,
        "firstName": "Krzysztof",
        "lastName": "Kononowicz",
        "dateOfBirth": "10.10.1910 18:00",
        "company": "Chilid",
        "note": 77
    },
    {
        "id": 6,
        "firstName": "Maryla",
        "lastName": "Rodowicz",
        "dateOfBirth": "29.02.1936 11:35",
        "company": "XSolve",
        "note": 8
    }
];

// ************************
// Overall page display
// ************************

// Default configuration

var current_page = 1;
var records_per_page = 5;

// Calculate number of pages based on number of objects and records per page

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}

// Function to change page

var listing_table = document.getElementById("listingTable");


function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");

    listing_table.innerHTML = "";

    // Insert table header

    var elementNewTableHeader = document.createElement('thead');
    var elementNewHeaderRow = document.createElement('tr');
    var elementNewHeaderCell1 = document.createElement('th');
    var elementNewHeaderCell2 = document.createElement('th');
    var elementNewHeaderCell3 = document.createElement('th');
    var elementNewHeaderCell4 = document.createElement('th');
    var elementNewHeaderCell5 = document.createElement('th');
    var elementNewHeaderCell6 = document.createElement('th');
    listing_table.appendChild(elementNewTableHeader);
    elementNewTableHeader.appendChild(elementNewHeaderRow);
    elementNewHeaderRow.appendChild(elementNewHeaderCell1);
    elementNewHeaderRow.appendChild(elementNewHeaderCell2);
    elementNewHeaderRow.appendChild(elementNewHeaderCell3);
    elementNewHeaderRow.appendChild(elementNewHeaderCell4);
    elementNewHeaderRow.appendChild(elementNewHeaderCell5);
    elementNewHeaderRow.appendChild(elementNewHeaderCell6);
    elementNewHeaderCell1.innerText = 'ID';
    elementNewHeaderCell1.setAttribute('onclick', 'sortTable(0)');
    elementNewHeaderCell2.innerText = 'First name';
    elementNewHeaderCell2.setAttribute('onclick', 'sortTable(1)');
    elementNewHeaderCell3.innerText = 'Last Name';
    elementNewHeaderCell3.setAttribute('onclick', 'sortTable(2)');
    elementNewHeaderCell4.innerText = 'Date of Birth';
    elementNewHeaderCell4.setAttribute('onclick', 'sortTable(3)');
    elementNewHeaderCell5.innerText = 'Company';
    elementNewHeaderCell5.setAttribute('onclick', 'sortTable(4)');
    elementNewHeaderCell6.innerText = 'Note';
    elementNewHeaderCell6.setAttribute('onclick', 'sortTable(5)');

    var elementNewTableBody = document.createElement('tbody');
    listing_table.appendChild(elementNewTableBody);


    // Insert table data

    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {

        var record = objJson[i];

        if (record) {
            var elementNewRow = document.createElement('tr');
            var elementNewCell1 = document.createElement('td');
            var elementNewCell2 = document.createElement('td');
            var elementNewCell3 = document.createElement('td');
            var elementNewCell4 = document.createElement('td');
            var elementNewCell5 = document.createElement('td');
            var elementNewCell6 = document.createElement('td');

            elementNewTableBody.appendChild(elementNewRow);
            elementNewRow.appendChild(elementNewCell1);
            elementNewCell1.innerText = record.id;
            elementNewRow.appendChild(elementNewCell2);
            elementNewCell2.innerText = record.firstName;
            elementNewRow.appendChild(elementNewCell3);
            elementNewCell3.innerText = record.lastName;
            elementNewRow.appendChild(elementNewCell4);
            elementNewCell4.innerText = record.dateOfBirth;
            elementNewRow.appendChild(elementNewCell5);
            elementNewCell5.innerText = record.company;
            elementNewRow.appendChild(elementNewCell6);
            elementNewCell6.innerText = record.note;
        }

    }
    page_span.innerHTML = page;


    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    // Show buttons based on pages number

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

// Change page to previous

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

var elementPrevButton = document.querySelector('#btn_prev');
// console.log(elementNextButton);
elementPrevButton.addEventListener('click', prevPage);

// Change page to next

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

var elementNextButton = document.querySelector('#btn_next');
// console.log(elementNextButton);
elementNextButton.addEventListener('click', nextPage);

window.onload = function() {
    changePage(1);
};


// ************************
// Selecting number of results on page
// ************************

var noOfResultsInputValue = document.querySelector('#noOfResultsInput');
// console.log(noOfResultsInputValue);

var elementShowButton = document.querySelector('#showButton');
// console.log(elementShowButton);


function show() {
    var inputValue = noOfResultsInputValue.value;
    // console.log(inputValue);
    records_per_page = inputValue;

    // Validate maximum number of rows in json with input

    if (records_per_page>objJson.length) {
        records_per_page = objJson.length;
    }

    // console.log(records_per_page);
    noOfResultsInputValue.value = '';
    changePage(current_page);
};

elementShowButton.addEventListener('click', show);


// ************************
// Sorting the table
// ************************

function sortTable(n) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "ascending";
    while (switching) {
        switching = false;
        rows = document.querySelector("#listingTable tbody").rows;
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];
            if (dir == "ascending") {
                if (x.textContent.toUpperCase() > y.textContent.toUpperCase()) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "descending") {
                if (x.textContent.toUpperCase() < y.textContent.toUpperCase()) {
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount == 0 && dir == "ascending") {
                dir = "descending";
                switching = true;
            }
        }
    }
}


// ************************
// Filtering the table
// ************************

function filterTable(event) {
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#listingTable tbody").rows;

    for (var i = 0; i < rows.length; i++) {
        var firstCol = rows[i].cells[0].textContent.toUpperCase();
        var secondCol = rows[i].cells[1].textContent.toUpperCase();
        var thirdCol = rows[i].cells[2].textContent.toUpperCase();
        var fourthCol = rows[i].cells[3].textContent.toUpperCase();
        var fifthCol = rows[i].cells[4].textContent.toUpperCase();
        var sixthCol = rows[i].cells[5].textContent.toUpperCase();

        if (firstCol.indexOf(filter) > -1
            || secondCol.indexOf(filter) > -1
            || thirdCol.indexOf(filter) > -1
            || fourthCol.indexOf(filter) > -1
            || fifthCol.indexOf(filter) > -1
            || sixthCol.indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

document.querySelector('#filterInput').addEventListener('keyup', filterTable, false);