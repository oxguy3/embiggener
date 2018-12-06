import Parser from '/modules/Parser.js'

/* Gannett Company (aka USA Today Network) */
export default class Gannett extends Parser {
    getConditions() {
        return [
            { pageUrl: { hostEquals: 'www.gannett-cdn.com' } },
            { pageUrl: { hostEquals: 'media.gannett-cdn.com' } },
        ];
    }
    getBiggestUrl(url) {
        url.search = '';
        return url.href;
    }
}
