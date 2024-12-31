// 검색창 열기/닫기 토글
function toggleSearchInfo() {
    const header = document.querySelector('#header'); // 헤더 선택
    const searchInfo = document.querySelector('.search-info'); // 검색창 선택

    // 현재 검색창 상태 확인 후 토글
    if (header.classList.contains('searchopen')) {
        closeSearchInfo(); // 검색창 닫기
    } else {
        openSearchInfo(); // 검색창 열기
    }
}

// 검색창 열기
function openSearchInfo() {
    const header = document.querySelector('#header'); // 헤더 선택
    const searchInfo = document.querySelector('.search-info'); // 검색창 선택

    header.classList.add('searchopen'); // 헤더에 searchopen 클래스 추가
    searchInfo.classList.add('visible'); // 검색창 표시
}

// 검색창 닫기
function closeSearchInfo() {
    const header = document.querySelector('#header'); // 헤더 선택
    const searchInfo = document.querySelector('.search-info'); // 검색창 선택

    header.classList.remove('searchopen'); // searchopen 클래스 제거
    searchInfo.classList.remove('visible'); // 검색창 숨기기
}

// DOMContentLoaded로 이벤트 설정
document.addEventListener('DOMContentLoaded', function () {
    // 검색창 내부 클릭 이벤트 중단
    const searchBarForm = document.querySelector('#search-bar-form');
    searchBarForm.addEventListener('click', function (event) {
        event.stopPropagation(); // 부모 요소로 이벤트 전파 중단
    });

    // 배경 클릭 시 검색창 닫기
    const searchInfo = document.querySelector('.search-info');
    searchInfo.addEventListener('click', closeSearchInfo);
});
