💼 FinSage – AI Powered Wealth Management System

FinSage is a full featured AI Powered Wealth Management platform built using a modern MERN based architecture. The system is designed to help users clearly understand, organize, and improve their financial health by centralizing income, assets, liabilities, and credit card data into one intelligent platform.

Unlike traditional budgeting tools, FinSage goes beyond expense tracking. It integrates an AI chatbot and a financial recommendation engine that analyze real user data and provide structured financial guidance. The platform focuses on clarity, usability, and intelligent financial decision support.

FinSage works seamlessly across devices and provides users with a real time snapshot of their financial condition through a smart dashboard, visual reports, and AI-driven insights.

=============================================================================================================================

🧩 Key Features

For Users

• Income Management – Record multiple income sources with automatic annual calculations
• Asset Tracking – Monitor savings accounts, cash holdings, and asset values in one place
• Liability Management – Track loans with interest rates and due dates
• Credit Card Monitoring – View balances, limits, APR, and credit utilization percentage
• Smart Dashboard – Instant overview of income, assets, liabilities, and net worth
• AI Chatbot Assistant – Ask financial questions and receive data-driven guidance
• AI Recommendation Engine – Get prioritized financial improvement suggestions
• Reports & Analysis – View financial health score and detailed summaries

=============================================================================================================================

⚙️ Tech Stack

⚛️ Frontend

• React.js + Vite

• Tailwind CSS

• JavaScript

• Recharts (financial charts and visualization)

• Axios (API communication)

• Lucide React (icons)

🟢 Backend

• Node.js + Express.js

• MongoDB + Mongoose

• JWT Authentication

• REST API Architecture

🤖 AI Integration

FinSage integrates AI capabilities to provide intelligent financial guidance through:

• AI Chatbot responses based on user financial data
• Financial recommendation engine for prioritized improvement actions

The system currently uses Google Generative AI (@google/generative-ai) and is architected to be easily extended or migrated to AWS Bedrock for scalable, cloud-based AI deployment.

=============================================================================================================================

🔧 Installed Dependencies

> Frontend Essentials

• React → npm install react
• React DOM → npm install react-dom
• React Router DOM → npm install react-router-dom
• Axios → npm install axios
• Tailwind CSS → npm install tailwindcss
• Recharts → npm install recharts
• Lucide React → npm install lucide-react

> Backend Core

• Express → npm install express
• Mongoose → npm install mongoose
• MongoDB → npm install mongodb
• JSON Web Tokens → npm install jsonwebtoken
• BcryptJS → npm install bcryptjs
• Cookie Parser → npm install cookie-parser
• CORS → npm install cors
• Dotenv → npm install dotenv
• Multer → npm install multer
• Cloudinary → npm install cloudinary
• Nodemailer → npm install nodemailer
• Google Generative AI → npm install @google/generative-ai

> Dev Dependency

• Nodemon → npm install nodemon --save-dev

=============================================================================================================================

▶️ How to Run FinSage Project

📥 Clone the Repository

git clone https://github.com/<your-username>/finsage.git
cd finsage

⚙️ Install Backend Dependencies

cd backend
npm install

📦 Install Frontend Dependencies

cd ../frontend
npm install

🔐 Environment Configuration

backend/.env

JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY_Chatbot=your_gemini_api_key

ADMIN_FEEDBACK_EMAIL=your_admin_email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password
SMTP_FROM="FinSage Feedback" <your_email>

frontend/.env

VITE_API_BASE_URL=http://localhost:5000

=============================================================================================================================

🌍 Deployment

The project is live and accessible here: https://finsage-phi.vercel.app/


=============================================================================================================================

