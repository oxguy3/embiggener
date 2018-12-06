import Parser from '/modules/Parser.js'

export default class WashingtonPost extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'www.washingtonpost.com',
                    pathPrefix: '/resizer/',
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^\/resizer\/.+?\/\d+x\d+\/(.*?)$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let originalUrl = result[1];
            return "http://"+originalUrl;
        }
        return null;
    }
}
