document.addEventListener('DOMContentLoaded', () => {
    const stage = document.querySelector('.stage');
    const slides = Array.from(document.querySelectorAll('.stage-item'));
    const prevBtn = document.querySelector('.slide-prev-btn');
    const nextBtn = document.querySelector('.slide-next-btn');
    const dots = document.querySelectorAll('.slide-dot');

    let currentIndex = 1; // 첫 슬라이드로 초기화
    const slideWidth = 1594.67; // 슬라이드 너비
    const totalSlides = slides.length;

    // 슬라이드 클론 추가
    const firstClone = slides[0].cloneNode(true); // 첫 슬라이드 클론
    const lastClone = slides[slides.length - 1].cloneNode(true); // 마지막 슬라이드 클론

    firstClone.classList.add('cloned');
    lastClone.classList.add('cloned');

    stage.appendChild(firstClone); // 끝에 첫 슬라이드 추가
    stage.insertBefore(lastClone, slides[0]); // 앞에 마지막 슬라이드 추가

    const updatedSlides = Array.from(document.querySelectorAll('.stage-item')); // 클론 포함된 슬라이드 리스트
    stage.style.width = `${slideWidth * updatedSlides.length}px`; // stage의 전체 너비 업데이트
    stage.style.transform = `translate3d(-${slideWidth * currentIndex}px, 0, 0)`; // 첫 번째 슬라이드로 초기화

    const transitionTime = 1400; // 전환 시간 (ms)
    let isTransitioning = false;

    // 슬라이드 이동 함수
    function moveToSlide(index) {
        if (isTransitioning) return; // 애니메이션 중일 때는 무시
        isTransitioning = true;

        stage.style.transition = `transform ${transitionTime}ms ease`;
        stage.style.transform = `translate3d(-${slideWidth * index}px, 0, 0)`;

        currentIndex = index;

        // dots 업데이트
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === (currentIndex - 1 + totalSlides) % totalSlides);
        });

        // 전환 완료 후 처리
        setTimeout(() => {
            isTransitioning = false;
            if (currentIndex === 0) {
                stage.style.transition = 'none';
                stage.style.transform = `translate3d(-${slideWidth * totalSlides}px, 0, 0)`;
                currentIndex = totalSlides;
            } else if (currentIndex === updatedSlides.length - 1) {
                stage.style.transition = 'none';
                stage.style.transform = `translate3d(-${slideWidth}px, 0, 0)`;
                currentIndex = 1;
            }
        }, transitionTime);
    }

    // 자동 슬라이드 전환
    function startAutoSlide() {
        setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, transitionTime + 2000); // 전환 시간 + 약간의 딜레이
    }

    // 이전 버튼 클릭 이벤트
    prevBtn.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });

    // 다음 버튼 클릭 이벤트
    nextBtn.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    // dots 클릭 이벤트
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            moveToSlide(idx + 1);
        });
    });

    // 초기 슬라이드 설정 및 자동 전환 시작
    moveToSlide(currentIndex);
    startAutoSlide();
});


document.addEventListener("DOMContentLoaded", function () {
    const ulElement = document.querySelector(".hot-recommand-restaurant .section ul");
    const prevButton = document.querySelector(".swiper-button-prev");
    const nextButton = document.querySelector(".swiper-button-next");
    const itemWidth = 922; // Adjusted for screen width
    let currentTranslate = 0;
    const maxTranslate = -((ulElement.children.length - 2) * itemWidth); // Two items visible

    function updateTranslate() {
        ulElement.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    }

    prevButton.addEventListener("click", function () {
        if (currentTranslate < 0) {
            currentTranslate += itemWidth;
            updateTranslate();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentTranslate > maxTranslate) {
            currentTranslate -= itemWidth;
            updateTranslate();
        }
    });

    // Adjust layout dynamically on window resize
    window.addEventListener("resize", function () {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 1400) {
            ulElement.style.width = "922px";
        } else {
            ulElement.style.width = "3206px";
        }
    });
});