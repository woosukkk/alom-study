import express from "express";
import mongoose from "mongoose";



const server = express();

await mongoose.connect("mongodb+srv://alom:1234qwer@cluster0.evl85.mongodb.net/Woosuk")

const userSchema = new mongoose.Schema({
  id :{type : String, required:true, unique :true},
  password : String,
});
  
const userModel = mongoose.model("user",userSchema);



server.use(express.json());

server.post("/user", async (req, res) => {
  const result = await userModel.create(req.body);
  res.send(result);
});

server.get("/user", async (req, res) => {
  const result = await userModel.find();
  res.send(result);
});

server.get("/user/:id", async (req, res) => {
  const result  = await userModel.findOne({id:req.params.id})
  res.send(result);
});

server.patch("/user/:id", async(req, res) => {
  const data = req.body;
  const id = req.params.id;

  const result = await userModel.findOneAndUpdate({id:id},data)
   res.send(result); 
});

server.delete("/user/:id", async(req, res) => {
  const id = req.params.id;
  console.log(id)
  const result = await userModel.findOneAndDelete({id:id})
   res.send(result); 
});

server.listen(8000, () => {
  console.log("서버 실행됨");
});
