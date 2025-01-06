document.addEventListener('scroll', function () {
    const aside = document.getElementById('aside');
    if (window.scrollY > 0) { // 스크롤 위치가 0보다 크면
        aside.classList.add('on'); // 'on' 클래스 추가
    } else {
        aside.classList.remove('on'); // 'on' 클래스 제거
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const topButton = document.querySelector('#aside .a-top');

    topButton.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 동작 방지 
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드럽게 스크롤
        });
    });
});

privacy-policy
terms-of-use