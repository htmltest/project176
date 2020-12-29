var html = document.documentElement;

var fontsfile = document.createElement('link');
fontsfile.href = pathTemplate + 'css/fonts.css';
fontsfile.rel = 'stylesheet';
document.head.appendChild(fontsfile);

if (sessionStorage.fontsLoaded) {
    html.classList.add('fonts-loaded');
} else {
    var script = document.createElement('script');
    script.src = pathTemplate + 'js/fontfaceobserver.js';
    script.async = true;

    script.onload = function () {
        var GothamPro300 = new FontFaceObserver('GothamPro', {
            weight: '300'
        });
        var GothamPro400 = new FontFaceObserver('GothamPro', {
            weight: 'normal'
        });
        var GothamPro500 = new FontFaceObserver('GothamPro', {
            weight: '500'
        });
        var GothamPro700 = new FontFaceObserver('GothamPro', {
            weight: 'bold'
        });

        Promise.all([
            GothamPro300.load(),
            GothamPro400.load(),
            GothamPro500.load(),
            GothamPro700.load()
        ]).then(function () {
            html.classList.add('fonts-loaded');
            sessionStorage.fontsLoaded = true;
        });
    };
    document.head.appendChild(script);
}