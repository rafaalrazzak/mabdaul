/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')


const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'


// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
setTimeout(function(){
    // Add or remove the dark / icon theme
    themeButton.classList.toggle(iconTheme)
    document.body.classList.toggle(darkTheme)

    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
   }, 400);
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: false
});

sr.reveal(`.home__data, .home__img,
            .about__data, .about__img,
            .target__content, .gallery__content,
            .app__data, .app__img,
            .contact__data, .contact__button,
            .footer__content`, {
    interval: 200
})

//carousnap
let isScroll = true;

window.addEventListener("load", function () {
  const carousel = document.querySelectorAll(".carouSnap");

  carousel.forEach((crs) => {
    crs.addEventListener("load", renderCarousel());

    const dataWidth = crs.getAttribute("data-width");
    const dataHeight = crs.getAttribute("data-height");
    if (dataWidth || dataHeight) {
      if (dataHeight != null || dataWidth != null) {
        if (dataWidth == null) {
          crs.style.setProperty("--height", dataHeight);
        } else if (dataHeight == null) {
          crs.style.setProperty("--maxWidth", dataWidth);
        } else {
          crs.style.setProperty("--height", dataHeight);
          crs.style.setProperty("--maxWidth", dataWidth);
        }
      }
    }

    function renderCarousel() {
      const numSlide = crs.children[0];
      const btnSlide = crs.children[1];
      const photos = crs.children[2];
      const indicator = crs.children[3];

      function loadCarousel() {
        if (photos.childElementCount > 10 || photos.childElementCount < 1) {
          crs.innerHTML =
            "<p class='ErrorPhoto' style='margin:0 auto;width:100%;text-align:center;margin-top:20%;margin-bottom:20%;color:#797979;-webkit-text-stroke: red;'><b>Minimum</b> 1 Photo <u>or</u> <br/><b>Maximum</b> 10 Photos</p>";
        } else {
          const scroll = Math.round(photos.scrollLeft);
          const styleElement = getComputedStyle(crs);
          const scrollWidth = parseInt(styleElement.width, 10);

          const num = document.createElement("p");
          num.setAttribute("class", "num");
          numSlide.appendChild(num);

          num.innerHTML =
            Math.round(scroll / scrollWidth + 1) +
            " / " +
            photos.childElementCount;

          function setAttr(element, values) {
            for (var key in values) {
              element.setAttribute(key, values[key]);
            }
          }

          let ul = document.createElement("ul");
          for (i = 0; i < photos.childElementCount; i++) {
            let li = document.createElement("li");
            li.setAttribute("data-target", i + 1);
            ul.appendChild(li);
          }
          indicator.appendChild(ul);

          const btnNext = document.createElement("button");
          const btnPrev = document.createElement("button");

          setAttr(btnNext, {
            type: "button",
            class: "btn-slide-next",
          });
          setAttr(btnPrev, {
            type: "button",
            class: "btn-slide-prev",
          });

          btnNext.innerHTML = "&rarr;";
          btnPrev.innerHTML = "&larr;";
          btnSlide.appendChild(btnPrev);
          btnSlide.appendChild(btnNext);

          const num_active = Math.round(scroll / scrollWidth + 1);

          const ul_elem = ul.childElementCount;
          for (j = 0; j <= ul_elem; j++) {
            if (j + 1 == num_active) {
              let li_element = ul.children;
              li_element[j].setAttribute("class", "active");
            }
          }

          ul.style.width = photos.childElementCount * 10 + "%";
        }
      }

      if (
        numSlide.className != "numbSlide" ||
        btnSlide.className != "bnSlide" ||
        photos.className != "photoCollect" ||
        indicator.className != "indCat"
      ) {
        crs.innerHTML =
          "<p class='ErrorCarousel' style='margin:0 auto;width:100%;text-align:center;margin-top:30%;margin-bottom:30%;color:#797979;-webkit-text-stroke: red;'>Some Elements was <b>Missing!</b></p>";
      } else {
        loadCarousel();
      }
    }
  });
});

window.addEventListener("wheel", function (e) {
  if (e.target.parentElement.className == "photoCollect") {
    isScroll = true;
    let photos = e.target.parentElement.parentElement.children[2];

    photos.addEventListener("scroll", function (e) {
      const photos = e.target.childElementCount;
      const numSlide = e.target.parentElement.children[0].children[0];
      const li_elem = e.target.parentElement.children[3].children[0].children;
      const total_li_elem =
        e.target.parentElement.children[3].children[0].childElementCount;

      const value = e.target.scrollLeft;
      const crs = e.target.parentElement;
      const styleElement = getComputedStyle(crs);
      const scrollWidth = parseInt(styleElement.width, 10);
      const currentSlide = Math.round(value / scrollWidth + 1);
      if (isScroll) {
        numSlide.innerHTML = currentSlide + " / " + photos;

        for (ec = 0; ec < total_li_elem; ec++) {
          let sl = li_elem[ec];
          sl.removeAttribute("class");
          if (ec + 1 == currentSlide) {
            sl.setAttribute("class", "active");
          }
        }
      }
    });
  }
});

window.addEventListener("touchstart", function (e) {
  if (e.target.parentElement.className == "photoCollect") {
    isScroll = true;

    const photos = e.target.parentElement.parentElement.children[2];
    photos.addEventListener("scroll", function (e) {
      const photos = e.target.childElementCount;
      const numSlide = e.target.parentElement.children[0].children[0];
      const li_elem = e.target.parentElement.children[3].children[0].children;
      const total_li_elem =
        e.target.parentElement.children[3].children[0].childElementCount;

      const value = e.target.scrollLeft;
      const crs = e.target.parentElement;
      const styleElement = getComputedStyle(crs);
      const scrollWidth = parseInt(styleElement.width, 10);
      const currentSlide = Math.round(value / scrollWidth + 1);
      if (isScroll) {
        numSlide.innerHTML = currentSlide + " / " + photos;

        for (ec = 0; ec < total_li_elem; ec++) {
          let sl = li_elem[ec];
          sl.removeAttribute("class");
          if (ec + 1 == currentSlide) {
            sl.setAttribute("class", "active");
          }
        }
      }
    });
  }
});

window.addEventListener("click", function (e) {
  if (
    e.target.className == "btn-slide-prev" &&
    e.target.parentElement.className == "bnSlide"
  ) {
    isScroll = false;

    const photos = e.target.parentElement.parentElement.children[2];
    const numSlide =
      e.target.parentElement.parentElement.children[0].children[0];
    const li_elem =
      e.target.parentElement.parentElement.children[3].children[0].children;
    const total_li_elem =
      e.target.parentElement.parentElement.children[3].children[0]
        .childElementCount;

    const scrLeft = photos.scrollLeft;
    const styleElement = getComputedStyle(photos);
    const scrollWidth = parseInt(styleElement.width, 10);
    const value = scrLeft - scrollWidth;

    const currentSlide = Math.round(value / scrollWidth + 1);

    if (value >= 0) {
      numSlide.innerHTML = currentSlide + " / " + photos.childElementCount;

      for (ec = 0; ec < total_li_elem; ec++) {
        let sl = li_elem[ec];
        sl.removeAttribute("class");
        if (ec + 1 == currentSlide) {
          sl.setAttribute("class", "active");
        }
      }

      photos.scrollTo(value, 0);
    }
  }

  if (
    e.target.className == "btn-slide-next" &&
    e.target.parentElement.className == "bnSlide"
  ) {
    isScroll = false;

    const photos = e.target.parentElement.parentElement.children[2];
    const numSlide =
      e.target.parentElement.parentElement.children[0].children[0];
    const li_elem =
      e.target.parentElement.parentElement.children[3].children[0].children;
    const total_li_elem =
      e.target.parentElement.parentElement.children[3].children[0]
        .childElementCount;

    const scrLeft = Math.floor(photos.scrollLeft);
    const styleElement = getComputedStyle(photos);
    const scrollWidth = parseFloat(styleElement.width, 10);
    const value = Math.floor(scrLeft + Math.floor(scrollWidth));

    const currentSlide = Math.round(value / scrollWidth + 1);

    const scrollMax = photos.childElementCount * scrollWidth - scrollWidth;

    if (value <= scrollMax) {
      numSlide.innerHTML = currentSlide + " / " + photos.childElementCount;

      for (ec = 0; ec < total_li_elem; ec++) {
        let sl = li_elem[ec];
        sl.removeAttribute("class");
        if (ec + 1 == currentSlide) {
          sl.setAttribute("class", "active");
        }
      }

      photos.scrollTo(value, 0);
    }
  }

  if (
    e.target.tagName == "LI" &&
    e.target.parentElement.parentElement.className == "indCat"
  ) {
    isScroll = false;
    const indiCat = e.target.parentElement.parentElement;

    const value = e.target.getAttribute("data-target");
    const li_elem = indiCat.children[0].children;
    const total_li_elem = indiCat.children[0].childElementCount;

    for (ec = 0; ec < total_li_elem; ec++) {
      let sl = li_elem[ec];
      sl.removeAttribute("class");
      if (ec + 1 == value) {
        sl.setAttribute("class", "active");
      }
    }

    const photos = indiCat.parentElement.children[2];
    const crs = photos.parentElement;
    const numSlide = indiCat.parentElement.children[0].children[0];
    const styleElement = getComputedStyle(crs);
    const scrollWidth = parseInt(styleElement.width, 10);
    photos.scrollLeft = value * scrollWidth - scrollWidth;
    numSlide.innerHTML = value + " / " + photos.childElementCount;
  }
});

//end
//disable item

const img = document.querySelector('img')
img.ondragstart = () => {
  return false ;
};
