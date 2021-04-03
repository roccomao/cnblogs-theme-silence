import "./index.less";
import options from '@/consts/options';
import { follow } from '@utils/cnblog';

export function buildMainElements() {
    const date = $('#post-date').text();
    const viewCount = $('#post_view_count').text();
    const commentCount = $('#post_comment_count').text();
    const diggCount = $('#digg_count').text();
    const authorName = options.signature.author || $('#profile_block a').eq(0).html();

    $('#topics .postTitle').after(`
    <div id='custom-post-message'>
        <span>${date}</span>
        <span>&nbsp;${$.trim(authorName) || ''}&nbsp;</span>
        <span class='view-msg'>阅读 ${viewCount}</span>
        <span class='comment-msg'>评论 ${commentCount}</span>
        <span class='digg-msg'>推荐 ${diggCount}</span>
    </div>`);
}

export function buildFocusBtn() {
    const followState = window.isBlogOwner || ($('#green_channel #green_channel_follow').text().trim() === '已关注');

    $('#blog_post_info_block').before(`<a name="post-info"></a>`);
    $('#div_digg .diggit').after(`
    <div class='custom-focus${followState ? ' followMe' : ''}'>
        <span>关注</span>
    </div>`);

    $('#div_digg .custom-focus').click(function() {
        if ( !window.isLogined ) {
            return window.account.login('post-info');
        }

        if ( !window.isBlogOwner ) {
            follow();
            if ( !$(this).hasClass('followMe') ) {
                $(this).addClass('followMe');
            }
        }
    });
}
