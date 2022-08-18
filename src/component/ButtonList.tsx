import axios from 'axios';
import React, { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid';
import "../App.css"

let ran = false

const client = axios.create({
  baseURL: "http://192.168.1.40:9000" 
});

const Folder = (hello:any, setAnim:any) => {
  
  let episodes:any[] = [];
  (hello.episodes).forEach((ele:any) => {
    episodes.push({name: ele, isfile:true, anime: hello.name})
  });
  
  setAnim(episodes)
}

const ButtonList = () => {
  const [anim, setAnim] = useState<[]>([])
  const vidRef = useRef(null)
  const imgRef = useRef(null)
  const titleRef = useRef(null)
 

  if (!ran){client.get("/animeList").then((response) => {setAnim(response.data);ran = true})}
    
  return (
    <div>
      <h3 className='title' ref={titleRef}> </h3>
      <div className='gridButton'>
        {anim.map((c: {cover: any, name: any , episodes: any[], isfile: boolean, anime:string, img:any}) => 
            
            <button className='But' key={uuid()} onClick={(e) => {
              if (c.isfile) {
                vidRef.current.src = "http://192.168.1.40:9000/content/"+c.anime+"/"+c.name;
                
                vidRef.current.height = 720 / 2;
                vidRef.current.width = 1280 / 2;
              }
              else{                
                Folder(c, setAnim)
                titleRef.current.textContent = c.name
                // imgRef.current.src = "http://192.168.1.40:9000/content/"+c.anime+"/"+c.cover;
              }
            }}>
              {!c.isfile && <img alt='' ref={imgRef} height={195+20} width={138+20} src={"http://192.168.1.40:9000/content/"+c.name+"/"+c.cover}/>}
              {!c.isfile && <br/>}
              {c.name}
            </button>
        )}
        </div>
      <div className='vid'><video ref={vidRef} controls={true} src="" width={0} height={0}></video></div>
    </div>
  )
}

export default ButtonList


