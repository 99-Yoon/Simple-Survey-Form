import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./auth/auth.context";
import { Footer, Header } from "./commons";

const App = () => (
  <AuthProvider>
    <Header />
    <div style={{ minHeight: "80vh" }}>
      <Outlet />
    </div>
    <Footer />
  </AuthProvider>
);

export default App;
