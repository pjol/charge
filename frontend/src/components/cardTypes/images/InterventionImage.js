export default function InterventionImage({image, size}) {
  const cardImageStyle = {
    width: "calc(100% - " + ((size * .07) * 2) + "px)",
    height: "calc(100% - " + ((size * .07) * 2) + "px)",
    objectFit: "cover",
    padding: size * .07 + "px",
    overflow: "hidden",
    display: "block",
    borderRadius: "10% 10% 40% 40%",
    boxShadow : "inset -" + (size * .01) + "px " + (size * .005) + "px " +  (size * .05) + "px " + "#0f0f0f"
  }

  const imageWrapperStyle = {
    height: "100%",
    width: "100%",
    contain: "size",
    borderRadius: size * .04 + "px",
    // backgroundColor: "#afafaf",

    boxShadow :"none"
  }

  return (
    <div style={imageWrapperStyle}>
      <img src={image} alt={"no image found"} style={cardImageStyle}/>
    </div>
  )
}

