MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
  },
  svg: {
    fontCache: 'global'
  }
};

(function () {
  var script = document.createElement('script');
  // script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
  script.async = true;
  document.head.appendChild(script);

  var compatibility_script = document.createElement('script');
  compatibility_script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
  document.head.appendChild(compatibility_script);
})();