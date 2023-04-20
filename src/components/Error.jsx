import React from 'react';
import styles from './styles/ErrorPage.module.css';
import image from '../assets/error_img.jpeg';

export default function Error(){
    return(
        <div>
            <h1 className={styles.ErrorPage_heading}>Page not found: The page you are looking for doesn't exsist.</h1>
            <div className={styles.ErrorImageContainer}>
            <img src={image} className={styles.error_image}/>
            </div>
        </div>
    )
}