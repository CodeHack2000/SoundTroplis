FROM node:18

# Working Dir
WORKDIR /usr/src/authService

# Copy Package Json
COPY package*.json ./

# Install Files
RUN npm install

# Copy Source Files
COPY . .

# Expose
EXPOSE 5000

CMD ["node", "index.js"]