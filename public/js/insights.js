import { requireAuth } from "./auth-guard.js";
import { logOut, getUserProfile } from "./auth.js";

let currentUser = null;
let currentProfileData = null;

function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function renderWeeklyInsights(profile) {
    const container = document.getElementById('insightHighlights');
    if (!container) return;
    const dailyCompletions = profile.dailyQuestCompletions || {};
    const todayKey = getTodayDateString();
    const todayCount = Array.isArray(dailyCompletions[todayKey]) ? dailyCompletions[todayKey].length : 0;
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - (6 * 24 * 60 * 60 * 1000));
    let weeklyTotal = 0;
    Object.entries(dailyCompletions).forEach(([dateKey, quests]) => {
        const date = new Date(dateKey);
        if (date >= sevenDaysAgo && Array.isArray(quests)) {
            weeklyTotal += quests.length;
        }
    });
    const teamMissions = profile.teamStats?.missionsCompleted || 0;
    container.innerHTML = `
        <div class="insight-chip">
            <span>Today's quests</span>
            <strong>${todayCount}/5</strong>
        </div>
        <div class="insight-chip">
            <span>Quests last 7 days</span>
            <strong>${weeklyTotal}</strong>
        </div>
        <div class="insight-chip">
            <span>Team missions cleared</span>
            <strong>${teamMissions}</strong>
        </div>
    `;
}

async function renderInsightCharts(profile) {
    const dailyCompletions = profile.dailyQuestCompletions || {};
    const now = new Date();
    const labels = [];
    const questData = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        const quests = Array.isArray(dailyCompletions[dateKey]) ? dailyCompletions[dateKey].length : 0;
        questData.push(quests);
    }
    
    const questTrendCtx = document.getElementById('questTrendChart');
    if (questTrendCtx && window.Chart) {
        new Chart(questTrendCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Quests Completed',
                    data: questData,
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1 } }
                }
            }
        });
    }

    const completedQuests = profile.completedQuests || [];
    const categoryCounts = {};
    
    try {
        const response = await fetch('../quests.json');
        if (response.ok) {
            const questsData = await response.json();
            const quests = questsData.quests || [];
            quests.forEach(quest => {
                if (completedQuests.includes(quest.id)) {
                    const cat = quest.category || 'Other';
                    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
                }
            });
        }
    } catch (error) {
        console.error("Error loading quests for category chart:", error);
    }
    
    const categoryCtx = document.getElementById('categoryDistributionChart');
    if (categoryCtx && window.Chart && Object.keys(categoryCounts).length > 0) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categoryCounts),
                datasets: [{
                    data: Object.values(categoryCounts),
                    backgroundColor: [
                        '#4caf50', '#2196F3', '#FFC107', '#9C27B0', '#00BCD4', '#8BC34A', '#66BB6A'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    const xpGrowthCtx = document.getElementById('xpGrowthChart');
    if (xpGrowthCtx && window.Chart) {
        const currentXP = profile.xp || 0;
        const currentEco = profile.ecoPoints || 0;
        new Chart(xpGrowthCtx, {
            type: 'bar',
            data: {
                labels: ['XP', 'EcoPoints'],
                datasets: [{
                    label: 'Total',
                    data: [currentXP, currentEco],
                    backgroundColor: ['#4caf50', '#2196F3']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}

requireAuth().then(async (user) => {
    currentUser = user;
    try {
        const profileResult = await getUserProfile(user.uid);
        if (profileResult.success) {
            const profile = profileResult.data;
            currentProfileData = profile;
            renderWeeklyInsights(profile);
            await renderInsightCharts(profile);
        }
    } catch (error) {
        console.error("Error loading insights page:", error);
        alert("Unable to load insights information.");
    }
});

const logoutButton = document.getElementById("logoutButton");
const logoutButtonMobile = document.getElementById("logoutButtonMobile");
if (logoutButton) logoutButton.addEventListener("click", logOut);
if (logoutButtonMobile) logoutButtonMobile.addEventListener("click", logOut);

const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        mobileMenuToggle.classList.toggle("active");
    });
}

