FROM node:22 AS build
WORKDIR /app
COPY package*.json ./

COPY . .
RUN npm install
RUN npm install -g @angular/cli
RUN npm run build --configuration=production


FROM nginx:alpine
COPY --from=build /app/dist/web-frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
