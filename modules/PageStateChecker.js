class PageStateChecker {
    getConditions() {
        return [
            { pageUrl: { hostEquals: 'f1.bcbits.com', pathPrefix: '/img/' } },
            { pageUrl: { hostEquals: 'f2.bcbits.com', pathPrefix: '/img/' } },
            { pageUrl: { hostEquals: 'f3.bcbits.com', pathPrefix: '/img/' } },
            { pageUrl: { hostEquals: 'f4.bcbits.com', pathPrefix: '/img/' } },
            { pageUrl: { hostEquals: 'f5.bcbits.com', pathPrefix: '/img/' } },
        ];
    }
    getBiggestUrl() {
        if (/f\d\.bcbits\.com/gi.test(location.hostname)) {
            var re = /^\/img\/(a?\d{10})_\d+.jpg$/ig;
            var result = re.exec(location.pathname);
            if (result !== null) {
                var imgId = result[1];
                return "https://f1.bcbits.com/img/"+imgId+"_0.jpg";
            }
        }
        return null;
    }
}
export default PageStateChecker;
