import handleOpenForm from './handleOpenForm.js'
import handleOpenNewForm from './handleOpenNewForm.js'
import handleOpenBalloon from './handleOpenBalloon.js'

// Срабатывает по кнопке 'Добавить'
const handleBtnClick = (pageX, pageY, coords, myMap, myGeoObjects) => {
  return (e) => {
    e.preventDefault();
    // События, следующие за отправкой формы (щелчком по кнопке "Добавить")
    const name = document.querySelector('.name');
    const place = document.querySelector('.place');
    const review = document.querySelector('.review');
    name.value = "";
    place.value = "";
    review.value = "";

    // Сохранение в данных local storage
    const data = JSON.stringify({
        // Координаты клика по карте
        longitude: pageX,
        latitude: pageY,
        // Содержание полей формы для геоотзыва
        name: name.value,
        place: place.value,
        review: review.value
    });
    // Число - уникальный ключ, data - строка с JSON-ом (строки 20-25)
    localStorage.setItem(Math.round(Math.random() * 10000), data);

    console.log('hi');
    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
    // Создаем геообъект с типом геометрии "Точка".
         const myPlacemark = new ymaps.GeoObject({
          
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: coords
            },
            properties: {
                data: data
            } 
        });

        myGeoObjects[myGeoObjects.length] = myPlacemark; 
        myPlacemark.events.add('click', handleOpenNewForm(data));

    myMap.geoObjects
      .add(myPlacemark);
    myPlacemark.properties.set('iconCaption');

    // Создадим кластеризатор и запретим приближать карту и создавать балун при клике на кластер.
    var clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: true,
      hasBalloon: false
    });
    clusterer.add(myGeoObjects);

    let handleClustererClick = (data) => (e) => {
      e.preventDefault();
      handleOpenBalloon();
      // Позиционирование балуна (середина верхнего края)
        const reviewsSlider = document.querySelector('.reviews-slider');
        const middle = document.querySelector('.reviews-slider').getBoundingClientRect().width / 2;
        reviewsSlider.style.top = pageY + 'px';
        reviewsSlider.style.left = pageX - middle + 'px';
      let properties = data.map(item => {return JSON.parse(item.properties['_data'].data)});
      let activeSlide = 0;
      properties.map(item => {
        const name = item.name;
        const review = item.review;
        const place = item.place;
        const element = document.createElement('div');
        document.querySelector('.slides').innerHTML += `<div class="slide"><p>${name}</p><p>${place}</p><p>${review}</p></div>`;
        document.querySelector('.slides').classList.add('active');
       })
      let slides = [...document.querySelectorAll('.slide')];
      let back = document.querySelector('.nav_back');
      let forward = document.querySelector('.nav_forward');
      slides[activeSlide].classList.add('active');
      forward.addEventListener('click', function() {
        activeSlide += 1;
        if(activeSlide >= slides.length) {activeSlide = 0};
        slides.map(function(item) {
          return item.classList.remove('active');
        })
        slides[activeSlide].classList.add('active');
      })
      back.addEventListener('click', function() {
        activeSlide -= 1;
        if(activeSlide < 0) {activeSlide = slides.length - 1};
        slides.map(function(item) {
          return item.classList.remove('active');
        })
        slides[activeSlide].classList.add('active');
      })
      const array = Array(slides.length - 1).fill('').map(function(item, index) {
        return document.querySelector('.pagination').innerHTML += `<span class="pageNumber" data-attr=${index}>${index + 1}</span>`;
      })
      document.querySelector('.pagination').addEventListener('click', function(e) {
        if (e.target.classList.contains('pageNumber')) {
          slides.map(function(item) {
            return item.classList.remove('active');
          })
          slides[+e.target.getAttribute('data-attr')].classList.add('active');
        }
      })
    };

    clusterer.events.add('click', handleClustererClick(clusterer.getGeoObjects()));
    
    myMap.geoObjects.add(clusterer);
    
  }

  getAddress(coords);
  document.querySelector('.container').remove();
  }

}
// Экспортирование переменной для того чтобы её можно было использовать в других модулях приложения
export default handleBtnClick;