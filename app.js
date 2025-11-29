$(function () {
  // your code here

  //1, Page loads => get default(id = 1) data: get user, get todo, get post, with which id = 1
  //2. render those fetched data to html
  //3. If next button pressed, increment id by 1 and get each data with newly updated id and render html
  //4, If prev button pressed, decrement id by 1 and get each data with this newly updated id and render html
  //3,4 - 1, If id is over 30 => goes back to 1 == maybe modulor %?
  //5, add slide toggle functions on

  let id = 1;
  let postsAll;

  function fetchUser(id) {
    $.ajax({
      url: `https://dummyjson.com/users/${id}`,
      success: function (data) {
        buildProfile(data);
      },
      error: function (error) {
        alert(`Error: ${error} occured`);
      },
    });
  }

  function fetchTodos(id) {
    $.ajax({
      url: `https://dummyjson.com/users/${id}/todos`,
      success: function (data) {
        addTodo(data);
      },
      error: function () {
        alert("Error occured");
      },
    });
  }

  function fetchPost(id) {
    $.ajax({
      url: `https://dummyjson.com/users/${id}/posts`,
      success: function (data) {
        buildPost(data);
      },
    });
  }

  function buildProfile(person) {
    // changing profile.

    let appendContext = `<h1>${person.firstName} ${person.lastName}</h1> <p>Age: ${person.age}</p> <p>Email: ${person.email}</p> <p>Phone: ${person.phone}</p>`;
    $(".info__image img").attr("src", person.image);
    // info__content
    $(".info__content").append(appendContext);
    $(".posts h3").text(`${person.firstName}'s Posts`);
    $(".todos h3").text(`${person.firstName}'s Todos`);
  }

  function addTodo(todoItems) {
    let addelements = "";
    if (todoItems.todos.length === 0) {
      addelements += `<p>User has no todos</p>`;
    }
    todoItems.todos.forEach((todo) => {
      console.log(todo);
      addelements += `<li>${todo.todo}</li>`;
    });
    console.log(addelements);
    $(".todos ul").append(addelements);
  }

  function buildPost(posts) {
    postsAll = posts;
    let addPostElement = "";

    if (posts.posts.length === 0) {
      addPostElement += `<p>User has no posts</p>`;
    } else {
      posts.posts.forEach((post, index) => {
        addPostElement += `<li data-index=${index}><div><p>${post.title}</p><p>${post.body}</p></div></li>`;
      });
    }

    $(".posts ul").append(addPostElement);
  }

  function removeElements() {
    $(".info__content").empty();
    $(".posts h3").empty();
    $(".posts ul").empty();
    $(".todos h3").empty();
    $(".todos ul").empty();
  }

  function createModal(postsAll, index) {
    let modalContent = "";
    modalContent = `
    <div class=overlay>
    <div class=modal>
      <p>${postsAll.posts[index].title}</p>
      <p>${postsAll.posts[index].body}</p>
      <p>Views: ${postsAll.posts[index].views}</p>
      <button>Close Modal</button>
    </div>
    </div>`;

    $("body").append(modalContent);
  }

  function fetchData(id) {
    removeElements();
    fetchUser(id);
    fetchTodos(id);
    fetchPost(id);
  }

  // Begining of laoding
  fetchData(id);

  $("header button:first-child").on("click", function () {
    if (id === 1) {
      id = 30;
    } else {
      id -= 1;
    }
    fetchData(id);
  });

  $("header button:last-child").on("click", function () {
    console.log("clicked");
    if (id === 30) {
      id = 1;
    } else {
      id += 1;
    }
    fetchData(id);
  });

  $(".posts h3").on("click", function () {
    $(this).next().slideToggle();
  });

  $(".todos h3").on("click", function () {
    $(this).next().slideToggle();
  });

  $(".posts ul").on("click", "li div p", function () {
    const index = $(this).closest("li").data("index");
    createModal(postsAll, index);
  });

  $("body").on("click", ".modal button", function () {
    // if the thing that was clicked matched ".modal button", run the funtion.
    $(".overlay").remove();
  });
});
