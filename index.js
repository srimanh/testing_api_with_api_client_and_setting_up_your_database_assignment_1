const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3010;

app.use(bodyParser.json());

const students = require('./data.json'); 

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number') {
    return res.status(400).json({ error: 'Invalid threshold value. It must be a number.' });
  }

  const filteredStudents = students.filter(student => student.total > threshold);

  const response = {
    count: filteredStudents.length,
    students: filteredStudents.map(({ name, total }) => ({ name, total })),
  };

  return res.status(200).json(response);
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
