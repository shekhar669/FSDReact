import React, { useState ,setState,useEffect,useCallback} from 'react';
import classes from './../css/Tweet.module.css';
import { NavLink } from 'react-router-dom';
import Reply from './Reply';
import Replies from './Replies';
import config from "../config";

const Tweet = (props) => {
const[showCompFlag,setShowCompFlag] = useState(false);
const [error, setError] = useState(null);
const [count, setCount] = useState(0);
let crtDate=new Date(props.postdate);
let dateMDY = `${crtDate.getDate()}-${crtDate.getMonth() + 1}-${crtDate.getFullYear()}`;
 
console.log('tweet-ID'+ props.id);
console.log(props.likes);

 const onButtonClick =()=>{
     setShowCompFlag(true);
    }

  const handleDataFromReply=(data)=>{
     setShowCompFlag(data);
    }

  const onClickHandler = () => {
     setCount(prevCount => {
      const newCount = Number(prevCount) + 1;
      sessionStorage.setItem("count"+props.id, newCount);
      return newCount;
    });

    console.log(sessionStorage.getItem("count"+props.id));
    updateLikesHandler();
  }

  const updateLikesHandler = useCallback(async () => {
    let likeCount=sessionStorage.getItem("count"+props.id)?sessionStorage.getItem("count"+props.id):0;
    setError(null);
    try {
      const response = await fetch(config.baseUrl.concat(`/${props.id}/likes?likes=${likeCount}`));
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log('likes updated in db');
    } catch (error) {
      setError(error.message);
    }
   
  }, []);

  useEffect(() => {
    console.log('calling useeffect');
    const initialValue = sessionStorage.getItem("count"+props.id);
    if (initialValue) setCount(initialValue);
    updateLikesHandler();
  }, [updateLikesHandler]);
   
  return (
      <li className={classes.tweet}>
      <img src="https://gravatar.com/avatar/c420358d40816f4a3d2c8bcff93a0fc7?s=400&d=robohash&r=x" alt="profile image" width="50" height="50"/>
      <h3>Posted On : {dateMDY}</h3>
      <h3> Name : {props.fromUser}</h3>
      <p>{props.message}</p>
      <button onClick={onButtonClick}>Reply</button><button onClick={onClickHandler}>likes {sessionStorage.getItem("count"+props.id)}</button>
      {
           showCompFlag ?
           <Reply tweetId={props.id} showCompFlag={showCompFlag} handleData={handleDataFromReply}/> :
           <Replies tweetId={props.id}/>
      } 
    </li>
  );
};

export default Tweet;