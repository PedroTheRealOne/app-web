import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Modal } from "bootstrap";
import { ApiService } from "src/app/services/api-service";

@Component({
    selector: "app-signup-component",
    templateUrl: "./signup.component.html",
})

export class SignupComponent implements OnInit{
    constructor(private api: ApiService, private router: Router) { }

    @Input() modalContext!: Modal;

    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        passwordConfirmation: new FormControl('', [Validators.required])
    })


    public signup(): void {
        if(this.form.valid) {
            const data = {
                email: this.form.value.email,
                user_name: `@${this.form.value.userName}`,
                password: this.form.value.password,
                password_confirmation: this.form.value.passwordConfirmation
            }

            this.api.post<any>('users', data).then((res) => {
                // this.modalContext.hide();
            }).catch((err) => {
                alert(err.error)
            })
        }
    }

    ngOnInit() {

    }
}