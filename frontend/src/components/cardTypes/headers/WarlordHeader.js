export default function WarlordHeader({data, size}) {
  const warlordHeaderStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
    contain: "size",
    margin: "0 0",
    padding: "auto",
    backgroundColor: "lightGray"
  }

  const nameStyle = {
    width: "calc(100% - " + (size * .1) + "px)",
    margin: "auto",
    backgroundColor: "darkGray",
    // paddingTop: size * .01 + "px",
    // paddingBottom: size * .01 + "px",
    borderRadius: size * .02 + "px",
    fontSize: "min(125%, " + size * .2 + "px)",
    boxShadow : "-" + (size * .02) + "px " + (size * .01) + "px " +  (size * .05) + "px " + "#0f0f0f"

  }

  return (
    <div style={warlordHeaderStyle}>
      <div style={nameStyle}>{data.name}</div>
    </div>
  )
}