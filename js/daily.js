// ES6 import 문 모두 제거 (전역 변수로 사용)

const common = () => {
    // 메뉴등 공통
};

// SplitText 대체 함수 (만약 로드되지 않을 경우 사용)
const splitTextIntoWords = (element) => {
    const text = element.textContent;
    const words = text.split(' ').filter((word) => word.trim() !== '');

    element.innerHTML = words
        .map((word) => `<span class="spotlight-word">${word}</span>`)
        .join(' ');

    return {
        words: element.querySelectorAll('.spotlight-word'),
    };
};

const mainPage = () => {
    // 전역 변수들이 로드되었는지 확인
    console.log('GSAP loaded:', typeof gsap !== 'undefined');
    console.log('ScrollTrigger loaded:', typeof ScrollTrigger !== 'undefined');
    console.log('SplitText loaded:', typeof SplitText !== 'undefined');
    console.log('Lenis loaded:', typeof Lenis !== 'undefined');

    // 필수 라이브러리들이 로드되지 않았으면 종료
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded');
        return;
    }

    if (typeof ScrollTrigger === 'undefined') {
        console.error('ScrollTrigger is not loaded');
        return;
    }

    if (typeof Lenis === 'undefined') {
        console.error('Lenis is not loaded');
        return;
    }

    // 플러그인 등록
    gsap.registerPlugin(ScrollTrigger);

    // SplitText가 있으면 등록
    if (typeof SplitText !== 'undefined') {
        gsap.registerPlugin(SplitText);
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const spotlightImages = document.querySelector('.spotlight-images');
    const maskContainer = document.querySelector('.mask-container');
    const maskImage = document.querySelector('.mask-img');
    const maskHeader = document.querySelector('.mask-container .header h1');

    // 요소들이 존재하는지 확인
    if (!spotlightImages) {
        console.warn('spotlight-images element not found');
        return;
    }

    const spotlightContainerHeight = spotlightImages.offsetHeight;
    const viewportHeight = window.innerHeight;
    const initialOffset = spotlightContainerHeight * 0.05;
    const totalMovement = spotlightContainerHeight + initialOffset + viewportHeight;

    let headerSplit = null;
    if (maskHeader) {
        if (typeof SplitText !== 'undefined') {
            try {
                headerSplit = SplitText.create(maskHeader, {
                    type: 'words',
                    wordsClass: 'spotlight-word',
                });
            } catch (error) {
                console.warn('SplitText failed, using fallback:', error);
                headerSplit = splitTextIntoWords(maskHeader);
            }
        } else {
            console.warn('SplitText not available, using fallback');
            headerSplit = splitTextIntoWords(maskHeader);
        }

        if (headerSplit && headerSplit.words) {
            gsap.set(headerSplit.words, { opacity: 0 });
        }
    }

    ScrollTrigger.create({
        trigger: '.spotlight',
        start: 'top top',
        end: `+=${window.innerHeight * 7}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;

            // 이미지 이동 애니메이션
            if (progress <= 0.5 && spotlightImages) {
                const imagesMoveProgress = progress / 0.5;
                const startY = 5;
                const endY = -(totalMovement / spotlightContainerHeight) * 100;
                const currentY = startY + (endY - startY) * imagesMoveProgress;

                gsap.set(spotlightImages, {
                    y: `${currentY}%`,
                });
            }

            // 마스크 애니메이션
            if (maskContainer && maskImage) {
                if (progress >= 0.25 && progress <= 0.75) {
                    const maskProgress = (progress - 0.25) / 0.5;
                    const maskSize = `${maskProgress * 450}%`;
                    const imageScale = 1.5 - maskProgress * 0.5;

                    maskContainer.style.setProperty('-webkit-mask-size', maskSize);
                    maskContainer.style.setProperty('mask-size', maskSize);

                    gsap.set(maskImage, {
                        scale: imageScale,
                    });
                } else if (progress < 0.25) {
                    maskContainer.style.setProperty('-webkit-mask-size', '0%');
                    maskContainer.style.setProperty('mask-size', '0%');
                    gsap.set(maskImage, {
                        scale: 1.5,
                    });
                } else if (progress > 0.75) {
                    maskContainer.style.setProperty('-webkit-mask-size', '450%');
                    maskContainer.style.setProperty('mask-size', '450%');
                    gsap.set(maskImage, {
                        scale: 1,
                    });
                }
            }

            // 텍스트 애니메이션
            if (headerSplit && headerSplit.words && headerSplit.words.length > 0) {
                if (progress >= 0.75 && progress <= 0.95) {
                    const textProgress = (progress - 0.75) / 0.2;
                    const totalWords = headerSplit.words.length;

                    headerSplit.words.forEach((word, index) => {
                        const wordRevealProgress = index / totalWords;

                        if (textProgress >= wordRevealProgress) {
                            gsap.set(word, { opacity: 1 });
                        } else {
                            gsap.set(word, { opacity: 0 });
                        }
                    });
                } else if (progress < 0.75) {
                    gsap.set(headerSplit.words, { opacity: 0 });
                } else if (progress > 0.95) {
                    gsap.set(headerSplit.words, { opacity: 1 });
                }
            }
        },
    });
};

const projectsPage = () => {};
const aboutPage = () => {};
const processPage = () => {};

// 초기화 함수
const init = () => {
    common();
    const currentPath = location.href;

    if (currentPath.includes('about.html') || /\/(index\.html)?$/.test(currentPath)) {
        mainPage();
    } else if (currentPath.includes('process.html')) {
        processPage();
    } else if (currentPath.includes('projects.html')) {
        projectsPage();
    } else if (currentPath.includes('about.html')) {
        aboutPage();
    }
};

// DOM과 모든 스크립트가 로드된 후 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(init, 100);
    });
} else {
    setTimeout(init, 100);
}

//
console.log(document.querySelector('.spotlight'));
console.log(document.querySelector('.mask-container'));
console.log(document.querySelector('.mask-img'));
console.log(document.querySelector('h1'));
