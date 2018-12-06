import Parser from '/modules/Parser.js'

export default class LastFm extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'lastfm-img2.akamaized.net',
                    pathPrefix: '/i/u/'
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let re = /^\/i\/u\/\w+\/(\w+)(?:\.\w+)?$/g;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let fileId = result[1];
            url.pathname = '/i/u/ar0/'+fileId;
            return url.href;
        }
        return null;
    }
}
