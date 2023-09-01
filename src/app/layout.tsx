import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StateContextProvider } from "@/components/Context/StateContext"; // Update with the correct path
import Wrapper from "../components/Shared/wrapper";
import ReduxProvider from "@/utils/ReduxProvider";
import toast, { Toaster } from "react-hot-toast";
import { ClerkProvider, auth } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dine By Wasif",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId }: any = auth();
  return (
    <ClerkProvider>
      <ReduxProvider>
        <html lang="en">
          <body className={inter.className}>
            {" "}
            <Wrapper>
              <StateContextProvider>
              <Header userId={userId} />
                <main className="px-[9rem]">
                  {children}
                  <Toaster />
                </main>
                <Footer />{" "}
              </StateContextProvider>{" "}
            </Wrapper>
          </body>
        </html>{" "}
      </ReduxProvider>
    </ClerkProvider>
  );
}
