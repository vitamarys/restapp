document.addEventListener("DOMContentLoaded", () => {
     const sliderFunc = document.querySelectorAll('.function');
     const animateItems = document.querySelectorAll('.scroll-animate')
     const swiper = new Swiper(".slider", {
       slideClass: 'slide',
       slidesPerView: 'auto',
       grabCursor: true,
       effect: "creative",
       creativeEffect: {
         prev: {
           shadow: false,
           translate: ["-120%", 0, -500],
         },
         next: {
           shadow: false,
           translate: ["120%", 0, -500],
         },
       },
       speed: 700,
       autoplay: {
         delay: 3000,
         disableOnInteraction: false,
       },
       
     });
     swiper.on('slideChange', function () {
          sliderFunc.forEach(el => el.classList.remove('active'));
          sliderFunc[swiper.activeIndex].classList.add('active');
        });
     sliderFunc.forEach((el, index) => {
       el.addEventListener('mouseenter', () => {
         swiper.autoplay.stop();
         swiper.slideTo(index);
       });
   
       el.addEventListener('mouseleave', () => {
         swiper.autoplay.start();
       });
     });
     const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('animate');
              } 
          });
      }, {
          threshold: 0.5 
      });
  
      animateItems.forEach(block => {
          observer.observe(block);
      });


   });
   

///feedback

document.addEventListener('DOMContentLoaded', function () {
     const circles = document.querySelectorAll('.fg-circle');
     const texts = document.querySelectorAll('.progress-text');


     function animateCircle(circle) {
         const progress = circle.getAttribute('data-progress');
         const radius = circle.r.baseVal.value;
         const circumference = 2 * Math.PI * radius;

         circle.style.strokeDasharray = `${circumference}`;
         circle.style.strokeDashoffset = `${circumference - (progress / 100) * circumference}`;
     }


     function animateNumber(textElement, targetValue) {
         let currentValue = 0;
         const duration = 1000;
         const startTime = performance.now();

         function updateNumber(currentTime) {
             const elapsedTime = currentTime - startTime;
             const progress = Math.min(elapsedTime / duration, 1);
             const currentNumber = (progress * targetValue).toFixed(1);

             textElement.textContent = currentNumber;

             if (progress < 1) {
                 requestAnimationFrame(updateNumber);
             }
         }

         requestAnimationFrame(updateNumber);
     }

     const observerOptions = {
         threshold: 0.5
     };

     const observer = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 const circle = entry.target;


                 const progressItem = circle.closest('.progress-item');


                 const textElement = progressItem.querySelector('.progress-item__number');

                 const targetValue = parseFloat(textElement.textContent);


                 animateCircle(circle);


                 animateNumber(textElement, targetValue);

                 observer.unobserve(circle);
             }
         });
     }, observerOptions);


     circles.forEach(circle => {
         observer.observe(circle);
     });
 });



 