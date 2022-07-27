document.addEventListener('DOMContentLoaded', event => {

    fetch(`http://localhost:3000/publications`)
    .then(response => response.json())
    .then(data => {
        renderPublications(data.data);
    });

function renderPublications(publications) {
    publications.forEach(publication => {
        renderPublication(publication);
    })
}

function renderPublication(publication){
    const div = document.createElement('div');
    div.className="post";
    div.innerHTML = `
        <h1>${publication.attributes.name}</h1>
        <p>${publication.attributes.description}</p>
    `
    document.querySelector('.main').appendChild(div);
}


const navBar = document.querySelector('.navbar');
const newPublication= document.querySelector('#newPublication');
const main = document.querySelector('.main');
       

navBar.addEventListener('mouseover', event=> {
    if (newPublication.style.display ===""){        
        navBar.style.width="10%"
        navBar.querySelector('ul').style.opacity="1";
        main.style.width="90%";
    }
});

navBar.addEventListener('mouseout', event=> {
    if (newPublication.style.display===""){
        navBar.style.width="2%";
        navBar.querySelector('ul').style.opacity="0";
        main.style.width="98%";
    }
});

const newPubLi = document.querySelector("#newPub-li");
newPubLi.addEventListener('click', event => {
    if (newPublication.style.display===""){
        newPublication.style.display="flex";
        newPubLi.style.color = "white";
        newPubLi.style.position = "relative";
        newPubLi.style.right = "2vw";
        main.style.width = "50%";
        navBar.style.width="50%"
        Array.from(document.querySelectorAll('.post')).forEach(post => post.style.flexBasis="100%");
    } else {
        newPublication.style.display="";
        newPubLi.style.position = "static";
        newPubLi.style.color = "";
        navBar.style.width="2%";
        navBar.querySelector('ul').style.opacity="0";
        main.style.width="98%";
        Array.from(document.querySelectorAll('.post:nth-of-type(1n)')).forEach(post => post.style.flexBasis="50%");
        Array.from(document.querySelectorAll('.post:nth-of-type(2n)')).forEach(post => post.style.flexBasis="50%");
        Array.from(document.querySelectorAll('.post:nth-of-type(3n)')).forEach(post => post.style.flexBasis="100%");
    }
})

document.querySelector('#newPubSubmit').addEventListener('click', event => {
    event.preventDefault();
    console.log('yeah');
    const name = document.getElementById('nameInput').value;
    const description = document.getElementById('descriptionInput').value;

    const body = JSON.stringify({ "name": name, "description": description });
    const configObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: body
    };
    console.log(configObj);
    fetch('http://localhost:3000/publications', configObj)
        .then(response => console.log(response))
        .then(data => {
            main.innerHTML = '';
            renderPublications(data.data);
            console.log('yes');
        });
})


});
