// Ajout article neuf
document.getElementById("form-new")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("new-title").value;
  const price = document.getElementById("new-price").value;
  const items = JSON.parse(localStorage.getItem("itemsNew") || "[]");
  items.push({ title, price });
  localStorage.setItem("itemsNew", JSON.stringify(items));
  alert("Article ajouté !");
  this.reset();
});

// Ajout occasion
document.getElementById("form-used")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("used-title").value;
  const price = document.getElementById("used-price").value;
  const items = JSON.parse(localStorage.getItem("itemsUsed") || "[]");
  items.push({ title, price });
  localStorage.setItem("itemsUsed", JSON.stringify(items));
  alert("Occasion ajoutée !");
  this.reset();
});

// Affichage articles neufs
const listNew = document.getElementById("list-new");
if (listNew) {
  const items = JSON.parse(localStorage.getItem("itemsNew") || "[]");
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `✈️ ${item.title} - ${item.price}€`;
    listNew.appendChild(li);
  });
}

// Affichage occasions
const listUsed = document.getElementById("list-used");
if (listUsed) {
  const items = JSON.parse(localStorage.getItem("itemsUsed") || "[]");
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `🛥️ ${item.title} - ${item.price}€`;
    listUsed.appendChild(li);
  });
}

