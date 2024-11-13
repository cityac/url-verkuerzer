# Project Documentation

## Run project

```
yarn install
yarn build
yarn start
```

## Overview

This application leverages **Clerk** for user management, **Drizzle ORM** to handle an **SQLite** database, and **Turso** for online database replication. The project is deployed on the **Vercel** platform, offering a smooth and scalable serverless environment. **Tailwind CSS** is used extensively for styling, providing a responsive, utility-first design approach.

## Getting Started

This application is configured to use:

- **Clerk** for user management and authentication, including account creation and session handling.
- **Drizzle ORM** for type-safe database interactions with SQLite as the primary storage.
- **Turso** as an online database replica to support distributed access and improved scalability.
- **Tailwind CSS** for a streamlined, utility-based approach to styling with advanced features such as conditional classes, theming, and custom animations.

## Deployment

The application is live on Vercel and can be accessed using the following links:

- **Sign-Up Page**: Users can create an account at [Sign-Up Page](https://url-verkuerzer.vercel.app/signup).
- **Dashboard**: Upon signing up, users are redirected to their dashboard at [Dashboard](https://url-verkuerzer.vercel.app/dashboard), where they can view their account and log out.

### Key Features

- **User Registration**: Users can create an account with a unique email address.
- **Dashboard Access**: After signing up, users gain access to a personalized dashboard.
- **Logout Functionality**: Users can log out from the dashboard, returning them to the sign-up page.

> **Note**: Currently, the **Sign-In functionality is not implemented**. Once logged out, the user session is lost, and the account cannot be accessed again. However, users can create a new account using a different email address, as the email column has a unique constraint.

## Tailwind CSS Implementation

The application’s UI is built with **Tailwind CSS** to provide a clean, responsive, and scalable design. Here are some advanced Tailwind features used:

- **Conditional Classes**: Tailwind’s `classNames` utility helps apply conditional styling based on the component’s state, such as hover effects, form validations, and active/inactive states.

  ```javascript
  theme: {
    fontSize: {
      '3xl': '1.75rem', //custom class for custom font size
    },
    screens: {},
    extend: {
      aria: {
        submitted: 'submitted="true"', // custom aria attribute, used for managing different states of inputs //valid, invalid, dirty
      },
      fontFamily: {
        sans: ['var(--font-inter)'], // default font replaced by google font Inter
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // all figma colors added as custom color classes
        // names selected based on color
        // https://www.colorxs.com/

        primary: 'rgba(74, 78, 113, 1)',
        'clario-green-50': 'rgba(39, 178, 116, 0.7)',
        'clario-green-300': 'rgba(39, 178, 116, 1)',
        'clario-red-50': 'rgba(253, 239, 238, 1)',
        'clario-red-300': 'rgba(255, 128, 128, 1)',
        'clario-blue-50': 'rgba(112, 195, 255, 1)',
        'clario-blue-500': 'rgba(75, 101, 255, 1)',
        'clario-alice-blue': 'rgba(244, 249, 255, 1)',
        'clario-linen-blue': 'rgba(224, 237, 251, 0.72)',
        'clario-nebula-blue': 'rgba(75, 101, 255, 0.72)',
        'clario-dim-gray': 'rgba(108, 108, 108, 1)',
      },
    },
  },
  ```
