import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DbModule } from '@app/db';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ToolsService } from 'libs/tools/tools.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
          signOptions: { expiresIn: '8h' }, // token 过期时效
        };
      },
    }),
    DbModule,
  ],
  providers: [CommonService, ToolsService],
  exports: [CommonService, JwtModule, ToolsService],
})
export class CommonModule {}
