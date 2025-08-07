# Riwayat Admin Portal

A modern admin portal for Riwayat, a home-chef food delivery platform in Pakistan.

## Overview

The Riwayat Admin Portal is used by the internal operations team to manage the platform, including:

- Kitchen management and onboarding
- Order processing and tracking
- Customer management
- Engagement and notifications
- Analytics and reporting
- Platform settings and configuration

## Tech Stack

- **Frontend**: React with Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **Authentication**: JWT-based authentication
- **UI Components**: Custom components with Heroicons
- **Styling**: Tailwind CSS

## Key Features

### Role-Based Access Control (RBAC)

The portal implements a comprehensive RBAC system that controls access to:

- Routes and pages
- UI components and actions
- Menu items and navigation
- Data and functionality

#### RBAC Components

1. **PermissionButton**: A button that only renders if the user has the required permission(s)
2. **PermissionGate**: A component that conditionally renders content based on user permissions
3. **ProtectedRoute**: A route guard that redirects unauthorized users
4. **usePermission Hook**: Utility functions for permission checks and filtering

#### Documentation

For detailed documentation on the RBAC system, see [RBAC Documentation](./src/docs/RBAC.md).

### Permissions Demo

A dedicated demo page is available at `/permissions-demo` that showcases all permission components and provides examples of their usage. This page serves as both documentation and a testing ground for the RBAC system.

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/riwayat-admin-portal.git

# Navigate to the project directory
cd riwayat-admin-portal

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start the development server
npm start
# or
yarn start
```

### Build

```bash
# Build for production
npm run build
# or
yarn build
```

## Project Structure

```
riwayat-admin-portal/
├── public/                  # Static files
├── src/
│   ├── components/          # Reusable components
│   │   ├── PermissionButton.js
│   │   ├── PermissionGate.js
│   │   └── ProtectedRoute.js
│   ├── context/             # React Context providers
│   │   ├── AuthContext.js
│   │   └── PermissionsContext.js
│   ├── data/                # Mock data for development
│   ├── docs/                # Documentation
│   │   └── RBAC.md
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js
│   │   └── usePermission.js
│   ├── layouts/             # Layout components
│   │   ├── AuthLayout.js
│   │   └── MainLayout.js
│   ├── pages/               # Page components
│   │   ├── auth/
│   │   ├── kitchens/
│   │   ├── orders/
│   │   ├── customers/
│   │   ├── engagement/
│   │   ├── reports/
│   │   ├── settings/
│   │   ├── Dashboard.js
│   │   ├── NotFound.js
│   │   ├── PermissionsDemo.js
│   │   └── Unauthorized.js
│   ├── services/            # Service modules for API calls
│   ├── utils/               # Utility functions
│   ├── App.js               # Main application component
│   └── index.js             # Application entry point
└── README.md                # Project documentation
```

## Design System

The Riwayat Admin Portal follows a modern design system with:

- Clean, minimal UI with rounded corners
- Consistent color scheme with primary brand colors
- Modern typography using SF Pro Display and Poppins fonts
- Responsive layouts for all screen sizes
- Accessible UI components

## Backend Integration

The frontend is designed to be easily integrated with a backend API. Currently, it uses mock services that simulate API calls, which can be replaced with real API calls when the backend is developed.

## License

[MIT](LICENSE)
