/**
* Template Name: Kelly
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();


function getFormSubmission() {
  var x = document.getElementById("contact-form");
  var values = [];

  for (var i = 0; i < x.length; i++) {
    values.push(x.elements[i].value);
    console.log(x.elements[i].value);
  }

  var name = x.querySelectorAll("input[name='name']").value;
  var surname = x.querySelectorAll("input[name='surname']").value;

  var site = document.querySelector("input[name='site_rating']:checked").value;
  var work = document.querySelector("input[name='work_rating']:checked").value;
  var form = document.querySelector("input[name='form_rating']:checked").value;

  var average = ((+site + +work + +form) / 3).toFixed(2);

  var resultText = name + " " + surname + ": " + average;

  var color = "black";
  if (average < 2.5) color = "red";
  else if (average < 4) color = "yellow";
  else color = "green";
  console.log(`%c${resultText}`, `color: ${color}; font-weight: bold;`);
}

const cardData = ["🌑","🌕","🌘","🌒","🌔","🌘"]; 

let board = document.getElementById("game-board");
let movesDisplay = document.getElementById("moves");
let matchesDisplay = document.getElementById("matches");
let winMessage = document.getElementById("win-message");
let startBtn = document.getElementById("start-btn");
let restartBtn = document.getElementById("restart-btn");
let difficultySelect = document.getElementById("difficulty");

let moves = 0;
let matches = 0;
let flippedCards = [];
let lockBoard = false;
let currentBoard = [];
let rows = 3;
let cols = 4;


function initGame() {
  moves = 0;
  matches = 0;
  flippedCards = [];
  lockBoard = false;
  movesDisplay.textContent = moves;
  matchesDisplay.textContent = matches;
  winMessage.textContent = "";

  if(difficultySelect.value === "easy") {
    rows = 3;
    cols = 4;
  } else {
    rows = 4;
    cols = 6;
  }
  generateBoard();
}


function generateBoard() {
  board.innerHTML = "";
  let totalCards = rows * cols;
  let neededPairs = totalCards / 2;

  
  let cardsArray = [];
  for(let i=0; i<neededPairs; i++){
    cardsArray.push(cardData[i % cardData.length]);
    cardsArray.push(cardData[i % cardData.length]);
  }
  cardsArray.sort(() => Math.random() - 0.5);

  currentBoard = cardsArray;


  board.style.gridTemplateColumns = `repeat(${cols}, auto)`;
 
  cardsArray.forEach((item, index) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = item;

    let cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    let cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.textContent = "?";

    let cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.textContent = item;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}


function flipCard() {
  if(lockBoard) return;
  if(this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if(flippedCards.length === 2){
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}


function checkMatch() {
  let [card1, card2] = flippedCards;
  if(card1.dataset.value === card2.dataset.value){
    matches++;
    matchesDisplay.textContent = matches;
    flippedCards = [];
    if(matches === currentBoard.length / 2){
      winMessage.textContent = "🎉 You Won!";
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}


startBtn.addEventListener("click", initGame);
restartBtn.addEventListener("click", initGame);
difficultySelect.addEventListener("change", initGame);



