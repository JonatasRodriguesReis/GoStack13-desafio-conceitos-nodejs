const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.status(200).json(repositories)

});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body
  const id = uuid()

  const newRepository = {
    id:id,
    title:title,
    url:url,
    techs:techs,
    likes:0
  }

  repositories.push(newRepository)

  return response.status(200).json(newRepository)
});

app.put("/repositories/:id", (request, response) => {
  
  const {id} = request.params
  const {title,url,techs} = request.body

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id)
  if(repositoryIndex == -1)
    return response.status(400).send('Repository not found!')

  const repositoryFound = repositories[repositoryIndex]
  repositoryFound.title = title
  repositoryFound.url = url
  repositoryFound.techs = techs

  return response.status(200).json(repositoryFound)

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id)
  if(repositoryIndex == -1)
    return response.status(400).send('Repository not found!')

  repositories.splice(repositoryIndex,1)
  return response.status(204).json({})
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id)
  if(repositoryIndex == -1)
    return response.status(400).send('Repository not found!')

  const repositoryFound = repositories[repositoryIndex]
  repositoryFound.likes += 1

  return response.status(200).json(repositoryFound)
});

module.exports = app;
