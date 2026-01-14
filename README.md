# 🛒 Storeplate – Full-Stack E-commerce Monorepo

A full-stack e-commerce application built with modern web technologies, organized as a **monorepo** containing both frontend and backend.

---

## 📦 Tech Stack

### Frontend (FE)
- Next.js
- React
- Tailwind CSS
- shadcn/ui

### Backend (BE)
- NestJS
- TypeORM
- MySQL

### Others
- RESTful API
- JWT Authentication
- Monorepo architecture (single Git repository)

---

## 📁 Project Structure

```text
.
├── shop-fe/        # Next.js frontend
├── shop-be/        # NestJS backend
└── README.md
🚀 Features
User
Product listing & product detail

Shopping cart (localStorage)

Add / update / remove cart items

User authentication

User profile

Admin
Product management

Variant & stock management

Image upload

Order management (in progress)

🧑‍💻 Development
Both frontend and backend live in a single repository but can be developed independently.

1️⃣ Clone repository
bash
Copy code
git clone https://github.com/itsdat/Storeplate.git
cd Storeplate
2️⃣ Frontend
bash
Copy code
cd shop-fe
npm install
npm run dev
Frontend runs at:

arduino
Copy code
http://localhost:3000
3️⃣ Backend
bash
Copy code
cd shop-be
npm install
npm run start:dev
Backend runs at:

arduino
Copy code
http://localhost:3001
🔐 Environment Variables
Each project has its own .env file.

Backend .env
env
Copy code
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=storeplate
JWT_SECRET=your_secret
Frontend .env
env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:3001
📌 Notes
Cart data is stored in localStorage for guest users

Authentication uses JWT

Designed for easy extension (payment, order flow, etc.)

📄 License
This project is licensed under the MIT License.

✨ Author
Developed by Dat
GitHub: https://github.com/itsdat