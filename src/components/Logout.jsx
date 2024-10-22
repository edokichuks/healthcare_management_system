import { getAuth, signOut } from "firebase/auth";
// import useStore from "../store";
// import { useAuth } from "../services/useAuth";
import Button from "./Button";
import toast from "react-hot-toast";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";

function Logout() {
    // const updateUser = useStore((state)=>state.updateUser);
    // const updateFakeRender = useStore((state)=>state.updateFakeRender);

  // const { isLoggingOut } = useAuth();

    // async function handleLogout() {
    //     try {
    //       const auth = getAuth();
    //       await signOut(auth);
    //       updateUser("")
    //       localStorage.removeItem("userSignedIn")
    //       updateFakeRender();
    //       alert("Signed out")
    //     } catch(err) {
    //       alert(err)
    //     }
    //   }

    async function handleLogout() {
        try {
          const auth = getAuth();
          await signOut(auth);
          // updateUser("")
          // localStorage.removeItem("userSignedIn")
          // updateFakeRender();
          toast.success("Signed out successfully")
        } catch(err) {
          alert(err)
        }
      }

    return (
        // <Button onClick={handleLogout}
        // variation="danger" 
        // size="small"
        // disabled={isLoggingOut}>
        //     {isLoggingOut ? 'Logging out...' : 'Logout'}
        // </Button>


        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger"
              size="small"
              disabled={false}>
              Log out
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName="Logout"
            onConfirm={() => handleLogout()} />
          </Modal.Window>
        </Modal>
    )
};

export default Logout;