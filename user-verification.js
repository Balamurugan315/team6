"use strict";

/*=========================================================
                GAMEVERSE USER VERIFICATION
=========================================================*/

let users = [];
let filteredUsers = [];
let selectedUser = null;

let currentPage = 1;
const rowsPerPage = 10;

/*=========================================================
                DOM REFERENCES
=========================================================*/

const tableBody = document.getElementById("userTableBody");

const totalUsers = document.getElementById("totalUsers");
const pendingUsers = document.getElementById("pendingUsers");
const approvedUsers = document.getElementById("approvedUsers");
const rejectedUsers = document.getElementById("rejectedUsers");

const tableCount = document.getElementById("tableCount");

const searchInput = document.getElementById("searchUser");

const statusFilter = document.getElementById("statusFilter");
const roleFilter = document.getElementById("roleFilter");
const countryFilter = document.getElementById("countryFilter");

const pageStart = document.getElementById("pageStart");
const pageEnd = document.getElementById("pageEnd");
const pageTotal = document.getElementById("pageTotal");
const currentPageLabel = document.getElementById("currentPage");

/*=========================================================
                INITIALIZE
=========================================================*/

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {

    loadUsers();

    populateCountryFilter();

    updateStatistics();

    renderUsers();

    initializeEvents();

}

/*=========================================================
                LOAD USERS
=========================================================*/

function loadUsers() {

    users = Storage.load(COLLECTIONS.USERS) || [];

    filteredUsers = [...users];

}

/*=========================================================
                UPDATE STATISTICS
=========================================================*/

function updateStatistics() {

    totalUsers.textContent = users.length;

    pendingUsers.textContent =

        users.filter(user =>

            user.status === "Pending"

        ).length;

    approvedUsers.textContent =

        users.filter(user =>

            user.status === "Approved"

        ).length;

    rejectedUsers.textContent =

        users.filter(user =>

            user.status === "Rejected"

        ).length;

}

/*=========================================================
                COUNTRY FILTER
=========================================================*/

function populateCountryFilter() {

    const countries = [

        ...new Set(

            users.map(

                user => user.country

            )

        )

    ];

    countries.sort();

    countries.forEach(country => {

        const option =

            document.createElement("option");

        option.value = country;

        option.textContent = country;

        countryFilter.appendChild(option);

    });

}

/*=========================================================
                SAVE USERS
=========================================================*/

function saveUsers() {

    Storage.save(

        COLLECTIONS.USERS,

        users

    );

}

/*=========================================================
                REFRESH PAGE
=========================================================*/

function refreshPage() {

    loadUsers();

    updateStatistics();

    renderUsers();

}
/*=========================================================
                RENDER USERS TABLE
=========================================================*/

function renderUsers() {

    if (!tableBody) return;

    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;

    const end = start + rowsPerPage;

    const pageUsers = filteredUsers.slice(start, end);

    pageUsers.forEach(user => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>

                <input

                    type="checkbox"

                    class="user-checkbox"

                    value="${user.id}">

            </td>

            <td>

                <div class="user-info">

                    <img src="${user.avatar || '../images/default-user.png'}">

                    <div>

                        <h4>${user.username}</h4>

                        <small>${user.email}</small>

                    </div>

                </div>

            </td>

            <td>${user.role}</td>

            <td>${user.game}</td>

            <td>${user.country}</td>

            <td>${user.joined}</td>

            <td>

                <span class="status ${user.status.toLowerCase()}">

                    ${user.status}

                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button

                        class="view-btn"

                        onclick="viewUser(${user.id})">

                        <i class="ri-eye-line"></i>

                    </button>

                    <button

                        class="approve-btn"

                        onclick="approveUser(${user.id})">

                        <i class="ri-check-line"></i>

                    </button>

                    <button

                        class="reject-btn"

                        onclick="rejectUser(${user.id})">

                        <i class="ri-close-line"></i>

                    </button>

                </div>

            </td>

        `;

        tableBody.appendChild(row);

    });

    updatePagination();

}

/*=========================================================
                PAGINATION
=========================================================*/

function updatePagination() {

    pageTotal.textContent = filteredUsers.length;

    pageStart.textContent =

        filteredUsers.length === 0

        ? 0

        : (currentPage - 1) * rowsPerPage + 1;

    pageEnd.textContent =

        Math.min(

            currentPage * rowsPerPage,

            filteredUsers.length

        );

    currentPageLabel.textContent = currentPage;

}

/*=========================================================
                NEXT PAGE
=========================================================*/

function nextPage() {

    const totalPages = Math.ceil(

        filteredUsers.length / rowsPerPage

    );

    if (currentPage < totalPages) {

        currentPage++;

        renderUsers();

    }

}

/*=========================================================
                PREVIOUS PAGE
=========================================================*/

function previousPage() {

    if (currentPage > 1) {

        currentPage--;

        renderUsers();

    }

}

/*=========================================================
                SELECT ALL
=========================================================*/

function toggleSelectAll(isChecked) {

    document

        .querySelectorAll(".user-checkbox")

        .forEach(box => {

            box.checked = isChecked;

        });

}

/*=========================================================
                SELECTED USERS
=========================================================*/

function getSelectedUsers() {

    const ids = [];

    document

        .querySelectorAll(".user-checkbox:checked")

        .forEach(box => {

            ids.push(

                Number(box.value)

            );

        });

    return ids;

}
/*=========================================================
                VIEW USER DETAILS
=========================================================*/

function viewUser(id) {

    selectedUser = users.find(user => user.id === id);

    if (!selectedUser) return;

    document.getElementById("profileImage").src =
        selectedUser.avatar || "../images/default-user.png";

    document.getElementById("profileName").textContent =
        selectedUser.username;

    document.getElementById("profileRole").textContent =
        selectedUser.role;

    document.getElementById("profileEmail").textContent =
        selectedUser.email;

    document.getElementById("profilePhone").textContent =
        selectedUser.phone;

    document.getElementById("profileCountry").textContent =
        selectedUser.country;

    document.getElementById("profileGame").textContent =
        selectedUser.game;

    document.getElementById("profileJoined").textContent =
        selectedUser.joined;

    document.getElementById("profileStatus").textContent =
        selectedUser.status;

    document.getElementById("adminNotes").value =
        selectedUser.notes || "";

    loadVerificationHistory();

}

/*=========================================================
                APPROVE USER
=========================================================*/

function approveUser(id) {

    const user = users.find(u => u.id === id);

    if (!user) return;

    user.status = "Approved";

    user.verified = true;

    user.notes =
        document.getElementById("adminNotes").value;

    saveUsers();

    addActivity(

        "Approved User",

        user.username

    );

    refreshPage();

    viewUser(id);

    showNotification(

        "User approved successfully",

        "success"

    );

}

/*=========================================================
                REJECT USER
=========================================================*/

function rejectUser(id) {

    const reason = prompt(

        "Enter rejection reason"

    );

    if (reason === null) return;

    const user = users.find(u => u.id === id);

    if (!user) return;

    user.status = "Rejected";

    user.verified = false;

    user.notes = reason;

    saveUsers();

    addActivity(

        "Rejected User",

        user.username

    );

    refreshPage();

    viewUser(id);

    showNotification(

        "User rejected successfully",

        "error"

    );

}

/*=========================================================
                REQUEST CHANGES
=========================================================*/

function requestChanges() {

    if (!selectedUser) {

        alert(

            "Please select a user first."

        );

        return;

    }

    const remarks = prompt(

        "Enter remarks"

    );

    if (remarks === null) return;

    selectedUser.notes = remarks;

    selectedUser.status = "Pending";

    saveUsers();

    addActivity(

        "Requested Changes",

        selectedUser.username

    );

    refreshPage();

    viewUser(selectedUser.id);

    showNotification(

        "Changes requested",

        "warning"

    );

}

/*=========================================================
                SAVE NOTES
=========================================================*/

function saveNotes() {

    if (!selectedUser) return;

    selectedUser.notes =

        document.getElementById("adminNotes").value;

    saveUsers();

}

/*=========================================================
                VERIFICATION HISTORY
=========================================================*/

function loadVerificationHistory() {

    const historyContainer =

        document.getElementById(

            "verificationHistory"

        );

    if (!historyContainer) return;

    historyContainer.innerHTML = "";

    const logs =

        Storage.load(

            COLLECTIONS.ACTIVITY_LOGS

        ) || [];

    const history = logs.filter(log =>

        log.target === selectedUser.username

    );

    if (history.length === 0) {

        historyContainer.innerHTML =

            "<p>No verification history available.</p>";

        return;

    }

    history.forEach(log => {

        const item =

            document.createElement("div");

        item.className =

            "history-item";

        item.innerHTML = `

            <div class="history-icon">

                <i class="ri-history-line"></i>

            </div>

            <div class="history-content">

                <h4>${log.action}</h4>

                <p>${log.admin}</p>

                <span>

                    ${log.date}

                    ${log.time}

                </span>

            </div>

        `;

        historyContainer.appendChild(item);

    });

}
/*=========================================================
                SEARCH USERS
=========================================================*/

function searchUsers() {

    const keyword =

        searchInput.value

        .trim()

        .toLowerCase();

    filteredUsers = users.filter(user => {

        return (

            user.username.toLowerCase().includes(keyword) ||

            user.email.toLowerCase().includes(keyword) ||

            user.phone.toLowerCase().includes(keyword) ||

            user.country.toLowerCase().includes(keyword) ||

            user.game.toLowerCase().includes(keyword)

        );

    });

    applyFilters(false);

}

/*=========================================================
                APPLY FILTERS
=========================================================*/

function applyFilters(resetPage = true) {

    let data = [...users];

    const keyword =

        searchInput.value

        .trim()

        .toLowerCase();

    const status = statusFilter.value;

    const role = roleFilter.value;

    const country = countryFilter.value;

    data = data.filter(user => {

        const matchSearch =

            user.username.toLowerCase().includes(keyword) ||

            user.email.toLowerCase().includes(keyword) ||

            user.phone.toLowerCase().includes(keyword) ||

            user.game.toLowerCase().includes(keyword);

        const matchStatus =

            status === "All" ||

            user.status === status;

        const matchRole =

            role === "All" ||

            user.role === role;

        const matchCountry =

            country === "All" ||

            user.country === country;

        return (

            matchSearch &&

            matchStatus &&

            matchRole &&

            matchCountry

        );

    });

    filteredUsers = data;

    if (resetPage)

        currentPage = 1;

    renderUsers();

}

/*=========================================================
                RESET FILTERS
=========================================================*/

function resetFilters() {

    searchInput.value = "";

    statusFilter.value = "All";

    roleFilter.value = "All";

    countryFilter.value = "All";

    filteredUsers = [...users];

    currentPage = 1;

    renderUsers();

}

/*=========================================================
                BULK APPROVE
=========================================================*/

function bulkApprove() {

    const selected =

        getSelectedUsers();

    if (selected.length === 0) {

        alert("Select at least one user.");

        return;

    }

    selected.forEach(id => {

        const user = users.find(

            u => u.id === id

        );

        if (user) {

            user.status = "Approved";

            user.verified = true;

            addActivity(

                "Approved User",

                user.username

            );

        }

    });

    saveUsers();

    refreshPage();

    showNotification(

        selected.length +

        " users approved",

        "success"

    );

}

/*=========================================================
                BULK REJECT
=========================================================*/

function bulkReject() {

    const selected =

        getSelectedUsers();

    if (selected.length === 0) {

        alert("Select at least one user.");

        return;

    }

    selected.forEach(id => {

        const user = users.find(

            u => u.id === id

        );

        if (user) {

            user.status = "Rejected";

            user.verified = false;

            addActivity(

                "Rejected User",

                user.username

            );

        }

    });

    saveUsers();

    refreshPage();

    showNotification(

        selected.length +

        " users rejected",

        "error"

    );

}

/*=========================================================
                SELECT ALL
=========================================================*/

function initializeSelectAll() {

    const selectAll =

        document.getElementById("selectAll");

    if (!selectAll) return;

    selectAll.addEventListener(

        "change",

        function () {

            toggleSelectAll(

                this.checked

            );

        }

    );

}
/*=========================================================
                ACTIVITY LOG
=========================================================*/

function addActivity(action, username) {

    let logs = Storage.load(COLLECTIONS.ACTIVITY_LOGS) || [];

    logs.unshift({

        id: Date.now(),

        action: action,

        target: username,

        admin: "Super Admin",

        module: "User Verification",

        date: new Date().toLocaleDateString(),

        time: new Date().toLocaleTimeString()

    });

    Storage.save(COLLECTIONS.ACTIVITY_LOGS, logs);

}

/*=========================================================
                TOAST NOTIFICATION
=========================================================*/

function showNotification(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `

        <i class="ri-information-line"></i>

        <span>${message}</span>

    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}

/*=========================================================
                EXPORT CSV
=========================================================*/

function exportUsers() {

    const headers = [

        "Username",

        "Email",

        "Phone",

        "Country",

        "Role",

        "Game",

        "Status"

    ];

    const rows = users.map(user => [

        user.username,

        user.email,

        user.phone,

        user.country,

        user.role,

        user.game,

        user.status

    ]);

    let csv = headers.join(",") + "\n";

    rows.forEach(row => {

        csv += row.join(",") + "\n";

    });

    const blob = new Blob(

        [csv],

        {

            type: "text/csv"

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "users.csv";

    link.click();

}

/*=========================================================
                IMPORT CSV
=========================================================*/

function importUsers(file) {

    const reader = new FileReader();

    reader.onload = function(event){

        console.log(

            event.target.result

        );

        showNotification(

            "CSV Imported",

            "success"

        );

    };

    reader.readAsText(file);

}

/*=========================================================
                EVENT LISTENERS
=========================================================*/

function initializeEvents() {

    searchInput.addEventListener(

        "input",

        searchUsers

    );

    statusFilter.addEventListener(

        "change",

        applyFilters

    );

    roleFilter.addEventListener(

        "change",

        applyFilters

    );

    countryFilter.addEventListener(

        "change",

        applyFilters

    );

    document

        .getElementById("resetFilters")

        .addEventListener(

            "click",

            resetFilters

        );

    document

        .getElementById("prevPage")

        .addEventListener(

            "click",

            previousPage

        );

    document

        .getElementById("nextPage")

        .addEventListener(

            "click",

            nextPage

        );

    document

        .getElementById("bulkApprove")

        .addEventListener(

            "click",

            bulkApprove

        );

    document

        .getElementById("bulkReject")

        .addEventListener(

            "click",

            bulkReject

        );

    document

        .getElementById("requestChanges")

        .addEventListener(

            "click",

            requestChanges

        );

    document

        .getElementById("adminNotes")

        .addEventListener(

            "keyup",

            saveNotes

        );

    initializeSelectAll();

}

/*=========================================================
                STORAGE SYNC
=========================================================*/

window.addEventListener(

    "storage",

    refreshPage

);

/*=========================================================
                PAGE READY
=========================================================*/

window.addEventListener(

    "focus",

    refreshPage

);

/*=========================================================
                MODULE LOADED
=========================================================*/

console.log(

    "%cGameVerse User Verification Ready",

    "color:#7C3AED;font-size:18px;font-weight:bold;"

);