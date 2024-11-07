import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UpperHeader from "./components/UpperHeader";
import Footer from "./components/Footer";
function Layout() {
  const location = useLocation();
  // const hideHeaderFooter = /^\/admin(\/|$)/.test(location.pathname);
  const hideHeaderFooterPaths = [
    /^\/admin(\/|$)/, // Matches '/admin' and all subroutes like '/admin/user'
    /^\/404(\/|$)/, // Matches the NotFound path (adjust this if using a different path)
  ];

  // Check if the current path matches any of the hideHeaderFooterPaths patterns
  const hideHeaderFooter = hideHeaderFooterPaths.some((pattern) =>
    pattern.test(location.pathname)
  );

  return (
    <div>
      {!hideHeaderFooter && <UpperHeader />}
      <main>
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default Layout;
