// -------- Ajout --------
document.getElementById("form-new")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("new-title").value;
  const price = document.getElementById("new-price").value;
  const items = JSON.parse(localStorage.getItem("itemsNew") || "[]");
  items.push({ title, price });
  localStorage.setItem("itemsNew", JSON.stringify(items));
  this.reset();
  displayItems();
});

document.getElementById("form-used")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("used-title").value;
  const price = document.getElementById("used-price").value;
  const items = JSON.parse(localStorage.getItem("itemsUsed") || "[]");
  items.push({ title, price });
  localStorage.setItem("itemsUsed", JSON.stringify(items));
  this.reset();
  displayItems();
});

// -------- Suppression --------
function deleteItem(type, index) {
  const key = type === 'new' ? "itemsNew" : "itemsUsed";
  const items = JSON.parse(localStorage.getItem(key) || "[]");
  items.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(items));
  displayItems();
}

// -------- Affichage --------
function displayItems() {
  const newList = document.getElementById("list-new-admin");
  const usedList = document.getElementById("list-used-admin");

  if (newList) {
    newList.innerHTML = "";
    const itemsNew = JSON.parse(localStorage.getItem("itemsNew") || "[]");
    itemsNew.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.title} - ${item.price}€ <button onclick="deleteItem('new', ${index})">Supprimer</button>`;
      newList.appendChild(li);
    });
  }

  if (usedList) {
    usedList.innerHTML = "";
    const itemsUsed = JSON.parse(localStorage.getItem("itemsUsed") || "[]");
    itemsUsed.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.title} - ${item.price}€ <button onclick="deleteItem('used', ${index})">Supprimer</button>`;
      usedList.appendChild(li);
    });
  }
}

document.addEventListener("DOMContentLoaded", displayItems);
