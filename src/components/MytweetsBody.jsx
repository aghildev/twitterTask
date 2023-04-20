import React, { useState,useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../utils/config";
import { useFetch } from '../utils/hooks/useFetch';
import { useSelector } from "react-redux"
import Shimmer from './Shimmer';
import styles from "./styles/HomepageBody.module.css"


const MytweetsBody = () => {
  const [deleteAction, setDeleteAction] = useState(false);
  const { data, isPending } = useFetch(`${baseUrl}/tweet/my-all`,deleteAction);
  const profilePicPlaceholder =  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=50";
  const navigate = useNavigate()
  const { username, password } = useSelector((state) => state.auth)
  const [sortOrder, setSortOrder] = useState('latest');

  //*********Navigate to Login Page When You Refresh */
  useEffect(() => {
    if (!username || !password) {
     navigate('/');
    }
  }, [ username, password]);

  //***********************Deleting The  Tweet ************************ */

  const handleDeleteTweet = async (id) => {
    try {
      const headers = new Headers();
      headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
      headers.set('Content-Type', 'application/json');
      headers.set('Access-Control-Allow-Origin', '*');
      const response = await fetch(`${baseUrl}/tweet/${id}`, {
        method: 'DELETE',
        headers: headers
      });
  
      if (!response.ok) {
        throw new Error('Failed to Delete');
      }
    
      console.log('Tweet Deleted successfully');
      setDeleteAction(!deleteAction); 
   
    } catch (error) {
      console.error(error);
    }
  };
  
  //**************************Sorting Of The Tweeet*************** */

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'latest' ? 'oldest' : 'latest');
  };
  
  const sortedData = data && data.slice().sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });
  
  return (
    <>
      <Navbar/>
      <h1 style = {{textAlign: 'center',color:"#1da1f2",marginBottom:"10px"}}>Tweets Made By {username.toUpperCase()}</h1>
      <button className={styles.sortButton} onClick={handleSortToggle} style={{display: 'block', margin: '0 auto'}}>Sort Tweets</button>
      {isPending && <Shimmer/>}
  
      {sortedData &&  sortedData.length > 0 ? (
        sortedData.map((tweet) => {
          const { author, id, tweet: tweetText, createdAt } = tweet;
          return (
            <div key={id} className={styles.tweet}>
              <img
                className={styles.profilePic}
                src={profilePicPlaceholder}
                alt="Profile Pic"
              />
              <div className={styles.tweetContent}>
                <div className={styles.header}>
                  <span className={styles.username}>{author.username.toUpperCase()}</span>
                  <span className={styles.timestamp}>{new Date(createdAt).toLocaleString()}</span>
                </div>
                <div className={styles.tweetText}>{tweetText}</div>
              </div>
              <button className={styles.deleteButton} style={{marginLeft:"50px"}}onClick={() => handleDeleteTweet(id)}>Delete</button>
            </div>
          )
        })
      ) : (
        <div style ={{textAlign:"center",color:"red",fontWeight:"bold",fontSize:"24px"}}>No tweets found Please Post Some...</div>
      )}
    </>
  )
}

export default MytweetsBody;




