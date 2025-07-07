FROM node:19-alpine3.15 as installer
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:19-alpine3.15 as runner
EXPOSE 3000
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/app.js"]
