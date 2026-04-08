# Todo & Habit Tracker (React Native)

A daily task and habit tracking application built with **React Native (Expo)**. This app helps users stay productive by tracking their daily tasks, monitoring habit streaks, and visualizing weekly progress.

---

## 🚀 Features

- **Tasks Management**: 
  - Add, complete, and track daily tasks.
  - **Soft Delete / Cleanup**: Remove completed tasks from your active view without losing statistics using the cleanup feature.
- **Habits Tracking**: Track daily habits (e.g., Reading, Workout) and mark them as completed.
- **Statistics**: 
  - View overall completed tasks and habits.
  - Calculate **Current Streak** and **Best Streak**.
  - Interactive **Weekly Progress** bar chart.
- **Mock Backend**: Uses `json-server` to act as a local database for fetching, adding, and updating tasks/habits.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev) with [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **UI & Styling**: Vector Icons, Linear Gradient, Safe Area Context.
- **Charts**: [`react-native-gifted-charts`](https://git.io/gifted-charts)
- **Backend Mocking**: `json-server`

## 📂 Project Structure

- `app/` - Application routes and screens (using Expo Router).
  - `(tabs)/` - Tab navigation screens (Home, Cleanup, Statistics).
  - `add-task.tsx` - Screen for adding a new task.
- `api/` - Contains logic for interacting with the backend (`task.tsx`, `habbit.tsx`).
- `data/` - Contains the `db.json` file uses by json-server.
- `constants/` - Theme configurations (colors, typography).
- `function/` - Helper logic functions (e.g., calculating streaks, weekly progress).
- `components/` - Reusable UI components.

## 💻 How to Run Locally

### 1. Prerequisites 

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Mock Server

Before starting the Expo app, you need to run the `json-server` to provide data for the app. Open a terminal and run:

```bash
npx json-server data/db.json
```
_Wait until the server runs (Usually on port 3000). Note: If you run it on a real device, you may need to update `API_URL` in `api/task.tsx` and `api/habbit.tsx` to use your computer's local network IP address (e.g., `http://192.168.1.X:3000`)._

### 4. Start the Application

Open a second terminal window/tab and run:

```bash
npx expo start
```

Press `a` to run on an Android emulator, `i` to run on an iOS simulator, or scan the QR code with the Expo Go app on your physical device.


