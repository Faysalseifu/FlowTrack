# DailyFlow: Routine & Productivity Tracker 📈✨

DailyFlow is a sleek, offline-first React Native mobile app designed to boost your daily productivity. Track routines, manage tasks, jot notes, visualize progress, and get gentle reminders – all powered by an intelligent AI assistant.

### ✨ Key Features
- Daily Routine Tracker  
  Build and follow custom schedules (e.g., wake-up, workouts, deep work blocks) with timelines and completion tracking.

- Task Management  
  Powerful todo lists with priorities, due dates, categories, and customizable reminders via push notifications.

- Notes & Journaling  
  Quick, searchable notes for ideas, reflections, or meeting summaries.

- Progress Visualization  
  Interactive charts (pie charts for time allocation, bar graphs for completion rates, streak calendars) to see your productivity trends over days/weeks.

Here are some example UI inspirations for dashboards and visualizations:<grok:render card_id="4e0f27,c7555f,d98563" card_type="image_card_group" type="render_card"></grok:render>

- Prayer Time Reminders 🕌  
  Optional feature: Fetch accurate prayer timings based on location (via Aladhan API) and set notifications – perfect if faith is part of your balanced routine.

- AI-Powered Chatbot (Gemini-integrated) 🤖  
  Your personal productivity coach! Chat for advice like:
  - "Optimize my schedule for more focus time"
  - "What's pending today?"
  - "Suggest ways to build better habits"

Example chatbot interfaces:<grok:render card_id="4c25d9,23f47d" card_type="image_card_group" type="render_card"></grok:render>

### 🛠 Tech Stack
- React Native + TypeScript (Expo for rapid development)
- Zustand for state management
- AsyncStorage for local persistence
- NativeWind (Tailwind CSS) for beautiful, responsive UI
- Expo Notifications & Location
- Google Gemini API for smart AI assistance
- Aladhan API (optional prayer feature)
- React Native Charts for data viz

### 📱 Screenshots
*(Add your own here as you build – aim for clean, green-accented designs!)*

### 🚀 Getting Started
`bash
git clone https://github.com/your-username/DailyFlow.git
cd DailyFlow
npm install
npx expo start