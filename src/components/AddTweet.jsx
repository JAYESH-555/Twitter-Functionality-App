import { useState } from "react";
import '../CSS/AddTweet.css'


function AddTweet({ onAddTweet, onSortTweets }){
    const [text, setText] = useState("");
    const charLimit = 280;
    return(
        <>
            <div className="container">
                <div className="title">
                    <h1>Twitter</h1>
                </div>
                <div className="tweet-input-actions">
                    <input className="input"
                        placeholder="What's happening?"
                        maxLength={charLimit} // Set character limit
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className="tweet-btn" onClick={() => {
                        onAddTweet(text);
                        setText('');
                    }}>
                        Tweet
                    </button>
                    <button className="sort-btn" onClick={onSortTweets}>
                        See New Tweets
                    </button>
                </div> 
            </div>
        </>    
    );
}


export default AddTweet;