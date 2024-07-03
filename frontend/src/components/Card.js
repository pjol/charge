'use client'
import { useState, useEffect } from 'react'
import Warlord from '@/components/cardTypes/Warlord'

const Card = ({name, type, cost, text, image, stat1, stat2}) => {
  useEffect(() => {
    console.log(name, type)
  }, [name])

  const CardFormat = () => {
    switch (type) {
      case "warlord":
        console.log("warlord")
        return (<Warlord
          name={name}
          type={type}
          cost={cost}
          text={text}
          image={image}
          stat1={stat1}
          stat2={stat2}/>)
      case "summoned":

      case "structure":

      case "boon":

      case "intervention":

    }
  }

  const outerBorderStyle = {}

  return (
    <div style={outerBorderStyle}>
      <div></div>
        <p>{name}</p>
        <p>{image}</p>
        <CardFormat

        />
    </div>
  )
}

export default Card