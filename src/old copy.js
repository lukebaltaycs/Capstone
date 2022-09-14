document.addEventListener('DOMContentLoaded', event => {

    const URL = 'http:/localhost:3000';

    function baroqueArray(){
        arr = ['https://media.nga.gov/iiif/71e09ac6-9143-49fe-b25b-bb4bf5b56dfc/full/!740,560/0/default.jpg', 'https://walksinsidevenice.com/wp-content/uploads/2020/02/venice-titian-portrait-450x450.jpg', 'https://theculturetrip.com/wp-content/uploads/2016/01/The-Rape-of-Europa.jpg'];
        return arr[Math.floor(Math.random() * arr.length)];
    }
    // let BAROQUEARRAY = ['https://media.nga.gov/iiif/71e09ac6-9143-49fe-b25b-bb4bf5b56dfc/full/!740,560/0/default.jpg', 'https://walksinsidevenice.com/wp-content/uploads/2020/02/venice-titian-portrait-450x450.jpg', 'https://theculturetrip.com/wp-content/uploads/2016/01/The-Rape-of-Europa.jpg'];


    console.log(document.querySelector('body').className);

    //Upon opening page, fetch publications and display them in the .main of the publications wrapper
    fetch(`${URL}/publications`)
    .then(response => response.json())
    .then(data => {
        data.data.forEach(publication => {
            if (document.querySelector('body').className==''){
                renderDefaultPublication(publication);
            } else {
                renderBaroquePublication(publication);
            }
        })
    });

    function renderDefaultPublication(publication){
        const div = document.createElement('div');
        div.className = "post";
        div.style.position="relative";
        div.dataset.id = publication.id;
        div.dataset.name = publication.attributes.name;
        div.dataset.description = publication.attributes.description;
        div.innerHTML += (`
            <h1>${publication.attributes.name}</h1>
            <section class="tags">
            </section>
            <button class="deleteButton">Delete Publication</button>
            <button class="updateButton">Edit Publication</button>
            `);
        fetchTags(publication.relationships.tags.data, div);
        publicationMain.appendChild(div);
    }

    function renderBaroquePublication(publication){
        const div = document.createElement('div');
        div.className = "post";
        div.style.position="relative";
        div.dataset.id = publication.id;
        div.dataset.name = publication.attributes.name;
        div.dataset.description = publication.attributes.description;
        
        div.innerHTML += (`
            <h1>${publication.attributes.name}</h1>
            <section class="tags">
            </section>
            <section class='icons'>
                <span class="material-symbols-outlined deleteButton">delete</span>
                <span class="material-symbols-outlined updateButton">edit</span>
            </section>
            `);
        
    
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'image-div';
        const gradient = document.createElement('div');
        gradient.className = 'gradient'

        const keyImg = document.createElement('img');
        keyImg.setAttribute('src', baroqueArray());
        keyImg.className = 'keyImg'
        const backImg = document.createElement('img');
        backImg.className = 'backImg';
        backImg.setAttribute('src', './images/thisistheone.png');
        fetchTags(publication.relationships.tags.data, div);
        
        imageDiv.appendChild(gradient);
        imageDiv.appendChild(keyImg);
        imageDiv.appendChild(backImg);
        div.appendChild(imageDiv);
        publicationMain.appendChild(div);
    }

    function fetchTags(tags, div){
        tags.forEach(tag => {
            fetch(`${URL}/tags/${tag.id}`)
                .then(response => response.json())
                .then(data => {
                    const p = document.createElement('p');
                    console.log(data.data.attributes.name);
                    p.innerHTML = data.data.attributes.name;
                    div.querySelector('.tags').appendChild(p);
                })
        });
    }


    const publicationNav = document.querySelector('#publicationNavbar'), issueNav = document.querySelector('#issueNavbar');

    const newPublication= document.querySelector('#newPublication'), newIssue = document.querySelector('#newIssue');

    const publicationMain = document.querySelector('#publicationMain'), issueMain = document.querySelector('#issueMain');

    const newPublicationNavLink = document.querySelector("#newPub-li"), newIssueNavLink = document.querySelector('#newIssueLi');

    newIssueSubmit = document.querySelector('#newIssueSubmit');

    const publicationDeleteConfirmation = document.querySelector('#deleteConfirmation'), issueDeleteConfirmation = document.querySelector('#deleteIssueConfirmation');

    const deletePublication = document.querySelector('#deletePublication'), deleteIssue = document.querySelector('#deleteIssue');

    const updatePublication = document.querySelector('#updatePublication'), updateIssue = document.querySelector('#updateIssue');

    const publicationWrapper = document.querySelector('#publication'), issueWrapper = document.querySelector('#issue');

    const singleView = document.querySelector('#single-view');
    const singleViewPosts = document.querySelector('.single-view-posts');
    const singleViewHeader = document.querySelector('#single-view-header');

    const articleView = document.querySelector('#single-article');

    const newArticle = document.querySelector('#newArticle');


    function findActiveWrapper(){
        return Array.from(document.querySelectorAll('wrapper')).find(wrapper => {
            return getComputedStyle(wrapper).display != 'none';
        });
    }

    function makeNavResponsive(nav){
        nav.addEventListener('mouseover', event => {
            if (nav.className===''){        
                nav.style.width="10%";
                nav.querySelector('ul').style.display="block";
            }
        });
        nav.addEventListener('mouseout', event => {
            if (nav.className===''){
                nav.style.width="2%";
                nav.querySelector('ul').style.display="none";
            }
        });
    }

    Array.from(document.querySelectorAll('nav')).forEach(navBar => {
        makeNavResponsive(navBar);
    });

    publicationNav.addEventListener('click', event => {
        if (event.target.matches('li')){
            if (event.target === document.getElementById("homeNavLink")){
                dismissNavAll();
            } else if (event.target == newPublicationNavLink){
                if (shouldActivate(newPublication)){
                    dismissNavAll();
                    highlightLi(newPublicationNavLink, true);
                    halfScreen([newPublication], true);
                } else {
                    highlightLi(newPublicationNavLink, false);
                    halfScreen([newPublication], false);
                }
            }
        }
    })

    issueNav.addEventListener('click', event => {
        if (event.target.matches('li')){
            if (event.target === document.getElementById("backToPubsNavLink")){
                dismissNavAll();
                issueWrapper.style.display = 'none';
                publicationWrapper.style.display="block";
                sideBarify(0, true);
            }else if (event.target == newIssueNavLink){
                if (shouldActivate(newIssue)){
                    sideBarify(0, true);
                    dismissNavAll();
                    highlightLi(newIssueNavLink, true);
                    halfScreen([newIssue], true);
                } else {
                    highlightLi(newIssueNavLink, false);
                    halfScreen([newIssue], false);
                }
            }
        }
    })

    newIssueSubmit.addEventListener('click', event => {
        const name = document.getElementById('issueNameInput').value, number = document.getElementById('issueNumberInput').value;
        const body = JSON.stringify({ name, number, publicationId: issueWrapper.dataset.id});
        fetch(`${URL}/publications`, { method: "POST", headers: headers(), body })
            .then(response => response.json())
            .then(data => {
                renderIssue(data.data);
                clearInputValues(['issueNameInput', 'issueNumberInput']);
                dismissNavAll();
            });
    })

    document.getElementById('newPubSubmit').addEventListener('click', event => {
        const name = document.getElementById('nameInput').value, description = document.getElementById('descriptionInput').value;
        const body = JSON.stringify({ name, description });
        fetch(`${URL}/publications`, { method: "POST", headers: headers(), body })
            .then(response => response.json())
            .then(data => {
                renderPublication(data.data);
                clearInputValues(['nameInput', 'descriptionInput']);
                dismissNavAll();
            });
    })

    publicationMain.addEventListener('mouseover', event => {
        if (event.target.matches('div[class="post"]') || event.target.parentElement.matches('div[class="post"]')){
            if ( event.target.querySelector('.icons'))
                event.target.querySelector('.icons').style.display = 'block';
            else 
            event.target.parentElement.querySelector('.icons').style.display = 'block';

        }
    })

    publicationMain.addEventListener('mouseout', event => {
        if (event.target.matches('div[class="post"]')){
            event.target.querySelector('.icons').style.display = 'none';
        }
    })

    publicationMain.addEventListener('click', event => {
        if (event.target.matches('span[class="material-symbols-outlined deleteButton"]')){
            const publication = event.target.parentElement.parentElement;
            if (shouldActivate(deletePublication, publication.dataset.id)){
                dismissNavAll();
                halfScreen([deletePublication], true);
                publicationDeleteConfirmation.innerText = `Delete ${publication.dataset.name}?`;
                deletePublication.dataset.id = publication.dataset.id;
            } else {
                dismissNavAll();
                halfScreen([deletePublication], false);
                deletePublication.dataset.id = "";
            }
        } else if (event.target.matches('span[class="material-symbols-outlined updateButton"]')){
            const publication = event.target.parentElement.parentElement;
            if (shouldActivate(updatePublication, publication.dataset.id)){
                dismissNavAll();
                halfScreen([updatePublication], true);
                updatePublication.dataset.id = publication.dataset.id;
                updatePublication.querySelector('p').innerText = `Update ${publication.dataset.name}`;
                updatePublication.querySelector('#updateNameInput').value = publication.dataset.name;
                updatePublication.querySelector('#updateDescriptionInput').value = publication.dataset.description;               
            } else {
                dismissNavAll();
                halfScreen([updatePublication], false);
                updatePublication.dataset.id = "";
            }
        } else if (event.target.matches('h1')){
            const selectedPublicationId = event.target.parentElement.dataset.id;
            document.querySelector('#publication').style.display="none";
            issueWrapper.style.display="flex";
            issueWrapper.dataset.id = selectedPublicationId;
            issueWrapper.querySelector('#issueMain').innerHTML='';
            renderIssues(selectedPublicationId);
        }
    })

    issueMain.addEventListener('click', event => {
        if (event.target.matches('button[class="deleteButton"]')){
            const issue = event.target.parentElement;
            if (shouldActivate(deleteIssue, issue.dataset.id)){
                dismissNavAll();
                halfScreen([deleteIssue], true);
                issueDeleteConfirmation.innerText = `Delete issue ${issue.dataset.number}: ${issue.dataset.name}`;
                deleteIssue.dataset.id = issue.dataset.id;
            } else {
                dismissNavAll();
                halfScreen([deleteIssue], false);
                deleteIssue.dataset.id = "";
            }
        } else if (event.target.matches('button[class="updateButton"]')){
            const issue = event.target.parentElement;
            if (shouldActivate(updateIssue, issue.dataset.id)){
                dismissNavAll();
                halfScreen([updateIssue], true);
                updateIssue.dataset.id = issue.dataset.id;
                updateIssue.querySelector('p').innerText = `Update issue ${issue.dataset.number}: ${issue.dataset.name}?`;
                updateIssue.querySelector('#updateIssueNameInput').value = issue.dataset.name;
                updateIssue.querySelector('#updateIssueNumberInput').value = issue.dataset.number;               
            } else {
                dismissNavAll();
                halfScreen([updateIssue], false);
                updateIssue.dataset.id = "";
            }
        } else if (event.target.matches('h1')){
            articleView.dataset.id='';
            articleView.style.display="";
            dismissNavAll();
            const selectedIssueId = event.target.parentElement.dataset.id;
            if (shouldActivate(singleView, selectedIssueId)){
                singleView.dataset.id = selectedIssueId;
                singleViewHeader.querySelector('h1').innerHTML = event.target.parentElement.dataset.name;
                singleViewHeader.dataset.name = event.target.parentElement.dataset.name;
                document.querySelector('.single-view-posts').innerHTML="";
                sideBarify(selectedIssueId, false);
                renderArticles(selectedIssueId);
            } else {
                singleView.style.display="";
                sideBarify(0, true);
            }

        }
    });

    singleViewPosts.addEventListener('click', event => {
        if (event.target.matches('h1')){
            const selectedArticleId = event.target.parentElement.dataset.id;
            if (shouldActivate(articleView, selectedArticleId)){
                singleViewHeader.querySelector('h1').innerHTML = `${singleViewHeader.dataset.name}/ ${event.target.parentElement.dataset.name}`
                articleView.style.display="block";
                articleView.dataset.id = selectedArticleId;
                renderSingleArticle(selectedArticleId);
            } else {
                articleView.dataset.id='';
                articleView.style.display="";
            }
        }
    })


    singleViewHeader.addEventListener('click', event => {
       if (event.target.matches('button[class="new-article"]')){
            if (shouldActivate(newArticle)){
                singleViewHeader.style.height="30vh";
                console.log('new');
                newArticle.style.display="flex";
            } else {
                singleViewHeader.style.height='';
                newArticle.style.display="";
            }
        } else if (event.target.matches('input[id="articleSubmit"] ')) {
            const name = document.getElementById('nameInput').value, description = document.getElementById('descriptionInput').value;
            const body = JSON.stringify({ name, description });
            fetch(`${URL}/articles`, { method: "POST", headers: headers(), body })
                .then(response => response.json())
                .then(data => {
                    renderPublication(data.data);
                    clearInputValues(['nameInput', 'descriptionInput']);
                    dismissNavAll();
                });
        }
    });

    updateArticle = document.querySelector('#updateArticle');

    articleView.addEventListener('click', event => {
        if (event.target.matches('button[class="deleteButton"]')){
            const articleId = event.target.closest('div').dataset.id;
            fetch(`${URL}/articles/${articleId}`, deleteConfigObj())
            .then(response => response.json())
            .then(data => {
                singleViewPosts.querySelector(`.post[data-id='${articleId}']`).remove() 
                articleView.dataset.id='';
                articleView.style.display="";
            }); 
            
        } else if (event.target.matches('button[class="updateButton"]')){
            if (shouldActivate(updateArticle, articleView.dataset.id)){
                updateArticle.style.display = 'block';
                updateArticle.dataset.id = articleView.dataset.id;
            } else {
                updateArticle.style.display = '';
            }
            
        }
    });

    publicationDeleteConfirmation.addEventListener('click', event => {
        const publicationId = event.target.parentElement.dataset.id;
        fetch(`http://localhost:3000/publications/${publicationId}`, deleteConfigObj())
            .then(response => response.json())
            .then(data => {
                document.querySelector(`.post[data-id='${publicationId}']`).remove();
                dismissNavAll();
            }); 
    });

    issueDeleteConfirmation.addEventListener('click', event => {
        const issueId = event.target.parentElement.dataset.id;
        fetch(`${URL}/issues/${issueId}`, deleteConfigObj())
            .then(response => response.json())
            .then(data => {
                document.querySelector(`.post[data-id='${issueId}']`).remove();
                dismissNavAll();
            }); 
    });

    updatePublication.querySelector('#updatePubSubmit').addEventListener('click', event => {
        const name = document.getElementById('updateNameInput').value, description = document.getElementById('updateDescriptionInput').value;
        const body = JSON.stringify({ name, description });
        fetch(`${URL}/publications/${event.target.parentElement.dataset.id}`, { method: "PATCH", headers: headers(), body })
            .then(response => response.json())
            .then(data => {
                const editedPublication = document.querySelector(`.post[data-id="${event.target.parentElement.dataset.id}"]`);
                editedPublication.querySelector('h1').innerHTML = name;
                editedPublication.querySelector('p').innerHTML = description;
                event.target.dataset.id='';
                clearInputValues(['updateNameInput', 'updateDescriptionInputs'])
                dismissNavAll();
            });
    })

    updateIssue.querySelector('#updateIssueSubmit').addEventListener('click', event => {
        const name = document.getElementById('updateIssueNameInput').value, number = document.getElementById('updateIssueNumberInput').value;
        const body = JSON.stringify({ name, number });
        fetch(`${URL}/issues/${event.target.parentElement.dataset.id}`, { method: "PATCH", headers: headers(), body })
            .then(response => response.json())
            .then(data => {
                const editedIssue = document.querySelector(`.post[data-id="${event.target.parentElement.dataset.id}"]`);
                editedIssue.querySelector('h1').innerHTML = `Issue ${data.data.attributes.number}: ${data.data.attributes.name}`;
                event.target.dataset.id = '';
                clearInputValues(['updateIssueNameInput', 'updateIssueNumberInput']);
                dismissNavAll();
            });
    })

    function deleteConfigObj(){
        return { method: "DELETE", headers: headers() };
    }

    function headers(){
        return { "Content-Type": "application/json", "Accept": "application/json" };
    }

    function halfScreen(elements, active){
        let navBar = findActiveWrapper().querySelector('nav');
        if (active){
            navBar.style.width="50%"
            elements.forEach(element => {
                element.style.display='flex';
                element.dataset.id='';
            })
            navBar.className='halfScreen';
            navBar.querySelector('ul').style.display="block";
            // crunchPosts(document, false);
        } else {
            navBar.style.width="2%";
            elements.forEach(element => element.style.display='none' );
            navBar.querySelector('ul').style.display="";
            navBar.className='';
            // crunchPosts(document, true);
        }
    }

    function highlightLi(li, active){
        if(active){
            li.style.color = "white";
            li.style.position = "relative";
            li.style.right = "5vw";
        } else {
            li.style.position = "static";
            li.style.color = "";
        }
    }

    function dismissNavAll(){
        highlightLi(newPublicationNavLink, false);
        highlightLi(newIssueNavLink, false);
        halfScreen([newPublication, deletePublication, updatePublication, newIssue, deleteIssue, updateIssue], false);
    }

    function crunchPosts(root, active){
        if(active) {
            Array.from(root.querySelectorAll('.post:nth-of-type(1n)')).forEach(post => post.style.flexBasis="50%");
            Array.from(root.querySelectorAll('.post:nth-of-type(2n)')).forEach(post => post.style.flexBasis="50%");
            Array.from(root.querySelectorAll('.post:nth-of-type(3n)')).forEach(post => post.style.flexBasis="100%");
        } else {
            Array.from(root.querySelectorAll('.post')).forEach(post => post.style.flexBasis="100%");
        }
    }

    function renderIssues(publicationId){
        fetch(`${URL}/publications/${publicationId}`)
            .then(response => response.json())
            .then(data => data.included.filter(included => {return included.type==='issue'}).forEach( issue => renderIssue(issue) ));
    }

    function renderIssue(issue){
        const div = document.createElement('div');
        div.className = "post";
        div.dataset.id = issue.id;
        div.dataset.number = issue.attributes.number;
        console.log(issue.attributes.number);

        div.dataset.name = issue.attributes.name;
        div.innerHTML = (`
            <h1>Issue ${issue.attributes.number}: ${issue.attributes.name}</h1>
            <button class="deleteButton">Delete Issue</button>
            <button class="updateButton">Edit Issue</button>
        `);
        issueMain.appendChild(div);
    }

    function renderArticles(issueId){
        fetch(`${URL}/issues/${issueId}`)
            .then(response => response.json())
            .then(data => data.included.forEach( article => renderArticle(article) ));
    }

    function renderArticle(article){
        const div = document.createElement('div');
        div.className = "post";
        div.dataset.id = article.id;
        div.dataset.name = article.attributes.name;
        div.innerHTML = (`<h1>${article.attributes.name}</h1>`);
        document.querySelector('.single-view-posts').appendChild(div);
    }

    function renderSingleArticle(articleId){
        fetch(`${URL}/articles/${articleId}`)
            .then(response => response.json())
            .then(data => {
                articleView.innerHTML = (`
                <h1>${data.data.attributes.name}</h1>
                <p>${data.data.attributes.content}<p>
                <p>${data.data.attributes.file}<p>
                <button class="deleteButton">Delete Article</button>
                <button class="updateButton">Edit Article</button>`)
            
        singleViewHeader.innerHTML
        });
    }

    function sideBarify(id, active) {
        if (active) {
            singleView.style.display="";            
            crunchPosts(issueMain, true);
            issueMain.style.alignContent="";
            Array.from(issueMain.querySelectorAll('.post')).forEach(post => {
                post.style.backgroundColor='';
                post.style.overflow="auto";
                post.style.height="40vh";
                post.style.padding="";
                post.style.fontSize="";
                post.querySelector('.deleteButton').style.display="block";
                post.querySelector('.updateButton').style.display="block";
            });
            
        } else {
            issueMain.style.alignContent="start";
            singleView.dataset.id=id;
            singleView.style.display="flex";
            issueMain.style.flexBasis="10%";            
            Array.from(issueMain.querySelectorAll('.post')).forEach(post => {
                post.style.backgroundColor="";
                post.style.height="15vh";
                post.style.padding="0rem";
                post.style.fontSize=".5rem";
                post.style.flexBasis="100%";
                post.style.overflow="fixed";
                post.querySelector('.deleteButton').style.display="none";
                post.querySelector('.updateButton').style.display="none";
            });
            issueMain.querySelector(`.post[data-id="${id}"]`).style.backgroundColor="white";
        }
    }

    function shouldActivate(navForm, elementId){
        return (elementId) ? ( navForm.style.display==='' || navForm.style.display=="none" || navForm.dataset.id != elementId ) : ( navForm.style.display==='' || navForm.style.display=="none");
    }

    function clearInputValues(elements){
        elements.forEach(element => document.getElementById(element).value = '');
    }


});