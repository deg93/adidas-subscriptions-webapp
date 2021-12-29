#-----------------#
#   BUILD STAGE   #
#-----------------#

FROM node:16-alpine as build

WORKDIR /app

# Install dependencies
RUN npm install -g @angular/cli@13.1.2
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Copy application sources
COPY src src
COPY .browserslistrc .
COPY angular.json .
COPY karma.conf.js .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.spec.json .

# Build application
RUN ng build --configuration production


#-----------------------------#
#   NGINX PREPARATION STAGE   #
#-----------------------------#

FROM nginx:1.20.1-alpine
COPY --from=build /app/dist/adidas-subscriptions-webapp /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
