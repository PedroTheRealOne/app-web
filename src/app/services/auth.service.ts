import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private jwtHelper: JwtHelperService) { }

    public get token(): string {
        return localStorage.getItem('token') as string;
    }

    public set token(value: string) {
        localStorage.setItem('token', value);
    }

    public get isAuthenticated(): boolean {
        return !!this.token;
    }

    public clear(): void {
        localStorage.clear();
    }

    public get user(): any {
        return this.tokenPayload;
    }

    private get tokenPayload(): any {
        try {
            return this.jwtHelper.decodeToken(this.token);
        } catch (error) {
            return null;
        }
    }
}