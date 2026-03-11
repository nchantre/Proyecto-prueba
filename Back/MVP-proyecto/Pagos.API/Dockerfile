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
COPY ["Pagos.API/Pagos.API.csproj", "Pagos.API/"]
COPY ["Pagos.Application/Pagos.Application.csproj", "Pagos.Application/"]
COPY ["Pagos.Domain/Pagos.Domain.csproj", "Pagos.Domain/"]
COPY ["Pagos.Infrastructure/Pagos.Infrastructure.csproj", "Pagos.Infrastructure/"]

# Restaurar dependencias
RUN dotnet restore "Pagos.API/Pagos.API.csproj"

# Copiar todo el código
COPY . .

WORKDIR "/src/Pagos.API"
RUN dotnet build "Pagos.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Pagos.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Runtime final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Pagos.API.dll"]