
import styles from '../styles/components/MainNav.module.scss';
import moneyIcon from '../assets/sidebars/moneyIcon';
import lensIcon from '../assets/sidebars/lensIcon';
import clockIcon from '../assets/sidebars/clockIcon';
import userIcon from '../assets/sidebars/userIcon';
import capsuleIcon from '../assets/sidebars/capsuleIcon';
import stethoscope from '../assets/sidebars/stethoscope';
import NavItemGroup from './NavItemGroup';
import { useAuth } from '../hooks/useAuth';

const fash = <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/groups.png" alt="groups"/>;


const MainNav = () => {

  const { role } = useAuth();

  return (
    <div className={styles.nav}>
      <NavItemGroup 
        icon={stethoscope}
        text="Home" 
        toRoute="home" 
        />

        <NavItemGroup 
          icon={userIcon}
          text="Profile" 
          toRoute="profile"
        />

        {/* <div className={styles.nav__divider}></div> */}

        {role==="doctor" && <NavItemGroup 
          icon={clockIcon}
          text="Schedule" 
          toRoute="nnnd" 
        />}

        {role==="doctor" && <NavItemGroup 
          icon={clockIcon}
          text="Fill Details" 
          toRoute="doctordetails" 
        />}
        
        {role==="patient" && <NavItemGroup 
          icon={lensIcon}
          text="Find doctors" 
          toRoute="doctors" 
        />}

        {role==="patient" && <NavItemGroup 
          icon={capsuleIcon}
          text="Prescription" 
          toRoute="prescription" 
        />}

        {role==="patient" && <NavItemGroup 
          icon={moneyIcon}
          text="Billings" 
          toRoute="billings" 
        />}

        {role==="patient" && <NavItemGroup 
          icon={clockIcon}
          text="Fill Details" 
          toRoute="patientdetails" 
        />}

      {/* <div className={styles.nav__buttonWrapper}>
      </div> */}
    </div>
  );
};

export default MainNav;
