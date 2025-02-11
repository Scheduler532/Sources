import styles from './Banner.module.css';
import React, { useEffect } from 'react';

export const Banner = ({error,content,isOpen,setIsOpen}) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
              setIsOpen(false);
            }, 6000); 
            
            return () => clearTimeout(timer); 
          }
    }, [isOpen]);

    return (
        <div className={`${styles.container} ${isOpen ? styles.shown : ''}`}>
                <span className={styles.content} style={error ? {backgroundColor:"rgb(202, 124, 124)"} : {}}>{content}</span>
        </div>
    )
}