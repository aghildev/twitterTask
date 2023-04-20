import React, { useState, useEffect, useCallback } from 'react'
import Navbar from './Navbar'
import { baseUrl } from "../utils/config";
import { useFetch } from '../utils/hooks/useFetch';
import styles from "./styles/HomepageBody.module.css"
import Shimmer from './Shimmer';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

const HomepageBody = () => {
  const { data, isPending, setData } = useFetch(`${baseUrl}/tweet/all`);
  const navigate = useNavigate()
  const profilePicPlaceholder = "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=50";
  const [tweetText, setTweetText] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const { username, password } = useSelector((state) => state.auth)


//*********Navigate to Login Page When You Refresh */

  useEffect(() => {
    if (!username || !password) {
     navigate('/');
    }
  }, [ username, password]);

  // ********************POST Request for the Tweet**************************

  const handlePostTweet = useCallback(async () => {
    try {
      const headers = new Headers();
      headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
      headers.set('Content-Type', 'application/json');
      headers.set('Access-Control-Allow-Origin', '*');
      const response = await fetch(`${baseUrl}/tweet/new`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ tweet: tweetText }),
      });

      if (!response.ok) {
        throw new Error('Failed to post tweet');
      }
      setTweetText('');
      const newTweet = await response.json();
      const updatedTweet = { ...newTweet, author: { ...newTweet.author, username } };
      setData(prevData => [updatedTweet, ...prevData]);


      console.log('Tweet posted successfully');
    } catch (error) {
      console.error(error);
    }
  }, [setData, tweetText, username, password]);

  //***************************Sorting of the Tweets************************ */

  const handleSortToggle = useCallback(() => {
    setSortOrder(sortOrder === 'latest' ? 'oldest' : 'latest');
  }, [setSortOrder, sortOrder]);

  const sortedData = data && data.slice().sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <div>
      <Navbar />
      <div className={styles.postTweetContainer}>
        <input
          className={styles.postTweetInput}
          type="text"
          placeholder="What's happening?"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />
        <button className={styles.postTweetButton} onClick={handlePostTweet}>Post</button>
        <button className={styles.sortButton} onClick={handleSortToggle}>Sort Tweets</button>
      </div>
      {isPending && <Shimmer />}
      {sortedData && sortedData.map((tweet) => {
        const { author, id, tweet: tweetText, createdAt } = tweet;
        console.log(tweet)
        return (
          <div key={id} className={styles.tweet}>
            <img
              className={styles.profilePic}
              src={profilePicPlaceholder}
              alt="Profile Pic"
            />
            <div className={styles.tweetContent}>
              <div className={styles.header}>
                <span className={styles.username}>{author?.username.toUpperCase()}</span>
                <span className={styles.timestamp}>{new Date(createdAt).toLocaleString()}</span>
              </div>
              <div className={styles.tweetText}>{tweetText}</div>
            </div>
          </div>
        );
      })}

    </div>
  )
}

export default HomepageBody;

