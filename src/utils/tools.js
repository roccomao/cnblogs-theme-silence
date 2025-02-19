/**
 * 监听 DOM 变化
 * @param {*} selector Dom selector
 * @param {*} callback retun Promise
 */
function createMutationObserve(selector, callback) {
    const observer = new MutationObserver(() => {
        callback().then(() => {
            observer.disconnect()
        })
    })
    observer.observe(selector, {
        attributes: true,
        childList: true,
        subtree: true,
    })
}

/**
 * HTML反转义
 * @param {String} string
 */
function HTMLDecode(str) {
    return $('<textarea/>')
        .html(str)
        .text()
}

/**
 * 插入css
 * @param {String} stylesheet
 */
function insertStyle(style) {
    let styleElement = document.createElement('style')
    styleElement.innerHTML = style
    document
        .getElementsByTagName('head')[0]
        .appendChild(styleElement)
}

/**
 * 合并对象
 * @param {Object} 原对象
 * @param {Object} 新对象
 * @return {Object} 合并后的配置
 */
function mergeOptions(def = {}, user = {}, dev = {}) {
    const defaultOptions = Object.assign({}, def, dev)
    const options = Object.assign({}, defaultOptions, user)
    return options
}

/**
 * 监听鼠标滚轮
 * @param {Function} upCallback 向上滚动回调
 * @param {Function} downCallback 向下滚动回调
 */
function mousewheel(upCallback, downCallback) {
    if (!downCallback) downCallback = upCallback
    const removeListener = () => {
        $(document).unbind('mousewheel DOMMouseScroll')
    }
    const up = () => {
        upCallback()
        removeListener()
    }
    const down = () => {
        upCallback()
        removeListener()
    }
    $(document).on('mousewheel DOMMouseScroll', function(
        e,
    ) {
        // e.preventDefault()
        const wheel =
            e.originalEvent.wheelDelta ||
            -e.originalEvent.detail
        const delta = Math.max(-1, Math.min(1, wheel))
        delta < 0 ? up() : down()
    })
}

/**
 * 获取季节
 */
function getQuarter() {
    let month = new Date().getMonth()
    if (month < 3) {
        return 'spring'
    } else if (month < 6) {
        return 'summer'
    } else if (month < 9) {
        return 'autumn'
    } else if (month < 12) {
        return 'winter'
    }
}

/**
 * 获取引文月份
 */
function getMonth() {
    const monthsInEng = [
        'Jan',
        'Feb',
        'March',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ]
    const month = new Date().getMonth()
    return monthsInEng[month]
}

/**
 * @description 元素是否在视口范围内
 * @param {el} Object
 */
function isElementInViewport(el) {
    let rect = el.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight ||
                document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth ||
                document.documentElement.clientWidth)
    )
}

/**
 * @description 创建link标签
 * @param {href} String
 */
function addCss(href) {
    $('head').append('<link>')
    const toolbarCss = $('head').children(':last')
    toolbarCss.attr({
        rel: 'stylesheet',
        type: 'text/css',
        href,
    })
}

/**
 * @description 是否为夜间
 */
function isNight() {
    const nowHour = new Date().getHours()
    const isNight = nowHour > 19 || nowHour <= 5
    return isNight
}

/**
 * @description 获编辑器类型是否为md
 * @retuens Boolean
 */
function isMd() {
    const bool = $('#cnblogs_post_body').hasClass(
        'cnblogs-markdown',
    )
    return bool
}

/**
 * @description prettier console.log
 * @param {str} String
 * @param {color} String
 */
function prettyLog(str, color = '#ffb3cc') {
    console.log(
        `%c  ${str}`,
        `color: ${color}; font-weight: bold;`,
    )
}

/**
 * @description 获取当前日期
 */
function getDate() {
    const time = new Date()
    const year = time.getFullYear()
    const month = ('0' + (time.getMonth() + 1)).slice(-2)
    const day = ('0' + time.getDate()).slice(-2)
    // const hour = ('0' + time.getHours()).slice(-2)
    // const minute = ('0' + time.getMinutes()).slice(-2)
    // const second = ('0' + time.getSeconds()).slice(-2)
    const today = `${year}-${month}-${day}`
    return today
}

/**
 * @description ajax
 * @param {url} String
 * @param {type} String
 * @param {callback} Function
 */
function getData(url, type, callback) {
    $.ajax({
        url,
        type,
        dataType: 'jsonp',
        success(data) {
            callback(data)
        },
        error(xhr) {
            console.log('error', xhr)
        },
    })
}

/**
 * @description 获取数组中随机元素
 * @param {arr} Array
 * @param {count} Number
 */
function randomArrayElements(arr, count = 1) {
    let shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
    }
    return shuffled.slice(min)
}

/**
 * @description sleep
 * @param {time} Number await time
 */
async function sleep(time) {
    return new Promise(res => setTimeout(res, time))
}

// 获取一个随机image url
// 使用内置的 imagehost url
// 无需参数
function randomImgurl() {
    const animeImages = 'https://api.mz-moe.cn/img'
    const random = Math.floor(Math.random() * 950)
    const url = `${animeImages}/img${random}.jpg`
    return url
}

/**
 * @description 滚动穿透处理
 * @param {show} Boolean
 */
function unpass(show) {
    if (show) {
        let body = document.body
        body.style.position = ''
        let top = body.style.top
        document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
            top,
        )
        body.style.top = ''
    } else {
        let scrollTop =
            document.body.scrollTop ||
            document.documentElement.scrollTop
        document.body.style.cssText +=
            'position:fixed;width:100%;top:-' +
            scrollTop +
            'px;'
    }
}

/**
 * @description 轮询
 * @param {function} 返回指定条件的函数
 * @param {pollCallback} 回调函数
 * @returns {boolean} 是否完成 pollCallback
 */
function poll(conditionFn, callback) {
    if (conditionFn()) {
        const res = callback()
        if (typeof res === 'boolean' || typeof res === 'string') {
            return res
        }
        return true
    } else {
        let count = 1
        let intervalId = setInterval(() => {
            if (conditionFn()) {
                const res = callback()
                if (typeof res === 'boolean' || typeof res === 'string') {
                    return res
                }
                clearInterval(intervalId)
                return true
            }
            if (count === 15) {
                clearInterval(intervalId)
                return false
            }
            count++
        }, 500)
    }
}

/**
 * @description add a script and cache it
 * @param {url} String
 * @param {callback} Function
 */
function cacheScript(url, callback = function() {}) {
    $.ajax({
        type: 'GET',
        dataType: 'script',
        cache: true,
        url,
        success() {
            callback()
        },
    })
}

/**
 * @description 防抖
 * @param {Function} func 传入的函数
 * @param {Number} wait 等待
 * @param {Boolean} immediate 立即
 * @returns Function 返回的函数
 */
function debounce(func, wait, immediate) {
    let timeout
    return function() {
        let context = this,
            args = arguments
        let later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        let callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

/**
 * 节流
 * @param {*} func
 * @param {*} wait
 * @param {*} mustRun
 */
function throttle(func, wait, mustRun) {
    let timeout,
        startTime = new Date()

    return function() {
        let context = this,
            args = arguments,
            curTime = new Date()

        clearTimeout(timeout)

        if (curTime - startTime >= mustRun) {
            func.apply(context, args)
            startTime = curTime
        } else {
            timeout = setTimeout(func, wait)
        }
    }
}

/**
 * @description 随机对象属性
 * @param {Object} obj javascript对象
 * @returns 对象的随机属性
 */
function randomProperty(obj) {
    let result
    let count = 0
    for (let prop in obj)
        if (Math.random() < 1 / ++count) result = prop
    return result
}

/**
 * @description 获取随机颜色
 * @param {String} type rgba 16
 * @returns 颜色值
 */
function randomColor(type) {
    let res = ''
    if (type === 'rgba') {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const a = 0.6
        res = `rgba(${r},${g},${b},${a})`
    } else if (type === '16') {
        res =
            '#' +
            Math.floor(Math.random() * 0xffffff).toString(
                16,
            )
    } else {
        const colors = type || [
            '#FE0302',
            '#FF7204',
            '#FFAA02',
            '#FFD302',
            '#FFFF00',
            '#A0EE00',
            '#00CD00',
            '#019899',
            '#4266BE',
            '#89D5FF',
            '#CC0273',
            '#CC0273',
        ]
        const random = Math.floor(
            Math.random() * colors.length,
        )
        res = colors[random]
    }
    return res
}

/**
 * @description 获取元素相对与浏览器视口的位置
 * @param {Object} client document对象
 * @returns top, bottom, left, right, height, width
 */
function getClientRect(el) {
    const {
        top,
        bottom,
        left,
        right,
        height,
        width,
    } = el.getBoundingClientRect()
    return {
        top,
        bottom,
        left,
        right,
        height: height || bottom - top,
        width: width || right - left,
    }
}

/**
 * @description 生成随机数 []
 * @param {Number} max 最大值
 * @param {Number} min 最小值
 * @returns 介于最大值与最小值闭区间的随机数
 */
function randomNum(max, min) {
    parseInt(Math.random() * (max - min + 1) + min, 10)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 文章内容是否存在标题
// 文章是否有可用来生成目录的标题
function hasPostTitle() {
    return $(
        '#cnblogs_post_body>h1,#cnblogs_post_body>h2,#cnblogs_post_body>h3,#cnblogs_post_body>h4',
    ).length === 0
        ? false
        : true
}

/**
 * 是否为随笔详情页
 */
function isPostDetailsPage() {
    return !!$('#post_detail').length
}

/**
 * 是否为首页
 */
function isHomePage() {
    return !!$('.day').length
}

/**
 * 是否为标签列表页
 */
function isTagListPage() {
    return !!$('#taglist_main').length
}

/**
 * 是否为随笔详情页
 */
function isEntrylistPage() {
    return !!$('.entrylistPosttitle').length
}

/**
 * 是否相册页
 */
function isAlbumPage() {
    return !!$('.gallery').length
}

/**
 * 是否为随笔分类页
 */
function isCategoryPage() {
    return !!$('.entrylistItem').length
}

/**
 * @description 返回当前页面名称
 * @returns 'post' | 'index' | 'tag' | 'list' | 'tag' | 'taglist'
 */
function pageName() {
    if ($('#post_detail').length) return 'post'
    if ($('.day').length) return 'index'
    if ($('#taglist_main').length) return 'tag'
    if ($('.entrylistPosttitle').length) return 'list'
    if ($('#myposts').length) return 'tag'
}

/**
 * @description 返回用户设备
 * @returns 'pc' | 'phone'
 */
function userAgent() {
    const width = $(window).width()
    return width > 768 ? 'pc' : 'phone'
}

export {
    isNight,
    isElementInViewport,
    isMd,
    isPostDetailsPage,
    isHomePage,
    isTagListPage,
    isEntrylistPage,
    isAlbumPage,
    isCategoryPage,
    randomProperty,
    randomImgurl,
    randomColor,
    randomNum,
    pageName,
    userAgent,
    debounce,
    throttle,
    getClientRect,
    hasPostTitle,
    poll,
    unpass,
    randomArrayElements,
    getData,
    getDate,
    prettyLog,
    cacheScript,
    sleep,
    addCss,
    getMonth,
    getQuarter,
    mousewheel,
    mergeOptions,
    insertStyle,
    HTMLDecode,
    createMutationObserve,
}
