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

  const cardWrapperStyle = {
  }


  useEffect(() => {
    setLoading(true)
    const getCard = async () => {
      const res = await fetch("http://localhost:8080/cards?id=" + params.id, {
        method: "GET"
      })
      const count = (res.headers.get("Card-Max") * 1) || 0
      console.log(count)
      const status = res.status

      if(status == 404 && params.id * 1 < count * 1) {
        router.replace("/card/" + (params.id * 1 + 1))
      } else {
        const c = (await res.json())
        setCardCount(count)


        setLoading(false)
        setCard(c.id ? c : null)
      }
    }

    getCard()
    setLoading(false)
  }, [])




  return (
      <div style={parentStyle}>
          {card ?
        <div style={cardWrapperStyle}>
            <Card
              data={card}
            />
        </div> : <div>{loading ? "Loading..." : "No Card Found"}</div>}

          <br />
          <button onClick={() => {
            router.back()
          }}>
            BACK
          </button>
          <button onClick={() => {
            router.push("/edit/" + params.id)
          }}>
            EDIT
          </button>
          <button onClick={() => {
            if(cardCount !== null && params.id * 1 === cardCount * 1) {
              router.push("/card/1")
            } else if(cardCount !== null) {
              console.log(params.id, cardCount)
              router.push("/card/" + ((params.id * 1) + 1))
            }
          }}> NEXT </button>
      </div>
  )
}

export default CardPage