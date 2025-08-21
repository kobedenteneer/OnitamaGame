FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Onitama.Api/Onitama.Api.csproj", "Onitama.Api/"]
COPY ["Onitama.Core/Onitama.Core.csproj", "Onitama.Core/"]
COPY ["Onitama.Bootstrapper/Onitama.Bootstrapper.csproj", "Onitama.Bootstrapper/"]
COPY ["Onitama.Infrastructure/Onitama.Infrastructure.csproj","Onitama.Infrastructure/"]
RUN dotnet restore "Onitama.Api/Onitama.Api.csproj"
COPY . .
WORKDIR "/src/Onitama.Api"
RUN dotnet build "Onitama.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Onitama.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish

FROM base AS final

WORKDIR /app
COPY --from=publish /app/publish .

CMD ASPNETCORE_URLS=http://+:$PORT dotnet Onitama.Api.dll
