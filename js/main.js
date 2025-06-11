$(function () {
    AOS.init();

    /* gnb 클릭 시 상황 */
    document.querySelectorAll(".gnb li").forEach((li) => {
        li.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelectorAll(".gnb li").forEach((el) => el.classList.remove("active"));
            this.classList.add("active");
        });
    });

    /* con1 마우스 */
    const customCursor = document.getElementById('customCursor');
    const cursorText = document.getElementById('cursorText');

    document.addEventListener('mousemove', (e) => {
        const isInCon1 = e.target.closest('#con1');

        if (isInCon1) {
            customCursor.style.display = 'block';
            cursorText.style.display = 'block';

            customCursor.style.top = `${e.clientY}px`;
            customCursor.style.left = `${e.clientX}px`;

            cursorText.style.top = `${e.clientY + 24}px`;
            cursorText.style.left = `${e.clientX + 24}px`;

            document.body.style.cursor = 'none';
        } else {
            customCursor.style.display = 'none';
            cursorText.style.display = 'none';
            document.body.style.cursor = 'auto';
        }
    });

    /* con2 프로젝트 */
    new Swiper(".project", {
        loop: true,
        centeredSlides: true,
        slidesPerView: 2, // auto로 해야 각 슬라이드 크기 반영됨
        spaceBetween: 200,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

    function updateSlideStyles() {
        document.querySelectorAll('.swiper-slide').forEach(slide => {
            slide.classList.remove('is-active');
        });
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) activeSlide.classList.add('is-active');
    }




    /* con3 개인 프로젝트 */
    let diffr = 0;
    let rotate = 0;

    document.querySelectorAll(".elem").forEach((ele) => {
        const img = ele.querySelector("img");

        ele.addEventListener("mousemove", (e) => {
            diffr = e.clientX - rotate;
            rotate = e.clientX;

            const diffY = e.clientY - ele.getBoundingClientRect().top;

            gsap.to(img, {
                opacity: 1,
                top: diffY,
                left: e.clientX,
                duration: 1.0,
                rotate: gsap.utils.clamp(-20, 20, diffr),
                ease: Power3.easeOut
            });
        });

        ele.addEventListener("mouseleave", (e) => {
            const diffY = e.clientY - ele.getBoundingClientRect().top;

            gsap.to(img, {
                opacity: 0,
                top: diffY,
                left: e.clientX,
                duration: 1.0,
                ease: Power3.easeOut
            });
        });
    });


    /* con5 카드 */
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#con5',
            start: 'top 70%',
            end: 'top 10%',
            scrub: 1.5,
            markers: true  // 디버깅용 마커
        }
    });

    // 카드별 시간차로 회전
    tl.to('.card1', { rotationY: 180, ease: "power2.inOut", duration: 1 }, 0)
        .to('.card2', { rotationY: 180, ease: "power2.inOut", duration: 1 }, 0.5)
        .to('.card3', { rotationY: 180, ease: "power2.inOut", duration: 1 }, 1);
});