document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 700
    });
    let swiper;

    function initSwiper() {
        if (!swiper) {
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
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        grid: {
                            rows: 2,
                        },
                    },
                    1000: {
                        slidesPerView: 3,
                        spaceBetween: 21,
                        grid: {
                            rows: 2,
                        },
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        grid: {
                            rows: 2,
                        },
                    },
                    1501: {
                        slidesPerView: 4,
                        spaceBetween: 31,
                        grid: {
                            rows: 2,
                        },
                    }
                },
            });
        }
    }
    
    function destroySwiper() {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }
    }
    if (window.innerWidth >= 768) {
        initSwiper();
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            destroySwiper();
        } else if (window.innerWidth >= 768) {
            initSwiper();
            document.querySelector('body').classList.remove('no-scroll');
        }
    });
    

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
            if (entry.isIntersecting) {
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
            event.stopPropagation();
            const parentItem = item.closest('.cases__item');
            if (isClicked && parentItem.classList.contains('active')) {
                parentItem.classList.remove('active');
                resetAll();
                isClicked = false;
                return;
            }
            isClicked = true;
            handleInteraction(item, 'click');
            if (window.innerWidth < 768) {
                document.querySelector('body').classList.add('no-scroll');
            }
        });

        item.addEventListener('mouseover', function () {
            if (window.innerWidth >= 768) {
                const parentItem = item.closest('.cases__item');
                if (!isClicked) {
                    parentItem.classList.add('active');
                    handleInteraction(item, 'mouseover');
                }
            }
        });

        item.addEventListener('mouseout', function () {
            if (!isClicked) {
                resetAll();
            }
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.cases__item-btn') && !event.target.closest('.cases__item')) {
            resetAll();
            isClicked = false;
            if (window.innerWidth < 768) {
                document.querySelector('body').classList.remove('no-scroll');
            }
        }
    });

    document.querySelectorAll('.cases__content-box > span').forEach(span => {
        span.addEventListener('click', function () {
            resetAll();
            isClicked = false;
            if (window.innerWidth < 768) {
                document.querySelector('body').classList.remove('no-scroll');
            }
        });
    });

    function handleInteraction(item, eventType) {
        const parentItem = item.closest('.cases__item');
        if (eventType === 'click' && parentItem.classList.contains('active')) {
            return;
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


function toggleSliderVisibility() {
    const sliderElement = document.querySelector(".trust__slider");
    if (window.innerWidth < 768) {
        sliderElement.classList.add("hide");
    } else {
        sliderElement.classList.remove("hide");
    }
}
toggleSliderVisibility();
window.addEventListener("resize", toggleSliderVisibility);
document.querySelector(".trust__slider-more").addEventListener("click", function () {
    const sliderElement = document.querySelector(".trust__slider");
    sliderElement.classList.remove("hide");
});
