"use client"
import Card from "@/components/Card"
import { useEffect, useState } from "react"


const Home = () => {
  const [cardNumber, setCardNumber] = useState(0)
  const [cards, setCards] = useState()

  const [name, setName] = useState()
  const [type, setType] = useState()
  const [cost, setCost] = useState()
  const [text, setText] = useState()
  const [image, setImage] = useState()
  const [stat1, setStat1] = useState()
  const [stat2, setStat2] = useState()
  const parentStyle = {
    textAlign: "center"
  }


  useEffect(() => {
    const getCard = async () => {
      const res = await fetch("http://localhost:8080/cards?page=0", {
        method: "GET"
      })
      const cards = (await res.json())
      const card = cards[0]


      console.log(card)

      setName(card.name)
      setType(card.type.toLowerCase())
      setCost(card.cost)
      setText(card.text)
      setImage(card.image)
      setStat1(card.stat1)
      setStat2(card.stat2)
      setCards(cards)
    }

    getCard()
  }, [])




  return (
      <div style={parentStyle}>
        {name ?
          <Card
            name={name}
            type={type}
            cost={cost}
            text={text}
            image={image}
            stat1={stat1}
            stat2={stat2}
          /> : <div>Loading...</div>}
          <br />
          <button onClick={() => {
            let card
            if(cardNumber === cards?.length - 1) {
              setCardNumber(0)
              card = (cards[0])
            } else {
              setCardNumber(cardNumber + 1)
              card = (cards[cardNumber + 1])
            }
            setName(card.name)
            setType(card.type.toLowerCase())
            setCost(card.cost)
            setText(card.text)
            setImage(card.image)
            setStat1(card.stat1)
            setStat2(card.stat2)
      }}> NEXT </button>
      </div>
  )
}

export default Home