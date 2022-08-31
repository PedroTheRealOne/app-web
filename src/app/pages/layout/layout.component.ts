import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.scss"]
})

export class LayoutComponent{
    constructor(private authService: AuthService, private router: Router) { }

    public logout(): void{
        this.authService.clear();
        this.router.navigate(['/login'])
    }
}
