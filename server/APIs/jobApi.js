const verifytoken=require("./middlewares/verifyToken")
const exp=require("express")
const jobapp=exp.Router()
const expressAsyncHandler=require("express-async-handler")
jobapp.get("/get-job/:role",expressAsyncHandler(async(request,response)=>{
    // get jobCollection
    const jobCollection=request.app.get("jobCollection")
    
  let jobObj=await jobCollection.find({role:(request.params.role)}).toArray()
  
  response.status(200).send({message:"job list",payload:jobObj})
  }))

jobapp.use(exp.json())
jobapp.post("/add-job",expressAsyncHandler(async(request,response)=>{
      const jobCollection=request.app.get("jobCollection")
      
      const newJOb=request.body

      const jobOfDB=await jobCollection.findOne({post:newJOb.post})
         if(jobOfDB!==null){
          response.status(200).send({message:"job already exists"})
         }
         else{
         
          await jobCollection.insertOne(newJOb)
          response.status(201).send({message:"job created"})
      
      
      }
         
      
  }))
  module.exports=jobapp