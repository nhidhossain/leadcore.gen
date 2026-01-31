# Firebase Setup Instructions

## Quick Start (Using Mock/Local CMS)

**You're all set!** The CMS is currently using localStorage and works without Firebase.

**Login credentials:**
- Email: `admin@leadcore.com`
- Password: `admin123`

Access the admin panel at: `http://localhost:5173/admin/login`

---

## Migrate to Firebase (Production)

When you're ready for production, follow these steps:

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it (e.g., "leadcore-cms")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Services

**Authentication:**
1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Enable **Email/Password** provider
4. Save

**Firestore Database:**
1. Go to **Build** → **Firestore Database**
2. Click "Create database"
3. Start in **production mode**
4. Choose a location (us-central1 recommended)
5. Enable

**Storage:**
1. Go to **Build** → **Storage**
2. Click "Get started"
3. Start in **production mode**
4. Enable

### 3. Get Configuration

1. In Firebase Console, go to **Project settings** (gear icon)
2. Scroll to "Your apps"
3. Click **Web app** icon (`</>`)
4. Register app (name it "LeadCore Web")
5. Copy the configuration object

### 4. Update Environment Variables

Create a `.env` file in your project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Switch to Firebase

**Update `src/context/AuthContext.jsx`:**
- Comment out the mock import
- Uncomment the Firebase imports

**Update `src/services/cms.service.js`:**
- This file is already Firebase-ready, no changes needed!

### 6. Create Admin User

Run this in Firebase Console → Authentication:
1. Go to Authentication → Users
2. Click "Add user"
3. Enter your admin email and password

### 7. Security Rules

Set these Firestore rules for security:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Done!

Restart your dev server and you're on Firebase!
