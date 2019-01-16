const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

hexo.extend.filter.register('after_render:html', function (str) {
    const $ = cheerio.load(str);

    $('link[critical="true"]').each(function() {
        const content = fs.readFileSync(path.join('themes', hexo.config.theme, 'source', $(this).attr('href')));

        $(this).replaceWith(`<style>${content}</style>`);
    });

    return $.html();
}, 1);
