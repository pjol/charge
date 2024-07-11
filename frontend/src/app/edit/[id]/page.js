"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Card from "@/components/Card"

export default function EditCardPage({params}) {

  const router = useRouter()

  const [name, setName] = useState("")
  const [cost, setCost] = useState(null)
  const [image, setImage] = useState("")
  const [type, setType] = useState("")
  const [text, setText] = useState("")
  const [stat1, setStat1] = useState("")
  const [stat2, setStat2] = useState("")

  const [error, setError] = useState("")

  useEffect(() => {
    const getCard = async () => {
      const res = await fetch("http://localhost:8080/cards?id=" + params.id, {
        method: "GET"
      })

      if(status == 404) {
        router.back()
      }
      const c = (await res.json())

      setName(c.name)
      setCost(c.cost)
      setImage(c.image)
      setType(c.type)
      setText(c.text)
      setStat1(c.stat1)
      setStat2(c.stat2)
    }

    getCard()
  }, [])


  const cardData = useMemo(() => {
    console.log(name)
    return {
      name,
      cost: cost * 1,
      image,
      type,
      text,
      stat1: stat1 * 1,
      stat2: stat2 * 1,
      id: params.id * 1
    }
  }, [name, cost, image, type, text, stat1, stat2])

  const putCard = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:8080/cards", {
      method: "PUT",
      body: JSON.stringify(cardData)
    })
    const count = res.headers.get("Card-Count")

    if(res.status === 202) {
      router.push("http://localhost:3000/card/" + params.id)
    } else {
      setError("error adding card")
    }
  }

  const cardEditorStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr"
  }

  const formStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    "& label": {
      marginTop: "10px"
    }
  }

  return (
  <>
  <div style={cardEditorStyle}>
    <Card data={cardData} />
    <div>
      <form onSubmit={putCard}>
        <label>
          Type:
          <select style={formStyle} type="text" placeholder="type" value={type} onChange={(e) => {
            setType(e.target.value)
          }}>
            <option value="" selected disabled hidden>Choose Type</option>
            <option value="Warlord">Warlord</option>
            <option value="Summoned">Summoned</option>
            <option value="Structure">Structure</option>
            <option value="Boon">Boon</option>
            <option value="Intervention">Intervention</option>
          </select>
        </label>
        { type && <div style={formStyle}>

          <label>
            Name:
            <input type="text" placeholder="name" value={name} onChange={(e) => {
              setName(e.target.value)
            }}/>
          </label>
          <label>
            Cost:
            <input type="text" placeholder="cost" value={cost} onChange={(e) => {
              setCost(e.target.value * 1 || 0)
            }}/>
          </label>
          <label>
            Image:
            <input type="text" placeholder="image" value={image} onChange={(e) => {
              setImage(e.target.value)
            }}/>
          </label>
          <label>
            Text:
            <input type="text" placeholder="text" value={text} onChange={(e) => {
              setText(e.target.value)
            }}/>
          </label>
          <label>
            Stat 1(attack):
            <input type="text" placeholder="stat1" value={stat1} onChange={(e) => {
              setStat1(e.target.value * 1 || 0)
            }}/>
          </label>
          <label>
            Stat 2 (defense):
            <input type="text" placeholder="stat2" value={stat2} onChange={(e) => {
              setStat2(e.target.value * 1 || 0)
            }}/>
          </label>
          <button type="submit">Save</button>
        </div>}
      </form>
      <div>{error}</div>
      <button onClick={() => {
          router.back()
        }}>
          BACK
      </button>
    </div>
  </div>

  </>
  )
}