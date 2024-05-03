FROM node
COPY ./dist/apps /root/wwwroot/nfeng-nest-mysql
WORKDIR /root/wwwroot/nfeng-nest-mysql/apps/admin
RUN npm install
RUN npm install pm2 -g
EXPOSE 3000
CMD ["pm2-runtime", "main.js"]