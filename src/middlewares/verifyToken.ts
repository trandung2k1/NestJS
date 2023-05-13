import { HttpException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
interface IRequest extends Request {
    userId: string;
}
@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
    use(req: IRequest, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) {
            throw new HttpException("Token not found", 401);
        }
        else {
            const accessToken = token.split(" ")[1];
            jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
                (err, userId: string) => {
                    if (err) {
                        throw new UnauthorizedException();
                    }
                    req.userId = userId;
                    next();
                },
            );
        }

    }
}