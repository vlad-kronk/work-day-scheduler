// DOM handles
$("#currentDay").text(moment().format("dddd, MMMM D, YYYY"));
var containerEl = document.querySelector(".container");

var day = JSON.parse(localStorage.getItem("day")) || ["", "", "", "", "", "", "", "", ""];

function main() {

    //<div class="row" id="9am">
    // 	<section class="hour">9am</section>
    // 	<textarea class="past/present/future"></textarea>
    // 	<button class="saveBtn">Save</button>
    //</div>

    var rows = [];

    for (var i = 0; i < day.length; i++) {

        // create a flex row element, style it, and
        // assign it a data attribute based on iteration
        var tempD = document.createElement("div");
        tempD.setAttribute("class", "row");
        tempD.setAttribute("data-i", i);

        // create time labels and style them
        var tempS = document.createElement("section");
        tempS.setAttribute("class", "hour");
        tempS.textContent = moment(i+9, "H").format("ha");

        // create text box, and set its text if already saved
        var tempT = document.createElement("textarea");
        tempT.textContent = day[i];

        // logic vars
        var iHour = moment(i+9, "H").hour();
        var cHour = moment().hour();

        if (iHour < cHour) {                            // is the time block in the past
            tempT.setAttribute("class", "past");
        } else if (iHour === cHour) {                   // is the time block now
            tempT.setAttribute("class", "present");
        } else {                                        // is the time block in the future
            tempT.setAttribute("class", "future");
        }

        // create button, style it and set its text
        var tempB = document.createElement("button");
        tempB.setAttribute("class", "saveBtn");
        tempB.textContent = "Save";

        // append flex row to the container element
        containerEl.appendChild(tempD);

        // append the time, text box, and save button to the row
        tempD.appendChild(tempS);
        tempD.appendChild(tempT);
        tempD.appendChild(tempB);

        rows.push(tempD);
    }

    // console.log(rows);

    // loops through rows to get each button
    rows.forEach(row => {
        row.children[2].addEventListener("click", (e) => {

            // save the value of the text box to the
            // schedule array in the correct position,
            // and save to localStorage
            day[e.target.parentElement.dataset.i] = e.target.parentElement.children[1].value;
            localStorage.setItem("day", JSON.stringify(day));

        });
    })
}

main();