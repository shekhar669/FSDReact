import React, { useState,useEffect,useCallback } from 'react';
import {useHistory} from 'react-router-dom';
import TweetList from './TweetList';
import config from "../config";
import profileImage from './../img/profileImage.jpg'
 
const AddTweet = (props) =>{
  const history =useHistory();
  const[tweet,setTweet] = useState({message: '', fromUser: ''});
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // handle button click of login form
   const saveForm = e =>{
        e.preventDefault();
        if(sessionStorage.getItem('user-info')){
           let usr=JSON.parse(sessionStorage.getItem('user-info'));
	       tweet.fromUser=usr.loginId;
           console.log(usr.loginId  + ''+ JSON.stringify(tweet));
        }else{
            alert('Please login first to add tweet!')
        }
        console.log(tweet);
        // save the tweet in api
        fetch(config.baseUrl.concat('/add'),{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tweet)
        })
        .then(res=> res.json())
        .then(res=> {
            setTweet(res);
            alert('tweet created successfully!')
            fetchTweetHandler();
        })
        .catch(err=> console.error(err))
    }


    const fetchTweetHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(config.baseUrl.concat('/all'));
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      let dataJson=JSON.stringify(data);
      console.log('backend tweet... '+ dataJson);

      const transformedTweets = data.map((tweetData) => {
        return {
          id: tweetData.id,
          fromUser: tweetData.fromUser,
          message: tweetData.message,
          postdate: tweetData.createDate,
          likes: tweetData.likes
        };
      });
      setTweets(transformedTweets);
      console.log('transformedTweets '+ JSON.stringify(transformedTweets));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTweetHandler();
  }, [fetchTweetHandler]);

  
  let content = <p>Found no tweets.</p>;

  if (sessionStorage.getItem('user-info') && tweets.length > 0) {
    content = <TweetList tweets={tweets} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

   return <React.Fragment>
      <section>
        <form onSubmit={saveForm}>
         <div>
         <img src={profileImage} alt="profile image" width="50" height="50"/>
         </div>
        <div class="div-comp"> 
        <label className="label">Tweet</label>
        <br></br>
        <textarea rows="10" cols="50" name="message" onChange={e=> setTweet({...tweet,message: e.target.value})} />
        <br></br>
        <input type="submit" name="submit" value="submit" />
        </div>
        </form>
      </section>
      <section>{content}</section>
    </React.Fragment>
 
}
  
export default AddTweet;