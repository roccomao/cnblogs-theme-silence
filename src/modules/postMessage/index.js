import "./index.less";
import options from '@/consts/options';
import { follow } from '@utils/cnblog';
import { poll } from '@utils/tools';

export function buildMainElements() {
    const date = $('#post-date').text();
    const authorName = options.signature.author || $('#profile_block a').eq(0).html();

    $('#topics .postTitle').after(`
    <div id='custom-post-message'>
        <span><em>Posted @ ${date}</em></span>
        <span>&nbsp;${$.trim(authorName) || ''}</span>
    </div>`);
}

export function buildFocusBtn() {
    poll(() => $('#green_channel_follow').length && $('#div_digg .clear').length, () => {
        const followState = window.isBlogOwner || ($('#green_channel #green_channel_follow').text().trim() === '已关注');

        $('#blog_post_info_block').before(`<a name="post-info"></a>`);
        $('#div_digg .clear').before(`
        <div class='custom-focus${followState ? ' followMe' : ''}'>
            <span>关注</span>
        </div>`);
        $('#div_digg .custom-focus').click(function () {
            if (!window.isLogined) {
                return window.account.login('post-info');
            }

            if (!window.isBlogOwner) {
                follow();
                if (!$(this).hasClass('followMe')) {
                    $(this).addClass('followMe');
                }
            }
        });
    });
}
