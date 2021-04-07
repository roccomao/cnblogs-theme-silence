import './index.less';
import options from '@consts/options';
import { isPostPage, showSidebar } from '@consts/tools';
import buildGithubCorner from '@modules/githubCorner';
import buildCustomHeader from '@modules/customHeader';
import buildCustomFooter from '@modules/customFooter';
import buildProfile from '@modules/profile';
import buildPostContents from '@modules/postContents';
import buildPostLightbox from '@modules/postLightbox';
import buildHljsLineNumber from '@modules/hljsLineNumber';
import buildPostSignature from '@modules/postSignature';
import buildPostSponsor from '@modules/postSponsor';
import buildPostCommentAvatars from '@modules/postCommentAvatars';
import buildToolbar from '@modules/toolbar';
import loader from '@modules/loader';
import { buildCodeSelection } from '@modules/hljsLineNumber';
import { buildMainElements, buildFocusBtn } from '@modules/postMessage';

class Silence {
    constructor() {
        this.init();
    }

    init() {
        const userOptions = window.$silence;
        if (userOptions) {
            $.extend(true, options, userOptions);
        }
        this.building();
    }

    building() {
        buildCustomHeader();
        buildCustomFooter();
        buildGithubCorner();
        buildProfile();
        buildToolbar();
        if (isPostPage()) {
            buildCodeSelection();
            buildMainElements();
            buildPostContents();
            buildPostSignature();
            buildPostSponsor();
            buildFocusBtn();
            buildPostCommentAvatars();
            buildHljsLineNumber();
            buildPostLightbox();
        } else {
            showSidebar();
        }
        loader.hide();
    }
}

new Silence();
