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
   
