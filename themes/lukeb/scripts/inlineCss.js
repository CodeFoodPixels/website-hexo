const fs = require('hexo-fs');
const path = require('path');
const cheerio = require('cheerio');
const csso = require('csso');

hexo.extend.filter.register('after_render:html', function (str) {
    const $ = cheerio.load(str);

    $('link[critical="true"]').each(function() {
        const content = csso.minify(fs.readFileSync(path.join('themes', hexo.config.theme, 'source', $(this).attr('href')))).css;

        $(this).replaceWith(`<style>${content}</style>`);
    });

    return $.html();
}, 1);
