<div align="center">

# Tafseel — تفصيل 🛋️

**A Full-Stack Multi-Tenant SaaS Platform for Custom Furniture & Upholstery**

[Live Demo](https://tafseel-frontend.onrender.com)

</div>

---

## 🛋️ Project Overview

**Tafseel** is a full-stack multi-tenant SaaS platform designed for the furniture and custom upholstery industry. It connects furniture store owners with customers through digital storefronts while providing dedicated dashboards for managing stores, products, orders, and business statistics.

The platform digitizes the furniture commerce and management lifecycle, allowing store owners to manage their products and incoming orders while customers can browse products, place orders, and track their order status.

### Key Capabilities:

* **For Store Owners:**
  * Manage their digital storefront.
  * Add, edit, and delete products.
  * Manage their product catalog.
  * Receive and manage customer orders.
  * Update order statuses.
  * View revenue statistics.
  * View order statistics.
  * Change their account password.

* **For Customers:**
  * Browse furniture products.
  * Explore products from different stores.
  * View product details.
  * Place purchase orders.
  * Receive an order tracking ID.
  * Track order status.

* **For Administrators:**
  * Review store registration requests.
  * Approve or reject store registration requests.
  * Send email notifications to store owners after approval or rejection.
  * View and manage active stores.
  * View all products across the platform.
  * View and manage all orders across the platform.

---

## ❗ Problem Statement

Many local furniture stores and upholstery workshops rely on social media, phone calls, and messaging applications to showcase products and manage customer orders.

This can create several challenges:

* Difficult product management.
* Manual order management.
* Difficulty tracking customer orders.
* Lack of centralized business information.
* Limited visibility into store performance.
* No dedicated digital storefront for the business.

### 💡 Solution

**Tafseel** provides a centralized digital platform where furniture businesses can create and manage their stores, products, and orders.

Customers can browse furniture products, place orders, and track their orders, while administrators can manage the overall platform and control store requests, products, and orders.

---

## 👥 User Roles

Tafseel uses **Role-Based Access Control (RBAC)** with three main roles:

### 🛡️ SUPER_ADMIN

The administrator can:

* Manage store registration requests.
* Approve or reject stores.
* Send approval/rejection emails.
* View active stores.
* Manage stores.
* View all products.
* Manage products.
* View all orders.
* Manage orders.

### 🏪 STORE_OWNER

The store owner can:

* Manage their store.
* Add products.
* Edit products.
* Delete products.
* Receive customer orders.
* Update order statuses.
* View revenue statistics.
* View order statistics.
* Change account password.

### 👤 CUSTOMER

Customers can:

* Browse products.
* Explore different stores.
* View product details.
* Place orders.
* Receive an order tracking ID.
* Track their orders.

---

## 🚀 Key Features

### 📝 Store Registration Requests

Furniture store owners can submit a request to join the platform.

The administrator can then:

1. Review the store request.
2. Approve or reject the request.
3. Automatically notify the store owner by email.

```text
Store Owner
     │
     ▼
Store Registration Request
     │
     ▼
Admin Review
     │
 ┌───┴────┐
 ▼        ▼
Accept   Reject
 │        │
 ▼        ▼
Email    Email
🏪 Store Management

Administrators can access all active stores through the admin dashboard.

Store owners have their own dedicated store management environment where they can manage their products and incoming orders.

📦 Product Management
Store Owner

Store owners can:

Add products.
Edit products.
Delete products.
Manage their own product catalog.
Admin

Administrators can:

View all products across the platform.
Manage products across different stores.
🛒 Order Management
Store Owner

Store owners can:

Receive incoming orders.
View customer orders.
Update order statuses.
Manage the order lifecycle.
Admin

Administrators can:

View all orders.
Monitor orders across all stores.
Manage order statuses and information.
📊 Business Statistics

Store owners can monitor their business performance through statistics such as:

Revenue.
Number of orders.
Order performance.
📦 Order Tracking

Customers can track their orders using a unique order tracking ID.

Example:

Order ID: TAF-2026-00125

Status:
Pending → Confirmed → Processing → Completed
📧 Email Notifications

The backend includes an email service that notifies store owners when an administrator makes a decision about their store registration request.

Possible notifications include:

Store request approved.
Store request rejected.
💻 Tech Stack
Frontend
Language: TypeScript
Framework: Next.js
Library: React
Styling: Tailwind CSS
Routing: Next.js App Router
Architecture: Feature-Based Architecture
Backend
Runtime: Node.js
Framework: NestJS
Language: TypeScript
ORM: Prisma ORM
Database: PostgreSQL
Infrastructure
Database Hosting: Neon PostgreSQL
Application Hosting: Render
Authentication & Security
Access Token & Refresh Token authentication.
Role-Based Access Control (RBAC).
Protected resources.
Password management.
Environment-based configuration.
Email
Email service for store approval/rejection notifications.
🏗️ Architecture

Tafseel follows a modern full-stack architecture:

                    ┌──────────────────────┐
                    │      Customers       │
                    └──────────┬───────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────┐
│                  Next.js Frontend                   │
│                                                     │
│ Storefront │ Customer │ Store Owner │ Admin        │
│ Dashboard  │ Dashboard│ Dashboard   │ Dashboard    │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ REST API
                        ▼
┌─────────────────────────────────────────────────────┐
│                   NestJS Backend                    │
│                                                     │
│ Auth │ Store │ Product │ Order │ Security │ Email  │
│ Database │ Utilities                              │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
                 ┌───────────────┐
                 │   Prisma ORM  │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │  PostgreSQL   │
                 │     Neon      │
                 └───────────────┘
🧩 Multi-Tenant Architecture

Tafseel is designed as a multi-tenant SaaS platform, allowing multiple furniture stores to operate within the same application.

Each store owner manages their own store, products, and orders while the administrator maintains centralized control over the entire platform.

                    Tafseel Platform
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
       Store A          Store B          Store C
          │                │                │
      Products         Products         Products
      Orders           Orders           Orders
      Statistics       Statistics       Statistics

This architecture allows the platform to scale by adding more furniture businesses without creating a separate application for each store.

📁 Project Structure
Backend
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
Frontend

The frontend is built using:

Next.js
React
TypeScript
Tailwind CSS
Feature-Based Architecture
🚀 Getting Started

To get a local copy of Tafseel up and running, follow these steps.

Prerequisites

Make sure you have the following installed:

Node.js
npm or pnpm
PostgreSQL
Git
1. Clone the Repository
git clone <repository-url>

cd tafseel
2. Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file in the backend root directory.

Backend Environment Variables
DATABASE_URL="your_postgresql_connection_string"

ACCESSTOKEN="your_access_token_secret"

REFRESHTOKEN="your_refresh_token_secret"

MAIL_USER="your_email"

MAIL_PASS="your_email_password_or_app_password"

FRONTEND_URL="http://localhost:3000"

Run Prisma migrations:

npx prisma migrate dev

Start the development server:

npm run start:dev

The backend will run on:

http://localhost:3001
3. Frontend Setup

Open another terminal and navigate to the frontend:

cd frontend

Install dependencies:

npm install

Create a .env.local file:

NEXT_PUBLIC_API_URL="http://localhost:3001/"
NEXT_PUBLIC_RENDER_API="https://tafssel-backend.onrender.com/"

Start the Next.js development server:

npm run dev

The frontend will normally run on:

http://localhost:3000
4. Accessing the Application

After starting both applications:

Frontend
http://localhost:3000
Backend
http://localhost:3001
🌐 Live Demo

Explore the live application:

👉 https://tafseel-frontend.onrender.com

Admin Pages

Store Requests

https://tafseel-frontend.onrender.com/admin/store-requests

Active Stores

https://tafseel-frontend.onrender.com/admin/stores

All Products

https://tafseel-frontend.onrender.com/admin/product

All Orders

https://tafseel-frontend.onrender.com/admin/orders

🔐 Environment Variables

Environment variables are used to store sensitive configuration and deployment-specific settings.

Frontend
NEXT_PUBLIC_API_URL="http://localhost:3001/"
NEXT_PUBLIC_RENDER_API="https://tafssel-backend.onrender.com/"
Backend
DATABASE_URL="your_postgresql_connection_string"

ACCESSTOKEN="your_access_token_secret"

REFRESHTOKEN="your_refresh_token_secret"

MAIL_USER="your_email"

MAIL_PASS="your_email_password_or_app_password"

FRONTEND_URL="http://localhost:3000"

⚠️ Never commit .env or .env.local files to GitHub.

Make sure your .gitignore contains:

.env
.env.local
.env.*.local
node_modules/
dist/
.next/
🚀 Deployment

The application is deployed using Render, while the PostgreSQL database is hosted on Neon.

                    Internet
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
       Next.js Frontend     NestJS Backend
           Render              Render
                                 │
                                 ▼
                           Prisma ORM
                                 │
                                 ▼
                         PostgreSQL
                            Neon
🔮 Future Improvements

The following features are planned for future versions:

💳 Online Payment Integration
Integration with online payment gateways such as Stripe or Zain Cash.
📍 Delivery & Location Tracking
Delivery tracking.
Map-based location tracking.
Live delivery status.
🔔 Real-Time Notifications
Real-time notifications for orders and order status updates.
WebSocket-based communication.
⭐ Product & Store Reviews
Product ratings.
Store ratings.
Customer reviews and comments.
🤖 AI-Powered Furniture Recommendations
AI-based recommendations to help customers discover suitable furniture.
📱 Mobile Application
A dedicated mobile application using React Native or Expo.
📌 Project Highlights

Tafseel demonstrates practical experience in:

Full-Stack Web Development
Multi-Tenant SaaS Architecture
Role-Based Access Control
Authentication & Authorization
REST API Development
Next.js
React
NestJS
Node.js
TypeScript
PostgreSQL
Prisma ORM
Neon PostgreSQL
Render Deployment
Email Integration
E-Commerce Workflows
Product Management
Order Management
Store Management
Dashboard Development
Business Statistics
Scalable System Design
👨‍💻 Author

Jameel Handomeh

Full-Stack Software Engineer
Amman, Jordan

<div align="center">
🛋️ Tafseel — Digitizing the Furniture Industry

Built with TypeScript, Next.js, NestJS, Prisma & PostgreSQL

</div> ```
