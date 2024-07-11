"use client"
import Card from "@/components/Card"
import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"


const CardPage = ({params}) => {
  const router = useRouter()
  const [card, setCard] = useState()
  const [cardCount, setCardCount] = useState(null)
  const [loading, setLoading] = useState(true)

  const parentStyle = {
    textAlign: "center"
  }


  useEffect(() => {
    setLoading(true)
    const getCard = async () => {
      const res = await fetch("http://localhost:8080/cards?id=" + params.id, {
        method: "GET"
      })
      const count = res.headers.get("Card-Count") || 0

      if(res.status == 404 && params.id < count) {
        router.replace("/card/" + (params.id * 1 + 1))
      }

      const c = (await res.json())
      setCardCount(count)


      setLoading(false)
      setCard(c.id ? c : null)
    }

    getCard()
    setLoading(false)
  }, [])




  return (
      <div style={parentStyle}>
        {card ?
          <Card
            data={card}
          /> : <div>{loading ? "Loading..." : "No Card Found"}</div>}
          <br />
          <button onClick={() => {
            console.log("count: ", cardCount)
            console.log("id: ", params.id)
            if(cardCount !== null && params.id === cardCount) {
              router.push("/card/1")
            } else if(cardCount !== null) {
              router.push("/card/" + ((params.id * 1) + 1))
            }
      }}> NEXT </button>
      </div>
  )
}

export default CardPage