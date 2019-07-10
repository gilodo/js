export default function(e)  {
    const newElement = document.createElement('div');
    newElement.classList.add('.container');
    newElement.innerHTML += '<form class="form"> ' +
    '<div class="address"></div> ' +
    '<div class="reviews__wrapper"> ' +
        '<div class="reviews"></div> ' +
        '<h1 class="reviews__title">Ваш отзыв</h1> '+
        '<input class="name" type="text" placeholder = "Ваше имя"> ' +
        '<input class="place" type="text" placeholder = "Укажите место"> ' +
        '<textarea class="review" placeholder = "Поделитесь впечатлениями"></textarea> ' +
        '<button class="btn" type = "submit">Добавить</button> '+
    '</div> ' +
  '</form>'
  document.querySelector('body').appendChild(newElement);
}