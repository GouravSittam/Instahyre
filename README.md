# 🌟 PlaceReview - Local Business Discovery Platform

A modern, full-stack web application for discovering local businesses and sharing authentic reviews. Built with a bold **Brutalist design** aesthetic featuring sharp edges, strong borders, and eye-catching animations.

![Tech Stack](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?style=flat&logo=sqlite)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss)

## 🎯 What is PlaceReview?

PlaceReview is a community-driven platform where users can:

- 🔍 **Discover** local places (restaurants, shops, services)
- ⭐ **Rate & Review** their experiences (1-5 stars)
- 📱 **Share** opinions with the community
- 🎨 **Enjoy** a unique brutalist UI experience

Perfect for finding the best local spots or helping others discover hidden gems in your area!

## ✨ Key Features

### 🔐 User Authentication

- Secure phone-based registration
- JWT token authentication
- Session persistence with auto-logout on expiry
- Password hashing with bcryptjs

### 🔎 Smart Search

- Search places by name
- Filter by minimum rating (1-5 stars)
- Real-time results with loading states
- Displays average rating & review count

### 📝 Review System

- Star rating (1-5) with visual selector
- Optional detailed text reviews
- One review per user per place
- Auto-creates places if they don't exist
- Edit capability for your own reviews

### 🎨 Brutalist UI Design

- Bold yellow (#FFFF00) background with grid pattern
- Thick black (5px) borders everywhere
- Offset box shadows for depth
- Red accents for emphasis
- Smooth hover animations & transitions
- Uppercase typography (Space Grotesk font)
- Mobile-responsive design

### 📊 Place Details

- Overall average rating
- Total review count
- Complete review history with timestamps
- User avatars & names
- Highlight your own reviews

## 🛠️ Tech Stack

### Frontend Stack

- **React 18.2** - Modern UI library with hooks
- **React Router v6** - Client-side routing & navigation
- **Vite 5.0** - Lightning-fast build tool & dev server
- **Tailwind CSS 3.4** - Utility-first styling framework
- **Lucide React** - Beautiful icon library (1000+ icons)
- **Custom CSS** - Brutalist component system

### Backend Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Minimalist web framework
- **SQLite3** - Lightweight embedded database
- **better-sqlite3** - Fast synchronous SQLite driver
- **bcryptjs** - Secure password hashing
- **jsonwebtoken** - JWT token generation/validation
- **CORS** - Cross-origin resource sharing

### Development Tools

- **ESLint** - Code linting & quality
- **Nodemon** - Auto-restart on file changes
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation & Setup

Follow these steps to get the application running locally:

#### 1️⃣ Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd Instahyre

# Or extract the ZIP file and navigate to the folder
```

#### 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

This installs: express, cors, bcryptjs, jsonwebtoken, sqlite3, etc. │ ├── LoginPage.jsx
│ │ │ ├── RegisterPage.jsx
│ │ │ ├── SearchPage.jsx # Main search & discovery
│ │ │ └── PlaceDetailsPage.jsx
│ │ ├── lib/ # Utility functions
│ │ │ └── utils.js # cn() for class merging
│ │ ├── App.jsx # Root component with routes
│ │ ├── index.css # Tailwind + custom brutalist styles
│ │ └── main.jsx # App entry point
│ ├── index.html # HTML template
│ ├── package.json # Frontend dependencies
│ ├── tailwind.config.js # Tailwind theme configuration
│ ├── postcss.config.js # PostCSS plugins
│ └── vite.config.js # Vite build configuration
│
├── server/ # 🔧 Backend Express Application
│ ├── src/
│ │ ├── config/
│ │ │ └── database.js # SQLite connection & schema
│ │ ├── controllers/ # Business logic handlers
│ │ │ ├── authController.js # Login/Register
│ │ │ ├── placeController.js # Search places
│ │ │ └── reviewController.js # Add reviews
│ │ ├── middleware/
│ │ │ └── auth.js # JWT verification middleware
│ │ ├── routes/ # Express route definitions
│ │ │ ├── auth.js # /api/auth routes
│ │ │ ├── places.js # /api/places routes
│ │ │ └── reviews.js # /api/reviews routes
│ │ └── index.js # Express server setup
│ ├── data/ # SQLite database files (auto-generated)
│ │ └── database.db
│ ├── scripts/
│ │ └── seed.js # Database initialization script
│ └── package.json # Backend dependencies
│
├── .gitignore # Git ignore rules
└── README.md # You are here! 📍

````

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. **Clone/Extract the project**

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
````

#### 3️⃣ Install Frontend Dependencies

```bash
cd ../client
npm install
```

This installs: react, react-router-dom, tailwind, lucide-react, vite, etc.

#### 4️⃣ Initialize Database with Sample Data

```bash
cd ../server
npm run seed
```

This creates:

- ✅ SQLite database (`server/data/database.db`)
- ✅ Tables (users, places, reviews)
- ✅ 2 sample users for testing
- ✅ ~10 sample places (restaurants, shops, clinics)
- ✅ Sample reviews

**Default Test Accounts:**

```
User 1:
  Phone: 1234567890
  Password: password123

User 2:
  Phone: 9876543210
  Password: password123
```

#### 5️⃣ Start the Backend Server

Open a new terminal window:

```bash
cd server
npm start
```

✅ Server running at: `http://localhost:5000`

#### 6️⃣ Start the Frontend Dev Server

Open another terminal window:

```bash
cd client
npm run dev
```

✅ Client running at: `http://localhost:3000`

#### 7️⃣ Open in Browser

Navigate to **http://localhost:3000** and start exploring!

---

### 🎮 Quick Start Summary

```bash
# Terminal 1 - Backend
cd server && npm install && npm run seed && npm start

# Terminal 2 - Frontend
cd client && npm install && npm run dev

# Open http://localhost:3000 in your browser
```

## 📚 API Documentation

### 🔐 Authentication Endpoints

#### Register New User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "phone_number": "1234567890",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "phone_number": "1234567890"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "phone_number": "1234567890",
  "password": "yourpassword"
}
```

**Response:** Same as register

### 🏢 Places Endpoints

#### Search Places

```http
GET /api/places/search?name=pizza&minRating=4
Authorization: Bearer <token>
```

**Query Parameters:**

- `name` (optional) - Search by place name
- `minRating` (optional) - Minimum rating filter (1-5)

**Response:**

```json
{
  "places": [
    {
      "id": 1,
      "name": "Pizza Palace",
      "address": "123 Main St",
      "average_rating": 4.5,
      "review_count": 12
    }
  ]
}
```

#### Get Place Details

```http
GET /api/places/:id
Authorization: Bearer <token>
```

**Response:**

```json
{
  "place": {
    "id": 1,
    "name": "Pizza Palace",
    "address": "123 Main St",
    "average_rating": 4.5,
    "review_count": 12
  },
  "reviews": [
    {
      "id": 1,
      "rating": 5,
      "review_text": "Great pizza!",
      "user_name": "John Doe",
      "created_at": "2024-01-15",
      "is_current_user": false
    }
  ]
}
```

### ⭐ Reviews Endpoints

#### Add Review

```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "place_name": "Pizza Palace",
  "place_address": "123 Main St",
  "rating": 5,
  "review_text": "Amazing pizza and great service!"
}
```

**Response:**

```json
{
  "message": "Review added successfully",
  "review": {
    "id": 1,
    "place_id": 1,
    "user_id": 1,
    "rating": 5,
    "review_text": "Amazing pizza and great service!"
  }
}
```

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Places Table

```sql
CREATE TABLE places (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(name, address)
);
```

### Reviews Table

```sql
CREATE TABLE reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  place_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (place_id) REFERENCES places(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(place_id, user_id)
);
```

## 🎨 Customizing the Brutalist Theme

The design system is fully customizable via Tailwind configuration.

### Modify Colors

Edit `client/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'brutal-yellow': '#FFFF00',    // Change background
      'brutal-black': '#000000',      // Change borders/text
      'brutal-red': '#FF0000',        // Change accents
      'brutal-white': '#FFFFFF',
      // Add your own colors
      'brutal-blue': '#0000FF',
    }
  }
}
```

### Custom Animations

Add to `client/src/index.css`:

```css
@keyframes your-animation {
  from {
    /* ... */
  }
  to {
    /* ... */
  }
}

.animate-your-animation {
  animation: your-animation 0.3s ease-out;
}
```

### Adjust Shadow Offsets

In `tailwind.config.js`:

```javascript
boxShadow: {
  'brutal': '8px 8px 0px 0px #000000',      // Main shadow
  'brutal-lg': '12px 12px 0px 0px #000000', // Large shadow
  // Add custom shadows
  'brutal-sm': '4px 4px 0px 0px #000000',
}
```

## 🔧 Development Scripts

### Frontend (client/)

```bash
npm run dev      # Start dev server with HMR (Hot Module Replacement)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint to check code quality
```

### Backend (server/)

```bash
npm start        # Start server (production mode)
npm run dev      # Start with nodemon (auto-restart on changes)
npm run seed     # Reset database and add sample data
```

## 🎯 Feature Highlights

### Smart Form Validation

- Real-time validation feedback
- Required field indicators
- Password strength requirements (min 6 chars)
- Phone number format validation

### Secure Authentication

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with 24h expiration
- Auto-logout on token expiry
- Protected routes with redirect to login

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly buttons and forms
- Collapsible navigation on mobile

### Performance Optimizations

- React.memo for expensive components
- useCallback for stable function references
- Lazy loading for route components (potential)
- Optimized re-renders with proper state management

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find and kill process using port 5000 (backend)
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Same for port 3000 (frontend)
```

### Database Locked Error

```bash
# Delete the database and re-seed
rm server/data/database.db
cd server && npm run seed
```

### CORS Issues

- Ensure backend is running on port 5000
- Check `vite.config.js` proxy configuration
- Verify CORS is enabled in `server/src/index.js`

### Token Expired

- Simply log out and log back in
- Token expiry is 24 hours by default
- Modify in `server/src/controllers/authController.js`:
  ```javascript
  const token = jwt.sign({ id: user.id }, "your-secret", {
    expiresIn: "7d", // Change to 7 days
  });
  ```

## 📱 Browser Compatibility

Tested and working on:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the production bundle:
   ```bash
   cd client && npm run build
   ```
2. Deploy the `dist/` folder
3. Set environment variable for API URL

### Backend (Heroku/Railway/Render)

1. Update database to PostgreSQL or keep SQLite
2. Set environment variables:
   - `PORT`
   - `JWT_SECRET`
3. Deploy from `server/` directory

## 🤝 Contributing

Contributions are always welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration: Brutalist web design movement
- Icons: [Lucide Icons](https://lucide.dev/)
- Fonts: [Google Fonts](https://fonts.google.com/) - Space Grotesk & Space Mono
- Styling: [Tailwind CSS](https://tailwindcss.com/)

## 📧 Support

If you encounter any issues or have questions:

- Open an issue on GitHub
- Check the troubleshooting section above
- Review the API documentation

---

<div align="center">

**Built with ❤️ and ☕ using React, Express, and SQLite**

⭐ Star this repo if you found it helpful!

</div>
| GET | `/api/auth/profile` | Get current user profile |

### Places

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| GET    | `/api/places/search` | Search places by name/rating   |
| GET    | `/api/places/:id`    | Get place details with reviews |

### Reviews

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| POST   | `/api/reviews`            | Add or update review       |
| GET    | `/api/reviews/my-reviews` | Get current user's reviews |

## Features

- **User Registration**: Register with name, phone number, and password
- **Authentication**: JWT-based authentication for all protected routes
- **Add Review**: Create reviews for places (auto-creates place if new)
- **Search**: Search places by name (exact matches first, then partial)
- **Filter by Rating**: Filter search results by minimum average rating
- **Place Details**: View place info with all reviews
- **Review Ordering**: Current user's review appears first, then newest

## Assumptions Made

1. Added password field for secure authentication (not in original spec)
2. Users can update their existing review for a place
3. Using SQLite for simplicity (file-based, no separate DB server)
4. "Category" in search refers to min rating filter (categories not defined in Place schema)
5. One review per user per place constraint

## Database Schema

### Users

- id, name, phone_number (unique), password, created_at

### Places

- id, name, address, created_at
- Unique constraint on (name, address)

### Reviews

- id, place_id, user_id, rating (1-5), text, created_at
- Unique constraint on (place_id, user_id)
  #
