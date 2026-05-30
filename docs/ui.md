# UI Module Rules

## Tech Stack

- **Framework**: React
- **Styling**: PostCSS

## Guidelines

### Component Structure

- **Functional Components**: Use modern functional components with Hooks (`useState`, `useEffect`, `useContext`). Avoid Class components.
- **Composition**: Break down complex UIs into smaller, reusable components.

### Error Handling & UX

- **Error Boundaries**: Wrap major UI sections in Error Boundaries to prevent the entire app from crashing.
- **Loading States**: Always handle loading states for async UI operations to improve user experience.
