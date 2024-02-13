
const btn = document.querySelector(".circle");
const wrapper = document.querySelector(".wrapper");
const list=document.querySelector('.list');
const nav = document.querySelector(".nav");
const main=document.querySelector('.main');
const signin=document.querySelector('.sign-text')
btn.addEventListener('click', () => {
    btn.classList.toggle('left');
    btn.classList.toggle('right');
    wrapper.classList.toggle('white');
    wrapper.classList.toggle('black');
    list.classList.toggle('yellow')
    nav.classList.toggle('light');
    nav.classList.toggle('border');
   main.classList.toggle('black')
});

signin.addEventListener('click',()=>{
    openLoginModal();
 
  
})

document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.getElementById('categoryList');
    const container = document.getElementById('book-container');

    let allbooks=[];

    const fetchData = async () => {
        try {
            const res = await fetch('https://books-backend.p.goit.global/books/top-books');
            const data = await res.json();

            if (data && data.length > 0) {
                updateSidebar(data);
                displayBooks(data.reduce((allBooks, item) => allBooks.concat(item.books), []));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateSidebar = (bookList) => {
        categoryList.addEventListener('click', (event) => {
            if (event.target.classList.contains('list')) {
                const selectedListName = event.target.textContent;

                if (selectedListName === 'ALL CATEGORIES') {
                    displayBooks(bookList.reduce((allBooks, item) => allBooks.concat(item.books), []));
                } else {
                    const selectedList = bookList.find(item => item.list_name === selectedListName);
                    if (selectedList) {
                        displayBooks(selectedList.books, selectedListName);
                    }
                }
            }
        });

        bookList.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('list');
            listItem.textContent = item.list_name;
            categoryList.appendChild(listItem);
        });

        displayBooks(bookList.reduce((allBooks, item) => allBooks.concat(item.books), []));
    };

    const displayBooks = (books, listName = 'ALL CATEGORIES') => {
        container.innerHTML = '';

        const listNameContainer = document.createElement('div');
        listNameContainer.style.margin="0px";
        listNameContainer.style.padding="0px 0px";
        listNameContainer.style.height="0px";
        listNameContainer.style.width="100px";
        listNameContainer.style.zIndex="1"
        listNameContainer.style.whiteSpace = "nowrap";
        

          listNameContainer.style.textOverflow = "ellipsis";


        listNameContainer.classList.add('list-name-container');

        const listNameElement = document.createElement('h2');
        listNameElement.textContent = listName;
        listNameElement.style.margin="0px";
        listNameElement.style.padding="0px";
        listNameContainer.appendChild(listNameElement);

        container.appendChild(listNameContainer);

        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book-image');

            const imgElement = document.createElement('img');
            
            imgElement.src = book.book_image;
            imgElement.alt = book.title;

            const contentElement = document.createElement('div');

            const titleElement = document.createElement('h3');
            titleElement.textContent = book.title;

            const authorElement = document.createElement('p');
            authorElement.textContent = ` ${book.author}`;



            contentElement.appendChild(titleElement);
            contentElement.appendChild(authorElement);
            //contentElement.appendChild(openModalButton);


            bookElement.appendChild(imgElement);
            bookElement.appendChild(contentElement);

     

             bookElement.addEventListener('click', () => {
               
             openModal(book);
             })
         
            container.appendChild(bookElement);
        });
    };

    fetchData();
});

  

// Your existing JavaScript code
const openModal = (book) => {
  // Set modal content based on the clicked book
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalAuthor = document.getElementById('modalAuthor');
  const modalDescription = document.getElementById('modalDescription');
  const modalProductUrl = document.getElementById('modalProductUrl');
  

  modalImage.src = book.book_image;
  modalTitle.textContent = `Title :${book.title}`;
  modalAuthor.textContent = `Author:${book.author}`;
  modalDescription.textContent = ` ${book.description}`;
  modalProductUrl.href = book.amazon_product_url;
 


  // Display the modal
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
  
};

const closeModal = () => {
  // Close the modal
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
};
// Function to open modal with book details

function addToShoppingList() {
    const button = document.getElementById('addToShoppingListBtn');
    if (button.textContent.trim() === 'Add to Shopping List') {
       
        alert(`Congratulations! You have added the book  to the shopping list.`);
        button.textContent = 'Remove to Shopping List';
        
    } else {
       
        alert(`You have removed the book by from the shopping list.`);
        button.textContent = 'Add to Shopping List';
       
        
    }
    
}
   

function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'block';
}

// Function to close the login modal
function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.style.display = 'none';
    
}

function toggleLoginModal() {
    const loginModal = document.getElementById('loginModal');
   
        loginModal.style.display = 'block';
    
    //loginModal.style.display = 'block';
}
function showLogoutButton() {
    // Show the logout button
    document.getElementById('logoutButton').style.display = 'inline-block';
}

function signup() {
    const username = document.getElementById('username').value;
    const useremail = document.getElementById('useremail').value;
    const password = document.getElementById('password').value;


    if (!username || !useremail || !password) {
        alert('Please fill in all the required fields.');
        return;
    }

    const storedUser = JSON.parse(localStorage.getItem(username));
  

    if (storedUser) {
        alert('Username already exists. Please choose a different username.');
        return;
    }


    const newUser = { username, email: useremail, password };
    localStorage.setItem(username, JSON.stringify(newUser));

    //
    document.getElementById('username').value = '';
    document.getElementById('useremail').value = '';
    document.getElementById('password').value = '';

    alert(`Successfully signed up as ${username}.`);
    updateSignText() ;
}

function login() {
    const username = document.getElementById('username').value;
    const useremail = document.getElementById('useremail').value;
    const password = document.getElementById('password').value;

    
    if (!username || !useremail || !password) {
        alert('Please sign up first.');
        return;
    }

    const storedUser = JSON.parse(localStorage.getItem(username));

    if (!storedUser || storedUser.email !== useremail || storedUser.password !== password) {
        alert('Invalid username, email, or password. Please sign up first.');
        return;
    }

    localStorage.setItem('username', username);


    document.getElementById('username').value = '';
    document.getElementById('useremail').value = '';
    document.getElementById('password').value = '';

    
    closeLoginModal();
    alert(`Successfully logged in as ${username}`);
    updateSignText() 
}


function logout() {
    
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('password');

    
    document.getElementById('logoutButton').style.display = 'none';

    
    updateSignText();
}


function updateSignText() {
    const signText = document.querySelector('.sign-text');
    const logoutButton = document.getElementById('logoutButton');
    const username = localStorage.getItem('username');

    if (username) {
        
        signText.textContent = `Hello, ${username}!`;
        
    
        showLogoutButton();
    } else {
        // User is logged out
        signText.textContent = 'Sign In';
        logoutButton.style.display = 'none'; 
    }
}

updateSignText();