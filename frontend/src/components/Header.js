"use client"

import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  const headerStyle = {
    width: "101%",
    backgroundColor: "black",
    margin: "0 0",
    padding: "2.5vh",
    position: "fixed",
    display: "grid",
    top: "0",
    gridTemplateColumns: "1fr 8fr 1fr"
  }

  const homeButtonStyle = {
    fontSize: "5vh",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    cursor: "pointer"
  }

  const buttonAreaStyle = {
    textAlign: "left",
    margin: "none",
    padding: "none"
  }

  return (
    <div style={headerStyle}>
      <div style={buttonAreaStyle}>
        <div style={homeButtonStyle} onClick={() => {
          router.push("/")
        }}>HOME</div>
      </div>
    </div>
  )
}