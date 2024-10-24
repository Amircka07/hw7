// GMAIL
const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");
const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

// маленькие ошибки не видит
gmailButton.onclick = () => {
  if (regExp.test(gmailInput.value)) {
    gmailResult.innerHTML = "OK";
    gmailResult.style.color = "green";
  } else {
    gmailResult.innerHTML = " NOT OK";
    gmailResult.style.color = "red";
  }
};

// BLOCK

// const block = document.querySelector(".child_block");
// let position = 0;
// const left = () => {
//   if (position < 448) {
//     position++;
//     block.style.left = position + "px";
//     requestAnimationFrame(left);
//   }
// };
// left();

const childBlock = document.querySelector(".child_block");
const parentBlock = document.querySelector(".parent_block");

let positionX = 0;
let positionY = 0;

const offsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const offsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight;
const moveBlock = () => {
  if (positionX < offsetWidth && positionY === 0) {
    positionX++;
    childBlock.style.left = `${positionX}px`;
    requestAnimationFrame(moveBlock);
  } else if (positionX >= offsetWidth && positionY < offsetHeight) {
    positionY++;
    childBlock.style.top = `${positionY}px`;
    requestAnimationFrame(moveBlock);
  } else if (positionX > 0 && positionY > 0) {
    positionX--;
    childBlock.style.left = `${positionX}px`;
    requestAnimationFrame(moveBlock);
  } else if (positionX === 0 && positionY > 0) {
    positionY--;
    childBlock.style.top = `${positionY}px`;
    requestAnimationFrame(moveBlock);
  }
};
moveBlock();

// COUNTER

const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");
const seconds = document.querySelector("#seconds");

let interval,
  sec = 0;
start.onclick = () => {
  interval = setInterval(() => {
    sec++;
    seconds.innerHTML = sec;
  }, 1000);
  start.disabled = true;
};

stop.onclick = () => {
  clearInterval(interval);
  start.disabled = false;
};

reset.onclick = () => {
  clearInterval(interval);
  sec = 0;
  seconds.innerHTML = sec;
  start.disabled = false;
};
