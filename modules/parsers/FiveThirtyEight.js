import Parser from '/modules/Parser.js'

export default class FiveThirtyEight extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'fivethirtyeight.com',
                    pathPrefix: '/wp-content/uploads/',
                    queryPrefix: '?w=',
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let paramsNew = url.searchParams;
        paramsNew.delete('w');
        url.search = '?' + paramsNew.toString();
        return url.href;
    }
}
