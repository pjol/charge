'use client'
import { useState, useEffect } from 'react'
import CommonHeader from '@/components/cardTypes/headers/CommonHeader'
import CommonBody from '@/components/cardTypes/bodies/CommonBody'
import WarlordBody from '@/components/cardTypes/bodies/WarlordBody'
import WarlordHeader from '@/components/cardTypes/headers/WarlordHeader'
import WarlordImage from '@/components/cardTypes/images/WarlordImage'
import SummonedBody from '@/components/cardTypes/bodies/SummonedBody'
import SummonedImage from '@/components/cardTypes/images/SummonedImage'
import StructureBody from '@/components/cardTypes/bodies/StructureBody'
import StructureImage from '@/components/cardTypes/images/StructureImage'
import BoonImage from '@/components/cardTypes/images/BoonImage'
import InterventionImage from '@/components/cardTypes/images/InterventionImage'


const Card = ({data, size = 150}) => {
  useEffect(() => {
    console.log(data.name, data.type)
  }, [data])

  const CardFormat = () => {
    switch ((data.type).toLowerCase()) {
      case "warlord":
        return (
          <>
            <WarlordHeader data={data} size={size}/>
            <WarlordImage image={data.image} size={size} />
            <WarlordBody data={data} size={size}/>
          </>
        )

      case "summoned":
        return (
          <>
            <CommonHeader data={data} size={size} />
            <SummonedImage image={data.image} size={size} />
            <SummonedBody data={data} size={size}/>
          </>
        )

      case "structure":
        return (
          <>
            <CommonHeader data={data} size={size}/>
            <StructureImage image={data.image} size={size}/>
            <StructureBody data={data} size={size}/>
          </>
        )

      case "boon":
        return (
          <>
            <CommonHeader data={data} size={size}/>
            <BoonImage image={data.image} size={size}/>
            <CommonBody data={data} size={size}/>
          </>
        )

      case "intervention":
        return (
          <>
            <CommonHeader data={data} size={size}/>
            <InterventionImage image={data.image} size={size}/>
            <CommonBody data={data} size={size}/>
          </>
        )
    }
  }

  const CardImage = ({image}) => {
    return (
      <div style={imageWrapperStyle}>
        <img src={image} alt={"no image found"} style={cardImageStyle}/>
      </div>
    )
  }

  const cardImageStyle = {
    width: "calc(100% - " + ((size * .07) * 2) + "px)",
    height: "calc(100% - " + ((size * .07) * 2) + "px)",
    objectFit: "cover",
    padding: size * .07 + "px",
    overflow: "hidden",
    display: "block",
    borderRadius: "30% 30% 10% 10%",
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



  const outerBorderStyle = {
    width: size * 2.5 + "px",
    height: size * 3.5 + "px",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: size * .07 + "px",
    borderRadius: size * .08 + "px",
    fontSize: size * .13 + "px",
    fontFamily: "Copperplate",
    backgroundColor: "lightGray",
    textAlign: "center"
  }

  const interiorFormat = {
    display: "grid",
    gridTemplateRows: "1fr 6fr 5fr",
    height: "100%"
  }

  return (
    <div style={outerBorderStyle}>
      <div style={interiorFormat}>
        <CardFormat />
      </div>
    </div>
  )
}

export default Card