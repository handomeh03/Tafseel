# 🛋️ Tafseel — تفصيل

### A Full-Stack Multi-Tenant SaaS Platform for Custom Furniture & Upholstery

<div align="center">

**Tafseel** is a production-grade multi-tenant SaaS platform designed for furniture showrooms, manufacturers, and custom upholstery workshops.

It digitizes the entire furniture commerce and management lifecycle — from storefront creation and product management to customer orders, tracking, and business analytics.

**[🌐 Live Demo](https://tafseel-frontend.onrender.com)**

</div>

---

## 📋 Table of Contents

* [Project Overview](#-project-overview)
* [Problem Statement](#-problem-statement)
* [Key Features](#-key-features)
* [User Roles](#-user-roles)
* [Tech Stack](#-tech-stack)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [Running the Application](#-running-the-application)
* [Live Demo](#-live-demo)
* [Future Improvements](#-future-improvements)
* [Author](#-author)

---

## 🛋️ Project Overview

**Tafseel** is a multi-tenant SaaS platform built specifically for the **custom furniture and upholstery industry**.

The platform connects furniture businesses with customers through dedicated digital storefronts while providing store owners with powerful tools to manage their products, orders, and business performance.

Instead of relying on traditional social media pages or manual order management, furniture businesses can create their own digital presence and manage their operations through a centralized platform.

### 🎯 Main Objectives

* Digitize traditional furniture and upholstery businesses.
* Provide each store with its own digital storefront.
* Simplify furniture product management.
* Allow customers to browse and purchase products online.
* Provide customers with order tracking.
* Give store owners visibility into orders and revenue.
* Provide administrators with centralized platform management.
* Build a scalable **multi-tenant SaaS architecture**.

---

## ❗ Problem Statement

Many local furniture stores and upholstery workshops still depend heavily on:

* Social media platforms for showcasing products.
* Phone calls and messaging applications for receiving orders.
* Manual order tracking.
* Spreadsheets or paper-based business records.
* Limited visibility into business performance.

This creates several challenges:

* Difficult product management.
* Orders can be lost or misunderstood.
* Customers have limited visibility into their order status.
* Store owners lack centralized business analytics.
* Each business needs to build and maintain its own digital presence.

### 💡 The Solution

**Tafseel** provides a centralized SaaS platform where multiple furniture businesses can operate independently while sharing the same underlying system.

Each store can manage its own:

* Digital storefront
* Products
* Orders
* Customers
* Revenue
* Business data

while the platform administrator maintains system-wide control and monitoring.

---

# 🚀 Key Features

## 🏪 Store Owner

Store owners have access to a dedicated dashboard where they can:

* Create and manage their store.
* Customize their digital storefront.
* Add, edit, and remove products.
* Upload product images.
* Organize furniture products.
* Manage incoming orders.
* Track order statuses.
* Monitor revenue and business performance.
* Manage their store information.

---

## 👤 Customers

Customers can:

* Browse furniture products.
* Explore different stores.
* View product details.
* Place purchase orders.
* Receive an order tracking ID.
* Track their order progress.
* View order status updates.

### 📦 Order Tracking

Customers can track their orders using a unique **Order Tracking ID** without requiring access to the store owner's dashboard.

Example:

```text
Order ID: TAF-2026-00125

Status:
Order Received → Processing → Manufacturing → Ready → Delivered
```

---

## 🛡️ Admin Dashboard

The platform administrator has system-wide visibility and management capabilities.

The Admin Dashboard provides:

* Platform overview.
* Store management.
* User management.
* System-wide statistics.
* Business performance analytics.
* Monitoring of platform activity.
* Centralized administrative control.

---

# 👥 User Roles

Tafseel follows a **Role-Based Access Control (RBAC)** approach.

| Role          | Description                                  |
| ------------- | -------------------------------------------- |
| `SUPER_ADMIN` | Manages and monitors the entire platform     |
| `STORE_OWNER` | Manages a furniture store and its operations |
| `CUSTOMER`    | Browses products and places/tracks orders    |

Each role has access only to the resources and operations permitted for that role.

---

# 💻 Tech Stack

## Frontend

| Technology                     | Purpose                        |
| ------------------------------ | ------------------------------ |
| **TypeScript**                 | Type-safe development          |
| **Next.js**                    | React framework                |
| **React**                      | UI development                 |
| **Tailwind CSS**               | Styling                        |
| **App Router**                 | Application routing            |
| **Feature-Based Architecture** | Scalable frontend organization |

---

## Backend

| Technology     | Purpose                       |
| -------------- | ----------------------------- |
| **Node.js**    | Runtime environment           |
| **NestJS**     | Backend framework             |
| **TypeScript** | Type-safe backend development |
| **Prisma ORM** | Database access and ORM       |
| **PostgreSQL** | Relational database           |

---

# 🏗️ Architecture

The application follows a modern **Full-Stack Architecture**:

```text
                    ┌──────────────────────┐
                    │      Customers       │
                    └──────────┬───────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────┐
│                   Next.js Frontend                   │
│                                                     │
│  Storefronts │ Customer UI │ Owner Dashboard │ Admin│
└───────────────────────┬─────────────────────────────┘
                        │
                        │ REST API
                        ▼
┌─────────────────────────────────────────────────────┐
│                    NestJS Backend                    │
│                                                     │
│ Authentication │ Authorization │ Orders │ Products  │
│ Users │ Stores │ Analytics │ Business Logic        │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                   Prisma ORM                         │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
                 ┌───────────────┐
                 │  PostgreSQL   │
                 └───────────────┘
```

---

# 🧩 Multi-Tenant Architecture

Tafseel is designed as a **multi-tenant SaaS platform**.

The same application infrastructure can support multiple furniture businesses while keeping each store's data logically isolated.

Conceptually:

```text
                    Tafseel Platform
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
     Store A            Store B            Store C
        │                  │                  │
     Products           Products           Products
     Orders             Orders             Orders
     Customers           Customers          Customers
     Revenue             Revenue            Revenue
```

This architecture allows the platform to scale by onboarding additional stores without creating a separate application for every business.

---

# 📁 Project Structure

A simplified project structure:

```text
tafseel/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── stores/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── admin/
│   │   └── ...
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Getting Started

Follow these steps to run Tafseel locally.

## Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm or pnpm
* PostgreSQL
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/tafseel.git

cd tafseel
```

---

# 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/tafseel_db?schema=public"

PORT=3000
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run start:dev
```

The backend API will be available at:

```text
http://localhost:3000
```

---

# 3. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

If port `3000` is already being used by the backend, Next.js will automatically use another available port, such as:

```text
http://localhost:3001
```

---

# 🔐 Environment Variables

## Backend

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/tafseel_db?schema=public"
PORT=3000
```

## Frontend

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

> Never commit your `.env` or `.env.local` files to GitHub.

Add them to `.gitignore`:

```gitignore
.env
.env.local
.env.*.local
```

---

# ▶️ Running the Application

You need to run both the backend and frontend.

### Terminal 1 — Backend

```bash
cd backend

npm install

npx prisma migrate dev

npm run start:dev
```

### Terminal 2 — Frontend

```bash
cd frontend

npm install

npm run dev
```

Then open the frontend URL in your browser.

---

# 🌐 Live Demo

Try the deployed application:

### 👉 [Tafseel Live Demo](https://tafseel-frontend.onrender.com)

---

# 🔮 Future Improvements

The platform can be extended with additional features such as:

* 💳 Online payment integration.
* 📍 Delivery and location tracking.
* 🔔 Real-time notifications.
* 💬 Customer/store messaging.
* 📊 Advanced business analytics.
* 📦 Advanced inventory management.
* 🧾 Digital invoices.
* ⭐ Product and store reviews.
* 🔎 Advanced product search and filtering.
* 🤖 AI-powered furniture recommendations.
* 📱 Mobile application.
* 💰 Subscription plans for store owners.
* 📈 Advanced SaaS analytics.

---

# 📌 Project Highlights

Tafseel demonstrates practical experience with:

* Full-Stack Web Development
* Multi-Tenant SaaS Architecture
* Role-Based Access Control
* RESTful API Development
* Next.js App Router
* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* Feature-Based Architecture
* Authentication & Authorization
* E-Commerce Workflows
* Order Management
* Dashboard Development
* Scalable System Design

---

# 👨‍💻 Author

**Jameel Handomeh**

Full-Stack Software Engineer
Amman, Jordan

---

<div align="center">

### 🛋️ Tafseel — Digitizing the Furniture Industry

**Built with TypeScript, Next.js, NestJS, Prisma & PostgreSQL**

</div>
