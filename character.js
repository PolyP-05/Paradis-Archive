const searchInput = document.getElementById("searchInput");
const characterList = document.getElementById("characterList");
const characters = Array.from(characterList.children);

// SORT DROPDOWN
const sortDropdown = document.getElementById("sortDropdown");
const sortLabel = document.getElementById("sortLabel");
const sortOptions = document.getElementById("sortOptions");
let currentSort = "az"; // default

sortDropdown.addEventListener("click", () => {
    toggleDropdown(sortOptions);
});

sortOptions.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
        currentSort = option.dataset.value; // az or za
        sortLabel.textContent = option.textContent;
        sortOptions.style.display = "none";
        updateList();
    });
});

// GROUP DROPDOWN
const groupDropdown = document.getElementById("groupDropdown");
const groupLabel = document.getElementById("groupLabel");
const groupOptions = document.getElementById("groupOptions");
let currentGroup = "all";

groupDropdown.addEventListener("click", () => {
    toggleDropdown(groupOptions);
});

groupOptions.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
        currentGroup = option.dataset.value;
        groupLabel.textContent = option.textContent;
        groupOptions.style.display = "none";
        updateList();
    });
});

// Shared dropdown toggle
function toggleDropdown(menu) {
    const isOpen = menu.style.display === "flex";
    document.querySelectorAll(".dropdown-options").forEach(opt => (opt.style.display = "none"));
    menu.style.display = isOpen ? "none" : "flex";
}

// Main filtering and sorting
function updateList() {
    const searchValue = searchInput.value.toLowerCase();

    // ✅ Filtering supports multiple groups (e.g. "titan warrior")
    let filtered = characters.filter(char => {
        const matchesSearch = char.textContent.toLowerCase().includes(searchValue);

        const charGroups = char.dataset.group?.toLowerCase().split(/\s+/) || [];
        const matchesGroup = currentGroup === "all" || charGroups.includes(currentGroup);

        return matchesSearch && matchesGroup;
    });

    // ✅ Sorting (only by name A–Z or Z–A)
    filtered.sort((a, b) => {
        const nameA =
            a.querySelector(".character-name")?.textContent.toLowerCase() ||
            a.textContent.toLowerCase();
        const nameB =
            b.querySelector(".character-name")?.textContent.toLowerCase() ||
            b.textContent.toLowerCase();

        if (currentSort === "az") return nameA.localeCompare(nameB);
        if (currentSort === "za") return nameB.localeCompare(nameA);
        return 0;
    });

    // ✅ Render results
    characterList.innerHTML = "";
    filtered.forEach(c => characterList.appendChild(c));
}

// Live search update
searchInput.addEventListener("input", updateList);

// Close dropdowns when clicking outside
document.addEventListener("click", e => {
    if (!sortDropdown.contains(e.target) && !groupDropdown.contains(e.target)) {
        document.querySelectorAll(".dropdown-options").forEach(opt => (opt.style.display = "none"));
    }
});
