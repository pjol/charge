export default function WarlordBody({data, size}) {
  const statsStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr"
  }

  const bodyStyle = {
    display: "grid",
    gridTemplateRows: "2fr 6fr 1fr",
    height: "100%",
    width: "100%"
  }

  const textStyle = {
    fontSize: "min(100%, " + size * .1 + "px)",
    backgroundColor: "#e0e0e0",
    marginTop: size * .05 + "px",
    marginBottom: size * .05 + "px",
    marginLeft: size * .12 + "px",
    marginRight: size * .12 + "px",
    padding: size * .1 + "px",
    borderRadius: size * .02 + "px",
    boxShadow : "inset -" + (size * .02) + "px " + (size * .01) + "px " +  (size * .05) + "px " + "#3f3f3f",
    textShadow : "-" + (size * .02) + "px " + (size * .01) + "px " +  (size * .01) + "px " + "#cfcfcf"

  }

  const typeStyle = {
    width: "calc(100% - " + (size * .1) + "px)",
    margin: "auto",
    backgroundColor: "darkGray",
    paddingTop: size * .02 + "px",
    paddingBottom: size * .02 + "px",
    borderRadius: size * .02 + "px",
    // fontSize: size * .2 + "px",
    boxShadow : "-" + (size * .02) + "px " + (size * .01) + "px " +  (size * .05) + "px " + "#0f0f0f"

  }


  const attackStyle = {
    marginRight: "auto",
    marginLeft: size * .2 + "px",
    // marginTop: 'auto',
    marginBottom: 'auto',
  }

  const defenseStyle = {
    marginLeft: "auto",
    marginRight: size * .2 + "px"

  }

  const statStyle = {
    backgroundColor: "#e0e0e0",
    textAlign: "center",
    width: size * .3 + "px",
    borderRadius: size * .3 + "px",
    boxShadow : "inset -" + (size * .01) + "px " + (size * .005) + "px " +  (size * .03) + "px " + "#3f3f3f",
  }


  return (
    <div style={bodyStyle}>
      <div style={typeStyle}>
        Warlord
      </div>
      <p style={textStyle}>{data.text}</p>
      <div style={statsStyle}>
        <div style={attackStyle}>
          <div style={statStyle}>
            {data.stat1}
          </div>
        </div>
        <div style={defenseStyle}>
          <div style={statStyle}>
            {data.stat2}
          </div>
        </div>
      </div>
    </div>
  )
}