document.addEventListener('DOMContentLoaded', event => {

    const URL = 'http:/localhost:3000';

    function baroqueArray(){
        arr = ['https://media.nga.gov/iiif/71e09ac6-9143-49fe-b25b-bb4bf5b56dfc/full/!740,560/0/default.jpg', 'https://walksinsidevenice.com/wp-content/uploads/2020/02/venice-titian-portrait-450x450.jpg', 'https://theculturetrip.com/wp-content/uploads/2016/01/The-Rape-of-Europa.jpg'];
        return arr[Math.floor(Math.random() * arr.length)];
    }

    //Upon opening page, fetch publications and display them in the .main of the publications wrapper
    function fillHerUp(){
        fetch(`${URL}/publications`)
        .then(response => response.json())
        .then(data => {
            data.data.forEach(publication => {
                if (document.querySelector('body').className==''){
                    // renderDefaultPublication(publication);
                } else {
                    renderBaroquePublication(publication);
                }
            })
        });
    }

    fillHerUp();
    // function renderDefaultPublication(publication){
    //     const div = document.createElement('div');
    //     div.className = `post ${publication.attributes.post}`;
    //     div.style.position = "relative";
    //     div.dataset.id = publication.id;
    //     div.dataset.name = publication.attributes.name;
    //     div.dataset.description = publication.attributes.description;
    //     div.innerHTML += (`
    //         <h1>${publication.attributes.name}</h1>
    //         <section class="tags">
    //         </section>
    //         <button class="deleteButton">Delete Publication</button>
    //         <button class="updateButton">Edit Publication</button>
    //         `);
    //     fetchTags(publication.relationships.tags.data, div);
    //     publicationMain.appendChild(div);
    // }


    function handlePostInput(postValue){
        if (postValue && ['p-post', 'd-post', 'e-post'].includes(postValue)){
            return postValue;
        } else {
            if (postValue == 'Pretentious'){
                return 'p-post';
            } else if (postValue == 'Elegant'){
                return 'e-post';
            } else {
                return 'd-post';
            }
        }

        // if (publication.attributes.post && ['p-post', 'd-post', 'e-post'].includes(publication.attributes.post)){
        //     div.className = `post ${publication.attributes.post}`;
        //     div.dataset.post = publication.attributes.post;
        // } else {
        //     if (publication.attributes.post == 'Pretentious'){
        //         div.className = `post p-post`;
        //         div.dataset.post = 'p-post';
        //     } else if (publication.attributes.post == 'Elegant'){
        //         div.className = `post e-post`;
        //         div.dataset.post = 'e-post';
        //     } else {
        //         div.className = `post d-post`;
        //         div.dataset.post = 'd-post';
        //     }
        // }
    }

    function renderBaroquePublication(publication){
        const div = document.createElement('div');
        const post = handlePostInput(publication.attributes.post);
        div.dataset.post = post;
        div.className  =`post ${post}`;
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
            <div class="image-div">
                <div class="gradient"></div>
                <img class="keyImg" src=${baroqueArray()}>
                <img class="backImg" src='./images/thisistheone.png'>
            </div>
            `);
        fetchTags(publication.relationships.tags.data, div);
        publicationMain.appendChild(div);
    }

    function fetchTags(tags, div){
        let x = 1;
        let count = tags.length;
        while (3 > count){
            const p = document.createElement('p');
            p.className = `tag-${count+1}`;
            div.querySelector('.tags').appendChild(p);
            count++;
        }
        tags.forEach(tag => {
            fetch(`${URL}/tags/${tag.id}`)
                .then(response => response.json())
                .then(data => {
                    const p = document.createElement('p');
                    p.innerHTML = data.data.attributes.name;
                    p.className = `tag-${x}`;
                    div.querySelector('.tags').appendChild(p);
                    x++;
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
                    // highlightLi(newPublicationNavLink, true);
                    halfScreen([newPublication], true);
                } else {
                    // highlightLi(newPublicationNavLink, false);
                    halfScreen([newPublication], false);
                }
            }
        }
    })

    publicationNav.addEventListener('mouseover', event => {
        if (event.target.matches('.dropdown-list li')){
            console.log('hello');
            const optionValue = event.target.querySelector('em').innerHTML;
            event.target.parentElement.parentElement.querySelector('.drop-button').value = optionValue;
        } else if (event.target.matches('.dropdown-list em')){
            console.log('hi');
            const optionValue = evesingnt.target.innerHTML;
           event.target.parentElement.parentElement.parentElement.querySelector('.drop-button').value = optionValue;
        }
    });
    
    const updatePublicationE = document.querySelector('#updatePublication-embed');

    issueNav.addEventListener('click', event => {
        console.log(event.target)
        if (event.target.matches('li')){
            if (event.target === document.getElementById("backToPubsNavLink")){
                dismissNavAll();
                dismissSingleIssue();
                issueWrapper.style.display = 'none';
                publicationMain.innerHTML = '';
                fillHerUp();
                publicationWrapper.style.display="block";
            }else if (event.target == newIssueNavLink){
                if (shouldActivate(newIssue)){
                    sideBarify(0, true, true);
                    dismissNavAll();
                    halfScreen([newIssue], true);
                } else {
                    halfScreen([newIssue], false);
                }
            } else if (event.target === document.getElementById("updatePubLi-embed")){
                if (shouldActivate(document.getElementById("updatePublication-embed"))){
                    fetch (`${URL}/publications/${document.querySelector('#publication-details').dataset.id}`)
                        .then(response => response.json())
                        .then(data => {
                            updatePublicationE.dataset.id = data.data.id;
                            updatePublicationE.querySelector('p').innerText = `Edit ${data.data.attributes.name}`;
                            updatePublicationE.querySelector('#updateNameInput-embed').value = data.data.attributes.name;
                            updatePublicationE.querySelector('#update-pub-drop-button-embed').value = data.data.attributes.post;
                            updatePublicationE.querySelector('#updateDescriptionInput-embed').value = data.data.attributes.description;
                        })
                    sideBarify(0, true);
                    dismissNavAll();
                    halfScreen([document.getElementById("updatePublication-embed")], true)
                } else {
                    halfScreen([document.getElementById("updatePublication-embed")], false)
                }
            } else if (event.target === document.querySelector('#backToPubSoloNavLink')){
                dismissSingleIssue();
            }
        } else if (event.target === document.querySelector('#updatePubSubmit-embed')){
            const name = document.getElementById('updateNameInput-embed').value, description = document.getElementById('updateDescriptionInput-embed').value, post = handlePostInput(document.getElementById('update-pub-drop-button-embed').value);
            const body = JSON.stringify({ name, description, post });
            fetch(`${URL}/publications/${event.target.parentElement.dataset.id}`, { method: "PATCH", headers: headers(), body })
                .then(response => response.json())
                .then(data => {
                    const editedPublication = publicationDetails;
                    publicationDetails.querySelector('h1').innerHTML = name;
                    publicationDetails.querySelector('h1').innerHTML = name;
                    publicationDetails.querySelector('#blowup').innerHTML = name;
                    publicationDetails.querySelector('#pub-details-desc').innerHTML = description;
                    tagField.innerHTML = '';
                    fetchTags(data.data.relationships.tags.data, publicationDetails);
                    clearInputValues(['updateNameInput-embed', 'updateDescriptionInput-embed', 'update-pub-drop-button-embed'])
                    dismissNavAll();
                });
        } else if (event.target === document.querySelector('#submitTags')){
            // dismissNavAll();
            // halfScreen([editTags], false);

            arr = [document.getElementById('tag-1'), document.getElementById('tag-2'), document.getElementById('tag-3')];
            arr.forEach(tag => {
                const activePublicationId = publicationDetails.dataset.id;
                const newValue = tag.value;
                const search = `${tag.id}`;
                console.log(`search: ${search}`)
                console.log(Array.from(publicationDetails.getElementsByClassName(tag.id)));
                const oldValue = Array.from(publicationDetails.getElementsByClassName(search))[0].innerHTML;
                if (newValue != oldValue){
                    console.log(`${newValue} does not equal ${oldValue}`)
                    if (oldValue != ''){
                        findAndDeletePublicationTag(oldValue, activePublicationId);
                    }
                    findOrCreateTag(newValue, activePublicationId);
                    wrapUpTags(activePublicationId);
                    // console.log(`activeTagId: ${activeTagId}`)
                    // createNewPublicationTag(activePublicationId, activeTagId, arr);
                    }
                });
        }   
    });

    function findOrCreateTag(newValue, activePublicationId){
        fetch (`${URL}/tags`)
            .then (response => response.json())
            .then(data => {
                const arr = Array.from(data.data);
                console.log('data: ')
                console.log(arr);
                let search = arr.find(tag => tag.attributes.name === newValue);
                if (search === undefined || search.length == 0){
                    const name = newValue;
                    fetch (`${URL}/tags`, {method: 'POST', headers: headers(), body: JSON.stringify({name})})
                        .then (response => response.json())
                        .then (data => {
                            console.log(`data.data: ${data.data}`);
                            console.log(`data.data.id: ${data.data.id}`);
                            const activeTagId = data.data.id;
                            console.log(`aTagId: ${activeTagId}`);
                            createNewPublicationTag(activePublicationId, activeTagId, arr);
                            return 0;
                        });
                }
                const activeTagId = search.id;
                console.log(`aTagId: ${activeTagId}`);
                createNewPublicationTag(activePublicationId, activeTagId, arr);
                return 0;
                
            });
    }

    function createNewPublicationTag(publicationId, tagId, arr){
        fetch (`${URL}/publication_tags`, {method: 'POST', headers: headers(), body: JSON.stringify({publication_id: publicationId, tag_id: tagId})})
                    .then (response => response.json())
                    .then (data => { console.log(data)});
    }

    function findAndDeletePublicationTag(oldValue, publicationId){
        fetch (`${URL}/publications/${publicationId}`)
            .then (response => response.json())
            .then (data => {
                const arr = Array.from(data.included).filter(item => item.type === 'tag');
                const tagId = arr.find(tag => tag.attributes.name === oldValue).id;
                console.log(`tag-id: ${tagId}`)
                const arr2 = Array.from(data.included).filter(item => item.type === 'publication_tag');
                console.log(arr2)
                const publicationTagId = arr2.find(publicationTag => publicationTag.relationships.tag.data.id = tagId).id;
                console.log(`p-tag-id: ${publicationTagId}`)
                deletePublicationTag(publicationTagId);
            })
    }

    function deletePublicationTag(publicationTagId){
        fetch(`${URL}/publication_tags/${publicationTagId}`, deleteConfigObj())
            .then(response => response.json())
            .then(data => { });
    }

    newIssueSubmit.addEventListener('click', event => {
        const name = document.getElementById('issueNameInput').value, number = document.getElementById('issueNumberInput').value;
        const body = JSON.stringify({ name, number, publicationId: issueWrapper.dataset.id});
        fetch(`${URL}/issues`, { method: "POST", headers: headers(), body })
            .then(response => response.json())
            .then(data => {
                renderIssue(data.data);
                clearInputValues(['issueNameInput', 'issueNumberInput']);
                dismissNavAll();
            });
    })

    // CREATE NEW PUBLICATION
    document.getElementById('newPubSubmit').addEventListener('click', event => {
        const name = document.getElementById('nameInput').value, description = document.getElementById('descriptionInput').value, post = document.getElementById('new-pub-drop-button').value;
        const body = JSON.stringify({ name, description, post });
        fetch(`${URL}/publications`, { method: "POST", headers: headers(), body })
            .then(response => response.json())
            .then(data => {
                renderBaroquePublication(data.data);
                clearInputValues(['nameInput', 'descriptionInput', 'new-pub-drop-button']);
                dismissNavAll();
            });
    })

    publicationMain.addEventListener('mouseover', event => {
        if (event.target.matches('div[class="post"]')){
            if (event.target.querySelector('.icons'))
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
                updatePublication.querySelector('#update-pub-drop-button').value = publication.dataset.post;
                updatePublication.querySelector('#updateDescriptionInput').value = publication.dataset.description;
            } else {
                dismissNavAll();
                halfScreen([updatePublication], false);
                updatePublication.dataset.id = "";
            }
        } else if (event.target.matches('h1')){
            const selectedPublicationId = event.target.parentElement.dataset.id;
            document.querySelector('#publication').style.display="none";
            document.querySelector('#updatePubLi-embed').innerHTML = `Edit ${event.target.parentElement.dataset.name}`
            issueWrapper.style.display="flex";
            issueWrapper.dataset.id = selectedPublicationId;
            Array.from(issueWrapper.querySelectorAll('#issueMain div[class="post"]')).forEach(post => {
                post.remove();
            });         
            renderPublicationDetails(selectedPublicationId);
            renderIssues(selectedPublicationId);
        } else if (event.target.matches('p')){
            pubSearch.value = event.target.innerHTML;
            filter(event.target.innerHTML);
        }
    })

    const publicationDetails = document.querySelector('#publication-details');
    const header = publicationDetails.querySelector('h1');
    const descField = publicationDetails.querySelector('#pub-details-desc');
    const tagField = publicationDetails.querySelector('.tags');

    function renderPublicationDetails(publicationId){
        // header, description, tags, background
        publicationDetails.dataset.id = publicationId;
        
        tagField.innerHTML = '';
        fetch(`${URL}/publications/${publicationId}`)
            .then(response => response.json())
            .then(data => {
                header.innerHTML = data.data.attributes.name;
                publicationDetails.querySelector('#blowup').innerHTML = data.data.attributes.name;
                descField.innerHTML = data.data.attributes.description;
                fetchTags(data.data.relationships.tags.data, publicationDetails);
            })


    }

    function wrapUpTags(selectedPublicationId){
        document.getElementById('tag-1').value = "";
        document.getElementById('tag-2').value = "";
        document.getElementById('tag-3').value = "";
        dismissNavAll();
        renderPublicationDetails(selectedPublicationId);
    }

    // EDIT TAGS
    const editTags = document.querySelector('#edit-tags');

    publicationDetails.querySelector('.tags').addEventListener('click', event => {
        if (shouldActivate(editTags)){
            dismissNavAll();
            halfScreen([editTags], true);
            editTags.querySelector('p').innerText = `Edit Tags Of ${event.target.parentElement.parentElement.querySelector('h1').innerHTML}`
            document.getElementById('tag-1').value = `${event.target.parentElement.querySelector('.tag-1').innerHTML}`;
            document.getElementById('tag-2').value = `${event.target.parentElement.querySelector('.tag-2').innerHTML}`;
            document.getElementById('tag-3').value = `${event.target.parentElement.querySelector('.tag-3').innerHTML}`;
        } else {
            halfScreen([editTags], false);
        }
    })

    issueMain.addEventListener('click', event => {
        if (event.target.matches('button[class="deleteButton"]')){
            const issue = event.target.parentElement;
            if (shouldActivate(deleteIssue, issue.dataset.id)){
                dismissNavAll();
                halfScreen([deleteIssue], true);
                issueDeleteConfirmation.innerText = `Delete issue ${issue.dataset.number}: ${issue.dataset.name}?`;
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
                dismissPubDetails(false);
                addBackToLi(publicationDetails.querySelector('h1').innerHTML, 'publication', true);
                singleView.dataset.id = selectedIssueId;
                singleViewHeader.querySelector('h1').innerHTML = event.target.parentElement.dataset.name;
                singleViewHeader.dataset.name = event.target.parentElement.dataset.name;
                document.querySelector('.single-view-posts').innerHTML="";
                sideBarify(selectedIssueId, false);
                renderArticles(selectedIssueId);
            } else {
                dismissSingleIssue();
            }
        }
    });

    function dismissSingleIssue(){
        publicationDetails.dataset.id = '';
        dismissPubDetails(true);
        addBackToLi(0, 'publication', false);
        singleView.style.display="none";
        sideBarify(0, true, true);
    }

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
                newArticle.style.display="flex";
            } else {
                singleViewHeader.style.height='';
                newArticle.style.display="";
            }
        } else if (event.target === singleViewHeader.querySelector('#articleSubmit')){
            const name = document.getElementById('articleNameInput').value, content = document.getElementById('articleContentInput').value, file = document.getElementById('articleFileInput').value;
            const body = JSON.stringify({ name, content, file, issue_id: singleView.dataset.id});
            fetch(`${URL}/articles`, { method: "POST", headers: headers(), body })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    renderArticle(data.data);
                    clearInputValues(['articleNameInput', 'articleContentInput', 'articleFileInput']);
                    singleViewHeader.style.height='';
                    newArticle.style.display="";
                });
        }
        // } else if (event.target.matches('input[id="articleSubmit"] ')) {
        //     const name = document.getElementById('nameInput').value, description = document.getElementById('descriptionInput').value;
        //     const body = JSON.stringify({ name, description });
        //     fetch(`${URL}/articles`, { method: "POST", headers: headers(), body })
        //         .then(response => response.json())
        //         .then(data => {
        //             renderBaroquePublication(data.data);
        //             clearInputValues(['nameInput', 'descriptionInput']);
        //             dismissNavAll();
        //         });
        // }
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
                console.log(publicationMain.querySelector(`.post[data-id='${publicationId}']`));
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

    // UPDATE PUBLICATION
    updatePublication.querySelector('#updatePubSubmit').addEventListener('click', event => {
        const name = document.getElementById('updateNameInput').value, description = document.getElementById('updateDescriptionInput').value, post = handlePostInput(document.getElementById('update-pub-drop-button').value);
        const body = JSON.stringify({ name, description, post });
        fetch(`${URL}/publications/${event.target.parentElement.dataset.id}`, { method: "PATCH", headers: headers(), body })
            .then(response => response.json())
            .then(data => {
                const editedPublication = document.querySelector(`.post[data-id="${event.target.parentElement.dataset.id}"]`);
                editedPublication.querySelector('h1').innerHTML = name;
                editedPublication.className = `post ${post}`;
                event.target.dataset.id='';
                event.target.dataset.post = post;
                clearInputValues(['updateNameInput', 'updateDescriptionInput', 'new-pub-drop-button'])
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
                editedIssue.dataset.number = data.data.attributes.number;
                editedIssue.dataset.name = data.data.attributes.name;
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
            crunchPosts(document, false, false);
        } else {
            navBar.style.width="2%";
            elements.forEach(element => element.style.display='none' );
            navBar.querySelector('ul').style.display="";
            navBar.className='';
            crunchPosts(document, true, false);
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
        // highlightLi(newPublicationNavLink, false);
        // highlightLi(newIssueNavLink, false);
        halfScreen([newPublication, deletePublication, updatePublication, newIssue, deleteIssue, updateIssue, updatePublicationE, editTags], false);
    }

    issueNav.addEventListener('mouseover', event => {
        if (!shouldActivate(singleView))
            issueMain.style.display = "";
    })

    issueNav.addEventListener('mouseoff', event => {
        if (!shouldActivate(singleView))
            issueMain.style.display = "flex";
    })

    function crunchPosts(root, active, legacy){
        if(active) {
            Array.from(root.querySelectorAll('.post:nth-of-type(1n)')).forEach(post => post.style.flexBasis="50%");
            Array.from(root.querySelectorAll('.post:nth-of-type(2n)')).forEach(post => post.style.flexBasis="50%");
            if(legacy)
                Array.from(root.querySelectorAll('.post:nth-of-type(3n)')).forEach(post => post.style.flexBasis="100%");
            else
                Array.from(root.querySelectorAll('.post:nth-of-type(3n)')).forEach(post => post.style.flexBasis="50%");
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
                const date = new Date(data.data.attributes.created_at);
                articleView.innerHTML = (`
                <h1>${data.data.attributes.name}</h1>
                <p>${date.toDateString()}<p>
                <p>${data.data.attributes.content}<p>
                <p><a href=${data.data.attributes.file}>File</a></p>
                <button class="deleteButton">Delete Article</button>
                <button class="updateButton">Edit Article</button>`)
            
        singleViewHeader.innerHTML
        });
    }

    function sideBarify(id, active, legacy) {
        if (active) {
            singleView.style.display="";            
            crunchPosts(issueMain, true, legacy);
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

    function dismissPubDetails(active){
        if (active){
            publicationDetails.style.display = 'flex';
        } else {
            publicationDetails.style.display = 'none';
        }
    }

    function dismissBackToPubSolo(active){
        if (active){
            document.getElementById('backToPubSoloNavLink').style.display = 'flex';
        } else {
            document.getElementById('backToPubSoloNavLink').style.display = 'none';
        }
    }

    function addBackToLi(name, sort, active){
        if (active){
            if (sort === 'publication'){
                dismissBackToPubSolo(true);
                document.getElementById('backToPubSoloNavLink').innerHTML = `Back To ${name}`
            }
    } else {
        dismissBackToPubSolo(false);
    }

    }

    function shouldActivate(navForm, elementId){
        return (elementId) ? ( navForm.style.display==='' || navForm.style.display=="none" || navForm.dataset.id != elementId ) : ( navForm.style.display==='' || navForm.style.display=="none");
    }

    function clearInputValues(elements){
        elements.forEach(element => document.getElementById(element).value = '');
    }


    Array.from(document.querySelectorAll('.dropdown-list')).forEach(dropdown => dropdown.addEventListener('mouseover', event => {
        if (event.target.matches('.dropdown-list li')){
            const optionValue = event.target.querySelector('em').innerHTML;
            event.target.parentElement.parentElement.querySelector('.drop-button').value = optionValue;
        } else if (event.target.matches('.dropdown-list em')){
            const optionValue = event.target.innerHTML;
           event.target.parentElement.parentElement.parentElement.querySelector('.drop-button').value = optionValue;
        }
    }));

    const pubSearch = document.querySelector('#pub-search');
    pubSearch.addEventListener('input', event => {
        event.preventDefault();
        const value = pubSearch.value;
        filter(value);
    })

    function filter(value) {
        const arr = Array.from(publicationMain.childNodes);
        console.log(arr[0]);
        arr.shift();
        console.log(arr[0]);
        arr.forEach(post => {
            const name = post.dataset.name;
            const tags = Array.from(post.querySelectorAll('p')).map(tag => tag.innerHTML.toLowerCase());
            if (name.toLowerCase().includes(value.toLowerCase()) && value !=' ' && value !=' ') {
                post.style.display = 'flex';
            } else if (tags.includes(value.toLowerCase())){
                post.style.display = 'flex';
            } else {
                post.style.display = 'none';
            }
        })

        if (arr.filter(post => post.style.display == 'flex').length === 0){
            arr.forEach(post => {
                post.style.display = 'flex';
            })
        }
    }


});