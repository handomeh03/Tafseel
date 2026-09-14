<div align="center">

# 🛋️ Tafseel

### **A Full-Stack Multi-Tenant SaaS Platform for Furniture & Upholstery Businesses**

<p>
  <strong>Digitizing the furniture industry by connecting stores, workshops, and customers through one platform.</strong>
</p>

<p>
  <a href="https://tafseel-frontend.onrender.com">
    <img src="https://img.shields.io/badge/Live-Demo-000000?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
</p>

<br>

**[🌐 Live Demo](https://tafseel-frontend.onrender.com)**

</div>

---

## 📌 Table of Contents

* [📖 Overview](#-overview)
* [❗ Problem](#-problem)
* [💡 Solution](#-solution)
* [👥 User Roles](#-user-roles)
* [🚀 Key Features](#-key-features)
* [🏗️ Architecture](#️-architecture)
* [🧩 Multi-Tenant Architecture](#-multi-tenant-architecture)
* [💻 Tech Stack](#-tech-stack)
* [📁 Project Structure](#-project-structure)
* [⚙️ Getting Started](#️-getting-started)
* [🌐 Live Demo](#-live-demo)
* [🔐 Environment Variables](#-environment-variables)
* [🚀 Deployment](#-deployment)
* [🔮 Future Improvements](#-future-improvements)
* [📌 Project Highlights](#-project-highlights)
* [👨‍💻 Author](#-author)

---

# 📖 Overview

**Tafseel** is a full-stack **multi-tenant SaaS platform** built specifically for the furniture and custom upholstery industry.

The platform provides furniture businesses with their own digital storefronts and management dashboards, allowing them to manage:

* 🏪 Stores
* 📦 Products
* 🛒 Customer Orders
* 📊 Business Statistics
* 📧 Store Registration Requests

At the same time, customers can discover products from different stores, place orders, receive a unique tracking ID, and follow their order status.

> **Tafseel transforms traditional furniture businesses into digital storefronts with centralized management and order workflows.**

---

# ❗ Problem

Many local furniture stores and upholstery workshops still depend heavily on:

* Social media platforms
* Phone calls
* Messaging applications
* Manual order management

This creates several challenges:

| Problem                      | Impact                                                       |
| ---------------------------- | ------------------------------------------------------------ |
| 📦 Manual product management | Difficult to maintain large catalogs                         |
| 📝 Manual orders             | Increased chance of mistakes                                 |
| 🔎 Poor order tracking       | Customers cannot easily track their orders                   |
| 📊 Lack of statistics        | Businesses have limited performance visibility               |
| 🏪 No dedicated storefront   | Products are scattered across different platforms            |
| 🔄 Fragmented workflow       | Store management and customer communication are disconnected |

---

# 💡 Solution

**Tafseel** provides a centralized platform where furniture businesses can create and manage their digital stores.

### For businesses

Store owners can:

* Create and manage their storefront
* Add, edit, and delete products
* Manage their product catalog
* Receive customer orders
* Update order statuses
* Monitor revenue
* Monitor order statistics

### For customers

Customers can:

* Browse furniture products
* Explore different stores
* View product details
* Place orders
* Receive an order tracking ID
* Track their orders

### For administrators

Administrators have centralized control over the platform, including:

* Store registration requests
* Active stores
* Products
* Orders
* Store management

---

# 👥 User Roles

Tafseel uses **Role-Based Access Control (RBAC)** with three main roles.

## 🛡️ SUPER_ADMIN

The platform administrator can:

* 📝 Review store registration requests
* ✅ Approve stores
* ❌ Reject stores
* 📧 Send approval/rejection emails
* 🏪 View and manage active stores
* 📦 View and manage all products
* 🛒 View and manage all orders

---

## 🏪 STORE_OWNER

Each store owner has an isolated management environment.

They can:

* 🏪 Manage their store
* ➕ Add products
* ✏️ Edit products
* 🗑️ Delete products
* 📦 Manage their product catalog
* 🛒 Receive customer orders
* 🔄 Update order statuses
* 💰 View revenue statistics
* 📊 View order statistics
* 🔐 Change their account password

---

## 👤 CUSTOMER

Customers can:

* 🔎 Browse products
* 🏪 Explore different stores
* 📦 View product details
* 🛒 Place orders
* 🆔 Receive a tracking ID
* 📍 Track order status

---

# 🚀 Key Features

## 📝 Store Registration Workflow

Furniture store owners can submit a request to join the platform.

The administrator can then review the request and either approve or reject it.

```text
┌─────────────────┐
│   Store Owner   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ Store Registration      │
│ Request                 │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│      Admin Review       │
└────────┬────────────────┘
         │
     ┌───┴────┐
     ▼        ▼
┌────────┐ ┌────────┐
│ Approve│ │ Reject │
└───┬────┘ └───┬────┘
    │          │
    └────┬─────┘
         ▼
┌─────────────────────────┐
│   Email Notification    │
└─────────────────────────┘
```

---

## 🏪 Store Management

### Store Owner

Each store owner can manage their own business environment and product catalog.

### Super Admin

The administrator can access and manage all active stores across the platform.

---

## 📦 Product Management

### Store Owner

* Add products
* Edit products
* Delete products
* Manage their own catalog

### Super Admin

* View all products
* Manage products across different stores

---

## 🛒 Order Management

### Store Owner

* Receive incoming orders
* View customer orders
* Update order statuses
* Manage the order lifecycle

### Super Admin

* View all orders
* Monitor orders across stores
* Manage order statuses and information

---

## 📊 Business Statistics

Store owners can monitor important business metrics, including:

* 💰 Revenue
* 🛒 Number of orders
* 📈 Order performance

---

## 📍 Order Tracking

Customers receive a unique order tracking ID.

Example:

```text
Order ID: TAF-2026-00125

Pending
   ↓
Confirmed
   ↓
Processing
   ↓
Completed
```

This gives customers a simple way to follow their order lifecycle.

---

## 📧 Email Notifications

The backend includes an email service that automatically notifies store owners when the administrator makes a decision about their registration request.

Notifications include:

* ✅ Store request approved
* ❌ Store request rejected

---

# 🏗️ Architecture

Tafseel follows a modern full-stack architecture using **Next.js**, **NestJS**, **Prisma**, and **PostgreSQL**.

```text
                         ┌──────────────────────┐
                         │      Customers       │
                         └──────────┬───────────┘
                                    │
                                    ▼
              ┌──────────────────────────────────────┐
              │          Next.js Frontend             │
              │                                      │
              │  Storefront │ Customer │ Store Owner│
              │  Dashboard  │ Dashboard│ Dashboard  │
              │                                      │
              │              Admin Dashboard          │
              └───────────────────┬──────────────────┘
                                  │
                              REST API
                                  │
                                  ▼
              ┌──────────────────────────────────────┐
              │           NestJS Backend              │
              │                                      │
              │ Auth │ Store │ Product │ Order       │
              │ Security │ Email │ Database │ Utils │
              └───────────────────┬──────────────────┘
                                  │
                                  ▼
                         ┌────────────────┐
                         │  Prisma ORM    │
                         └───────┬────────┘
                                 │
                                 ▼
                         ┌────────────────┐
                         │  PostgreSQL    │
                         │     Neon       │
                         └────────────────┘
```

---

# 🧩 Multi-Tenant Architecture

Tafseel is designed as a **multi-tenant SaaS platform**, allowing multiple furniture businesses to operate within the same application.

Each store owner manages their own:

* 🏪 Store
* 📦 Products
* 🛒 Orders
* 📊 Statistics

While the **Super Admin** maintains centralized control over the entire platform.

```text
                         Tafseel Platform
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
          ┌────────┐        ┌────────┐        ┌────────┐
          │ Store A│        │ Store B│        │ Store C│
          └───┬────┘        └───┬────┘        └───┬────┘
              │                 │                 │
        ┌─────┼─────┐     ┌─────┼─────┐     ┌─────┼─────┐
        ▼     ▼     ▼     ▼     ▼     ▼     ▼     ▼     ▼
     Products Orders Stats Products Orders Stats Products Orders Stats
```

### Why Multi-Tenant?

This architecture allows Tafseel to scale by adding more furniture businesses without creating a separate application for every store.

---

# 💻 Tech Stack

## Frontend

| Technology                     | Purpose               |
| ------------------------------ | --------------------- |
| **Next.js**                    | Frontend framework    |
| **React**                      | UI library            |
| **TypeScript**                 | Type-safe development |
| **Tailwind CSS**               | Styling               |
| **Next.js App Router**         | Routing               |
| **Feature-Based Architecture** | Frontend organization |

---

## Backend

| Technology     | Purpose               |
| -------------- | --------------------- |
| **Node.js**    | Runtime               |
| **NestJS**     | Backend framework     |
| **TypeScript** | Type-safe development |
| **Prisma ORM** | Database access       |
| **PostgreSQL** | Relational database   |

---

## Infrastructure

| Technology | Purpose             |
| ---------- | ------------------- |
| **Neon**   | PostgreSQL hosting  |
| **Render** | Application hosting |

---

## Authentication & Security

* 🔐 Access Token & Refresh Token authentication
* 🛡️ Role-Based Access Control (RBAC)
* 🔒 Protected resources
* 🔑 Password management
* ⚙️ Environment-based configuration

---

## Email

* 📧 Store approval notifications
* 📧 Store rejection notifications

---

# 📁 Project Structure

## Backend

```text
backend/
│
├── dist/
│
├── prisma/
│
├── src/
│   ├── auth/
│   ├── database/
│   ├── emailer/
│   ├── order/
│   ├── product/
│   ├── security/
│   ├── store/
│   ├── utils/
│   │
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── test/
│
├── .env
├── .gitignore
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma.config.ts
├── tsconfig.build.json
└── tsconfig.json
```

## Frontend

The frontend is built using:

```text
Next.js
├── React
├── TypeScript
├── Tailwind CSS
└── Feature-Based Architecture
```

---

# ⚙️ Getting Started

Follow the steps below to run Tafseel locally.

## Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm or pnpm
* PostgreSQL
* Git

---

## 1️⃣ Clone the Repository

```bash
git clone <repository-url>

cd tafseel
```

---

## 2️⃣ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend root directory.

### Backend Environment Variables

```env
DATABASE_URL="your_postgresql_connection_string"

ACCESSTOKEN="your_access_token_secret"

REFRESHTOKEN="your_refresh_token_secret"

MAIL_USER="your_email"

MAIL_PASS="your_email_password_or_app_password"

FRONTEND_URL="http://localhost:3000"
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run start:dev
```

Backend:

```text
http://localhost:3001
```

---

## 3️⃣ Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001/"

NEXT_PUBLIC_RENDER_API="https://tafssel-backend.onrender.com/"
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

# 🌐 Live Demo

Try the deployed application:

### 🚀 Main Application

**https://tafseel-frontend.onrender.com**

---


# 🔐 Environment Variables

Environment variables are used to store sensitive information and deployment-specific configuration.

## Frontend

```env
NEXT_PUBLIC_API_URL="http://localhost:3001/"

NEXT_PUBLIC_RENDER_API="https://tafssel-backend.onrender.com/"
```

## Backend

```env
DATABASE_URL="your_postgresql_connection_string"

ACCESSTOKEN="your_access_token_secret"

REFRESHTOKEN="your_refresh_token_secret"

MAIL_USER="your_email"

MAIL_PASS="your_email_password_or_app_password"

FRONTEND_URL="http://localhost:3000"
```

> ⚠️ **Never commit `.env` or `.env.local` files to GitHub.**

Recommended `.gitignore`:

```text
.env
.env.local
.env.*.local
node_modules/
dist/
.next/
```

---

# 🚀 Deployment

Tafseel is deployed using **Render**, with **Neon PostgreSQL** as the database provider.

```text
                         Internet
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
      ┌───────────────┐          ┌────────────────┐
      │    Next.js    │          │     NestJS     │
      │   Frontend    │          │     Backend    │
      │    Render     │          │     Render     │
      └───────────────┘          └───────┬────────┘
                                         │
                                         ▼
                                 ┌───────────────┐
                                 │  Prisma ORM   │
                                 └───────┬───────┘
                                         │
                                         ▼
                                 ┌───────────────┐
                                 │  PostgreSQL   │
                                 │     Neon      │
                                 └───────────────┘
```

---

# 🔮 Future Improvements

The platform is designed to support additional features in future versions.

### 💳 Online Payments

Integration with online payment gateways such as:

* Stripe
* Zain Cash

### 📍 Delivery & Location Tracking

* Delivery tracking
* Map-based location tracking
* Live delivery status

### 🔔 Real-Time Notifications

* Real-time order notifications
* Order status updates
* WebSocket-based communication

### ⭐ Reviews & Ratings

* Product ratings
* Store ratings
* Customer reviews and comments

### 🤖 AI-Powered Recommendations

AI-based furniture recommendations to help customers discover suitable products.

### 📱 Mobile Application

A dedicated mobile application using:

* React Native
* Expo

---

# 📌 Project Highlights

Tafseel demonstrates practical experience in:

* 🚀 Full-Stack Web Development
* 🧩 Multi-Tenant SaaS Architecture
* 🛡️ Role-Based Access Control
* 🔐 Authentication & Authorization
* 🌐 REST API Development
* ⚛️ React & Next.js
* 🏗️ NestJS & Node.js
* 📘 TypeScript
* 🐘 PostgreSQL
* 🔷 Prisma ORM
* ☁️ Neon PostgreSQL
* 🚀 Render Deployment
* 📧 Email Integration
* 🛒 E-Commerce Workflows
* 📦 Product Management
* 🛒 Order Management
* 🏪 Store Management
* 📊 Dashboard Development
* 📈 Business Statistics
* 📐 Scalable System Design

---

# 👨‍💻 Author

<div align="center">

## **Jameel Handomeh**

**Full-Stack Software Engineer**

📍 Amman, Jordan

</div>

---

<div align="center">

### 🛋️ Tafseel

**Digitizing the Furniture Industry**

Built with ❤️ using

**TypeScript · Next.js · NestJS · Prisma · PostgreSQL**

<br>

⭐ **If you find this project interesting, consider giving it a star!**

</div>
