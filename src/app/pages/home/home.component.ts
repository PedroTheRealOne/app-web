import { Component } from "@angular/core";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api-service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})

export class HomeComponent {
    constructor(private api: ApiService) { }

    public tweetForm: FormGroup = new FormGroup({
        content: new FormControl('')
    })

    public tweetLoading: boolean = false;

    public tweetIsValid: boolean = false;

    public tweetContentChange(): void{
        if(this.tweetForm.value.content){
            this.tweetIsValid = true;
        } else{
            this.tweetIsValid = false;
        }
    }

    public tweet(): void {
        if (this.tweetForm.valid) {
            this.tweetLoading = true;
            const data = {
                content: this.tweetForm.value.content
            }
            this.api.post<any>('posts', data).then((_) => { 
                this.tweetLoading = false;
            }).catch((err) => {
                this.tweetLoading = false;
                alert(err.error)
            })
        }
    }
}