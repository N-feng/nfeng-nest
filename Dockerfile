FROM node
COPY . /root/wwwroot/
WORKDIR /root/wwwroot/
EXPOSE 3001
RUN npm install
CMD npm run admin