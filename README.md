# The C3 Programming Language for highlight.js

## Usage

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

## Links

- The highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- Learn more about the C3 programming language: <https://learn-c3.org>
