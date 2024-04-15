import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar/navbar";
import { AuthProvider } from "@/components/utils/AuthContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <ToastContainer />
        <body className="bg-pink-900">
          <Navbar />
          <div style={{ marginTop: "64px" }}>{children}</div>
        </body>
      </html>
    </AuthProvider>
  );
}
