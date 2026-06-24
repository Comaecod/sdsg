# Sanatana Dharma Seva Gramam (SDSG) — Website

A self-sustainable heritage village website for **Sanatana Dharma Seva Gramam** at Podili, near Ongole, Andhra Pradesh. The site showcases the campus — school, goshala, pushkarini, bhavan, hostels, panchangam, gallery, and more — with a full admin dashboard for content management.

---

## Technologies Used

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 with Vite 5 |
| **Routing** | React Router v7 (lazy-loaded, Suspense) |
| **Styling** | Tailwind CSS v3 (class-based dark mode, custom theme) |
| **Animation** | Framer Motion |
| **Backend** | Firebase (Firestore, Authentication, Hosting-ready) |
| **Image Hosting** | Cloudinary |
| **Auth** | Firebase Auth (email/password, Google, email link) + RBAC |
| **Audit** | Custom audit logging to Firestore |
| **Build** | Vite (code-splitting, manual chunks, esbuild minification) |

---

## Folder Structure

```
sdsg-web/
├── public/                  # Static assets (favicon, icons)
├── src/
│   ├── main.jsx             # Entry point (ThemeProvider + App)
│   ├── App.jsx              # Route definitions (public + protected)
│   ├── firebase.js          # Firebase config & initialization
│   ├── index.css            # Global styles + Tailwind directives
│   │
│   ├── assets/              # Static images (hero, logos)
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx   # Dark/light theme toggle
│   │   └── LayoutContext.jsx  # Layout-level context
│   │
│   ├── auth/                  # Authentication module
│   │   ├── contexts/AuthContext.jsx   # Auth state provider
│   │   ├── components/
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── EmailLinkCallback.jsx
│   │   │   ├── ProfileScreen.jsx
│   │   │   ├── Dashboard.jsx         # Auth dashboard hub
│   │   │   ├── ProtectedRoute.jsx    # Route guards
│   │   │   ├── Unauthorized.jsx
│   │   │   └── admin/
│   │   │       ├── AdminUserManagement.jsx
│   │   │       ├── StudentManagement.jsx
│   │   │       └── AuditLogViewer.jsx
│   │   ├── services/
│   │   │   ├── authService.js   # Firebase Auth wrappers
│   │   │   ├── userService.js   # User CRUD in Firestore
│   │   │   ├── roleService.js   # Role/permission resolution
│   │   │   └── auditService.js  # Audit log writer
│   │   ├── types/roles.js       # Role constants & permissions
│   │   └── utils/routeGuards.js # Guard helpers
│   │
│   ├── components/              # Public pages & shared components
│   │   ├── HomeScreen.jsx       # Landing page + ImageCarousel
│   │   ├── MainLayout.jsx       # Shared layout (Header + Footer)
│   │   ├── Header.jsx           # Navbar
│   │   ├── Footer.jsx           # Site footer
│   │   ├── PanchangamMarquee.jsx
│   │   ├── BetaBanner.jsx
│   │   ├── ImageModal.jsx       # Full-screen image viewer
│   │   ├── ConfirmModal.jsx     # Reusable confirm dialog
│   │   ├── GoshalaScreen.jsx
│   │   ├── PushkariniScreen.jsx
│   │   ├── BhavanScreen.jsx
│   │   ├── SchoolRedirect.jsx
│   │   ├── VedaPatashalaHostel.jsx
│   │   ├── GeneralHostel.jsx
│   │   ├── PanchangamScreen.jsx
│   │   ├── AboutShankaracharya.jsx
│   │   ├── GalleryScreen.jsx
│   │   ├── ContactScreen.jsx
│   │   ├── FeedbackScreen.jsx
│   │   ├── FeedbackReportsScreen.jsx
│   │   ├── AdminDashboard.jsx     # Dashboard landing
│   │   └── admin/
│   │       ├── AdminPanel.jsx     # Super admin panel
│   │       ├── AdminLayout.jsx    # Dashboard layout shell
│   │       ├── AdminImages.jsx    # Image management (list/edit/delete)
│   │       └── UploadImage.jsx    # Upload to Cloudinary + Firestore
│   │
│   ├── services/               # Data & business logic
│   │   ├── imageService.js     # Image CRUD in Firestore
│   │   ├── cloudinaryService.js# Cloudinary upload API
│   │   ├── firebaseService.js  # Page view analytics
│   │   └── panchangamAPI.js    # Panchangam / calendar data
│   │
│   └── data/
│       └── panchangamDictionary.js
│
├── index.html                  # HTML entry point
├── vite.config.js              # Vite build config
├── tailwind.config.js          # Tailwind theme
├── postcss.config.js
├── eslint.config.js
├── package.json
└── .env.example               # Environment variable template
```

---

## Architecture & Data Flow

### Entry Point
`main.jsx` wraps the app in `ThemeProvider` (dark/light mode) and lazy-loads `App`.

### Routing
`App.jsx` defines all routes under `BrowserRouter` and `AuthProvider`:
- **Public routes** (`/`, `/goshala`, `/gallery`, etc.) are wrapped in `MainLayout` (Header + Footer) and use `<LayoutProvider>`.
- **Auth routes** (`/login`, `/forgot-password`, etc.) use `<GuestRoute>` to redirect authenticated users away.
- **Protected routes** (`/profile`, `/dashboard/*`) use `<ProtectedRoute>` and redirect unauthenticated users to `/login`. Dashboard routes are additionally wrapped in `AdminLayout` (sidebar nav).

### Authentication
`AuthContext.jsx` holds the global auth state (`user`, `userProfile`, `permissions`, `loading`). It provides:
- `loginWithEmail`, `loginWithGoogle`, `sendSignInLink`, `loginWithEmailLink`
- `logout`, `createUser`, `resetPassword`
- `hasPermission()`, `hasAnyPermission()`, `hasAllPermissions()`
- Role-based helpers: `isSuperAdmin`, `isAdmin`, `isStaff`, `isStudent`

On login, the user's Firestore profile is fetched, their role's permissions are resolved, and the session is set. On logout, a logout audit event is recorded.

### Role-Based Access Control
Roles defined in `src/auth/types/roles.js`:
- **super_admin** — full access to everything (users, images, audit, feedback, admin panel)
- **admin** — manage images, view feedback reports, manage students
- **staff** — limited dashboard access
- **student** — profile only

Each role has a permission array checked via `hasPermission()`.

### Image Management Flow
1. **Upload**: `UploadImage.jsx` → `cloudinaryService.js` (upload to Cloudinary) → `imageService.js` (save metadata to Firestore).
2. **Display**: `getImages()` in `imageService.js` fetches carousel images (ordered by `createdAt` ascending). `HomeScreen.jsx` passes them to `ImageCarousel`.
3. **Admin**: `AdminImages.jsx` provides paginated browsing, category filtering, inline editing, and deletion.

### Data Services
- **imageService.js** — Firestore CRUD for the `sdsg-images` collection.
- **cloudinaryService.js** — Handles image upload to Cloudinary and returns URL + publicId.
- **firebaseService.js** — Tracks page view counts in Firestore.
- **panchangamAPI.js** — Fetches panchangam calendar data.

### Build & Performance
- **Code splitting**: All page components are lazy-loaded with `React.lazy` + `Suspense`.
- **Manual chunks**: Firebase and React are split into separate vendor chunks.
- **Font loading**: Inter font is loaded with `media="print" onload="this.media='all'"` pattern to avoid blocking render.
- **DNS prefetch**: Google Fonts and Firebase APIs are prefetched.

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Firestore, Authentication, and (optional) Cloudinary account

### Setup

```bash
# Clone the repo
git clone https://github.com/Comaecod/sdsg.git
cd sdsg-web

# Install dependencies
npm install

# Create .env from template
cp .env.example .env
# Fill in your Firebase config values and Cloudinary credentials

# Start dev server (port 4000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables (`.env`)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_SUPER_ADMIN_EMAIL=
```

---

## Deployment

The site is configured for deployment on **Vercel** (see `og:url` in `index.html`). The build command `npm run build` outputs to `dist/`.

---

## License

See `package.json` for project details.
