# The C3 Programming Language for highlight.js

## Usage

### Static website or simple usage

Load the module after loading highlight.js.  You'll use the minified version found in the `dist` directory. This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<!DOCTYPE html>
<head>
<link rel="stylesheet" href="monokai-sublime.min.css">
<script src="highlight.min.js"></script>
<script type="text/javascript" src="c3.min.js"></script>
<script>hljs.highlightAll();</script>
</head>
<body>
<pre><code class="c3">
import std::io;

fn void main()
{
	io::printfn("hello, world");
}
</code></pre>
</body>
</html>
```

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlight.js');
var hljsC3 = require('highlightjs-c3');

hljs.registerLanguage("c3", hljsC3);
hljs.highlightAll();
```

## Links

- The highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- Learn more about the C3 programming language: <https://learn-c3.org>
