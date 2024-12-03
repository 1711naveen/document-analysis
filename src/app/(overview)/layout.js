import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import ProtectedLayout from "../protected-layout";
import SidebarToggle from "@/components/Layout/SidebarToggle";
import { Suspense } from "react";


export const metadata = {
  title: "DashBoard",
  description: "Dashboard of Document analysis",
};

export default function DashboardLayou({ children }) {
  return (
    <ProtectedLayout>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-grow">
          <SidebarToggle>
            <Sidebar />
          </SidebarToggle>
          <main className="transition-all duration-300 flex-grow"><Suspense>{children}</Suspense></main>
        </div>
        <Footer />
      </div>
    </ProtectedLayout>
  );
}
