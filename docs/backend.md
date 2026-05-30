# Backend Module Rules (Firebase)

## Tech Stack

- **Platform**: Firebase (Firestore, Storage, Functions)

## Guidelines

### Data Interaction

- **Async/Await**: Always use `async/await` patterns for database interactions.
- **Validation**: Validate data inputs on the client side before sending requests to Firebase.

### Security

- **App Check**: Ensure App Check tokens are passed with requests where applicable to protect backend resources.
