import Tweet from "./Tweet";
import {memo} from "react";
import '../CSS/TweetList.css';


const MemoisedTweet = memo(Tweet); 

function TweetList({tweets, onEditTweet, onDeleteTweet}){
    return(
        <ul className="tweet-list">
            {
                tweets.map((tweet) => (
                    <li className="tweet-item-wrapper" key={tweet.id}>
                        <MemoisedTweet 
                            tweetId ={tweet.id}
                            content={tweet.content} 
                            likeCount={tweet.likeCount} 
                            createdAt={tweet.createdAt.toString()}
                            onEdit = {onEditTweet}
                            onDelete={onDeleteTweet} 
                        />
                    </li>
                ))
            }
        </ul>
    )
}

export default TweetList;


