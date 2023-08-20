import { ReactNode } from "react";
import Header from "../Header";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="container m-auto  sm:py-20 sm:px-40 py-10 px-5">
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
