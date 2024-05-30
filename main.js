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

// Login JS
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const btnClosePopup = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    const loggedIncheck = localStorage.getItem('loggedIn');
    if (loggedIncheck === 'false' || loggedIncheck === null) {
        wrapper.classList.add('active');
    }
});

loginLink.addEventListener('click', () => {
    const loggedIncheck = localStorage.getItem('loggedIn');
    if (loggedIncheck === 'false' || loggedIncheck === null) {
        wrapper.classList.remove('active');
    }
});

btnPopup.addEventListener('click', () => {
    const loggedIncheck = localStorage.getItem('loggedIn');
    if (loggedIncheck === 'false' || loggedIncheck === null) {
        wrapper.classList.add('active-popup');
    }
});

btnClosePopup.addEventListener('click', () => {
    const loggedIncheck = localStorage.getItem('loggedIn');
    if (loggedIncheck === 'false' || loggedIncheck === null) {
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
    }
});


// Login Form
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;
  
  // Perform authentication logic here (e.g., check credentials)
  
  // Check if the provided email and password match the registered account
  const registeredEmail = localStorage.getItem("email");
  const registeredPassword = localStorage.getItem("password");
  
  if (email === registeredEmail && password === registeredPassword) {
    // Successful login
    localStorage.setItem("loggedIn", true);
    alert("Login successful!");
    
    // Redirect to the authenticated page or perform necessary actions
  } else {
    // Invalid credentials
    alert("Invalid email or password. Please try again.");
  }
  
  const username = localStorage.getItem("username");
  const usn = document.getElementById("username").textContent=username;
  localStorage.setItem('cart', []);
  wrapper.classList.remove('active-popup');
  wrapper.classList.remove('active');
});

// Registration Form
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const password = registerForm.querySelector('input[type="password"]').value;
  
  // Perform registration logic here (e.g., create a new user)
  
  // Store session information in local storage
  localStorage.setItem("loggedIn", false);
  localStorage.setItem("email", email);
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  
  // Registration successful
  alert("Account registered successfully! You can now log in.");
  
  // Redirect to the login page or perform necessary actions
  
});

//Dropdown Profile
const loggedIncheck = localStorage.getItem('loggedIn');
let settingsmenu = document.querySelector(".settings-menu");

function settingsMenuToggle() {
    const loggedIn = localStorage.getItem('loggedIn');
    console.log(loggedIn);
    if (loggedIn === "true") {
        settingsmenu.classList.toggle("settings-menu-height");
        console.log("babi masuk");
    } else {
        settingsmenu.classList.remove("settings-menu-height");
        console.log("babi keluar");
    }
    const cart = localStorage.getItem('cart');
    const data = JSON.parse(cart);
    var totalCal=0;
    data.forEach(element => {
        console.log(element.calorie);
        totalCal += element.calorie;
        
    });
    const tott = document.getElementById("totalCal").textContent=totalCal;
}

// logout
const logoutButton = document.getElementById("logoutt");

logoutButton.addEventListener("click", () => {
  // Clear session information from local storage
  localStorage.setItem("loggedIn", false);

  // Display logout notification
  alert("Logged out successfully!");

  // Redirect to index.html
  window.location.href = "index.html";
});

const product1 = document.getElementById("product-1");
product1.addEventListener("click", ()=>{
    var cartdata = localStorage.getItem('cart');
    var cartArray = cartdata?JSON.parse(cartdata):[];
    var path = "/assets/images/dish/1.png";
    var name = "Fresh Chicken Veggies";
    var price = 50000;
    var quantity = 1;
    var calorie = 120;
    var data = {
        'name' : name,
        'price': price,
        'quantity': quantity,
        'calorie': calorie,
        'path': path
    }
    cartArray.push(data);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    location.reload();
})

const product2 = document.getElementById("product-2");
product2.addEventListener("click", ()=>{
    var cartdata = localStorage.getItem('cart');
    var cartArray = cartdata?JSON.parse(cartdata):[];
    var path = "/assets/images/dish/2.png";
    var name = "Grilled Chicken";
    var price = 30000;
    var quantity = 1;
    var calorie = 80;
    var data = {
        'name' : name,
        'price': price,
        'quantity': quantity,
        'calorie': calorie,
        'path': path
    }
    cartArray.push(data);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    location.reload();
})

const product3 = document.getElementById("product-3");
product3.addEventListener("click", ()=>{
    var cartdata = localStorage.getItem('cart');
    var cartArray = cartdata?JSON.parse(cartdata):[];
    var path = "/assets/images/dish/3.png";
    var name = "Panner Noodles";
    var price = 55000;
    var quantity = 1;
    var calorie = 100;
    var data = {
        'name' : name,
        'price': price,
        'quantity': quantity,
        'calorie': calorie,
        'path': path
    }
    cartArray.push(data);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    location.reload();
})

const product4 = document.getElementById("product-4");
product4.addEventListener("click", ()=>{
    var cartdata = localStorage.getItem('cart');
    var cartArray = cartdata?JSON.parse(cartdata):[];
    var path = "/assets/images/dish/4.png";
    var name = "Chicken Noodles";
    var price = 40000;
    var quantity = 1;
    var calorie = 240;
    var data = {
        'name' : name,
        'price': price,
        'quantity': quantity,
        'calorie': calorie,
        'path': path
    }
    cartArray.push(data);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    location.reload();
})

const product5 = document.getElementById("product-5");
product5.addEventListener("click", ()=>{
    var cartdata = localStorage.getItem('cart');
    var cartArray = cartdata?JSON.parse(cartdata):[];
    var path = "/assets/images/dish/5.png";
    var name = "Bread Boiled Egg";
    var price = 15000;
    var quantity = 1;
    var calorie = 120;
    var data = {
        'name' : name,
        'price': price,
        'quantity': quantity,
        'calorie': calorie,
        'path': path
    }
    cartArray.push(data);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    location.reload();
})

const product6 = document.getElementById("product-6");
product6.addEventListener("click", ()=>{
    
    var cartdata = localStorage.getItem('cart');
    var cartArray = cartdata?JSON.parse(cartdata):[];
    var path = "/assets/images/dish/6.png";
    var name = "Bread Boiled Egg";
    var price = 15000;
    var quantity = 1;
    var calorie = 240;
    var data = {
        'name' : name,
        'price': price,
        'quantity': quantity,
        'calorie': calorie,
        'path': path
    }
    cartArray.push(data);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    location.reload();
})

const product7 = document.getElementById("product-7");
product7.addEventListener("click", ()=>{
    
    var cartdata = localStorage.getItem('cart');
    var cartArray = cartdata?JSON.parse(cartdata):[];
    var path = "/assets/images/dish/6.png";
    var name = "Basic Plan";
    var price = 3000000;
    var quantity = 60;
    var calorie = 0;
    var data = {
        'name' : name,
        'price': price,
        'quantity': quantity,
        'calorie': calorie,
        'path': path
    }
    cartArray.push(data);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    location.reload();
})

const product8 = document.getElementById("product-8");
product8.addEventListener("click", ()=>{
    
    var cartdata = localStorage.getItem('cart');
    var cartArray = cartdata?JSON.parse(cartdata):[];
    var path = "/assets/images/dish/6.png";
    var name = "Proffesional Plan";
    var price = 5000000;
    var quantity = 90;
    var calorie = 0;
    var data = {
        'name' : name,
        'price': price,
        'quantity': quantity,
        'calorie': calorie,
        'path': path
    }
    cartArray.push(data);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    location.reload();
})

const product9 = document.getElementById("product-9");
product9.addEventListener("click", ()=>{
    
    var cartdata = localStorage.getItem('cart');
    var cartArray = cartdata?JSON.parse(cartdata):[];
    var path = "/assets/images/dish/6.png";
    var name = "Business Plan";
    var price = 10000000;
    var quantity = 180;
    var calorie = 0;
    var data = {
        'name' : name,
        'price': price,
        'quantity': quantity,
        'calorie': calorie,
        'path': path
    }
    cartArray.push(data);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    location.reload();
})

const cart = localStorage.getItem('cart');
const data = JSON.parse(cart);
var totalCal=0;
data.forEach((element, index) => {
    var cartGallery = document.querySelector('.cart_gallery');
    var cartItem = document.createElement('div');
    var cartImage = document.createElement('div');
    var img = document.createElement('img');
    var cartInfo = document.createElement('div');
    var cartRemove = document.createElement('div');
  
    cartItem.classList.add('cart_item');
    cartImage.classList.add('cart_img');
    cartInfo.classList.add('cart_info');
    cartRemove.classList.add('cart_remove');
  
    img.src = element.path;
    var cartItemName = document.createElement('a');
    cartItemName.href = "#";
    cartItemName.textContent = element.name;
  
    var cartQuantity = document.createElement('p');
    cartQuantity.innerHTML = `<span>Rp. ${element.price.toFixed(2)}</span> X ${element.quantity}`;
  
    var cartRemoveLink = document.createElement('a');
    var cartRemoveIcon = document.createElement('i');
    cartRemoveLink.href = "#";
    cartRemoveIcon.classList.add('fa', 'fa-times');
    cartRemoveLink.appendChild(cartRemoveIcon);
    cartRemove.appendChild(cartRemoveLink);
  
    cartImage.appendChild(img);
    cartInfo.appendChild(cartItemName);
    cartInfo.appendChild(cartQuantity);
  
    cartItem.appendChild(cartImage);
    cartItem.appendChild(cartInfo);
    cartItem.appendChild(cartRemove);
  
    cartGallery.appendChild(cartItem);
  
    // Add event listener to remove link
    cartRemoveLink.addEventListener('click', function(e) {
      e.preventDefault();
      cartItem.remove();
  
      // Remove item from local storage
      var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems.splice(index, 1); // Remove item at specified index
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });
  });
  
  
  
  
  

  
  var totalPrice = 0;
  var totaltotalPrice = 0;
  var totalItemss =0;
  data.forEach(element => {
    console.log(element.price);
    totalPrice += element.price;
    totalItemss += element.quantity;
    totaltotalPrice = totalPrice*(120/100);
});
const totalsss = document.getElementById("totalItems").textContent=totalItemss;
const totals = document.getElementById("totalPric").textContent=totalPrice;
const totalss = document.getElementById("totalPricee").textContent=totaltotalPrice;

// Function to remove all items from the cart
var checkOut = document.getElementById('coWoi');
checkOut.addEventListener('click', ()=>{
    localStorage.setItem('cart', []);
    alert("Check out Successfull!");
    location.reload();
})
  


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

