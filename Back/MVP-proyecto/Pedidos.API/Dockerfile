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
COPY ["Pedidos.API/Pedidos.API.csproj", "Pedidos.API/"]
COPY ["Pedidos.Application/Pedidos.Application.csproj", "Pedidos.Application/"]
COPY ["Pedidos.Domain/Pedidos.Domain.csproj", "Pedidos.Domain/"]
COPY ["Pedidos.Infrastructure/Pedidos.Infrastructure.csproj", "Pedidos.Infrastructure/"]

# Restaurar dependencias
RUN dotnet restore "Pedidos.API/Pedidos.API.csproj"

# Copiar todo el código
COPY . .

WORKDIR "/src/Pedidos.API"
RUN dotnet build "Pedidos.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Pedidos.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Runtime final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Pedidos.API.dll"]