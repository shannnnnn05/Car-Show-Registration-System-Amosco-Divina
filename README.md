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
