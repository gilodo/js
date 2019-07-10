// Импортирование функции из другого модуля (файла) с целью использования
import handleBtnClick from './events/handleButtonClick.js';
import handleOpenForm from './events/handleOpenForm.js'

// Функция ymaps.ready() будет вызвана, когда загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты. Порядок по умолчанию: «широта, долгота». Чтобы не определять координаты центра карты вручную, воспользуйтесь инструментом Определение координат.
        center: [55.76, 37.64],
        // Уровень масштабирования. Допустимые значения: от 0 (весь мир) до 19.
        zoom: 12,
        // Из элементов навигации оставлено только зуммирование
        controls: ['zoomControl'],
        // Карту можно перетаскивать
        behaviors: ['drag']
    });

    let myGeoObjects = [];
    
        // Функция-обработчик клика по карте
        const handleMapClick = (e) => {
            // Расстояние от левого края окна до точки клика (по оси X)
            var pageX = e.get('domEvent').get('pageX');
            // Расстояние от верхнего края окна до точки клика (по оси Y)
            var pageY = e.get('domEvent').get('pageY');

            const container = document.querySelector('.container');
            document.querySelector('.btn');
            if (container) {
                btn.removeEventListener('click', handleButtonClick());
                container.remove();
            }
            
            handleOpenForm();

            // Позиционирование формы (середина верхней стороны)
            const form = document.querySelector('.form');
            const middle = form.getBoundingClientRect().width / 2;
            form.style.top = pageY + 'px';
            form.style.left = pageX - middle + 'px';
    
            // Обработчик события щелчка по кнопке "Добавить"
            const btn = document.querySelector('.btn');
            btn.addEventListener('click', handleBtnClick(pageX, pageY, e.get('coords'), myMap, myGeoObjects));

            const coords = e.get('coords');
            fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=2bded53b-d2cc-4d87-8837-9e972d9fcbba&geocode=${coords[1]},${coords[0]}&format=json`).then(function(result) {
                  return result.json(); 
              }).then(function(result) {
                var firstGeoObject = result.response.GeoObjectCollection.featureMember[0];
                const address = firstGeoObject.GeoObject.name + ", " + firstGeoObject.GeoObject.description;
                document.querySelector('.address').innerHTML = address;
              });

        }

    // Получение координат клика
    myMap.events.add('click', handleMapClick);
}