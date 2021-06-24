//===бургер меню
let menuToggle = document.querySelector('.header__menu-toggle');
let menu = document.querySelector('.header__menu');

menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle("header__menu-toggle_open");
    menu.classList.toggle("header__menu_active");
    document.body.classList.toggle('hidden');
})

//===tabs

let casesContents = document.getElementsByClassName('cases__content');
let casesNames = document.querySelectorAll('.cases__name');
let casesNamesHeight;

let setAdaptiveHeight = function () {
    casesNamesHeight = [];
    for (item of casesContents) {
        casesNamesHeight.push(item.offsetHeight);
    }

    casesNames.forEach((item, index) => {
        item.style.height = `${casesNamesHeight[index]}px`;
    })
}

document.addEventListener("readystatechange", () => {
    if (window.innerWidth > 768) {
        setAdaptiveHeight();
    }
});



window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        setAdaptiveHeight();
    } else {
        casesNames.forEach((item) => {
            item.style.height = '';
        })
    }
})


let tab = function () {
    let tabNav = document.querySelectorAll('.cases__name');
    let tabContent = document.querySelectorAll('.cases__content');
    let tabName;

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('cases__name_is-active');
        });
        this.classList.add('cases__name_is-active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('cases__content_is-active') : item.classList.remove('cases__content_is-active')
        })
    }
}

tab();

//===Scroll on houses
let housesGroup = document.querySelector('.houses__group');
let housesMore = document.querySelector('.houses__more');


const updateScrollPercentage = function () {
    let totalScrollTop = housesGroup.scrollHeight - housesGroup.clientHeight;
    let scrollTopPercentage = Math.floor((housesGroup.scrollTop * 100 / totalScrollTop), 1);
    let shift = Math.floor((housesGroup.clientHeight * scrollTopPercentage / 100), 1);

    if (shift >= (housesGroup.clientHeight - housesMore.clientHeight)) {
        shift = shift - housesMore.clientHeight;
    }

    housesMore.style.top = `${housesGroup.scrollTop + shift }px`;
}
if (housesGroup) {
    housesGroup.addEventListener('scroll', updateScrollPercentage)
}

//===Скролл галерея

let up = document.querySelector('.gallery__arrow_up');
let down = document.querySelector('.gallery__arrow_down');
let gallery = document.querySelector('.gallery__group');

if (down) {
    down.addEventListener('click', () => gallery.scrollBy(0, 300))
}

if (up) {
    up.addEventListener('click', () => gallery.scrollBy(0, -300))
}


//===слайдер выбор дома
let kindGroup = document.querySelector('.kind__slider');
let kindMainItem = document.querySelector('.kind__main-img');
let kindTargets = document.querySelectorAll('.kind__text');


let showActiveImg = function (kindMainItem, src) {
    kindMainItem.setAttribute("src", src);
}

let changeImg = function (e) {
    let target = e.target.closest(".kind__text");

    kindTargets.forEach(target => {
        target.classList.remove('kind__text_act');
    })

    target.classList.add('kind__text_act');

    let src = target.dataset.src;

    showActiveImg(kindMainItem, src);

    if (kindMainItem.classList.contains('fadeIn')) {
        kindMainItem.classList.toggle('fadeIn');
    }

    setTimeout(() => {
        kindMainItem.classList.toggle('fadeIn');
    }, 0);
}

if (kindGroup) {
    let initSrc = 'img/kind/kind2.jpg';
    showActiveImg(kindMainItem, initSrc);

    // kindGroup.addEventListener('click', (e) => {changeImg(e)} )
    kindGroup.addEventListener('click', changeImg.bind(kindGroup))
}
//===more in ceo
let btnMore = document.querySelector('.ceo__more');
let text = document.querySelector('.ceo__text_black');
if (btnMore) {
    btnMore.addEventListener('click', function () {
        text.classList.toggle('ceo__text_hid');
        btnMore.innerHTML === "читать дальше" ? btnMore.innerHTML = "скрыть" : btnMore.innerHTML = "читать дальше";
    })
}



//===меню в footer
let projectLink = document.querySelector('#project');
let footerSubmenu = document.querySelector('.footer__submenu');
if (projectLink) {
    projectLink.addEventListener('click', function () {
        projectLink.classList.toggle('footer__title-item_open');
        footerSubmenu.classList.toggle('footer__submenu_vis');
    })
}




$(document).ready(function () {
    //===mask 
    if (!!$('input[type="tel"]').length) {
        $('input[type="tel"]').mask("+7 (999) 999-99-99");
    }

    //===validate
    if (!!$('.excursion__form')) {
        $('.excursion__form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                    minlength: 10
                },

            },
            messages: {
                name: {
                    required: '',
                    minlength: ''
                },
                phone: {
                    required: '',
                    minlength: ''
                },
            },
            errorClass: 'invalid'
        });
    }
    if (!!$('.contacts__form')) {
        $('.contacts__form').validate({
            rules: {
                name1: {
                    required: true,
                    minlength: 2
                },
                phone1: {
                    required: true,
                    minlength: 10
                },

            },
            messages: {
                name1: {
                    required: '',
                    minlength: ''
                },
                phone1: {
                    required: '',
                    minlength: ''
                },
            },
            errorClass: 'invalid'
        });
    }

    //===Подключение карусели
    if ($('.projects__slider')) {
        $('.projects__slider').slick({
            centerMode: true,
            centerPadding: '50px',
            slidesToShow: 2,
        });
    }

    if ($('.township__slider')) {
        $('.township__slider').slick({
            centerMode: true,
            centerPadding: '30px',
            // initialSlide: 1,
            slidesToShow: 4,
            // variableWidth: true,
            responsive: [{
                    breakpoint: 901,
                    settings: {
                        slidesToShow: 3,
                        // variableWidth: false,
                        // centerMode: false,
                    }
                },
                {
                    breakpoint: 501,
                    settings: {
                        slidesToShow: 1,
                        centerMode: false,
                        centerPadding: '50px',
                        variableWidth: false
                    }
                }
            ]
        });
    }

    if ($('.invest-banner__slider')) {
        console.log();
        $('.invest-banner__slider').slick({
            // centerMode: true,
            // // centerPadding: '50px',
            // // initialSlide: 1,
            slidesToShow: 4,
            variableWidth: true,
            responsive: [{
                breakpoint: 901,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                    variableWidth: false,
                    // centerMode: false,
                }
            }]
        });
    }


    //===основной слайдер проектов
    function addSlider() {
        if ($('.projects__main-slider')) {
            $('.projects__main-slider').slick({
                infinite: true,
                slidesToScroll: 1,
            });
        }
    }
    if ($(window).width() <= 768) {
        addSlider();
    }

    $(window).resize(function () {
        if ($(window).width() <= 768) {
            addSlider();

            if ($('.gallery__mb')) {
                $('.gallery__mb').slick();
            }
        } else {
            $('.projects__main-slider').slick('unslick');
            $('.gallery__mb').slick('unslick');
        }
    })

    //счет слайдов в "Проекты"
    $('.projects__main-slider').on('afterChange', function (slick, currentSlide) {
        let totalCount = currentSlide.slideCount;
        let currentSlider = currentSlide.currentSlide + 1;
        $('.projects__count').html(currentSlider + '/' + totalCount);
    });


    //////////////



    if ($(window).width() <= 768) {
        if ($('.gallery__mb')) {
            $('.gallery__mb').slick();
        }
    }

    if ($('.township-info__slider')) {
        $('.township-info__slider').slick();
    }


});


//===Карта на стр.Контакты
let blockMap = document.querySelector('.contacts-map');
if (blockMap) {
    console.log("have");
}
ymaps.ready(init);


function init() {
    // Создание карты.
    var contactsMap = new ymaps.Map("contacts-map", {
        center: [55.76, 37.64],
        zoom: 12,
        controls: ['geolocationControl', 'fullscreenControl'],
    }, {
        geolocationControlFloat: 'right',
    });

    contactsMap.geoObjects.options.set({
        // Макет иконок всех объектов карты.
        iconLayout: 'default#image',
        iconImageHref: './img/point.svg',
        iconImageSize: [56, 67],
        iconImageOffset: [-28, -67],
    });

    let placemark = new ymaps.Placemark(
        [55.78, 37.64], {
            hintContent: 'Это хинт2',
            balloonContent: 'Это балун2',
        }
    );

    contactsMap.geoObjects.add(placemark);
}


//карта жк рабочая без коллекций
// ymaps.ready(initMain);

// //массив всех меток
// let colorEstate = '#4BA55E'; //надо менять
// let colorEstate1 = '#000'; //надо менять
// let placemarks = [{
//         latitude: 55.79,
//         longitude: 37.64,
//         hintContent: 'Фермерская лавка',
//         balloonContent: 'В 10 минутах ходьбы'
//     },
//     {
//         latitude: 55.768,
//         longitude: 37.64,
//         hintContent: 'Школа Дзюдо',
//         balloonContent: 'В 10 минутах ходьбы \n Работает 24/7'
//     },
//     {
//         latitude: 55.748,
//         longitude: 37.64,
//         hintContent: 'Школа 123',
//         balloonContent: 'В 10 минутах ходьбы \n Работает 24/7'
//     },
//     {
//         latitude: 55.768,
//         longitude: 37.70,
//         hintContent: 'Дет сад',
//         balloonContent: 'В 10 минутах ходьбы \n Работает 24/7'
//     },

// ];
// let geoObjects = [];

// function initMain() {
//      var mainMap = new ymaps.Map("map", {
//         center: [55.76, 37.64],
//         zoom: 12,
//         controls: ['zoomControl', 'geolocationControl'],

//     }, {

//     });
//     //метка ЖК
//     let estate = new ymaps.Placemark(
//         [55.76, 37.64], {
//             hintContent: 'Наш ЖК',
//             balloonContentHeader: 'Наш ЖК',
//             balloonContentBody: 'Красивый и удобный',
//             balloonContentFooter: 'Все вопросы по телефону'

//         }, {
//             iconLayout: 'default#image',
//             iconImageHref: './img/point.svg',
//             iconImageSize: [56, 67],
//             iconImageOffset: [-28, -67],
//         }

//     );

//     mainMap.geoObjects.add(estate);

//     let listHints = document.querySelector('.map-block__subcol-list');

//     for (let i = 0; i < placemarks.length; i++) {
//         //создается метка
//         geoObjects[i] = new ymaps.Placemark(
//             [placemarks[i].latitude, placemarks[i].longitude], {
//                 hintContent: placemarks[i].hintContent,
//                 balloonContent: placemarks[i].balloonContent,
//                 iconCaption : placemarks[i].hintContent,
//             }, {
//                 iconColor: colorEstate,
//                 strokeColor: colorEstate,
//             });

//         mainMap.geoObjects.add(geoObjects[i]);

//         listHints.insertAdjacentHTML("beforeend", ` <li class="map-block__subcol-li" data-id="${i}" data-coords="${geoObjects[i].geometry.getCoordinates()}">${placemarks[i].hintContent}</li>`);
//     };

//     let links = document.querySelectorAll('.map-block__subcol-li');
//     links.forEach(function (link) {
//         link.addEventListener('click', function () {
//             geoObjects.forEach(function (placemark) {
//                 if (placemark.geometry.getCoordinates().toString() === link.dataset.coords) {
//                     placemark.balloon.open();
//                 }
//             })
//         })
//     })

// }






ymaps.ready(initMain);

//массив всех меток
let colorEstate = '#4BA55E'; //надо менять
let colorEstate1 = '#000'; //надо менять

function initMain() {
    var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 11
        }, {
            searchControlProvider: 'yandex#search'
        }),
        shopCollection = new ymaps.GeoObjectCollection(null, {
            preset: 'islands#yellowIcon'
        }),
        kindergartenCollection = new ymaps.GeoObjectCollection(null, {
            preset: 'islands#blueIcon'
        }),
        estate = new ymaps.Placemark(
            [55.76, 37.64], {
                hintContent: 'Наш ЖК',
                balloonContentHeader: 'Наш ЖК',
                balloonContentBody: 'Красивый и удобный',
                balloonContentFooter: 'Все вопросы по телефону'

            }, {
                iconLayout: 'default#image',
                iconImageHref: './img/point.svg',
                iconImageSize: [56, 67],
                iconImageOffset: [-28, -67],
            }

        ),
        placemarksShop = [{
                latitude: 55.79,
                longitude: 37.64,
                hintContent: 'Фермерская лавка',
                balloonContent: 'В 10 минутах ходьбы'
            },
            {
                latitude: 55.768,
                longitude: 37.64,
                hintContent: 'Школа Дзюдо',
                balloonContent: 'В 10 минутах ходьбы \n Работает 24/7'
            },
        ],

        placemarksKindergarten = [{
                latitude: 55.748,
                longitude: 37.64,
                hintContent: 'Школа 123',
                balloonContent: 'Kindergarten 10 минутах ходьбы \n Работает 24/7'
            },
            {
                latitude: 55.768,
                longitude: 37.70,
                hintContent: 'Дет сад',
                balloonContent: 'placemarksKindergarten В 10 минутах ходьбы \n Работает 24/7'
            },
        ];

    function addPlacemarks(collection, objPlacemarks, color) {
        for (var i = 0, l = objPlacemarks.length; i < l; i++) {
            collection.add(new ymaps.Placemark([objPlacemarks[i].latitude, objPlacemarks[i].longitude], {
                hintContent: objPlacemarks[i].hintContent,
                balloonContent: objPlacemarks[i].balloonContent,
                iconCaption: objPlacemarks[i].hintContent,
            }, {
                iconColor: color,
                strokeColor: color,
            }));

            switch (collection) {
                case kindergartenCollection: {
                    let listHints = document.querySelector(`img[data-type="kindergartenCollection"]`).nextElementSibling;
                    listHints.insertAdjacentHTML("beforeend", ` <li class="map-block__subcol-li" data-id="${i}" data-coords="${objPlacemarks[i].latitude},${objPlacemarks[i].longitude}">${objPlacemarks[i].hintContent}</li>`);
                    break;
                }
                case shopCollection: {
                    let listHints = document.querySelector(`img[data-type="shopCollection"]`).nextElementSibling;
                    listHints.insertAdjacentHTML("beforeend", ` <li class="map-block__subcol-li" data-id="${i}" data-coords="${objPlacemarks[i].latitude},${objPlacemarks[i].longitude}">${objPlacemarks[i].hintContent}</li>`);
                    break;
                }
                default:
                    console.log("Нет таких значений");
            }
        }
    }

    addPlacemarks(shopCollection, placemarksShop, colorEstate);
    addPlacemarks(kindergartenCollection, placemarksKindergarten, colorEstate1);

    myMap.geoObjects.add(estate).add(shopCollection).add(kindergartenCollection);

    let links = document.querySelectorAll('.map-block__subcol-li');
    links.forEach(function (link) {
        link.addEventListener('click', function () {

            let type = link.closest('.map-block__subcol-list').previousElementSibling.dataset.type;

            switch (type) {
                case 'kindergartenCollection': {
                    openPlacemark(kindergartenCollection, link);
                    break;
                }
                case 'shopCollection': {
                    openPlacemark(shopCollection, link);
                    break;
                }
                default:
                    alert('К сожалению, по данному месту не найдена информация');
                    break;
            }
        })
    })

    function openPlacemark(collection, link) {
        for (let index = 0; index < collection.getLength(); index++) {
            if (collection.get(index).geometry.getCoordinates().toString() === link.dataset.coords) {
                collection.get(index).balloon.open();
            }
        }
    }
}