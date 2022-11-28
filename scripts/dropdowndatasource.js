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
            { text: 'Show Page Breaks',iconCss: 'sf-icon-check-tick'},
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
            { text: 'BMP', value: 'BMP' }, { text: 'SVG', value: 'SVG' }
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
    DropDownDataSources.prototype.gradientDirections = function()
    {
        var gradientDirections = [
            { text: 'BottomToTop', value: 'BottomToTop' }, { text: 'TopToBottom', value: 'TopToBottom' },
            { text: 'RightToLeft', value: 'RightToLeft' }, { text: 'LeftToRight', value: 'LeftToRight' }
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
            { text: 'OpenArrow', value: 'OpenArrow' },
            { text: 'Circle', value: 'Circle' },
            { text: 'Square', value: 'Square' },
            { text: 'Fletch', value: 'Fletch' },
            { text: 'OpenFetch', value: 'OpenFetch' },
            { text: 'IndentedArrow', value: 'IndentedArrow' },
            { text: 'OutdentedArrow', value: 'OutdentedArrow' },
            { text: 'DoubleArrow', value: 'DoubleArrow' }
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
            { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
            { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
            { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
            { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
            { text: 'BottomRight', value: 'BottomRight' },
        ];
        return textPosition;
    };
    DropDownDataSources.prototype.toolbarItems = function()
    {
        let items = [
            { prefixIcon: 'sf-icon-undo tb-icons', tooltipText: 'Undo',cssClass: 'tb-item-start tb-item-undo' },
            { prefixIcon: 'sf-icon-redo tb-icons', tooltipText: 'Redo',cssClass: 'tb-item-end tb-item-redo' },
                            { type: 'Separator' },
            { prefixIcon: 'sf-icon-pan', tooltipText: 'Pan Tool',cssClass:'tb-item-start'},
            { prefixIcon: 'sf-icon-pointer', tooltipText: 'Select Tool',cssClass:'tb-item-middle tb-item-selected'},
            { tooltipText: 'Change Connector Type',template: '<button id="conTypeBtn" style="width:100%;"></button>',cssClass:'tb-item-middle'},
            { prefixIcon: 'sf-icon-text', tooltipText: 'Text Tool',cssClass:'tb-item-end' },
                            { type: 'Separator',template:'<div style="margin-left:70px;"></div>'},
            { prefixIcon: 'sf-icon-group', tooltipText:'Group', template: '<div></div>', cssClass: 'tb-item-start tb-item-align-category'},
                            { type: 'Separator', visible: false },
            {
                prefixIcon: 'sf-icon-align_left', tooltipText: 'Align Left',  template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-align_center', tooltipText: 'Align Center',  template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-align_right', tooltipText: 'Align Right',  template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-align_top', tooltipText: 'Align Top', template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-align_middle', tooltipText: 'Align Middle', template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-align_bottom', tooltipText: 'Align Bottom', template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
            },
            {
                prefixIcon: 'sf-icon-distribute_horizontal', tooltipText: 'Distribute Objects Vertically', template: '<div></div>', cssClass: 'tb-item-middle tb-item-space-category'
            },
            {
                prefixIcon: 'sf-icon-distribute_vertical', tooltipText: 'Distribute Objects Horizontally',  template: '<div></div>', cssClass: 'tb-item-middle tb-item-space-category'
            },
                        { type: 'Separator', visible: false },
            //{ tooltipText: 'OrderCommands',template: '<button id="orderBtn" style="width:100%;"></button>',cssClass: 'tb-item-end tb-item-order tb-dropdown-btn-icon',visible:false},
            { prefixIcon: 'sf-icon-bring-forward', tooltipText: 'Bring Forward', template: '<div></div>', cssClass: 'tb-item-start tb-item-lock-category'},
            { prefixIcon: 'sf-icon-bring-to-front', tooltipText: 'Bring To Front', template: '<div></div>', cssClass: 'tb-item-middle tb-item-lock-category'},
            { prefixIcon: 'sf-icon-send-backward', tooltipText: 'Send Backward', template: '<div></div>', cssClass: 'tb-item-middle tb-item-lock-category'},
            { prefixIcon: 'sf-icon-send-to-back', tooltipText: 'Send To Back', template: '<div></div>', cssClass: 'tb-item-end tb-item-lock-category'},
                            { type: 'Separator', visible: false },
            {prefixIcon: 'sf-icon-Lock tb-icons', tooltipText: 'Lock', template: '<div></div>', cssClass: 'tb-item-start tb-item-lock-category'}, 
            { prefixIcon: 'sf-icon-delete', tooltipText: 'Delete',  template: '<div></div>', cssClass: 'tb-item-end tb-item-lock-category'},
                            { type: 'Separator', visible: false },
            { prefixIcon: 'sf-icon-fil_colour', tooltipText: 'Fill Color',  template: '<div></div>',cssClass: 'tb-item-start tb-item-stroke' },
            { prefixIcon: 'sf-icon-font-color', tooltipText: 'Font Color', template: '<div></div>',cssClass: 'tb-item-end tb-item-stroke'},
                            { type: 'Separator', visible: false },
                        {
                            type: 'Separator',template:'<div style="margin-left:200px;"></div>'
                        },
            {
                cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>'
            },
                            {
                                type: 'Separator'
                            },
            { prefixIcon: 'sf-icon-properties' , tooltipText: 'Hide property',template:'<button id="hideProperty"></button>'}
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