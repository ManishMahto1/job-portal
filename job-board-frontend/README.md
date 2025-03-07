# Job Board Frontend

A modern, responsive front-end for a job board application built with **React**, **Tailwind CSS**, and **Framer Motion**. This project provides an intuitive UI for candidates to browse and apply for jobs, and for recruiters to manage job postings and applications.

## Features
- **Job Listings:** Browse paginated job listings with search and filter options.
- **Job Details:** Beautifully designed job detail pages with animations and detailed metadata.
- **Authentication:** User login, registration, and role-based access (candidate/recruiter).
- **Applications:** Candidates can apply with resume uploads or URLs; recruiters can view parsed resume data.
- **Dashboard:** Recruiter dashboard to post jobs and manage applications with status updates.
- **Responsive Design:** Optimized for mobile, tablet, and desktop using Tailwind CSS.
- **Animations:** Smooth transitions and hover effects powered by Framer Motion.

## Tech Stack
- **React**: Core framework for building the UI.
- **React Router**: Client-side routing for navigation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: Animation library for interactive effects.
- **React Toastify**: Notifications for user feedback.
- **Axios**: HTTP client for API requests.

## Project Structure

job-board-frontend/
├── src/
│   ├── assets/              # Static assets (e.g., images)
│   ├── components/          # Reusable UI components (e.g., Navbar, JobCard)
│   ├── context/             # Context API (e.g., AuthContext)
│   ├── hooks/               # Custom hooks (e.g., useAuth, useJobs)
│   ├── pages/               # Page components (e.g., Home, JobDetail)
│   ├── services/            # API service functions (e.g., jobService)
│   ├── utils/               # Utility functions (e.g., toast, validators)
│   ├── App.jsx              # Main app component with routing
│   ├── index.js             # Entry point
│   └── tailwind.css         # Tailwind CSS configuration
├── .env                     # Environment variables (e.g., API URL)
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
└── README.md                # This file


## Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ManishMahto1/job-portal.git
   cd job-board-frontend

2. **Install Dependencies:**
   ```bash
       npm install

3. **Configure Environment: Create a .env file in the root directory:**
   ```bash
       REACT_APP_API_URL=http://localhost:5000

4. **Run the Application:**
   ```bash
       npm start

## Usage
Candidates: Register/login, jobs at /jobs, view details at /jobs/:id, and apply at /apply/:jobId.
Recruiters: Login, post jobs and manage applications at /dashboard.
Ensure the back-end (job-board-backend) is running at http://localhost:5000.

## Dependencies

react, react-dom: Core React libraries.
react-router-dom: Routing.
axios: API requests.
framer-motion: Animations.
react-icons: Icon library.
react-toastify: Notifications.
tailwindcss, postcss, autoprefixer: Styling