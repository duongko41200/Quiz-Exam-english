import React, { useLayoutEffect } from "react";
import Navigation from "./components/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "./store/feature/auth";
import SignIn from "./pages/Login/SignIn";

import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorFallback } from "./middleware/ErrorBoundary";
const App = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const auths = useSelector((state) => state.authStore.user);

  /// *********** Nội dung khởi tạo ban đầu ở dây *************************
  useLayoutEffect(() => {
    // const userId = localStorage.getItem('userId');
    // // const listText = localStorage.getItem('listText')
    // const accessToken = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/login");
    } else {
      dispatch(SET_USER(user));
      // setIsAuth(true)
    }
  }, []);

    // const handleError = useErrorHandler();

    // // Simulate an error
    // useEffect(() => {
    //   try {
    //     // Code that might throw an error
    //     throw new Error("This is a simulated error!");
    //   } catch (error) {
    //     handleError(error);
    //   }
    // }, [handleError]);
  return (
    <>
      {/* {auths != '' ? ( */}

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error) =>
          toast.error(`An unexpected error occurred: ${error.message}`)
        }
      >
        <div className="App">
          <div className="AppGlass">
            <Navigation />
            <Outlet />
          </div>
          {/* <Toaster /> */}

          <ToastContainer />
        </div>
      </ErrorBoundary>
      {/* ) : (
				<SignIn />
			)} */}
    </>
  );
};

export default App;
