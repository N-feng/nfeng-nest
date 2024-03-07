import { Injectable } from '@nestjs/common';
import * as md5 from 'md5'; // MD5加密
import COS = require('cos-nodejs-sdk-v5');
import { format } from 'silly-datetime';
// import path from 'path';

@Injectable()
export class ToolsService {
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
}
