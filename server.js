const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pisici = [];

app.use(express.static("public"));
app.use(bodyParser.json());
app.get("/pisici", (request, response) => {
  response.send(pisici);
});

app.post("/pisici", (request, response) => {
  console.log(JSON.stringify(request.body));
  pisici.push({
    name: request.body.pisica,
    completed: false
  });
  response.send();
});

app.delete("/pisici/:index", (request, response) => {
  pisici.splice(request.params.index, 1);
  response.send();
})

app.listen(3000);
