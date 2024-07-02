import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from 'next/font/google'
import {cn} from "@/lib/utils";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'], variable:"--font-sans" })


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cn(inter.variable,"font-sans")}>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        data-test-id="toast"
        autoClose={5000}
        closeButton={false}
        newestOnTop
        pauseOnHover
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
      />
    </div>
  );
}
