# Frontend

React, TypeScript, Vite and Tailwind CSS dashboard for the Divina CarShow 2027 registration system.

## Run

```
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Configuration

`frontend/.env.development` holds two values:

```
VITE_API_BASE_URL=http://localhost:5205
VITE_DATA_SOURCE=api
```

Set `VITE_DATA_SOURCE=sample` to run the dashboard against the 25 local records in `src/api/sample-data.ts` without the backend. Set it back to `api` to use the C# API in `src/api/registrationsApi.ts`. Both modules expose the same functions, so no component changes are needed.

## Scripts

```
npm run dev
npm run build
npm run lint
```
