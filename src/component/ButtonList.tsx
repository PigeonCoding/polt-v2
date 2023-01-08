import axios from 'axios';
import { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { v4 as uuid } from 'uuid';
import "../App.css"

let ran = false
const adress = "http://192.168.1.12:9000"

const client = axios.create({
  baseURL: adress
});

const Folder = (hello:any, setAnim:any) => {

  let episodes:any[] = [];
  (hello.episodes).forEach((ele:any) => {
    episodes.push({name: ele, isfile:true, anime: hello.name})
  });

  setAnim(episodes)
}


const ButtonList = forwardRef((_props, ref) => {
  const [anim, setAnim] = useState<[]>([])
  const vidRef = useRef(null)
  const imgRef = useRef(null)
  const titleRef = useRef(null)

  useImperativeHandle(ref, () => ({

    alll() {

      ran = false;
      setAnim([])
      titleRef.current.textContent = ""
      vidRef.current.src = ''
      vidRef.current.height = 0;
      vidRef.current.width = 0;

    },

  }))

  if (!ran){client.get("/animeList").then((response) => {setAnim(response.data);ran = true})}
  // if (ran){console.log(anim)}
  return (
    <div>
      <h3 className='title' ref={titleRef}> </h3>
      {<div className='gridButton'>
        {anim.map((c: {cover: any, name: any , episodes: any[], isfile: boolean, anime:string, img:any}) =>

            <button className='But' key={uuid()} onClick={() => {

              if (c.isfile) {
                vidRef.current.src = adress + "/content/" + c.anime +"/" +c.name;

                vidRef.current.height = 720 / 2;
                vidRef.current.width = 1280 / 2;
              }
              else{

                console.log(c)
                Folder(c, setAnim)
                titleRef.current.textContent = c.name
              }
            }}>
              {!c.isfile && <img alt='' ref={imgRef} height={195+20} width={138+20} src={adress + "/content/" + c.name+ "/"  + c.cover}/>}
              {!c.isfile && <br/>}
              {c.name}

            </button>
        )}
        </div>}
      <div className='vid'><video ref={vidRef} controls={true} src="" width={0} height={0}></video></div>
    </div>
  )
})


export default ButtonList


