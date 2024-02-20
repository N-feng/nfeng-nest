import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ToolsService } from 'src/tools/tools.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
          signOptions: { expiresIn: '2 days' },
        };
      },
    }),
  ],
  providers: [JwtModule, AuthService, ToolsService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
