"use client"
import Image from 'next/image'
import PocketBase from "pocketbase";
import {useEffect, useState} from "react";
import Login from "@/app/test/(login)/Login";
export default function Home() {
    const pb = new PocketBase('https://admin.deleno.cz');
    const [authenticate, setAuthenticated] = useState(false);
    useEffect(()=>{
        if(pb.authStore.isValid){
            console.log("nice");
            setAuthenticated(true)
        }else{
            console.log("not")
        }
    },[])
  return (
      <>
      {authenticate === true ?
          <div className="flex flex-col items-center justify-center h-screen w-full">
              <a className="underline text-xl" href="/testy">Přejít na přehled testů</a>
          </div>
          :
          <div className="">
              <Login />
          </div>
      }
      </>
  )
}
