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
        if (url.hostname.endsWith('.espncdn.com')) {
            if (url.pathname == '/combiner/i') {
                let params = url.searchParams;
                if (params.has('img')) {
                    let newParams = new URLSearchParams()
                    newParams.set('img', params.get('img'));
                    return 'https://'+url.hostname+url.pathname+'?'+newParams.toString();
                }
            }
        }
        return null;
    }
}
