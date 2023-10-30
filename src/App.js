import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { DemonstResult } from "./components/Result";
import { Auth } from "./components/Authorization";
import { HomePage } from "./components/HomePage";
import { ErrorPage } from "./components/ErrorPage";
import { SearchMenu } from "./components/Search";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ResultProvider } from "./context/resultProvider";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
      <div className="App">

        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" element={<HomePage isAuth={isAuth} />} />
          <Route
              path="/auth"
              element={!isAuth ? <Auth isAuth={isAuth} setIsAuth={setIsAuth} /> : <Navigate to="/" />}
          />

          <Route element={isAuth ? <Outlet /> : <Navigate to="/auth" />}>
            <Route
                path="/search"
                element={
                  <ResultProvider>
                    <SearchMenu />
                  </ResultProvider>
                }
            />
            <Route
                path="/result"
                element={
                  <ResultProvider>
                    <DemonstResult />
                  </ResultProvider>
                }
            />
          </Route>
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
        <Footer />

      </div>
  );
}

export default App;
