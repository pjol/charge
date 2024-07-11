"use client"
import Card from "@/components/Card"
import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"


const Home = ({params}) => {
  const router = useRouter()

  console.log("id: ", params.page)

  const [cardPage, setCardPage] = useState(params.page || 0)
  const [cards, setCards] = useState([])
  const [count, setCount] = useState(0)
  const cardStatus = useMemo(() => {
    const next = (cardPage + 1) * 10 < count
    const prev = cardPage != 0
    return {
      next,
      prev
    }
  }, [count, cardPage])
  // const card = useMemo(() => {
  //   console.log(cardNumber)
  //   console.log(cards)
  //   let c = cardNumber != -1 ? cards[cardNumber] : null
  //   console.log(c)
  //   return (c ? {
  //     id: c.id,
  //     name: c.name,
  //     type: c.type,
  //     cost: c.cost,
  //     text: c.text,
  //     image: c.image,
  //     stat1: c.stat1,
  //     stat2: c.stat2
  //   } : null)
  // }, [cardNumber])

  const parentStyle = {
    textAlign: "center",
  }

  const cardsStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr"
  }

  const cardStyle = {
    cursor: "pointer"
  }

  const getCards = async (page = 0) => {
    const res = await fetch("http://localhost:8080/cards?page=" + page, {
      method: "GET"
    })
    const c = (await res.json())

    setCards(c || [])
    setCount(res.headers.get("Card-Count"))
  }


  useEffect(() => {
    getCards(cardPage)
  }, [cardPage])




  return (
      <div style={parentStyle}>
        <div style={cardsStyle}>
          {cards ? cards.map((card) => {
            return(
              <div style={cardStyle} onClick={() => {
                router.push("/card/" + card.id)
              }}>
                <Card
                  data={card}
                  size={70}
                />
              </div>
            )
          }) : <div>Loading...</div>}
        </div>
        <br />
        {cardStatus.prev && <button onClick={() => {
          if(cardStatus.prev) {
            setCardPage(cardPage - 1)
          } else {
            setCardPage(0)
          }
        }}> PREV </button>}
        {cardStatus.next && <button onClick={() => {
          if(cardStatus.next) {
            setCardPage(cardPage + 1)
          } else {
            setCardPage(0)
          }
      }}> NEXT </button>}
      </div>
  )
}

export default Home