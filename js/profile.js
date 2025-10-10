const images = [
    './assets/imgs/main_img/리스본2.jpg',
    './assets/imgs/main_img/파리1.jpg',
    './assets/imgs/main_img/파리 루브르3.jpg',
];

let index = 0;

window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.profile-img'); // 클래스 이름 수정
    const img1 = document.getElementById('profileImage');

    // 요소 존재 확인
    if (!container || !img1) {
        console.error('필요한 요소를 찾을 수 없습니다.');
        return;
    }

    // 이미지 2개 겹쳐서 사용
    const img2 = document.createElement('img');
    img2.classList.add('profile-img-overlay');
    container.appendChild(img2);

    setInterval(() => {
        const nextIndex = (index + 1) % images.length;

        // 새 이미지 로드
        img2.src = images[nextIndex];

        // 페이드 전환
        img2.style.opacity = '1';

        setTimeout(() => {
            img1.src = images[nextIndex];
            img2.style.opacity = '0';
            index = nextIndex;
        }, 1000);
    }, 3000);
});
