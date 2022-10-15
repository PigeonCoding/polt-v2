<h1 align="center">polt-V2</h1>

this is just a project i made to learn react and a nodejs in general
it's not perfect but it works

## how to use

**important** this project currently only supports .mp4 videos

create a `content` folder in the `backend` directory
put all your videos in folders with names matching the content

example:

**main directory>backend>content>(name of th serie/anime)>(episodes i recommand naming the episodes with their number)**

for cover art put a .jpg image inside the corresponding folder  

first run:
`npm install`

then replace the **adress** constant in the buttonlist.tsx file to the ip address of your server
you can find it by running the server.js to find out the ip if you don't know it

then run the frontend: 
```
npm start
```
then to run the backend:
```
cd ./backend
node server.js
```
if you want a command to do it all run
```
npm build
```
then you will be able to run the `polt-V2.bat/polt-V2.sh` file in the main directory to launch both


