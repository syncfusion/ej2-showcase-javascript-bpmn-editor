var DropDownDataSources = (function () {
    function DropDownDataSources() {
    };
    DropDownDataSources.prototype.getFileMenuItems = function()
    {
            var items = [
                { text: 'New', iconCss: 'sf-icon-New' },
                { text: 'Open', iconCss: 'sf-icon-Open' },
                { separator: true },
                { text: 'Save', iconCss: 'sf-icon-Save' },
                { separator: true },
                { text: 'Export', iconCss: 'sf-icon-Export',
                    items:[
                        {text:'JPG'},{text:'PNG'},{text:'BMP'},{text:'SVG'}
                    ] },
                { text: 'Print', iconCss: 'sf-icon-Print' },
        
            ]
            return items;
    };
    DropDownDataSources.prototype.getEditMenuItems = function()
    {
        var items = [
            { text: 'Undo', iconCss: 'sf-icon-undo' },
            { text: 'Redo', iconCss: 'sf-icon-redo' },
            { separator: true },
            { text: 'Cut', iconCss: 'sf-icon-cut' },
            { text: 'Copy', iconCss: 'sf-icon-copy' },
            { text: 'Paste', iconCss: 'sf-icon-paste' },
            { separator: true },
            { text: 'Rotate',iconCss:'sf-icon-rotate', items:[
                { text: 'Rotate Right 90', iconCss: 'sf-icon-rotate-clockwise' },
                { text: 'Rotate Left 90', iconCss: 'sf-icon-rotate-counter-clockwise' },
                { text: 'Flip Vertical', iconCss: 'sf-icon-flip-vertical' },
                { text: 'Flip Horizontal', iconCss: 'sf-icon-flip-horizontal' },
            ]},
            { text: 'Delete', iconCss: 'sf-icon-delete' },
            { separator: true },
            {text: 'Order Commands',iconCss:'sf-icon-Order',
                items:[ { text: 'Bring Forward', iconCss: 'sf-icon-bring-forward' },
                        { text: 'Bring To Front', iconCss: 'sf-icon-bring-to-front' },
                        { text: 'Send Backward', iconCss: 'sf-icon-send-backward' },
                        { text: 'Send To Back', iconCss: 'sf-icon-send-to-back' },
                        ]
            } 
        ]
        return items;
    };
    DropDownDataSources.prototype.getDesignMenuItems = function()
    {
        var items = [
            { text: 'Orientation',iconCss: 'sf-icon-page_orientation',
            items:[
                { text: 'Landscape', iconCss: 'sf-icon-check-tick' },
                { text: 'Portrait', iconCss: '' }
            ]    
            },
            { text: 'Size', iconCss: 'em-icons e-copy',
            items:this.paperList1()
            },
        ]
        return items;
    };
    DropDownDataSources.prototype.getToolsMenuItems = function()
    {
        var items1 = [
            { text: 'Selection Tool',iconCss: 'sf-icon-pointer' },
            { text: 'Pan Tool', iconCss: 'sf-icon-Pan tb-icons' },
            { separator: true },
            { text: 'Connector Tool',iconCss:'sf-icon-orthogonal_line',items:[
                {text:'Straight',iconCss: 'sf-icon-straight_line'},
                {text:'Orthogonal',iconCss: 'sf-icon-orthogonal_line'},
                {text:'Bezier',iconCss: 'sf-icon-bezier'},
            ] }
        ]
        return items1;
    };
    DropDownDataSources.prototype.getSelectMenuItems = function()
    {
        var items = [
            { text: 'Select All', iconCss: 'em-icons e-cut' },
            { text: 'Select All Nodes', iconCss: 'em-icons e-copy' },
            { text: 'Select All Connectors', iconCss: 'em-icons e-paste' },
            { text: 'Deselect All', iconCss: 'em-icons e-paste' }
        ]
        return items;
    };
    DropDownDataSources.prototype.getViewMenuItems = function()
    {
        var items = [
            { text: 'Show Lines',iconCss: 'sf-icon-check-tick'},
            { text: 'Snap To Grid',iconCss : 'sf-icon-check-tick'},
            { text: 'Snap To Object',iconCss : 'sf-icon-check-tick'},
            { text: 'Show Ruler',iconCss: 'sf-icon-check-tick'},
            { text: 'Show Page Breaks',iconCss: ''},
            { text: 'Show Multiple page',iconCss: ''},
            { separator: true },
            { text: 'Fit To Width'},
            { text: 'Fit To Page'},
        ]
        return items;
    };
    DropDownDataSources.prototype.paperList = function()
    {
        var paperList = [
            { text: 'Letter (8.5 in x 11 in)', value: 'Letter' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
            { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
            { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
            { text: 'A6 (105 mm x 148 mm)', value: 'A6' }, { text: 'Custom', value: 'Custom' },
        ];
        return paperList;
    };
    DropDownDataSources.prototype.paperList1 = function()
    {
        var paperList1 = [
            { text: 'Letter (8.5 in x 11 in)', value: 'Letter',iconCss:'sf-icon-check-tick' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
            { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
            { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
            { text: 'A6 (105 mm x 148 mm)', value: 'A6' },
        ];
        return paperList1;
    };
    DropDownDataSources.prototype.fileFormats = function()
    {
        var fileFormats = [
            { text: 'JPG', value: 'JPG' }, { text: 'PNG', value: 'PNG' },
            { text: 'SVG', value: 'SVG' }
        ];
        return fileFormats;
    };
    DropDownDataSources.prototype.diagramRegions = function()
    {
        var diagramRegions = [
            { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
        ];
        return diagramRegions;
    };
    DropDownDataSources.prototype.borderStyles= function()
    {
        var borderStyles = [
            { text: '', value: '', className: 'ddl-svg-style ddl_linestyle_none' },
            { text: '1,2', value: '1,2', className: 'ddl-svg-style ddl_linestyle_one_two' },
            { text: '3,3', value: '3,3', className: 'ddl-svg-style ddl_linestyle_three_three' },
            { text: '5,3', value: '5,3', className: 'ddl-svg-style ddl_linestyle_five_three' },
            { text: '4,4,1', value: '4,4,1', className: 'ddl-svg-style ddl_linestyle_four_four_one' }
        ];
        return borderStyles;
    };
    DropDownDataSources.prototype.lineStyles= function()
    {
        var lineStyles = [
            { text: '', value: '', className: 'ddl-svg-style ddl_linestyle_none' },
            { text: '2 2', value: '2 2', className: 'ddl-svg-style ddl_linestyle_one_two' },
            { text: '4 4', value: '4 4', className: 'ddl-svg-style ddl_linestyle_three_three' },
            { text: '5,3', value: '5,3', className: 'ddl-svg-style ddl_linestyle_five_three' },
            { text: '4,4,1', value: '4,4,1', className: 'ddl-svg-style ddl_linestyle_four_four_one' }
        ];
        return lineStyles;
    };
    DropDownDataSources.prototype.gradientDirections = function()
    {
        var gradientDirections = [
            { text: 'Bottom To Top', value: 'BottomToTop',iconCss: 'sf-icon-bottom-top' }, { text: 'Top To Bottom', value: 'TopToBottom',iconCss:'sf-icon-top-bottom' },
            { text: 'Right To Left', value: 'RightToLeft',iconCss: 'sf-icon-right-left' }, { text: 'Left To Right', value: 'LeftToRight',iconCss: 'sf-icon-left-right'}
        ];
        return gradientDirections;
    };
    DropDownDataSources.prototype.lineTypes = function()
    {
        var lineTypes = [
            { text: 'Straight', value: 'Straight' }, { text: 'Orthogonal', value: 'Orthogonal' },
            { text: 'Bezier', value: 'Bezier' }
        ];
        return lineTypes;
    };
    DropDownDataSources.prototype.decoratorList = function()
    {
        var decoratorList = [
            { text: 'None', value: 'None' },
            { text: 'Arrow', value: 'Arrow' },
            { text: 'Diamond', value: 'Diamond' },
            { text: 'Open Arrow', value: 'OpenArrow' },
            { text: 'Circle', value: 'Circle' },
            { text: 'Square', value: 'Square' },
            { text: 'Fletch', value: 'Fletch' },
            { text: 'Open Fetch', value: 'OpenFetch' },
            { text: 'Indented Arrow', value: 'IndentedArrow' },
            { text: 'Outdented Arrow', value: 'OutdentedArrow' },
            { text: 'Double Arrow', value: 'DoubleArrow' }
        ];
        return decoratorList;
    };
    DropDownDataSources.prototype.fontFamilyList = function()
    {
        var fontFamilyList = [
            { text: 'Arial', value: 'Arial' },
            { text: 'Aharoni', value: 'Aharoni' },
            { text: 'Bell MT', value: 'Bell MT' },
            { text: 'Fantasy', value: 'Fantasy' },
            { text: 'Times New Roman', value: 'Times New Roman' },
            { text: 'Segoe UI', value: 'Segoe UI' },
            { text: 'Verdana', value: 'Verdana' },
        ];
        return fontFamilyList;
    };
    DropDownDataSources.prototype.textPositionDataSource = function()
    {
        var textPosition = [
            { text: 'Top Left', value: 'TopLeft' }, { text: 'Top Center', value: 'TopCenter' },
            { text: 'Top Right', value: 'TopRight' }, { text: 'Middle Left', value: 'MiddleLeft' },
            { text: 'Center', value: 'Center' }, { text: 'Middle Right', value: 'MiddleRight' },
            { text: 'Bottom Left', value: 'BottomLeft' }, { text: 'Bottom Center', value: 'BottomCenter' },
            { text: 'Bottom Right', value: 'BottomRight' },
        ];
        return textPosition;
    };
    DropDownDataSources.prototype.toolbarItems = function()
    {
        let items = [
            { prefixIcon: 'sf-icon-undo tb-icons', tooltipText: 'Undo',cssClass: 'tb-item-start tb-item-undo' },
            { prefixIcon: 'sf-icon-redo tb-icons', tooltipText: 'Redo',cssClass: 'tb-item-end tb-item-redo' },
                            { type: 'Separator',},
            { prefixIcon: 'sf-icon-pan', tooltipText: 'Pan Tool',cssClass:'tb-item-start pan-item'},
            { prefixIcon: 'sf-icon-pointer', tooltipText: 'Select Tool',cssClass:'tb-item-middle tb-item-selected'},
            { tooltipText: 'Change Connector Type',template: '<button id="conTypeBtn" style="width:100%;"></button>',cssClass:'tb-item-middle'},
            { prefixIcon: 'sf-icon-text', tooltipText: 'Text Tool',cssClass:'tb-item-end' },
                            // { type: 'Separator',template:'<div style="margin-left:70px;"></div>'},
            { prefixIcon: 'sf-icon-group', tooltipText:'Group',align:'Center',visible:false ,  cssClass: 'tb-item-start tb-item-align-category'},
                            { type: 'Separator', visible: false,align:'Center',visible:false },
            {
                prefixIcon: 'sf-icon-align_left', tooltipText: 'Align Left',align:'Center',visible:false ,    cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-align_center', tooltipText: 'Align Center',align:'Center',visible:false ,   cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-align_right', tooltipText: 'Align Right',align:'Center',visible:false ,    cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-align_top', tooltipText: 'Align Top',align:'Center',visible:false ,   cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-align_middle', tooltipText: 'Align Middle',align:'Center',visible:false ,  cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-align_bottom', tooltipText: 'Align Bottom',align:'Center',visible:false ,   cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-distribute_horizontal', tooltipText: 'Distribute Objects Vertically',align:'Center',visible:false ,   cssClass: 'tb-item-middle tb-item-space-category'
            },
            {
                prefixIcon: 'sf-icon-distribute_vertical', tooltipText: 'Distribute Objects Horizontally',align:'Center',visible:false ,    cssClass: 'tb-item-middle tb-item-space-category'
            },
                        { type: 'Separator', visible: false,align:'Center',visible:false ,   },
            { prefixIcon: 'sf-icon-bring-forward', tooltipText: 'Bring Forward',align:'Center', visible:false ,    cssClass: 'tb-item-start tb-item-lock-category'},
            { prefixIcon: 'sf-icon-bring-to-front', tooltipText: 'Bring To Front',align:'Center',visible:false ,     cssClass: 'tb-item-middle tb-item-lock-category'},
            { prefixIcon: 'sf-icon-send-backward', tooltipText: 'Send Backward',align:'Center',visible:false ,     cssClass: 'tb-item-middle tb-item-lock-category'},
            { prefixIcon: 'sf-icon-send-to-back', tooltipText: 'Send To Back',align:'Center', visible:false ,    cssClass: 'tb-item-end tb-item-lock-category'},
                            { type: 'Separator', visible: false,align:'Center',visible:false ,   },
            {prefixIcon: 'sf-icon-Lock tb-icons', tooltipText: 'Lock',align:'Center',visible:false ,     cssClass: 'tb-item-start tb-item-lock-category'}, 
            { prefixIcon: 'sf-icon-delete', tooltipText: 'Delete',align:'Center',visible:false ,   cssClass: 'tb-item-end tb-item-lock-category'},
                            { type: 'Separator', visible: false,align:'Center'},
            {
                cssClass: 'tb-item-end tb-zoom-dropdown-btn',tooltipText:'Zoom', template: '<button id="btnZoomIncrement"></button>',align:'Right'
            },
            { prefixIcon: 'sf-icon-properties' , tooltipText: 'Hide/Show property',template:'<button id="hideProperty" onClick="hideClicked()"></button>',align:'Right'}
        ];
        return items;
    };
    DropDownDataSources.prototype.borderTypeList = function()
    {
        let borderTypes = [
            {text: 'Solid', value:'Solid'},
            {text:'Gradient',value:'Gradient'}
        ]
        return borderTypes;
    };
    return DropDownDataSources;
}());