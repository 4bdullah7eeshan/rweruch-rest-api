const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const models = require("./src/models/index");


const app = express();
//const date = Date.parse(req.body.date);
//const count = Number(req.body.count);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = {
      models,
      me: models.users[1],
    };
    next();
});

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
  });
  
  app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });
  
  app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
  });
  
  app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });

  app.get('/users', (req, res) => {
    //return res.send('GET HTTP method on user resource');
    //return res.send(Object.values(users));
    return res.send(Object.values(req.context.models.users));


  });

  app.get('/users/:userId', (req, res) => {
    //return res.send(users[req.params.userId]);
    return res.send(req.context.models.users[req.params.userId]);

  });

  app.get('/messages', (req, res) => {
    //return res.send(Object.values(messages));
    return res.send(Object.values(req.context.models.messages));

  });
  
  app.get('/messages/:messageId', (req, res) => {
    //return res.send(messages[req.params.messageId]);
    return res.send(req.context.models.messages[req.params.messageId]);

  });

  app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
    };
  
    req.context.models.messages[id] = message;
  
    return res.send(message);
  });
  
  app.delete('/messages/:messageId', (req, res) => {
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = req.context.models.messages;
  
    req.context.models.messages = otherMessages;
  
    return res.send(message);
  });

  app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
});
  
  app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
    
  });
  
  app.put('/users/:userId', (req, res) => {
    return res.send(
      `PUT HTTP method on user/${req.params.userId} resource`,
    );
  });
  
  app.delete('/users/:userId', (req, res) => {
    return res.send(
      `DELETE HTTP method on user/${req.params.userId} resource`,
    );
  });

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);