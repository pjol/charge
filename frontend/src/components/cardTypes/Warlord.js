const Warlord = ({name, type, cost, text, image, stat1, stat2}) => {
  const statsStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  }

  return (
    <div>
      Warlord
      <p>{text}</p>
      <div style={statsStyle}>
        <div>{stat1}</div>
        <div>{stat2}</div>
      </div>
    </div>
  )
}

export default Warlord