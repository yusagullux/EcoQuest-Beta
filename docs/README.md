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
  - 14 unique plants with rarity tiers (Common, Rare, Epic, Legendary)
  - Personal collection showcase
  - Plant selling system

- **👥 Social Features**
  - Global leaderboard ranked by XP
  - User profiles with statistics
  - Best rank tracking

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

## 🚀 Getting Started

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

## 🗺 Roadmap

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

---

<div align="center">

**Made with ❤️ for a greener planet**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#-ecoquest)

</div>

