// 요소 선택
const aside = document.querySelector('#aside');

// 스크롤 이벤트 추가
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        // 화면을 스크롤했을 때
        aside.classList.add('show');
    } else {
        // 화면이 최상단에 있을 때
        aside.classList.remove('show');
    }
});

const topButton = document.querySelector('#aside .a_top');

topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 상단으로 스크롤
});