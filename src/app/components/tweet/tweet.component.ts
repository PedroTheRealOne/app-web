import { Component, Input } from "@angular/core";
import { TweetModel } from "src/app/models/tweet.model";

@Component({
    selector: "app-tweet",
    templateUrl: "./tweet.component.html",
    styleUrls: ["./tweet.component.scss"]
})

export class TweetComponent {
    constructor() { }

    @Input() tweet!: TweetModel;
}