import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngPang = '15';
  constructor() { }

  ngOnInit(): void {
    const menu = document.querySelector('#menu-bars');
    const navbar = document.querySelector('.navbar');

    const section = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header .navbar a');

    window.onscroll = () => {

      menu.classList.remove('fa-times');
      navbar.classList.remove('active');

      section.forEach(sec => {

        const top = window.scrollY;
        const height = sec.offsetHeight;
        const offset = sec.offsetTop - 150;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
          navLinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
          });
        }

      });

    };
    function loader() {
      document.querySelector('.loader-container').classList.add('fade-out');
    }

    function fadeOut() {
      setInterval(loader, 3000);
    }

    window.onload = fadeOut;
  }

}
