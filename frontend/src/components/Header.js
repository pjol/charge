"use client"

import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  const headerStyle = {
    width: "calc(100% - 5vh)",
    backgroundColor: "black",
    margin: "0 0",
    padding: "2.5vh",
    position: "fixed",
    display: "grid",
    top: "0",
    gridTemplateColumns: "1fr 1fr"
  }

  const homeButtonStyle = {
    fontSize: "5vh",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    cursor: "pointer"
  }

  const leftButtonAreaStyle = {
    textAlign: "left",
    margin: "none",
    padding: "none"
  }

  const rightButtonAreaStyle = {
    textAlign: "right",
    margin: "none",
    padding: "none"
  }

  return (
    <div style={headerStyle}>
      <div style={leftButtonAreaStyle}>
        <div style={homeButtonStyle} onClick={() => {
          router.push("/")
        }}>HOME</div>
      </div>
      <div style={rightButtonAreaStyle}>
        <div style={homeButtonStyle} onClick={() => {
          router.push("/create")
        }}>CREATE</div>
      </div>
    </div>
  )
}