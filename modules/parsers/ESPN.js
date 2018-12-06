import Parser from '/modules/Parser.js'

export default class ESPN extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'a.espncdn.com',
                    pathEquals: '/combiner/i',
                    queryContains: 'img='
                }
            },
            {
                pageUrl: {
                    hostEquals: 'b.espncdn.com',
                    pathEquals: '/combiner/i',
                    queryContains: 'img='
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let params = url.searchParams;
        if (params.has('img')) {
            let newParams = new URLSearchParams()
            newParams.set('img', params.get('img'));
            return 'https://'+url.hostname+url.pathname+'?'+newParams.toString();
        }
        return null;
    }
}
