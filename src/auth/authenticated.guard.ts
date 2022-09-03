import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { request } from "express";
import { Observable } from "rxjs";

@Injectable()

export class AuthenticatedGuard implements CanActivate {

    async canActivate(contex: ExecutionContext){

        const request = contex.switchToHttp().getRequest();
        return request.isAuthenticated();
    }
        
}
