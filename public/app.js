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

    $(".list").on('click', 'span', function(){
      var ClickId = $(this).parent().data('id');
      var deleteUrl = '/api/todo/' + ClickId;
      $.ajax({
        method: 'DELETE',
        url: deleteUrl
      })
        .then(function(data){
          console.log(data);
        })
        $(this).parent().remove();

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
  newTodo.data('id', todo._id)
  
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
    })
}
