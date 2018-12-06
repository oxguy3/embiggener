import Parser from '/modules/Parser.js'

export default class Tumblr extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostSuffix: '.media.tumblr.com',
                    pathPrefix: '/avatar_',
                }
            },
            {
                pageUrl: {
                    hostSuffix: '.media.tumblr.com',
                    pathContains: '/tumblr_',
                }
            },
        ];
    }
    getBiggestUrl(url) {
        if (/\d+\.media\.tumblr\.com/gi.test(url.hostname)) {
            if (url.pathname.startsWith('/avatar_')) { // user avatars
                let re = /^(\/avatar_\w+?)_\d+(\.\w+)$/g;
                let result = re.exec(url.pathname);
                if (result !== null) {
                    let filePath = result[1];
                    let fileExt = result[2];
                    return 'https://'+url.hostname+filePath+'_512'+fileExt;
                }
            } else { // normal images
                let re = /^(\/\w+\/tumblr_\w+?)_\d+(\.\w+)$/g;
                let result = re.exec(url.pathname);
                if (result !== null) {
                    let filePath = result[1];
                    let fileExt = result[2];
                    return 'https://'+url.hostname+filePath+'_1280'+fileExt;
                }
            }
        }
        return null;
    }
}
