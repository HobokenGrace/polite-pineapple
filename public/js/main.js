import Glide, { Controls, Breakpoints, Swipe } from 'https://esm.sh/@glidejs/glide/dist/glide.modular.esm';

const activateCarousels = () => {
  if (document.querySelector('.glide')) {
    new Glide('.glide', {
      startAt: 0,
      perView: 3
    }).mount({ Controls, Breakpoints, Swipe });
  }
}

// Called the first time the page loads, but not after a Next.js route change
activateCarousels();

const mediaQueryList = window.matchMedia('(min-width: 900px)');
mediaQueryList.addEventListener('change', event => {
  if (event.matches) {
    activateCarousels();
  }
})

// All JS on the client needs to run inside onNextjsRouteChangeComplete.
// Otherwise, it won't get rerun when navigating between pages.
window.onNextjsRouteChangeComplete = function() {
  // Responsive video embeds
  var videoEmbeds = [
    'iframe[src*="youtube.com"]',
    'iframe[src*="vimeo.com"]'
  ];
  reframe(videoEmbeds.join(','));

  // Mobile menu
  var menuToggle = document.querySelectorAll('.menu-toggle');

  for (var i = 0; i < menuToggle.length; i++) {
    menuToggle[i].addEventListener('click', function(e){
      document.body.classList.toggle('menu--opened');
      e.preventDefault();
    },false);
  }

  document.body.classList.remove('menu--opened');

  window.addEventListener('resize', function () {
    if (menuToggle[0]?.offsetParent === null) {
      document.body.classList.remove('menu--opened');
    }
  }, true);

  // Accordion
  var faqAccordions = document.querySelectorAll('.handorgel');
  Array.from(faqAccordions).forEach((faqAccordion) => {
    var accordion = new handorgel(faqAccordion, {
      multiSelectable: true
    });
  });

  activateCarousels();
};