document.addEventListener("DOMContentLoaded", () => {

    initSearch();
    initSelectAllCheckbox();
    initResetFilters();
    initTabs();
    makeResponsiveTable();

});

/* ==========================================
   SEARCH TABLE
========================================== */

function initSearch() {

    const searchInput = document.querySelector(".table-search input");

    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {

            const text = row.textContent.toLowerCase();

            row.style.display = text.includes(value)
                ? ""
                : "none";

        });

    });

}

/* ==========================================
   SELECT ALL CHECKBOX
========================================== */

function initSelectAllCheckbox() {

    const masterCheckbox =
        document.querySelector("thead input[type='checkbox']");

    const rowCheckboxes =
        document.querySelectorAll("tbody input[type='checkbox']");

    if (!masterCheckbox) return;

    masterCheckbox.addEventListener("change", function () {

        rowCheckboxes.forEach(box => {

            box.checked = this.checked;

        });

    });

}

/* ==========================================
   RESET FILTERS
========================================== */

function initResetFilters() {

    const buttons =
        document.querySelectorAll(".secondary-btn");

    buttons.forEach(button => {

        if (
            button.textContent.trim().toLowerCase() === "reset"
        ) {

            button.addEventListener("click", () => {

                document
                    .querySelectorAll("select")
                    .forEach(select => {

                        select.selectedIndex = 0;

                    });

                const searchInput =
                    document.querySelector(".table-search input");

                if (searchInput)
                    searchInput.value = "";

                document
                    .querySelectorAll("tbody tr")
                    .forEach(row => {

                        row.style.display = "";

                    });

            });

        }

    });

}

/* ==========================================
   TABS
========================================== */

function initTabs() {

    const tabs = document.querySelectorAll(".tab");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tabs.forEach(t => {

                t.classList.remove("active");

            });

            tab.classList.add("active");

        });

    });

}

/* ==========================================
   ROW SELECTION HIGHLIGHT
========================================== */

document.addEventListener("click", function (e) {

    const row = e.target.closest("tbody tr");

    if (!row) return;

    document.querySelectorAll("tbody tr")
        .forEach(r => {

            r.classList.remove("selected");

        });

    row.classList.add("selected");

});

/* ==========================================
   MOBILE RESPONSIVE TABLE
========================================== */

function makeResponsiveTable() {

    const table = document.querySelector("table");

    if (!table) return;

    const headers = [...table.querySelectorAll("thead th")]
        .map(th => th.textContent.trim());

    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(row => {

        row.querySelectorAll("td").forEach((cell, index) => {

            if (window.innerWidth <= 768) {

                cell.setAttribute(
                    "data-label",
                    headers[index] || ""
                );

            } else {

                cell.removeAttribute("data-label");

            }

        });

    });

}

window.addEventListener("resize", makeResponsiveTable);
const filterBtn =
document.getElementById("filterBtn");

const resetBtn =
document.getElementById("resetBtn");

filterBtn.addEventListener("click", applyFilters);

resetBtn.addEventListener("click", resetFilters);
function applyFilters() {

    const search =
        document.getElementById("globalSearch")
        .value
        .toLowerCase()
        .trim();

    const role =
        document.getElementById("roleFilter").value;

    const plan =
        document.getElementById("planFilter").value;

    const status =
        document.getElementById("statusFilter").value;

    const billing =
        document.getElementById("billingFilter").value;

    const filtered = subscribers.filter(user => {

        const matchesSearch =

            user.name.toLowerCase().includes(search) ||

            user.email.toLowerCase().includes(search) ||

            user.role.toLowerCase().includes(search) ||

            user.plan.toLowerCase().includes(search) ||

            user.status.toLowerCase().includes(search) ||

            user.billing.toLowerCase().includes(search);

        const matchesRole =
            role === "all" ||
            user.role === role;

        const matchesPlan =
            plan === "all" ||
            user.plan === plan;

        const matchesStatus =
            status === "all" ||
            user.status === status;

        const matchesBilling =
            billing === "all" ||
            user.billing === billing;

        return (
            matchesSearch &&
            matchesRole &&
            matchesPlan &&
            matchesStatus &&
            matchesBilling
        );

    });

    renderTable(filtered);
}
function resetFilters(){

    document.getElementById(
        "roleFilter"
    ).value = "all";

    document.getElementById(
        "planFilter"
    ).value = "all";

    document.getElementById(
        "statusFilter"
    ).value = "all";

    document.getElementById(
        "billingFilter"
    ).value = "all";

    const rows =
        document.querySelectorAll(
            "tbody tr:not(#noDataRow)"
        );

    rows.forEach(row => {

        row.style.display = "";

    });

    document.getElementById(
        "noDataRow"
    ).style.display = "none";

}


























const subscribers = [

{
    name: "Rohit Sharma",
    email: "rohit.sharma@email.com",
    role: "User",
    plan: "Premium",
    billing: "Monthly",
    amount: "$29.00",
    status: "Active",
    startDate: "12 May 2024",
    renewal: "12 Jun 2024",
    avatar: "https://i.pravatar.cc/100?img=1"
},

{
    name: "GameX Pro",
    email: "contact@gamex.com",
    role: "Brand",
    plan: "Enterprise",
    billing: "Annual",
    amount: "$499.00",
    status: "Active",
    startDate: "01 Apr 2024",
    renewal: "01 Apr 2025",
    avatar: "https://i.pravatar.cc/100?img=2"
},

{
    name: "Play With Vock",
    email: "gamingvlog@gmail.com",
    role: "Influencer",
    plan: "Premium",
    billing: "Monthly",
    amount: "$29.00",
    status: "Active",
    startDate: "15 May 2024",
    renewal: "15 Jun 2024",
    avatar: "https://i.pravatar.cc/100?img=3"
},

{
    name: "BGMI Esports",
    email: "contact@bgmiesports.com",
    role: "Brand",
    plan: "Premium",
    billing: "Monthly",
    amount: "$29.00",
    status: "Past Due",
    startDate: "10 Apr 2024",
    renewal: "10 May 2024",
    avatar: "https://i.pravatar.cc/100?img=4"
},

{
    name: "Shadow Playz",
    email: "shadowplay@email.com",
    role: "Influencer",
    plan: "Free",
    billing: "-",
    amount: "$0.00",
    status: "Active",
    startDate: "-",
    renewal: "-",
    avatar: "https://i.pravatar.cc/100?img=5"
},

{
    name: "Nexa Cup",
    email: "organiser@nexa.com",
    role: "Tournament Organizer",
    plan: "Premium",
    billing: "Annual",
    amount: "$199.00",
    status: "Active",
    startDate: "20 Mar 2024",
    renewal: "20 Mar 2025",
    avatar: "https://i.pravatar.cc/100?img=6"
},

{
    name: "Red Bull Gaming",
    email: "redbull@email.com",
    role: "Brand",
    plan: "Enterprise",
    billing: "Annual",
    amount: "$499.00",
    status: "Cancelled",
    startDate: "05 Jan 2024",
    renewal: "-",
    avatar: "https://i.pravatar.cc/100?img=7"
},

{
    name: "Neon Gamer",
    email: "neon@email.com",
    role: "Influencer",
    plan: "Premium",
    billing: "Monthly",
    amount: "$29.00",
    status: "Active",
    startDate: "18 May 2024",
    renewal: "18 Jun 2024",
    avatar: "https://i.pravatar.cc/100?img=8"
}

];
function renderTable(data){

    const tbody =
    document.getElementById("subscriberTableBody");

    tbody.innerHTML = "";

    if(data.length === 0){

        tbody.innerHTML = `
            <tr>
                <td colspan="10" class="no-data">
                    No subscription records found.
                </td>
            </tr>
        `;

        return;
    }

    data.forEach(user => {

        let badgeClass = "approved";

        if(user.status === "Past Due")
            badgeClass = "pending";

        if(user.status === "Cancelled")
            badgeClass = "rejected";

        tbody.innerHTML += `
        <tr>

            <td>
                <input type="checkbox">
            </td>

            <td>

                <div class="user-info">

                    <img src="${user.avatar}" alt="">

                    <div>

                        <h4>${user.name}</h4>

                        <span>${user.email}</span>

                    </div>

                </div>

            </td>

            <td>${user.role}</td>

            <td>${user.plan}</td>

            <td>${user.billing}</td>

            <td>${user.amount}</td>

            <td>

                <span class="badge ${badgeClass}">
                    ${user.status}
                </span>

            </td>

            <td>${user.startDate}</td>

            <td>${user.renewal}</td>

            <td>

                <button class="secondary-btn">
                    View
                </button>

            </td>

        </tr>
        `;

    });


}
document.addEventListener("DOMContentLoaded", () => {

    renderTable(subscribers);

});
function searchSubscribers(){

    const searchValue =
    document.querySelector(".table-search input")
    .value
    .toLowerCase();

    const filtered = subscribers.filter(user => {

        return (

            user.name.toLowerCase().includes(searchValue)

            ||

            user.email.toLowerCase().includes(searchValue)

            ||

            user.role.toLowerCase().includes(searchValue)

        );

    });

    renderTable(filtered);

}
document
.querySelector(".table-search input")
.addEventListener("keyup", searchSubscribers);

const globalSearch =
document.getElementById("globalSearch");

globalSearch.addEventListener("input", applyFilters);

function applyFilters() {

    const search =
        document.getElementById("globalSearch")
        .value
        .toLowerCase()
        .trim();

    const role =
        document.getElementById("roleFilter").value;

    const plan =
        document.getElementById("planFilter").value;

    const status =
        document.getElementById("statusFilter").value;

    const billing =
        document.getElementById("billingFilter").value;

    const filtered = subscribers.filter(user => {

        const matchesSearch =

            user.name.toLowerCase().includes(search) ||

            user.email.toLowerCase().includes(search) ||

            user.role.toLowerCase().includes(search) ||

            user.plan.toLowerCase().includes(search) ||

            user.status.toLowerCase().includes(search) ||

            user.billing.toLowerCase().includes(search);

        const matchesRole =
            role === "all" ||
            user.role === role;

        const matchesPlan =
            plan === "all" ||
            user.plan === plan;

        const matchesStatus =
            status === "all" ||
            user.status === status;

        const matchesBilling =
            billing === "all" ||
            user.billing === billing;

        return (
            matchesSearch &&
            matchesRole &&
            matchesPlan &&
            matchesStatus &&
            matchesBilling
        );

    });

    renderTable(filtered);
}

function updateStats(data) {

    const totalSubscribers = data.length;

    const activeSubscriptions =
        data.filter(
            user => user.status === "Active"
        ).length;

    const expiredSubscriptions =
        data.filter(
            user =>
                user.status === "Cancelled" ||
                user.status === "Past Due"
        ).length;

    const pendingPayments =
        data.filter(
            user => user.status === "Past Due"
        ).length;

    let monthlyRevenue = 0;
    let annualRevenue = 0;

    data.forEach(user => {

        const amount =
            parseFloat(
                user.amount.replace("$","")
            );

        if (!isNaN(amount)) {

            if (user.billing === "Monthly") {

                monthlyRevenue += amount;

            }

            if (user.billing === "Annual") {

                annualRevenue += amount;

            }

        }

    });

    document.getElementById(
        "totalSubscribers"
    ).textContent = totalSubscribers;

    document.getElementById(
        "activeSubscriptions"
    ).textContent = activeSubscriptions;

    document.getElementById(
        "expiredSubscriptions"
    ).textContent = expiredSubscriptions;

    document.getElementById(
        "pendingPayments"
    ).textContent = pendingPayments;

    document.getElementById(
        "monthlyRevenue"
    ).textContent =
        "$" +
        monthlyRevenue.toLocaleString();

    document.getElementById(
        "annualRevenue"
    ).textContent =
        "$" +
        annualRevenue.toLocaleString();
}
updateStats(data);
function renderTable(data){

    const tbody =
        document.getElementById(
            "subscriberTableBody"
        );

    tbody.innerHTML = "";

    updateStats(data);

    if(data.length === 0){

        tbody.innerHTML = `
            <tr>
                <td colspan="10" class="no-data">
                    No subscription data found.
                </td>
            </tr>
        `;

        return;
    }

    // rest of rendering code...


    data.forEach(user => {

        let badgeClass = "approved";

        if (user.status === "Past Due")
            badgeClass = "pending";

        if (user.status === "Cancelled")
            badgeClass = "rejected";

        tbody.innerHTML += `
            <tr>

                <td>
                    <input type="checkbox">
                </td>

                <td>
                    <div class="user-info">

                        <img
                            src="${user.avatar}"
                            alt="${user.name}"
                        >

                        <div>
                            <h4>${user.name}</h4>
                            <span>${user.email}</span>
                        </div>

                    </div>
                </td>

                <td>${user.role}</td>

                <td>${user.plan}</td>

                <td>${user.billing}</td>

                <td>${user.amount}</td>

                <td>
                    <span class="badge ${badgeClass}">
                        ${user.status}
                    </span>
                </td>

                <td>${user.startDate}</td>

                <td>${user.renewal}</td>

                <td>
                    <button class="secondary-btn">
                        View
                    </button>
                </td>

            </tr>
        `;
    });
}
