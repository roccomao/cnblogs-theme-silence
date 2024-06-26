import "./index.less";
import options from '@/consts/options';
import { isPostPage } from '@consts/tools';
import { throttle, getClientRect } from '@utils/tools';

function buildToolbar() {
    $('body').append(`<div class="esa-toolbar">
        <div class="bars"><i class="fa fa-ellipsis-h"></i></div>
        <span class="up" title="返回顶部"><i class="fa fa-chevron-up"></i></span>
        <span class="mode" title="切换模式"><i class="fa fa-adjust"></i></span>
        <span class="skin" title="切换主题"><i class="fa fa-cog"></i></span>
        <div class="skin-popup">
            <div class="item">
                <div class="title">选择主题</div>
                <div class="themes">
                    <button data-theme="a" style="background: #2D8CF0;"></button>
                    <button data-theme="b" style="background: #FA7298;"></button>
                    <button data-theme="c" style="background: #42B983;"></button>
                    <button data-theme="d" style="background: #607D8B;"></button>
                    <button data-theme="e" style="background: #5E72E4;"></button>
                    <button data-theme="f" style="background: #FF9700;"></button>
                    <button data-theme="g" style="background: #FF5722;"></button>
                    <button data-theme="h" style="background: #009688;"></button>
                    <button data-theme="i" style="background: #673BB7;"></button>
                    <button data-theme="j" style="background: #906f61;"></button>
                </div>
            </div>
        </div>
        </div>
    </div>`);

    const headerLevels = options.catalog.levels.join(',');
    const showContents = isPostPage() && options.catalog.enable;

    if (showContents) {
        $('.esa-toolbar').append(`<span class="contents" title="目录导航"><i class="fa fa-list-ul"></i></span>`);
    }

    const modeKey = `silence-mode-${currentBlogApp}`;
    const themeKey = `silence-theme-${currentBlogApp}`;

    const hour = new Date().getHours();

    const themeLoading = sessionStorage.getItem(themeKey) || options.defaultTheme;
    const modeLoading = sessionStorage.getItem(modeKey) || (options.defaultMode == 'auto' ? (hour >= 6 && hour < 18 ? 'light' : 'dark') : options.defaultMode);

    $('html').attr('mode', modeLoading);
    $('html').attr('theme', themeLoading);

    const $toolbar = $('.esa-toolbar');
    const $skinPopup = $('.skin-popup');
    var skinPopEl = document.getElementsByClassName('skin-popup')[0];
    var navigatorE1 = document.getElementById('navigator');

    $toolbar.find('.bars').click(function(e) {
        e.stopPropagation();
        if ($('.bars').hasClass('bars-show')) {
            $toolbar.find('.bars').removeClass('bars-show');
            $toolbar.find('.up').removeClass('up-show');
            $toolbar.find('.mode').removeClass('mode-show');
            $toolbar.find('.skin').removeClass('skin-show');
            if (showContents) {
                $toolbar.find('.contents').removeClass('contents-show');
            }
        } else {
            $toolbar.find('.bars').addClass('bars-show');
            $toolbar.find('.up').addClass('up-show');
            $toolbar.find('.mode').addClass('mode-show');
            $toolbar.find('.skin').addClass('skin-show');
            if (showContents) {
                $toolbar.find('.contents').addClass('contents-show');
            }
        }
    });

    $toolbar.find('.up').click(() => {
        $('html, body').animate({ scrollTop: 0 }, 450);
    });

    $toolbar.find('.mode').click(() => {
        const mode = $('html').attr('mode') == 'light' ? 'dark' : 'light';
        sessionStorage.setItem(modeKey, mode);
        $('html').attr('mode', mode);
    });

    $toolbar.find('.skin').click((e) => {
        e.stopPropagation();
        $skinPopup.slideToggle();
    });

    skinPopEl.addEventListener('click', function(e) {
        e.stopPropagation()
        if (e.target.nodeName === 'BUTTON') {
            var theme = e.target.dataset.theme;
            sessionStorage.setItem(themeKey, theme);
            $('html').attr('theme', theme);
        }
    });

    $toolbar.find('.contents').click(function(e) {
        e.stopPropagation();
        $('.esa-contents').toggleClass(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                return 'noactive';
            } else {
                $(this).removeClass('noactive');
                return 'active';
            }
        });

        if (document.body.clientWidth <= 1259) {
            $('#home').css({ "width": "100%" });
        } else {
            if ($('.esa-contents').hasClass('active')) {
                $('#home').css({ "width": "calc(100% - 252px)"});
            } else {
                $('#home').css({ "width": "100%" });
            }
        }
    });

    document.addEventListener('click', function () {
        if (skinPopEl && skinPopEl.style.display === 'block') {
            $skinPopup.slideUp();
        }

        if (document.body.clientWidth < 990) {
            if (navigatorE1.style.display === 'block') {
                $('#navigator').fadeOut();
            }
        }

        if (document.body.clientWidth <= 1259) {
            if ($('.esa-contents').hasClass('active')) {
                $('.esa-contents').removeClass('active');
                $('.esa-contents').addClass('noactive');
                $('#home').css({ "width": "100%" });
            }

            if ($('.bars').hasClass('bars-show')) {
                $toolbar.find('.bars').removeClass('bars-show');
                $toolbar.find('.up').removeClass('up-show');
                $toolbar.find('.mode').removeClass('mode-show');
                $toolbar.find('.skin').removeClass('skin-show');
                if (showContents) {
                    $toolbar.find('.contents').removeClass('contents-show');
                }
            }
        }
    });

    document.addEventListener('scroll', throttle(
        function () {
            if ($('.bars').hasClass('bars-show')) {
                $toolbar.find('.bars').removeClass('bars-show');
                $toolbar.find('.up').removeClass('up-show');
                $toolbar.find('.mode').removeClass('mode-show');
                $toolbar.find('.skin').removeClass('skin-show');
                if (showContents) {
                    $toolbar.find('.contents').removeClass('contents-show');
                }
            }

            if (isPostPage() && document.body.clientWidth < 990) {
                var top = document.documentElement.scrollTop || document.body.scrollTop;
                if (top > 60) {
                    $('#header').css('opacity', 0);
                } else {
                    $('#header').css('opacity', 1);
                }
            } else {
                $('#header').css('opacity', 1);
            }

            if (showContents && $('#cnblogs_post_body').find(headerLevels).length > 0) {
                for (let i = $('.esa-contents ul li').length - 1; i >= 0; i--) {
                    const titleId = $($('.esa-contents ul li')[i]).find('a').attr('href').replace(/[#]/g, '');
                    const postTitle = document.querySelector(`#cnblogs_post_body [id='${titleId}']`);
                    if (getClientRect(postTitle).top <= 100) {
                        if ( $($('.esa-contents ul li')[i]).hasClass('catalog-active') ) {
                            return;
                        }
                        $($('.esa-contents ul li')[i]).addClass('catalog-active');
                        $($('.esa-contents ul li')[i]).siblings().removeClass('catalog-active');
                        return;
                    }
                }
            }
        },
        50,
        1000 / 60
    ));

    if (isPostPage() && document.body.clientWidth > 990) {
        $toolbar.find('.bars').triggerHandler('click');
    }
}

export default buildToolbar;
