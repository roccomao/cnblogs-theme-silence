import "./index.less";

function buildMainElements() {
    const date = $('#post-date').text();
    const viewCount = $('#post_view_count').text();
    const commentCount = $('#post_comment_count').text();
    const diggCount = $('#digg_count').text();

    $('#topics .postTitle').after(`
    <div id='custom-post-message'>
        <span>${date}</span>
        <span>@bitlogic</span>
        <span class='view-msg'>阅读 ${viewCount}</span>
        <span class='comment-msg'>评论 ${commentCount}</span>
        <span class='digg-msg'>推荐 ${diggCount}</span>
    </div>`);
}

export default buildMainElements;
