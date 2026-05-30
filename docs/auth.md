# Authentication Module Rules

## Tech Stack

- **SDK**: Firebase Authentication (Modular SDK `@firebase/auth`)

## Guidelines

### Implementation

- **Modular Imports**: Always use tree-shakeable imports (e.g., `import { signInWithEmailAndPassword } from 'firebase/auth'`).
- **State Management**: Use `onAuthStateChanged` to manage user sessions globally.

### Error Handling

- **Async/Await**: Wrap all auth operations in `try/catch` blocks.
- **Error Codes**: Handle specific Firebase error codes gracefully (e.g., `auth/user-not-found`, `auth/wrong-password`) to provide meaningful user feedback.
- **Logging**: Log authentication errors to the console or a monitoring service for debugging.
