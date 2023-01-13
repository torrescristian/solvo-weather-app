import Navbar from "../pages/Login/Navbar";

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
