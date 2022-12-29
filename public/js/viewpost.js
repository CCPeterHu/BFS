const { response } = require("express");
const { post } = require("../../routes/posts");

function buildCardsUsingStrings(data) {
    return `
            <div class="prodcut-card">
                <img class="prod-img" scr="${data.thumbnail}" />
                <div class="prod-info">
                    <p class="prod-title"> ${data.title}</p>
                </div>
            </div>
            `
}


function fetchProducts(){
    let url = "https://dummyjson.com/products";
    // fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         id: 5,
    //         message: "hello"
    //     })
    // });
        fetch(url)
            .then(function(response){
                // console.log(response.json());
                return response.json();
            })
            .then(function(data) {
                // console.log(data.products[0].images[0]);
                let products = data.products;
                let prodctsHTML = "";
                products.forEach(product => {
                    prodctsHTML += buildCardsUsingStrings(product);
                });
                // wrong way doing this, text content does not contain HTML tags!!!
                // document.getElementById('product').textContent = 
                document.getElementById('product').innerHTML = prodctsHTML;
                // console.log(prodctsHTML);
            })
        console.log('test');
}

// fetchProducts();

// function addNewComment(data){
    
// }

// I dont know what this is not working, lettered
// document.getElementById('form-submit-comment').addEventListener('click', function(ev){
    // console.log(ev);
    // console.log('haha I am submit button!');
    // let commentTextElement = document.getElementById('comment-text');
    // let commentText = commentTextElement.value;
    // let postid = ev.currentTarget.dataset.post_id;

    // fetch("/comments/create", {
    //     method: "POST",
    //     headers:{
    //         "Content-Type": "Application/json"
    //     },
    //     body: JSON.stringify({
    //         comment: commentText,
    //         postid: postid;
    //     })

    // })
    // .then(response => response.json())
    // .then(res_json => {
    //     console.log(res_json);
    // })
// })

function fadeOutFlasMsg() {

    if (document.getElementById('flash-message')) {
        let flashDiv = document.getElementById('flash-message');
        setInterval(() => {
            flashDiv.remove();
            clearInterval();
        }, 5000);
    }
}
fadeOutFlasMsg()
