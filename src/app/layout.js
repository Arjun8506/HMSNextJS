import { Raleway, Dancing_Script, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "./components/appComponents/Header";
import { Toaster } from "react-hot-toast";

const raleway = Raleway({ subsets: ["latin"] });
const dancingScript = Dancing_Script({ subsets: ["latin"] });
const merriweather = Merriweather({ weight: ['400'], subsets: ['latin'] });

export const metadata = {
  title: "Green Valley Hospital",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${raleway.className} ${dancingScript.className} ${merriweather.className}`}>
        <div className="w-full">
          <div className="w-full max-w-[1600px] mx-auto">
            <Header />
            {children}
            <Toaster />
          </div>
        </div>
      </body>
    </html>
  );
}
