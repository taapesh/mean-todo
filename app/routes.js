var Todo = require('./models/Todo');

module.exports = function(app) {

    // Get all todos
    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });

    // Create a new todo
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

    // Delete a todo
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
};
