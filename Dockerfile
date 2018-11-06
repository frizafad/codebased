FROM telkomindonesia/alpine:nodejs-8.9.3


RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN chmod -R 775 uploads
RUN npm install
EXPOSE 9000

CMD ["npm", "start"]
