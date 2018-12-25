const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();

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
