FROM node:18

# Working Dir
WORKDIR /usr/src/clientService

# Copy Package Json
COPY package*.json ./

# Install Files
RUN npm install

# Copy Source Files
COPY . .

# Expose
EXPOSE 3000

CMD ["npm", "start"]