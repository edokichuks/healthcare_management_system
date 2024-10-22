import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PageNotFound } from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import SignUp from "./pages/SignUp";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import FindDoctors from "./pages/FindDoctors";
import Billings from "./pages/Billings";
import Prescription from "./pages/Prescription";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AuthProvider>
              <Routes>
                <Route element={
                  <PrivateRoute>
                    <AppLayout />
                  </PrivateRoute>
                }
                >

                  <Route path="index" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/doctors" element={<FindDoctors />} />
                  <Route path="/billings" element={<Billings />} /> 
                  <Route path="/prescription" element={<Prescription />} /> 
                  <Route path="*" element={<PageNotFound />} />
                </Route>
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                {/* <Route path="/register" element={<Register />} /> */}
              </Routes>
          </AuthProvider>
      </Router>
      <Toaster 
            position="top-center"
            gutter={12}
            containerStyle={{margin: "8px"}}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)"
              },
            }}
          />
    </>
  );
};

export default App;

// function App() {

//   return (
//     <div>
//       Helooo
//     </div>
//   )
// }

// export default App;



// const App: React.FC = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <div className="min-h-screen bg-gray-100">
//           <Header />
//           <main className="container mx-auto px-4 py-8">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login"
