import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { Config } from '../../config/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const pathname = request.url;
    if (request.user && request.user.username) {
      const hasAuth = await this.authService.checkAuth(request);
      if (hasAuth) {
        return true;
      } else {
        throw new ForbiddenException({
          code: 403,
          msg: '您没有权限访问这个地址',
        });
      }
    } else {
      //排除权限判断的页面
      if (
        pathname == `/${Config.adminPath}/login` ||
        pathname == `/${Config.adminPath}/doLogin` ||
        pathname == `/${Config.adminPath}/login/captcha`
      ) {
        return true;
      } else {
        throw new ForbiddenException({ code: 403, msg: 'Forbidden' });
      }
    }
  }
}
