FROM node:8.9.3

ADD start.sh /tmp/
RUN chmod +x /tmp/start.sh
CMD ./tmp/start.sh
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN chmod -R 775 uploads
RUN npm install
EXPOSE 8080

CMD ["npm", "start"]
