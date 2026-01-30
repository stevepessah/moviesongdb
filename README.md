# 🎬 Movie Song Database

A comprehensive React Native application that helps you search and discover songs from movies. Built with Expo for cross-platform support (iOS, Android, and Web).

## 📱 Features

- **🔍 Song Search**: Search for songs by title or artist name with real-time filtering
- **🎬 Movie Information**: View detailed information about which movies feature each song, including scene descriptions and timestamps
- **🎮 Quiz Mode**: Test your knowledge by guessing which movie features a given song (feature available in code)
- **🌐 Cross-Platform**: Works seamlessly on iOS, Android, and Web
- **📊 Analytics**: Integrated Google Analytics 4 for usage tracking
- **🎨 Modern UI**: Dark theme with a clean, intuitive interface

## 🛠️ Tech Stack

- **React Native** (0.73.6) - Cross-platform mobile framework
- **Expo** (^50.0.0) - Development platform and tooling
- **React Navigation** - Navigation library for React Native
- **Fuse.js** - Fuzzy search library for better search results
- **TypeScript** - Type safety and better developer experience
- **Google Analytics 4** - Usage analytics and tracking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- For iOS development: **Xcode** (macOS only)
- For Android development: **Android Studio**

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/soundtrack-scout-cleaned.git
cd soundtrack-scout-cleaned
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

This will open the Expo DevTools. You can then:
- Press `i` to open in iOS simulator
- Press `a` to open in Android emulator
- Scan the QR code with Expo Go app on your device
- Press `w` to open in web browser

## 📜 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run the app on Android
- `npm run ios` - Run the app on iOS
- `npm run build` - Build the web version for production
- `npm run deploy` - Build and deploy to Vercel

## 📁 Project Structure

```
soundtrack-scout-cleaned/
├── android/              # Android native code
├── ios/                  # iOS native code
├── screens/              # Screen components
│   ├── HomeScreen.js     # Main search screen
│   ├── QuizScreen.js     # Quiz game screen
│   └── ResultsScreen.js  # Song results screen
├── navigation/           # Navigation configuration
├── components/           # Reusable components
├── data/                 # Data files (songs.json)
├── utils/                # Utility functions (analytics)
├── modules/              # Custom modules
├── App.js                # Root component
└── package.json          # Dependencies and scripts
```

## 🎯 Usage

1. **Search for Songs**: 
   - Enter a song title or artist name in the search bar
   - Results appear in real-time as you type
   - Click on any result to see movie details

2. **View Movie Details**:
   - After selecting a song, view all movies that feature it
   - See scene descriptions and timestamps for each appearance

3. **Quiz Mode** (when enabled):
   - Test your knowledge of movie soundtracks
   - Guess which movie features a given song
   - Track your score as you play

## 🌐 Web Deployment

The app is configured for deployment to Vercel. To deploy:

```bash
npm run deploy
```

Or manually:
```bash
npm run build
vercel --prod
```

## 📝 Data Management

Song data is stored in `data/songs.json`. The structure includes:
- Song title and artist
- Movies featuring the song
- Scene descriptions
- Timestamps

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📧 Feedback

Have feedback or suggestions? Click the "Feedback" button in the app or contact [stevepessah@gmail.com](mailto:stevepessah@gmail.com).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons from [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
- Navigation powered by [React Navigation](https://reactnavigation.org/)

---

Made with ❤️ for movie and music lovers everywhere
