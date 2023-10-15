import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes";
import Page404 from "layouts/errors/404";
import i18n from 'i18n';
import CustomAlert from "components/Alert";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/rootReducer";

export type Dir = 'ltr' | 'rtl';
export default function Application(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("Main Dashboard");
  const [selectedDir, setSelectedDir] = useState<Dir>("ltr");
  const { isError } = useSelector((state: RootState) => state.generalSlice);

  useEffect(() => {
    document.documentElement.dir = "ltr";
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/application") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  const onChangeDir = useCallback((newSelectedDir: Dir) => {
    document.documentElement.dir = newSelectedDir;
    setSelectedDir(newSelectedDir);
  }, []);


  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all ${selectedDir === "ltr" ? "md:pr-2 xl:ml-[313px]" : "md:pe-2 xl:mr-[313px]"}`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              brandText={currentRoute}
              onOpenSidenav={() => setOpen(true)}
              secondary={getActiveNavbar(routes)}
              onChangeDir={onChangeDir}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/application/dashboard" replace />}
                />
                <Route
                  path="/*"
                  element={
                    <div style={{ padding: 25 }}>
                      <Page404 homePagePath="/application/dashboard" />
                    </div>
                  }
                />
              </Routes>
              <CustomAlert isOpen={isError} />
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
