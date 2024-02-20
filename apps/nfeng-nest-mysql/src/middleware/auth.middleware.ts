import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Config } from 'src/config/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: any, res: any, next: () => void) {
    const pathname = req.baseUrl; // 获取访问的地址
    const userInfo = req.session && req.session.userInfo;
    if (userInfo && userInfo.username) {
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
        pathname == `/${Config.adminPath}/user/login` ||
        pathname == `/${Config.adminPath}/login/code` ||
        pathname == `/${Config.adminPath}/doLogin`
      ) {
        next();
      } else {
        throw new UnauthorizedException({ code: 401, msg: '401 Unauthorized' });
      }
    }
  }
}
