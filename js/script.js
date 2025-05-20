document.addEventListener('DOMContentLoaded', function() {
    // 使用本地图片目录中的图片
    const images = [
        'images/IMG_4366.heic',
        'images/IMG_5157.JPG',
        'images/IMG_6157.JPG',
        'images/IMG_8344.JPG',
        'images/IMG_8500.JPG',
        'images/IMG_9479.heic',
        'images/IMG_9510.heic',
        'images/TVD_3541.jpg'
    ];

    // 添加图片到背景轮播
    const slideshow = document.querySelector('.slideshow');
    images.forEach((image, index) => {
        const img = document.createElement('div');
        img.className = 'slide' + (index === 0 ? ' active' : '');
        img.style.backgroundImage = `url(${image})`;
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
        img.style.position = 'absolute';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.opacity = '0';
        img.style.transition = 'opacity 2s ease-in-out';
        slideshow.appendChild(img);
    });

    // 图片轮播逻辑
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 每5秒切换一张图片
    setInterval(nextSlide, 5000);

    // 音乐控制
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    let isPlaying = false;

    // 用户交互后播放音乐（浏览器自动播放策略）
    function initAudio() {
        if (music.paused) {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('自动播放被阻止，需要用户交互');
                });
            }
        }
    }

    // 点击页面任意处初始化音频
    document.addEventListener('click', function initAudioOnClick() {
        initAudio();
        document.removeEventListener('click', initAudioOnClick);
    }, { once: true });

    // 音乐按钮控制
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            musicBtn.textContent = '🎵 播放音乐';
        } else {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    musicBtn.textContent = '🔊 暂停音乐';
                })
                .catch(error => {
                    console.log('播放失败:', error);
                });
            }
        }
        isPlaying = !isPlaying;
    });

    // 检测音乐播放状态
    music.addEventListener('play', function() {
        isPlaying = true;
        musicBtn.textContent = '🔊 暂停音乐';
    });

    music.addEventListener('pause', function() {
        isPlaying = false;
        musicBtn.textContent = '🎵 播放音乐';
    });

    // 初始显示第一张图片
    showSlide(0);
});