const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

//连接到mlab数据库
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
