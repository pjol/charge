"use client"
import Card from "@/components/Card"
import { useEffect, useState, useMemo } from "react"


const Home = () => {
  const [cardNumber, setCardNumber] = useState(-1)
  const [cards, setCards] = useState([])
  const card = useMemo(() => {
    console.log(cardNumber)
    console.log(cards)
    let c = cardNumber != -1 ? cards[cardNumber] : null
    console.log(c)
    return (c ? {
      id: c.id,
      name: c.name,
      type: c.type,
      cost: c.cost,
      text: c.text,
      image: c.image,
      stat1: c.stat1,
      stat2: c.stat2
    } : null)
  }, [cardNumber])

  const parentStyle = {
    textAlign: "center"
  }


  useEffect(() => {
    const getCard = async () => {
      const res = await fetch("http://localhost:8080/cards?page=0", {
        method: "GET"
      })
      const c = (await res.json())

      setCards(c || [])
      setCardNumber(0)
    }

    getCard()
  }, [])




  return (
      <div style={parentStyle}>
        {card ?
          <Card
            data={card}
            size={150}
          /> : <div>Loading...</div>}
          <br />
          <button onClick={() => {
            if(cardNumber === cards?.length - 1) {
              setCardNumber(0)
            } else {
              setCardNumber(cardNumber + 1)
            }
      }}> NEXT </button>
      </div>
  )
}

export default Home