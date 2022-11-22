var UtilityMethods = (function () {
    function UtilityMethods() {
    };
    UtilityMethods.prototype.toolbarClick = function(args)
    {
        let item = args.item.tooltipText;
        var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
        switch(item)
        {
            case 'Undo':
                diagram.undo();
                break;
            case 'Redo':
                diagram.redo();
                break;
            case 'Zoom In(Ctrl + +)':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Zoom Out(Ctrl + -)':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Lock':
                lockObject();
                break;
            case 'Cut':
                diagram.cut();
                break;
            case 'Copy':
                diagram.copy();
                break;
            case 'Paste':
                diagram.paste();
                break;
            case'Delete':
                diagram.remove();
                break;
            case 'Select Tool':
                diagram.tool = ej.diagrams.DiagramTools.Default;
                break;
            case 'Pan Tool':
                diagram.tool = ej.diagrams.DiagramTools.ZoomPan;
                break;
            case 'Rotate Clockwise':
                diagram.rotate(diagram.selectedItems,90);
                break;
            case 'Rotate Counter-clockwise':
                diagram.rotate(diagram.selectedItems,-90);
                break;
            case 'Bring To Front':
                diagram.bringToFront();
                break;
            case 'Send To Back':
                diagram.sendToBack();
                break;
            case 'Bring Forward':
                diagram.moveForward();
                break;
            case 'Send Backward':
                diagram.sendBackward();
                break;
            case 'New Diagram':
                diagram.clear();
                DiagramClientSideEvents.prototype.historyChange();
                break;
            case 'Print Diagram':
                printDialog.show();
                break;
            case 'Save Diagram':
                this.download(diagram.saveDiagram());
                break;
            case 'Open Diagram':
                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                break;
            case 'Flip Vertical':
                flipObjects(item);
                break;
            case 'Flip Horizontal':
                flipObjects(item);
                break;
        }
        if (item === 'Select Tool' || item === 'Pan Tool' || item === 'Connector Tool') {
            if (args.item.cssClass.indexOf('tb-item-selected') === -1) {
                this.removeSelectedToolbarItem();
                args.item.cssClass += ' tb-item-selected';
            }
        }
        diagram.dataBind();
     };
    UtilityMethods.prototype.menuClick = function(args)
    {
        var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
        if (buttonElement) {
            buttonElement.classList.remove('e-btn-hover');
        }
        var option = args.item.text;
        switch(option)
        {
            case 'New':
                diagram.clear();
                DiagramClientSideEvents.prototype.historyChange();
                break;
            case 'Save':
                this.download(diagram.saveDiagram());
                break;
            case 'Print':
                printSettings.pageHeight = pageSettings.pageHeight;
                printSettings.pageWidth = pageSettings.pageWidth;
                printSettings.paperSize = pageSettings.paperSize;
                printSettings.isPortrait = pageSettings.isPortrait;
                printSettings.isLandscape = !pageSettings.isPortrait;
                printDialog.show();
                break;
            case 'Export':
                exportDialog.show();
                break;
            case 'JPG':
            case 'PNG':
            case 'BMP':
            case 'SVG':
                this.onselectExport(args);
                break;
            case 'Open':
                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                break;
            case 'Undo':
                diagram.undo();
                break;
            case 'Redo':
                diagram.redo();
                break;
            case 'Cut':
                diagram.cut();
                pasteClick();
                break;
            case 'Copy':
                diagram.copy();
                pasteClick();
                break;
            case 'Paste':
                diagram.paste();
                break;
            case 'Rotate Right 90':
                diagram.rotate(diagram.selectedItems,90);
                break;
            case 'Rotate Left 90':
                diagram.rotate(diagram.selectedItems,-90);
                break;
            case 'Flip Vertical':
                flipObjects(option);
                break;
            case 'Flip Horizontal':
                flipObjects(option);
                break;
            case 'Delete':
                diagram.remove();
            case 'Send To Back':
                diagram.sendToBack();
                break;
            case 'Bring To Front':
                diagram.bringToFront();
                break;
            case 'Send Backward':
                diagram.sendBackward();
                break;
            case 'Bring Forward':
                diagram.moveForward();
                break;
            case 'Landscape':
                args.item.parentObj.items[1].iconCss = '';
                args.item.iconCss = 'sf-icon-Selection';
                diagram.pageSettings.orientation = 'Landscape';
                pagePortrait.checked = false;
                pageLandscape.checked = true;
                break;
            case 'Portrait':
                args.item.parentObj.items[0].iconCss = '';
                args.item.iconCss = 'sf-icon-Selection';
                diagram.pageSettings.orientation = 'Portrait';
                pagePortrait.checked = true;
                pageLandscape.checked = false;
                break;
            case 'Letter (8.5 in x 11 in)':
            case 'Legal (8.5 in x 14 in)':
            case 'A3 (297 mm x 420 mm)':
            case 'A4 (210 mm x 297 mm)':
            case 'A5 (148 mm x 210 mm)':
            case 'A6 (105 mm x 148 mm)':
            case 'Tabloid (279 mm x 432 mm)':
                this.paperListChange(args)
                pageSettingsList.text = args.item.text;
                this.updateSelection(args.item)
                break;
            case 'Select All':
                diagram.clearSelection();
                diagram.selectAll();
                break;
            case 'Select All Nodes':
                diagram.clearSelection();
                diagram.select(diagram.nodes);
                break;
            case 'Select All Connectors':
                diagram.clearSelection();
                diagram.select(diagram.connectors);
                break;
            case 'Deselect All':
                diagram.clearSelection();
                break;
            case 'Selection Tool':
                diagram.tool = ej.diagrams.DiagramTools.Default;
                this.removeSelectedToolbarItem();
                break;
            case 'Pan Tool':
                diagram.clearSelection();
                diagram.tool = ej.diagrams.DiagramTools.ZoomPan;
                this.removeSelectedToolbarItem();
                break;
            case 'Orthogonal':
                diagram.clearSelection();
                diagram.drawingObject.sourceID = '';
                diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
                diagram.selectedItems.userHandles = [];
                diagram.drawingObject.type = 'Orthogonal';
                this.removeSelectedToolbarItem();
                break;
            case 'Straight':
                diagram.clearSelection();
                diagram.drawingObject.sourceID = '';
                diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
                diagram.selectedItems.userHandles = [];
                diagram.drawingObject.type = 'Straight';
                this.removeSelectedToolbarItem();
                break;
            case 'Bezier':
                diagram.clearSelection();
                diagram.drawingObject.sourceID = '';
                diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
                diagram.selectedItems.userHandles = [];
                diagram.drawingObject.type = 'Bezier';
                this.removeSelectedToolbarItem();
                break;
            case 'Show Lines':
                diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.ShowLines;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'Snap To Grid':
                diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToLines;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'Snap To Object':
                diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToObject;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'Show Ruler':
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
                break;
            case 'Show Page Breaks':
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                diagram.pageSettings.showPageBreaks = !diagram.pageSettings.showPageBreaks;
                showPageBreaks.checked = !showPageBreaks.checked;
                break;
            case 'Show Multiple page':
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                diagram.pageSettings.multiplePage = ! diagram.pageSettings.multiplePage;
                break;
            case 'Fit To Width':
                diagram.fitToPage({mode:'Width'});
                break;
            case 'Fit To Page':
                diagram.fitToPage({ mode: 'Page', region: 'Content'});
                break;
        }
        if (option === 'Pan Tool') {
            if (toolbarObj.items[17].cssClass.indexOf('tb-item-selected') === -1) {
                toolbarObj.items[17].cssClass += ' tb-item-selected';
            }
        }
       else if (option === 'Selection Tool') {
            if (toolbarObj.items[18].cssClass.indexOf('tb-item-selected') === -1) {
                toolbarObj.items[18].cssClass += ' tb-item-selected';
            }
        }
        else if (option ===  'Orthogonal' || option === 'Straight' || option === 'Bezier') {
            document.getElementById('conTypeBtn').classList.add('tb-item-selected');
        }
        diagram.dataBind();
    };
    UtilityMethods.prototype.onClickDisable = function(args)
    {
        if(args === false)
        {
            toolbarObj.items[9].disabled = false;toolbarObj.items[10].disabled = false;
            toolbarObj.items[21].disabled = false;toolbarObj.items[22].disabled = false;
            toolbarObj.items[24].disabled = false;toolbarObj.items[25].disabled = false;
            toolbarObj.items[27].disabled = false;toolbarObj.items[28].disabled = false;
            toolbarObj.items[29].disabled = false;toolbarObj.items[30].disabled = false;
            toolbarObj.items[32].disabled = false;toolbarObj.items[33].disabled = false;
        }
        else if(args === true ){
            var isTrue;
            if(diagram.selectedItems.connectors.length>0){
                isTrue = false;
            }
            else{
                isTrue = true;
            }
            toolbarObj.items[9].disabled = isTrue;toolbarObj.items[10].disabled = isTrue;
            toolbarObj.items[21].disabled = isTrue;toolbarObj.items[22].disabled = isTrue;
            toolbarObj.items[24].disabled = isTrue;toolbarObj.items[25].disabled = isTrue;
            toolbarObj.items[27].disabled = isTrue;toolbarObj.items[28].disabled = isTrue;
            toolbarObj.items[29].disabled = isTrue;toolbarObj.items[30].disabled = isTrue;
            toolbarObj.items[32].disabled = isTrue;toolbarObj.items[33].disabled = isTrue;
            }
    };
    UtilityMethods.prototype.download = function(data)
    {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
            window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
        }
        else {
            var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
            var a = document.createElement('a');
            a.href = dataStr;
            a.download = document.getElementById('diagramName').innerHTML+'.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    };
    UtilityMethods.prototype.updateSelection = function(item)
    {
        for(i=0;i<item.parentObj.items.length;i++)
        {
            if(item.text === item.parentObj.items[i].text){
                item.parentObj.items[i].iconCss = 'sf-icon-Selection';
            }
            else{
                item.parentObj.items[i].iconCss = '';
            }
        }
    };
    UtilityMethods.prototype.onselectExport = function(args)
    {
        exportFormat.value = args.item.text;
        exportDialog.show();
    }
    UtilityMethods.prototype.onConnectorSelect = function(args)
    {
        diagram.clearSelection();
        diagram.drawingObject.sourceID = '';
        diagram.drawingObject.type = args.item.text;
        diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
        diagram.selectedItems.userHandles = [];
        diagram.dataBind();
        this.removeSelectedToolbarItem();
        document.getElementById('conTypeBtn').classList.add('tb-item-selected');
    }
    UtilityMethods.prototype.removeSelectedToolbarItem = function()
    {
        for (var i = 0; i < toolbarObj.items.length; i++) {
            var item = toolbarObj.items[i];
            if (item.cssClass.indexOf('tb-item-selected') !== -1) {
                item.cssClass = item.cssClass.replace(' tb-item-selected', '');
            }
        }
        toolbarObj.dataBind();
        document.getElementById('conTypeBtn').classList.remove('tb-item-selected');
    };
    UtilityMethods.prototype.getPaperSize = function(args)
    {
        var paperSize = new PaperSize();
        switch (args) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A0':
                paperSize.pageWidth = 3179;
                paperSize.pageHeight = 4494;
                break;
             case 'A1':
                paperSize.pageWidth = 2245;
                paperSize.pageHeight = 3179;
                break;
             case 'A2':
                paperSize.pageWidth = 1587;
                paperSize.pageHeight = 2245;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize
    };
    UtilityMethods.prototype.paperListChange = function(args)
    {
        document.getElementById('pageDimension').style.display = 'none';
        document.getElementById('pageOrientation').style.display = '';
        var value = args.value || args.item.value;
        var paperSize = this.getPaperSize(value);
        var pageWidth = paperSize.pageWidth;
        var pageHeight = paperSize.pageHeight;
        if (pageWidth && pageHeight) {
            if (diagram.pageSettings.orientation === 'Portrait') {
                if (pageWidth > pageHeight) {
                    var temp = pageWidth;
                    pageWidth = pageHeight;
                    pageHeight = temp;
                }
            }
            else {
                if (pageHeight > pageWidth) {
                    var temp = pageHeight;
                    pageHeight = pageWidth;
                    pageWidth = temp;
                }
            }
            diagram.pageSettings.width = pageWidth;
            diagram.pageSettings.height = pageHeight;
        }
        else{
            document.getElementById('pageOrientation').style.display = 'none';
            document.getElementById('pageDimension').style.display = '';
            diagram.pageSettings.width = 1460;
            diagram.pageSettings.height = 600;
        }
        this.updatePaperSelection(designContextMenu.items[1],args.value);
        diagram.dataBind();
    };
    UtilityMethods.prototype.pageOrientationChange = function(args)
    {
        if (args.event) {
            var target = args.event.target;
            var items = designContextMenu.items;
            switch (target.id) {
                case 'pagePortrait':
                    diagram.pageSettings.isPortrait = true;
                    diagram.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                    items[0].items[0].iconCss = '';
                    items[0].items[1].iconCss = 'sf-icon-Selection';
                    break;
                case 'pageLandscape':
                    diagram.pageSettings.isPortrait = false;
                    diagram.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                    items[0].items[0].iconCss = 'sf-icon-Selection';
                    items[0].items[1].iconCss = '';
                    break;
            }
            diagram.dataBind();
            // selectedItem.pageSettings.pageWidth = diagram.pageSettings.width;
            // selectedItem.pageSettings.pageHeight = diagram.pageSettings.height;
        }
    };
    UtilityMethods.prototype.pageDimensionChange = function(args)
    {
        if (args.event) {
            var pageWidth = Number(diagram.pageSettings.width);
            var pageHeight = Number(diagram.pageSettings.height);
            var target = args.event.target;
            if (target.tagName.toLowerCase() === 'span') {
                target = target.parentElement.children[0];
            }
            if (target.id === 'pageWidth') {
                pageWidth = Number(target.value.replace(/,/g, ''));
            }
            else {
                pageHeight = Number(target.value.replace(/,/g, ''));
            }
            if (pageWidth && pageHeight) {
                if (pageWidth > pageHeight) {
                    diagram.pageSettings.isPortrait = false;
                    diagram.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                }
                else {
                    diagram.pageSettings.isPortrait = true;
                    diagram.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                }
                 diagram.pageSettings.width = pageWidth;
                 diagram.pageSettings.height = pageHeight;
                diagram.dataBind();
            }
        }
    };
    UtilityMethods.prototype.pageBackgroundChange1= function(args)
    {
        if (args.currentValue) {
            diagram.pageSettings.background = {
                color: args.currentValue.rgba
            };
            // document.getElementById('background').style.display = 'none';
            diagram.dataBind();
        }
    };
    UtilityMethods.prototype.pageBreaksChange = function(args)
    {
        if (args.event) {
            diagram.pageSettings.showPageBreaks = args.checked;
            diagram.dataBind();
            var items = btnViewMenu.items;
            items[4].iconCss = items[4].iconCss ? '' : 'sf-icon-Selection';
        }
    };
    UtilityMethods.prototype.updatePaperSelection = function(items,value)
    {
        for(i=0;i<items.items.length;i++)
        {
         if(value === items.items[i].value){
             items.items[i].iconCss = 'sf-icon-Selection';
         }
         else{
             items.items[i].iconCss = '';
         }
        }
    };
    UtilityMethods.prototype.updateTextAlign= function(textAlign)
    {
        var toolbarTextSubAlignment = document.getElementById('toolbarTextSubAlignment');
        if (toolbarTextSubAlignment) {
            toolbarTextSubAlignment = toolbarTextSubAlignment.ej2_instances[0];
        }
        if (toolbarTextSubAlignment) {
            for (var i = 0; i < toolbarTextSubAlignment.items.length; i++) {
                toolbarTextSubAlignment.items[i].cssClass = toolbarTextSubAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = textAlign === 'Left' ? 0 : (textAlign === 'Center' ? 1 : 2);
            toolbarTextSubAlignment.items[index].cssClass = toolbarTextSubAlignment.items[index].cssClass + ' tb-item-selected';
        }
    };
    UtilityMethods.prototype.updateTextProperties = function(propertyName, propertyValue, annotation)
    {
        switch (propertyName) {
            case 'bold':
                annotation.bold = !annotation.bold;
                this.updateToolbarState('toolbarTextStyle', annotation.bold, 0);
                break;
            case 'italic':
                annotation.italic = !annotation.italic;
                this.updateToolbarState('toolbarTextStyle', annotation.italic, 1);
                break;
            case 'underline':
                textProperties.textDecoration = !textProperties.textDecoration;
                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                this.updateToolbarState('toolbarTextStyle', textProperties.textDecoration, 2);
                break;
            case 'aligntextleft':
            case 'aligntextright':
            case 'aligntextcenter':
                annotation.textAlign = propertyValue.toString().replace('AlignText', '');
                this.updateTextAlign(annotation.textAlign);
                break;
        }
    };
    UtilityMethods.prototype.updateTextFontProperties = function(propertyName, annotation)
    {
        switch (propertyName) {
            case 'fontfamily':
                annotation.fontFamily = textProperties.fontFamily.value;
                break;
            case 'fontsize':
                annotation.fontSize = textProperties.fontSize.value;
                break;
            case 'fontcolor':
                annotation.color = this.getColor(textProperties.fontColor.value);
                break;
            case 'opacity':
                annotation.opacity = textProperties.opacity.value / 100;
                document.getElementById("textOpacityText").value = textProperties.opacity.value + '%';
                break;
        }
    };
    UtilityMethods.prototype.updateHorVertAlign = function(horizontalAlignment, verticalAlignment)
    {
        var toolbarHorVerAlignment = document.getElementById('toolbarTextAlignment');
        if (toolbarHorVerAlignment) {
            toolbarHorVerAlignment = toolbarHorVerAlignment.ej2_instances[0];
        }
        if (toolbarHorVerAlignment) {
            for (var i = 0; i < toolbarHorVerAlignment.items.length; i++) {
                toolbarHorVerAlignment.items[i].cssClass = toolbarHorVerAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = horizontalAlignment === 'Right' ? 0 : (horizontalAlignment === 'Center' ? 1 : 2);
            toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
            index = verticalAlignment === 'Bottom' ? 3 : (verticalAlignment === 'Center' ? 4 : 5);
            toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
        }
    };
    UtilityMethods.prototype.getPosition = function(offset)
    {
        if (offset.x === 0 && offset.y === 0) {
            return 'TopLeft';
        }
        else if (offset.x === 0.5 && offset.y === 0) {
            return 'TopCenter';
        }
        else if (offset.x === 1 && offset.y === 0) {
            return 'TopRight';
        }
        else if (offset.x === 0 && offset.y === 0.5) {
            return 'MiddleLeft';
        }
        else if (offset.x === 1 && offset.y === 0.5) {
            return 'MiddleRight';
        }
        else if (offset.x === 0 && offset.y === 1) {
            return 'BottomLeft';
        }
        else if (offset.x === 0.5 && offset.y === 1) {
            return 'BottomCenter';
        }
        else if (offset.x === 1 && offset.y === 1) {
            return 'BottomRight';
        }
        else {
            return 'Center';
        }
    };
    UtilityMethods.prototype.getHexColor = function(colorStr)
    {
        var a = document.createElement('div');
        a.style.color = colorStr;
        var colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(function (a) {
            return parseInt(a, 10);
        });
        document.body.removeChild(a);
        return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
    };
    UtilityMethods.prototype.getColor = function(colorName)
    {
        if (window.navigator.msSaveBlob && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    };
    UtilityMethods.prototype.getOffset = function(position)
    {
        switch (position.toLowerCase()) {
            case 'topleft':
                return { x: 0, y: 0 };
            case 'topcenter':
                return { x: 0.5, y: 0 };
            case 'topright':
                return { x: 1, y: 0 };
            case 'middleleft':
                return { x: 0, y: 0.5 };
            default:
                return { x: 0.5, y: 0.5 };
            case 'middleright':
                return { x: 1, y: 0.5 };
            case 'bottomleft':
                return { x: 0, y: 1 };
            case 'bottomcenter':
                return { x: 0.5, y: 1 };
            case 'bottomright':
                return { x: 1, y: 1 };
        }
    }
    UtilityMethods.prototype.updateToolbarState = function(toolbarName, isSelected, index)
    {
        var toolbarTextStyle = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            var cssClass = toolbarTextStyle.items[index].cssClass;
            toolbarTextStyle.items[index].cssClass = isSelected ? cssClass + ' tb-item-selected' : cssClass.replace(' tb-item-selected', '');
            toolbarTextStyle.dataBind();
        }
    };
    UtilityMethods.prototype.applyNodeStyle = function(propertyName, node, value)
    {
        var addInfo = node.addInfo || {};
        switch (propertyName) {
            case 'fillcolor':
                node.style.fill = this.getColor(value);
                // nodeFillColor.value = nodeProperties.fillColor;
                if (value && value.checked) {
                    NodeProperties.prototype.getGradient(node);
                }
                break;
            case 'strokecolor':
                node.style.strokeColor = this.getColor(nodeProperties.strokeColor.value);
                break;
            case 'strokewidth':
                node.style.strokeWidth = nodeProperties.strokeWidth.value;
                break;
            case 'strokestyle':
                node.style.strokeDashArray = nodeProperties.strokeStyle.value;
                break;
            case 'opacity':
                node.style.opacity = nodeProperties.opacity.value / 100;
                document.getElementById("nodeOpacitySliderText").value = nodeProperties.opacity.value + '%';
                break;
            case 'gradient':
                if (value && !value.checked) {
                    node.style.gradient.type = 'None';
                }
                else {
                    NodeProperties.prototype.getGradient(node);
                }
                break;
            case 'gradientdirection':
            case 'gradientcolor':
                NodeProperties.prototype.getGradient(node);
                break;
        }
    };
    UtilityMethods.prototype.toolbarInsertClick = function(args)
    {
        var commandType = args.item.tooltipText.replace(/[' ']/g, '');
        if (diagram.selectedItems.nodes.length > 0) {
            switch (commandType.toLowerCase()) {
                case 'insertlink':
                    document.getElementById('hyperlink').value = '';
                    document.getElementById('hyperlinkText').value = '';
                    if (diagram.selectedItems.nodes[0].annotations.length > 0) {
                        var annotation = diagram.selectedItems.nodes[0].annotations[0];
                        if (annotation.hyperlink.link || annotation.content) {
                            document.getElementById('hyperlink').value = annotation.hyperlink.link;
                            document.getElementById('hyperlinkText').value = annotation.hyperlink.content || annotation.content;
                        }
                    }
                    hyperlinkDialog.show();
                    break;
            }
        }
    };
    UtilityMethods.prototype.getDialogButtons = function(dialogType)
    {
        var buttons= [];
        switch (dialogType) {
            case 'export':
                buttons.push({
                    click: this.btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'print':
                buttons.push({
                    click: this.btnPrintClick.bind(this),
                    buttonModel: { content: 'Print', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'hyperlink':
                buttons.push({
                    click: this.btnHyperLink.bind(this),
                    buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break; 
        }
        buttons.push({
            click: this.btnCancelClick.bind(this),
            buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
        });
        return buttons;
    };
    UtilityMethods.prototype.btnHyperLink = function()
    {
        var node = diagram.selectedItems.nodes[0];
    if (node.annotations.length > 0) {
        node.annotations[0].hyperlink.link = document.getElementById('hyperlink').value;
        node.annotations[0].hyperlink.content = document.getElementById('hyperlinkText').value;
        this.applyToolTipforHyperlink(node);
        diagram.dataBind();
    } else {
        var annotation = {
            hyperlink: {
                content: document.getElementById('hyperlinkText').value,
                link: document.getElementById('hyperlink').value
            }
        };
        diagram.addLabels(node, [annotation]);
        this.applyToolTipforHyperlink(node);
        diagram.dataBind();
    }
    hyperlinkDialog.hide();
    };
    UtilityMethods.prototype.applyToolTipforHyperlink = function(node)
    {
        node.constraints = ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.InheritTooltip | ej.diagrams.NodeConstraints.Tooltip;
        node.tooltip = {
            content: node.annotations[0].hyperlink.link, relativeMode: 'Object',
            position: 'TopCenter', showTipPointer: true,
        };
    };
    UtilityMethods.prototype.btnPrintClick = function()
    {
        var pageWidth = printSettings.pageWidth;
        var pageHeight = printSettings.pageHeight;
        var paperSize = this.getPaperSize(printSettings.paperSize);
        if (paperSize.pageHeight && paperSize.pageWidth) {
            pageWidth = paperSize.pageWidth;
            pageHeight = paperSize.pageHeight;
        }
        if (pageSettings.isPortrait) {
            if (pageWidth > pageHeight) {
                var temp = pageWidth;
                pageWidth = pageHeight;
                pageHeight = temp;
            }
        } else {
            if (pageHeight > pageWidth) {
                var temp1 = pageHeight;
                pageHeight = pageWidth;
                pageWidth = temp1;
            }
        }
        diagram.print({
            region: printRegionDropdown.value, pageHeight: pageHeight, pageWidth: pageWidth,
            multiplePage: printMultiplePage.checked,
            pageOrientation:printPortrait.checked ? 'Portrait' : 'Landscape'
        });
        printDialog.hide();
    };
    UtilityMethods.prototype.btnExportClick = function()
    {
        diagram.exportDiagram({
            fileName: document.getElementById("exportfileName").value,
            format: exportFormat.value,
            region: exportRegion.value
        });
        exportDialog.hide();
    };
    UtilityMethods.prototype.btnCancelClick = function(args)
    {
        var ss = args.target;
        var key = ss.offsetParent.id;
        switch (key) {
            case 'exportDialog':
                exportDialog.hide();
                break;
            case 'printDialog':
                printDialog.hide();
                break;
            case 'hyperlinkDialog':
                hyperlinkDialog.hide();
                break;
        }
    };
    UtilityMethods.prototype.hideMenuBar = function()
    {
        var expandcollapseicon = document.getElementById('btnHideToolbar');
        var button1 = expandcollapseicon.ej2_instances[0];
        if (button1.iconCss.indexOf('sf-icon-Collapse tb-icons') > -1) {
            button1.iconCss = 'sf-icon-DownArrow2 tb-icons';
        } else {
            button1.iconCss = 'sf-icon-Collapse tb-icons';
        }
        UtilityMethods.prototype.hideElements('hide-menubar', diagram);
    };
    UtilityMethods.prototype.hideElements = function(elementType, diagram)
    {
        var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
        if (diagramContainer.classList.contains(elementType)) {
                diagramContainer.classList.remove(elementType);
        }
        else {
            diagramContainer.classList.add(elementType);
        }
        if (diagram) {
            diagram.updateViewPort();
        }
    };
    return UtilityMethods;
}());