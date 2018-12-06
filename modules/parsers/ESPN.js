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
            {
                pageUrl: {
                    hostEquals: 'artwork.espncdn.com',
                    pathPrefix: '/programs/',
                    pathContains: '/16x9/small_'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'artwork.espncdn.com',
                    pathPrefix: '/programs/',
                    pathContains: '/16x9/medium_'
                }
            },
            {
                pageUrl: {
                    hostEquals: 'artwork.espncdn.com',
                    pathPrefix: '/programs/',
                    pathContains: '/16x9/large_'
                }
            }
        ];
    }
    getBiggestUrl(url) {
        if (url.hostname == 'artwork.espncdn.com') {
            let re = /^(\/programs\/[\w-]+\/16x9\/)(?:small|medium|large)_(.*)$/g;
            let result = re.exec(url.pathname);
            if (result !== null) {
                let fileIdPath = result[1];
                let fileName = result[2];
                return "https://"+url.hostname+fileIdPath+'original_'+fileName;
            }
        } else {
            let params = url.searchParams;
            if (params.has('img')) {
                let newParams = new URLSearchParams()
                newParams.set('img', params.get('img'));
                return 'https://'+url.hostname+url.pathname+'?'+newParams.toString();
            }
        }
        return null;
    }
}
