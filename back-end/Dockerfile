FROM node:18

WORKDIR /app

# Copiez d'abord les fichiers de dépendances pour profiter du cache Docker
COPY ../package.json ../package-lock.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers
COPY back-end/ ./

EXPOSE 8080

CMD ["npm", "start"]
