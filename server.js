var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var methodOverride = require('method-override');

// Connect to db
mongoose.connect('mongodb://localhost/mean-project');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// Define model todo
var Todo = mongoose.model('Todo', {
    text: String
});

// App routes

// API route to get all todos
app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});

// API route to create a new todo
app.post('/api/todos', function(req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }
        res.json(todo);


    });
});

// API route to delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function(err) {
        if (err) {
            res.send(err);
        }
        res.json({'message': 'Deleted todo'});
    });
});

// Define single route for our single page app, angular handles the rest
app.get('*', function(req, res) {
    res.sendFile('./public/index.html');
});

// Start listening for requests
app.listen(3000);
console.log('Listening on port 3000');
