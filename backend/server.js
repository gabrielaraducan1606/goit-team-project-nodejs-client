import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let columns = [];  
let cards = [];    

app.get('/columns', (req, res) => {
  res.json(columns);
});

app.post('/columns', (req, res) => {
  const { title } = req.body;
  const newColumn = { id: Date.now(), title, cards: [] };
  columns.push(newColumn);
  res.status(201).json(newColumn);
});

app.post('/cards', (req, res) => {
  const { columnId, title, description, deadline } = req.body;
  const newCard = { id: Date.now(), title, description, deadline };
  
  const column = columns.find(col => col.id === columnId);
  if (column) {
    column.cards.push(newCard);
    cards.push(newCard);
    res.status(201).json(newCard);
  } else {
    res.status(404).json({ message: 'Column not found' });
  }
});

app.delete('/columns/:id', (req, res) => {
  const { id } = req.params;
  columns = columns.filter(col => col.id != id);
  res.status(204).send();
});

app.delete('/cards/:id', (req, res) => {
  const { id } = req.params;
  cards = cards.filter(card => card.id != id);
  columns.forEach(col => {
    col.cards = col.cards.filter(card => card.id != id);
  });
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
