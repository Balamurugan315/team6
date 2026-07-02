
"use strict";

/*==================================================
        TOURNAMENT MANAGEMENT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeTournament();

});

/*==================================================
        INITIALIZE
==================================================*/

function initializeTournament(){

    initializeSearch();

    initializeFilters();

    initializeApprove();

    initializeReject();

    initializeEdit();

    initializeDelete();

}

/*==================================================
        SEARCH
==================================================*/

function initializeSearch(){

    const search=document.querySelector(".table-search input");

    if(!search) return;

    search.addEventListener("keyup",filterTournament);

}

function filterTournament(){

    const value=document
        .querySelector(".table-search input")
        .value
        .toLowerCase();

    const rows=document.querySelectorAll("tbody tr");

    rows.forEach(row=>{

        const text=row.innerText.toLowerCase();

        row.style.display=text.includes(value)
            ? ""
            : "none";

    });

}

/*==================================================
        FILTERS
==================================================*/

function initializeFilters(){

    document.querySelectorAll("select")

    .forEach(select=>{

        select.addEventListener("change",()=>{

            showToast(

                "Tournament Filter Applied",

                "info"

            );

        });

    });

}

/*==================================================
        DATE VALIDATION
==================================================*/

function validateTournamentDates(start,end){

    if(!start || !end)

        return false;

    const startDate=new Date(start);

    const endDate=new Date(end);

    if(endDate<startDate){

        showToast(

            "End date cannot be before Start date.",

            "error"

        );

        return false;

    }

    return true;

}

/*==================================================
        PRIZE POOL VALIDATION
==================================================*/

function validatePrizePool(value){

    if(isNaN(value) || value<0){

        showToast(

            "Invalid Prize Pool.",

            "error"

        );

        return false;

    }

    return true;

}

/*==================================================
        MAX TEAM VALIDATION
==================================================*/

function validateTeams(value){

    if(value<2){

        showToast(

            "Minimum 2 teams required.",

            "error"

        );

        return false;

    }

    return true;

}

/*==================================================
        APPROVE
==================================================*/

function initializeApprove(){

    document

    .querySelectorAll(".approve-btn")

    .forEach(button=>{

        button.addEventListener("click",approveTournament);

    });

}

function approveTournament(e){

    if(!confirmAction(

        "Approve this tournament?"

    )) return;

    const row=e.target.closest("tr");

    const badge=row.querySelector(".badge");

    badge.innerHTML="Approved";

    badge.className="badge approved";

    disableTournamentButtons(row);

    updateTournamentStats();

    showToast(

        "Tournament Approved",

        "success"

    );

}

/*==================================================
        REJECT
==================================================*/

function initializeReject(){

    document

    .querySelectorAll(".reject-btn")

    .forEach(button=>{

        button.addEventListener("click",rejectTournament);

    });

}

function rejectTournament(e){

    if(!confirmAction(

        "Reject this tournament?"

    )) return;

    const row=e.target.closest("tr");

    const badge=row.querySelector(".badge");

    badge.innerHTML="Rejected";

    badge.className="badge rejected";

    disableTournamentButtons(row);

    updateTournamentStats();

    showToast(

        "Tournament Rejected",

        "error"

    );

}
/*==================================================
        EDIT TOURNAMENT
==================================================*/

function initializeEdit(){

    document

    .querySelectorAll(".warning-btn")

    .forEach(button=>{

        button.addEventListener("click",editTournament);

    });

}

function editTournament(e){

    const row=e.target.closest("tr");

    if(!row) return;

    showToast(

        "Tournament loaded for editing.",

        "info"

    );

    populateTournamentDetails(row);

}

/*==================================================
        DELETE TOURNAMENT
==================================================*/

function initializeDelete(){

    document

    .querySelectorAll(".delete-btn")

    .forEach(button=>{

        button.addEventListener("click",deleteTournament);

    });

}

function deleteTournament(e){

    if(!confirmAction(

        "Delete this tournament permanently?"

    )) return;

    const row=e.target.closest("tr");

    if(row){

        row.remove();

    }

    updateTournamentStats();

    showToast(

        "Tournament deleted successfully.",

        "success"

    );

}

/*==================================================
        DETAILS PANEL
==================================================*/

function populateTournamentDetails(row){

    const cells=row.querySelectorAll("td");

    if(cells.length<8) return;

    const tournament=cells[1].innerText;

    const game=cells[2].innerText;

    const organizer=cells[3].innerText;

    const start=cells[4].innerText;

    const end=cells[5].innerText;

    const status=cells[6].innerText;

    updateDetail(

        ".detail-name",

        tournament

    );

    updateDetail(

        ".detail-game",

        game

    );

    updateDetail(

        ".detail-organizer",

        organizer

    );

    updateDetail(

        ".detail-start",

        start

    );

    updateDetail(

        ".detail-end",

        end

    );

    updateDetail(

        ".detail-status",

        status

    );

}

function updateDetail(selector,value){

    const element=document.querySelector(selector);

    if(element){

        element.innerHTML=value;

    }

}

/*==================================================
        BUTTON LOCK
==================================================*/

function disableTournamentButtons(row){

    row

    .querySelectorAll(

        ".approve-btn,.reject-btn,.warning-btn"

    )

    .forEach(button=>{

        button.disabled=true;

        button.style.opacity=".6";

        button.style.cursor="not-allowed";

    });

}

/*==================================================
        ADMIN NOTES
==================================================*/

function initializeAdminNotes(){

    const notes=document.querySelector("textarea");

    if(!notes) return;

    notes.addEventListener("input",()=>{

        if(notes.value.length>500){

            notes.value=notes.value.substring(0,500);

        }

        const counter=document.querySelector(".note-count");

        if(counter){

            counter.innerHTML=

                `${notes.value.length}/500`;

        }

    });

}

/*==================================================
        ROW HIGHLIGHT
==================================================*/

function initializeRowHighlight(){

    document

    .querySelectorAll("tbody tr")

    .forEach(row=>{

        row.addEventListener("click",()=>{

            document

            .querySelectorAll("tbody tr")

            .forEach(r=>{

                r.classList.remove(

                    "active-row"

                );

            });

            row.classList.add(

                "active-row"

            );

            populateTournamentDetails(row);

        });

    });

}

/*==================================================
        UPDATE STATISTICS
==================================================*/

function updateTournamentStats(){

    const approved=

    document.querySelectorAll(

        ".badge.approved"

    ).length;

    const rejected=

    document.querySelectorAll(

        ".badge.rejected"

    ).length;

    const pending=

    document.querySelectorAll(

        ".badge.pending"

    ).length;

    const cards=document.querySelectorAll(

        ".stat-card h2"

    );

    if(cards.length>=4){

        cards[1].innerHTML=approved;

        cards[2].innerHTML=pending;

        cards[3].innerHTML=rejected;

    }

}/*==================================================
        PAGINATION
==================================================*/

let currentPage = 1;

const rowsPerPage = 10;

function initializePagination(){

    showTournamentPage(currentPage);

}

function showTournamentPage(page){

    const rows = document.querySelectorAll("tbody tr");

    const start = (page - 1) * rowsPerPage;

    const end = start + rowsPerPage;

    rows.forEach((row,index)=>{

        row.style.display =

            (index >= start && index < end)

            ? ""

            : "none";

    });

}

function nextPage(){

    const rows=document.querySelectorAll("tbody tr");

    const totalPages=Math.ceil(rows.length/rowsPerPage);

    if(currentPage<totalPages){

        currentPage++;

        showTournamentPage(currentPage);

    }

}

function previousPage(){

    if(currentPage>1){

        currentPage--;

        showTournamentPage(currentPage);

    }

}

/*==================================================
        EXPORT CSV
==================================================*/

function exportTournamentCSV(){

    const rows=document.querySelectorAll("tbody tr");

    let csv="Tournament,Game,Organizer,Status\n";

    rows.forEach(row=>{

        const cols=row.querySelectorAll("td");

        if(cols.length<7) return;

        csv+=`${cols[1].innerText},${cols[2].innerText},${cols[3].innerText},${cols[6].innerText}\n`;

    });

    const blob=new Blob([csv],{

        type:"text/csv"

    });

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="tournaments.csv";

    a.click();

    URL.revokeObjectURL(url);

    showToast(

        "Tournament report exported.",

        "success"

    );

}

/*==================================================
        KEYBOARD SHORTCUTS
==================================================*/

function initializeKeyboard(){

    document.addEventListener("keydown",(e)=>{

        if(e.ctrlKey && e.key==="f"){

            e.preventDefault();

            document

            .querySelector(".table-search input")

            ?.focus();

        }

        if(e.ctrlKey && e.key==="e"){

            e.preventDefault();

            exportTournamentCSV();

        }

        if(e.key==="Escape"){

            document.activeElement.blur();

        }

    });

}

/*==================================================
        LOADING EFFECT
==================================================*/

function simulateLoading(button,text){

    if(!button) return;

    buttonLoading(button,text);

    setTimeout(()=>{

        stopButtonLoading(button);

    },1200);

}

/*==================================================
        FORM VALIDATION
==================================================*/

function validateTournamentForm(data){

    if(isEmpty(data.name)){

        showToast(

            "Tournament name is required.",

            "error"

        );

        return false;

    }

    if(!validatePrizePool(data.prize)){

        return false;

    }

    if(!validateTeams(data.teams)){

        return false;

    }

    if(!validateTournamentDates(

        data.start,

        data.end

    )){

        return false;

    }

    return true;

}

/*==================================================
        REFRESH DASHBOARD
==================================================*/

function refreshTournamentDashboard(){

    updateTournamentStats();

    initializePagination();

}

/*==================================================
        SAFE INITIALIZATION
==================================================*/

try{

    initializePagination();

    initializeKeyboard();

    refreshTournamentDashboard();

}

catch(error){

    console.error(

        "Tournament JS Error:",

        error

    );

    showToast(

        "Something went wrong.",

        "error"

    );

}

/*==================================================
        GLOBAL FUNCTIONS
==================================================*/

window.nextTournamentPage = nextPage;

window.previousTournamentPage = previousPage;

window.exportTournamentCSV = exportTournamentCSV;

