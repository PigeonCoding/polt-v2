import {writeFileSync, readdir, readFileSync} from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import {networkInterfaces} from "os";
import { stringify } from "querystring";

var app = express()

var ntInterface = networkInterfaces();
var arr = ntInterface['Wi-Fi'][1].address;

const writethings = (content, file) => {
  writeFileSync(file, content, (err) => {
          if (err) {
              console.log(err)
          }
          else{
              console.log()
          }
      }
  )
}

app.use(cors())
app.use(express.static(path.join(stringify(path.dirname), '..')));

app.get("/animeList", (res, req) => {
  fetch()
  const animeList = readFileSync("./anime.json")
  req.send(animeList)
})

app.get("/", (res, req) => {
    // req.sendFile("../build/index.html", options)
    req.sendFile(path.resolve("../index.html"));
})

app.get("*", (res, req) => {

  let aa = (res.url).split("/")

  if(aa[1] == "content"){
    req.sendFile(path.resolve("./content/"+ aa[2] + "/" + aa[3]), )
  }else{
    req.send("helo")
  }

})

app.listen(9000, function () {
  console.log('polt-V3 listening at', "http://"+arr + ":" + 9000)
})

let folders = []
const fetch = () =>{  readdir("./content", (err, files) =>
  {
    folders = []
    if (err)
    {
      console.log(err)
    }
    else
    {
      files.forEach(file =>
       {
          let anim = {}
          if (path.extname(file) == "")
          {
            anim.name = file
            anim.episodes = []
            anim.cover = ""
          }
          folders.push(anim)
        }
      );
      folders.forEach(show =>
        {
          readdir("./content/" + show.name, (err, eps) =>
          {
            if (err)
            {
              console.log(err)
            }
            else
            {
              eps.forEach(ss =>
              {
                if( path.extname(ss) == ".mp4")
                {
                  show.episodes.push(ss)
                }
                if (path.extname(ss) == ".jpg")
                {
                  show.cover = ss
                }
                  writethings(JSON.stringify(folders), "./anime.json")
                }
              )
            }
          })
      })
  }
})
}
