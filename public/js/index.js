/**
 * build a photo div using a template literal
 * @param {*} data about each photo
 * @returns a string consisting of HTML elements.
 */
// String version start.
// function buildPhotoUsingString(data) {
//     return `
//     <div class="product-card">
//     <img class="product-img" src="${data.url} alt="Fake photo for id: ${data.url} style="width: 100%; height: 100%""/>
//     <div class="prod-info">
//         <p class="prod-title">${data.title}</p>
//     </div>
//     </div>
//       `
// }


// import { request } from "express";

// function fetchPhotos() {
//     url = "https://jsonplaceholder.typicode.com/albums/2/photos";
//     var counter = 0;
//     fetch(url)
//         //   return json object 
//         .then(response => {
//             return response.json();
//         })
//         // photos: array of json objs 
//         .then(photos => {
//             let htmlString = '';
//             // console.log(photos);
//             counter += 1;
//             photos.forEach(photo => {
//                 htmlString += buildPhotoUsingString(photo);
//             });

//             document.getElementById('product-list').innerHTML = htmlString;
//             // document.getElementById('product_count').innerHTML = "photo count: " + photos.length;
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }
// String version end.

/**
 * fade out an image 
 * @param {el} image element for fade out
 * @param {currentTarget} currentTarget of the image element DOM tree.
 */
// function fadeOut(el, currentTarget){
//     var opacity = 1;
//     var timer = setInterval(function(){
//         if(opacity <= 0.1){
//             currentTarget.remove();
//         }
//         el.style.opacity = opacity;
//         opacity -=0.1;
//     }, 100);
// }

/**
 * build a photo div with DOM API
 * @param {*} a container element that stores template literal
 * @param {*} data about a photo
 */

function buildPhotoUsingDOMAPI(container, data) {
    //set a card div element
    let cardDiv = document.createElement('div');

    cardDiv.addEventListener('click', function (ev) {
        // console.log(ev.target);
        // console.log('/n' + ev.currentTarget.remove());
        let myDiv = ev.currentTarget;
        let op = 1;
        let t = setInterval(() => {
            myDiv.style.opacity = op;
            op -= 0.1;
            // console.log("current op is: " + myDiv.style.opacity + ',  op' + op);
            if (op < 0) {
                clearInterval(t);
                myDiv.remove();
                op = 1;
                setPhotoCount();
            }
        }, 100);


        // ev.currentTarget.remove();
    });
    // cardDiv.className
    // set attribute of cardDiv. can be class, id, etc.
    cardDiv.setAttribute('class', 'product-card');
    let imgElement = document.createElement('img');
    // imgElement.src = data.url;
    imgElement.setAttribute('src', data.url);
    imgElement.setAttribute('class', 'prod-img');
    let prodInfoDiv = document.createElement('div');
    prodInfoDiv.setAttribute('class', 'prod-info');
    let titleP = document.createElement('p');
    titleP.setAttribute('class', 'prod-title');
    titleP.appendChild(document.createTextNode(data.title));

    //append elements to cardDiv root.
    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(prodInfoDiv);
    prodInfoDiv.appendChild(titleP);
    container.appendChild(cardDiv);
}

function fetchPhotos() {
    url = "https://jsonplaceholder.typicode.com/albums/2/photos";
    var counter = 0;
    fetch(url)
        //   return json object 
        .then(response => {
            return response.json();
        })
        // photos: array of json objs 
        .then(photos => {
            let htmlString = '';
            // console.log(photos);
            // counter += 1;
            let container = document.getElementById('product-list');
            let containerFragment = document.createDocumentFragment();
            photos.forEach(photo => {
                buildPhotoUsingDOMAPI(containerFragment, photo);
            });
            container.appendChild(containerFragment);
            // document.getElementById('product-list').innerHTML = htmlString;
            // document.getElementById('product_count').innerHTML = "photo count: " + photos.length;
            // document.getElementById('product_count').innerHTML = "photo count: " + document.getElementById('product-list').childElementCount;
            setPhotoCount();
        })
        .catch(error => {
            // console.log(error);
        });
}


function setPhotoCount() {
    // let product_count = document.querySelectorAll('.product-card').length;
    // console.log("count:  " + product_count);
    document.getElementById('product_count').innerHTML = "photo count: " + document.getElementById('product-list').childElementCount;
}

function fadeOutFlasMsg() {

    if (document.getElementById('flash-message')) {
        let flashDiv = document.getElementById('flash-message');
        setInterval(() => {
            flashDiv.remove();
            clearInterval();
        }, 5000);
    }
}

// fetchPhotos();

fadeOutFlasMsg();

// setPhotoCount();