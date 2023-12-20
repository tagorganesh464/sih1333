import React,{useState} from "react";
import "./App.css";
import Register from "./components/register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/rootlayout/RootLayout";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Jobs from "./components/jobs/Jobs";
import ErrorPage from "./components/errorpage/ErrorPage";
import Public from "./components/public/Public";
import Private from "./components/private/Private";
import Courses from "./components/courses/Courses";
import Products from "./components/products/Products";
import MockTests from "./components/mocktests/MockTests";
import Upsc from "./components/upsc/Upsc";
import Banking from "./components/banking/Banking";
import Railway from "./components/railway/Railway";
import SoftwareDevelopment from "./components/software-development/SoftwareDevelopment";
import UpscIasFoundation from "./components/upsc-ias-foundation/UpscIasFoundation";
import Law from "./components/law/Law";
import About from "./components/about/About"
import CoursesPage from "./components/coursesPage/CoursesPage";
import MockTestCard from "./components/mockTestCard/MockTestCard";
import Users from "./components/users/Users"
import Forgot from "./components/forgot/Forgot";
import UserProfile from "./components/userprofile/UserProfile";
import PaidCourses from "./components/paidCourses/PaidCourses";
import UpscMock from "./components/upscmock/UpscMock";
import Recovered from "./components/recovered/Recovered";
import Reset from "./components/reset/Reset";
import { createContext } from "react";
import ScreenReader from "./components/screenReader/ScreenReader";

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/jobs",
          element: <Jobs />,
          children: [
            {
              path: "public",
              element: <Public />,
            },
            {
              path: "private",
              element: <Private />,
            },
          ],
        },
        {
          path: "/products",
          element: <Products />,
        
        },
        {
          path: "/screenreader",
          element: <ScreenReader />,
        
        },
      
       
        {
          path: "/mock-tests",
          element: <MockTests />,
          children:[
            {
              path: "law",
              element: <Law />,
            },
            {
              path: "upscmock",
              element: <UpscMock />,
            },
          ]
       
        },
        {
          path: "/upsc",
          element: <Upsc />,
          children:[
            {
              path: "UPSC-IAS-Foundation",
              element: <UpscIasFoundation />,
            },
          ]
        },
        {
          path: "/railway",
          element: <Railway />,
        },{
          path: "/banking",
          element: <Banking />,
        },{
          path: "/software-development",
          element: <SoftwareDevelopment />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/user-profile",
          element: <UserProfile />,
        },{
          path: "/mockTestCard",
          element: <MockTestCard />,
        },
        {
          path: "/paidcourses",
          element: <PaidCourses />,
        },
        {
        path: "/courses",
              element: <Courses />,
              children:[
                {
                  path: "courses",
                  element: <Law />,
                },
              ]
            },
            {
          path: "/coursespage",
          element: <CoursesPage/>},
        
        {
          path: "/forgot",
          element: <Forgot/>,
        },
       


      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={routerObj} />
    </div>
  );
}

export default App;
