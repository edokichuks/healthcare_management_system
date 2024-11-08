import React from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from "../styles/components/Home.module.scss";
import PatientChart from '@/components/PatientChart';

export const Home: React.FC = () => {
  const { user, role, userName } = useAuth();

  console.log(userName)
  
  return (
  <div className={styles.cont}>
      <div className={styles.cont__welcome}>Welcome, {userName || ""}</div>
      <div className={styles.cont__data}>
          <div className={styles.cont__data__billing}>
            <PatientChart />
          </div>
          <div className={styles.cont__data__diagnosis}>vbnm</div>
      </div>
  </div>
  )
};