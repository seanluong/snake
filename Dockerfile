# Fetching the latest node image on apline linux
FROM node:alpine AS builder

# Install TypeScript
RUN npm install -g typescript

# Setting up the work directory
WORKDIR /app

# Copying all the files in our project & Installing dependencies
COPY . .
RUN npm install

# Building our application
RUN npm run build 

# # Fetching the latest nginx image
FROM nginx

# # Copying built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# # Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
