// ========== GAME CONFIG ========== //
const levels = [
    { name: "Shapes", items: ["circle", "square", "triangle", "star"] },
    { name: "Animals", items: ["dog", "cat", "bird", "fish"] },
    { name: "Vehicles", items: ["car", "bus", "bike", "truck"] },
    // Add more levels...
];

let currentLevel = 0;
let matchedPairs = 0;
let draggedCard = null;

// ========== INITIALIZE GAME ========== //
function initGame() {
    matchedPairs = 0;
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = '';
    const levelData = levels[currentLevel];
    document.getElementById("level").textContent = `Level ${currentLevel + 1}: ${levelData.name}`;

    // Create draggable cards and drop zones
    levelData.items.forEach((item, index) => {
        // Draggable Card (Front)
        const card = document.createElement("div");
        card.className = "card";
        card.draggable = true;
        card.dataset.item = item;
        card.innerHTML = `<div class="item ${item}"></div>`;
        card.addEventListener("dragstart", dragStart);
        gameBoard.appendChild(card);

        // Drop Zone (Back - Gray)
        const dropZone = document.createElement("div");
        dropZone.className = "drop-zone";
        dropZone.dataset.item = item;
        dropZone.innerHTML = `<div class="item gray ${item}"></div>`;
        dropZone.addEventListener("dragover", dragOver);
        dropZone.addEventListener("drop", drop);
        gameBoard.appendChild(dropZone);
    });
}

// ========== DRAG & DROP FUNCTIONS ========== //
function dragStart(e) {
    draggedCard = e.target;
    e.dataTransfer.setData("text/plain", e.target.dataset.item);
    setTimeout(() => e.target.classList.add("dragging"), 0);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const dropZone = e.target.closest(".drop-zone");
    const draggedItem = e.dataTransfer.getData("text/plain");

    if (dropZone.dataset.item === draggedItem && draggedCard) {
        // Move card to drop zone
        dropZone.appendChild(draggedCard);
        draggedCard.classList.remove("dragging");
        draggedCard.draggable = false; // Disable dragging after placement
        matchedPairs++;

        // Check level completion
        if (matchedPairs === levels[currentLevel].items.length) {
            setTimeout(showCongrats, 500);
        }
    }
}

// ========== LEVEL COMPLETION ========== //
function showCongrats() {
    document.getElementById("congrats-popup").style.display = "flex";
}

function nextLevel() {
    currentLevel++;
    if (currentLevel >= levels.length) {
        alert("🎉 You completed all levels! 🎉");
        currentLevel = 0;
    }
    document.getElementById("congrats-popup").style.display = "none";
    initGame();
}

// ========== START GAME ========== //
document.getElementById("next-level-btn").addEventListener("click", nextLevel);
initGame();