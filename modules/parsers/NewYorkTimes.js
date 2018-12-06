import Parser from '/modules/Parser.js'

export default class NewYorkTimes extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'static01.nyt.com',
                    pathPrefix: '/images/',
                }
            },
            {
                pageUrl: {
                    hostEquals: 'static02.nyt.com',
                    pathPrefix: '/images/',
                }
            },
        ];
    }
    getBiggestUrl(url) {
        url.search = '';
        return url.href;
    }
}
