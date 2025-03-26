// Таймер до важной даты
function updateTimer() {
    const targetDate = new Date('2025-08-08');
    const now = new Date();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Добавляем ведущие нули
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Добавляем анимацию при изменении значений
    if (seconds === 0) {
        document.getElementById('minutes').classList.add('changed');
        setTimeout(() => {
            document.getElementById('minutes').classList.remove('changed');
        }, 500);
    }
    if (minutes === 0 && seconds === 0) {
        document.getElementById('hours').classList.add('changed');
        setTimeout(() => {
            document.getElementById('hours').classList.remove('changed');
        }, 500);
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
        document.getElementById('days').classList.add('changed');
        setTimeout(() => {
            document.getElementById('days').classList.remove('changed');
        }, 500);
    }
}

setInterval(updateTimer, 1000);
updateTimer();

// Функция для создания сердечка
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(heart);

    // Удаляем сердечко после завершения анимации
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Обработчик для кнопки "Отправить поцелуй"
document.querySelector('.kiss-button').addEventListener('click', () => {
    // Создаем несколько сердечек
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 100);
    }
});

// Анимация снежинок
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄';
    snowflake.style.position = 'absolute';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 20 + 10 + 'px';
    document.querySelector('.snowflakes-container').appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

setInterval(createSnowflake, 300);

// Система комментариев
const commentInput = document.getElementById('comment-input');
const sendCommentBtn = document.getElementById('send-comment');
const commentsContainer = document.getElementById('comments-container');

// Загрузка комментариев при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadComments();
});

// Функция для загрузки комментариев из localStorage
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('loveComments') || '[]');
    commentsContainer.innerHTML = ''; // Очищаем контейнер
    
    comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsContainer.appendChild(commentElement);
    });
}

// Функция для создания элемента комментария
function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <p>${comment.text}</p>
        <small>${comment.date}</small>
        <button class="delete-comment" data-id="${comment.id}">❌</button>
    `;
    return commentDiv;
}

// Обработчик отправки комментария
sendCommentBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText) {
        const comment = {
            id: Date.now(), // Уникальный ID для комментария
            text: commentText,
            date: new Date().toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        // Получаем существующие комментарии
        const comments = JSON.parse(localStorage.getItem('loveComments') || '[]');
        
        // Добавляем новый комментарий в начало массива
        comments.unshift(comment);
        
        // Сохраняем обновленный массив комментариев
        localStorage.setItem('loveComments', JSON.stringify(comments));
        
        // Очищаем поле ввода
        commentInput.value = '';
        
        // Перезагружаем комментарии
        loadComments();
    }
});

// Обработчик удаления комментария
commentsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-comment')) {
        const commentId = parseInt(e.target.dataset.id);
        const comments = JSON.parse(localStorage.getItem('loveComments') || '[]');
        
        // Удаляем комментарий по ID
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        
        // Сохраняем обновленный массив
        localStorage.setItem('loveComments', JSON.stringify(updatedComments));
        
        // Перезагружаем комментарии
        loadComments();
    }
});

// Автоматическое воспроизведение музыки
const audio = document.getElementById('love-song');
audio.volume = 0.5; // Установка начальной громкости

// Добавляем обработчик для автоматического воспроизведения
document.addEventListener('DOMContentLoaded', () => {
    // Пробуем воспроизвести музыку
    const playPromise = audio.play();
    
    // Обрабатываем возможные ошибки автовоспроизведения
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Музыка успешно запущена');
        }).catch(error => {
            console.log('Автовоспроизведение заблокировано браузером');
            // Добавляем кнопку для ручного запуска музыки
            const playButton = document.createElement('button');
            playButton.className = 'play-music-button';
            playButton.innerHTML = '🎵 Включить музыку';
            playButton.onclick = () => {
                audio.play();
                playButton.remove();
            };
            document.body.appendChild(playButton);
        });
    }
});

// Добавляем стили для комментариев
const style = document.createElement('style');
style.textContent = `
    .comment {
        background: white;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .comment small {
        color: #666;
        display: block;
        margin-top: 0.5rem;
    }
`;
document.head.appendChild(style);

// Инициализация Swiper для всех блоков Hero
const heroSwipers = document.querySelectorAll('.hero-swiper').forEach(swiper => {
    new Swiper(swiper, {
        effect: 'fade',
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: swiper.querySelector('.swiper-pagination'),
            clickable: true,
        },
        navigation: {
            nextEl: swiper.querySelector('.swiper-button-next'),
            prevEl: swiper.querySelector('.swiper-button-prev'),
        },
    });
});

const gallerySwiper = new Swiper('.gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});

// Управление лоадером
// document.addEventListener('DOMContentLoaded', () => {
//     // Создаем промис для загрузки всех изображений
//     const imagePromises = Array.from(document.images).map(img => {
//         if (img.complete) return Promise.resolve();
//         return new Promise(resolve => {
//             img.onload = resolve;
//             img.onerror = resolve;
//         });
//     });

//     // Ждем загрузки всех изображений и аудио
//     Promise.all([
//         ...imagePromises,
//         new Promise(resolve => {
//             const audio = document.getElementById('love-song');
//             if (audio.readyState >= 3) {
//                 resolve();
//             } else {
//                 audio.addEventListener('canplaythrough', resolve);
//             }
//         })
//     ]).then(() => {
//         // Добавляем небольшую задержку для плавности
//         setTimeout(() => {
//             const loader = document.querySelector('.loader-wrapper');
//             loader.classList.add('fade-out');
            
//             // Удаляем лоадер после завершения анимации
//             setTimeout(() => {
//                 loader.remove();
//             }, 500);
//         }, 1000);
//     });
// }); 
