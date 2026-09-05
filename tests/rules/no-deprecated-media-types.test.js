/**
 * @fileoverview Tests for no-deprecated-media-types rule.
 * @author electrohyun
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------

import rule from "../../src/rules/no-deprecated-media-types.js";
import css from "../../src/index.js";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
	plugins: {
		css,
	},
	language: "css/css",
});

ruleTester.run("no-deprecated-media-types", rule, {
	valid: [
		"@media screen {}",
		"@media only screen {}",
		"@media (color) {}",
		"@media screen, print {}",
		"@media future {}",
		'@import "legacy.css" tv;',
	],
	invalid: [
		{
			code: "@media aural {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "aural" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 13,
				},
			],
		},
		{
			code: "@media braille {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "braille" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 15,
				},
			],
		},
		{
			code: "@media embossed {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "embossed" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 16,
				},
			],
		},
		{
			code: "@media handheld {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "handheld" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 16,
				},
			],
		},
		{
			code: "@media projection {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "projection" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 18,
				},
			],
		},
		{
			code: "@media speech {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "speech" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 14,
				},
			],
		},
		{
			code: "@media tty {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "tty" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 11,
				},
			],
		},
		{
			code: "@media tv {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "tv" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 10,
				},
			],
		},
		{
			code: "@media TV {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "tv" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 10,
				},
			],
		},
		{
			code: "@MEDIA tv {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "tv" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 10,
				},
			],
		},
		{
			code: "@media t\\76 {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "tv" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 13,
				},
			],
		},
		{
			code: "@media only tv {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "tv" },
					line: 1,
					column: 13,
					endLine: 1,
					endColumn: 15,
				},
			],
		},
		{
			code: "@media not handheld and (max-width: 480px) {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "handheld" },
					line: 1,
					column: 12,
					endLine: 1,
					endColumn: 20,
				},
			],
		},
		{
			code: "@media screen, print, tty {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "tty" },
					line: 1,
					column: 23,
					endLine: 1,
					endColumn: 26,
				},
			],
		},
		{
			code: "@media tv, tty {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "tv" },
					line: 1,
					column: 8,
					endLine: 1,
					endColumn: 10,
				},
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "tty" },
					line: 1,
					column: 12,
					endLine: 1,
					endColumn: 15,
				},
			],
		},
		{
			code: "@media only /* comment */ tv {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "tv" },
					line: 1,
					column: 27,
					endLine: 1,
					endColumn: 29,
				},
			],
		},
		{
			code: "@media screen,\n       projection and (color) {}",
			errors: [
				{
					messageId: "deprecatedMediaType",
					data: { mediaType: "projection" },
					line: 2,
					column: 8,
					endLine: 2,
					endColumn: 18,
				},
			],
		},
	],
});
