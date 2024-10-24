//  phone

const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
  if (regExp.test(phoneInput.value)) {
    phoneResult.innerHTML = "OK";
    phoneResult.style.color = "green";
  } else {
    phoneResult.innerHTML = " NOT OK";
    phoneResult.style.color = "red";
  }
};

// TAB SLIDER

const tabContentBloks = document.querySelectorAll(".tab_content_block");
const tabItems = document.querySelectorAll(".tab_content_item");
const tabParent = document.querySelector(".tab_content_items");
let currentTabIndex = 0;
let sliderInterval;

const hideTabContent = () => {
  tabContentBloks.forEach((item) => {
    item.style.display = "none";
  });

  tabItems.forEach((item) => {
    item.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (index = 0) => {
  tabContentBloks[index].style.display = "block";
  tabItems[index].classList.add("tab_content_item_active");
  currentTabIndex = index;
};

hideTabContent();
showTabContent();

const autoSlider = (i = 0) => {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(() => {
    i++;
    if (i > tabContentBloks.length - 1) {
      i = 0;
    }
    hideTabContent();
    showTabContent(i);
  }, 3000);
};

tabParent.onclick = (event) => {
  if (event.target.classList.contains("tab_content_item")) {
    tabItems.forEach((item, index) => {
      if (event.target === item) {
        hideTabContent();
        showTabContent(index);
        autoSlider(index);
      }
    });
  }
};
autoSlider(currentTabIndex);

// CONVERTER

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const eurInput = document.querySelector("#eur");

const converter = (element, targetElement1, targetElement2) => {
  element.oninput = async () => {
    try {
      const response = await fetch("../data/convertor.json");
      const data = await response.json();

      if (element.id === "som") {
        targetElement1.value = (element.value / data.usd).toFixed(2);
        targetElement2.value = (element.value / data.eur).toFixed(2);
      }
      if (element.id === "usd") {
        targetElement1.value = (element.value * data.usd).toFixed(2);
        targetElement2.value = ((element.value * data.usd) / data.eur).toFixed(
          2
        );
      }
      if (element.id === "eur") {
        targetElement1.value = (element.value * data.eur).toFixed(2);
        targetElement2.value = ((element.value * data.eur) / data.usd).toFixed(
          2
        );
      }
      if (element.value === "") {
        targetElement1.value = "";
        targetElement2.value = "";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

converter(usdInput, somInput, eurInput);
converter(somInput, usdInput, eurInput);
converter(eurInput, somInput, usdInput);

// CARD SWITCHER
const card = document.querySelector(".card");
const prevButton = document.querySelector("#btn-prev");
const nextButton = document.querySelector("#btn-next");
let cardId = 198;
const api = "https://jsonplaceholder.typicode.com/todos/";

const request = async () => {
  try {
    const response = await fetch(`${api}${cardId}`);
    const data = await response.json();
    const { id, title, completed } = data;
    card.innerHTML = `
      <p>${title}</p>
      <p>${completed}</p>
      <span>${id}</span>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const buttons = (element) => {
  element.onclick = () => {
    if (element.id === "btn-prev") {
      if (cardId > 1) cardId--;
    } else if (element.id === "btn-next") {
      cardId++;
      if (cardId > 200) cardId = 1;
    }
    request();
  };
};

buttons(prevButton);
buttons(nextButton);
request();

async function part2() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const data = await response.json();
    data.forEach((post) => {
      const { id, title, body } = post;
      console.log(post);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

part2();

// WEATHER
// query params - настройки  / свойства / параметры запроса

const searchInput = document.querySelector(".cityName");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");

const API_KEY = "e417df62e04d3b1b111abeab19cea714";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

searchInput.oninput = async () => {
  if (!searchInput.value.trim()) {
    city.innerHTML = "Please enter a city";
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}?q=${searchInput.value}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`City not found: ${response.status}`);
    }
    const data = await response.json();

    city.innerHTML = data.name || "Город не найден";
    temp.innerHTML = data.main.temp
      ? `${data.main.temp}°C`
      : "No temperature data";
  } catch (error) {
    console.error(error);
    city.innerHTML = "Error fetching data";
  }
};
