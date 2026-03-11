# Base runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copiar los proyectos
COPY ["User.API/User.API.csproj", "User.API/"]
COPY ["User.Application/User.Application.csproj", "User.Application/"]
COPY ["User.Domain/User.Domain.csproj", "User.Domain/"]
COPY ["User.Infrastructure/User.Infrastructure.csproj", "User.Infrastructure/"]

# Restaurar dependencias
RUN dotnet restore "User.API/User.API.csproj"

# Copiar todo el código
COPY . .

WORKDIR "/src/User.API"
RUN dotnet build "User.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "User.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Runtime final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "User.API.dll"]