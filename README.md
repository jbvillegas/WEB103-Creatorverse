# Creatorverse 
Full-stack web application that allows users to manage their favorite content creators from various platforms such as Youtube, Instagram, Twitch, Tiktok, and X. This application supports login with **Github OAuth** and full **CRUD** (Create, Read, Update, Delete) operations allowing users to add, view, edit, remove and keep track of creators from their personal collection. 
## Description 
This application serves as a digital portfolio for content creators you like to follow closely. Each creator entry includes their name, a link to their main channel/page, a description of their content, and an image of them. 
The app is connected to a Supabase database for persistent data storage and uses React Router for seamless navigation between pages. 
## App Walkthrough

## Features
- **Logical React Component Structure:** Implemented a clean component architecture with reusable components.
- **Display Five+ Content Creators:** Homepage displays at least five content creators.
- **Creator Details:** Each creator item includes *name*, *link to their channel/page*, *short description of their content*.
- **Async/Await API Calls:** Uses async/await pattern with Axios/fetch for database operations.
- **Detail Pages:** Clicking a creator takes user to their dedicated details page.
- **Unique URLs:** Each creator has their own unique URL route.
- **Edit Functionality:** Users can edit creator name, URL, and description.
- **Delete Functionality:** Users can delete creators from the database.
- **Add New Creators:** Form to add new creators with automatic list update.
## Stretch Features
  - **Creative Card Layout:** Display creators in card format instead of a list.
  - **Creator Images:** Show images of each creator on their cards.
## Tech Stack
| Category | Technologies |
|----------|--------------|
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) |
| **Styling** | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![PicoCSS](https://img.shields.io/badge/PicoCSS-5F45BA?style=flat) |
| **Database** | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) |
| **HTTP Client** | `@supabase/supabase-js` |
| **UI Libraries** | ![React Icons](https://img.shields.io/badge/React_Icons-E91E63?style=flat&logo=react&logoColor=white) ![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF6B35?style=flat) |
| **Dev Tools** | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) |
## Getting Started
### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account
### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jbvillegas/WEB103-Creatorverse.git
   cd creatorverse
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Supabase:
   - Create a Supabase account at supabase.com
   - Create a new project named "creatorverse"
   - Create a creators table with columns: **id**, **name**, **url**, **description**, **imageURL**.
   - Disable Row Level Security (for simplicity) and enable Realtime
   - Add extra columns for social media platforms if necessary (e.g: Youtube, Tiktok, X, Twitch, and Instagram).
4. Configure Environment:
   - Create .env file
   - Add your SUPABASE_URL and SUPABASE_KEY to client.js and the .env file
   ```javascript
   import { createClient } from '@supabase/supabase-js';

   const supabaseURL = import.meta.env.VITE_SUPABASE_URL; 
   const API_KEY = import.meta.env.VITE_API_KEY; 

   export const supabase = createClient (supabaseURL, API_KEY);
   ``` 
5. Run the Server:
   ```bash
   npm run dev
   ```
6. Open the Application:
   - Navigate to the localhost in your browser: 
   ```bash
   http://localhost:5173
   ```
## Project Structure
```text
creatorverse/
├── src/
│   ├── assets/                 # Static assets (images, icons, fonts)
│   ├── components/             # Reusable React components
│   │   ├── CreatorCard.jsx     # Card component for each creator 
│   │   ├── Footer.jsx          # Footer component 
│   │   ├── NavBar.jsx          # Navigation bar component 
│   │   └── SearchBar.jsx       # Search functionality component 
│   ├── css/                    # CSS stylesheets
│   │   ├── add-creator.css     # Add creator page styles 
│   │   ├── creator-card.css    # Creator card styles 
│   │   ├── edit-creator.css    # Edit creator page styles 
│   │   ├── footer.css          # Footer styles 
│   │   ├── index.css           # Global styles
│   │   ├── nav-bar.css         # Navigation bar styles
│   │   ├── search-bar.css      # Search bar styles 
│   │   ├── show-creators.css   # Homepage styles 
│   │   └── view-creator.css    # View creator page styles 
│   ├── pages/                  # Page components
│   │   ├── addCreator.jsx      # Add new creator page 
│   │   ├── editCreator.jsx     # Edit creator page 
│   │   ├── showCreators.jsx    # Homepage 
│   │   └── viewCreator.jsx     # View single creator page 
│   ├── App.jsx                 # Main application component with routes
│   ├── client.js               # Supabase client configuration
│   └── main.jsx                # Application entry point
├── .env                        # Environment variables 
├── .gitignore                  # Git ignore file
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package-lock.json           # Dependency lock file
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation
└── vite.config.js              # Vite configuration
```
## API Endpoints
GET: Fetching data from the database:
   ```javascript
  .select('*')
  ```
POST: Adding new records to the database:
```javascript
.insert([...])
```
PUT: Modifies/Updates existing records:
```javascript
.update({...})
```
DELETE: Removes/deletes records:
```javascript
.delete()
```
By using these Supabase JS methods we get rid of the HTML requests and we have a simpler and cleaner API. 
## Challenges & Solutions
## Future Enhancements 
   
