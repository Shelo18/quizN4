const API_URL = "https://swapi.tech/api/people";
const tableBody = document.getElementById("charactersTableBody");
const searchInput = document.getElementById("searchInput");
const addCharacterForm = document.getElementById("addCharacterForm");
const loadingIndicator = document.getElementById("loadingIndicator");

let characters = [];
let customCharacters = [];

async function fetchCharacters() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    characters = data.results.map((item) => ({
      name: item.name,
      isCustom: false,
    }));
    renderCharacters();
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    loadingIndicator.textContent = "Failed to load characters";
  } finally {
    loadingIndicator.style.display = "none";
  }
}

function renderCharacters(filter = "") {
  const allCharacters = [...characters, ...customCharacters];
  const filtered = allCharacters.filter((char) =>
    char.name.toLowerCase().includes(filter.toLowerCase())
  );

  tableBody.innerHTML = "";

  filtered.forEach((char) => {
    const tr = document.createElement("tr");
    if (char.isCustom) {
      tr.classList.add("custom-character");
    }
    const td = document.createElement("td");
    td.textContent = char.name;
    tr.appendChild(td);
    tableBody.appendChild(tr);
  });
}

searchInput.addEventListener("input", () => {
  renderCharacters(searchInput.value);
});

addCharacterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("characterName");
  const name = nameInput.value.trim();
  if (name) {
    customCharacters.push({ name, isCustom: true });
    renderCharacters(searchInput.value);
    addCharacterForm.reset();
  }
});

fetchCharacters();
