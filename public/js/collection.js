
import { requireAuth } from "./auth-guard.js";
import { logOut, getUserProfile, updateUserProfile } from "./auth.js";

// ============================================
// STATE MANAGEMENT
// ============================================

const TOAST_DISPLAY_DURATION = 3000;
const SELL_PRICE_MULTIPLIER = 0.8;
const MINIMUM_PLANTS_TO_SELL = 2;
const DEFAULT_FILTER = "all";

let currentUser = null;
let userEcoPoints = 0;
let userCollection = [];
let currentFilter = DEFAULT_FILTER;


function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, TOAST_DISPLAY_DURATION);
}

function updateEcoPointsDisplay(ecoPointsAmount) {
    const ecoPointsElement = document.getElementById("ecopointsValue");
    if (ecoPointsElement) {
        ecoPointsElement.textContent = ecoPointsAmount.toLocaleString();
    }
}

function updateCollectionStats() {
    const totalPlants = userCollection.length;

    const totalPlantsEl = document.getElementById("totalPlants");

    if (totalPlantsEl) totalPlantsEl.textContent = totalPlants;
}

function groupPlantsByType(plants) {
    const grouped = {};
    plants.forEach(plant => {
        if (!grouped[plant.id]) {
            grouped[plant.id] = {
                ...plant,
                count: 0,
                instances: []
            };
        }
        grouped[plant.id].count++;
        grouped[plant.id].instances.push(plant);
    });
    return Object.values(grouped);
}

function renderCollection(plants) {
    const plantsGrid = document.getElementById("plantsGrid");
    const emptyCollection = document.getElementById("emptyCollection");
    
    if (!plantsGrid) return;

    // Show empty state if no plants
    if (plants.length === 0) {
        plantsGrid.innerHTML = "";
        if (emptyCollection) {
            emptyCollection.style.display = "block";
        }
        return;
    }

    if (emptyCollection) {
        emptyCollection.style.display = "none";
    }

    // Group plants by type
    const groupedPlants = groupPlantsByType(plants);
    
    // Filter by rarity if needed
    let filteredPlants = groupedPlants;
    if (currentFilter !== "all") {
        filteredPlants = groupedPlants.filter(plant => plant.rarity === currentFilter);
    }

    plantsGrid.innerHTML = "";

    if (filteredPlants.length === 0) {
        plantsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-xl);">
                <p>No plants found in this category.</p>
            </div>
        `;
        return;
    }

    filteredPlants.forEach(plantGroup => {
        const plantCard = createCollectionCard(plantGroup);
        plantsGrid.appendChild(plantCard);
    });
}

function createCollectionCard(plantGroup) {
    const card = document.createElement("div");
    card.className = `plant-card ${plantGroup.rarity} collection-card`;

    const canSell = plantGroup.count >= MINIMUM_PLANTS_TO_SELL;
    const sellPrice = Math.floor(plantGroup.price * SELL_PRICE_MULTIPLIER);

    card.innerHTML = `
        <div class="rarity-badge ${plantGroup.rarity}">${plantGroup.rarity}</div>
        <div class="plant-image-container">
            <img src="${plantGroup.image}" alt="${plantGroup.name}" class="plant-image" 
                 onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23f5f5f5%22/%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22Arial%22 font-size=%2214%22%3E🌱%3C/text%3E%3C/svg%3E';" />
            ${plantGroup.count > 1 ? `<div class="count-badge">x${plantGroup.count}</div>` : ''}
        </div>
        <div class="plant-info">
            <h3 class="plant-name">${plantGroup.name}</h3>
            <div class="plant-count-info">
                <span>Owned: <strong>${plantGroup.count}</strong></span>
            </div>
            ${canSell ? `
                <div class="sell-info">
                    <span class="sell-price">Sell for: 🌿${sellPrice}</span>
                </div>
                <button class="sell-button" data-plant-id="${plantGroup.id}">
                    Sell One
                </button>
            ` : `
                <div class="no-sell-info">
                    <span>Keep this one!</span>
                </div>
            `}
        </div>
    `;

    // Add sell button event
    if (canSell) {
        const sellButton = card.querySelector(".sell-button");
        if (sellButton) {
            sellButton.addEventListener("click", () => handleSellPlant(plantGroup, sellPrice));
        }
    }

    return card;
}

function filterCollection(selectedRarity) {
    currentFilter = selectedRarity;
    
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(button => {
        button.classList.remove("active");
        if (button.dataset.rarity === selectedRarity) {
            button.classList.add("active");
        }
    });

    const filteredPlantsList = selectedRarity === DEFAULT_FILTER 
        ? userCollection 
        : userCollection.filter(plant => plant.rarity === selectedRarity);

    renderCollection(filteredPlantsList);
}

// ============================================
// BUSINESS LOGIC
// ============================================

async function loadUserData() {
    const loadingMessage = document.querySelector(".loading-message");
    if (loadingMessage) {
        loadingMessage.textContent = "Loading your collection...";
        loadingMessage.style.display = "block";
    }
    
    try {
        const profileResult = await getUserProfile(currentUser.uid);
        if (!profileResult.success) {
            throw new Error(profileResult.error || "Failed to load user profile");
        }

        const profile = profileResult.data;
        userEcoPoints = profile.ecoPoints || 0;
        userCollection = profile.plants || [];

        updateEcoPointsDisplay(userEcoPoints);
        updateCollectionStats();
        filterCollection(currentFilter);
    } catch (error) {
        console.error("Error loading user data:", error);
        showToast("Error loading your collection. Please refresh the page.", "error");
    } finally {
        if (loadingMessage) {
            loadingMessage.style.display = "none";
        }
    }
}

async function handleSellPlant(plantGroupData, sellPriceAmount) {
    if (plantGroupData.count < MINIMUM_PLANTS_TO_SELL) {
        showToast("You can only sell duplicate plants!", "error");
        return;
    }

    try {
        const plantIndexToRemove = userCollection.findIndex(plant => plant.id === plantGroupData.id);
        if (plantIndexToRemove === -1) {
            throw new Error("Plant not found in collection");
        }

        const updatedCollection = [...userCollection];
        updatedCollection.splice(plantIndexToRemove, 1);

        const updatedEcoPoints = userEcoPoints + sellPriceAmount;

        const updateResult = await updateUserProfile(currentUser.uid, {
            ecoPoints: updatedEcoPoints,
            plants: updatedCollection
        });

        if (!updateResult.success) {
            throw new Error(updateResult.error || "Failed to update profile");
        }

        userEcoPoints = updatedEcoPoints;
        userCollection = updatedCollection;

        updateEcoPointsDisplay(userEcoPoints);
        updateCollectionStats();
        filterCollection(currentFilter);

        showToast(`Sold ${plantGroupData.name} for ${sellPriceAmount} EcoPoints! 🌿`, "success");

    } catch (error) {
        console.error("Error selling plant:", error);
        showToast("Error selling plant. Please try again.", "error");
    }
}

// ============================================
// INITIALIZATION
// ============================================

function initializeCollection() {
    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            filterCollection(btn.dataset.rarity);
        });
    });

    // Logout buttons
    const logoutButton = document.getElementById("logoutButton");
    const logoutButtonMobile = document.getElementById("logoutButtonMobile");

    if (logoutButton) {
        logoutButton.addEventListener("click", async () => {
            const result = await logOut();
            if (result.success) {
                window.location.href = "login.html";
            }
        });
    }

    if (logoutButtonMobile) {
        logoutButtonMobile.addEventListener("click", async () => {
            const result = await logOut();
            if (result.success) {
                window.location.href = "login.html";
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener("click", () => {
            const isActive = mobileMenu.classList.contains("active");
            mobileMenu.classList.toggle("active");
            mobileMenuToggle.classList.toggle("active");
            mobileMenuToggle.setAttribute("aria-expanded", !isActive);
            
            if (!isActive) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        const menuLinks = mobileMenu.querySelectorAll("a");
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                mobileMenuToggle.classList.remove("active");
                mobileMenuToggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            });
        });
    }

    // Hide loading state
    const loadingState = document.getElementById("loadingState");
    if (loadingState) {
        loadingState.style.display = "none";
    }
}

// ============================================
// MAIN ENTRY POINT
// ============================================

requireAuth().then(async (user) => {
    currentUser = user;
    await loadUserData();
    initializeCollection();
}).catch((error) => {
    console.error("Auth error:", error);
    const loadingState = document.getElementById("loadingState");
    const errorState = document.getElementById("errorState");
    if (loadingState) loadingState.style.display = "none";
    if (errorState) errorState.style.display = "block";
});

