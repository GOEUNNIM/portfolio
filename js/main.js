$(function () {
    AOS.init();

    /* gnb 클릭 시 상황 */
    document.querySelectorAll(".gnb li").forEach((li) => {
        li.addEventListener("click", function (e) {
            e.preventDefault();

            // active 클래스 토글
            document.querySelectorAll(".gnb li").forEach((el) => el.classList.remove("active"));
            this.classList.add("active");

            // a 태그의 href 값 가져오기
            const targetId = this.querySelector("a").getAttribute("href");
            const targetEl = document.querySelector(targetId);

            if (targetEl) {
                // header 높이 계산 (고정된 헤더라면)
                const headerHeight = document.querySelector("header")?.offsetHeight || 0;

                // GSAP 스크롤 애니메이션
                gsap.to(window, {
                    duration: 1.2, // 더 부드럽게 (기존보다 약간 길게)
                    scrollTo: {
                        y: targetEl,
                        offsetY: headerHeight
                    },
                    ease: "power2.out" // 부드러운 ease 효과
                });
            }
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
    const maxTrail = 10;

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
            /* ctx.beginPath(); */

            for (let i = 0; i < trail.length - 1; i++) {
                const p1 = trail[i];
                const p2 = trail[i + 1];
                /* const alpha = i / trail.length; */
                const alpha = (i / trail.length) * 0.8; // 전체적으로 연해짐
                const lineW = (i / trail.length) * 3 + 0.5;
                /* ctx.lineWidth = (i / trail.length) * 3 + 0.5; */
                ctx.strokeStyle = `rgba(255, 158, 170, ${alpha})`;
                ctx.lineWidth = lineW;

                ctx.beginPath();

                // 💡 부드러운 곡선 처리를 위한 control point
                const cx = (p1.x + p2.x) / 2;
                const cy = (p1.y + p2.y) / 2;

                ctx.moveTo(p1.x, p1.y);
                ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);

                ctx.stroke();
            }
            /* ctx.stroke(); */
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

    // 초기 상태 설정
    /* gsap.set(['.card1', '.card2', '.card3'], { rotationY: 0 }); */

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#con5',
            start: 'top 50%',
            end: 'top 10%',
            scrub: 3,
            /* markers: true */  // 디버깅용 마커
        }
    });

    // 카드별 시간차로 회전
    tl.to('.card1', { rotationY: 180, ease: "power2.inOut", duration: 1 }, 0)
        .to('.card2', { rotationY: 180, ease: "power2.inOut", duration: 1 }, 0.5)
        .to('.card3', { rotationY: 180, ease: "power2.inOut", duration: 1 }, 1);



    /* con6 타이핑 */
    const textHTML = `
  비가 온 뒤 <span>무지개</span>가 떠오르듯<br>
  끊임없는 고민과 배움을 통해 빛나는 <span>다채로운 세상</span>의<br>
  사용자 경험과 인터페이스를 그려나가겠습니다.
`;

    const target = document.getElementById("typeText");
    let i = 0;
    let isTyping = false;

    function typing() {
        if (isTyping) return;
        isTyping = true;

        const strippedText = textHTML.replace(/<[^>]*>/g, ''); // span, br 태그 제외한 순수 텍스트
        const tagMatches = [...textHTML.matchAll(/<[^>]*>/g)];

        let output = '';
        let plainIndex = 0;
        let tagIndex = 0;
        let currentTag = tagMatches[tagIndex];

        function typeChar() {
            // 태그가 들어갈 위치면 태그 삽입
            if (currentTag && currentTag.index === output.length) {
                output += currentTag[0];
                tagIndex++;
                currentTag = tagMatches[tagIndex];
            } else if (plainIndex < strippedText.length) {
                output += strippedText[plainIndex];
                plainIndex++;
            }

            target.innerHTML = output;

            if (plainIndex < strippedText.length || currentTag) {
                setTimeout(typeChar, 50); // 속도 조절
            }
        }

        typeChar();
    }

    // ScrollTrigger로 시작 시점 조절
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: "#con6",
        start: "top 70%",
        once: true,
        onEnter: () => typing()
    });
});