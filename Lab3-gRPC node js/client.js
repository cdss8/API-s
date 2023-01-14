
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_FILE = "./src.proto";

// options for loading proto
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};


const req = protoLoader.loadSync(PROTO_FILE, options);

//loading and converting req into gRPC
const UserService = grpc.loadPackageDefinition(req).UserService;

const client = new UserService(
  "localhost:5001",
  grpc.credentials.createInsecure()
);


client.GetUser({}, (error, user) => {
  if (error) {console.log(error, "user not loaded");
  } 
  else {console.log("User:", user)}
});


/*client.CreateUser({}, (error, user) => {
  if (error) {console.log(error, "user not loaded");
  } 
  else {console.log("CreatedUser:", user)}
});


client.DeleteUser({}, (error, user)=>{});


client.Update({}, (error, user)=>{})



*/