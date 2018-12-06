import Parser from '/modules/Parser.js'

export default class Bandcamp extends Parser {
    getConditions() {
        return [
            { pageUrl: { hostEquals: 'f1.bcbits.com', pathPrefix: '/img/' } },
            { pageUrl: { hostEquals: 'f2.bcbits.com', pathPrefix: '/img/' } },
            { pageUrl: { hostEquals: 'f3.bcbits.com', pathPrefix: '/img/' } },
            { pageUrl: { hostEquals: 'f4.bcbits.com', pathPrefix: '/img/' } },
            { pageUrl: { hostEquals: 'f5.bcbits.com', pathPrefix: '/img/' } },
        ];
    }
    getBiggestUrl(url) {
        let re = /^\/img\/(a?\d{10})_\d+.jpg$/ig;
        let result = re.exec(url.pathname);
        if (result !== null) {
            let imgId = result[1];
            return "https://f1.bcbits.com/img/"+imgId+"_0.jpg";
        }
        return null;
    }
}
