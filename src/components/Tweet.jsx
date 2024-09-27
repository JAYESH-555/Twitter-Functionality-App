import { useState } from 'react';
import '../CSS/Tweet.css';
import { FaHeart, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons


function formatDate(date) {
    
    const validDate = new Date(date); 

    const day = validDate.getDate();
    const month = validDate.toLocaleString('en-US', { month: 'short' });
    const year = validDate.getFullYear();
    const hours = validDate.getHours().toString().padStart(2, '0');
    const minutes = validDate.getMinutes().toString().padStart(2, '0');

    
    const getOrdinalSuffix = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    };

    const formattedDay = `${day}${getOrdinalSuffix(day)}`;
    
    return `  ${formattedDay} ${month}, ${year} at ${hours}:${minutes}`;
}



function Tweet( {tweetId, content, likeCount, createdAt, onEdit, onDelete} ){
    const [isEditing, setIsEditing] = useState(false);

    const formattedDate = formatDate(createdAt);

    return(
        <div className="tweet-container">
            <div className='tweet-wrapper'>
                <div className="tweet-edit-wrapper">
                    <div className="tweet-content">
                        {(isEditing) ? (
                            <input
                                type="text"
                                value={content}
                                onChange={(e) => {
                                    onEdit({
                                        id: tweetId,
                                        content: e.target.value,
                                        likeCount:likeCount,
                                        createdAt:createdAt
                                    })
                                }}
                            />
                        ) : content}
                    </div>

                    <div className="edit-tweet">
                        <button onClick={() => setIsEditing(!isEditing)}>
                            {(isEditing) ? 'Save' : <FaEdit />} {/* Use the edit icon */}
                        </button>

                        
                        <FaTrash
                            style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
                            onClick={() => onDelete(tweetId)}
                        />
                    </div>
                </div>

                <div className="like-createdAt-wrapper">
                    <div className="likes">
                        <FaHeart style={{ marginRight: '5px' }} /> 
                        {likeCount} 
                    </div>

                    <div className="created-at">
                        {formattedDate}
                    </div>
                </div>    
            </div>
        </div>    
    )
}

export default Tweet;