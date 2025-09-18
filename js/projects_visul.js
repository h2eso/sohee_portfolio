// 메뉴 기능
// =====================================
function initMenu() {
    const tl = gsap.timeline({ paused: true });
    let path = document.querySelector('path');

    gsap.set('#hamburger', { '--burger-span-before-bgcolor': '#000' });
    gsap.set('.menu', { visibility: 'hidden' });

    // TOGGLE MENU
    function revealMenu() {
        revealMenuItems();

        const toggleBtn = document.getElementById('toggle-btn');
        const hamburger = document.getElementById('hamburger');

        if (toggleBtn && hamburger) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();

                hamburger.classList.toggle('active');
                tl.reversed(!tl.reversed());
            });
        }
    }
    revealMenu();

    function revealMenuItems() {
        const start = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
        const end = 'M0,1005S175,995,500,995s500,5,500,5V0H0Z';
        const power2 = 'power2.inOut';
        const power4 = 'power4.inOut';

        tl.to('#hamburger', {
            marginTop: '-5px',
            x: -40,
            y: 40,
            duration: 1.25,
            ease: power4,
        });

        tl.to(
            '#hamburger span',
            {
                backgroundColor: '#e2e2dc',
                duration: 1,
                ease: power2,
            },
            '<'
        );
        tl.to(
            '#hamburger',
            {
                '--burger-span-before-bgcolor': '#e2e2dc',
                duration: 1,
                ease: power2,
            },
            '<'
        );

        tl.to(
            '.btn .btn__outline',
            {
                x: -40,
                y: 40,
                width: '140px',
                height: '140px',
                border: '1px solid #e2e2dc',
                duration: 1.25,
                ease: power4,
            },
            '<'
        );

        if (path) {
            tl.to(
                path,
                {
                    attr: {
                        d: start,
                    },
                    duration: 0.8,
                    ease: 'power2.in',
                },
                '<'
            ).to(
                path,
                {
                    attr: {
                        d: end,
                    },
                    duration: 0.8,
                    ease: 'power2.out',
                },
                '-=0.5'
            );
        }

        tl.to('.menu', { visibility: 'visible', duration: 1 }, '-=0.5');

        tl.to(
            '.menu__item > a',
            {
                top: 0,
                duration: 1,
                stagger: {
                    amount: 0.5,
                },
                ease: 'power3.out',
            },
            '-=1'
        ).reverse();
    }
}

// 프로젝트 데이터
const projectData = {
    'walkon-renewal': {
        title: 'Walk On APP Renewal',
        category: 'Renewal project',
        description:
            '기존 워크온의 구조적 한계를 파악하고 유사 서비스를 리서치하여 단순한 걷기+포인트를 넘어선 새로운 목표를 설정했습니다. 스토리보드 작성, 유저 플로우 정의, 기능 우선순위 설정을 통해 UX/UI를 전면적으로 리디자인하였습니다.',
        techs: ['Figma', 'Miro', 'User Story Mapping', 'Wireframing'],
        liveUrl: '#',
        codeUrl: '#',
    },
    'nintendo-experience': {
        title: 'Nintendo Renewal',
        category: 'Interaction Design',
        description:
            '닌텐도의 게임 경험을 분석하고, 인터랙티브 UI 요소를 재해석한 프로젝트입니다. 게임 특유의 몰입감과 브랜드 아이덴티티를 웹 화면과 모바일 UX에 반영하는 과정을 진행했습니다.',
        techs: ['Figma', 'Illustrator', 'Prototyping', 'UI Animation'],
        liveUrl: '#',
        codeUrl: '#',
    },
    'casetify-renewal': {
        title: 'Casetify Website Renewal',
        category: 'E-commerce UX/UI',
        description:
            '케이스바이케이스 팀으로 케이스티파이 웹사이트를 리뉴얼했습니다. 제품 탐색 과정 단순화, 장바구니 UX 최적화, 브랜드 컬러와 톤 앤 매너를 강화하는 방향으로 UI를 개선했습니다.',
        techs: ['Figma', 'UI Components', 'Team Collaboration', 'User Testing'],
        liveUrl: '#',
        codeUrl: '#',
    },
    'soundgoods-app': {
        title: 'Sound Goods Platform',
        category: 'Music OTT + Goods Shop',
        description:
            '음악 스트리밍과 아티스트 굿즈샵 기능을 결합한 신규 서비스를 기획·디자인했습니다. 사용자 리뷰 분석을 기반으로 음악 감상 경험과 굿즈 구매 흐름을 유기적으로 연결하였습니다.',
        techs: ['Figma', 'UX Research', 'Wireframing', 'UI Prototyping'],
        liveUrl: '#',
        codeUrl: '#',
    },
    'snoopy-page': {
        title: 'Snoopy Poster Page',
        category: 'Personal UI Design',
        description:
            '스누피 애니메이션 정보를 기반으로 한 상세 포스터 페이지를 제작했습니다. 스누피 특유의 귀여운 감성과 컬러 무드를 유지하면서, 과도하지 않은 타이포그래피로 개인 브랜딩 화면을 완성했습니다.',
        techs: ['HTML', 'CSS', 'JavaScript', 'Figma'],
        liveUrl: '#',
        codeUrl: '#',
    },
    'mcdelivery-ui': {
        title: 'McDelivery UX/UI Renewal',
        category: 'Service Redesign',
        description:
            '맥딜리버리 웹·앱 화면을 리디자인하여 주문 흐름을 단순화하고 배달 상황 파악을 직관적으로 구현했습니다. 사용자 편의성과 브랜드 경험을 동시에 강화하는 방향으로 프로젝트를 진행했습니다.',
        techs: ['Figma', 'UI Flow', 'Interaction Design', 'Usability Testing'],
        liveUrl: '#',
        codeUrl: '#',
    },
};

// 모달 초기화 변수
let modalInitialized = false;

// 모달 기능
function initModal() {
    console.log('initModal 함수 실행됨');

    // 이미 초기화되었다면 return
    if (modalInitialized) {
        console.log('이미 모달이 초기화됨');
        return;
    }

    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechs = document.getElementById('modalTechs');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalCodeLink = document.getElementById('modalCodeLink');
    const modalClose = document.getElementById('modalClose');

    // 요소들이 존재하지 않으면 return
    if (!modal || !modalImage || !modalClose) {
        console.error('Modal elements not found');
        console.log('modal:', modal);
        console.log('modalImage:', modalImage);
        console.log('modalClose:', modalClose);
        return;
    }

    console.log('모달 요소들이 정상적으로 찾아짐');

    // 이미지 클릭 이벤트 등록 (multiple approaches)

    // 방법 1: .item-img 컨테이너에 이벤트 등록
    const itemImages = document.querySelectorAll('.item-img');
    console.log('찾은 .item-img 요소 개수:', itemImages.length);

    itemImages.forEach((itemImg, index) => {
        console.log(`${index + 1}번째 .item-img 요소:`, itemImg);
        console.log(`data-project:`, itemImg.dataset.project);

        // 클릭 이벤트 등록
        itemImg.addEventListener('click', handleImageClick);

        // 이미지에도 직접 이벤트 등록
        const img = itemImg.querySelector('img');
        if (img) {
            img.addEventListener('click', handleImageClick);
            img.style.cursor = 'pointer';
            console.log(`${index + 1}번째 이미지에 이벤트 등록됨`);
        }
    });

    // 방법 2: 이벤트 위임 사용
    document.addEventListener('click', (e) => {
        const clickedElement = e.target;
        const itemImg = clickedElement.closest('.item-img');

        if (itemImg && itemImg.dataset.project) {
            console.log('이벤트 위임으로 클릭 감지:', itemImg.dataset.project);
            handleImageClick(e);
        }
    });

    function handleImageClick(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('이미지 클릭됨!', e.target);

        // 클릭된 요소에서 .item-img 찾기
        const itemImg = e.target.closest('.item-img');
        if (!itemImg) {
            console.log('item-img를 찾을 수 없음');
            return;
        }

        const projectKey = itemImg.dataset.project;
        const project = projectData[projectKey];
        const img = itemImg.querySelector('img');
        const imgSrc = img ? img.src : './assets/imgs/img-1.jpg';

        console.log('프로젝트 키:', projectKey);
        console.log('프로젝트 데이터:', project);
        console.log('이미지 소스:', imgSrc);

        if (project) {
            // 모달 업데이트
            modalImage.src = imgSrc;
            modalCategory.textContent = project.category;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;

            modalTechs.innerHTML = '';
            project.techs.forEach((tech) => {
                const li = document.createElement('li');
                li.textContent = tech;
                modalTechs.appendChild(li);
            });

            modalLiveLink.href = project.liveUrl;
            modalCodeLink.href = project.codeUrl;

            openModal();
        } else {
            console.error('프로젝트 데이터를 찾을 수 없음:', projectKey);
        }
    }

    // 모달 열기
    function openModal() {
        console.log('모달 열기 시도');
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        console.log('모달 스타일:', {
            display: modal.style.display,
            classList: modal.classList.toString(),
        });

        // GSAP 애니메이션
        gsap.timeline()
            .set('.modal-image', { scale: 0.8, opacity: 0 })
            .set('.modal-info-section > *', { x: 50, opacity: 0 })
            .to('.modal-image', {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
            })
            .to(
                '.modal-info-section > *',
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: 'power2.out',
                },
                '-=0.3'
            );
    }

    // 모달 닫기
    function closeModal() {
        console.log('모달 닫기');
        gsap.timeline()
            .to('.modal-info-section > *', {
                x: 50,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
            })
            .to(
                '.modal-image',
                {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.in',
                },
                '-=0.2'
            )
            .call(() => {
                modal.style.display = 'none';
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
    }

    // 닫기 버튼 이벤트
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
        console.log('닫기 버튼 이벤트 등록됨');
    }

    // 배경 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    modalInitialized = true;
    console.log('모달 초기화 완료!');
}

// 테스트 함수 추가
function testModal() {
    console.log('모달 테스트 함수 실행');
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        console.log('테스트: 모달이 강제로 열림');
    }
}

// 전역에 테스트 함수 등록
window.testModal = testModal;

const common = () => {
    console.log('common 함수 실행됨');
};

const mainPage = () => {};
const projectsPage = () => {};
const aboutPage = () => {};

const processPage = () => {
    console.log('processPage 함수 실행됨');

    gsap.set('nav', { y: -100 });
    gsap.set('.letter-wrapper', { y: 400 });
    gsap.set('.item-copy-wrapper p', { y: 50 });

    gsap.defaults({ duration: 1, ease: 'power3.out' });
    const tl = gsap.timeline({ paused: true, delay: 0.5 });

    tl.to('.letter-wrapper', {
        y: 0,
        stagger: 0.1,
    })
        .to('.header-item-1', {
            left: '12vw',
        })
        .to(
            '.header-item-2',
            {
                right: '8vw',
            },
            '<'
        )
        .to(
            '.item-main .item-img img',
            {
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            },
            '<'
        )
        .to('.header-item-1', {
            left: 0,
            scale: 1,
        })
        .to(
            '.header-item-2',
            {
                right: 0,
                scale: 1,
            },
            '<'
        )
        .to(
            '.item-main .item-img img',
            {
                scale: 1,
            },
            '<'
        )
        .to(
            '.item-side .item-img',
            {
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                stagger: 0.1,
            },
            '<'
        )
        .to(
            '.header',
            {
                bottom: '0',
            },
            '<'
        )
        .to(
            '.item-copy-wrapper p',
            {
                y: 0,
                stagger: 0.05,
            },
            '<'
        )
        .to(
            'nav',
            {
                y: 0,
            },
            '<'
        );

    tl.play();

    // GSAP 애니메이션 완료 후 모달 초기화
    tl.call(() => {
        console.log('GSAP 애니메이션 완료, 모달 초기화 시작');
        initModal();
    });
};

// 메뉴 초기화
initMenu();

// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로드 완료');
    common();

    const currentPath = location.href;
    console.log('현재 경로:', currentPath);

    if (currentPath.includes('index.html') || /\/(index\.html)?$/.test(currentPath)) {
        mainPage();
    } else if (currentPath.includes('projects.html')) {
        projectsPage();
    } else if (currentPath.includes('about.html')) {
        aboutPage();
    } else if (currentPath.includes('projects_visul.html')) {
        processPage();
    } else {
        // 기본적으로 processPage 실행 (로컬에서 파일 직접 열 때)
        console.log('기본 페이지로 processPage 실행');
        processPage();
    }
});

// 페이지 로드 완료 후에도 한 번 더 시도
window.addEventListener('load', () => {
    console.log('페이지 완전히 로드됨');
    setTimeout(() => {
        if (!modalInitialized) {
            console.log('모달이 아직 초기화되지 않음, 다시 시도');
            initModal();
        }
    }, 2000);
});

// 클릭 이벤트 도달 시 로그확인 코드
document.addEventListener('click', (e) => {
    console.log('clicked element:', e.target);
});
