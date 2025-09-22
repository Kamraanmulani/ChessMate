# 🏆 ChessMate - Ultimate Chess Platform

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.11.0-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 About ChessMate

ChessMate is a modern, full-stack chess platform where strategy meets technology. Built with React.js and Node.js, it offers a beautiful, intuitive environment for chess enthusiasts of all levels to play, learn, and compete with players worldwide.

### ✨ Key Features

- 🎮 **Multiple Game Modes**: Play against other players or challenge our AI
- ⏰ **Flexible Time Controls**: From bullet (1 min) to classical (30+ min)
- 🔐 **Secure Authentication**: JWT-based user authentication system
- 📱 **Responsive Design**: Perfect experience on desktop and mobile
- 🎨 **Modern UI/UX**: Sleek design with smooth animations
- 🌍 **Real-time Play**: Live chess games with other players

### 🚀 Game Modes

- **🤝 Player vs Player**: Challenge real opponents worldwide
- **🤖 Player vs AI**: Practice against intelligent bots
- **⚡ Multiple Time Formats**:
  - Bullet Chess (1-3 minutes)
  - Blitz Chess (5 minutes)
  - Rapid Chess (10-25 minutes)
  - Classical Chess (30+ minutes)

## 🛠️ Tech Stack

### Frontend
- **React.js 19.1.1** - UI Framework
- **Framer Motion** - Animations and transitions
- **React Icons** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **BCrypt** - Password hashing
- **Joi** - Input validation

### Development Tools
- **ESLint** - Code linting
- **Git** - Version control
- **VS Code** - Recommended IDE

## 📁 Project Structure

```
ChessMate/
├── ChessMate/                 # Frontend React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Auth/         # Authentication components
│   │   │   ├── GameMode/     # Game mode selection
│   │   │   └── ...
│   │   ├── contexts/         # React context providers
│   │   ├── assets/           # Static assets
│   │   └── main.jsx         # Application entry point
│   ├── public/              # Public assets
│   └── package.json         # Frontend dependencies
├── backend/                 # Backend Node.js application
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── routes/             # API routes
│   ├── config/             # Configuration files
│   ├── utils/              # Utility functions
│   └── server.js           # Server entry point
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22.11.0 or higher
- PostgreSQL 12 or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kamraanmulani/ChessMate.git
   cd ChessMate
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file in backend directory
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database and user
   psql -U postgres
   CREATE DATABASE ChessMate;
   CREATE USER chessmate_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE ChessMate TO chessmate_user;
   ```

5. **Run database migrations**
   ```bash
   node create-schema.js
   ```

6. **Start the backend server**
   ```bash
   npm start
   ```

7. **Set up the frontend**
   ```bash
   cd ../ChessMate
   npm install
   ```

8. **Start the frontend development server**
   ```bash
   npm run dev
   ```

### 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ChessMate
DB_USER=chessmate_user
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Game Endpoints (Coming Soon)

- `POST /api/games/create` - Create new game
- `GET /api/games/active` - Get active games
- `POST /api/games/move` - Make a move

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kamraan Mulani**
- GitHub: [@Kamraanmulani](https://github.com/Kamraanmulani)

## 🙏 Acknowledgments

- Chess.com for inspiration
- React.js team for the amazing framework
- The open-source community for excellent packages

## 🔮 Future Features

- [ ] Real-time multiplayer chess games
- [ ] Advanced AI opponents with different difficulty levels
- [ ] Game analysis and move suggestions
- [ ] Tournament system
- [ ] Player rankings and leaderboards
- [ ] Chess puzzles and training modes
- [ ] Mobile app development
- [ ] Live streaming of games

---

⭐ Star this repository if you find it helpful!

## 🚀 Features

- **User Authentication**: Secure signup and login with email and password
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Chess-themed UI**: Modern design with chess-inspired color scheme
- **Form Validation**: Client-side and server-side validation
- **PostgreSQL Database**: Robust data storage with user management
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: BCrypt password hashing

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18+ recommended)
- **PostgreSQL** (v12+ recommended)
- **npm** or **yarn**

## 🛠️ Installation & Setup

### 1. Clone or Download the Project

Navigate to your project directory:
```bash
cd c:\Users\Kamraam\Desktop\ChessMate
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Update `.env` with your PostgreSQL credentials:
```env
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=chessmate_db
DB_USER=your_postgresql_username
DB_PASSWORD=your_postgresql_password

# JWT Secret (Change this!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024

# JWT Expiration
JWT_EXPIRES_IN=7d

# CORS Origin
CORS_ORIGIN=http://localhost:5173
```

#### Database Setup
1. Create a PostgreSQL database named `chessmate_db`
2. Initialize the database schema:
```bash
npm run init-db
```

#### Start Backend Server
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../ChessMate
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🗃️ Database Schema

### Users Table
```sql
- id (SERIAL PRIMARY KEY)
- username (VARCHAR(50) UNIQUE NOT NULL)
- email (VARCHAR(255) UNIQUE NOT NULL)
- phone (VARCHAR(20) UNIQUE NOT NULL)
- password_hash (VARCHAR(255) NOT NULL)
- created_at (TIMESTAMP WITH TIME ZONE)
- updated_at (TIMESTAMP WITH TIME ZONE)
- is_active (BOOLEAN DEFAULT true)
- email_verified (BOOLEAN DEFAULT false)
- last_login (TIMESTAMP WITH TIME ZONE)
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Health Check
- `GET /api/health` - Server health status

## 📝 Validation Rules

### Signup Validation
- **Username**: 3-50 characters, alphanumeric only
- **Email**: Valid email format
- **Phone**: 8-15 digits, international format supported
- **Password**: Minimum 8 characters with uppercase, lowercase, number, and special character

### Login Validation
- **Email**: Valid email format
- **Password**: Required field

## 🎨 Frontend Components

### Authentication Components
- `AuthContext` - React context for auth state management
- `SignUp` - User registration form
- `Login` - User login form
- `AuthModal` - Modal wrapper for auth forms

### Landing Page Components
- `Header` - Navigation with auth buttons
- `Hero` - Main landing section with chess board
- `Features` - Platform features showcase
- `HowItWorks` - Step-by-step guide
- `Footer` - Site footer with links

## 🔧 Technology Stack

### Frontend
- **React.js** - UI framework
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **BCrypt** - Password hashing
- **JWT** - Authentication tokens
- **Joi** - Validation library

## 🚦 Testing the Application

1. **Start both servers** (backend on :5000, frontend on :5173)
2. **Open browser** to `http://localhost:5173`
3. **Test signup flow**:
   - Click "Sign Up" button
   - Fill in all required fields
   - Submit form
   - Verify success message and automatic login
4. **Test login flow**:
   - Click "Login" button
   - Enter email and password
   - Submit form
   - Verify successful authentication

## 🔒 Security Features

- **Password Hashing**: BCrypt with salt rounds
- **JWT Tokens**: Secure authentication tokens
- **Input Validation**: Server and client-side validation
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Secure cross-origin requests
- **SQL Injection Protection**: Parameterized queries

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🎯 Next Steps

To extend this application, consider adding:
- Email verification
- Password reset functionality
- Chess game implementation
- User profiles and statistics
- Multiplayer functionality
- Tournament system

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database `chessmate_db` exists

2. **JWT Token Errors**
   - Verify `JWT_SECRET` is set in `.env`
   - Check token expiration settings

3. **CORS Errors**
   - Verify `CORS_ORIGIN` matches frontend URL
   - Check both servers are running

4. **Port Conflicts**
   - Change `PORT` in backend `.env`
   - Update frontend API URL accordingly

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For questions or support, please contact the development team.