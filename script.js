// ============ AJOUT ============
document.addEventListener("DOMContentLoaded", () => {
  displayItems();

  const formNew = document.getElementById("form-new");
  const formUsed = document.getElementById("form-used");

 if (formNew) {
  formNew.addEventListener("submit", function (e) {
    e.preventDefault();
    const type = document.getElementById("new-type").value;
    const title = document.getElementById("new-title").value.trim();
    const price = document.getElementById("new-price").value;

    if (!type || !title || !price) return;

    const storageKey = type === "avion" ? "itemsAvionsNew" : "itemsBateauxNew";
    const items = JSON.parse(localStorage.getItem(storageKey) || "[]");
    items.push({ title, price });
    localStorage.setItem(storageKey, JSON.stringify(items));

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
  let key;
  if (type === 'avion') key = "itemsAvionsNew";
  else if (type === 'bateau') key = "itemsBateauxNew";
  else key = "itemsUsed";

  const items = JSON.parse(localStorage.getItem(key) || "[]");
  items.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(items));
  displayItems();
}

// ============ AFFICHAGE ============
// Articles neufs (avions + bateaux)
if (newList) {
  newList.innerHTML = "";

  const avions = JSON.parse(localStorage.getItem("itemsAvionsNew") || "[]");
  const bateaux = JSON.parse(localStorage.getItem("itemsBateauxNew") || "[]");

  avions.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `✈️ ${item.title} - ${item.price}€ 
      <button onclick="deleteItem('avion', ${index})">Supprimer</button>`;
    newList.appendChild(li);
  });

  bateaux.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `🛥️ ${item.title} - ${item.price}€ 
      <button onclick="deleteItem('bateau', ${index})">Supprimer</button>`;
    newList.appendChild(li);
  });
}

  // Affichage occasions
  const itemsUsed = JSON.parse(localStorage.getItem("itemsUsed") || "[]");
  itemsUsed.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `🛥️ ${item.title} - ${item.price}€ 
      <button onclick="deleteItem('used', ${index})">Supprimer</button>`;
    usedList.appendChild(li);
  });
}
