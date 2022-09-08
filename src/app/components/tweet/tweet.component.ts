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

    public likeTweet(): void {
        this.tweet.liked = !this.tweet.liked;

        if (this.tweet.liked) {
            this.tweet.likes++;
            this.api.post('likes', { post_id: this.tweet.id }).catch((err) => { })
        } else {
            this.tweet.likes--;
        }
    }
}