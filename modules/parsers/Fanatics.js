import Parser from '/modules/Parser.js'

export default class Fanatics extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostEquals: 'images.footballfanatics.com',
                    pathPrefix: '/FFImage/thumb.aspx'
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let params = url.searchParams;
        if (params.has('i')) {
            let newParams = new URLSearchParams()
            newParams.set('i', params.get('i'));
            newParams.set('w', "2000");
            return 'https://'+url.hostname+url.pathname+'?'+newParams.toString();
        }
        return null;
    }
}
