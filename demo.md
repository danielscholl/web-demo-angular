# Demo Notes

## Build and run application localhost

```bash
npm start
http://localhost:8080
```

## Build and run in a Docker container

```bash
npm run docker
npm run docker:start
npm run docker:push
```

## Deploy App to Azure App Service Linux Docker Containers

```bash
Prefix=dks
ResourceGroup=demo-linux
Location=eastus2
Plan=$ResourceGroup-plan
Web=$Prefix-$ResourceGroup-docker-web

# Create Resource Group
az group create --name ${ResourceGroup} \
    --location ${Location} 

# Create an App Service Plan
az appservice plan create --name ${Plan} \
  --resource-group ${ResourceGroup} \
  --sku S1 \
  --is-linux \
  -ojsonc

# Create a Web App linked to a container
az webapp create --name ${Web} \
  --resource-group ${ResourceGroup} \
  --plan ${Plan} \
  --deployment-container-image-name danielscholl/web-angular-demo:latest
```

## Deploy App to Azure App Service Windows NodeJS with Git Syncing

```bash
Prefix=dks
ResourceGroup=demo-windows
Location=eastus2
Plan=$ResourceGroup-plan
Web=$Prefix-$ResourceGroup-windows-web

# Create Resource Group
az group create --name ${ResourceGroup} \
    --location ${Location} 

# Create an App Service Plan
az appservice plan create --name ${Plan} \
  --resource-group ${ResourceGroup} \
  --sku S1 \
  -ojsonc

# Create an Empty Web App
az webapp create --name ${Web} \
  --resource-group ${ResourceGroup} \
  --plan ${Plan} \
        -ojsonc

# Configure local Git and get deployment URL
GIT_URL=$(az webapp deployment source config-local-git \
  --name ${Web} \
  --resource-group ${ResourceGroup} \
  --query url --output tsv)

git clone ${GIT_URL} dist
npm run build
cd dist
git add -A
git commit -m "Release"
git remote add azure ${GIT_URL} master
```
