$(function(){
const $mainPlayer = $('#mainPlayer'); // 메인 비디오 (HTML에 id="mainPlayer" 확인)
    const $popup = $('.popup');
    const $popupTxt = $popup.find('.txt'); // 팝업 내 제목/설명 영역
    const $videoFigure = $popup.find('.popvid figure'); // 비디오를 감싸는 figure 영역
    const $thumbnailsDefault = $('.thumbnails');
    const $thumbnailsPortfolio = $('.thumbnails2');
    const $aboutMeSection = $('.about-me'); // HTML에 있는 .about-me 참조
    let isAboutMeInVideoArea = false; // About Me 섹션 표시 상태 플래그
    // 초기화
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
        // sclick 버튼 천천히 사라지게
        $(this).fadeOut(500);
        $('.start').addClass('starttostart')

        // sdoor 비디오 소리 끄고, 천천히 사라지게
        if ($sdoorVideo) {
            $sdoorVideo.muted = true;
        }
        $sdoorDiv.fadeOut(1, function() {
            // sdoor 사라진 후 doorplay 비디오 보이기 및 재생
            $doorplayDiv.show();
            if ($doorplayVideo) {
                $doorplayVideo.muted = false; // 필요하다면 소리 켜기 (영상에 소리가 있다면)
                                          // 또는 $doorplayVideo.muted = true; // 계속 음소거 하려면
                $doorplayVideo.currentTime = 0; // 비디오를 처음부터 재생하도록 설정
                $doorplayVideo.play();

                // 3초 후에 다음 단계로 전환
                setTimeout(function() {
                    if ($doorplayVideo && $doorplayVideo.readyState >= 3) { // 비디오가 재생 중이거나 준비된 상태인지 확인
                        $doorplayVideo.pause(); // 3초 후 비디오 정지 (선택 사항)
                    }

                    // start 섹션 전체를 천천히 사라지게 (fadeOut)
                    $startDiv.fadeOut(1000, function() {
                        $(this).addClass('off').hide(); // 실제로 숨기고 off 클래스 추가

                        // wrap 섹션 보이기
                        $wrapDiv.addClass('on').show();

                        // body 스크롤 다시 허용 (wrap 내용이 길 경우 필요)
                        $('html, body').css('overflow', 'auto');

                        // mainbg 천천히 나타나게 (opacity 애니메이션 - fadeIn 효과)
                        $mainBgDiv.animate({
                            opacity: 1
                        }, 2000); // 2초 동안 천천히 나타남
                    });
                }, 3000); // 3000 밀리초 = 3초

            } else {
                // doorplayVideo가 없는 경우의 대체 처리 (예: 바로 mainbg로 전환)
                // 이 로직은 doorplay 비디오가 항상 있다고 가정하면 거의 실행되지 않습니다.
                $startDiv.fadeOut(1000, function() {
                    $(this).addClass('off').hide();
                    $wrapDiv.addClass('on').show();
                    $('html, body').css('overflow', 'auto');
                    $mainBgDiv.animate({
                        opacity: 1
                    }, 2000);
                });
            }
        });
    });
    $('header nav ul li:nth-child(1)').hover(
        function(){
            $('.ae').css('transform', 'scale(1.08)');},
        function(){
            $('.ae').css('transform', 'scale(1)');}
    );
    $('header nav ul li:nth-child(2)').hover(
        function(){
            $('.pf').css('transform', 'scale(1.2)');},
        function(){
            $('.pf').css('transform', 'scale(1)');}
    );
    $('header nav ul li:nth-child(3)').hover(
        function(){
            $('.me').css('transform', 'scale(1.15)');},
        function(){
            $('.me').css('transform', 'scale(1)');}
    );

    // 헤더 li 클릭 시 팝업 열기 및 썸네일 그룹 설정
    $('header li').each(function(index, el){
        const $clickedLi = $(el); // 현재 클릭된 li 요소 캐싱

        $clickedLi.click(function(){ // el 대신 $clickedLi 사용
            // 1. 모든 관련 요소 초기 상태로
            $popup.removeClass('popon');
            $thumbnailsDefault.removeClass('thumup').hide();
            $thumbnailsPortfolio.removeClass('thumup').hide();
            $mainPlayer.removeClass('hidden')[0].pause();
            // $popupTxt는 숨기지 않고, 내용을 업데이트 할 것이므로 hidden 클래스 제거
            $popupTxt.removeClass('hidden');

            if (isAboutMeInVideoArea) {
                $aboutMeSection.removeClass('active about-me-in-video');
                setTimeout(() => {
                    // .about-me를 원래 DOM 위치 근처로 이동시키거나, 단순히 숨길 수 있습니다.
                    // 여기서는 .mainpop .container 내부로 이동 후 숨깁니다.
                    $aboutMeSection.appendTo($('.mainpop .container')).hide();
                }, 400); // CSS transition 시간과 맞춤
                isAboutMeInVideoArea = false;
            }

            // 클릭된 li로부터 제목, 설명, 비디오 소스 가져오기
            // .inner div가 실제 정보 컨테이너인지 확인 필요 (현재 HTML 구조 기반)
            const title = $clickedLi.find('.inner .txt h3').text();
            const text = $clickedLi.find('.inner .txt p').text();
            const videoSrcForPopup = $clickedLi.find('.inner figure video').attr('src');

            // 팝업 좌측 텍스트 영역 내용 설정 (모든 경우에 적용)
            $popupTxt.find('h2').text(title);
            $popupTxt.find('p').text(text);

            // 2. 클릭된 메뉴에 따라 우측 컨텐츠(비디오 또는 About Me) 표시
            if ($clickedLi.hasClass('abmli')) { // 'About Me' 메뉴 클릭 시
                $mainPlayer.addClass('hidden'); // 메인 비디오는 숨김
                // $popupTxt는 이미 위에서 내용을 설정했고, 숨기지 않음
                
                // .about-me 섹션을 .popvid figure 내부로 이동시키고 활성화
                $aboutMeSection.appendTo($videoFigure)
                               .addClass('about-me-in-video')
                               .show(); // 일단 보이게 한 후 active로 애니메이션
                
                setTimeout(() => {
                    $aboutMeSection.addClass('active');
                    $moveMenuLot.addClass('abstart')
                }, 20);
                
                isAboutMeInVideoArea = true;
                // About Me 표시 시에는 썸네일 숨김
                $thumbnailsDefault.hide().removeClass('thumup');
                $thumbnailsPortfolio.hide().removeClass('thumup');

            } else { // 비디오 팝업을 보여주는 다른 메뉴 클릭 시
                // $aboutMeSection은 위에서 이미 정리되었으므로 별도 처리 필요 없음
                $mainPlayer.attr('src', videoSrcForPopup); // 메인 비디오 소스 설정
                
                $mainPlayer.on('loadeddata', function() {
                    if($popup.hasClass('popon') && !$mainPlayer.hasClass('hidden')) {
                       this.play();
                    }
                }).each(function() {
                    if(this.readyState >= 3 && $popup.hasClass('popon') && !$mainPlayer.hasClass('hidden')) {
                        $(this).trigger('loadeddata');
                    }
                });

                // 썸네일 그룹 표시
                if ($clickedLi.hasClass('pfli')) {
                    $thumbnailsPortfolio.show().addClass('thumup');
                    $thumbnailsDefault.hide().removeClass('thumup'); // 다른 썸네일은 숨김
                } else {
                    $thumbnailsDefault.show().addClass('thumup');
                    $thumbnailsPortfolio.hide().removeClass('thumup'); // 다른 썸네일은 숨김
                }
            }
            
            $popup.addClass('popon'); // 모든 경우에 팝업창 자체는 띄움
        });
    });

    // 팝업 닫기 버튼
    $('.popup button').click(function(){
        $popup.removeClass('popon');
        $mainPlayer.removeClass('hidden')[0].pause();
        $popupTxt.removeClass('hidden'); // 닫을 때도 텍스트 영역은 기본적으로 보이도록
        $moveMenuLot.removeClass('abstart');

        $thumbnailsDefault.removeClass('thumup');
        $thumbnailsPortfolio.removeClass('thumup');

        if (isAboutMeInVideoArea) {
            $aboutMeSection.removeClass('active about-me-in-video');
            setTimeout(() => {
                $aboutMeSection.appendTo($('.mainpop .container')).hide();
            }, 400);
            isAboutMeInVideoArea = false;
        }
        
        setTimeout(function() {
            if (!$popup.hasClass('popon')) {
                 $thumbnailsDefault.hide();
                 $thumbnailsPortfolio.hide();
            }
        }, 500);
    });

    // 썸네일 비디오 클릭 이벤트
    $('.thumbnail-item video, .thumbnail-item2 video').on('click', function() {
        if (isAboutMeInVideoArea) return; // About Me 표시 중에는 썸네일 클릭 무시

        const newVideoSrc = $(this).attr('src');
        $mainPlayer.attr('src', newVideoSrc);
        $mainPlayer.on('loadeddata', function() {
            this.play();
        }).each(function() {
            if(this.readyState >= 3) $(this).trigger('loadeddata');
        });

        $('.thumbnail-item, .thumbnail-item2').removeClass('active-thumbnail');
        $(this).closest('.thumbnail-item, .thumbnail-item2').addClass('active-thumbnail');
    });
})

