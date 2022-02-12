const pageState = { category: 'all', data: [], page: 0 };
let tabs = document.querySelectorAll('.tabs-title');
let tabsContent = document.querySelectorAll('.tabs-content');
let newsItems = document.querySelectorAll('.news-item');
const addMoreCategoryImgBtn = document.getElementById('add-more-category-img');

tabs.forEach((element) =>
  element.addEventListener('click', function () {
    tabs.forEach((elem) => elem.classList.remove('active'));
    tabsContent.forEach((elem) => elem.classList.add('hidden'));
    element.classList.add('active');
    document.getElementById(this.dataset.toggle).classList.remove('hidden');
  })
);
tabs[0].click();

let filter = document.querySelectorAll('.filter-title');
const imgWrapper = document.querySelector('.img-wrapper');
const perPage = 12;

function removeActiveState() {
  filter.forEach((el) => el.classList.remove('active'));
}

function slicedData(array) {
  return array.slice(
    perPage * pageState.page,
    perPage * pageState.page + perPage
  );
}

function filterData(currentCategory) {
  let _data = data;
  if (currentCategory !== 'all') {
    _data = _data.filter(function (item) {
      if (item.category === currentCategory) return item;
    });
  }
  return _data;
}

function appendImgContent(content) {
  let html = '';
  content.forEach((el, index) => {
    html =
      html +
      `<li class='filter-content' ><img src='${el.src}' alt='${
        el.category + index
      }'><div class='img-hover'>
    <img src='img/web-design/hover-icon.png' alt='hover-icon'>
    <p>${el.description}</p>
    <p>${el.description}</p>
  </div>
  </li>`;
  });
  return html;
}
function addHoverStyle() {
  let filterContent = document.querySelectorAll('.filter-content');

  filterContent.forEach((element) =>
    element.addEventListener('mouseover', function (e) {
      element.querySelector('.img-hover').style.opacity = '1';
      element.querySelector('img').style.opacity = '0';
    })
  );

  filterContent.forEach((element) =>
    element.addEventListener('mouseout', function (e) {
      element.querySelector('.img-hover').style.opacity = '0';
      element.querySelector('img').style.opacity = '1';
    })
  );
}

filter.forEach((element) =>
  element.addEventListener('click', function () {
    pageState.page = 0;
    addMoreCategoryImgBtn.classList.remove('hidden');
    removeActiveState();
    const currentCategory = element.dataset.categoryType;
    pageState.category = currentCategory;
    element.classList.add('active');
    pageState.data = slicedData(filterData(currentCategory));
    imgWrapper.innerHTML = appendImgContent(pageState.data);
    addHoverStyle();
  })
);

addMoreCategoryImgBtn.addEventListener('click', function (e) {
  e.preventDefault();
  pageState.page++;
  const newData = slicedData(filterData(pageState.category));
  const html = appendImgContent([...pageState.data, ...newData]);
  pageState.data = [...pageState.data, ...newData];
  imgWrapper.innerHTML = html;
  if (pageState.data.length >= filterData(pageState.category).length) {
    e.target.classList.add('hidden');
  }
  addHoverStyle();
});

filter[0].click();

newsItems.forEach((element) =>
  element.addEventListener('mouseover', function () {
    element.querySelector('.news-item-date').style.backgroundColor =
      'var(--green)';
    element.querySelector('.news-item-link').style.color = 'var(--green)';
  })
);

newsItems.forEach((element) =>
  element.addEventListener('mouseout', function () {
    element.querySelector('.news-item-date').style.backgroundColor = '#203E38';
    element.querySelector('.news-item-link').style.color = '#717171';
  })
);

$(document).ready(function () {
  const owl = $('.owl-carousel').owlCarousel({
    nav: true,
    items: 1,
    margin: 10,
    autoHeight: true,
    loop: true,
    center: true,
    dots: true,
    dotsContainer: '.custom-dots',
  });
  $('.custom-dots').on('click', 'li', function (e) {
    owl.trigger('to.owl.carousel', [$(this).index(), 300]);
  });
});
