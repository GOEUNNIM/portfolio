window.addEventListener("load", () => {
    AOS.init();
    // 3초 후 무지개 걷히고 본문 등장 + 페이지 이동
    setTimeout(() => {
        document.body.classList.add("loaded");
        document.getElementById("rainbow-overlay").style.display = "none";

        // index.html로 이동
        location.href = 'index.html';
    }, 3000);
});
