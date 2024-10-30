
import styled from "styled-components"
import { useState } from "react";
import { HiOutlineBars2, HiOutlineUser } from "react-icons/hi2";
import Logout from './Logout';

const StyleHeader = styled.div`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
`

//For responsive sidebar




const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: 997;
`;

const ToggleButton = styled.button`
  @media (min-width: 640px) {
    display: none;
  }
`

const LogoutButton = styled.button`
  // display: ${({ userIdentity }) => (userIdentity ? 'block' : 'none')};
`

const SidebarNav = styled.nav`
  background: #1a1a1a;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  transition: left 0.3s ease-in-out;
  z-index: 998;
`;

const Name = styled.div`
  font-family: 'Comfortaa', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
`


function Header() {
  const [fake, setFake] = useState();
  const [open, setIsOpen] = useState(false);


//i believe this is what causes the issue of displaying id even when logged out
  const userIdentity = localStorage.getItem("userIdentity")


  const toggleSidebar =  (open) => {
    setIsOpen((open)=>!open);
    updateIsOpen(open)
  };


  return (
    <StyleHeader>
      <ToggleButton onClick={toggleSidebar}>
        <HiOutlineBars2 />
      </ToggleButton>
      <Name>iClinic</Name>
      <Logout />
    </StyleHeader>
  )
}

export default Header