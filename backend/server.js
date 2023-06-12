const fs = require("fs");
const path = require("path");
const express = require("express")
const cors = require("cors")
var os = require( 'os' )

var app = express()

var networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces);
var arr = networkInterfaces['wlan0'][1].address

const writethings = (content, file) => {
  fs.writeFileSync(file, content, (err) => {
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
app.use(express.static(path.join(__dirname, '../build')));

app.get("/animeList", (res, req) => {
  fetch()
  const animeList = fs.readFileSync("./anime.json")
  req.send(animeList)
})

app.get("/kirbo.jpg", (res, req) => {
  var options = {
    root: path.join(__dirname)
  };
  req.sendFile("te/kirbo.jpg", options)
})

app.get("/", (res, req) => {
    var options = {
      root: path.join(__dirname)
    };
    req.sendFile("../build/index.html", options)
  })


app.get("*", (res, req) => {

  var options = {
    root: path.join(__dirname)
  };

  let aa = (res.url).split("/")

  if(aa[1] == "content"){
    req.sendFile("/content/"+ aa[2] + "/" + aa[3],options )
  }else{
    req.send("helo")
  }

})

app.listen(9000, function () {
  console.log('polt-V2 listening at', "http://"+arr + ":" + 9000)
})

let folders = []



const fetch = () =>{  fs.readdir("./content", (err, files) =>
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
                            fs.readdir("./content/" + show.name, (err, eps) =>
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
                            }
                        )

                    }
                )
            }
        }
    )
}
