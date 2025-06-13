$(function () {
  AOS.init();

  let mainSilde = new Swiper(".main_visual", {
    autoplay: {
      delay: 2900,
    },
    effect: "fade",
    loop: true,
    navigation: {
      nextEl: ".button_p .right",
      prevEl: ".button_p .left",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  });
  let firstswiper = new Swiper(".first_wrap", {
    slidesPerView: 'auto',
    spaceBetween: 100,
  });

  let koreaswiper = new Swiper(".korea_all", {
    slidesPerView: 5,
    centeredSlides: true,
    loop: true,
  });

  $('#scroll_A').css({
    "opacity": "0",
    "visibility": "hidden"
  }).removeClass("animate__animated animate__lightSpeedInRight");

  $(window).scroll(function () {
    var target = $('#scroll_A');
    var imagePos = target.offset().top;
    var topOfWindow = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (imagePos < (topOfWindow + windowHeight - 100)) {
      target.css({
        "opacity": "1",
        "visibility": "visible"
      }).addClass("animate__animated animate__lightSpeedInRight");
    }
  });


});