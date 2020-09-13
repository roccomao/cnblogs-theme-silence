import "./index.less";
import { isPostPage } from '@consts/tools';
import { message } from '@/components/layer';

import options from '@/consts/options';

function buildToolbar() {
    $('body').append(`<div class="esa-toolbar">
        <div class="bars"><i class="fa fa-ellipsis-h"></i></div>
        <span class="up" title="返回顶部"><i class="fa fa-chevron-up"></i></span>
        <span class="down" title="跳转底部"><i class="fa fa-chevron-down"></i></span>
        <span class="skin" title="主题设置"><i class="fa fa-cog"></i></span>
        <div class="skin-popup">
            <div class="item">
                <div class="title">主题色彩</div>
                <div class="themes">
                    <button data-theme="a1" style="background: #2D8CF0;"></button>
                    <button data-theme="b1" style="background: #FA7298;"></button>
                    <button data-theme="c1" style="background: #42B983;"></button>
                    <button data-theme="d1" style="background: #607D8B;"></button>
                    <button data-theme="e1" style="background: #5E72E4;"></button>
                    <button data-theme="f1" style="background: #FF9700;"></button>
                    <button data-theme="g1" style="background: #FF5722;"></button>
                    <button data-theme="h1" style="background: #009688;"></button>
                    <button data-theme="i1" style="background: #673BB7;"></button>
                    <button data-theme="j1" style="background: #906f61;"></button>
                </div>
            </div>
            <div class="item">
                <div class="title">选择模式</div>
                <div class="modes">
                    <a title="日间模式" data-mode="light">🌖</a>
                    <a title="夜间模式" data-mode="dark">🌒</a>
                </div>
            </div>
        </div>
        </div>
    </div>`);

    const showContents = isPostPage() && options.catalog.enable;

    if (showContents) {
        $('.esa-toolbar').append(`<span class="contents"><i class="fa fa-list-ul"></i></span>`);
    }

    const modeKey = `silence-mode-${currentBlogApp}`;
    const themeKey = `silence-theme-${currentBlogApp}`;
    const modeLoading = sessionStorage.getItem(modeKey) || 'light';
    const themeLoading = sessionStorage.getItem(themeKey) || 'a1';

    $('html').attr('mode', modeLoading);
    $('html').attr('theme', themeLoading);

    const $toolbar = $('.esa-toolbar');
    const $skinPopup = $('.skin-popup');

    let show = false;
    $toolbar.find('.bars').click(function () {
        if (!show) {
            $toolbar.find('.bars').addClass('bars-show');
            $toolbar.find('.up').addClass('up-show');
            $toolbar.find('.down').addClass('down-show');
            $toolbar.find('.skin').addClass('skin-show');
            if (showContents) {
                $toolbar.find('.contents').addClass('contents-show');
            }
        } else {
            $toolbar.find('.bars').removeClass('bars-show');
            $toolbar.find('.up').removeClass('up-show');
            $toolbar.find('.down').removeClass('down-show');
            $toolbar.find('.skin').removeClass('skin-show');
            if (showContents) {
                $toolbar.find('.contents').removeClass('contents-show');
            }
        }
        show = !show;
    });

    $toolbar.find('.up').click(() => {
        $('html, body').animate({ scrollTop: 0 }, 450);
    });

    $toolbar.find('.down').click(() => {
        let position = $('#footer').offset().top;
        $('html, body').animate({ scrollTop: position }, 450);
    });

    $toolbar.find('.skin').click(() => {
        $skinPopup.slideToggle();
    });

    $skinPopup.find('.modes a').click(function() {
        const mode = $(this).data('mode');
        sessionStorage.setItem(modeKey, mode);
        $('html').attr('mode', mode);
    });

    $skinPopup.find('.themes button').click(function() {
        const theme = $(this).data('theme');
        sessionStorage.setItem(themeKey, theme);
        $('html').attr('theme', theme);
    });

    $toolbar.find('.contents').click(() => {
        $('.esa-contents').toggleClass(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                return 'noactive';
            } else {
                $(this).removeClass('noactive');
                return 'active';
            }
        });
    });
}

export default buildToolbar;