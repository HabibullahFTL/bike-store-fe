# Bike Store Frontend

A modern and responsive frontend application for the Bike Store, built using React and Vite. This frontend provides a smooth user experience for browsing bikes, managing orders, and handling admin operations with robust form validation, API integration, and state management.

## Live Demo

Check out the live version of the Bike Store Frontend: https://bike-store-fe.vercel.app/

## Test credentials

- Admin
  - Email: admin@bikestore.com
  - Password: Admin123
- Customer
  - Email: customer@bikestore.com
  - Password: Customer123

## Features

### 🚲 Products

- View all bikes with filters (brand, name, category).
- See individual bike details.
- Create, update, and delete bikes (admin only).

### 📦 Orders

- Place an order for a bike.
- Verify payments through Surjo Pay.
- Track and update order statuses.
- Admin can manage and view all orders with revenue stats.

### 👤 User Management

- Customer registration.
- Admin can create new admins.
- Admin can block/unblock users and change roles.
- Role-based access control across routes.

## 💡 UX & UI

- Modern and responsive UI with Tailwind CSS.
- Accessible components via Radix UI.
- Toast notifications, modals, sliders, and more.

## 🧠 State & Forms

- Global state management using Redux Toolkit and Redux Persist.
- Powerful form handling with React Hook Form and Zod schema validation.

## Technologies Used

### 🛠 Frontend Stack

- React 19 (with Vite)
- TypeScript
- Redux Toolkit + Redux Persist
- React Router DOM
- React Hook Form + Zod
- Radix UI for accessible components
- Tailwind CSS + tailwindcss-animate
- Lucide React and React Icons
- Swiper for carousels
- Date-fns and Lodash for utilities

## Getting Started

### Prerequisites

- Node.js v16 or higher
- Backend API running
  - Live API url: https://bike-store-be.vercel.app/
  - Repository: https://github.com/HabibullahFTL/bike-store-node-js.git

### Installation

```bash
git clone <repository-link>
cd bike-store-fe
yarn install
```

### Running the App

```bash
yarn dev
```

Open the app at http://localhost:5173
