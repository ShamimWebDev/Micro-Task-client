# Micro-Task and Earning Platform - Client

A modern, responsive web application for micro-tasking where buyers can post tasks and workers can earn coins by completing them. Featuring a sleek dark-themed UI with premium animations and real-time notifications.

## 🚀 Live Demo

[Live Site URL](https://micro-task-platform.web.app) (Replace with actual deployment URL)

## ✨ Key Features

- **User Authentication**: Secure Login/Registration with Firebase and Google Sign-in.
- **Role-Based Dashboards**:
  - **Worker**: View available tasks, submit work, track earnings, and withdraw coins.
  - **Buyer**: Add new tasks, manage existing tasks, review worker submissions, and purchase coins via Stripe.
  - **Admin**: Manage all users and tasks, and approve withdrawal requests.
- **Dynamic Earning System**: Workers earn coins (20 coins = $1) which can be withdrawn to various payment systems.
- **Real-time Notifications**: Instant alerts for task approvals, rejections, and payments.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop using Tailwind CSS and Framer Motion.
- **Pagination**: Server-side pagination for smooth browsing of submission history.

## 🛠️ Technology Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS (v4)
- **Animations**: Framer Motion
- **Icons**: React Icons (Lucide/Fi)
- **Data Fetching**: Axios with custom interceptors for JWT security.
- **State Management**: React Context API & custom hooks.
- **Authentication**: Firebase Authentication.

## 🔑 Admin Credentials

- **Email**: admin@microtask.com
- **Password**: admin123 (Replace with actual if changed)

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShamimWebDev/Micro-Task-client
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env` file in the root and add:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_IMGBB_API_KEY=your_imgbb_key
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
