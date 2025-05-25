import localFont from "next/font/local";
import Navbar from "../components/Navbar/Navbar";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Gestión Hotelera",
  description: "Sistema de gestion de habitaciones para hotel",
};

export default function RootLayout({ children }) {
  return (
      <main className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <div id="modal-root"></div>
      </main>
  );
}
