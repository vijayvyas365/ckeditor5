/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module basic-styles/strikethroughengine
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { downcastAttributeToElement } from '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters';
import { upcastElementToAttribute, upcastAttributeToAttribute } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';
import AttributeCommand from './attributecommand';

const STRIKETHROUGH = 'strikethrough';

/**
 * The strikethrough engine feature.
 *
 * It registers the `strikethrough` command and introduces the
 * `strikethroughsthrough` attribute in the model which renders to the view
 * as a `<s>` element.
 *
 * @extends module:core/plugin~Plugin
 */
export default class StrikethroughEngine extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;

		// Allow strikethrough attribute on text nodes.
		editor.model.schema.extend( '$text', { allowAttributes: STRIKETHROUGH } );

		// Build converter from model to view for data and editing pipelines.
		editor.conversion.for( 'downcast' )
			.add( downcastAttributeToElement( STRIKETHROUGH, { view: 's' } ) );

		// Build converter from view to model for data pipeline.
		editor.conversion.for( 'upcast' )
			.add( upcastElementToAttribute( { view: 's', model: STRIKETHROUGH } ) )
			.add( upcastElementToAttribute( { view: 'del', model: STRIKETHROUGH } ) )
			.add( upcastElementToAttribute( { view: 'strike', model: STRIKETHROUGH } ) )
			.add( upcastAttributeToAttribute( { view: { style: { 'text-decoration': 'line-through' } }, model: STRIKETHROUGH } ) );

		// Create strikethrough command.
		editor.commands.add( STRIKETHROUGH, new AttributeCommand( editor, STRIKETHROUGH ) );
	}
}
