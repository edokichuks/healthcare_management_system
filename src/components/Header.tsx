import { HiLogout } from "react-icons/hi";
import styled from "styled-components"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineBars2, HiOutlineUser } from "react-icons/hi2";
// import Logout from "../authentication/Logout";
import Logout from './Logout';

import userIcon from '../assets/headers/userIcon.svg'
import logo from '../assets/headers/logo.svg';

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


function Header() {
  const [fake, setFake] = useState();
  const [open, setIsOpen] = useState(false);

  // const updateName = useStore((store)=>store.updateName)
  // const updateAge = useStore((store)=>store.updateAge)
  // const updateGender = useStore((store)=>store.updateGender)
  // const userId = useStore((store)=>store.userId)
  // const updateUserId = useStore((store)=>store.updateUserId)
  // const navigate = useNavigate();
  // const isOpen = useStore((state)=>state.isOpen)
  // const updateIsOpen = useStore((state)=>state.updateIsOpen)
  // const updateFakeRender = useStore((state)=>state.updateFakeRender)



//i believe this is what causes the issue of displaying id even when logged out
  const userIdentity = localStorage.getItem("userIdentity")

  function handleLogout() {
    // updateName("");
    // updateAge("");
    // updateGender("");
    // updateUserId("")
    // localStorage.removeItem("userIdentity")
    // setFake((fake)=>fake+1)
    // navigate("/", {replace: true})
    // updateFakeRender()
  }

  const toggleSidebar =  (open) => {
    setIsOpen((open)=>!open);
    updateIsOpen(open)
  };


  return (
    <StyleHeader>
      {/* <div>{userId? `id: ${userId || userIdentity}` : `${userIdentity || ""}`}</div> */}
      <ToggleButton onClick={toggleSidebar}>
        <HiOutlineBars2 />
      </ToggleButton>
      {/* <h5><HiOutlineUser /> {userId || userIdentity}</h5> */}
      {/* <img src={logo} alt="logo" /> */}
      <h1>iClinic</h1>

      {/* <LogoutButton onClick={handleLogout} userIdentity={userIdentity}> */}
      <Logout />
    </StyleHeader>
  )
}

export default Header