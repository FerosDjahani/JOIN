class Guest {
    name;
    password;
    bild;
}

let account;
let currentuser;
let button;
let textButton;


/**
 * This function load the username and the password from the file json and save the data in the variable "account".
 */
async function renderAccount() {
    let url = './account.json';
    let response = await fetch(url);
    account = await response.json();
}


/**
 * Through the login function is checked, whether the given username and password match the data saved in the variable account.
 */
function login() {
    let username = document.getElementById('username').value;
    let userpassword = document.getElementById('userpassword').value;
    if (account.some(user => user.name == username && user.password == userpassword)) {
        account.forEach(element => {
            checkMatchPhoto(username, element);
        });
    } else {
        alert('NO USER FOUND WITH USERNAME AND PASSWORD');
    }
}

function login() {
    let username = document.getElementById('username').value;
    let userpassword = document.getElementById('userpassword').value;
    if (account.some(user => user.name == username && user.password == userpassword)) {
        account.forEach(element => {
            checkMatchPhoto(username, element);
        });
    } else {
        alert('NO USER FOUND WITH USERNAME AND PASSWORD');
    }
}

/**
 * The image of the avatar is chosen according to the transmitted username data.
 * @param {string} username - The value of username given during the submission of the form.
 * @param {JSON} element - the JSON object saved into the array "account".
 */
function checkMatchPhoto(username, element) {
    if (username == element.name) {
        saveImagePath(element.bild);

        setTimeout(() => {
            window.location = `./board.html`;
        }, 1500)
    }
}


function saveImagePath(imagePath) {
    localStorage.setItem('userPath', imagePath);
}


/**
 * When the checkbox in the form of the login is ticked, the form structure is changed in order to be able to 
 * create a new account.
 */
function switchToSignUp() {


    textButton.innerHTML = "Login In";
    document.getElementById('button').type = 'submit';

}

function switchToSignUp2() {

    button = document.getElementById('newAccount');
    textButton = document.getElementById('button');
    (button.checked == true)
    textButton.innerHTML = "Sign Up";
    document.getElementById('button').type = 'button';
    document.getElementById('button').addEventListener("click", AddAccount);
    document.getElementById('button').classList.add('button2');

}

function GuestLogin() {

    button = document.getElementById('newAccount');
    textButton = document.getElementById('button');
    document.getElementById('username').value = "guest";
    document.getElementById('userpassword').value = "guest";
    (button.checked == true)

    document.getElementById('button').type = 'button';
    document.getElementById('button').addEventListener("click", AddAccount);
    document.getElementById('Guest').classList.add('d-none');
    document.getElementById('button').classList.add('button2');
    document.getElementById('button').innerHTML = "Guest Log In"


}


/**
 * A new object with class Guest is pushed in the array "account" with the scope of generate a new username and password
 * @param {string} username 
 * @param {string} password 
 */
function AddAccount(username, password) {

    let newGuest = new Guest();
    username = document.getElementById('username');
    password = document.getElementById('userpassword');
    newGuest['name'] = username.value;
    newGuest['password'] = password.value;
    newGuest['bild'] = './assets/images/guest-user.jpg'
    account.push(newGuest);
    refreshForm(username, password);
}


/**
 * At the end of the creation of a new account, the structure of the login form is newly set for checking 
 * the match between the data trasmetted by compilation of the input fields and the username and password saved in the account.
 * @param {string} username 
 * @param {string} password 
 */
function refreshForm(username, password) {
    event.preventDefault();
    button.checked = false;
    document.getElementById('button').innerHTML = "Log In";
    document.getElementById('button').removeEventListener("click", AddAccount);
    document.getElementById('button').type = 'submit';
    if (username.value && password.value) {
        alert('Your Username and Password is saved and you can log in');
        textButton.classList.add('button2');


    } else {
        alert('You must give an username and a password!');
    }
}