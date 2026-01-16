<div align="center">

# 🛍️ Storeplate

### Modern Full-Stack E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A production-ready e-commerce solution built with cutting-edge technologies, featuring a clean monorepo architecture for seamless development and deployment.

[Demo](#) • [Documentation](#) • [Report Bug](https://github.com/itsdat/Storeplate/issues) • [Request Feature](https://github.com/itsdat/Storeplate/issues)

</div>

---

## ✨ Features

### 🛒 Customer Experience
- **Product Catalog** - Browse products with filtering and search capabilities
- **Product Details** - Rich product pages with images, variants, and specifications
- **Smart Cart** - Persistent shopping cart with localStorage support
- **User Authentication** - Secure JWT-based authentication system
- **Profile Management** - User account and preference management

### 🎛️ Admin Dashboard
- **Product Management** - Full CRUD operations for products
- **Variant Control** - Manage product variants, sizes, colors, and pricing
- **Stock Tracking** - Real-time inventory management
- **Image Uploads** - Seamless product image management
- **Order Processing** - Comprehensive order management (in development)

---

## 🏗️ Architecture

```
storeplate/
│
├── shop-fe/                 # Frontend Application
│   ├── app/                 # Next.js App Router
│   ├── components/          # React Components
│   ├── lib/                 # Utilities & Helpers
│   └── public/              # Static Assets
│
├── shop-be/                 # Backend Application
│   ├── src/
│   │   ├── modules/         # Feature Modules
│   │   ├── config/          # Configuration
│   │   ├── guards/          # Auth Guards
│   │   └── main.ts          # Entry Point
│   └── test/                # Test Suites
│
└── README.md                # You are here
```

---

## 🚀 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **State Management:** React Hooks
- **HTTP Client:** Fetch API
- **Type Safety:** TypeScript

</td>
<td valign="top" width="50%">

### Backend
- **Framework:** NestJS
- **ORM:** TypeORM
- **Database:** MySQL
- **Authentication:** JWT
- **Validation:** class-validator
- **API:** RESTful
- **Type Safety:** TypeScript

</td>
</tr>
</table>

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (v8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/itsdat/Storeplate.git
   cd Storeplate
   ```

2. **Setup Backend**
   ```bash
   cd shop-be
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your database credentials
   
   # Run database migrations
   npm run migration:run
   
   # Start development server
   npm run start:dev
   ```
   
   Backend will be running at `http://localhost:3001`

3. **Setup Frontend**
   ```bash
   cd shop-fe
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your API URL
   
   # Start development server
   npm run dev
   ```
   
   Frontend will be running at `http://localhost:3000`

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `shop-be` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_secure_password
DB_NAME=storeplate

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRATION=7d

# Application
PORT=3001
NODE_ENV=development
```

### Frontend Environment Variables

Create a `.env.local` file in the `shop-fe` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Analytics, etc.
# NEXT_PUBLIC_GA_ID=your_ga_id
```

---

## 📸 Screenshots

<div align="center">

### Product Catalog
![Product Catalog](#)

### Product Details
![Product Details](#)

### Admin Dashboard
![Admin Dashboard](#)

</div>

---

## 🗺️ Roadmap

- [x] User authentication & authorization
- [x] Product catalog with search and filters
- [x] Shopping cart functionality
- [x] Admin product management
- [ ] Order processing system
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

## 🧪 Testing

```bash
# Backend unit tests
cd shop-be
npm run test

# Backend e2e tests
npm run test:e2e

# Frontend tests
cd shop-fe
npm run test
```

---

## 🚢 Deployment

### Backend (NestJS)

```bash
cd shop-be
npm run build
npm run start:prod
```

Deploy to platforms like:
- Railway
- Render
- DigitalOcean
- AWS EC2

### Frontend (Next.js)

```bash
cd shop-fe
npm run build
npm start
```

Deploy to platforms like:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Cloudflare Pages

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Contact

**Dat** - [@itsdat](https://github.com/itsdat)

Project Link: [https://github.com/itsdat/Storeplate](https://github.com/itsdat/Storeplate)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeORM](https://typeorm.io/)

---

<div align="center">

**[⬆ back to top](#-storeplate)**

Made with ❤️ by [Dat](https://github.com/itsdat)

</div>