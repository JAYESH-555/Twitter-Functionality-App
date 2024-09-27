import TweetList from "./TweetList";
import AddTweet from "./AddTweet";
import { memo, useCallback, useState } from "react";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 


function getRandomDate() {
    const start = new Date(2021, 0, 1); 
    const end = new Date(); 
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate;
}


const initialDummyTweets = [
    {
      id: 0,
      content: "Excited to start using Twitter! 🎉",
      likeCount: Math.floor(Math.random() * 500), 
      createdAt: getRandomDate(),
    },
    {
      id: 1,
      content: "Why did Elon Musk rename Twitter to X? 🤔",
      likeCount: Math.floor(Math.random() * 500),
      createdAt: getRandomDate(),
    },
    {
      id: 2,
      content: "Who watched last night's game? It was incredible!🏏",
      likeCount: Math.floor(Math.random() * 500),
      createdAt: getRandomDate(),
    },
];
  

const MemoisedAddTweet = memo(AddTweet);

function Twitter(){
    const [tweets, setTweets] = useState(initialDummyTweets);

    const handleAddTweets = useCallback((text) =>{
        if (text.trim() === '') {
            toast.error("Tweet cannot be empty!"); 
            return;
        }

        let nextID = (tweets.length > 0) ? tweets[tweets.length - 1].id+1 : 0; 
        setTweets([...tweets, {
            content: text,
            likeCount: Math.floor(Math.random()*10), 
            id: nextID,
            createdAt: new Date()
        }]);

        toast.success("Tweet added successfully!"); 
    }, [tweets]);

    const handleEditTweet = useCallback((tweet) => { 
        setTweets(
            tweets.map((currentTweet) => {
                if(currentTweet.id === tweet.id){
                    return tweet;
                }else{
                    return currentTweet;
                }
            })
        );
    }, [tweets]);
    

    const handleDeleteTweet = useCallback((tweetId) => {
        setTweets(tweets.filter((tweet) => tweet.id !== tweetId)); 
        toast.success("Tweet deleted successfully!");
    }, [tweets]);

    const sortTweets = useCallback(() =>{
        
        tweets.sort((t1, t2) => t2.createdAt.getTime() - t1.createdAt.getTime());
        setTweets([...tweets]);
    }, [tweets]);

    return(
        <>
            
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                draggable
            />

            <MemoisedAddTweet onAddTweet={handleAddTweets} onSortTweets ={sortTweets}/>
            <TweetList tweets={tweets} onEditTweet ={handleEditTweet} onDeleteTweet={handleDeleteTweet}/>
        </>
    );
}


export default Twitter;

