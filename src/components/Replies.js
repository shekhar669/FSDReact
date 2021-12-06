import React, {useState,useEffect,useCallback } from 'react';
import {useHistory} from 'react-router-dom';
  
const Replies = (props) => {
const [relies, setReplies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

 const fetchReplyHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/api/v1.0/tweets/${props.tweetId}/replies/all`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setReplies(data);
      console.log('replies ' + JSON.stringify(data));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchReplyHandler();
  }, [fetchReplyHandler]);

return (
      <React.Fragment>
      <section>
        <div class="div-comp-replies">
        <table class="div-comp-reply">
                    <thead>
                        <tr>
                            
                            <th>Reply</th>
                            <th>FROM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {relies.map(item=> <tr key={item.id}>
                                    <td>{item.message}</td>
                                    <td>{item.fromUser}</td>
                                </tr>)}
                    </tbody>
                </table>
        </div>
        </section>
       </React.Fragment>
  );
};

export default Replies;