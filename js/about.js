import { items } from '../api/photoData.js';

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ========================
    // 공통 기능
    // ========================
    function common() {
        // 메뉴 기능
        const tl = gsap.timeline({ paused: true });
        let path = document.querySelector('path');

        gsap.set('#hamburger', { '--burger-span-before-bgcolor': '#000' });
        gsap.set('.menu', { visibility: 'hidden' });

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
                { backgroundColor: '#e2e2dc', duration: 1, ease: power2 },
                '<'
            );
            tl.to(
                '#hamburger',
                { '--burger-span-before-bgcolor': '#e2e2dc', duration: 1, ease: power2 },
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
                tl.to(path, { attr: { d: start }, duration: 0.8, ease: 'power2.in' }, '<').to(
                    path,
                    { attr: { d: end }, duration: 0.8, ease: 'power2.out' },
                    '-=0.5'
                );
            }

            tl.to('.menu', { visibility: 'visible', duration: 1 }, '-=0.5');

            tl.to(
                '.menu__item > a',
                {
                    top: 0,
                    duration: 1,
                    stagger: { amount: 0.5 },
                    ease: 'power3.out',
                },
                '-=1'
            ).reverse();
        }
    }

    // ========================
    // 페이지별 기능
    // ========================
    const Page = {
        main() {
            const gallery = document.querySelector('.con3 .gallery');
            if (!gallery) return;

            const itemPositions = [
                { top: '-5%', left: '5%' },
                { top: '40%', left: '-5%' },
                { top: '25%', left: '20%' },
                { top: '60%', left: '40%' },
                { top: '70%', left: '10%' },
                { top: '-10%', left: '65%' },
                { top: '10%', left: '85%' },
                { top: '40%', left: '60%' },
                { top: '80%', left: '70%' },
                { top: '50%', left: '95%' },
            ];

            console.log('photo items length:', items?.length);

            items.forEach((itemData, index) => {
                const item = document.createElement('div');
                item.classList.add('item');

                const position = itemPositions[index] || { top: '50%', left: '50%' };
                item.style.top = position.top;
                item.style.left = position.left;

                const img = document.createElement('img');
                img.src = itemData.img;
                img.alt = itemData.title || `photo-${index}`;
                item.appendChild(img);

                const link = document.createElement('div');
                link.classList.add('link');
                const href = itemData.link || '#';
                const icon = itemData.icon || '';
                link.innerHTML = `<a href="${href}" target="_blank" rel="noopener noreferrer">${icon}</a>`;
                item.appendChild(link);

                gallery.appendChild(item);
            });

            document.addEventListener('mousemove', (e) => {
                const nodes = gallery.querySelectorAll('.item');
                nodes.forEach((itemEl, idx) => {
                    const animationFactor =
                        items[idx]?.parallaxSpeed ?? items[idx]?.parllaxSpeed ?? 0.02;

                    const deltaX = (e.clientX - window.innerWidth / 2) * animationFactor;
                    const deltaY = (e.clientY - window.innerHeight / 2) * animationFactor;

                    gsap.to(itemEl, { x: deltaX, y: deltaY, duration: 0.75 });
                });
            });
        },
        idex() {
            // 메인 페이지
        },

        projects() {
            // 프로젝트 페이지
        },

        about() {
            this.main(); // about에도 갤러리 필요하면 실행
        },
    };

    // 실행 분기
    // ========================
    (() => {
        common();
        const path = location.pathname;

        if (path.includes('index.html')) {
            Page.main();
        } else if (path.includes('projects.html')) {
            Page.projects();
        } else if (path.includes('about.html')) {
            Page.about();
        } else if (path.includes('process.html')) {
            Page.process();
        }
    })();
});
