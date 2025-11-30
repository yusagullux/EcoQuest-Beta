// ============================================
// ECOQUESTI POOD – PÕHILOOGIKA
// ============================================

import { requireAuth } from "./auth-guard.js";
import { logOut, getUserProfile, updateUserProfile } from "./auth.js";

// ============================================
// TAIMEANDMED
// ============================================

const PLANTS = [
    // Levinud taimed
    {
        id: "plant_1",
        name: "Sunflower",
        image: "../images/plants/sunflower.png",
        rarity: "common",
        price: 50
    },
    {
        id: "plant_2",
        name: "Basil",
        image: "../images/plants/basil.png",
        rarity: "common",
        price: 40
    },
    {
        id: "plant_3",
        name: "Mint",
        image: "../images/plants/mint.png",
        rarity: "common",
        price: 45
    },
    {
        id: "plant_4",
        name: "Lavender",
        image: "../images/plants/lavender.png",
        rarity: "common",
        price: 55
    },
    // Haruldased taimed
    {
        id: "plant_5",
        name: "Rose",
        image: "../images/plants/rose.png",
        rarity: "rare",
        price: 150
    },
    {
        id: "plant_6",
        name: "Tulip",
        image: "../images/plants/tulip.png",
        rarity: "rare",
        price: 120
    },
    {
        id: "plant_7",
        name: "Orchid",
        image: "../images/plants/orchid.png",
        rarity: "rare",
        price: 180
    },
    {
        id: "plant_8",
        name: "Jasmine",
        image: "../images/plants/jasmine.png",
        rarity: "rare",
        price: 160
    },
    // Eepilised taimed
    {
        id: "plant_9",
        name: "Bamboo",
        image: "../images/plants/bamboo.png",
        rarity: "epic",
        price: 350
    },
    {
        id: "plant_10",
        name: "Bonsai",
        image: "../images/plants/bonsai.png",
        rarity: "epic",
        price: 400
    },
    {
        id: "plant_11",
        name: "Lotus",
        image: "../images/plants/lotus.png",
        rarity: "epic",
        price: 380
    },
    {
        id: "plant_12",
        name: "Cherry Blossom",
        image: "../images/plants/cherry_blossom.png",
        rarity: "epic",
        price: 420
    },
    // Legendaarseid taimed
    {
        id: "plant_13",
        name: "Golden Tree",
        image: "../images/plants/goldentree.png",
        rarity: "legendary",
        price: 800
    },
    {
        id: "plant_14",
        name: "Dragon Fruit",
        image: "../images/plants/dragonfruit.png",
        rarity: "legendary",
        price: 1000
    }
];

// ============================================
// OLEKUHALDUS
// ============================================

const TOAST_DISPLAY_DURATION = 3000;
const SELL_PRICE_MULTIPLIER = 0.8;
const DEFAULT_FILTER = "all";

let currentUser = null;
let userEcoPoints = 0;
let userCollection = [];
let currentFilter = DEFAULT_FILTER;

// ============================================
// KASUTAJALIIDESE FUNKTSIOONID
// ============================================

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

function showLoadingState(isLoading) {
    const loadingMessage = document.querySelector(".loading-message");
    if (loadingMessage) {
        loadingMessage.textContent = isLoading ? "Loading..." : "";
        loadingMessage.style.display = isLoading ? "block" : "none";
    }
}

function updateEcoPointsDisplay(ecoPointsAmount) {
    const ecoPointsElement = document.getElementById("ecopointsValue");
    if (ecoPointsElement) {
        ecoPointsElement.textContent = ecoPointsAmount.toLocaleString();
    }
}

function renderPlants(plantsToRender) {
    const plantsGridElement = document.getElementById("plantsGrid");
    if (!plantsGridElement) return;

    plantsGridElement.innerHTML = "";

    if (plantsToRender.length === 0) {
        plantsGridElement.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-xl);">
                <p>No plants found in this category.</p>
            </div>
        `;
        return;
    }

    plantsToRender.forEach(plant => {
        const plantCardElement = createPlantCard(plant);
        plantsGridElement.appendChild(plantCardElement);
    });
}

function createPlantCard(plantData) {
    const cardElement = document.createElement("div");
    cardElement.className = `plant-card ${plantData.rarity}`;

    const canAffordPlant = userEcoPoints >= plantData.price;
    const ownedCount = userCollection.filter(ownedPlant => ownedPlant.id === plantData.id).length;

    const placeholderImageUrl = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23f5f5f5%22/%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22Arial%22 font-size=%2214%22%3E🌱%3C/text%3E%3C/svg%3E';
    
    cardElement.innerHTML = `
        <div class="rarity-badge ${plantData.rarity}">${plantData.rarity}</div>
        <div class="plant-image-container">
            <img src="${plantData.image}" alt="${plantData.name}" class="plant-image" 
                 onerror="this.onerror=null; this.src='${placeholderImageUrl}';" />
        </div>
        <div class="plant-info">
            <h3 class="plant-name">${plantData.name}</h3>
            <div class="plant-price">
                <span class="plant-price-icon">🌿</span>
                <span>${plantData.price}</span>
            </div>
            ${ownedCount > 0 ? `<p style="font-size: 12px; color: var(--color-primary); margin: 0;">Owned: ${ownedCount}</p>` : ''}
            <button class="buy-button" 
                    data-plant-id="${plantData.id}" 
                    ${!canAffordPlant ? 'disabled' : ''}>
                ${!canAffordPlant ? 'Not Enough EcoPoints' : 'Buy'}
            </button>
        </div>
    `;

    const buyButtonElement = cardElement.querySelector(".buy-button");
    if (buyButtonElement && canAffordPlant) {
        buyButtonElement.addEventListener("click", () => handleBuyPlant(plantData));
    }

    return cardElement;
}

function filterPlants(selectedRarity) {
    currentFilter = selectedRarity;
    
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(button => {
        button.classList.remove("active");
        if (button.dataset.rarity === selectedRarity) {
            button.classList.add("active");
        }
    });

    const filteredPlantsList = selectedRarity === DEFAULT_FILTER 
        ? PLANTS 
        : PLANTS.filter(plant => plant.rarity === selectedRarity);

    renderPlants(filteredPlantsList);
}

// ============================================
// ÄRILOOGIKA
// ============================================

async function loadUserData() {
    showLoadingState(true);
    
    try {
        const profileResult = await getUserProfile(currentUser.uid);
        if (!profileResult.success) {
            throw new Error(profileResult.error || "Failed to load user profile");
        }

        const profile = profileResult.data;
        userEcoPoints = profile.ecoPoints || 0;
        userCollection = profile.plants || [];

        updateEcoPointsDisplay(userEcoPoints);
        filterPlants(currentFilter);
    } catch (error) {
        console.error("Error loading user data:", error);
        showToast("Error loading your data. Please refresh the page.", "error");
    } finally {
        showLoadingState(false);
    }
}

async function handleBuyPlant(plantData) {
    if (userEcoPoints < plantData.price) {
        showToast("Not enough EcoPoints!", "error");
        return;
    }

    try {
        const updatedEcoPoints = userEcoPoints - plantData.price;
        const purchaseTimestamp = new Date().toISOString();
        
        const newPlantEntry = {
            id: plantData.id,
            name: plantData.name,
            rarity: plantData.rarity,
            image: plantData.image,
            price: plantData.price,
            purchasedAt: purchaseTimestamp
        };
        
        const updatedCollection = [...userCollection, newPlantEntry];

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
        filterPlants(currentFilter);

        showToast(`Successfully purchased ${plantData.name}! 🌱`, "success");

    } catch (error) {
        console.error("Error buying plant:", error);
        showToast("Error purchasing plant. Please try again.", "error");
    }
}


function initializeShop() {
    // Filtri nupud
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            filterPlants(btn.dataset.rarity);
        });
    });

    // Väljalogimine
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

    // Mobiilse menüü lüliti
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

    // Laadimisolek
    const loadingState = document.getElementById("loadingState");
    if (loadingState) {
        loadingState.style.display = "none";
    }
}

requireAuth().then(async (user) => {
    currentUser = user;
    await loadUserData();
    initializeShop();
}).catch((error) => {
    console.error("Auth error:", error);
    const loadingState = document.getElementById("loadingState");
    const errorState = document.getElementById("errorState");
    if (loadingState) loadingState.style.display = "none";
    if (errorState) errorState.style.display = "block";
});

