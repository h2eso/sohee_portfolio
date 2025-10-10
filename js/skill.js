document.addEventListener('DOMContentLoaded', function() {
    // GSAP와 ScrollTrigger가 로드되었는지 확인
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        const eles = [...gsap.utils.toArray('.text-box p')];

        eles.forEach((el) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: '100% 100%',
                    end: '100% 100%',
                    scrub: 1,
                },
            }).fromTo(
                el,
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, ease: 'none', duration: 5 },
                0
            );
        });
    }
});