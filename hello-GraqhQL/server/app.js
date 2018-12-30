const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors()); //read github.com/apollograpql/react-apollo

//连接到mlab数据库
//替换自己的用户名和密码
mongoose.connect(
  "mongodb://test:test1234@ds245234.mlab.com:45234/graphql",
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("connnected to data");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true //there is "i"
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
