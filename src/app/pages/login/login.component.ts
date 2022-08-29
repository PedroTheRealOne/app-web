import { Component } from "@angular/core";
import { ApiService } from "src/app/services/api-service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})

export class LoginComponent {
    constructor(private api: ApiService, private router: Router) { }

    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    public onSubmit(): void {}
}
