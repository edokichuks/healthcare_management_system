import React from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from "../styles/components/Home.module.scss";

export const Home: React.FC = () => {
  const { user, role, userName } = useAuth();

  console.log(userName)
  


  // return (
  //   <div>
  //     <h1>Welcome to the Clinic App</h1>
  //     {user ? (
  //       <p>You are logged in as a {role}.</p>
  //     ) : (
  //       <p>Please log in or register to use the app.</p>
  //     )}
  //   </div>
  // );

  return (
  <div className={styles.cont}>
      <div className={styles.cont__welcome}>Welcome, {userName || "Udeh"}</div>
      <div className={styles.cont__data}>
          <div className={styles.cont__data__billing}>fghm</div>
          <div className={styles.cont__data__diagnosis}>vbnm</div>
      </div>
  </div>
  )
};