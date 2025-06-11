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


    /* con1 마우스 동그라미 원형 버전 */
    /* const customCursor = document.getElementById('customCursor');
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
    }); */


    /* con1 마우스 커서따라 선그려지는 버전 */
    // 요소 가져오기
    const cursorCanvas = document.getElementById('cursorCanvas');
    const ctx = cursorCanvas.getContext('2d');
    const cursorText = document.getElementById('cursorText');
    const con1 = document.getElementById('con1');

    // 초기 설정
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
    let trail = [];
    const maxTrail = 20;

    // 마우스 움직임 감지
    window.addEventListener('mousemove', (e) => {
        const inCon1 = isInCon1();

        if (inCon1) {
            // 트레일 저장
            trail.push({ x: e.clientX, y: e.clientY });
            if (trail.length > maxTrail) trail.shift();

            // 텍스트 위치 이동
            cursorText.style.top = `${e.clientY}px`;
            cursorText.style.left = `${e.clientX}px`;
        }
    });

    // 트레일 그리기
    function drawTrail() {
        const inCon1 = isInCon1();

        if (inCon1) {
            ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
            ctx.beginPath();

            for (let i = 0; i < trail.length - 1; i++) {
                const p1 = trail[i];
                const p2 = trail[i + 1];
                /* const alpha = i / trail.length; */
                const alpha = (i / trail.length) * 0.8; // 전체적으로 연해짐
                ctx.strokeStyle = `rgba(255, 100, 200, ${alpha})`;
                ctx.lineWidth = 2;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }

            ctx.stroke();
        } else {
            ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
            trail = []; // 화면 벗어나면 trail도 초기화
        }

        requestAnimationFrame(drawTrail);
    }

    drawTrail();

    // 창 크기 변경 대응
    window.addEventListener('resize', () => {
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight;
    });

    // 스크롤 시 보이기/숨기기
    window.addEventListener('scroll', updateCursorVisibility);
    window.addEventListener('resize', updateCursorVisibility);
    updateCursorVisibility(); // 초기 한 번 실행

    function updateCursorVisibility() {
        const inView = isInCon1();

        cursorCanvas.style.display = inView ? 'block' : 'none';
        cursorText.style.display = inView ? 'block' : 'none';
    }

    function isInCon1() {
        const rect = con1.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }




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
            /* markers: true */  // 디버깅용 마커
        }
    });

    // 카드별 시간차로 회전
    tl.to('.card1', { rotationY: 180, ease: "power2.inOut", duration: 1 }, 0)
        .to('.card2', { rotationY: 180, ease: "power2.inOut", duration: 1 }, 0.5)
        .to('.card3', { rotationY: 180, ease: "power2.inOut", duration: 1 }, 1);
});