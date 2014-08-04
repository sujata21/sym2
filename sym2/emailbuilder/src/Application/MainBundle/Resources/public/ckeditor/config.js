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
  CKEDITOR.plugins.addExternal('menubutton', '/bundles/applicationmain/ckeditor/plugins/menubutton/');
	CKEDITOR.plugins.addExternal('scayt', '/bundles/applicationmain/ckeditor/plugins/scayt/');
  //CKEDITOR.plugins.addExternal('wsc', '/bundles/applicationmain/ckeditor/plugins/wsc/');scayt,wsc
 // CKEDITOR.plugins.addExternal('jqueryspellchecker', '/bundles/applicationmain/ckeditor/plugins/jqueryspellchecker/');

	
	config.extraPlugins = 'floatpanel,panelbutton,colorbutton,colordialog,menubutton,scayt';
	
	
	config.toolbar_Basic = [
  ['Scayt'],
  //['Wsc'],
  [ 'Bold','Italic','Underline'],
	['TextColor','BGColor'],
	['Link', 'Unlink'],
	['Image'],
	['CharCount']	,
  //[ 'jQuerySpellChecker' ]

	
];
config.toolbar_Basic2 = [
  [ 'Bold','Italic','Underline'],
  ['TextColor','BGColor'],
     
];
config.toolbar = 'Basic';


config.colorButton_colors = 'D30000,3C3C3C',
config.colorButton_enableMore = true;
config.resize_enabled = true;

config.autoParagraph = false;
config.scayt_autoStartup = true;
config.image_previewText = ' ';
//config.allowedContent = true;
};
CKEDITOR.on( 'dialogDefinition', function( ev )
   {
      // Take the dialog name and its definition from the event
      // data.
      var dialogName = ev.data.name;
      var dialogDefinition = ev.data.definition;
      
      // Check if the definition is from the dialog we're
      // interested on (the Link and Image dialog).
      if (dialogName == 'image' )
      {
         // remove Upload tab
         dialogDefinition.removeContents( 'Upload' );
         dialogDefinition.removeContents( 'advanced' );
         var infoTab = dialogDefinition.getContents('info');
         var urlField = infoTab.get( 'txtUrl' );
         //urlField[ 'default' ] = 'http://ichef.bbci.co.uk/images/ic/';
         var linkTab = dialogDefinition.getContents('Link');
         
         //infoTab.remove('browse');
         //infoTab.remove('htmlPreview');
        // linkTab.remove('browse');
        infoTab.remove( 'ratioLock' ); 
        infoTab.remove( 'txtHeight' );          
        infoTab.remove( 'txtWidth' );          
        infoTab.remove( 'txtBorder'); 
        infoTab.remove( 'txtHSpace'); 
        infoTab.remove( 'txtVSpace'); 
        infoTab.remove( 'cmbAlign' ); 
        //infoTab.remove( 'txtAlt' );
        //infoTab.remove( 'txtUrl' );
		 
      }
      if (dialogName == 'link' )
      {
         // remove Upload tab
         dialogDefinition.removeContents( 'advanced' );
         dialogDefinition.removeContents( 'target' );
         var infoTab = dialogDefinition.getContents('info');
         
         
         infoTab.remove('browse');
     
        
		 
      }
   });
