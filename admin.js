let fleetData = [];
let container = document.getElementById("fleetContainer").
document.getElementById("addFleet").addEventListener("click", addFleet);

function addFleet(){
    let reg = document.getElementById("reg").value.trim();
    let cat = document.getElementById("category").value;
    let driver = document.getElementById("driver").value.trim();
    let avail = document.getElementById("availability").value;

    if(!red || !cat || !driver || !avail){
        alert("All fields are required");
        return;
    }
    let newFleet = {
        id: Date.now(),
        red, cat, driver, avail,
    };
    fleetData.push(newFleet);
    clearForm();
    renderFleet(fleetData);
}
function clearForm(){
    document.getElementById("reg").value="";
    document.getElementById("category").value="";
    document.getElementById("driver").value="";
    document.getElementById("availability").value="Available";
}
function renderFleet(data){
    container.innerHTML = "";

    data.forEach(item => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <h4>${item.reg}</h4>
        <p><b>Category:</b> ${item.cat}</p>
        <p><b>driver:</b> ${item.driver}</p>
        <p><b>Status:</b> ${item.avail}</p>

        <button onClick="updateDriver(${item.id})"}>Update Driver</button>
        <button onClick="changeAvailability(${item.id})"}>Change Availability</button>
        <button onClick="dataFleet(${item.id})"}>Delete Vehicle</button>
    `;
    container.appendChild(card);
});
}
function updateDriver(id){
    let newDriver = prompt("Enter new driver name:");

    if(!newDriver || newDriver.trim()===""){
        alert("Driver name cannot be empty");
        return;
    }
    fleetData = fleetData.map(item => 
        item.id === id ? { ...item, driver: newDriver.trim()} : item
    );
    renderFleet(applyFilters());
}
function changeAvailability(id){
    fleetData = fleetData.map(item =>
        item.id === id ? {...item, avail: item.avail==="Available" ? "unavailable":"Available"}
        :item
    );
    renderFleet(applyFilters());
}
function deleteFleet(id){
    let ok = confirm("Are you sure you want to delete this vehicle?");
    if(!ok) return;

    fleetData = fleetData.filter(item => item.id !==id);
    renderFleet(applyFilters());
}
document.getElementById("filterCategory").addEventListener("change", ()=>{
    renderFleet(applyFilters());
});
document.getElementById("filterAvailability").addEventListener("change", ()=>{
    renderFleet(applyFilters());
});
document.getElementById("clearFilter").addEventListener("click", ()=>{
    document.getElementById("filtercategory").value="";
    document.getElementById("filterAvailability").value = "";
    renderFleet(fleetData);
});
function applyFilters(){
    let catF = document.getElementById("filterCategory").value;
    let avF = document.getElementById("filterAvailability").value;

    return fleetData.filter(item => {
        let matchCategory = catF === "" || item.cat === catF;
        let matchAvail = avF ==="" || item.avail === avF;
        return matchCategory && matchAvail;
    });
}