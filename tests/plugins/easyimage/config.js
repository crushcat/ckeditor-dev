/* bender-tags: editor,widget */
/* bender-ckeditor-plugins: easyimage,toolbar */
/* bender-include: ../widget/_helpers/tools.js,./manual/_helpers/tools.js */
/* global widgetTestsTools, isUnsupportedEnvironment */

( function() {
	'use strict';

	bender.editors = {
		classCustomized: {
			config: {
				// Widget is identified by id.
				extraAllowedContent: 'figure[id]',
				easyimage_class: 'customClass',
				easyimage_sideClass: 'customSideClass'
			}
		}
	};

	bender.test( {
		setUp: function() {
			if ( isUnsupportedEnvironment() ) {
				assert.ignore();
			}
		},

		'test easyimage_class - changed': function() {
			widgetTestsTools.assertWidget( {
				count: 1,
				widgetOffset: 0,
				nameCreated: 'easyimage',
				html: CKEDITOR.document.getById( 'changedClass' ).getHtml(),
				bot: this.editorBots.classCustomized
			} );
		},

		'test easyimage_sideClass - changed': function() {
			var bot = this.editorBots.classCustomized;

			bot.setData( CKEDITOR.document.getById( 'changedClass' ).getHtml(), function() {
				var editor = bot.editor,
					widgetInstance = widgetTestsTools.getWidgetById( editor, 'customSideId', true );

				widgetInstance.focus();

				// IE11 for some reasons needs to have the command state force refreshed, after focusing the widget with API only.
				editor.commands.easyimageSide.refresh( editor, editor.elementPath() );

				editor.execCommand( 'easyimageSide' );

				assert.beautified.html( CKEDITOR.document.getById( 'expectedCustomSideClass' ).getHtml(), editor.getData() );
			} );
		}
	} );
} )();
