import Parser from '/modules/Parser.js'

export default class Amazon extends Parser {
    getConditions() {
        return [
            // most images on IMDb
            {
                pageUrl: {
                    hostEquals: 'm.media-amazon.com',
                    pathPrefix: '/images/'
                }
            },
            // product images from Amazon.com
            {
                pageUrl: {
                    hostPrefix: 'images-',
                    hostSuffix: '.ssl-images-amazon.com',
                    pathPrefix: '/images/I/'
                }
            },
        ];
    }
    getBiggestUrl(url) {
        if (url.pathname.startsWith('/images/M/')) {
            let re = /^(\/images\/M\/\w+@).*$/g;
            let result = re.exec(url.pathname);
            if (result !== null) {
                let filePath = result[1];
                url.pathname = filePath;
                return url.href;
            }
            return null;
        } else {
            let re = /^(\/images\/[A-Z]\/.+?)\..+?(\.\w+)$/g;
            let result = re.exec(url.pathname);
            if (result !== null) {
                let filePath = result[1];
                let fileExt = result[2];
                url.pathname = filePath+fileExt;
                return url.href;
            }
            return null;
        }
    }
}
