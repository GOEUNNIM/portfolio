$(function () {
  AOS.init();
  let mainSilde = new Swiper(".main_visual", {
    autoplay: {
      delay: 5000,
    },
    effect: "fade",
    loop: true,
    disableOnInteraction: false,
    pagination: {
      el: ".main_visual .swiper-pagination",
      clickable: true,
    },
  });

  /* let steakswiper = new Swiper(".st_con1_ri", {
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
    }); */

  /* 샐러드바 탭메뉴 */
  $('.saladbar_menu ul.tab_menu li').click(function () {
    // 모든 탭과 메뉴의 'on' 클래스 제거
    $('.saladbar_menu ul.tab_menu li, .saladbar_menu ul.menu_list>li').removeClass('on');
    $(this).addClass('on');

    let i = $(this).index();
    let $menuItems = $('.saladbar_menu ul.menu_list>li');

    // 모든 메뉴 숨기기 후 해당 메뉴만 표시
    $menuItems.hide();
    let $selectedMenu = $menuItems.eq(i);
    $selectedMenu.show();

    // 애니메이션 적용
    $selectedMenu.find("img").each(function (index) {
      let delay = 300 + (index * 250); // 계단식 애니메이션 적용
      $(this).css({
        "opacity": "0",
        "transform": "translateY(50px)",
        "transition": "opacity 0.5s ease-out, transform 0.7s ease-out",
        "transition-delay": delay + "ms"
      });

      setTimeout(() => {
        $(this).css({
          "opacity": "1",
          "transform": "translateY(0)"
        });
      }, 50);
    });
  });

  /* 스테이크 */
  let steakSwiper = new Swiper('.right', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    /* spaceBetween: 20, */
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 'auto',
      },
      1025: {
        slidesPerView: 3,
      }
    },
    // 자동 확대 처리용 클래스 추가
    on: {
      init: () => setTimeout(updateFirstVisible, 100),
      slideChangeTransitionEnd: updateFirstVisible,
    },
  });

  function updateFirstVisible() {
    // 모든 썸네일에서 on 제거
    document.querySelectorAll('.st_thumbnail').forEach(el => el.classList.remove('on'));

    // 실제 swiper 내부 슬라이드 배열에서 현재 activeIndex 기준으로 첫 번째 슬라이드 찾기
    let slides = steakSwiper.slides; // 모든 슬라이드 목록 (복제 포함)
    let realIndex = steakSwiper.activeIndex; // 현재 가운데 슬라이드 인덱스

    // 첫 번째로 보이는 슬라이드는 가운데 기준 왼쪽이므로 -1
    let firstIndex = realIndex - 1;

    // loop일 경우 슬라이드 개수 초과 방지
    if (firstIndex < 0) {
      firstIndex = slides.length - 1;
    }

    let firstSlide = slides[firstIndex];
    if (firstSlide) {
      let thumbnail = firstSlide.querySelector('.st_thumbnail');
      if (thumbnail) {
        thumbnail.classList.add('on');
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".logo_slider");
    const items = slider.innerHTML; // 기존 이미지들 저장

    // 기존 로고들을 복제하여 무한 롤링 구현
    slider.innerHTML += items;
  });
  /* document.addEventListener("DOMContentLoaded", function () {
    let fooSlider = document.querySelector(".logo-slider");
    let fooItems = slider.innerHTML; // 기존 이미지들 저장

  // 원본 리스트 1회 복제 (총 2세트)
  slider.innerHTML += items;
  }); */

  /* 스테이크 스와이퍼 모바일 버전 */
  const isMobile = window.innerWidth <= 393;

  const steakMobileSwiper = new Swiper('.right', {
    effect: isMobile ? "cards" : "slide", // ✅ mobile에서만 'cards'
    grabCursor: true,
    loop: false,
    slidesPerView: "auto",
    centeredSlides: true,
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
    breakpoints: {
      1025: {
        slidesPerView: 4,
        effect: "slide",
        centeredSlides: false,
      },
    },
  });




  /* 이벤트페이지 */
  let eventSwiper = new Swiper('.event_all', {
    slidesPerView: 'auto',
    spaceBetween: 20,
  });

  let slides = document.querySelectorAll('.event_list');

  slides.forEach(slide => {
    slide.addEventListener('click', (e) => {
      e.stopPropagation(); // 문서 클릭 이벤트 전파 막기

      const isAlreadyActive = slide.classList.contains('active');

      slides.forEach(s => s.classList.remove('active'));

      if (!isAlreadyActive) {
        slide.classList.add('active');
      }
    });
  });

  // 🧠 문서 전체 클릭 시, .event_list 영역이 아니면 active 제거
  document.addEventListener('click', (e) => {
    let isInsideEventList = e.target.closest('.event_list');

    if (!isInsideEventList) {
      slides.forEach(s => s.classList.remove('active'));
    }
  });
  /* slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const isAlreadyActive = slide.classList.contains('active');
      slides.forEach(s => s.classList.remove('active'));
      if (!isAlreadyActive) {
        slide.classList.add('active');
      }
    });
  }); */
});