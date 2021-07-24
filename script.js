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

  // Click the menu => open nav bar
  menu.addEventListener('click', activeNavList);
  // Click the close button => close nav bar
  close.addEventListener('click', hideNavList);
}

/*
 * *Toggle Nav Bar Mobile Layout
 */
navToggle();

/* -------------------------------------- */

function navColorChange() {
  const homeHeight = document.getElementById('home').getBoundingClientRect().height;

  const header = document.querySelector('header');

  function headerDeal() {
    /* * 
    ? Nav Bar change color when the scroll height >= the initial home height - 120 (contain the about us header height, so the effect will be better) 
     */
    if (window.scrollY >= homeHeight - 120) {
      header.classList.add('white');
    } else {
      header.classList.remove('white');
    }
  }

  window.addEventListener('scroll', headerDeal);
}
/*
 * * Color Nav Bar Toggle

 */
navColorChange();

/* -------------------------------------- */

/*
 * * Loading Screen.
 */
window.addEventListener('load', () => {
  document.querySelector('.loader').classList.add('hide');
});

/* -------------------------------------- */

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min + 1) + min);
}

function hasMoney() {
  for (let i in localStorage) {
    if (i === 'target') {
      return true;
    }
  }
  return false;
}

function getTarget() {
  let target;
  if (!hasMoney()) {
    target = randomNumber(1500, 2600);
    localStorage.setItem('target', target);
    return target;
  }
  return (target = +localStorage.getItem('target'));
}

const money = document.getElementById('money');
let target = getTarget();

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

/*
 * *  The counter (scroll)
 */
window.addEventListener('scroll', moneyIncrease);
/* 
* * The counter
? (If the initial page contain the counter => still trigger)
*/
moneyIncrease();

/* -------------------------------------- */

/*
 * * Donate the money
 */

const submit = document.getElementById('send__money');
const form = document.querySelector('form');

function addMoney(amount) {
  // ? Add money depend on input value
  let money = +localStorage.getItem('target');
  money += amount;
  localStorage.setItem('target', money);

  document.getElementById('money').innerHTML = money;
}
const popup = document.querySelector('.popup');
function showPopup() {
  // ? add the class 'show' to popup element which have been created before but hidden
  popup.classList.add('show');
}

function closePopup() {
  popup.classList.remove('show');
}

function addMoneyToPopUp(amount) {
  console.log(document.getElementById('amount'));
  document.getElementById('amount').innerHTML = amount;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  //  ? add money depend on which label is checked
  const inputs = document.querySelectorAll('input[type="radio"]');
  inputs.forEach((input) => {
    if (input.checked) {
      addMoney(+input.value);

      // ? Add money to PopUp
      addMoneyToPopUp(+input.value);
    }
  });

  // ? Pop up after donate
  showPopup();
});

document.getElementById('close').addEventListener('click', closePopup);
