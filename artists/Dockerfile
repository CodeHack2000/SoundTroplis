FROM node:18

# Working Dir
WORKDIR /usr/src/artistService

# Copy Package Json
COPY package*.json ./

# Install Files
RUN npm install

# Copy Source Files
COPY . .

# Expose
EXPOSE 5100

CMD ["node", "index.js"]