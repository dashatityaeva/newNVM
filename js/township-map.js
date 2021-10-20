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