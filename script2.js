const tickets = [

{
    id: "#TKT-1245",
    name: "Rohit Gamer",
    email: "rohit@email.com",
    category: "Account",
    subject: "Unable to login",
    status: "Open",
    priority: "High",
    created: "2026-05-30"
},

{
    id: "#TKT-1244",
    name: "GamerX Pro",
    email: "gamer@email.com",
    category: "Payment",
    subject: "Payment Failed",
    status: "In Progress",
    priority: "Medium",
    created: "2026-05-30"
},

{
    id: "#TKT-1243",
    name: "Tech Blaze",
    email: "tech@email.com",
    category: "Technical",
    subject: "Match Not Starting",
    status: "Open",
    priority: "High",
    created: "2026-05-30"
},

{
    id: "#TKT-1242",
    name: "Aman YT",
    email: "aman@email.com",
    category: "General",
    subject: "How to Join Tournament?",
    status: "In Progress",
    priority: "Low",
    created: "2026-05-29"
},

{
    id: "#TKT-1241",
    name: "Pro Player",
    email: "pro@email.com",
    category: "Account",
    subject: "Change Email Address",
    status: "Resolved",
    priority: "Medium",
    created: "2026-05-29"
},

{
    id: "#TKT-1240",
    name: "BGMI Master",
    email: "bgmi@email.com",
    category: "Tournament",
    subject: "Prize Not Received",
    status: "Closed",
    priority: "High",
    created: "2026-05-28"
}

];
function renderTickets(data){

    const tbody =
    document.getElementById("ticketTableBody");

    tbody.innerHTML = "";

    if(data.length === 0){

        tbody.innerHTML = `
        <tr>
            <td colspan="8" class="no-data">
                No tickets found.
            </td>
        </tr>
        `;

        updateStats([]);

        return;
    }

    data.forEach(ticket => {

        let statusClass = "success";

        if(ticket.status === "In Progress")
            statusClass = "warning";

        if(ticket.status === "Closed")
            statusClass = "info";

        let priorityClass = "info";

        if(ticket.priority === "High")
            priorityClass = "danger";

        if(ticket.priority === "Medium")
            priorityClass = "warning";

        tbody.innerHTML += `

        <tr>

            <td>${ticket.id}</td>

            <td>
                <strong>${ticket.name}</strong><br>
                <small>${ticket.email}</small>
            </td>

            <td>${ticket.category}</td>

            <td>${ticket.subject}</td>

            <td>
                <span class="badge ${statusClass}">
                    ${ticket.status}
                </span>
            </td>

            <td>
                <span class="badge ${priorityClass}">
                    ${ticket.priority}
                </span>
            </td>

            <td>${ticket.created}</td>

            <td>
                <button class="secondary-btn">
                    View
                </button>
            </td>

        </tr>

        `;
    });

    updateStats(data);
}
function applyFilters(){

    const search =
    document.getElementById("ticketSearch")
    .value
    .toLowerCase();

    const status =
    document.getElementById("statusFilter")
    .value;

    const category =
    document.getElementById("categoryFilter")
    .value;

    const date =
    document.getElementById("dateFilter")
    .value;

    const filtered = tickets.filter(ticket => {

        const searchMatch =

            ticket.id.toLowerCase().includes(search)

            ||

            ticket.name.toLowerCase().includes(search)

            ||

            ticket.email.toLowerCase().includes(search)

            ||

            ticket.subject.toLowerCase().includes(search);

        const statusMatch =
            status === "All Status"
            || ticket.status === status;

        const categoryMatch =
            category === "All Categories"
            || ticket.category === category;

        const dateMatch =
            !date
            || ticket.created === date;

        return (
            searchMatch &&
            statusMatch &&
            categoryMatch &&
            dateMatch
        );

    });

    renderTickets(filtered);
}
function resetFilters(){

    document.getElementById("ticketSearch").value = "";

    document.getElementById("statusFilter").selectedIndex = 0;

    document.getElementById("categoryFilter").selectedIndex = 0;

    document.getElementById("dateFilter").value = "";

    renderTickets(tickets);
}
document.addEventListener("DOMContentLoaded", () => {

    renderTickets(tickets);

    document
        .getElementById("ticketSearch")
        .addEventListener("input", applyFilters);

    document
        .getElementById("statusFilter")
        .addEventListener("change", applyFilters);

    document
        .getElementById("categoryFilter")
        .addEventListener("change", applyFilters);

    document
        .getElementById("dateFilter")
        .addEventListener("change", applyFilters);

    document
        .getElementById("resetBtn")
        .addEventListener("click", resetFilters);

});