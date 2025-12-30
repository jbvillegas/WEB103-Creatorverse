# WEB103 Prework - *Creatorverse*

Submitted by: **Joaquin Baltasar Villegas**

About this web app: **Full-stack minimalistic web application that allows users to manage their favorite content creators from various platforms such as Youtube, Instagram, Twitch, Tiktok, and X. This application supports login with Github OAuth and full CRUD (Create, Read, Update, Delete) operations allowing users to add, view, edit, remove and keep track of creators from their personal collection.**

**This application serves as a digital portfolio for content creators you like to follow closely. Each creator entry includes their name, a link to their main channel/page, a description of their content, and an image of them. The app is connected to a Supabase database for persistent data storage and uses React Router for seamless navigation between pages.**

Time spent: **12** hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [ ] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

* [x] GitHub OAuth authentication for user login
* [x] Search functionality to filter creators by name, description, or URL
* [x] Smooth scroll-snap navigation between homepage and content sections
* [x] Interactive gradient background with animated blobs
* [x] Public/private creator visibility based on user authentication
* [x] Infinite carousel animation for creator cards
* [x] Social media platform icons (YouTube, Twitch, Instagram, Twitter, TikTok)
* [x] Responsive design with custom CSS variables
* [x] Toast notifications for user actions
* [x] Direct links to creator social media platforms from cards

## Video Walkthrough

Here's a walkthrough of implemented required features:

👉🏿<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  Loom
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Challenges encountered while building the app:
- Implementing smooth scroll-snap behavior between sections while maintaining full-page layouts
- Managing authentication state across components with Supabase
- Creating an infinite carousel animation that duplicates creators seamlessly
- Balancing visual aesthetics with performance for the animated gradient background

## License

Copyright [2025] [jbvillegas]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
