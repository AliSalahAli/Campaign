import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isAppUp(): string {
    return 'App is up and running!';
  }
}
