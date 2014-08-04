/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	CKEDITOR.plugins.addExternal('colorbutton', '/bundles/applicationmain/ckeditor/plugins/colorbutton/');
	CKEDITOR.plugins.addExternal('floatpanel', '/bundles/applicationmain/ckeditor/plugins/floatpanel/');
	CKEDITOR.plugins.addExternal('panelbutton', '/bundles/applicationmain/ckeditor/plugins/panelbutton/');
	CKEDITOR.plugins.addExternal('colordialog', '/bundles/applicationmain/ckeditor/plugins/colordialog/');
	

	
	config.extraPlugins = 'floatpanel,panelbutton,colorbutton,colordialog';
	
	config.toolbar = [
    [  'Bold','Italic','Underline'],
	['TextColor','BGColor'],
	
	];
	config.toolbar_Basic = [
    [ 'Bold','Italic','Underline'],
	['TextColor','BGColor'],
		
];
config.toolbar = 'Basic';


config.autoParagraph = false;
//config.allowedContent = true;
};

