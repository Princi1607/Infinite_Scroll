
const postContainer = document.querySelector('.posts-container'); 
const loader = document.querySelector('.loader'); 

const POST_API_URL = 'https://jsonplaceholder.typicode.com/posts';
const CAT_FACT_API_URL = 'https://catfact.ninja/fact';

let limit = 5; 
let page = 1; 

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

async function getPosts() {
    try {
        showLoader(); 
        const response = await fetch(`${POST_API_URL}?_limit=${limit}&_page=${page}`); 
        const posts = await response.json(); 
        hideLoader(); 
        displayPosts(posts); 
        page++; 
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

async function getCatFact() {
    try {
        const response = await fetch(CAT_FACT_API_URL);
        const data = await response.json();
        return data.fact; 
    } catch (error) {
        console.error("Error fetching cat fact:", error);
        return "Couldn't fetch a cat fact!";
    }
}

async function displayPosts(posts) {
    for (const post of posts) {
        const postElement = document.createElement('div'); 
        postElement.classList.add('post'); 

        const catFact = await getCatFact();

        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
            <p class="cat-fact"><strong>Cat Fact:</strong> ${catFact}</p>
        `;
        postContainer.appendChild(postElement); 
    }
}

function loadMorePosts() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        getPosts(); 
    }
}



window.addEventListener('scroll', loadMorePosts);



getPosts();
