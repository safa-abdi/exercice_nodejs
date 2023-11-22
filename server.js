const http =require("http")
const app =require("./app")
const port =process.env.PORT|| 5000
app.set("port",port)

//createserver accepte un callback qui a comme param la requete et la reponse
const server =http.createServer(app)
//si pas de variable d'env PORT ? ON VA ECOUTER LE PORT 5000
server.listen(port,()=>{
    console.log("listening on "+ port)
})

