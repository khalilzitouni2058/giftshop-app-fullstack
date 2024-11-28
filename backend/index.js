const port=6005;
app.listen(port, (error)=>{
if(error){console.log("Server Failed")}
else{ console.log(`Server Started on port ${port}`)}
})
app.use(express.json());