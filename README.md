<div align="center">

# Tafseel — تفصيل 🛋️

**A Full-Stack Multi-Tenant SaaS Platform for Custom Furniture & Upholstery**

[Live Demo](https://tafseel-frontend.onrender.com)

</div>

---

## 🛋️ Project Overview

**Tafseel** is an advanced, production-grade multi-tenant SaaS platform tailored for the furniture manufacturing and custom upholstery industry. It bridges the gap between furniture showroom owners/workshops and end customers by digitizing the entire commerce and management lifecycle. 

### Key Capabilities:
* **For Store Owners:** Ability to register/open a digital account, manage a custom storefront, upload and showcase products (sofas, tables, bedrooms, decor), track incoming orders, and monitor business revenue.
* **For Customers:** Seamless browsing of unique furniture pieces, placing custom purchase orders, and tracking order progress and statuses in real-time simply using their order tracking ID.
* **Role-Based Dashboards:** 
  * **Admin Dashboard:** System-wide oversight, platform management, and performance analytics.
  * **Store Owner Dashboard:** Dedicated workspace for store management, product inventory, and revenue tracking.

---

## 💻 Tech Stack

### Frontend
* **Language:** TypeScript
* **Framework:** Next.js (App Router) / React
* **Styling:** Tailwind CSS
* **Architecture:** Feature-Based Architecture (scalable and modular design)

### Backend
* **Framework:** NestJS (Node.js)
* **Database:** PostgreSQL
* **ORM:** Prisma ORM

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites
Make sure you have the following installed on your machine:
* Node.js & npm / pnpm
* PostgreSQL database

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/tafseel.git](https://github.com/your-username/tafseel.git)
cd tafseel
2. Backend Setup (NestJS)
Bash
cd backend
npm install
Create a .env file in the backend root directory and add your PostgreSQL connection string:

مقتطف الرمز
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/tafseel_db?schema=public"
Run database migrations and start the server:

Bash
npx prisma migrate dev
npm run start:dev
3. Frontend Setup (Next.js)
Bash
cd frontend
npm install
Create a .env.local file in the frontend root directory and configure your backend API base URL:

مقتطف الرمز
NEXT_PUBLIC_API_URL="http://localhost:3000"
Start the development server:

Bash
npm run dev
🌐 Live Demo
Explore the live application here:

👉 https://tafseel-frontend.onrender.com

👤 Author
Jameel Handomeh

Full-Stack Software Engineer — Amman, Jordan
