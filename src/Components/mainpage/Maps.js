import React, { useEffect, useState } from 'react'

export default function Maps() {
// latitude
    const [latitude , setlatitude] = useState("")
    const [longitude , setlongitude] = useState("")

    React.useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position) => {

            setlatitude(position.coords.latitude)
            setlongitude(position.coords.longitude)
        })

    })
    console.log(latitude ,longitude )

 

  return (
    <></>
  )
}