# Onitama – Teamproject (Backend + Frontend)

Korte, werkgever-vriendelijke samenvatting van het project.

## Wat is dit?
- **Onitama**: een turn-based bordspel (5x5) met unieke bewegingskaarten.
- **Doel**: complete webapplicatie met API, AI-tegenstander en eenvoudige frontend.

## Tech stack
- **Backend**: ASP.NET Core Web API (C#), Swagger/OpenAPI, JWT-auth.
- **Domein**: gescheiden core-laag met game logica (o.a. MiniMax- AI).
- **Data**: in-memory repositories + SQL Server (optioneel via Docker).
- **Frontend**: vanilla HTML/CSS/JS (zonder framework).
- **Tests**: xUnit voor unit- en integratietests.

## Belangrijkste features
- Spelregels en validaties in `Onitama.Core` (borden, zetten, kaarten, wincondities).
- AI via MiniMax-strategie (`MiniMaxGamePlayStrategy`).
- REST API met endpoints voor spel- en tafelbeheer, plus authenticatie.
- Swagger UI voor documentatie en testen.

## Snel starten
### Backend (API)
1. Vereist: .NET SDK (7/8) en (optioneel) Docker Desktop.
2. Start API vanuit `OnitamaGame/Backend/Onitama.Api`:
   ```bash
   dotnet run
   ```
3. Swagger: `http://localhost:5050/swagger` (HTTP) of `https://localhost:5051/swagger` (HTTPS).

### Frontend (statisch)
1. Open `OnitamaGame/Frontend/index.html` in een (live) webserver of editor met Live Server.
2. Pagina’s: `index.html`, `game.html`, `lobby.html`, `register.html`, `team.html`, `Spelregels.html`.

### Docker (optioneel, met SQL Server)
- In `OnitamaGame/Backend/docker-compose.yml`:
  ```bash
  docker compose up -d
  ```
- Bevat `webapi` en `db` (SQL Server). API blijft ook met in-memory werken als DB niet gebruikt wordt.

## Testen
- Uitvoeren in solution root `OnitamaGame/Backend`:
  ```bash
  dotnet test
  ```
- Testprojecten: `Onitama.Core.Tests`, `Onitama.Infrastructure.Tests`, `Onitama.Api.Tests`.

## Projectstructuur (verkort)
- `Backend/Onitama.Api`: Controllers, models, services, filters, Swagger, JWT.
- `Backend/Onitama.Core`: Domeinmodellen (Game, MoveCard, Player, Table, etc.) + AI.
- `Backend/Onitama.Infrastructure`: Repositories (in-memory, file, db context).
- `Backend/*Tests`: Unit- en integratietests.
- `Frontend`: HTML/CSS/JS (spelbord, lobby, login/registratie, regels, team).

## Handige verwijzingen
- Swagger bij run: `http://localhost:5050/swagger`.
- Launch settings: `Backend/Onitama.Api/Properties/launchSettings.json`.
- Kaartsets: `Backend/Onitama.Api/CardSets` (bv. `original.json`).

## Teamwerk / leerdoelen
- Clean architecture: duidelijke scheiding API, Core (domein), Infrastructure.
- Testgedreven aanpak voor kritieke spelregels en AI-logica.
- Security basis met JWT en exception handling filters.

—
Vragen of een demo nodig? Start de API, open Swagger en de frontend pagina’s, en speel een potje tegen de AI.
