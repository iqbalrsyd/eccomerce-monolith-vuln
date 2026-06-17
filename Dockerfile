# Intentionally vulnerable Dockerfile for testing
FROM node:14

WORKDIR /app

# Copy everything including .env with secrets
COPY . .

RUN npm install

# Run as root (bad practice)
USER root

EXPOSE 3000

CMD ["npm", "start"]
