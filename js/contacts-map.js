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