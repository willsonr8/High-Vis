# Base image
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat xdg-utils
WORKDIR /app

# Install dependencies based on the preferred package manager
# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy all files
COPY . .

# Install Storybook
RUN npm install @storybook/react @storybook/addon-essentials @storybook/addon-links --save-dev

# Expose the port for Storybook
EXPOSE 6006

# Set environment variables for Storybook
ENV PORT 6006
ENV HOSTNAME "0.0.0.0"
ENV NODE_ENV=development

# Command to run Storybook
CMD ["npm", "run", "storybook"]
