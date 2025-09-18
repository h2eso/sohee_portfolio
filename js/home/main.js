// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis";

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);


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

    // 메뉴 초기화
    initMenu();


    // 스크롤 애니메이션
    // =====================================
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const smoothStep = (p) => p * p * (3 - 2 * p);

    if (window.innerWidth > 1000) {
        // con1-1 스크롤 애니메이션
        ScrollTrigger.create({
            trigger: '.con1-1',
            start: 'top top',
            end: '75% top',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                const con1CardsContainerOpacity = gsap.utils.interpolate(
                    1,
                    0.5,
                    smoothStep(progress)
                );
                gsap.set('.con1-cards', {
                    opacity: con1CardsContainerOpacity,
                });

                ['#con1-card-1', '#con1-card-2', '#con1-card-3'].forEach((cardId, index) => {
                    const delay = index * 0.9;
                    const cardProgress = gsap.utils.clamp(
                        0,
                        1,
                        (progress - delay * 0.1) / (1 - delay * 0.1)
                    );

                    const y = gsap.utils.interpolate('0%', '350%', smoothStep(cardProgress));
                    const scale = gsap.utils.interpolate(1, 0.75, smoothStep(cardProgress));

                    let x = '0%';
                    let rotation = 0;
                    if (index === 0) {
                        x = gsap.utils.interpolate('0%', '90%', smoothStep(cardProgress));
                        rotation = gsap.utils.interpolate(0, -15, smoothStep(cardProgress));
                    } else if (index === 2) {
                        x = gsap.utils.interpolate('0%', '-90%', smoothStep(cardProgress));
                        rotation = gsap.utils.interpolate(0, 15, smoothStep(cardProgress));
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
        ScrollTrigger.create({
            trigger: '.con1',
            start: 'top top',
            end: `+=${window.innerHeight * 4}px`,
            pin: '.con1',
            pinSpacing: true,
        });

        // con1 카드 위치 조정
        ScrollTrigger.create({
            trigger: '.con1',
            start: 'top top',
            end: `+=${window.innerHeight * 4}px`,
            onLeave: () => {
                const con1Section = document.querySelector('.con1');
                if (con1Section) {
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
                gsap.set('.cards', {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                });
            },
        });

        // con1 스크롤 애니메이션
        ScrollTrigger.create({
            trigger: '.con1',
            start: 'top bottom',
            end: `+=${window.innerHeight * 4}`,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                const headerProgress = gsap.utils.clamp(0, 1, progress / 0.9);
                const headerY = gsap.utils.interpolate('400%', '0%', smoothStep(headerProgress));
                gsap.set('.con1-header', {
                    y: headerY,
                });

                ['#card-1', '#card-2', '#card-3'].forEach((cardId, index) => {
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
                        y = gsap.utils.interpolate('50%', '0%', smoothStep(normalizedProgress));
                    } else {
                        y = '0%';
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
});
