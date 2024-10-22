import styles from '../styles/components/Sidebar.module.scss';
import MainNav from '../components/MainNav';
// import Progress from '../ui/Progress';
// import ProgressContainer from '../ui/ProgressContainer';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <MainNav />
      {/* <ProgressContainer /> */}
    </aside>
  );
};

export default Sidebar;