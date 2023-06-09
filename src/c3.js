/*
Language: C3
Website: https://www.learn-c3.org
*/
export default function(hljs) {
  const C3_NESTED_COMMENT = hljs.COMMENT(
    '/\\*', '\\*/',
    { contains: [ hljs.C_BLOCK_COMMENT_MODE ] }
  );
  const NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b(0b[01\']+)' },
      { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)' },
      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
    ],
    relevance: 0
  };
  const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
  const STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + "|.)",
        end: '\'',
        illegal: '.'
      },
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  };
  const C3_KEYWORDS = "alias as assert asm bitstruct break case catch const continue define default defer do else enum extern false fault for foreach foreach_r fn generic tlocal if import macro module nextcase null private return static struct switch true try union var while typedef distinct initialize finalize inline";
  const KEYWORDS = {
    keyword: C3_KEYWORDS,
  };
  const SKEYWORDS = {
    className: 'keyword',
    match:'\\$alignof|\\$assert|\\$case|\\$checks|\\$default|\\$defined|\\$echo|\\$elif|\\$else|\\$endfor|\\$endforeach|\\$endif|\\$endswitch|\\$eval|\\$evaltype|\\$extnameof|\\$for|\\$foreach|\\$if|\\$include|\\$nameof|\\$offsetof|\\$qnameof|\\$sizeof|\\$stringify|\\$switch|\\$vacount|\\$vaconst|\\$varef|\\$vaarg|\\$vaexpr|\\$vasplat',
    relevance: 0
  };
  const SKEYWORDS2 = {
    className: 'title',
    match:'\\$\\$abs|\\$\\$bitreverse|\\$\\$bswap|\\$\\$ceil|\\$\\$compare_exchange|\\$\\$copysign|\\$\\$cos|\\$\\$clz|\\$\\$ctz|\\$\\$add|\\$\\$div|\\$\\$mod|\\$\\$mul|\\$\\$neg|\\$\\$sub|\\$\\$exp|\\$\\$exp2|\\$\\$expect|\\$\\$expect_with_probability|\\$\\$floor|\\$\\$fma|\\$\\$fmuladd|\\$\\$frameaddress|\\$\\$fshl|\\$\\$fshr|\\$\\$get_rounding_mode|\\$\\$log|\\$\\$log10|\\$\\$log2|\\$\\$max|\\$\\$memcpy|\\$\\$memcpy_inline|\\$\\$memmove|\\$\\$memset|\\$\\$memset_inline|\\$\\$min|\\$\\$nearbyint|\\$\\$overflow_add|\\$\\$overflow_mul|\\$\\$overflow_sub|\\$\\$popcount|\\$\\$pow|\\$\\$pow_int|\\$\\$prefetch|\\$\\$reduce_add|\\$\\$reduce_and|\\$\\$reduce_fadd|\\$\\$reduce_fmul|\\$\\$reduce_max|\\$\\$reduce_min|\\$\\$reduce_mul|\\$\\$reduce_or|\\$\\$reduce_xor|\\$\\$reverse|\\$\\$rint|\\$\\$round|\\$\\$roundeven|\\$\\$sat_add|\\$\\$sat_shl|\\$\\$sat_sub|\\$\\$set_rounding_mode|\\$\\$swizzle|\\$\\$swizzle2|\\$\\$sin|\\$\\$sqrt|\\$\\$stacktrace|\\$\\$syscall|\\$\\$sysclock|\\$\\$trap|\\$\\$trunc|\\$\\$unreachable|\\$\\$veccomplt|\\$\\$veccomple|\\$\\$veccompgt|\\$\\$veccompge|\\$\\$veccompeq|\\$\\$veccompne|\\$\\$volatile_load|\\$\\$volatile_store|\\$\\$wasm_memory_size|\\$\\$wasm_memory_grow|\\$\\$DATE|\\$\\$FILE|\\$\\$FILEPATH|\\$\\$FUNC|\\$\\$FUNCTION|\\$\\$LINE|\\$\\$LINE_RAW|\\$\\$MODULE|\\$\\$TEST_NAMES|\\$\\$TEST_FNS|\\$\\$TIME',
    relevance: 0
  };
  const TYPES = {
    className: 'type',
    variants: [
      { begin: '\\b[A-Z]+[0-9a-zA-Z_]*[a-z]+[0-9a-zA-Z_]*!?' },
      { begin: '\\banyfault!?|\\bany!?|\\bvoid!?|\\bbool!?|\\bchar!?|\\bdouble!?|\\bfloat16!?|\\bbfloat16!?|\\bfloat128!?|\\bint128!?|\\bint!?|\\bichar!?|\\biptr!?|\\bisz!?|\\blong!?|\\bshort!?|\\buint128!?|\\buint!?|\\bulong!?|\\buptr!?|\\bushort!?|\\busz!?|\\bfloat!?|\\btypeid!?|\\bireg!?|\\bureg!?' },
      { begin: '\\$vatype|\\$typeof|\\$typefrom' }
    ]
  };
  const CONSTANTS = {
    className: 'symbol',
    variants: [
      { begin: '\\b[A-Z]+[0-9A-Z_]*\\b' }
    ]
  };
  const regex = hljs.regex;
  const DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
  const NAMESPACE_RE = '[a-zA-Z_]\\w*::';
  const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
  const FUNCTION_TYPE_RE = '('
    + DECLTYPE_AUTO_RE + '|'
    + regex.optional(NAMESPACE_RE)
    + '[a-zA-Z_]\\w*' + regex.optional(TEMPLATE_ARGUMENT_RE)
  + ')';
  const TITLE_MODE = {
    className: 'title',
    begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0
  };
  const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';
  const FUNCTION_DECLARATION = {
    begin: '\\s*fn\\s*' + '(' + FUNCTION_TYPE_RE + '[!\\*&\\s]+)+' + FUNCTION_TITLE,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: KEYWORDS,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      { // to prevent it from being confused as the function title
        begin: DECLTYPE_AUTO_RE,
        keywords: KEYWORDS,
        relevance: 0
      },
      {
        begin: FUNCTION_TITLE,
        returnBegin: true,
        contains: [ hljs.inherit(TITLE_MODE, { className: "title.function" }) ],
        relevance: 0
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        relevance: 0,
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          C3_NESTED_COMMENT,
          STRINGS,
          NUMBERS,
          TYPES,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              'self',
              hljs.C_LINE_COMMENT_MODE,
              C3_NESTED_COMMENT,
              STRINGS,
              NUMBERS,
              TYPES
            ]
          }
        ]
      },
      TYPES,
      hljs.C_LINE_COMMENT_MODE,
      C3_NESTED_COMMENT
    ]
  };

  return {
    name: "C3",
    keywords: KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      C3_NESTED_COMMENT,
      NUMBERS,
      STRINGS,
      TYPES,
      SKEYWORDS,
      SKEYWORDS2,
      CONSTANTS,
      FUNCTION_DECLARATION
    ]
  }
}
