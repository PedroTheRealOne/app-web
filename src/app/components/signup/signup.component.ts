import { Component, OnInit } from "@angular/core";
import { Modal } from "bootstrap";

@Component({
    selector: "app-signup-component",
    templateUrl: "./signup.component.html",
})

export class SignupComponent implements OnInit{
    constructor() { }

    public modal!: Modal;

    ngOnInit() {

    }
}