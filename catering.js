const plansSwitch = document.querySelector(".plans-switch");
const basicPrice = document.querySelector(".basic-price");
const professionalPrice = document.querySelector(".professional-price");
const businessPrice = document.querySelector(".business-price");
const planDuration = document.querySelectorAll(".plan-duration");

plansSwitch.addEventListener("change", () => {
    if (plansSwitch.checked) {
        // Transition for changing prices
        basicPrice.style.transition = "opacity 0.5s";
        professionalPrice.style.transition = "opacity 0.5s";
        businessPrice.style.transition = "opacity 0.5s";

        // Update prices with fade-in transition
        basicPrice.style.opacity = "0";
        professionalPrice.style.opacity = "0";
        businessPrice.style.opacity = "0";

        setTimeout(() => {
            basicPrice.innerText = "35Jt";
            professionalPrice.innerText = "50Jt";
            businessPrice.innerText = "100Jt";

            // Update prices with fade-out transition
            basicPrice.style.opacity = "1";
            professionalPrice.style.opacity = "1";
            businessPrice.style.opacity = "1";
        }, 500);

        // Transition for changing plan duration
        planDuration.forEach(p => {
            p.style.transition = "opacity 0.5s";
            p.style.opacity = "0";

            setTimeout(() => {
                p.innerText = "/ year";
                p.style.opacity = "1";
            }, 500);
        });
    } else {
        // Transition for changing prices
        basicPrice.style.transition = "opacity 0.5s";
        professionalPrice.style.transition = "opacity 0.5s";
        businessPrice.style.transition = "opacity 0.5s";

        // Update prices with fade-in transition
        basicPrice.style.opacity = "0";
        professionalPrice.style.opacity = "0";
        businessPrice.style.opacity = "0";

        setTimeout(() => {
            basicPrice.innerText = "3Jt";
            professionalPrice.innerText = "5Jt";
            businessPrice.innerText = "10Jt";

            // Update prices with fade-out transition
            basicPrice.style.opacity = "1";
            professionalPrice.style.opacity = "1";
            businessPrice.style.opacity = "1";
        }, 500);

        // Transition for changing plan duration
        planDuration.forEach(p => {
            p.style.transition = "opacity 0.5s";
            p.style.opacity = "0";

            setTimeout(() => {
                p.innerText = "/ month";
                p.style.opacity = "1";
            }, 500);
        });
    }
});

$(document).ready(function ($) {
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});

