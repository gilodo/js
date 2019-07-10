export default function(review) {
    return function(e)  {
    console.log(review);
    document.querySelector('.name').value = "";
    document.querySelector('.place').value = "";
    document.querySelector('.review').value = "";
    document.querySelector('.form').classList.add('active');
    const result = JSON.parse(review);
    document.querySelector('.reviews').innerHTML = `<span class="review__name">${result.name}</span>
                                                    <span class=review__place>${result.place}</span>
                                                    <p class="review__text">${result.review}</p>
                                                    `;
    }
}