// ============================================
// ECOQUEST PROFILE - MAIN LOGIC
// ============================================

import { requireAuth } from "./auth-guard.js";
import { logOut, getUserProfile, getAllUsers, updateUserProfile } from "./auth.js";

// ============================================
// STATE MANAGEMENT
// ============================================

const DEFAULT_FILTER = "all";
const DEFAULT_LEVEL = 1;
const DEFAULT_XP = 0;

let currentUser = null;
let profileUserId = null;
let userCollection = [];
let currentFilter = DEFAULT_FILTER;
let allUsers = [];

// ============================================
// BADGE SYSTEM (from dashboard)
// ============================================

function getBadgeImageForLevel(level) {
    const badgeImages = {
        1: "../images/ecoquests-badges/cat-badge-removedbg.png",
        2: "../images/ecoquests-badges/fox-badge-removedbg.png",
        3: "../images/ecoquests-badges/rabbit-badge-removedbg.png",
        4: "../images/ecoquests-badges/deer-badge-removedbg.png",
        5: "../images/ecoquests-badges/wolf-badge-removedbg.png",
        6: "../images/ecoquests-badges/bear-badge-removedbg.png",
        7: "../images/ecoquests-badges/eagle-badge-removedbg.png",
        8: "../images/ecoquests-badges/tiger-badge-removedbg.png",
        9: "../images/ecoquests-badges/dragon-badge-removedbg.png"
    };
    return badgeImages[level] || badgeImages[1];
}

function calculateLevel(xp) {
    const LEVEL_MILESTONES = [0, 100, 250, 500, 1000, 2500, 5000, 10000, 50000];
    for (let i = LEVEL_MILESTONES.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_MILESTONES[i]) {
            return i + 1;
        }
    }
    return DEFAULT_LEVEL;
}

// ============================================
// RANKING FUNCTIONS
// ============================================

async function calculateRanking(userId) {
    try {
        const result = await getAllUsers();
        if (!result.success) {
            return { current: null, best: null };
        }

        const users = result.data || [];
        users.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        const userIndex = users.findIndex(u => u.id === userId);
        const currentRank = userIndex >= 0 ? userIndex + 1 : null;
        
        // Get user's best rank from profile or use current rank
        const userProfile = users.find(u => u.id === userId);
        const bestRank = userProfile?.bestRank || currentRank;

        return { 
            current: currentRank, 
            best: bestRank || currentRank 
        };
    } catch (error) {
        console.error("Error calculating ranking:", error);
        return { current: null, best: null };
    }
}

async function updateBestRank(userId, currentRank) {
    try {
        const profileResult = await getUserProfile(userId);
        if (!profileResult.success) return;

        const profile = profileResult.data;
        const bestRank = profile.bestRank || currentRank;

        // Update if current rank is better (lower number = better rank)
        if (currentRank > 0 && (!bestRank || currentRank < bestRank)) {
            await updateUserProfile(userId, { bestRank: currentRank });
        }
    } catch (error) {
        console.error("Error updating best rank:", error);
    }
}

// ============================================
// UI FUNCTIONS
// ============================================

function showError(message) {
    const errorState = document.getElementById("errorState");
    const loadingState = document.getElementById("loadingState");
    const profileContent = document.getElementById("profileContent");

    if (loadingState) loadingState.style.display = "none";
    if (profileContent) profileContent.style.display = "none";
    if (errorState) {
        const errorText = errorState.querySelector("p");
        if (errorText) {
            errorText.textContent = message;
        } else {
            errorState.textContent = message;
        }
        errorState.style.display = "block";
    }
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

    const groupedPlants = groupPlantsByType(plants);
    
    let filteredPlants = groupedPlants;
    if (currentFilter !== DEFAULT_FILTER) {
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
        </div>
    `;

    return card;
}

function filterCollection(rarity) {
    currentFilter = rarity;
    
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.rarity === rarity) {
            btn.classList.add("active");
        }
    });

    let filteredPlants = userCollection;
    if (rarity !== DEFAULT_FILTER) {
        filteredPlants = userCollection.filter(plant => plant.rarity === rarity);
    }

    renderCollection(filteredPlants);
}

// ============================================
// DATA LOADING
// ============================================

async function loadProfileData() {
    try {
        if (!profileUserId) {
            throw new Error("User ID is required");
        }

        const profileResult = await getUserProfile(profileUserId);
        if (!profileResult.success) {
            throw new Error(profileResult.error || "Failed to load profile");
        }

        const profile = profileResult.data;
        const xp = profile.xp || DEFAULT_XP;
        const level = calculateLevel(xp);
        const displayName = profile.displayName || profile.email?.split("@")[0] || "Anonymous";
        const email = profile.email || "Unknown";
        const missionsCompleted = profile.missionsCompleted || 0;
        const allQuestsCompletedCount = profile.allQuestsCompletedCount || 0;
        const allQuestsCompleted = profile.allQuestsCompleted || false;
        userCollection = profile.plants || [];

        // Update UI
        const profileName = document.getElementById("profileName");
        const profileEmail = document.getElementById("profileEmail");
        const profileBadge = document.getElementById("profileBadge");
        const profileLevel = document.getElementById("profileLevel");
        const missionsCompletedEl = document.getElementById("missionsCompleted");
        const totalPlantsEl = document.getElementById("totalPlants");
        const replayModeCard = document.getElementById("replayModeCard");
        const replayModeCount = document.getElementById("replayModeCount");

        if (profileName) profileName.textContent = displayName;
        if (profileEmail) profileEmail.textContent = email;
        if (profileBadge) {
            profileBadge.src = getBadgeImageForLevel(level);
            profileBadge.alt = `Level ${level} Badge`;
        }
        if (profileLevel) profileLevel.textContent = level;
        if (missionsCompletedEl) missionsCompletedEl.textContent = missionsCompleted;
        if (totalPlantsEl) totalPlantsEl.textContent = userCollection.length;
        
        // Show replay mode card if all quests are completed
        if (replayModeCard && replayModeCount) {
            if (allQuestsCompleted && allQuestsCompletedCount > 0) {
                replayModeCard.style.display = "flex";
                replayModeCount.textContent = allQuestsCompletedCount;
            } else {
                replayModeCard.style.display = "none";
            }
        }

        // Calculate and display ranking
        const ranking = await calculateRanking(profileUserId);
        const currentRankEl = document.getElementById("currentRank");
        const bestRankEl = document.getElementById("bestRank");

        if (currentRankEl) {
            currentRankEl.textContent = ranking.current ? `#${ranking.current}` : "-";
        }
        if (bestRankEl) {
            bestRankEl.textContent = ranking.best ? `#${ranking.best}` : "-";
        }

        // Update best rank if needed (only for own profile)
        if (profileUserId === currentUser.uid && ranking.current) {
            await updateBestRank(profileUserId, ranking.current);
        }

        // Render collection
        filterCollection(currentFilter);

        // Show content
        const loadingState = document.getElementById("loadingState");
        const profileContent = document.getElementById("profileContent");
        if (loadingState) loadingState.style.display = "none";
        if (profileContent) profileContent.style.display = "block";

    } catch (error) {
        console.error("Error loading profile data:", error);
        const errorMessage = error.message || "Error loading profile. Please try again later.";
        showError(errorMessage);
    }
}

// ============================================
// INITIALIZATION
// ============================================

function initializeProfile() {
    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            filterCollection(btn.dataset.rarity);
        });
    });

    // Logout buttons (only show if viewing own profile)
    if (profileUserId === currentUser.uid) {
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
    } else {
        // For public profiles, hide logout buttons but keep navigation visible
        const logoutButton = document.getElementById("logoutButton");
        const logoutButtonMobile = document.getElementById("logoutButtonMobile");
        const mobileMenu = document.getElementById("mobileMenu");

        // Hide logout buttons
        if (logoutButton) logoutButton.style.display = "none";
        if (logoutButtonMobile) logoutButtonMobile.style.display = "none";
        
        // Remove logout button from mobile menu
        if (mobileMenu) {
            const logoutLi = mobileMenu.querySelector("li:has(.logout-button-mobile)");
            if (logoutLi) logoutLi.remove();
        }

        // Add back button to header for public profiles
        const header = document.querySelector("header");
        if (header) {
            const nav = header.querySelector("nav");
            if (nav) {
                // Check if back button already exists
                let backButton = nav.querySelector(".back-button");
                if (!backButton) {
                    backButton = document.createElement("button");
                    backButton.className = "back-button";
                    backButton.textContent = "← Back to Leaderboard";
                    backButton.style.cssText = "background: var(--color-primary); color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 500; margin-left: auto; transition: all 0.3s ease;";
                    backButton.addEventListener("click", () => {
                        window.location.href = "leaderboard.html";
                    });
                    backButton.addEventListener("mouseenter", () => {
                        backButton.style.background = "var(--color-accent)";
                    });
                    backButton.addEventListener("mouseleave", () => {
                        backButton.style.background = "var(--color-primary)";
                    });
                    
                    // Insert after logo, before mobile menu toggle
                    const logo = nav.querySelector("img");
                    const mobileToggle = nav.querySelector("#mobileMenuToggle");
                    if (logo && mobileToggle) {
                        nav.insertBefore(backButton, mobileToggle);
                    } else if (logo) {
                        nav.insertBefore(backButton, logo.nextSibling);
                    } else {
                        nav.appendChild(backButton);
                    }
                }
            }
        }
    }
}

// ============================================
// MAIN ENTRY POINT
// ============================================

requireAuth().then(async (user) => {
    currentUser = user;
    
    // Get user ID from URL parameter (for public profiles)
    const urlParams = new URLSearchParams(window.location.search);
    profileUserId = urlParams.get("userId") || user.uid;

    await loadProfileData();
    initializeProfile();
}).catch((error) => {
    console.error("Auth error:", error);
    showError("Authentication error. Please log in.");
});

