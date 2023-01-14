
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const Sequelize = require("sequelize")
const {v4}= require('uuid')  
//const db = require("/UserResponse.csv");

const PROTO_FILE = "./src.proto";

const { fdatasync } = require("fs");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const Defs = protoLoader.loadSync(PROTO_FILE, options);
const userProto = grpc.loadPackageDefinition(Defs);
const server = new grpc.Server();


//GET
server.addService(userProto.UserService.service, { 
  GetUser: (input, callback) => {
    try {
      callback(null, {
          id: v4(),
          nickname: "zeus_zf",
          adress: "0x3becf83939f34311b6bee143197872d877501b11",
          wallet:"Metamask",
          age:15,
          balance:7895.45,
          currency:"$"});
    } 
    catch (error) {callback(error, null)}
}});

//Problemas con la base de datos

//CREATE
server.addService(userProto.UserService.service, {
  CreateUser: async ({request}, callback)=> {
    try{
      callback(null, {
        id: request.id,
        nickname: request.nickname,
        Walladress: request.Walladress,
        descriprion: request.descriprion,
      })

      save();
      //callback(null, data)
    } catch (err) {callback(err);}
}})


//DELETE
server.removeService(userProto.UseService.service, {
  DeleteUser: async ({ request }, callback) => {
    try {
        callback(null, await db.destroy({ where: { id: request.id } }), {
            message: "Ok Sucessfully deleted"});
    } catch (err) {callback(err);}
}})



//UPDATE
server.addService(userProto.UserService.service, {
  UpdateUser: async ({request}, callback)=> {
    try{ callback(null, {
      id: request.id,
      nickname: request.nickname,
      Walladress: request.Walladress,
      descriprion: request.descriprion,})

      data.status = "Ok";
      data.save()
    
    } catch (err) {callback(err);}
}})


server.bindAsync(
  "127.0.0.1:5001",
  grpc.ServerCredentials.createInsecure(),    //auth
  (error, port) => {
    console.log(`listening on port ${port}`);
    server.start();
  }
);
