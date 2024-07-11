export default function CommonHeader({data, size}) {
  const commonHeaderStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "5fr 1fr",
    contain: "size",
    margin: "0 0",
    padding: "auto",
    backgroundColor: "lightGray"
  }

  const barStyle = {
    display: "grid",
    gridTemplateColumns: "8fr 1fr",
    gridTemplateRows: "1fr",
    width: "calc(100% - " + (size * .2) + "px)",
    margin: "auto",
    backgroundColor: "darkGray",
    paddingLeft: size * .05 + "px",
    paddingRight: size * .05 + "px",
    marginTop: size * .05 + "px",
    // paddingBottom: size * .01 + "px",
    borderRadius: size * .02 + "px",
    boxShadow : "-" + (size * .02) + "px " + (size * .01) + "px " +  (size * .05) + "px " + "#0f0f0f"
  }

  const nameStyle = {
    textAlign: "left",
    fontSize: "min(125%, " + size * .2 + "px)",

  }

  const costStyle = {
    fontSize: size * .12 + "px",
    margin: "0 0",
    padding: "0 0",
    paddingTop: size * .015 + "px"
  }

  const costBubbleStyle = {
    marginLeft: size * .1 + "px",
    backgroundColor: "#e0e0e0",
    borderRadius: "50%",
    boxShadow : "inset -" + (size * .01) + "px " + (size * .005) + "px " +  (size * .03) + "px " + "#3f3f3f",
    height: size * .15 + "px",
    width: size * .15 + "px",
  }

  return (
    <div style={commonHeaderStyle}>
      <div style={barStyle}>
        <div style={nameStyle}>{data.name}</div>
        <div style={costBubbleStyle}>
          <p style={costStyle}>{data.cost}</p>
        </div>
      </div>
    </div>
  )
}