import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Config } from '../config/config';
import { Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: any, next: () => void) {
    console.log('res: ', res);
    console.log('req: ', req);
    const pathname = req.baseUrl; // 获取访问的地址
    const userInfo = req.user;
    if (userInfo) {
      // 设置全局变量
      res.locals.userInfo = userInfo;
      // 接口权限判断
      const hasAuth = await this.authService.checkAuth(req);
      if (hasAuth) {
        next();
      } else {
        throw new ForbiddenException({ code: 403, msg: 'Forbidden' });
      }
    } else {
      // 排除不需要做权限判断的页面
      if (
        pathname == `/${Config.adminPath}/auth/login` ||
        pathname == `/${Config.adminPath}/auth/profile`
      ) {
        next();
      } else {
        throw new UnauthorizedException({ code: 401, msg: '401 Unauthorized' });
      }
    }
  }
}
