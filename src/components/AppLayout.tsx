import { Outlet } from 'react-router-dom';
import styles from '../styles/components/AppLayout.module.scss';
import Sidebar from '../Sidebar/Sidebar';
import  Header from './Header';
// import Header from '../Header/Header';
// import Sidebar from '../Sidebar/Sidebar';

const AppLayout = () => {
  
  return (
    // <div>
    <>
        <Header />
        <div className={styles.layout}>
          <div className={styles.layout__sidebar}>
            <Sidebar />
          </div>
          <main className={styles.layout__main}>
            <div className={styles.layout__main__container}>
              <Outlet />
            </div>
          </main>
        </div>
    </>
    
  );
};

export default AppLayout;
