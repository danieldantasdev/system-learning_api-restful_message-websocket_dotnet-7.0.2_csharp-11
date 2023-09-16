FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Message.Api/Message.Api.csproj", "Message.Api/"]
RUN dotnet restore "Message.Api/Message.Api.csproj"
COPY . .
WORKDIR "/src/Message.Api"
RUN dotnet build "Message.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Message.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Message.Api.dll"]
