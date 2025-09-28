const tcsCarouselData = [
                {
                    img: 'Aboutus/Carousel/tejas3.jpg',
                    quote: '"Every problem is a gift, without problems we would not grow."',
                    author: '– Anthony Robbins'
                },
                {
                    img: 'Aboutus/Carousel/tejas5.jpg',
                    quote: '"I don\'t know the word \'quit.\' Either I never did, or I have abolished it."',
                    author: '– Susan Butcher'
                },
                {
                    img: 'Aboutus/Carousel/tejas4.jpg',
                    quote: '"If you want to shine like a sun, first burn like a sun."',
                    author: '– APJ Abdul Kalam'
                }
            ];

            let tcsCurrentSlide = 0;
            const tcsImgEl = document.getElementById('tcs-carousel-img');
            const tcsQuoteEl = document.getElementById('tcs-quote');
            const tcsAuthorEl = document.getElementById('tcs-author');

            function tcsUpdateSlide(index) {
                tcsImgEl.style.opacity = 0;
                tcsQuoteEl.style.opacity = 0;
                tcsAuthorEl.style.opacity = 0;
                setTimeout(() => {
                    tcsImgEl.src = tcsCarouselData[index].img;
                    tcsQuoteEl.textContent = tcsCarouselData[index].quote;
                    tcsAuthorEl.textContent = tcsCarouselData[index].author;
                    tcsImgEl.style.opacity = 1;
                    tcsQuoteEl.style.opacity = 1;
                    tcsAuthorEl.style.opacity = 1;
                }, 300);
            }

            document.getElementById('tcs-prev').addEventListener('click', () => {
                tcsCurrentSlide = (tcsCurrentSlide - 1 + tcsCarouselData.length) % tcsCarouselData.length;
                tcsUpdateSlide(tcsCurrentSlide);
            });

            document.getElementById('tcs-next').addEventListener('click', () => {
                tcsCurrentSlide = (tcsCurrentSlide + 1) % tcsCarouselData.length;
                tcsUpdateSlide(tcsCurrentSlide);
            });

            // Popup functions
            function showHistoryPopup() {
                document.querySelector('.tcs-popup-overlay').style.display = 'none';
                document.getElementById('tcs-history-popup').style.display = 'flex';
            }

            function hideHistoryPopup() {
                document.getElementById('tcs-history-popup').style.display = 'none';
            }

            function showMissionPopup() {
                document.querySelector('.tcs-popup-overlay').style.display = 'none';
                document.getElementById('tcs-mission-popup').style.display = 'flex';
            }

            function hideMissionPopup() {
                document.getElementById('tcs-mission-popup').style.display = 'none';
            }

            function showWhyChoosePopup() {
                document.querySelector('.tcs-popup-overlay').style.display = 'none';
                document.getElementById('tcs-why-choose-popup').style.display = 'flex';
            }

            function hideWhyChoosePopup() {
                document.getElementById('tcs-why-choose-popup').style.display = 'none';
            }

            function backToMainPopup() {
                document.querySelector('.tcs-popup-overlay').style.display = 'flex';
                document.getElementById('tcs-history-popup').style.display = 'none';
                document.getElementById('tcs-mission-popup').style.display = 'none';
                document.getElementById('tcs-why-choose-popup').style.display = 'none';
            }