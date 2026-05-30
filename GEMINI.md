# Rajatflix Project Context

## Overview

Rajatflix is a **React** web application built utilizing the **Firebase** ecosystem for backend services and authentication.

## Tech Stack

### Frontend

- **Framework**: React (Modern, Functional Components, Hooks)

### Firebase Services

The project uses the Firebase JavaScript Modular SDK:

- **Core**: `@firebase/app` for application initialization.
- **Authentication**: `@firebase/auth` for managing user sessions and identity.
- **App Check**: `@firebase/app-check` for security, utilizing ReCAPTCHA V3 or Enterprise providers to protect backend resources.

### Build & Styling

- **PostCSS**: Used for CSS processing (indicated by `@csstools/postcss-hwb-function`).

## Development Guidelines

### Firebase Implementation

- **Modular SDK**: Use tree-shakeable imports (e.g., `import { initializeApp } from 'firebase/app'`) rather than the compat library where possible.
- **Error Handling**: Implement robust error handling using `try/catch` blocks for async operations and Error Boundaries for UI components.
- **App Check Debugging**: Since App Check is present, ensure a debug token is configured for local development to avoid ReCAPTCHA verification failures during testing.

## AI Assistant Instructions

- **Module References**: Before generating code, consult the specific module documentation in the `docs/` directory:
  - **Authentication**: See `docs/auth.md`
  - **UI/Frontend**: See `docs/ui.md`
  - **Backend/Firebase**: See `docs/backend.md`
- When generating code, prioritize **TypeScript** or **Modern JavaScript (ES6+)**.
- Use `async/await` patterns for handling Firebase Promises.
