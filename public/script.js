

const confessionsPerPage = 5;
let confessions = [];
let currentPage = 1;
let filteredConfessions = [];
const MAX_PER_FILE = 1000;
let errors = []; // Collect all feedback messages

//add the confessions.json file here 
const files = [
  "data/confessions.json",
];

async function loadConfessions() {
  const startTime = performance.now();
  try {
    confessions = await loadAllConfessionFiles();
    const endTime = performance.now();
    console.log(`Loaded ${confessions.length} confessions in ${(endTime - startTime).toFixed(2)} ms`);

    checkDataIssues(confessions);
    filteredConfessions = filterTodayConfessions(confessions);

    renderConfessions();
    updatePagination();
    updatePostCount();

    if (errors.length > 0) showModal(errors.join("<br><br>"));
  } catch (error) {
    console.error("Error loading confessions:", error);
    document.getElementById("confession-list").innerHTML =
      '<p style="text-align:center;color:#00cc66">Could not load confessions.</p>';
  }
}

async function loadAllConfessionFiles() {
  let allData = [];
  errors = []; // reset before each load

  for (let i = 0; i < files.length; i++) {
    try {
      const res = await fetch(files[i]);
      if (!res.ok) {
        errors.push(`File not found: <b>${files[i]}</b>`);
        continue;
      }

      const data = await res.json();
      allData = allData.concat(data);

      // errors.push(`<b>${files[i]}</b>: ${data.length} items loaded`);

      // Check if file is full (1k limit)
      if (data.length >= MAX_PER_FILE) {
        const nextFileNum = i + 2;
        errors.push(
          `<b>${files[i]}</b> has reached <b>${data.length}</b> confessions.<br>` +
          `Please create <b>confessions${nextFileNum}.json</b> for new entries.`
        );
      }
    } catch (err) {
      errors.push(`Error loading <b>${files[i]}</b>: ${err.message}`);
    }
  }

  return allData;
}

async function countAllConfessions() {
  let total = 0;
  let duplicates = new Set();
  let seenIds = new Set();

  for (let i = 0; i < files.length; i++) {
    try {
      const res = await fetch(files[i]);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      total += data.length;

      data.forEach((conf) => {
        if (seenIds.has(conf.id)) duplicates.add(conf.id);
        else seenIds.add(conf.id);
      });

      console.log(`${files[i]}: ${data.length} confessions`);
    } catch {
      console.log(`${files[i]} not found, stopping scan.`);
      break;
    }
  }

  showModal(
    `Total confessions: <b>${total}</b><br>` +
    `Duplicate IDs: ${duplicates.size > 0 ? Array.from(duplicates).join(", ") : "None"}`
  );
}

function updatePostCount() {
  document.getElementById("post-count").textContent = `Total confessions: ${confessions.length}`;
}

function filterTodayConfessions(allConfessions) {
  const today = new Date().toISOString().split("T")[0];
  return allConfessions.filter((conf) => (conf.date || "").startsWith(today));
}

function renderConfessions() {
  const list = document.getElementById("confession-list");
  list.innerHTML = "";

  const start = (currentPage - 1) * confessionsPerPage;
  const end = start + confessionsPerPage;
  const pageItems = filteredConfessions.slice(start, end);

  if (pageItems.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#00cc66">No confessions found</p>`;
    return;
  }

  pageItems.forEach((conf) => {
    const div = document.createElement("div");
    div.classList.add("confession");
    div.innerHTML = `
      <p>${escapeHtml(conf.content)}</p>
      <small>${escapeHtml(conf.id)} | ${escapeHtml(conf.date)} | ${escapeHtml(conf.author || "anonymous")}</small>
      ${conf.tags ? `<small>${conf.tags.map((t) => escapeHtml(t)).join(", ")}</small>` : ""}
    `;
    list.appendChild(div);
  });
}

function updatePagination() {
  const totalPages = Math.max(1, Math.ceil(filteredConfessions.length / confessionsPerPage));
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled = currentPage === totalPages;
}

document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderConfessions();
    updatePagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  const totalPages = Math.ceil(filteredConfessions.length / confessionsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderConfessions();
    updatePagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

document.getElementById("search-input").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();

  if (!q) {
    filteredConfessions = filterTodayConfessions(confessions);
  } else {
    filteredConfessions = confessions.filter((conf) => {
      const content = (conf.content || "").toLowerCase();
      const author = (conf.author || "").toLowerCase();
      const tags = (conf.tags || []).join(" ").toLowerCase();
      const date = (conf.date || "").toLowerCase();

      // Check if query matches 
      return (
        content.includes(q) ||
        author.includes(q) ||
        tags.includes(q) ||
        date.includes(q)
      );
    });
  }

  currentPage = 1;
  renderConfessions();
  updatePagination();
});

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function showModal(message) {
  const modal = document.getElementById("modal");
  const msg = document.getElementById("modal-message");
  msg.innerHTML = message;
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function checkDataIssues(confessions) {
  let warnings = [];
  const ids = new Set();
  let hasDuplicate = false;

  for (const conf of confessions) {
    if (ids.has(conf.id)) {
      hasDuplicate = true;
      break;
    }
    ids.add(conf.id);
  }

  if (hasDuplicate) {
    warnings.push("There are duplicate ID's detected. Please check and fix your data.");
  }

  if (warnings.length > 0) errors.push(...warnings);
}

// Add confession manually (contributor use)
window.addConfession = function (newConfession) {
  if (confessions.some((c) => c.id === newConfession.id)) {
    showModal(`Duplicate ID detected (${newConfession.id}). Please use a unique ID.`);
    return;
  }

  newConfession.date = new Date().toISOString().split("T")[0];
  confessions.push(newConfession);
  filteredConfessions = filterTodayConfessions(confessions);
  updatePostCount();
  renderConfessions();
  updatePagination();
};


loadConfessions();
