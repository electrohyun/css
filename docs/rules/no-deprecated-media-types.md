# no-deprecated-media-types

Disallow deprecated media types.

## Background

Media types describe broad categories of devices, such as `screen` and `print` in CSS.

The following media types are deprecated and must be recognized as valid while matching nothing.

- `aural`
- `braille`
- `embossed`
- `handheld`
- `projection`
- `speech`
- `tty`
- `tv`

## Rule Details

This rule warns when it finds a deprecated media type in an `@media` rule.

Examples of **incorrect** code:

```css
/* eslint css/no-deprecated-media-types: "error" */

@media tv {
}

@media handheld and (max-width: 480px) {
}

@media screen, print, tty {
}
```

Examples of **correct** code:

```css
/* eslint css/no-deprecated-media-types: "error" */

@media screen {
}

@media print and (color) {
}

@media (max-width: 480px) {
}
```

## When Not to Use It

If you need to preserve deprecated media types in legacy stylesheets, you can disable this rule.

## Prior Art

- [`media-type-no-deprecated`](https://stylelint.io/user-guide/rules/media-type-no-deprecated/)
- [`noDeprecatedMediaType`](https://biomejs.dev/linter/rules/no-deprecated-media-type/)

## Further Reading

- [Media Types](https://drafts.csswg.org/mediaqueries-5/#media-types)
