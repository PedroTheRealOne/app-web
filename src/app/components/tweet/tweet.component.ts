import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TweetModel } from "src/app/models/tweet.model";
import { ApiService } from "src/app/services/api-service";

@Component({
    selector: "app-tweet",
    templateUrl: "./tweet.component.html",
    styleUrls: ["./tweet.component.scss"]
})

export class TweetComponent {
    constructor(private api: ApiService) { }

    @Input() tweet!: TweetModel;
    @Input() likedTweet: boolean = false;
    @Output() likeTweetEvent = new EventEmitter<number>();

    public likeTweet(): void {
        this.likeTweetEvent.emit(this.tweet.id);
    }
}