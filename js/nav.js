// nav.js
document.addEventListener('DOMContentLoaded', function () {
    // 네비게이션 클릭 시 해당 섹션으로 스크롤
    document.querySelectorAll('.nav-item').forEach((item) => {
        item.addEventListener('click', function () {
            const text = this.querySelector('p').textContent.toLowerCase();
            let targetSection;

            // 텍스트에 따라 해당 섹션 찾기
            switch (text) {
                case 'keywords':
                    // con1의 예상 위치로 직접 스크롤 (con1이 나타나는 위치를 알고 있다면)
                    const con1Position = 4500; // con1이 나타나는 대략적인 scrollY 위치
                    window.scrollTo({
                        top: con1Position - 80,
                        behavior: 'smooth',
                    });
                    break;
                case 'experience':
                    targetSection =
                        document.querySelector('.con2') ||
                        document.querySelector('#con2') ||
                        document.querySelector('.spotlight') ||
                        document.querySelector('section.con2') ||
                        document.querySelector('section.spotlight');
                    break;
                case 'profile':
                    targetSection = document.querySelector('.profile');
                    // 프로필은 찾은 후에 바로 스크롤 (20px 추가)
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80 + 60,
                            behavior: 'smooth',
                        });
                        return; // 아래 공통 스크롤 코드 실행 안되도록
                    }
                    break;
                case 'main-project':
                    targetSection = document.querySelector('.con3');
                    break;
                case 'sami-project':
                    targetSection = document.querySelector('.con4');
                    break;
                case 'hobby':
                    targetSection = document.querySelector('.con5');
                    break;
            }

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth',
                });
            }
        });
    });

    // 스크롤 시 현재 섹션에 맞는 네비게이션 활성화
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 현재 보이는 섹션에 따라 네비게이션 활성화
        const sections = [
            { element: document.querySelector('.con1'), navText: 'keywords' },
            { element: document.querySelector('.con2'), navText: 'experience' },
            { element: document.querySelector('.profile'), navText: 'profile' },
            { element: document.querySelector('.con3'), navText: 'main-project' },
            { element: document.querySelector('.con4'), navText: 'sami-project' },
            { element: document.querySelector('.con5'), navText: 'hobby' },
        ];

        const navItems = document.querySelectorAll('.nav-item');
        let currentSection = '';

        sections.forEach((section) => {
            if (section.element) {
                const sectionTop = section.element.offsetTop - 100;
                const sectionHeight = section.element.clientHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.navText;
                }
            }
        });

        navItems.forEach((item) => {
            item.classList.remove('active');
            const itemText = item.querySelector('p').textContent.toLowerCase();
            if (itemText === currentSection) {
                item.classList.add('active');
            }
        });
    });

    // 로고 클릭 시 상단으로 스크롤
    document.querySelector('.site-logo').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
});