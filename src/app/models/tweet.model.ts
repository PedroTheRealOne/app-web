import { UserTweetModel } from "./user.model";

export interface TweetModel {
    id: number;
    content: string;
    posted_at: string;
    user: UserTweetModel;
    likes: number;
    liked: boolean;
}