const { currentBlogApp } = window

/**
 * 是否开启公告
 */
function openNews() {
    return !!$('#profile_block').length
}

/**
 * 获取博客园昵称
 */
function getBlogname() {
    if (openNews()) {
        return $('#profile_block>a:nth-of-type(1)')
            .html()
            .trim()
    }
    const headerTitle = $('#Header1_HeaderTitle')
        .text()
        .trim()
    if (headerTitle.length) return headerTitle
    return currentBlogApp
}

/**
 * 获取粉丝数
 */
function getFollowers() {
    const count = openNews()
        ? $('#profile_block a:nth-of-type(3)')
              .text()
              .trim()
        : '未知'
    return count
}

/**
 * 获取关注的人数
 */
function getFollowing() {
    const count = openNews()
        ? $('#profile_block a:nth-of-type(4)')
              .text()
              .trim()
        : '未知'
    return count
}

/**
 * 获取园龄
 */
function getBlogAge() {
    const age = openNews()
        ? $('#profile_block a:nth-of-type(2)')
              .text()
              .trim()
        : '未知'
    return age
}

/**
 * 获取当前随笔链接
 */
function getCurrentPostUrl() {
    return location.href.indexOf('#') === -1
        ? location.href
        : location.href.substring(
              0,
              location.href.lastIndexOf('#'),
          )
}

/**
 * 获取博客园 user guid
 */
function getBlogUserGuid() {
    const strValue = $('body>script:last').text()
    const regex = /'([^"]*)'/g
    return regex.exec(strValue)[1]
}

/**
 * 关注
 */
function follow() {
    window.follow(getBlogUserGuid())
}

/**
 * unfollow
 */
function unfollow() {
    window.unfollow(getBlogUserGuid())
}

export {
    getBlogname,
    getFollowers,
    getFollowing,
    getBlogAge,
    getCurrentPostUrl,
    getBlogUserGuid,
    follow,
    unfollow,
}
