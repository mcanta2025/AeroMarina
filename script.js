// ---------- AJOUT ----------
document.getElementById("form-new")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("new-title").value;
  const price = document.getElementById("new-price").value;
  const items = JSON.parse(localStorage.getItem("itemsNew") || "[]");
  items.push({ title, price });
  localStorage.setItem("itemsNew", JSON.stringify(items));
  this.reset();
  displayItems(); // met à jour l'affichage
});

document.getElementById("form-used")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("used-title").value;
  const price = document.getElementById("used-price").value;
  const items = JSON.parse(localStorage.getItem("itemsUsed") || "[]");
  items.push({ title, price });
  localStorage.setItem("itemsUsed", JSON.stringify(items));
  this.reset();
  displayItems(); // met à jour l'affichage
});

// ---------- SUPPRESSION ----------
function deleteItem(type, index) {
  const key = type === 'new' ? "itemsNew" : "itemsUsed";
  const items = JSON.parse(localStorage.getItem(key) || "[]");
  items.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(items));
  displayItems();
}

// ---------- AFFICHAGE ----------
function displayItems() {
  // Neufs
  const listNew = document.getElementById("list-new-admin");
  if (listNew) {
    listNew.innerHTML = "";
    const items = JSON.parse(localStorage.getItem("itemsNew") || "[]");
    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `✈️ ${item.title} - ${item.price}€ 
        <button onclick="deleteItem('new', ${index})">Supprimer</button>`;
      listNew.appendChild(li);
    });
  }

  // Occasions
  const listUsed = document.getElementById("list-used-admin");
  if (listUsed) {
    listUsed.innerHTML = "";
    const items = JSON.parse(localStorage.getItem("itemsUsed") || "[]");
    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `🛥️ ${item.title} - ${item.price}€ 
        <button onclick="deleteItem('used', ${index})">Supprimer</button>`;
      listUsed.appendChild(li);
    });
  }
}

// Lancer l'affichage à l'ouverture
displayItems();
