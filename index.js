import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Dados iniciais
const usuarios = [
  {
    username: "bobesponja",
    avatar:
      "https://upload.wikimedia.org/wikipedia/pt/b/bf/SpongeBob_SquarePants_personagem.png",
  },
  {
    username: "patrick",
    avatar:
      "https://upload.wikimedia.org/wikipedia/pt/b/b1/Patrick_Estrela.png",
  },
];

const tweets = [
  { username: "bobesponja", tweet: "Eu amo o Hub" },
  { username: "patrick", tweet: "Hoje o dia está lindo!" },
  { username: "bobesponja", tweet: "Mal posso esperar pelo fim de semana!" },
];

// POST /sign-up
app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  usuarios.push({ username, avatar });
  res.send("OK");
});

// POST /tweets
app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  const usuarioExistente = usuarios.find((user) => user.username === username);
  if (!usuarioExistente) {
    return res.status(404).send("Usuário não encontrado!");
  }

  // Adiciona o novo tweet no topo da lista de tweets
  tweets.unshift({ username, tweet });
  res.send("OK");
});

// GET /tweets
app.get("/tweets", (req, res) => {
  const ultimosTweets = tweets.slice(0, 10).map((tweet) => {
    const usuario = usuarios.find((user) => user.username === tweet.username);
    return {
      username: tweet.username,
      avatar: usuario ? usuario.avatar : null,
      tweet: tweet.tweet,
    };
  });

  res.send(ultimosTweets);
});

// Configuração do servidor para rodar na porta 5000
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
