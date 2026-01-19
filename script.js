// Demo videos
const videos = [
  { id: "dQw4w9WgXcQ", title: "Demo Video" },
  { id: "9bZkp7q19f0", title: "Music Video" },
  { id: "l482T0yNkeo", title: "Classic Song" }
];

const grid = document.getElementById("videoGrid");
const shortsGrid = document.getElementById("shortsGrid");
const search = document.getElementById("search");

// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

// Render videos
function render(list) {
  const favList = list.filter(v => favorites.includes(v.id));
  const normalList = list.filter(v => !favorites.includes(v.id));

  // Render favorites section
  const favGrid = document.getElementById("favoritesGrid");
  favGrid.innerHTML = "";
  favList.forEach(v => {
    favGrid.innerHTML += `
      <div class="card" onclick="playMini('${v.id}')">
        <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg">
        <p>${v.title}</p>
        <button onclick="toggleFavorite('${v.id}', event)">★</button>
      </div>
    `;
  });

  // Render main grid & shorts
  grid.innerHTML = "";
  shortsGrid.innerHTML = "";
  normalList.forEach(v => {
    const favBtn = `<button onclick="toggleFavorite('${v.id}', event)">☆</button>`;
    grid.innerHTML += `
      <div class="card" onclick="playMini('${v.id}')">
        <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg">
        <p>${v.title}</p>
        ${favBtn}
      </div>
    `;
    shortsGrid.innerHTML += `
      <div class="card" onclick="playMini('${v.id}')">
        <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg">
      </div>
    `;
  });
}

// Search functionality
search.addEventListener("input", () => {
  const q = search.value.toLowerCase();
  render(videos.filter(v => v.title.toLowerCase().includes(q)));
});

// Toggle dark/light theme
function toggleTheme() {
  document.body.classList.toggle("light");
}

// Extract YouTube video ID from URL
function extractId(url) {
  if (!url) return null;
  if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split(/[?&]/)[0];
  if (url.includes("v=")) return url.split("v=")[1].split(/[?&]/)[0];
  if (url.includes("/live/")) return url.split("/live/")[1].split(/[?&]/)[0];
  return null;
}

// Play video from pasted URL
function openFromLink() {
  const id = extractId(document.getElementById("pasteUrl").value);
  if (id) playMini(id);
  else alert("Please paste a valid YouTube link");
}

// Mini player functions
function playMini(id) {
  const mini = document.getElementById("miniPlayer");
  const frame = document.getElementById("miniFrame");
  frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`;
  mini.classList.remove("hidden");
}
function closeMini() {
  document.getElementById("miniFrame").src = "";
  document.getElementById("miniPlayer").classList.add("hidden");
}

// Favorites toggle
function toggleFavorite(id, e) {
  e.stopPropagation();
  if (favorites.includes(id)) favorites = favorites.filter(x => x !== id);
  else favorites.push(id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  render(videos);
}

// Editor sandbox functions
function showEditor() { document.getElementById("editorBox").classList.remove("hidden"); }
function closeEditor() { document.getElementById("editorBox").classList.add("hidden"); }

document.getElementById("runBtn").addEventListener("click", () => {
  const html = document.getElementById("htmlCode").value;
  const css = "<style>" + document.getElementById("cssCode").value + "</style>";
  const js = "<script>" + document.getElementById("jsCode").value + "<\/script>";
  document.getElementById("editorPreview").srcdoc = html + css + js;
});

// Tutorial
document.addEventListener("DOMContentLoaded", () => {
  const tutorial = document.getElementById("tutorial");
  if (!localStorage.getItem("visited")) tutorial.classList.remove("hidden");
  document.getElementById("tutorialBtn").addEventListener("click", () => {
    tutorial.classList.add("hidden");
    localStorage.setItem("visited", "yes");
  });
});

// Initial render
render(videos);
