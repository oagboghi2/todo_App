$(document).ready(function(){
  $.getJSON('/api/todo')
    .then(addTodos)
    .catch(function(err){
      console.log(err);
    });

    $("#todoInput").keypress(function(event){
      if(event.which == 13){
        event.preventDefault()
        createTodo()
      }
    })

    $(".list").on('click','li', function(){
      console.log($(this));
      updateTodo($(this))
    })

    $(".list").on('click', 'span', function(event){
      event.stopPropagation();
      removeTodo($(this).parent());
    });

});

function addTodos(todos){
  //add todos to page here
  todos.forEach(function(todo){
    console.log(todo.name);
    addTodo(todo)
  });
}

function addTodo(todo){
  var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  $('.list').append(newTodo);
}

function createTodo(){
  var userInput = $("#todoInput").val();
  console.log(userInput);
  $.post('/api/todo',{name: userInput})
    .then(function(newTodo){
    console.log(newTodo);
    addTodo(newTodo)
    })
    .catch(function(err){
      console.log(err);
    });
}


function removeTodo(todo){
  var ClickId = todo.data('id');
  var deleteUrl = '/api/todo/' + ClickId;
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
    .then(function(data){
      todo.remove();
    })
    .catch(function(err){
      console.log(err);
    })
}

function updateTodo(todo){
  var updateUrl = '/api/todo/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone};
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo){
    console.log(updatedTodo);
    todo.toggleClass("done")
    todo.data('completed', isDone)
  })
}
