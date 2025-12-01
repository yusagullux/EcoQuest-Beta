# 🌍 EcoQuest

<div align="center">

**Gamified Environmental Sustainability Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

*Making saving the planet fun and interactive through gamification*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

</div>

---

## 📖 About

EcoQuest is a modern, gamified web application designed to raise awareness about environmental sustainability. Users complete eco-friendly missions, track their carbon footprint reduction, earn XP and EcoPoints, unlock badges, collect virtual plants, and compete on global leaderboards. By turning environmental actions into a game, EcoQuest makes sustainability engaging and rewarding.

### 🎯 Mission

Our mission is to inspire millions of people to adopt eco-friendly habits through gamification, making environmental consciousness a daily practice rather than an occasional thought.

---

## ✨ Features

### 🎮 Core Features

- **📋 Daily Missions System**
  - 25+ eco-friendly quests across 7 categories
  - Daily quest reset with countdown timer
  - Progress tracking with visual indicators
  - Replay mode with bonus rewards for completed quests

- **🏆 Gamification System**
  - **XP & Leveling**: 9 levels with unique badges (Cat → Lion)
  - **EcoPoints**: Virtual currency for shop purchases
  - **Badge System**: Unlock badges as you level up
  - **Achievement Tracking**: Master Eco Warrior badge for completing all quests

- **📊 Progress Tracking**
  - Real-time XP and level progress bars
  - Category completion charts (Chart.js)
  - Carbon footprint reduction visualization
  - Quest completion statistics

- **🛒 Plant Shop & Collection**
  - Purchase virtual plants with EcoPoints
  -  Unique plants with rarity tiers (Common, Rare, Epic, Legendary)
  - Personal collection showcase
  - Plant selling system

- **👥 Social Features**
  - Global leaderboard ranked by XP
  - User profiles with statistics
  - Best rank tracking
  - **Team Collaboration System**
    - Create or join teams (up to 8 members)
    - 20+ collaborative team missions
    - Difficulty-based missions (Easy, Medium, Hard)
    - Dynamic rewards based on team size and participation
    - Mission cooldowns and daily limits
    - Team leaderboard and statistics

- **📱 Responsive Design**
  - Mobile-first approach
  - Smooth animations and transitions
  - Accessible UI with ARIA labels

### 🎨 User Experience

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Real-time Updates**: Instant feedback on quest completion
- **Visual Feedback**: Progress bars, charts, and badges
- **Accessibility**: WCAG-compliant design with screen reader support

---

## 🛠 Tech Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS variables, flexbox, and grid
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JavaScript
- **Chart.js** - Data visualization for progress tracking

### Backend & Services
- **Firebase Authentication** - Secure user authentication
- **Cloud Firestore** - Real-time database for user data and progress
- **Firebase Hosting** - Fast, secure hosting
- **Firebase Storage** - Asset storage (optional)

### Development Tools
- **Firebase CLI** - Deployment and configuration
- **Modern Browser APIs** - LocalStorage, Fetch API, etc.

---


### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Firebase account (free tier available)
- Node.js and npm (for Firebase CLI, optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecoquest.git
   cd ecoquest
   ```

2. **Set up Firebase**
   
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config

3. **Configure Firebase**
   
   Edit `public/js/firebase-config.js` with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Deploy Firestore Rules**
   
   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Run Locally**
   
   - Option 1: Open `public/html/landing.html` directly in your browser
   - Option 2: Use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```
     Then navigate to `http://localhost:8000/public/html/landing.html`

6. **Deploy to Firebase Hosting** (Optional)
   ```bash
   firebase login
   firebase init hosting
   firebase deploy
   ```

---

## 📁 Project Structure

```
EcoQuest/
│
├── public/
│   ├── html/              # HTML pages
│   │   ├── landing.html   # Landing page
│   │   ├── login.html     # Login page
│   │   ├── signup.html    # Registration page
│   │   ├── dashboard.html # Main dashboard (missions, progress)
│   │   ├── profile.html   # User profile
│   │   ├── shop.html      # Plant shop
│   │   ├── collection.html # Plant collection
│   │   └── leaderboard.html # Global rankings
│   │
│   ├── css/               # Stylesheets
│   │   ├── dashboard.css  # Dashboard styles
│   │   ├── landing.css    # Landing page styles
│   │   ├── profile.css    # Profile styles
│   │   ├── shop.css       # Shop styles
│   │   └── forms.css      # Form styles
│   │
│   ├── js/                # JavaScript modules
│   │   ├── firebase-config.js # Firebase initialization
│   │   ├── auth.js        # Authentication functions
│   │   ├── auth-guard.js  # Route protection
│   │   ├── profile.js     # Profile management
│   │   ├── shop.js        # Shop functionality
│   │   ├── collection.js  # Collection management
│   │   └── utils.js       # Utility functions
│   │
│   ├── images/            # Assets
│   │   ├── logo.png
│   │   ├── ecoquests-badges/ # Badge images (9 levels)
│   │   └── plants/        # Plant images (14 plants)
│   │
│   ├── quests.json        # Quest definitions
│   └── quests.md          # Quest documentation
│
├── firestore.rules        # Firestore security rules
└── readme.md             # This file
```

---

## 🎮 How It Works

### Quest System

1. **Daily Quests**: Users receive 5 random quests daily
2. **Quest Categories**: 
   - ♻️ Recycling
   - 💡 Energy Saving
   - 🚶 Transportation
   - 💧 Water Saving
   - 🧹 Clean-Up Missions
   - 🌱 Gardening & Nature
   - ♻️ Sustainable Living

3. **Quest Completion**: 
   - Select completed missions
   - Earn XP and EcoPoints
   - Track carbon footprint reduction
   - Unlock achievements

### Leveling System

| Level | XP Required | Badge |
|-------|-------------|-------|
| 1 | 0 XP | 🐱 Cat |
| 2 | 100 XP | 🦊 Fox |
| 3 | 250 XP | 🐰 Rabbit |
| 4 | 500 XP | 🦌 Deer |
| 5 | 1,000 XP | 🐺 Wolf |
| 6 | 2,500 XP | 🐻 Bear |
| 7 | 5,000 XP | 🦅 Eagle |
| 8 | 10,000 XP | 🐯 Tiger |
| 9 | 50,000 XP | 🦁 Lion |

### EcoPoints System

EcoPoints are earned based on:
- XP conversion (varies by level)
- Badge bonuses (+10 per badge)
- Quest completion bonuses
- Replay mode bonuses (up to 50% extra)

---

## 🔒 Security

- **Firebase Authentication**: Secure email/password authentication
- **Firestore Rules**: User data protection
  - Users can only read/write their own data
  - Leaderboard data is read-only for authenticated users
- **Input Validation**: Client-side validation for all forms
- **XSS Protection**: Input sanitization

---

## 📸 Screenshots

> *Screenshots coming soon!*

<!-- Add screenshots here:
- Dashboard view
- Quest completion
- Profile page
- Leaderboard
- Shop
-->

---

## 🧪 Testing

Currently, the application is tested manually. Future improvements include:
- Unit tests for utility functions
- Integration tests for Firebase operations
- E2E tests for user flows

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly
4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Write clear, descriptive commit messages
- Update documentation for new features
- Ensure code follows existing patterns
- Test on multiple browsers

---

## 👥 Team Collaboration System

EcoQuest features a comprehensive team system that allows users to collaborate on larger environmental challenges:

### Team Features
- **Team Creation & Management**
  - Create teams with custom names
  - Join teams via 6-character codes
  - Up to 8 members per team
  - Leader and co-leader roles
  - Team statistics tracking

- **Team Missions**
  - **20+ Mission Types** across 3 difficulty levels:
    - **Easy**: Quick wins (3-4 missions) - 210-280 XP, 120-170 EcoPoints
    - **Medium**: Moderate effort (2 missions) - 300-380 XP, 180-230 EcoPoints  
    - **Hard**: Significant impact (1 mission) - 500-600 XP, 300-360 EcoPoints
  - **Dynamic Rewards**: Rewards scale based on:
    - Team size (up to 15% bonus for full teams)
    - Difficulty level (1.0x to 1.5x multiplier)
    - Participation rate
  - **Mission Categories**: Recycling, Clean-Up, Transportation, Water Saving, Energy, Gardening, Sustainable Living
  - **Cooldown System**: Prevents mission spam with difficulty-based cooldowns
  - **Submission System**: Team members submit progress with reflections
  - **Approval Process**: Leaders review and approve completed missions

### Team Mission Examples
- **Easy**: Recycle 15 bottles, Clean shared area, Power down devices
- **Medium**: Sustainable commute, Water conservation, Local produce challenge
- **Hard**: Energy audit, Community garden, Zero waste week, Tree planting

### Team Limits
- Maximum 5 active missions at once
- Up to 8 missions per day
- Difficulty-based limits (3 Easy, 2 Medium, 1 Hard)
- 30-minute cooldown between submissions

---

## 🗺 Roadmap

- [x] Team collaboration system
- [x] Difficulty-based team missions
- [x] Dynamic reward scaling
- [ ] Dark mode support
- [ ] Social features (friends, challenges)
- [ ] Mobile app (React Native)
- [ ] Offline mode with PWA
- [ ] Admin dashboard
- [ ] More quest categories
- [ ] Seasonal events and special quests
- [ ] Carbon footprint calculator API integration
- [ ] Multi-language support
- [ ] Achievement system expansion
- [ ] Team vs Team competitions

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Yusa**

- GitHub: [@yourusername](https://github.com/yourusername)
- Project Link: [https://github.com/yourusername/ecoquest](https://github.com/yourusername/ecoquest)

---

## 🙏 Acknowledgments

- **Firebase** for providing an excellent backend platform
- **Chart.js** for beautiful data visualizations
- **Open Source Community** for inspiration and tools
- All contributors and users of EcoQuest

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/ecoquest)
![GitHub issues](https://img.shields.io/github/issues/yourusername/ecoquest)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/ecoquest)

**Status**: 🟢 Active Development

**Version**: 1.0.0 - First stable release with team collaboration features

---

## 🎯 First Version Recommendations

### ✅ What's Great About This Version

1. **Complete Core Features**: All essential gamification features are implemented
   - Quest system with verification
   - XP and leveling system
   - Badge progression
   - Plant collection and shop
   - Team collaboration system

2. **Solid Foundation**: Well-structured codebase with:
   - Clean separation of concerns
   - Firebase integration
   - Security rules in place
   - Responsive design

3. **Team System**: Comprehensive collaboration features with:
   - 20+ team missions
   - Dynamic reward scaling
   - Difficulty-based progression

### 🚀 Recommended Next Steps

#### High Priority
1. **Testing & Bug Fixes**
   - Add unit tests for utility functions
   - Test edge cases in quest completion
   - Verify team mission logic thoroughly
   - Test on multiple browsers and devices

2. **Performance Optimization**
   - Implement lazy loading for images
   - Optimize Firestore queries
   - Add caching for quest data
   - Minimize bundle size

3. **User Feedback System**
   - Add in-app feedback form
   - Implement error reporting
   - Track user analytics (privacy-friendly)
   - Monitor team mission completion rates

#### Medium Priority
4. **Enhanced Features**
   - Push notifications for team missions
   - Email reminders for daily quests
   - Quest sharing functionality
   - Achievement badges for milestones

5. **UI/UX Improvements**
   - Dark mode support
   - Improved mobile navigation
   - Better loading states
   - More visual feedback animations

6. **Content Expansion**
   - More quest categories
   - Seasonal events
   - Special challenge weeks
   - Educational content about sustainability

#### Future Considerations
7. **Advanced Features**
   - Social features (friends, challenges)
   - Mobile app (React Native)
   - Offline mode with PWA
   - Carbon footprint calculator API
   - Multi-language support

8. **Monetization (Optional)**
   - Premium features
   - Team subscriptions
   - Sponsored eco-challenges
   - Partnership with eco-friendly brands

### 📝 Code Quality Improvements

1. **Documentation**
   - Add JSDoc comments to all functions
   - Create API documentation
   - Add inline comments for complex logic
   - Update README with more examples

2. **Error Handling**
   - Implement global error boundary
   - Better error messages for users
   - Retry logic for failed requests
   - Offline error handling

3. **Security**
   - Review Firestore security rules
   - Implement rate limiting
   - Add input sanitization
   - Regular security audits

### 🎨 Design Enhancements

1. **Visual Polish**
   - Consistent iconography
   - Better color scheme
   - Improved typography
   - More engaging animations

2. **Accessibility**
   - Screen reader improvements
   - Keyboard navigation
   - High contrast mode
   - ARIA labels everywhere

### 📊 Analytics & Monitoring

1. **Metrics to Track**
   - Daily active users
   - Quest completion rates
   - Team engagement metrics
   - User retention rates
   - Most popular quests

2. **Tools to Consider**
   - Firebase Analytics
   - Error tracking (Sentry)
   - Performance monitoring
   - User feedback tools

---

# EcoQuest - System Schemas

Simple, easy-to-understand schemas for each section of the EcoQuest application.

---

## 🔐 Authentication Flow

```
User → Sign Up/Login → Firebase Auth → User Profile Created → Dashboard
  ↓
Email/Password Validation → Firebase Authentication → Firestore User Document
```

**Files:**
- `public/html/login.html` - Login page
- `public/html/signup.html` - Registration page
- `public/js/auth.js` - Authentication functions
- `public/js/auth-guard.js` - Route protection

---

## 📋 Quest System Flow

```
Daily Reset (24h) → Load 5 Random Quests → User Selects Quests → Start Tracking
  ↓
User Completes Task → Check Verification → Calculate Rewards → Update Profile
  ↓
XP + EcoPoints + Carbon Reduction → Level Up Check → Badge Unlock
```

**Verification Steps:**
1. Check quest start time
2. Verify minimum time passed
3. Check daily limit (5 quests/day)
4. Detect abnormal patterns
5. Calculate rewards

**Files:**
- `public/html/dashboard.html` - Quest display & completion
- `public/quests.json` - Quest definitions
- `public/quests.md` - Quest documentation

---

## 🏆 Gamification System

```
XP Earned → Calculate Level → Check Badge → Update Profile
  ↓
Level 1-9: Cat → Fox → Rabbit → Deer → Wolf → Bear → Eagle → Tiger → Lion
  ↓
EcoPoints = (XP / multiplier) + (Badges × 10) + Bonuses
```

**Level System:**
- 9 levels total
- XP milestones: 0, 100, 250, 500, 1000, 2500, 5000, 10000, 50000
- Each level unlocks a unique badge

**Files:**
- `public/html/dashboard.html` - Level calculation & badge display
- `public/js/profile.js` - Badge system

---

## 🛒 Shop & Collection System

```
User Earns EcoPoints → Browse Shop → Select Plant → Purchase
  ↓
Deduct EcoPoints → Add Plant to Collection → Update Profile
  ↓
Collection Display → Filter by Rarity → View Owned Plants
```

**Plant Rarities:**
- Common (4 plants) - 40-55 EcoPoints
- Rare (4 plants) - 120-180 EcoPoints
- Epic (3 plants) - 300-400 EcoPoints
- Legendary (3 plants) - 500-1000 EcoPoints

**Files:**
- `public/html/shop.html` - Plant shop
- `public/html/collection.html` - Plant collection
- `public/js/shop.js` - Shop functionality
- `public/js/collection.js` - Collection management

---

## 👤 Profile & Leaderboard System

```
User Profile → Load Stats → Calculate Rank → Display Information
  ↓
XP, Level, Missions, CO₂ Reduced, Rank, Best Rank, Plants
```

**Leaderboard:**
- Sorted by XP (descending)
- Shows top users globally
- Updates in real-time

**Files:**
- `public/html/profile.html` - User profile
- `public/html/leaderboard.html` - Global rankings
- `public/js/profile.js` - Profile management

---

## 🌍 Carbon Reduction Tracking

```
Quest Completed → Find Quest in quests.json → Get Carbon Value
  ↓
Sum All Completed Quests → Display Total kg CO₂ Reduced
  ↓
Dashboard: Real-time display
Profile: Total reduction display
```

**Calculation:**
- Each quest has `carbonFootprintReduction` value
- Sum all completed quests' carbon values
- Display in kg CO₂ format

**Files:**
- `public/html/dashboard.html` - Carbon calculation
- `public/js/profile.js` - Carbon calculation
- `public/quests.json` - Carbon values per quest

---

## ✅ Quest Verification System

```
User Checks Quest → Start Time Recorded → User Completes Task
  ↓
Click "Complete" → Verification Checks:
  1. Quest started? (start time exists)
  2. Minimum time passed? (based on quest type)
  3. Daily limit OK? (max 10 quests/day)
  4. Not too fast? (10 min between batches)
  5. Not too many? (max 3 at once)
  ↓
If Valid → Award Rewards → Update Profile
If Invalid → Show Error → Block Completion
```

**Quest Types & Minimum Times:**
- Duration quests: Specified minutes + 2 min buffer
- Count quests: 3 minutes per item
- Boolean quests: 2 hours minimum

**Files:**
- `public/html/dashboard.html` - Verification logic
- `getQuestMinimumTime()` - Time calculation
- `detectAbnormalPattern()` - Pattern detection
- `startQuestTracking()` - Start time tracking

---

## 📊 Data Flow

```
User Action → JavaScript Function → Firebase API → Firestore Database
  ↓
Firestore Update → Real-time Sync → UI Update → User Sees Changes
```

**Data Structure:**
```
users/{userId}
  ├── xp: number
  ├── level: number
  ├── ecoPoints: number
  ├── badges: array
  ├── completedQuests: array
  ├── dailyQuestsCompleted: array
  ├── questStartTimes: object
  ├── questCompletionCount: object
  ├── dailyQuestCompletions: object
  ├── totalCarbonReduced: number (calculated)
  └── plants: array
```

**Files:**
- `public/js/auth.js` - Data operations
- `firestore.rules` - Security rules

---

## 🎯 Quest Categories

```
7 Categories → 25+ Quests Total
  ↓
♻️ Recycling (6 quests)
💡 Energy Saving (7 quests)
🚶 Transportation (3 quests)
💧 Water Saving (2 quests)
🧹 Clean-Up (3 quests)
🌱 Gardening (2 quests)
♻️ Sustainable Living (4 quests)
```

**Category Badges:**
- Complete all quests in a category → Unlock category badge
- Track progress per category
- Visual charts for completion

---

## 🔄 Daily Quest Reset System

```
Last Reset Time → Check 24h Passed → Generate 5 Random Quests
  ↓
Update Profile → Display New Quests → Start Countdown Timer
  ↓
24h Countdown → Auto Reset → Reload Page
```

**Reset Logic:**
- Checks `lastQuestResetTime`
- If 24h passed → Reset
- If no quests → Reset
- Random selection from available quests

---

## 🎁 Reward System

```
Quest Completed → Base XP → Check Completion Count → Apply Bonus
  ↓
XP Calculation:
  - Base XP × Bonus Multiplier (up to 3x)
  - Bonus: 1 + (completionCount × 0.2)
  ↓
EcoPoints Calculation:
  - XP / Level Multiplier + Badge Bonus + Repeat Bonus
  ↓
Carbon Reduction:
  - Sum from quests.json values
```

**Bonus System:**
- First completion: 1x XP
- Repeat 1: 1.2x XP
- Repeat 2: 1.4x XP
- Repeat 3+: Up to 3x XP

---

## 📱 Page Structure

```
Landing → Login/Signup → Dashboard (Main)
  ↓
Dashboard Links:
  ├── Shop → Buy Plants
  ├── Collection → View Plants
  ├── Profile → View Stats
  └── Leaderboard → View Rankings
```

**Navigation:**
- All pages have header with navigation
- Auth guard protects routes
- Mobile-responsive menu

---

## 🔒 Security Flow

```
User Request → Auth Guard Check → Firebase Auth Verify
  ↓
If Authenticated → Allow Access → Load User Data
If Not Authenticated → Redirect to Login
  ↓
Firestore Rules → Verify User ID → Allow/Deny Operation
```

**Security Rules:**
- Users can only read/write their own data
- Leaderboard: Read-only for all authenticated users
- Profile: Read own, write own

---

## 📈 Progress Tracking

```
User Completes Quest → Update Stats → Recalculate Progress
  ↓
XP Progress Bar → Level Progress → Category Charts
  ↓
Carbon Chart → Category Progress List → Badge Unlocks
```

**Visual Elements:**
- Chart.js for category completion
- Chart.js for carbon reduction
- Progress bars for XP and levels
- Category progress cards

---

## 🎮 Replay Mode

```
All 25 Quests Completed → Master Eco Warrior Badge Unlocked
  ↓
Replay Mode Activated → Repeat Quests → Bonus Rewards
  ↓
Completion Count Tracked → Bonus Multiplier Applied
  ↓
Daily Reset Still Works → New Random Quests Daily
```

**Replay Benefits:**
- Up to 3x XP bonus
- Extra EcoPoints
- Track completion count
- Continue earning rewards

---

## 📝 File Organization

```
public/
├── html/          → All page files
├── css/           → Stylesheets per page
├── js/            → JavaScript modules
├── images/        → Assets (badges, plants, logos)
├── quests.json    → Quest data
└── quests.md      → Quest documentation
```

---

## 🔧 Key Functions

**Authentication:**
- `signUp()` - Create account
- `signIn()` - Login
- `logOut()` - Sign out
- `getUserProfile()` - Load user data
- `updateUserProfile()` - Save user data

**Quests:**
- `loadQuests()` - Load from quests.md
- `loadQuestsData()` - Load from quests.json
- `renderQuests()` - Display quests
- `getQuestMinimumTime()` - Calculate min time
- `detectAbnormalPattern()` - Verify completion
- `startQuestTracking()` - Track start time

**Gamification:**
- `calculateLevel()` - Get level from XP
- `calculateEcoPoints()` - Calculate EcoPoints
- `getBadgeImageForLevel()` - Get badge image
- `getBadgeNameForLevel()` - Get badge name

**Carbon:**
- `calculateTotalCarbonReduction()` - Sum carbon values
- `mapCompletedQuestIds()` - Map quest IDs
- `calculateQuestProgress()` - Category progress

---

## 🎯 Simple User Journey

```
1. Sign Up → Create Account
2. Dashboard → See Daily Quests
3. Select Quest → Start Tracking
4. Complete Task → Wait Minimum Time
5. Complete Quest → Earn XP & EcoPoints
6. Level Up → Unlock Badge
7. Shop → Buy Plants with EcoPoints
8. Collection → View Plants
9. Profile → See Stats & Carbon Reduced
10. Leaderboard → Compare with Others
```

---

## 📊 Database Schema

```
users/{userId}
  ├── email: string
  ├── displayName: string
  ├── xp: number
  ├── level: number
  ├── ecoPoints: number
  ├── badges: string[]
  ├── activeBadge: string
  ├── missionsCompleted: number
  ├── completedQuests: string[]
  ├── dailyQuestsCompleted: string[]
  ├── currentDailyQuests: string[]
  ├── lastQuestResetTime: timestamp
  ├── questStartTimes: {questId: timestamp}
  ├── questCompletionCount: {questId: number}
  ├── dailyQuestCompletions: {date: string[]}
  ├── lastQuestCompletionTime: timestamp
  ├── allQuestsCompleted: boolean
  ├── allQuestsCompletedCount: number
  ├── allQuestsCompletedDate: timestamp
  ├── plants: plant[]
  ├── bestRank: number
  └── createdAt: timestamp
```

---

## 🎨 UI Components

**Dashboard:**
- User stats cards (XP, EcoPoints, CO₂)
- Badge showcase
- Daily quests list
- Progress charts
- Category progress list

**Profile:**
- Profile header (badge, name, email)
- Stats grid (rank, level, missions, CO₂)
- Collection section
- Filter buttons

**Shop:**
- Plant grid
- Rarity filters
- Purchase buttons
- EcoPoints display

**Leaderboard:**
- User ranking table
- XP display
- Badge display
- Search/filter

---

## 🔄 State Management

```
Current User → Load Profile → Update UI
  ↓
User Action → Update State → Save to Firestore → Update UI
  ↓
Real-time Sync → Firebase Listener → Auto Update UI
```

**State Variables:**
- `currentUser` - Firebase user object
- `profile` - User profile data
- `quests` - Current daily quests
- `completedQuests` - All completed quest IDs
- `dailyCompleted` - Today's completed quests

---

## ✅ Validation Rules

**Quest Completion:**
- Quest must be started (checkbox checked)
- Minimum time must pass (quest type dependent)
- Daily limit: 10 quests/day
- Batch limit: 10 min between batches
- Too many: Warning if >3 at once

**User Input:**
- Email validation
- Password strength (min 6 chars)
- Display name validation
- Input sanitization

---

## 🎯 Summary

**Main Sections:**
1. **Auth** - Login/Signup/Protection
2. **Quests** - Daily missions with verification
3. **Gamification** - XP, Levels, Badges, EcoPoints
4. **Shop** - Plant purchases
5. **Collection** - Plant showcase
6. **Profile** - User stats & info
7. **Leaderboard** - Global rankings
8. **Carbon Tracking** - CO₂ reduction display

**Key Features:**
- Time-based quest verification
- Carbon footprint tracking
- Gamified progression system
- Virtual plant collection
- Social leaderboard

**Tech:**
- Frontend: HTML/CSS/JS (Vanilla)
- Backend: Firebase (Auth, Firestore)
- Charts: Chart.js



<div align="center">

**Made with ❤️ for a greener planet**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#-ecoquest)

</div>

