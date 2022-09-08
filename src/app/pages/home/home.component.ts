import { Component, OnInit } from "@angular/core";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { LikeModel } from "src/app/models/like.model";
import { TweetModel } from "src/app/models/tweet.model";
import { ApiService } from "src/app/services/api-service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})

export class HomeComponent implements OnInit {
    constructor(private api: ApiService) { }

    public tweetForm: FormGroup = new FormGroup({
        content: new FormControl('')
    })

    public tweetFeed: TweetModel[] = [];

    public feedLoading: boolean = true;

    public tweetLoading: boolean = false;

    public tweetIsValid: boolean = false;


    ngOnInit(): void {
        this.fetchFeed();
    }

    public tweetContentChange(): void {
        if (this.tweetForm.value.content) {
            this.tweetIsValid = true;
        } else {
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

    public fetchFeed(): void {
        this.feedLoading = true;
        this.api.get<TweetModel[]>('feed').then((res) => {
            this.tweetFeed = res;
            this.feedLoading = false;
        }).catch((err) => {
            this.feedLoading = false;
            alert(err.error)
        })
    }


    // public checkLikedTweet(tweetId: number): boolean {
    //     return this.likedTweets.find((like) => like.post_id === tweetId) ? true : false;
    // }

    // public addLikeTweetToLikedTweets(tweetId: number): void {
    //     const data = { post_id: tweetId }

    //     this.likedTweets.push(data)

    //     let tempTweet = this.tweetFeed.find((tweet) => tweet.id === tweetId);

    //     if (tempTweet) {
    //         tempTweet.likes += 1;
    //     }

    //     this.api.post('likes', data).catch((err) => {
    //         alert(err.error)
    //     })
    // }
}