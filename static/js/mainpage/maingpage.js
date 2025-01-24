// 첫번째 슬라이더

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
        }, transitionTime + 4100); // 전환 시간 + 약간의 딜레이
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

// 두번째 슬라이더더
document.addEventListener("DOMContentLoaded", () => {
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    const slides = document.querySelectorAll(".swiper-slide");
    const pagination = document.querySelectorAll(".swiper-pagination-switch");
    const slideWidthLarge = 1380; // 큰 화면 기준
    const slideWidthSmall = 922; // 작은 화면 기준
    const totalSlides = 5; // pagination에 표시할 총 슬라이드 수 (2번째 ~ 6번째 ul)
    let currentSlide = 1; // 2번째 ul부터 시작
    let slideWidth = window.innerWidth <= 1400 ? slideWidthSmall : slideWidthLarge;
    let autoSlideInterval;

    // 슬라이더 초기화
    const initializeSlider = () => {
        slideWidth = window.innerWidth <= 1400 ? slideWidthSmall : slideWidthLarge;
        swiperWrapper.style.width = `${slideWidth * slides.length}px`;
        swiperWrapper.style.transform = `translate3d(${-currentSlide * slideWidth}px, 0, 0)`;
        swiperWrapper.style.transition = "none";

        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
        updatePagination();
        startAutoSlide();
    };

    // 슬라이드 위치 업데이트
    const updateSlider = (instant = false) => {
        const translateValue = -currentSlide * slideWidth;
        swiperWrapper.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
        swiperWrapper.style.transform = `translate3d(${translateValue}px, 0, 0)`;
    };

    // Pagination 업데이트
    const updatePagination = () => {
        pagination.forEach((dot, index) => {
            if (index === (currentSlide - 1) % totalSlides) {
                dot.classList.add("swiper-active-switch");
            } else {
                dot.classList.remove("swiper-active-switch");
            }
        });
    };

    // Pagination 클릭 이벤트 추가
    pagination.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            clearInterval(autoSlideInterval);
            currentSlide = index + 1; // 해당 슬라이드로 이동
            updateSlider();
            updatePagination();
            startAutoSlide();
        });
    });

    // 자동 슬라이드
    const autoSlide = () => {
        currentSlide++;
        if (currentSlide >= slides.length - 1) {
            updateSlider();
            setTimeout(() => {
                currentSlide = 1; // 2번째 ul로 이동
                updateSlider(true);
            }, 500);
        } else {
            updateSlider();
        }
        updatePagination();
    };

    // 이전 슬라이드
    const prevSlide = () => {
        currentSlide--;
        if (currentSlide < 0) {
            updateSlider();
            setTimeout(() => {
                currentSlide = slides.length - 2; // 마지막 슬라이드로 이동
                updateSlider(true);
            }, 500);
        } else {
            updateSlider();
        }
        updatePagination();
    };

    // 다음 슬라이드
    const nextSlide = () => {
        autoSlide();
    };

    // 자동 슬라이드 시작
    const startAutoSlide = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 5500);
    };

    // 창 크기 변경 시 슬라이더 초기화
    window.addEventListener("resize", initializeSlider);

    // 버튼 이벤트 추가
    document.querySelector(".swiper-button-prev").addEventListener("click", () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        startAutoSlide();
    });
    document.querySelector(".swiper-button-next").addEventListener("click", () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        startAutoSlide();
    });

    // 초기화
    initializeSlider();
});
