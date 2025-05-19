// ============ AJOUT ============
document.addEventListener("DOMContentLoaded", () => {
  displayItems();

  const formNew = document.getElementById("form-new");
  const formUsed = document.getElementById("form-used");

  if (formNew) {
    formNew.addEventListener("submit", function (e) {
      e.preventDefault();
      const title = document.getElementById("new-title").value.trim();
      const price = document.getElementById("new-price").value;
      if (!title || !price) return;

      const items = JSON.parse(localStorage.getItem("itemsNew") || "[]");
      items.push({ title, price });
      localStorage.setItem("itemsNew", JSON.stringify(items));
      formNew.reset();
      displayItems();
    });
  }

  if (formUsed) {
    formUsed.addEventListener("submit", function (e) {
      e.preventDefault();
      const title = document.getElementById("used-title").value.trim();
      const price = document.getElementById("used-price").value;
      if (!title || !price) return;

      const items = JSON.parse(localStorage.getItem("itemsUsed") || "[]");
      items.push({ title, price });
      localStorage.setItem("itemsUsed", JSON.stringify(items));
      formUsed.reset();
      displayItems();
    });
  }
});

// ============ SUPPRESSION ============
function deleteItem(type, index) {
  const key = type === "new" ? "itemsNew" : "itemsUsed";
  const items = JSON.parse(localStorage.getItem(key) || "[]");
  items.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(items));
  displayItems();
}

// ============ AFFICHAGE ============
function displayItems() {
  const newList = document.getElementById("list-new-admin");
  const usedList = document.getElementById("list-used-admin");

  // Nettoyer les listes
  if (newList) newList.innerHTML = "";
  if (usedList) usedList.innerHTML = "";

  // Affichage articles neufs
  const itemsNew = JSON.parse(localStorage.getItem("itemsNew") || "[]");
  itemsNew.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `✈️ ${item.title} - ${item.price}€ 
      <button onclick="deleteItem('new', ${index})">Supprimer</button>`;
    newList.appendChild(li);
  });

  // Affichage occasions
  const itemsUsed = JSON.parse(localStorage.getItem("itemsUsed") || "[]");
  itemsUsed.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `🛥️ ${item.title} - ${item.price}€ 
      <button onclick="deleteItem('used', ${index})">Supprimer</button>`;
    usedList.appendChild(li);
  });
}
