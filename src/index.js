// Import SCSS
import './scss/main.scss';

let app = {
    init: function () {
        let navbarToggleElement = document.getElementById('navbar-toggle');
        let navbarCloserElement = document.getElementById('navbar-close');

        navbarToggleElement.addEventListener('click', app.handleNavbarOnClick);
        navbarCloserElement.addEventListener('click', app.handleNavbarOnClick);
    },

    handleNavbarOnClick: function () {
        let navbarElement = document.getElementById('navbar');
        navbarElement.classList.toggle('visible');
    }
}

document.addEventListener('DOMContentLoaded', app.init);
