Frenso
A full-stack social platform where users can sign up (including Google OAuth), create posts & replies, like posts, and pay via Razorpay to get a verified badge.

##Demo Vedio

https://github.com/user-attachments/assets/eac547f1-31d3-4c41-8c64-b9623b6dd622


Built with:
✨ Frontend: React, Redux, MUI, TailwindCSS, Formik, Yup
🚀 Backend: Spring Boot, Spring Security (JWT), Hibernate, MySQL
💳 Payments: Razorpay API

✨ Features
✅ Sign up & log in (Email/Password + Google OAuth)
✅ Create, edit & delete posts and replies
✅ Like/unlike posts
✅ Razorpay integration to become a verified user
✅ Secure JWT-based authentication
✅ Form validation on both client and server
✅ Responsive, modern UI

📐 Architecture
rust
Copy
Edit
Frontend (React) ---> Backend (Spring Boot REST API) ---> MySQL Database
                    |
                    +--> Razorpay Payment Gateway
Frontend uses React, Redux (for state), React Router, Axios, Formik + Yup.

Backend follows Controller-Service-Repository pattern.

JWT authentication & password hashing ensure security.

Data persisted with MySQL using Hibernate/JPA.

Razorpay handles secure payment and verification flow.

🔧 Tech Stack
Layer	Technology
Frontend	React, Redux, Axios, MUI, TailwindCSS
Forms	Formik & Yup
State Mgmt	Redux + Thunk
Backend	Spring Boot, Spring Security
DB Access	Hibernate / Spring Data JPA
Database	MySQL
Authentication	JWT (JSON Web Tokens)
Payments	Razorpay SDK & API

🚀 Getting Started
Prerequisites
Java 17+

Maven

Node.js & npm/yarn

MySQL database

Backend Setup
bash
Copy
Edit
cd backend/
# Update application.properties with your DB and Razorpay keys
mvn clean install
mvn spring-boot:run
Frontend Setup
bash
Copy
Edit
cd frontend/
npm install
npm run dev
Visit: http://localhost:5173

📝 Why this stack?
React – fast, component-based, huge ecosystem.

Spring Boot – enterprise-ready, robust, secure.

JWT – stateless & secure authentication.

Formik & Yup – clean forms & validation.

Razorpay – PCI-DSS compliant, easy to integrate for Indian payments.

MySQL – relational DB perfect for structured, transactional data.

🔒 Security
Passwords are hashed (BCrypt).

JWT is used for authentication.

All endpoints secured with Spring Security.

Payments verified with Razorpay’s HMAC signatures.

📄 License
This project is for educational & demonstration purposes.

🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss what you would like to change.
