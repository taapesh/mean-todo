var todo = angular.module('todo', []);

todo.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};

    // When landing on the page, retrieve all todos and disply them
    $http.get('./api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('error: ' + data);
        });

    // When submitting form to add todo, send text to the node API
    $scope.createTodo = function() {
        $http.post('./api/todos', $scope.formData)
            .success(function(data) {
                // clear form and set todos from response
                $scope.formData.text = "";
                $scope.todos.push(data);
                console.log(data);
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
    };

    // Delete todo and update view
    $scope.deleteTodo = function(id, index) {
        $http.delete('./api/todos/' + id)
            .success(function(data) {
                $scope.todos.splice(index, 1);
                console.log(data);
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
    };
}]);

