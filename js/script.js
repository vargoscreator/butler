document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 500
    });
    let swiper;
    function initSwiper() {
        swiper = new Swiper(".trust__slider", {
            loop: false,
            slidesPerView: 2,
            grid: {
                rows: 2,
            },
            spaceBetween: 20,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".trust__slider-next",
                prevEl: ".trust__slider-prev",
            },
            breakpoints: {
                1000: {
                    slidesPerView: 3,
                    spaceBetween: 21,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1501: {
                    spaceBetween: 31,
                }
            },
        });
    }

    if (window.innerWidth >= 768) {
        initSwiper();
    }

    window.addEventListener('resize', () => {
        if (swiper && window.innerWidth < 768) {
            swiper.destroy(true, true);
            swiper = null;
        } else if (!swiper && window.innerWidth >= 768) {
            initSwiper();
        }
    });



    const navLinks = document.querySelectorAll(".navigation a");
    const sectionsConfig = [
        { className: "about", threshold: 100 },
        { className: "services", threshold: 300 },
        { className: "cases", threshold: 300 }, 
        { className: "trust", threshold: 500 },
        { className: "contacts", threshold: 600 }, 
    ];
    function onScroll() {
        let currentSection = null;
        sectionsConfig.forEach((sectionConfig) => {
            const section = document.querySelector(`.${sectionConfig.className}`);
            const rect = section.getBoundingClientRect();
            const visibleHeight = window.innerHeight;
            if (rect.top <= visibleHeight - sectionConfig.threshold) {
                currentSection = sectionConfig.className;
            }
        });
        navLinks.forEach((link) => {
            const sectionId = link.getAttribute("href").substring(1);
            if (sectionId === currentSection) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
        });
    }, {
        threshold: 0.1
    });
    const footer = document.querySelector('.footer');
    observer.observe(footer);
    



    const casesSection = document.querySelector('.cases');

    const observer2 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.classList.remove('active');
            } else {
                entry.target.classList.add('active');
                const textElement = document.querySelector('.cases__descr');
                const text = textElement.textContent;
                if (textElement.dataset.typing === 'true') return;
    
                textElement.textContent = '';
    
                function typeText(element, text, delay = 50) {
                    let index = 0;
                    element.dataset.typing = 'true';

                    function type() {
                        if (index < text.length) {
                            element.textContent += text[index];
                            index++;
                            setTimeout(type, delay);
                        } else {
                            delete element.dataset.typing;
                        }
                    }
    
                    type();
                }
    
                typeText(textElement, text, 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer2.observe(casesSection);
    
    let activeInterval;
    let isClicked = false;

    document.querySelectorAll('.cases__item-btn').forEach(item => {
        item.addEventListener('click', function () {
            isClicked = true;
            handleInteraction(item, 'click');
        });

        item.addEventListener('mouseover', function () {
            if (!isClicked) {
                handleInteraction(item, 'mouseover');
            }
        });

        item.addEventListener('mouseout', function () {
            if (!isClicked) {
                resetAll();
            }
        });
    });

    function handleInteraction(item, eventType) {
        const parentItem = item.closest('.cases__item');

        if (eventType === 'click') {
            if (parentItem.classList.contains('active')) {
                parentItem.classList.remove('active');
                resetAll();
                isClicked = false;
                return;
            }
        }

        resetAll();

        parentItem.classList.add('active');

        const contentBox = parentItem.querySelector('.cases__content-box');
        const messages = parentItem.querySelectorAll('.cases__content-item');
        const messageCount = messages.length;

        setTimeout(() => {
            contentBox.querySelector('.cases__content-icon').style.opacity = 1;
        }, 1000);

        let messageIndex = 0;
        activeInterval = setInterval(() => {
            if (messageIndex < messageCount) {
                messages[messageIndex].classList.add('show');
                messageIndex++;
            } else {
                clearInterval(activeInterval);
            }
        }, 500);
    }

    function resetAll() {
        clearInterval(activeInterval);
        document.querySelectorAll('.cases__item').forEach(element => {
            element.classList.remove('active');
        });
        document.querySelector('.cases__image')?.classList.remove('show');
        document.querySelectorAll('.cases__content-item').forEach(element => {
            element.classList.remove('show');
        });
    }


    window.addEventListener('scroll', function() {
        aboutMissionScroll()
    });
    aboutMissionScroll()
    function aboutMissionScroll() {
        const aboutMission = document.querySelector('.about__mission');
        const scrollPosition = window.scrollY;
        const screenWidth = window.innerWidth;
        if (scrollPosition < 600 && screenWidth < 1000 && screenWidth > 767) {
            aboutMission.style.setProperty('opacity', '0', 'important');
        } else if(scrollPosition > 1650 && screenWidth < 1000 && screenWidth > 767){
            aboutMission.style.setProperty('opacity', '0', 'important');
        } 
        else {
            aboutMission.style.setProperty('opacity', '1', 'important');
        }
    }

});




const headerBurger = document.querySelector('.header__burger');
const headerClose = document.querySelector('.header__top-close');
const headerBg = document.querySelector('.header__top-bg');
const headerMenu = document.querySelector('.header__top-menu');
const headerMenuLinks = document.querySelectorAll('.header__top-menu a');
headerBurger.addEventListener('click', function() {
    headerMenu.classList.add('active');
});
headerClose.addEventListener('click', function() {
    headerMenu.classList.remove('active');
});
headerBg.addEventListener('click', function() {
    headerMenu.classList.remove('active'); 
});
headerMenuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        headerMenu.classList.remove('active');
    });
});
