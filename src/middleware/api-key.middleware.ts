import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== 'secret') {
      throw new UnauthorizedException('Invalid API key');
    }
    next();
  }
}
