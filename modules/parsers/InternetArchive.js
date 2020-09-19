import Parser from '/modules/Parser.js'

export default class InternetArchive extends Parser {
    getConditions() {
        return [
            {
                pageUrl: {
                    hostSuffix: '.archive.org',
                    pathEquals: '/BookReader/BookReaderImages.php',
                    queryContains: '&scale=',
                }
            },
            {
                pageUrl: {
                    hostSuffix: '.archive.org',
                    pathEquals: '/BookReader/BookReaderImages.php',
                    queryContains: '&rotate='
                }
            },
            {
                pageUrl: {
                    hostSuffix: '.archive.org',
                    pathEquals: '/BookReader/BookReaderImages.php',
                    queryPrefix: '?scale=',
                }
            },
            {
                pageUrl: {
                    hostSuffix: '.archive.org',
                    pathEquals: '/BookReader/BookReaderImages.php',
                    queryPrefix: '?rotate='
                }
            },
        ];
    }
    getBiggestUrl(url) {
        let params = new URLSearchParams({
            "file": url.searchParams.get("file"),
            "zip": url.searchParams.get("zip"),
            "id": url.searchParams.get("id"),
        });
        url.search = "?"+params.toString();
        return url.toString();
    }
}
