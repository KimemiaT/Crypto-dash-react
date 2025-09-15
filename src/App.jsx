import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter, useRoutes } from "react-router-dom";

const RoutesWrapper = () => {
  const routesArray = [
    { path: "*", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
  ];

  return useRoutes(routesArray);
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="w-full h-screen flex flex-col">
          <RoutesWrapper />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
