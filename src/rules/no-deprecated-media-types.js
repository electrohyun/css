/**
 * @fileoverview Rule to disallow deprecated media types.
 * @author electrohyun
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { ident, tokenize, tokenTypes } from "@eslint/css-tree";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @import { SourceLocation } from "@eslint/core"
 * @import { MediaQueryPlain } from "@eslint/css-tree"
 * @import { CSSSourceCode } from "../languages/css-source-code.js"
 * @import { CSSRuleDefinition } from "../types.js"
 * @typedef {"deprecatedMediaType"} NoDeprecatedMediaTypesMessageIds
 * @typedef {CSSRuleDefinition<{ RuleOptions: [], MessageIds: NoDeprecatedMediaTypesMessageIds }>} NoDeprecatedMediaTypesRuleDefinition
 */

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const deprecatedMediaTypes = new Set([
	"aural",
	"braille",
	"embossed",
	"handheld",
	"projection",
	"speech",
	"tty",
	"tv",
]);

/**
 * Gets the location of the media type in a media query.
 * @param {MediaQueryPlain} node The media query node.
 * @param {CSSSourceCode} sourceCode The CSS source code.
 * @returns {SourceLocation} The media type location.
 */
function getMediaTypeLoc(node, sourceCode) {
	const nodeStart = node.loc.start.offset;
	const nodeText = sourceCode.getText(node);
	let mediaTypeStart = -1;
	let mediaTypeEnd = -1;

	tokenize(nodeText, (type, start, end) => {
		if (type !== tokenTypes.Ident || mediaTypeStart !== -1) {
			return;
		}

		const tokenText = nodeText.slice(start, end).toLowerCase();

		if (tokenText === "not" || tokenText === "only") {
			return;
		}

		mediaTypeStart = start;
		mediaTypeEnd = end;
	});

	if (mediaTypeStart === -1 || mediaTypeEnd === -1) {
		return node.loc;
	}

	return {
		start: sourceCode.getLocFromIndex(nodeStart + mediaTypeStart),
		end: sourceCode.getLocFromIndex(nodeStart + mediaTypeEnd),
	};
}

//-----------------------------------------------------------------------------
// Rule Definition
//-----------------------------------------------------------------------------

export default /** @satisfies {NoDeprecatedMediaTypesRuleDefinition} */ ({
	meta: {
		type: "problem",
		languages: ["css/css"],

		docs: {
			description: "Disallow deprecated media types",
			dialects: ["CSS"],
			recommended: true,
			url: "https://github.com/eslint/css/blob/main/docs/rules/no-deprecated-media-types.md",
		},

		messages: {
			deprecatedMediaType:
				"Unexpected deprecated media type '{{mediaType}}'.",
		},
	},

	create(context) {
		const { sourceCode } = context;

		return {
			"Atrule[name=/^media$/i] > AtrulePrelude > MediaQueryList > MediaQuery"(
				node,
			) {
				const mediaType =
					node.mediaType &&
					ident.decode(node.mediaType).toLowerCase();

				if (!mediaType || !deprecatedMediaTypes.has(mediaType)) {
					return;
				}

				const loc = getMediaTypeLoc(node, sourceCode);

				context.report({
					loc,
					messageId: "deprecatedMediaType",
					data: {
						mediaType,
					},
				});
			},
		};
	},
});
