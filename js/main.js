$(function () {
  AOS.init();

  // 일정 시간 후 로딩 종료
  const {
    Engine, Render, Runner, World, Bodies,
    Mouse, MouseConstraint
  } = Matter;

  // 전역 상태
  let engine, world, render, runner;
  let letterBodies = [];
  let createdImages = new Set();      // 이미지 중복 방지용
  let imageTimeouts = [];             // setTimeout 예약 추적용

  function initMatter() {
    const canvas = document.getElementById("world");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    engine = Engine.create();
    world = engine.world;

    render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: '#ffffff',
        wireframes: false,
      }
    });

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    // ✅ 텍스트 출력 추가
    Matter.Events.on(render, 'afterRender', function () {
      const ctx = render.context;
      ctx.save();

      // ✅ 픽셀 보정
      ctx.translate(0.5, 0.5);

      const text = '마우스로 풍선을 움직여보세요!';
      ctx.font = '16px Pretendard, sans-serif';
      ctx.fillStyle = '#666';

      // 가운데 정렬
      const textWidth = ctx.measureText(text).width;
      const x = (canvas.width - textWidth) / 2;
      const y = canvas.height * 0.5; // 화면 하단 80% 지점

      ctx.fillText(text, x, y);
      ctx.restore();
    });

    // ✅ overlay DOM 요소 가져오기
    const overlay = document.getElementById("mouse_overlay");

    // ✅ overlay 기준으로 mouse 생성
    const mouse = Mouse.create(document.body);

    // ✅ 마우스 컨트롤 생성
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.9,
        damping: 0.05,
        render: { visible: false }
      }
    });

    // ✅ 월드에 추가
    World.add(world, mouseConstraint);

    /* const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.9,
        damping: 0.05,
        render: { visible: false }
      }
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse; */

    const imageFiles = ["e.png", "u.png", "n_1.png", "n_2.png", "i.png", "m.png"];
    const originalImageSize = 1024;
    const renderSize = 400;
    const scaleFactor = renderSize / originalImageSize;

    letterBodies = [];

    const createImageBody = (filename, x, y) => {
      let bodyWidth = 300;
      let bodyHeight = 300;

      switch (filename) {
        case "n_1.png":
        case "n_2.png":
          bodyWidth = 529 * scaleFactor;
          bodyHeight = 639 * scaleFactor;
          break;
        case "e.png":
          bodyWidth = 530 * scaleFactor;
          bodyHeight = 670 * scaleFactor;
          break;
        case "i.png":
          bodyWidth = 185 * scaleFactor;
          bodyHeight = 750 * scaleFactor;
          break;
        case "m.png":
          bodyWidth = 750 * scaleFactor;
          bodyHeight = 560 * scaleFactor;
          break;
        case "u.png":
          bodyWidth = 500 * scaleFactor;
          bodyHeight = 610 * scaleFactor;
          break;
      }

      return Bodies.rectangle(x, y, bodyWidth, bodyHeight, {
        restitution: 0.1,
        friction: 0.5,
        density: 0.002,
        render: {
          sprite: {
            texture: `img/${filename}`,
            xScale: scaleFactor,
            yScale: scaleFactor
          }
        }
      });
    };

    const preloadImage = (src, onLoad, onError) => {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onError;
      img.src = src;
    };

    imageFiles.forEach((filename, index) => {
      const delay = Math.random() * 1000;
      const imagePath = `img/${filename}`;

      const timeoutId = setTimeout(() => {
        if (createdImages.has(filename)) return;

        preloadImage(
          imagePath,
          () => {
            createdImages.add(filename);

            const totalWidth = imageFiles.length * 200;
            const startX = (window.innerWidth / 2) - (totalWidth / 2);
            const spacing = 200;

            const x = startX + index * spacing;
            const y = window.innerHeight * 0.2;

            const body = createImageBody(filename, x, y);
            World.add(world, body);
            letterBodies.push(body);
          },
          () => {
            console.error(`🚨 이미지 로딩 실패: ${imagePath}`);
          }
        );
      }, delay);

      imageTimeouts.push(timeoutId);
    });

    const thickness = 500;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const walls = [
      Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }),
      Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }),
      Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }),
      Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true })
    ];
    World.add(world, walls);

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const con1 = document.getElementById("con1");
    const con2 = document.getElementById("con2");

    /*     con1.addEventListener("wheel", function (e) {
          if (e.deltaY > 0) {
            e.preventDefault();
            con2.scrollIntoView({ behavior: "smooth" });
          }
        }, { passive: false });
    
        con2.addEventListener("wheel", function (e) {
          if (e.deltaY < 0) {
            e.preventDefault();
            con1.scrollIntoView({ behavior: "smooth" });
          }
        }, { passive: false }); */
  }

  initMatter();

  let hasEnteredCon1 = false;

  const resetCanvas = () => {
    imageTimeouts.forEach(id => clearTimeout(id));
    imageTimeouts = [];
    createdImages.clear();
    letterBodies = [];

    World.clear(world, false);
    Engine.clear(engine);
    Render.stop(render);
    Runner.stop(runner);

    if (render.canvas && render.canvas.parentNode) {
      render.canvas.parentNode.removeChild(render.canvas);
    }

    const newCanvas = document.createElement("canvas");
    newCanvas.id = "world";
    document.getElementById("con1").appendChild(newCanvas);

    initMatter();
  };

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const con1Top = document.getElementById("con1").offsetTop;
    const con1Height = document.getElementById("con1").offsetHeight;

    if (
      scrollY + window.innerHeight > con1Top + 100 &&
      scrollY < con1Top + con1Height - 100
    ) {
      if (!hasEnteredCon1) {
        hasEnteredCon1 = true;
        resetCanvas();
      }
    } else {
      hasEnteredCon1 = false;
    }
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const con2Top = document.getElementById("con2").offsetTop;
    const canvas = document.getElementById("world");

    if (scrollY + window.innerHeight > con2Top) {
      if (!canvas.classList.contains("hide-canvas")) {
        canvas.classList.add("hide-canvas");
      }
    } else {
      if (canvas.classList.contains("hide-canvas")) {
        canvas.classList.remove("hide-canvas");
      }
    }
  });







  /* 카드스택(장점) */
  const target = document.querySelector('.card_stack');

  if (target) {
    window.addEventListener('scroll', () => {
      const top = target.getBoundingClientRect().top;
      const bottom = target.getBoundingClientRect().bottom;
      const vh = window.innerHeight;

      // 화면 중앙 근처에 들어오면 active 추가
      if (top < vh * 0.8 && bottom > vh * 0.2) {
        if (!target.classList.contains('active')) {
          target.classList.add('active');
          console.log('✅ 카드 active 클래스 추가됨');
        }
      } else {
        // 다시 나갔다가 들어올 수 있게끔 active 제거
        if (target.classList.contains('active')) {
          target.classList.remove('active');
          console.log('🌀 카드 active 클래스 제거됨');
        }
      }
    });
  };


  /* con4 프로젝트 리스트 슬라이드 */
  window.addEventListener("load", function () {
    const projectswiper = new Swiper(".project", {
      slidesPerView: 'auto',
      spaceBetween: 0,
    });
  });

});
