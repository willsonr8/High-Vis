# Base image
FROM node:alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "package-lock.json not found." && exit 1; \
  fi

# Copy all files
COPY . .

# Install Storybook
RUN npm install @storybook/react

# Expose the port for Storybook
EXPOSE 6006

# Set environment variables for Storybook
ENV PORT 6006
ENV HOSTNAME "0.0.0.0"

# Command to run Storybook
CMD ["npm", "run", "storybook"]
