// ============================================
// HATCHING UTILITY FUNCTIONS - SHARED MODULE
// ============================================

import { getUserProfile, updateUserProfile } from "./auth.js";

// Loomade andmed
const ANIMALS = {
    common: [
        { id: "animal_common_1", name: "Cat", image: "../images/pets/cat.png", rarity: "common" },
        { id: "animal_common_2", name: "Dog", image: "../images/pets/dog.png", rarity: "common" },
        { id: "animal_common_3", name: "Rabbit", image: "../images/pets/rabbit.png", rarity: "common" },
        { id: "animal_common_4", name: "Bee", image: "../images/pets/bee.png", rarity: "common" }
    ],
    rare: [
        { id: "animal_rare_1", name: "Deer", image: "../images/pets/deer.png", rarity: "rare" },
        { id: "animal_rare_2", name: "Owl", image: "../images/pets/owl.png", rarity: "rare" },
        { id: "animal_rare_3", name: "Panda", image: "../images/pets/panda.png", rarity: "rare" },
        { id: "animal_rare_4", name: "Cobra", image: "../images/pets/cobra.png", rarity: "rare" }
    ],
    epic: [
        { id: "animal_epic_1", name: "Wolf", image: "../images/pets/wolf.png", rarity: "epic" },
        { id: "animal_epic_2", name: "Bear", image: "../images/pets/bear.png", rarity: "epic" },
        { id: "animal_epic_3", name: "Eagle", image: "../images/pets/eagle.png", rarity: "epic" },
        { id: "animal_epic_4", name: "Lynx", image: "../images/pets/lynx.png", rarity: "epic" }
    ],
    legendary: [
        { id: "animal_legendary_1", name: "Tiger", image: "../images/pets/tiger.png", rarity: "legendary" },
        { id: "animal_legendary_2", name: "Lion", image: "../images/pets/lion.png", rarity: "legendary" },
        { id: "animal_legendary_3", name: "Phoenix", image: "../images/pets/phoenix.png", rarity: "legendary" },
        { id: "animal_legendary_4", name: "Dragon", image: "../images/pets/dragon.png", rarity: "legendary" }
    ]
};

// Abifunktsioon juhusliku looma saamiseks harulduse järgi
function getRandomAnimal(rarity) {
    const animals = ANIMALS[rarity] || ANIMALS.common;
    return animals[Math.floor(Math.random() * animals.length)];
}

// Abifunktsioon looma emoji saamiseks
function getAnimalEmoji(name) {
    const emojiMap = {
        "Cat": "🐱", "Dog": "🐶", "Rabbit": "🐰", "Bee": "🐝",
        "Deer": "🦌", "Owl": "🦉", "Panda": "🐼", "Cobra": "🐍",
        "Wolf": "🐺", "Bear": "🐻", "Eagle": "🦅", "Lynx": "🐱",
        "Tiger": "🐯", "Lion": "🦁", "Phoenix": "🔥", "Dragon": "🐉"
    };
    return emojiMap[name] || "🐾";
}

// Koorumise animatsiooni näitamine
export async function showHatchingAnimation(animal) {
    return new Promise((resolve) => {
        // Loo modaalne ülekatte koorumise animatsioonile
        const modal = document.createElement("div");
        modal.className = "hatching-modal";
        modal.innerHTML = `
            <div class="hatching-content">
                <div class="egg-crack-animation">
                    <div class="egg-shell">
                        <div class="egg-crack-line crack-1"></div>
                        <div class="egg-crack-line crack-2"></div>
                        <div class="egg-crack-line crack-3"></div>
                    </div>
                </div>
                <div class="animal-reveal" style="display: none;">
                    <img src="${animal.image}" alt="${animal.name}" class="hatched-animal-image"
                         onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'placeholder-animal\\'>${getAnimalEmoji(animal.name)}</div><h2 class=\\'animal-name-reveal\\'>${animal.name}!</h2><div class=\\'rarity-badge ${animal.rarity}\\'>${animal.rarity}</div>';" />
                    <h2 class="animal-name-reveal">${animal.name}!</h2>
                    <div class="rarity-badge ${animal.rarity}">${animal.rarity}</div>
                </div>
                <div class="sparkle sparkle-1"></div>
                <div class="sparkle sparkle-2"></div>
                <div class="sparkle sparkle-3"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Käivita muna pragunemise animatsioon
        setTimeout(() => {
            modal.querySelector(".egg-crack-animation").classList.add("cracking");
        }, 500);
        
        // Paljasta loom pärast pragunemise animatsiooni
        setTimeout(() => {
            modal.querySelector(".egg-crack-animation").style.display = "none";
            const animalReveal = modal.querySelector(".animal-reveal");
            animalReveal.style.display = "block";
            animalReveal.classList.add("revealed");
        }, 2000);
        
        // Sulge modaal pärast paljastamist
        setTimeout(() => {
            modal.classList.add("fade-out");
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
                resolve();
            }, 500);
        }, 4000);
    });
}

// Kontrollib ja töötleb koorumisi
export async function checkAndProcessHatchings(userId) {
    try {
        const profileResult = await getUserProfile(userId);
        if (!profileResult.success) {
            return { hasNewHatchings: false, newAnimals: [] };
        }

        const profile = profileResult.data;
        const userHatchings = profile.hatchings || [];
        const userAnimals = profile.animals || [];
        const now = Date.now();
        const updatedHatchings = [];
        const newAnimals = [];

        for (const hatching of userHatchings) {
            if (hatching.endTime <= now) {
                // Koorumine lõpetatud kooru muna
                const animal = getRandomAnimal(hatching.rarity);
                newAnimals.push({
                    ...animal,
                    hatchedAt: new Date().toISOString(),
                    fromEgg: hatching.eggId
                });
            } else {
                updatedHatchings.push(hatching);
            }
        }

        if (newAnimals.length > 0) {
            const updatedAnimals = [...userAnimals, ...newAnimals];
            await updateUserProfile(userId, {
                hatchings: updatedHatchings,
                animals: updatedAnimals
            });
            
            return { hasNewHatchings: true, newAnimals, updatedHatchings, updatedAnimals };
        } else if (updatedHatchings.length !== userHatchings.length) {
            await updateUserProfile(userId, {
                hatchings: updatedHatchings
            });
        }

        return { hasNewHatchings: false, newAnimals: [] };
    } catch (error) {
        console.error("Error checking hatchings:", error);
        return { hasNewHatchings: false, newAnimals: [] };
    }
}

// Näitab koorumise animatsioonid järjestikku
export async function showHatchingAnimationsSequentially(animals) {
    for (const animal of animals) {
        await showHatchingAnimation(animal);
        // Väike paus animatsioonide vahel
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

