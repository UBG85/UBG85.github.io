let count = 0;
        const cookieTypes = [
            'chocolate cookie',
            'vanilla cookie',
            'blueberry cookie',
            'strawberry cookie',
            'oatmeal cookie',
            'raspberry cookie',
            'cinnamon cookie'
        ];

        function clickCookie() {
            count++;
            document.getElementById('cookieCounter').innerText = 'Cookies collected: ' + count;
            createParticleAnimation();
            showCookieToast();
        }

        function createParticleAnimation() {
            const numberOfParticles = 15;
            for (let i = 0; i < numberOfParticles; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                const {x, y} = getRandomPosition();
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                particle.style.backgroundColor = color;

                document.body.appendChild(particle);
                setTimeout(() => { particle.remove(); }, 1500);
            }
        }

        function getRandomPosition() {
            const container = document.querySelector('.container');
            const containerRect = container.getBoundingClientRect();
            
            let x, y;
            do {
                x = Math.random() * window.innerWidth;
                y = Math.random() * window.innerHeight;
            } while (x > containerRect.left && x < containerRect.right && 
                     y > containerRect.top && y < containerRect.bottom);

            return {x, y};
        }

        function showCookieToast() {
            const toast = document.createElement('div');
            toast.classList.add('toast');
            const randomCookieType = cookieTypes[Math.floor(Math.random() * cookieTypes.length)];
            toast.innerText = `You collected a ${randomCookieType}!`;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('visible');
            }, 100);

            setTimeout(() => {
                toast.classList.remove('visible');
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        }
