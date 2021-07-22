// Nav Open / Close
function navToggle() {
  const nav = document.querySelector('nav');
  const ulList = document.querySelector('.nav-list');
  const menu = document.querySelector('.menu');
  const close = document.querySelector('.close');

  function activeNavList() {
    nav.classList.add('active');
  }

  function hideNavList() {
    nav.classList.remove('active');
  }

  menu.addEventListener('click', activeNavList);
  close.addEventListener('click', hideNavList);
}

navToggle();

//Header

function navColorChange() {
  const homeHeight = document.getElementById('home').getBoundingClientRect().height;

  const header = document.querySelector('header');

  function headerDeal() {
    // Nếu cuộn hết home - 120 cái thanh 'Hãy cùng tôi khám phá thì header thành trắng
    if (window.scrollY >= homeHeight - 120) {
      header.classList.add('white');
    } else {
      header.classList.remove('white');
    }
  }

  window.addEventListener('scroll', headerDeal);
}

navColorChange();

// Loader
window.addEventListener('load', () => {
  document.querySelector('.loader').classList.add('hide');
});

// Money count up when you scroll to see them
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min + 1) + min);
}

const money = document.getElementById('money');
let target;
if (!hasMoney()) {
  target = randomNumber(1500, 2600);
  localStorage.setItem('target', target);
} else {
  target = +localStorage.getItem('target');
}

function hasMoney() {
  for (let i in localStorage) {
    if (i === 'target') {
      return true;
    }
  }
  return false;
}

function moneyIncrease() {
  const speed = 7;
  if (money.getBoundingClientRect().top < window.innerHeight && +money.innerHTML < target) {
    countUp();
  }

  function countUp() {
    let number = +money.innerHTML;

    const increase = setInterval(() => {
      if (number >= target) {
        money.innerText = target;
        clearInterval(increase);
      } else {
        number += speed;
        money.innerText = number;
      }
    }, 1);
  }
}

// Scroll and trigger the counter if that inside innerHeight
window.addEventListener('scroll', moneyIncrease);
// If the initial page contain the counter, the function still trigger without scroll event
moneyIncrease();

/* Donate the money */

const submit = document.getElementById('send__money');
const form = document.querySelector('form');

function addMoney(amount) {
  let money = +localStorage.getItem('target');
  money += amount;
  localStorage.setItem('target', money);

  document.getElementById('money').innerHTML = money;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll('input[type="radio"]');
  inputs.forEach((input) => {
    if (input.checked) {
      // console.log(+input.value);
      addMoney(+input.value);
    }
  });
});
