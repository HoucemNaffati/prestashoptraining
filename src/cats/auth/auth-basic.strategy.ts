import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (
    _: unknown,
    username: string,
    password: string,
  ): Promise<boolean> => {
    if (
      this.configService.get<string>('HTTP_BASIC_USER') === username &&
      this.configService.get<string>('HTTP_BASIC_PASS') === password
    ) {
      return true;
    }
    Logger.warn(
      `failed to authenticate user ${username} with password ${password}`,
      BasicStrategy.name,
    );
    throw new UnauthorizedException();
  };
}
