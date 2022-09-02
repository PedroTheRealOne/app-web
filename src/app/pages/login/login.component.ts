import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api-service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Modal } from "bootstrap";
import { AuthService } from "src/app/services/auth.service";
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})

export class LoginComponent implements OnInit {
    constructor(private api: ApiService, private router: Router, private authService: AuthService) { }

    public modal!: Modal;

    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    public loginLoading: boolean = false;

    public signup(): void {
        this.modal.show();
        // document.querySelector('.modal-backdrop:last-child').classList.add('modal-backdrop-alert-z-index');
    }

    public login(): void {
        if (this.form.valid) {

            this.loginLoading = true;

            const data = {
                email: this.form.value.email,
                password: this.form.value.password
            }

            this.api.post<any>('sessions', data).then((res) => {
                this.authService.token = res.token
                this.loginLoading = false;
                this.router.navigate([''])
            }).catch((err) => {
                this.loginLoading = false;
                alert(err.error)
            })
        }
    }

    ngOnInit(): void {
        this.modal = new Modal(document.getElementById("modalTest") as HTMLElement)
    }
}
