"use strict"

// Swiper
// Initialization
const reasonsSwiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  slidesPerView: 1,
  spaceBetween: 15,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    1024.99: {
      slidesPerView: 4,
    },
    840.99: {
      slidesPerView: 3,
    },
    553.99: {
      slidesPerView: 2,
    },
  },
})

// Func for updating swiper nav buttons
function updateSwiperButtons(navigationButtons) {
  if (!navigationButtons) {
    throw new Error("No buttons!")
  }
  if (window.innerWidth < 768.99) {
    navigationButtons[0].classList.add("swiper-button-hidden")
    navigationButtons[1].classList.add("swiper-button-hidden")
  } else {
    navigationButtons[0].classList.remove("swiper-button-hidden")
    navigationButtons[1].classList.remove("swiper-button-hidden")
  }
}
// Func for updating swiper pagination
function updateSwiperPagination(paginationElem) {
  if (!paginationElem) {
    throw new Error("No pagination!")
  }
  if (window.innerWidth < 768.99) {
    paginationElem.classList.remove("swiper-pagination-hidden")
  } else {
    paginationElem.classList.add("swiper-pagination-hidden")
  }
}

// Input telephone initialization
const telInput = document.querySelector("#tel")
window.intlTelInput(telInput, {
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.8.1/build/js/utils.js",
  initialCountry: "ua",
  separateDialCode: true,
  onlyCountries: ["ua", "us", "dk"],
})

// Form Validation
function validateForm(event) {
  event.preventDefault()
  const nameInput = document.querySelector("#name")
  const telInput = document.querySelector("#tel")
  const checkInput = document.querySelector("#policy")

  const errorNameElem = document.querySelector(".input-name-error")
  const errorTelElem = document.querySelector(".input-tel-error")

  if (!nameInput.value) {
    nameInput.style.border = "1px solid red"
    nameInput.style.outline = "1px solid red"
    errorNameElem.style.display = "block"
  } else {
    nameInput.style.border = "none"
    nameInput.style.outline = "0.0625rem solid #5d78ff"
    errorNameElem.style.display = "none"
  }
  if (!telInput.value) {
    telInput.style.border = "1px solid red"
    telInput.style.outline = "1px solid red"
    errorTelElem.style.display = "block"
  } else {
    telInput.style.border = "none"
    telInput.style.outline = "0.0625rem solid #5d78ff"
    errorTelElem.style.display = "none"
  }
  if (!checkInput.checked) {
    checkInput.style.outline = "2px solid red"
  } else {
    checkInput.style.outline = "0.0625rem solid #5d78ff"
  }
  if (nameInput.value && telInput.value && checkInput.checked) {
    event.target.submit()
  }
}

// Click handlers
// For menu
function menuClickHandler(event) {
  if (event.target.classList.contains("icon-menu")) {
    document.body.classList.toggle("menu-opened")
  }
}
// For overlay
function overlayClickHandler(event) {
  if (event.target.classList.contains("overlay")) {
    document.body.classList.remove("menu-opened")
  }
}
// Open popup
function openPopupClickHandler() {
  const popupEl = document.querySelector(".popup")
  popupEl.style.visibility = "visible"

  popupEl.classList.add("opening-popup")
  setTimeout(() => {
    popupEl.classList.remove("opening-popup")
  }, 400)
}
// Close popup
function closePopupClickHandler(event) {
  const popupEl = document.querySelector(".popup")

  if (event.target.classList.contains("popup-closer") && popupEl) {
    popupEl.classList.add("closing-popup")
    setTimeout(() => {
      popupEl.classList.remove("closing-popup")
      popupEl.style.visibility = "hidden"
    }, 400)
  }
}

// Event Listeners
// Open/close menu
const menuButton = document.querySelector(".icon-menu")
menuButton.addEventListener("click", menuClickHandler)

// Close menu with overlay
const overlayDiv = document.querySelector(".overlay")
overlayDiv.addEventListener("click", overlayClickHandler)

// Close popup
const closePopupButton = document.querySelector(".popup__close-button")
closePopupButton.addEventListener("click", closePopupClickHandler)

// Open popup
const popupOpeners = document.querySelectorAll(".popup-opener")
if (popupOpeners.length > 0) {
  for (let i = 0; i < popupOpeners.length; i++) {
    popupOpeners[i].addEventListener("click", openPopupClickHandler)
  }
}

// For swiper update
const swiperButtons = document.getElementsByClassName("reasons__button")
const paginationElem = document.querySelector(".swiper-pagination")
document.addEventListener("DOMContentLoaded", () => {
  updateSwiperButtons(swiperButtons)
  updateSwiperPagination(paginationElem)
})
window.addEventListener("resize", () => {
  updateSwiperButtons(swiperButtons)
  updateSwiperPagination(paginationElem)
})

// For form validation
const form = document.querySelector(".form-popup")
form.addEventListener("submit", validateForm)
