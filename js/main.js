$(function(){
    const $mainPlayer = $('#mainPlayer');
    const $popup = $('.popup');
    const $popupTxt = $popup.find('.txt');
    const $videoFigure = $popup.find('.popvid figure');
    const $thumbnailsDefault = $('.thumbnails');
    const $thumbnailsPortfolio = $('.thumbnails2');
    const $aboutMeSection = $('.about-me');
    let isAboutMeInVideoArea = false;
    const $moveMenuLot = $('.barcord, .classified, .midprofile p, .profile-photo1, .profile-photo2');
    const $startDiv = $('.start');
    const $sdoorDiv = $('.sdoor');
    const $sdoorVideo = $sdoorDiv.find('video').get(0);
    const $doorplayDiv = $('.doorplay');
    const $doorplayVideo = $doorplayDiv.find('video').get(0);
    const $sclickButton = $('.sclick');
    const $wrapDiv = $('.wrap');
    const $mainBgDiv = $('.mainbg');


    $thumbnailsDefault.hide();
    $thumbnailsPortfolio.hide();
    $aboutMeSection.removeClass('active about-me-in-video').hide(); 
    $wrapDiv.removeClass('on').hide();

    $sclickButton.click(function() {
        $(this).fadeOut(500);
        $('.start').addClass('starttostart');
        if ($sdoorVideo) { $sdoorVideo.muted = true; }
        $sdoorDiv.fadeOut(1, function() {
            $doorplayDiv.show();
            if ($doorplayVideo) {
                $doorplayVideo.muted = false;
                $doorplayVideo.currentTime = 0;
                $doorplayVideo.play();
                setTimeout(function() {
                    if ($doorplayVideo && $doorplayVideo.readyState >= 3) {
                        $doorplayVideo.pause();
                    }
                    $startDiv.fadeOut(1000, function() {
                        $(this).addClass('off').hide();
                        $wrapDiv.addClass('on').show();
                        $('html, body').css('overflow', 'auto');
                        $mainBgDiv.animate({ opacity: 1 }, 2000);
                    });
                }, 3000);
            } else {
           
            }
        });
    });

    $('header nav ul li:nth-child(1)').hover(
        function(){ $('.ae').css('transform', 'scale(1.08)');},
        function(){ $('.ae').css('transform', 'scale(1)');}
    );
    $('header nav ul li:nth-child(2)').hover(
        function(){ $('.pf').css('transform', 'scale(1.2)');},
        function(){ $('.pf').css('transform', 'scale(1)');}
    );
    $('header nav ul li:nth-child(3)').hover(
        function(){ $('.me').css('transform', 'scale(1.15)');},
        function(){ $('.me').css('transform', 'scale(1)');}
    );

     $('header li').each(function(index, el){
        const $clickedLi = $(el);
        $clickedLi.click(function(){
            console.log("Header li clicked. Current isAboutMeInVideoArea:", isAboutMeInVideoArea);

            $popup.removeClass('popon');
            $thumbnailsDefault.removeClass('thumup').hide();
            $thumbnailsPortfolio.removeClass('thumup').hide();

            if ($mainPlayer.length) {
                $mainPlayer.removeClass('hidden');
                $mainPlayer.get(0).pause();
                $mainPlayer.attr('src', '');
            }
            $popupTxt.removeClass('hidden');

            const title = $clickedLi.find('.inner .txt h3').text();
            const text = $clickedLi.find('.inner .txt p').text();
            const videoSrcForPopup = $clickedLi.find('.inner figure video').attr('src');

            $popupTxt.find('h2').text(title);
            $popupTxt.find('p').text(text);

            function setupPopupAndShow() {
                if ($clickedLi.hasClass('abmli')) {
                    console.log("Processing About Me menu click for setupPopupAndShow.");
                    if ($mainPlayer.length) {
                        $mainPlayer.addClass('hidden');
                    }

                    $aboutMeSection
                        .appendTo($videoFigure)
                        .removeClass('active') // 혹시 모를 active 클래스 제거
                        .css('display', '')    // ★★★ .hide()로 설정된 인라인 display:none 스타일 제거 ★★★
                        .addClass('about-me-in-video'); // CSS에 정의된 display:none, opacity:0 등이 적용됨

                    setTimeout(() => {
                        $aboutMeSection.addClass('active'); // CSS에 정의된 display:block, opacity:1 등으로 변경 (애니메이션)
                        $moveMenuLot.addClass('abstart');
                        console.log("About Me section activated.");
                    }, 20);

                    isAboutMeInVideoArea = true;
                    console.log("isAboutMeInVideoArea set to true.");

                    $thumbnailsDefault.hide().removeClass('thumup');
                    $thumbnailsPortfolio.hide().removeClass('thumup');

                } else {
                    console.log("Processing Video Popup menu click for setupPopupAndShow.");
                    if ($mainPlayer.length) {
                        $mainPlayer.removeClass('hidden');
                        $mainPlayer.attr('src', videoSrcForPopup);
                        $mainPlayer.off('loadeddata').on('loadeddata', function() {
                            if($popup.hasClass('popon') && !$mainPlayer.hasClass('hidden')) {
                                this.play();
                            }
                        }).each(function() {
                            if(this.readyState >= 3 && $popup.hasClass('popon') && !$mainPlayer.hasClass('hidden')) {
                                $(this).trigger('loadeddata');
                            }
                        });
                    }

                    if ($clickedLi.hasClass('pfli')) {
                        $thumbnailsPortfolio.show().addClass('thumup');
                        $thumbnailsDefault.hide().removeClass('thumup');
                    } else {
                        $thumbnailsDefault.show().addClass('thumup');
                        $thumbnailsPortfolio.hide().removeClass('thumup');
                    }
                    console.log("Thumbnails displayed for video popup.");
                }
                $popup.addClass('popon');
                console.log("Popup 'popon' class added AFTER all processing.");
            }

            if (isAboutMeInVideoArea) {
                console.log("Cleaning up About Me section.");
                $aboutMeSection.removeClass('active');
                setTimeout(() => {
                    $aboutMeSection.removeClass('about-me-in-video');
                    $moveMenuLot.removeClass('abstart');
                    if ($.contains($videoFigure[0], $aboutMeSection[0])) {
                         $aboutMeSection.appendTo($('.mainpop > .container'));
                    }
                    $aboutMeSection.hide(); // 정리할 때는 다시 .hide()로 인라인 display:none 설정
                    console.log("About Me section hidden.");
                    isAboutMeInVideoArea = false;
                    console.log("isAboutMeInVideoArea set to false.");
                    setupPopupAndShow();
                }, 400);
            } else {
                setupPopupAndShow();
            }
        });
    });


    $('.popup button').click(function(){
        console.log("Popup close button clicked. Current isAboutMeInVideoArea:", isAboutMeInVideoArea);
        $popup.removeClass('popon');
        if ($mainPlayer.length) {
            $mainPlayer.removeClass('hidden').get(0).pause();
        }
        $popupTxt.removeClass('hidden');
        $moveMenuLot.removeClass('abstart');

        $thumbnailsDefault.removeClass('thumup'); 
        $thumbnailsPortfolio.removeClass('thumup'); 

        setTimeout(function() {
            if (!$popup.hasClass('popon')) {
                 $thumbnailsDefault.hide();
                 $thumbnailsPortfolio.hide();
                 console.log("Thumbnails hidden after popup close animation.");
            }
        }, 500); 

        if (isAboutMeInVideoArea) {
            console.log("Cleaning up About Me section on popup close.");
            $aboutMeSection.removeClass('active about-me-in-video');
            setTimeout(() => {
                if ($.contains($videoFigure[0], $aboutMeSection[0])) {
                    $aboutMeSection.appendTo($('.mainpop > .container'));
                }
                $aboutMeSection.hide();
                console.log("About Me section hidden on popup close.");
            }, 400); 
            isAboutMeInVideoArea = false;
            console.log("isAboutMeInVideoArea set to false on popup close.");
        }
    });

    $('.thumbnail-item video, .thumbnail-item2 video').on('click', function() {
        console.log("Thumbnail video clicked. Current isAboutMeInVideoArea:", isAboutMeInVideoArea);
        if (isAboutMeInVideoArea) {
            console.log("Thumbnail click IGNORED because isAboutMeInVideoArea is true.");
            return; 
        }

        if ($mainPlayer.length) {
            const newVideoSrc = $(this).attr('src');
            $mainPlayer.attr('src', newVideoSrc);
            $mainPlayer.on('loadeddata', function() {
                this.play();
            }).each(function() {
                if(this.readyState >= 3) $(this).trigger('loadeddata');
            });
        }

        $('.thumbnail-item, .thumbnail-item2').removeClass('active-thumbnail');
        $(this).closest('.thumbnail-item, .thumbnail-item2').addClass('active-thumbnail');
        console.log("Thumbnail video changed and played.");
    });
});