# Creatory3D Models

A 3D model showcase and storefront built for a small business selling printable designs. The app displays model categories and previews images pulled dynamically from Google Drive, making it easy to manage an expanding catalog without updating the frontend manually.

## Overview

Creatory3D Models is a lightweight full-stack web app that combines:

- a React + Vite frontend for browsing categories and gallery items
- an Express backend that queries Google Drive for folders and files
- a clean, responsive layout built for product showcasing and customer contact

This project is designed as a polished portfolio and business showcase for a 3D printing brand.

## Features

- Category-based navigation for 3D model collections
- Dynamic image gallery loaded from Google Drive
- Clean, mobile-friendly storefront layout
- WhatsApp contact button for quick customer inquiries
- Express API layer for secure and centralized Drive access
- Fast local development workflow with concurrent frontend/backend startup

## Gallery

<p align="center">
  <img width="1200" height="675" alt="3d-print-showcase" src="https://github.com/user-attachments/assets/91d92c82-ef4e-43c3-bfec-148e326012f1" /><br />
  Desktop View
</p>

## Tech Stack

- React 19
- Vite
- Express
- Google Drive API
- CSS modules / component styling

## Project Structure

```text
3d-print-showcase/
├── backend/
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── main.jsx
│       ├── index.css
│       └── components/
├── package.json
├── README.md
└── .gitignore
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file inside the `backend` folder with the following values:

```env
PORT=3001
GOOGLE_DRIVE_API_KEY=your_google_drive_api_key
GOOGLE_DRIVE_ROOT_FOLDER_ID=your_google_drive_root_folder_id
```

Also add a frontend environment file if needed:

```env
VITE_API_URL=http://localhost:3001
```

### 3. Run the app

```bash
npm run dev:full
```

This starts both:

- the backend API on port 3001
- the Vite frontend for local development

## Available Scripts

```bash
npm run dev
npm run server
npm run dev:full
npm run build
npm run preview
```

## Usage

The app loads model folders from a Google Drive folder and displays images for each category. This makes it easy to manage the product catalog by organizing folders and images in Drive without touching the application code.

## License

This project is for personal and portfolio showcase use. Feel free to adapt it for your own brand or business.
