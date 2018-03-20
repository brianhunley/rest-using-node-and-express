const express = require('express');
const app = express();

app.use(express.json());

/*
app.get()
app.post()
app.put()
app.delete()
*/

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// get all the courses
app.get('/api/courses', (req, res) => {
  // normally, you would get the list of courses from
  // a database and return them.  We're not doing that here.

  res.send(courses);
});

// /api/courses/1
// /api/courses/:id
// /api/posts/:year/:month

// get one course, based on the id
app.get('/api/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const course = courses.find(c => c.id === parseInt(courseId));

  // if the requested course was not found, return a 404 - resource not found
  if (!course) res.status(404).send(`The course with ID ${courseId} was not found.`)

  // else, return the requested course data
  res.send(course);
});

// params -> /api/posts/2018/1
// query -> /api/posts/2018/1?sortBy=name
app.get('/api/posts/:year/:month', (req, res) => {
  // res.send(req.params);
  res.send(req.query);
});

// create a new course
app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

// environment variable: PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));