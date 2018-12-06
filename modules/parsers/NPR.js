import Parser from '/modules/Parser.js'

export default class NPR extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'media.npr.org',
                    pathPrefix: '/assets/img/'
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^(\/assets\/img\/.+?)-s\d{1,4}-c\d{1,2}(\.\w+)$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let filePath = result[1];
            let fileExt = result[2];
            url.pathname = filePath+'-s9999-c99'+fileExt;
            return url.href;
        }
        return null;
    }
}
