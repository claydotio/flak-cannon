# Start from Node.js image
FROM dockerfile/nodejs:latest

# Install Git
RUN apt-get install -y git

# Copy source
ADD . /opt/flak-cannon

# Set directory
WORKDIR /opt/flak-cannon

# Install deps
RUN npm install

CMD ["npm", "start"]
