const fs = require("fs");
const path = require("path");

let folders = []

const writethings = (content) => {
    fs.writeFileSync("./anime.json", content, (err) => {
            if (err) {
                console.log(err)
            }
            else{
                console.log()
            }
        }
    )
}

export const fetch = () =>{  fs.readdir("./content", (err, files) => 
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
                                        writethings(JSON.stringify(folders))        
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