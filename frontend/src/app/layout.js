import { Inter } from "next/font/google";
import Header from "@/components/Header"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Charge: The War Dimension",
  description: "A board-based card game.",
};

const layoutStyle = {
  textAlign: "center",
  margin: "0 0"
}

const bodyStyle = {
  marginTop: "15vh"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={layoutStyle}>
        <div>

        </div>
        <Header />

        <div style={bodyStyle}>
          {children}
        </div>
      </body>
    </html>
  );
}
