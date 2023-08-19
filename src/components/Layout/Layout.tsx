import { ReactNode } from "react";
import Header from "../Header";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="container m-auto  py-20 px-40">
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
