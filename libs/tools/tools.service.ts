import { Injectable } from '@nestjs/common';
import * as md5 from 'md5'; // MD5加密
import COS = require('cos-nodejs-sdk-v5');
import { format } from 'silly-datetime';
// import path from 'path';
import svgCaptcha = require('svg-captcha');
import { image } from 'qr-image';
// import { Image, createCanvas } from 'canvas';

@Injectable()
export class ToolsService {
  async getCaptcha() {
    //生成图形验证码
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 120,
      height: 32,
      background: '#cc9966',
    });

    return captcha;
  }

  getMd5(str: string) {
    return md5(str);
  }

  getUnixTime() {
    const dObj = new Date();
    return Math.ceil(dObj.getTime() / 1000);
  }

  getCosUploadFile(filename) {
    //1、获取当前日期 20210920
    const dir = format(new Date(), 'YYYYMMDD');

    //2、生成文件名称  获取文件保存的目录   以前的文件 serverless_600x900.png    20210920.png
    // const d = this.getUnixTime();

    //  20210920/4124215212.png
    //20210412/1618196478.826.png
    // const saveDir = dir + '/' + d + path.extname(filename);
    const saveDir = dir + '/' + filename;
    return saveDir;
  }

  async uploadCos(filename, body) {
    const cos = new COS({
      SecretId: process.env.SecretId,
      SecretKey: process.env.SecretKey,
    });

    return new Promise((reslove, reject) => {
      cos.putObject(
        {
          Bucket: 'nfeng-1257981287' /* 必须 */,
          Region: 'ap-guangzhou' /* 必须 */,
          Key: filename /* 必须 */,
          StorageClass: 'STANDARD',
          Body: body, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          },
          Headers: {
            'Content-Disposition': 'inline',
          },
          ACL: 'public-read',
        },
        function (err, data) {
          if (!err) {
            reslove(data);
          } else {
            reject(err);
          }
        },
      );
    });
  }

  //获取图形二维码
  async getQrImage(qrText) {
    return new Promise((reslove, reject) => {
      try {
        const qrImage = image(qrText, { type: 'png' });
        reslove(qrImage);
      } catch (error) {
        reject(false);
      }
    });
  }

  //合成图片
  // async getCanvasImage(text, bgDir, codeDir) {
  //   return new Promise((reslove, reject) => {
  //     try {
  //       const canvas = createCanvas(505, 730);
  //       const ctx = canvas.getContext('2d');

  //       //绘制背景图片
  //       const img1 = new Image();
  //       img1.onload = () => {
  //         ctx.drawImage(img1, 0, 0);
  //         //填充文字  注意字体
  //         ctx.font = '30px "Microsoft YaHei"';
  //         ctx.fillStyle = '#ffffff';
  //         ctx.fillText(text, 170, 320);

  //         const img2: any = new Image();
  //         img2.onload = () => {
  //           ctx.drawImage(img2, 150, 340);

  //           // canvas.createPNGStream().pipe(fs.createWriteStream("out.png"));

  //           reslove(canvas.createPNGStream());
  //         };
  //         img2.onerror = (err) => {
  //           //  throw err
  //           reject(err);
  //         };
  //         //需要注意顺序
  //         img2.src = codeDir;
  //       };
  //       img1.onerror = (err) => {
  //         reject(err);
  //       };
  //       //需要注意顺序
  //       img1.src = bgDir;
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }

  //获取订单号
  getOrderId() {
    const order_id = format(new Date(), 'YYYYMMDDHHmmss');
    const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let randomStr = '';
    for (let i = 0; i < 6; i++) {
      randomStr += numArr[Math.floor(Math.random() * 10)];
    }
    return order_id + randomStr; /*字符串的拼接*/
  }
}
