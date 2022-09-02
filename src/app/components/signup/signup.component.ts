import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Modal } from "bootstrap";
import { ApiService } from "src/app/services/api-service";

@Component({
    selector: "app-signup-component",
    templateUrl: "./signup.component.html",
})

export class SignupComponent{
    constructor(private api: ApiService, private router: Router) { }

    @Input() modalContext!: Modal;

    public loading: boolean = false;

    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        passwordConfirmation: new FormControl('', [Validators.required])
    })


    public signup(): void {
        if (this.form.valid) {
            this.loading = true;

            const data = {
                email: this.form.value.email,
                user_name: this.form.value.userName,
                password: this.form.value.password,
                password_confirmation: this.form.value.passwordConfirmation
            }

            this.api.post<any>('users', data).then((res) => {
                this.loading = false;
                this.modalContext.hide();
            }).catch((err) => {
                this.loading = false;
                alert(err.error)
            })
        }
    }
}