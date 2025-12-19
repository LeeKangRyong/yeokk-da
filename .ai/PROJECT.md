# PROJECT - Project Settings Template

> ⚠️ **Do NOT commit actual values to Git**  
> Copy this file to `.ai/PROJECT.local.md` and fill in real values

## Repository

```
Repository: https://github.com/LeeKangRyong/yeokk-da
Branch: main
```

---

## Deployment

### Frontend (Netlify)
```
URL: https://yeokk-da.netlify.app
Build Command: npm run build
Publish Directory: .next
Node Version: 20
```

### Backend (Azure App Service)
```
Name: yeokk-da-backend
URL: https://yeokk-da-backend.azurewebsites.net
Runtime: Node 20 LTS
```

---

## Azure Resources

### Resource Group
```
Name: yeokk-da-rg
Region: Korea Central
Subscription: [FILL_IN_YOUR_SUBSCRIPTION_ID]
```

### Database (PostgreSQL)
```
Server: yeokk-da-db.postgres.database.azure.com
Database: yeokk_da
Port: 5432
Admin: [FILL_IN_USERNAME]
```

### Storage (Blob Storage)
```
Account: yeokkdastorage
Container: memories
Region: Korea Central
```

### Cache (Redis)
```
Name: yeokk-da-redis
Host: yeokk-da-redis.redis.cache.windows.net
Port: 6380
```

### Key Vault
```
Name: yeokk-da-keyvault
URL: https://yeokk-da-keyvault.vault.azure.net
```

---

## Environment Variables

### Frontend (Netlify)
```bash
NEXT_PUBLIC_API_URL=https://yeokk-da-backend.azurewebsites.net
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[FILL_IN]
NEXTAUTH_SECRET=[GENERATE_RANDOM_STRING]
NEXTAUTH_URL=https://yeokk-da.netlify.app
```

### Backend (Azure App Service)
```bash
# Database
DATABASE_URL=postgresql://[USER]:[PASSWORD]@yeokk-da-db.postgres.database.azure.com:5432/yeokk_da

# Redis
REDIS_URL=rediss://:[PASSWORD]@yeokk-da-redis.redis.cache.windows.net:6380

# Auth
GOOGLE_CLIENT_ID=[FILL_IN]
GOOGLE_CLIENT_SECRET=[FILL_IN]
JWT_SECRET=[GENERATE_RANDOM_STRING]

# External APIs
ANTHROPIC_API_KEY=sk-ant-[FILL_IN]
INSTAGRAM_CLIENT_ID=[FILL_IN]
INSTAGRAM_CLIENT_SECRET=[FILL_IN]
SPOTIFY_CLIENT_ID=[FILL_IN]
SPOTIFY_CLIENT_SECRET=[FILL_IN]
NOTION_CLIENT_ID=[FILL_IN]
NOTION_CLIENT_SECRET=[FILL_IN]
TWITTER_CLIENT_ID=[FILL_IN]
TWITTER_CLIENT_SECRET=[FILL_IN]

# Azure Storage
AZURE_STORAGE_CONNECTION_STRING=[FILL_IN]
AZURE_STORAGE_CONTAINER=memories

# App
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://yeokk-da.netlify.app
```

---

## OAuth Callback URLs

### Google
```
Authorized redirect URIs:
- https://yeokk-da.netlify.app/api/auth/callback/google
- http://localhost:3000/api/auth/callback/google (development)
```

### Instagram
```
Valid OAuth Redirect URIs:
- https://yeokk-da-backend.azurewebsites.net/api/integrations/instagram/callback
- http://localhost:3001/api/integrations/instagram/callback (development)
```

### Spotify
```
Redirect URIs:
- https://yeokk-da-backend.azurewebsites.net/api/integrations/spotify/callback
- http://localhost:3001/api/integrations/spotify/callback (development)
```

### Notion
```
Redirect URIs:
- https://yeokk-da-backend.azurewebsites.net/api/integrations/notion/callback
- http://localhost:3001/api/integrations/notion/callback (development)
```

### Twitter
```
Callback URLs:
- https://yeokk-da-backend.azurewebsites.net/api/integrations/twitter/callback
- http://localhost:3001/api/integrations/twitter/callback (development)
```

---

## CI/CD

### GitHub Actions Secrets

```
# Netlify (Frontend)
NETLIFY_AUTH_TOKEN=[FILL_IN]
NETLIFY_SITE_ID=[FILL_IN]

# Azure (Backend)
AZURE_WEBAPP_PUBLISH_PROFILE_BACKEND=[FILL_IN]

# Database
DATABASE_URL=[FILL_IN]

# Other
ANTHROPIC_API_KEY=[FILL_IN]
```

---

## DNS (Optional)

```
Custom Domain: yeokk-da.com (if purchased)
Netlify: yeokk-da.com → yeokk-da.netlify.app
Backend: api.yeokk-da.com → yeokk-da-backend.azurewebsites.net
```

---

## Setup Checklist

### Initial Setup
- [x] Create GitHub repository
- [x] Setup Netlify site
- [ ] Create Azure Resource Group
- [ ] Setup Azure App Service (Backend)
- [ ] Create PostgreSQL database
- [ ] Create Redis cache
- [ ] Create Blob Storage
- [ ] Create Key Vault

### OAuth Apps
- [ ] Google OAuth app
- [ ] Instagram app
- [ ] Spotify app
- [ ] Notion integration
- [ ] Twitter app

### Secrets & Keys
- [ ] Generate JWT secret
- [ ] Generate NextAuth secret
- [ ] Get Anthropic API key
- [ ] Configure Azure connection strings

### CI/CD
- [ ] Setup GitHub Actions
- [ ] Add Netlify deploy token
- [ ] Add Azure publish profile
- [ ] Test deployment pipeline

---

## How to Use

1. Copy this file:
   ```bash
   cp .ai/PROJECT.md .ai/PROJECT.local.md
   ```

2. Fill in all `[FILL_IN]` values in `PROJECT.local.md`

3. Never commit `PROJECT.local.md` to Git (it's in .gitignore)
