# Car Show Registration System

Backend API for the Divina CarShow 2027 registration system at Sorsogon City Coliseum.

| Member | Role |
| --- | --- |
| Amosco | Backend Developer |
| Divina | Frontend Developer |

## Structure

```
src/Api             Minimal API endpoints and startup
src/Application     Commands, queries and handlers
src/Domain          Entities, enums and fees
src/Infrastructure  EF Core, SQLite and seed data
```

## Run

```
dotnet run --project src/Api
```

The API runs at `http://localhost:5205`. API documentation is at `http://localhost:5205/scalar/v1`. The SQLite database `carshow-amosco.db` is created and seeded on first run.

## CORS

The React dashboard origins are listed under `AllowedOrigins` in `Api/appsettings.json`.
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
