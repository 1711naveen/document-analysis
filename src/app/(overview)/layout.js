import localFont from "next/font/local";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import ProtectedLayout from "../protected-layout";


export const metadata = {
  title: "DashBoard",
  description: "Dashboard of Document analysis",
};

export default function DashboardLayou({ children }) {
  return (
    <ProtectedLayout>
      <div>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flex: 1 }}>{children}</main>
        </div>
        <Footer />
      </div>
    </ProtectedLayout>
  );
}
