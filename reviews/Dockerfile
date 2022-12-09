FROM node:18

# Working Dir
WORKDIR /usr/src/reviewService

# Copy Package Json
COPY package*.json ./

# Install Files
RUN npm install

# Copy Source Files
COPY . .

# Expose
EXPOSE 5200

CMD ["node", "index.js"]