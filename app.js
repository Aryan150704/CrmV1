let leads = JSON.parse(localStorage.getItem("leads")) || [];

function saveData() {
    localStorage.setItem("leads", JSON.stringify(leads));
}

function addLead() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let status = document.getElementById("status").value;

    if (!name || !email || !phone) {
        alert("Please fill all fields");
        return;
    }

    leads.push({ name, email, phone, status });
    saveData();
    displayLeads();
}

function displayLeads(filteredList = leads) {
    let table = document.getElementById("lead-table");
    table.innerHTML = "";

    filteredList.forEach((lead, index) => {
        table.innerHTML += `
            <tr>
                <td>${lead.name}</td>
                <td>${lead.email}</td>
                <td>${lead.phone}</td>
                <td>${lead.status}</td>
                <td>
                    <button class="action-btn" onclick="editLead(${index})">Edit</button>
                    <button class="action-btn" onclick="deleteLead(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function deleteLead(index) {
    leads.splice(index, 1);
    saveData();
    displayLeads();
}

function editLead(index) {
    let newName = prompt("Enter new name:", leads[index].name);
    let newStatus = prompt("Enter new status (New/Contacted/Follow-up):", leads[index].status);

    if (newName && newStatus) {
        leads[index].name = newName;
        leads[index].status = newStatus;
        saveData();
        displayLeads();
    }
}

function searchLeads() {
    let searchText = document.getElementById("search").value.toLowerCase();

    let filtered = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchText)
    );

    displayLeads(filtered);
}

function filterStatus() {
    let status = document.getElementById("filter").value;

    if (status === "All") {
        displayLeads();
    } else {
        let filtered = leads.filter(lead => lead.status === status);
        displayLeads(filtered);
    }
}

// show data on page load
displayLeads();
