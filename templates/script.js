let imgUser;
let openMobileMenu = false;

/**
 * The function "start" is always called by loading of all sections
 */
async function start() {
    await includeHTML();
    await loadAllTasks();

    console.log('url is: ', window.location.href.split("/").pop());
    if (window.location.href.split("/").pop() == 'board.html') {
        renderHTML();
    }



}

/**
 * This function includes the template menu (left sidebar) to the webpage.
 * 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * After the login the function get the image path saved in the local storage and applies it to the account avatar
 */


function showMenuu() {
    document.getElementById('overmenu').classList.add('showoverlay');
}

function closeMenuu() {
    document.getElementById('overmenu').classList.remove('showoverlay');
}

/**
 * By clicking the icon the homepage is called.
 */
function getHome() {
    window.location = './board.html';
}

function showMenuMobile() {
    if (openMobileMenu == false) {
        document.getElementsByClassName('menu-list')[0].classList.remove('fade_out_menu_animation');
        document.getElementsByClassName('menu-list')[0].classList.add('fade_in_menu_animation');
        document.getElementsByClassName('footer-sidebar')[0].classList.remove('fade_out_menu_animation');
        document.getElementsByClassName('footer-sidebar')[0].classList.add('fade_in_menu_animation');
        document.getElementsByClassName('footer-sidebar')[0].classList.add('mobile_footer-sidebar');
        document.getElementsByClassName('menu-list')[0].style = 'transform: translateX(0) !important';
        openMobileMenu = true;
    } else {
        document.getElementsByClassName('menu-list')[0].classList.remove('fade_in_menu_animation');
        document.getElementsByClassName('menu-list')[0].classList.add('fade_out_menu_animation');
        document.getElementsByClassName('footer-sidebar')[0].classList.remove('fade_in_menu_animation');
        document.getElementsByClassName('footer-sidebar')[0].classList.add('fade_out_menu_animation');
        document.getElementsByClassName('footer-sidebar')[0].classList.remove('mobile_footer-sidebar');
        if (window.innerWidth < 700) {
            document.getElementsByClassName('menu-list')[0].style = 'transform: translateX(40vw)';

        } else if (window.innerWidth < 500) {
            document.getElementsByClassName('menu-list')[0].style = 'transform: translateX(65vw)';

        } else {
            document.getElementsByClassName('menu-list')[0].style = 'transform: translateX(30vw)';
        }
        openMobileMenu = false;
    }
}