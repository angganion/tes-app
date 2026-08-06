import "./globals.css";

export const metadata = {
  title: "Wahyu Ridho Anggoro — Backend & Systems",
  description: "Portfolio and field notes of Wahyu Ridho Anggoro, an Information Systems engineer focused on backend systems, data, and smart contracts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
