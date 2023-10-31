FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --only=production \
COPY .env.local ./
EXPOSE ${PORT}
CMD ["node", "dist/main"]
