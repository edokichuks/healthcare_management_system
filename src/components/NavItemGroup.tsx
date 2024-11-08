import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/NavItemGroup.module.scss';
import useNavStore from '../store/NavStore';

interface NavItemGroupProps {
  icon: React.ReactElement;
  text: string;
  toRoute: string;
}

const NavItemGroup = ({ icon, text, toRoute }: NavItemGroupProps) => {
  const navigate = useNavigate();
  const setActiveSideNav = useNavStore((state) => state.setActiveSideNav);
  const activeSideNav = useNavStore((state) => state.activeSideNav);
//   const isCollapsed = useAppStore((state) => state.sidebarCollapsed);
  const isActive = activeSideNav === toRoute;

  const handleNavClick = () => {
    if (!toRoute) return;
    setActiveSideNav(toRoute);
    navigate(toRoute);
  };

  console.log(activeSideNav);


  return (
    <div
      className={`${isActive? styles.boxDark : styles.boxLight}`}
      onClick={handleNavClick}
    >
      <div className={`${isActive? styles.boxDark__inner : styles.boxLight__inner}`}>
        <div className={`${isActive? styles.boxDark__inner__image: styles.boxLight__inner__image}`}>
            {icon}
        </div>
        <div className={`${isActive? styles.boxDark__inner__text: styles.boxLight__inner__text}`}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default NavItemGroup;
