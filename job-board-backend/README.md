
---

### `job-board-backend/README.md`

```markdown
# Job Board Backend

A RESTful API back-end for a job board application built with **Node.js**, **Express**, and **MongoDB**. Integrates with the **APILayer Resume Parser API** to parse resume data from uploaded files or URLs.

## Features
- **User Management:** Register/login with JWT authentication, role-based access (candidate/recruiter).
- **Job Management:** CRUD operations for job postings (create, read, update, delete).
- **Application Management:** Candidates can submit applications with resumes; recruiters can update application status.
- **Resume Parsing:** Integrates with APILayer Resume Parser API to extract key details (name, email, skills, experience).
- **File Uploads:** Handles resume uploads using Multer, stored in `uploads/`.
- **MongoDB:** Stores jobs, applications, and parsed resume data.

## Tech Stack
- **Node.js**: Runtime environment.
- **Express**: Web framework for API routing.
- **MongoDB/Mongoose**: Database and ORM for data persistence.
- **JWT**: JSON Web Tokens for authentication.
- **Multer**: Middleware for file uploads.
- **Node-fetch**: HTTP client for external API calls.
- **APILayer Resume Parser**: Third-party API for resume parsing.

## Project Structure

job-board-backend/
├── src/
│   ├── config/              # Configuration (e.g., db.js)
│   ├── controllers/         # Route handlers (e.g., jobController.js)
│   ├── middleware/          # Custom middleware (e.g., auth.js)
│   ├── models/              # Mongoose schemas (e.g., Job.js)
│   ├── routes/              # API routes (e.g., jobs.js)
│   ├── services/            # Business logic (e.g., resumeParser.js)
│   ├── utils/               # Utilities (e.g., logger.js)
│   ├── index.js             # Entry point
│   └── uploads/             # Directory for uploaded files
├── .env                     # Environment variables (e.g., MongoDB URI)
├── package.json             # Dependencies and scripts
└── README.md                # This file


## Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ManishMahto1/job-portal.git
   cd job-board-backend


2. **Install Dependencies:**
   ```bash
   npm install

3. **Configure Environment: Create a .env file in the root directory:**
   ```bash
   PORT=5000
MONGO_URI=mongodb://localhost:27017/job-board
JWT_SECRET= jwt_secret
RESUME_PARSER_API_KEY=  api key

4. **Run MongoDB:**
   ```bash
   Ensure MongoDB is running locally or provide a remote MONGO_URI.

5. **Run the Application:**
   ```bash
  npm run dev



## API Endpoints

Auth:
POST /auth/register: Register a user (email, password, role).
POST /auth/login: Login and get JWT token.
GET /auth/user: Get authenticated user details.

Jobs:
GET /jobs: List all open jobs (paginated).
GET /jobs/:id: Get a specific job by ID.
POST /jobs: Create a job (recruiter only).
PUT /jobs/:id: Update a job (recruiter only).
DELETE /jobs/:id: Delete a job (recruiter only).


Applications:
POST /applications: Submit an application with resume (candidate only).
GET /applications: Get user’s applications (candidate) or job applications (recruiter).
PUT /applications/:id/status: Update application status (recruiter only).

## Dependencies
express: Web framework.
mongoose: MongoDB ORM.
jsonwebtoken: JWT authentication.
bcryptjs: Password hashing.
multer: File upload handling.
node-fetch: API requests to APILayer.
dotenv: Environment variable management.