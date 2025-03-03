# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Create directory for certbot challenge
RUN mkdir -p /usr/share/nginx/html/.well-known/acme-challenge
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]