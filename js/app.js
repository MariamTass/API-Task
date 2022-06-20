let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')



let postBox = [];

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            postBox = data
            renderUI(postBox)
        })


}

getPosts();

postForm.addEventListener('submit', createPost)


function createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            postBox.unshift(data);            
            let postHolder = '';
            postBox.forEach(post => {
                postHolder += `
                <div class="col-md-4 mb-3">
                    <div class="card h-100">
                        <img src="img/nikita-kachanovsky-g-YiX8ynmnY-unsplash.jpg" class="card-img-top" alt="...">
                        <div class = "card-header">
                            <p>${post.id}</p>
                        </div>
                        <div class="card-body">    
                            <h6 class = "fw-bolder" id="post-title">${post.title}</h6>
                            <p id="post-body">${post.body}</p>
                            <div class="d-flex justify-content-between">
                                <div class="justify-content-sm-between">
                                    <button class="btn btn-primary" onclick= "updatePost(${post.id})"><i class="bi bi-pencil pe-1"></i>Update</button>
                                    <button class="btn btn-secondary" id= "view-btn" onclick= "openView(${post.id})"><i class="bi bi-eye pe-1"></i>Read more</button>
                                </div>
                                  <div class="">
                                    <button class="btn btn-danger" onclick= "deletePost(${post.id})"><i class="bi bi-trash pe-1"></i>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            });
            postWrapper.innerHTML = postHolder;
        })
}

function updatePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let postTitles = document.querySelectorAll('.post-title')
            let postBodies = document.querySelectorAll('.post-body')
            
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }

            })

        });
}



function openPage(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'page.html'
        });
}

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            
            postBox = postBox.filter(post => post.id !== id)
            renderUI(postBox)  
        })

}

function renderUI (arr) {
    let postHolder = '';
            arr.forEach(post => {
                postHolder += `
                <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <img src="img/nikita-kachanovsky-g-YiX8ynmnY-unsplash.jpg" class="card-img-top" alt="...">
                    <div class = "card-header">
                        <p>${post.id}</p>
                    </div>
                    <div class="card-body">
                        <h6 class = "fw-bolder" id="post-title">${post.title}</h6>
                        <p id="post-body">${post.body}</p>
                        <div class="d-flex justify-content-between">
                            <div class="justify-content-sm-between">
                                <button class="btn btn-primary" onclick= "updatePost(${post.id})"><i class="bi bi-pencil pe-1"></i>Update</button>
                                <button class="btn btn-secondary" id= "view-btn" onclick= "openView(${post.id})"><i class="bi bi-eye pe-1"></i>View</button>
                            </div>
                              <div class="">
                                <button class="btn btn-danger" onclick= "deletePost(${post.id})"><i class="bi bi-trash pe-1"></i>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `
            });
            postWrapper.innerHTML = postHolder;

}




