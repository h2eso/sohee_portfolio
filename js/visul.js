const common = () => {
    // 메뉴등 공통
};

const mainPage = () => {};

const projectsPage = () => {};
const aboutPage = () => {};

// Process 페이지 애니메이션
const processPage = () => {
    console.log('Process page starting...');

    // 필수 라이브러리 체크
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded');
        return;
    }

    if (typeof CustomEase === 'undefined') {
        console.error('CustomEase is not loaded');
        return;
    }

    if (typeof Flip === 'undefined') {
        console.error('Flip is not loaded');
        return;
    }

    if (typeof SplitType === 'undefined') {
        console.error('SplitType is not loaded');
        return;
    }

    // 필수 요소들 체크
    const revealer1 = document.querySelector('.r-1');
    const revealer2 = document.querySelector('.r-2');
    const siteInfoH2 = document.querySelector('.site-info h2');

    if (!revealer1 || !revealer2) {
        console.error('Revealer elements not found');
        return;
    }

    console.log('All requirements met, starting animations...');
    console.log('Revealer 1:', revealer1);
    console.log('Revealer 2:', revealer2);

    // CustomEase 등록
    gsap.registerPlugin(CustomEase, Flip);

    CustomEase.create('hop', 'M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1 ');
    CustomEase.create('hop2', 'M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1 ');

    // SplitType 처리
    let splitH2 = null;
    if (siteInfoH2) {
        try {
            splitH2 = new SplitType('.site-info h2', {
                types: 'lines',
            });

            splitH2.lines.forEach((line) => {
                const text = line.textContent;
                const wrapper = document.createElement('div');
                wrapper.className = 'line';
                const span = document.createElement('span');
                span.textContent = text;
                wrapper.appendChild(span);
                line.parentNode.replaceChild(wrapper, line);
            });

            console.log('SplitType applied successfully');
        } catch (error) {
            console.error('SplitType failed:', error);
        }
    }

    // 타임라인 생성
    const mainTl = gsap.timeline();
    const revealerTl = gsap.timeline();
    const scaleTl = gsap.timeline();

    // Revealer 애니메이션 - 위에서 아래로 사라지도록 수정
    revealerTl
        .to('.r-1', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 1.5,
            ease: 'hop',
            onStart: () => {
                console.log('R1 animation started');
                console.log('R1 initial clip-path:', getComputedStyle(revealer1).clipPath);
            },
            onComplete: () => console.log('R1 animation completed'),
        })
        .to(
            '.r-2',
            {
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                duration: 1.5,
                ease: 'hop',
                onStart: () => {
                    console.log('R2 animation started');
                    console.log('R2 initial clip-path:', getComputedStyle(revealer2).clipPath);
                },
                onComplete: () => console.log('R2 animation completed'),
            },
            '<'
        );

    // 이미지 스케일 애니메이션 - v-img와 img 구분해서 처리
    // 첫 번째 이미지 (v-img:first-child 또는 .img:first-child)
    const firstVImg = document.querySelector('.v-img:first-child');
    const firstImg = document.querySelector('.img:first-child');

    if (firstVImg) {
        scaleTl.to('.v-img:first-child', {
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: 'power4.inOut',
            onStart: () => console.log('First v-img scale started'),
        });
    } else if (firstImg) {
        scaleTl.to('.img:first-child', {
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: 'power4.inOut',
            onStart: () => console.log('First img scale started'),
        });
    }

    // 나머지 v-img들
    const vImages = document.querySelectorAll('.v-img:not(:first-child)');
    console.log('Found v-images:', vImages.length);

    vImages.forEach((img, index) => {
        scaleTl.to(
            img,
            {
                opacity: 1,
                scale: 1,
                duration: 1.25,
                ease: 'power3.out',
            },
            '>-0.95'
        );
    });

    // 메인 타임라인 구성
    mainTl
        .add(revealerTl)
        .add(scaleTl, '-=1.25')
        .add(() => {
            console.log('Starting Flip animation...');

            // v-img들 제거, main 이미지들만 남기기
            document.querySelectorAll('.v-img').forEach((img) => {
                console.log('Removing v-img:', img);
                img.remove();
            });

            const mainImages = document.querySelectorAll('.main');
            console.log('Main images found:', mainImages.length);

            if (mainImages.length === 0) {
                console.warn('No main images found for Flip animation');
                return;
            }

            const state = Flip.getState('.main');

            const imagesContainer = document.querySelector('.images');
            if (imagesContainer) {
                imagesContainer.classList.add('stacked-container');

                document.querySelectorAll('.main').forEach((img, i) => {
                    img.classList.add('stacked');
                    img.style.order = i;
                    gsap.set('.img.stacked', {
                        clearProps: 'transform,top,left',
                    });
                });

                return Flip.from(state, {
                    duration: 2,
                    ease: 'hop',
                    absolute: true,
                    stagger: {
                        amount: -0.3,
                    },
                    onComplete: () => console.log('Flip animation completed'),
                });
            }
        })
        .to('.word h1, .nav-item p, .line p, .site-info h2 .line span', {
            y: 0,
            duration: 3,
            ease: 'hop2',
            stagger: 0.1,
            delay: 1.25,
            onStart: () => console.log('Text animations started'),
        })
        .to('.team-img', {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            duration: 2,
            ease: 'hop',
            delay: -4.75,
            onStart: () => console.log('Team image animation started'),
        });

    console.log('Process page animations initialized successfully');
};

// 즉시 실행 함수
(() => {
    console.log('Visual.js loaded, checking current path...');

    common();
    const currentPath = location.href;
    console.log('Current path:', currentPath);

    if (currentPath.includes('index.html') || /\/(index\.html)?$/.test(currentPath)) {
        mainPage();
    } else if (currentPath.includes('process.html')) {
        console.log('Process page detected, initializing...');
        // DOM이 완전히 로드된 후 실행
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', processPage);
        } else {
            processPage();
        }
    } else if (currentPath.includes('projects.html')) {
        projectsPage();
    } else if (currentPath.includes('about.html')) {
        aboutPage();
    }
})();



//확인 코드 

// revealer 디버깅 전용 코드
const debugRevealer = () => {
    console.log('=== REVEALER DEBUG START ===');

    // DOM 요소 확인
    const revealer1 = document.querySelector('.r-1');
    const revealer2 = document.querySelector('.r-2');
    const revealersContainer = document.querySelector('.revealers');

    console.log('Revealer container:', revealersContainer);
    console.log('Revealer 1:', revealer1);
    console.log('Revealer 2:', revealer2);

    if (!revealer1 || !revealer2) {
        console.error('❌ Revealer elements not found!');
        return;
    }

    // CSS 초기 상태 확인
    console.log('R1 computed styles:', {
        clipPath: getComputedStyle(revealer1).clipPath,
        background: getComputedStyle(revealer1).backgroundColor,
        width: getComputedStyle(revealer1).width,
        height: getComputedStyle(revealer1).height,
        zIndex: getComputedStyle(revealer1).zIndex,
        position: getComputedStyle(revealer1).position,
    });

    console.log('R2 computed styles:', {
        clipPath: getComputedStyle(revealer2).clipPath,
        background: getComputedStyle(revealer2).backgroundColor,
        width: getComputedStyle(revealer2).width,
        height: getComputedStyle(revealer2).height,
    });

    // GSAP 확인
    if (typeof gsap === 'undefined') {
        console.error('❌ GSAP not loaded!');
        return;
    }

    // CustomEase 확인
    if (typeof CustomEase === 'undefined') {
        console.error('❌ CustomEase not loaded!');
        // 기본 easing으로 테스트
        console.log('Using default easing instead');
    } else {
        gsap.registerPlugin(CustomEase);
        CustomEase.create('hop', 'M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1');
        console.log('✅ CustomEase registered');
    }

    console.log('✅ Starting revealer animation test...');

    // 간단한 테스트 애니메이션
    const testTl = gsap.timeline({
        onStart: () => console.log('🎬 Timeline started'),
        onComplete: () => console.log('✅ Timeline completed'),
    });

    const easeToUse = typeof CustomEase !== 'undefined' ? 'hop' : 'power2.inOut';

    testTl
        .to('.r-1', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 2,
            ease: easeToUse,
            onStart: () => {
                console.log('🎬 R1 animation started');
                console.log('R1 starting clip-path:', getComputedStyle(revealer1).clipPath);
            },
            onUpdate: function () {
                // 애니메이션 진행률 확인
                console.log('R1 progress:', this.progress());
            },
            onComplete: () => {
                console.log('✅ R1 animation completed');
                console.log('R1 final clip-path:', getComputedStyle(revealer1).clipPath);
            },
        })
        .to(
            '.r-2',
            {
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                duration: 2,
                ease: easeToUse,
                onStart: () => {
                    console.log('🎬 R2 animation started');
                    console.log('R2 starting clip-path:', getComputedStyle(revealer2).clipPath);
                },
                onUpdate: function () {
                    console.log('R2 progress:', this.progress());
                },
                onComplete: () => {
                    console.log('✅ R2 animation completed');
                    console.log('R2 final clip-path:', getComputedStyle(revealer2).clipPath);
                },
            },
            '<'
        ); // 동시 시작

    console.log('=== REVEALER DEBUG END ===');
};

// 수동 테스트용 함수
const manualRevealerTest = () => {
    console.log('Manual revealer test starting...');

    // CSS로 직접 설정해보기
    const r1 = document.querySelector('.r-1');
    const r2 = document.querySelector('.r-2');

    if (!r1 || !r2) {
        console.error('Elements not found for manual test');
        return;
    }

    // 초기 상태 강제 설정
    r1.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    r2.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

    console.log('Initial state set. Starting animation in 2 seconds...');

    setTimeout(() => {
        // 2초 후 애니메이션 시작
        r1.style.transition = 'clip-path 2s ease-out';
        r2.style.transition = 'clip-path 2s ease-out';

        r1.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
        r2.style.clipPath = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';

        console.log('CSS transition started');
    }, 2000);
};

// DOM이 로드되면 즉시 디버깅 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(debugRevealer, 500);

        // 수동 테스트를 원하면 이 줄의 주석을 해제하세요
        // setTimeout(manualRevealerTest, 3000);
    });
} else {
    setTimeout(debugRevealer, 500);

    // 수동 테스트를 원하면 이 줄의 주석을 해제하세요
    // setTimeout(manualRevealerTest, 3000);
}

console.log('Revealer debug script loaded');
