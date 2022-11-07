import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


const user = [];
const tweets = [
  {
    id: 2,
    username: "Elon Musk",
    tweet: "Bem-vindo ao Twitter",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg"
  },
  {
    id: 1,
    username: "Twitter_oficial",
    tweet: "Olá",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/800px-Twitter-logo.svg.png"
  },
];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    
    if (!username || !avatar) {
      res.status(400).send({ message: "Insira todos os campos" });
      return;
    }
    user.push(req.body);
    res.status(201).send("Usuário logado com sucesso!");
}) 

app.get("/tweets", (req, res) => {
    
    
    if (tweets.length > 10) {
      
      const tweetsFiltrados = tweets.filter(ultdeztt => (ultdeztt.id > (tweets.length - 10)));

      res.send(tweetsFiltrados);
      return;
    }
  
    res.send(tweets);
  });
  
  

  
  app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    
    const novoTweet = {
      id: tweets.length + 1,
      username,
      tweet,
    };
  
    tweets.unshift(novoTweet);
  
    res.status(201).send("Tweet criado com sucesso!");
  });

  
  
  app.listen(5000, () => {
    console.log(`Server running in port: ${5000}`);
  });


  //colocar foto nos tweets gerados
  //att: tentei usar a função find user mas não consegui mesmo assim retornar o avatar
  //mas de resto parece tudo ok!

  