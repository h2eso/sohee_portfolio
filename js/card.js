document.addEventListener('DOMContentLoaded', () => {
    // GSAP 및 필요한 라이브러리들이 로드되었는지 확인
    if (typeof gsap === 'undefined') {
        console.error('GSAP library not loaded');
        return;
    }
    
    if (typeof ScrollTrigger === 'undefined') {
        console.error('ScrollTrigger plugin not loaded');
        return;
    }

    if (typeof Lenis === 'undefined') {
        console.error('Lenis library not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 스무스 스텝 함수 정의
    const smoothStep = (p) => p * p * (3 - 2 * p);

    // 스크롤 애니메이션 설정
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    // 데스크톱에서만 실행 (화면 너비가 1000px 이상일 때)
    if (window.innerWidth > 1000) {
        
        // con1-1 스크롤 애니메이션
        ScrollTrigger.create({
            trigger: '.con1-1',
            start: 'top top',
            end: '75% top',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // con1-cards 컨테이너 투명도 조정
                const con1CardsContainer = document.querySelector('.con1-cards');
                if (con1CardsContainer) {
                    const con1CardsContainerOpacity = gsap.utils.interpolate(1, 0.5, smoothStep(progress));
                    gsap.set('.con1-cards', {
                        opacity: con1CardsContainerOpacity,
                    });
                }

                // 각 카드 애니메이션
                ['#con1-card-1', '#con1-card-2', '#con1-card-3'].forEach((cardId, index) => {
                    const cardElement = document.querySelector(cardId);
                    if (!cardElement) return;

                    const delay = index * 0.9;
                    const cardProgress = gsap.utils.clamp(
                        0,
                        1,
                        (progress - delay * 0.1) / (1 - delay * 0.1)
                    );

                    // Y축 이동 및 스케일 조정
                    const y = gsap.utils.interpolate('0%', '350%', smoothStep(cardProgress));
                    const scale = gsap.utils.interpolate(1, 0.75, smoothStep(cardProgress));

                    let x = '0%';
                    let rotation = 0;
                    
                    // X축 이동 최소화 (기존 코드보다 줄임)
                    if (index === 0) {
                        x = gsap.utils.interpolate('0%', '30%', smoothStep(cardProgress));
                        rotation = gsap.utils.interpolate(0, -5, smoothStep(cardProgress));
                    } else if (index === 2) {
                        x = gsap.utils.interpolate('0%', '-30%', smoothStep(cardProgress));
                        rotation = gsap.utils.interpolate(0, 5, smoothStep(cardProgress));
                    }

                    gsap.set(cardId, {
                        y: y,
                        x: x,
                        rotation: rotation,
                        scale: scale,
                    });
                });
            },
        });

        // con1 핀 설정
        const con1Element = document.querySelector('.con1');
        if (con1Element) {
            ScrollTrigger.create({
                trigger: '.con1',
                start: 'top top',
                end: `+=${window.innerHeight * 4}px`,
                pin: '.con1',
                pinSpacing: true,
            });
        }

        // con1 카드 위치 조정
        ScrollTrigger.create({
            trigger: '.con1',
            start: 'top top',
            end: `+=${window.innerHeight * 4}px`,
            onLeave: () => {
                const con1Section = document.querySelector('.con1');
                const cardsElement = document.querySelector('.cards');
                if (con1Section && cardsElement) {
                    const con1Rect = con1Section.getBoundingClientRect();
                    const con1Top = window.pageYOffset + con1Rect.top;

                    gsap.set('.cards', {
                        position: 'absolute',
                        top: con1Top,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                    });
                }
            },
            onEnterBack: () => {
                const cardsElement = document.querySelector('.cards');
                if (cardsElement) {
                    gsap.set('.cards', {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                    });
                }
            },
        });

        // con1 메인 스크롤 애니메이션
        ScrollTrigger.create({
            trigger: '.con1',
            start: 'top bottom',
            end: `+=${window.innerHeight * 4}`,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                // 헤더 애니메이션
                const headerElement = document.querySelector('.con1-header');
                if (headerElement) {
                    const headerProgress = gsap.utils.clamp(0, 1, progress / 0.9);
                    const headerY = gsap.utils.interpolate('400%', '0%', smoothStep(headerProgress));
                    gsap.set('.con1-header', {
                        y: headerY,
                    });
                }

                // 각 카드 애니메이션
                ['#card-1', '#card-2', '#card-3'].forEach((cardId, index) => {
                    const cardElement = document.querySelector(cardId);
                    if (!cardElement) return;

                    const delay = index * 0.5;
                    const cardProgress = gsap.utils.clamp(
                        0,
                        1,
                        (progress - delay * 0.1) / (0.9 - delay * 0.1)
                    );

                    const innerCard = document.querySelector(`${cardId} .flip-card-inner`);

                    let y;
                    if (cardProgress < 0.4) {
                        const normalizedProgress = cardProgress / 0.4;
                        y = gsap.utils.interpolate('-100%', '50%', smoothStep(normalizedProgress));
                    } else if (cardProgress < 0.6) {
                        const normalizedProgress = (cardProgress - 0.4) / 0.2;
                        y = gsap.utils.interpolate('50%', '20%', smoothStep(normalizedProgress));
                    } else {
                        y = '20%';
                    }

                    let scale;
                    if (cardProgress < 0.4) {
                        const normalizedProgress = cardProgress / 0.4;
                        scale = gsap.utils.interpolate(0.25, 0.75, smoothStep(normalizedProgress));
                    } else if (cardProgress < 0.6) {
                        const normalizedProgress = (cardProgress - 0.4) / 0.2;
                        scale = gsap.utils.interpolate(0.75, 1, smoothStep(normalizedProgress));
                    } else {
                        scale = 1;
                    }

                    let opacity;
                    if (cardProgress < 0.2) {
                        const normalizedProgress = cardProgress / 0.2;
                        opacity = smoothStep(normalizedProgress);
                    } else {
                        opacity = 1;
                    }

                    let x, rotate, rotationY;
                    if (cardProgress < 0.6) {
                        x = index === 0 ? '100%' : index === 1 ? '0%' : '-100%';
                        rotate = index === 0 ? -5 : index === 1 ? 0 : 5;
                        rotationY = 0;
                    } else if (cardProgress < 1) {
                        const normalizedProgress = (cardProgress - 0.6) / 0.4;
                        x = gsap.utils.interpolate(
                            index === 0 ? '100%' : index === 1 ? '0%' : '-100%',
                            '0%',
                            smoothStep(normalizedProgress)
                        );
                        rotate = gsap.utils.interpolate(
                            index === 0 ? -5 : index === 1 ? 0 : 5,
                            0,
                            smoothStep(normalizedProgress)
                        );
                        rotationY = smoothStep(normalizedProgress) * 180;
                    } else {
                        x = '0%';
                        rotate = 0;
                        rotationY = 180;
                    }

                    gsap.set(cardId, {
                        opacity: opacity,
                        y: y,
                        x: x,
                        rotate: rotate,
                        scale: scale,
                    });

                    if (innerCard) {
                        gsap.set(innerCard, {
                            rotationY: rotationY,
                        });
                    }
                });
            },
        });
    }

    // 리사이즈 이벤트 처리
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});