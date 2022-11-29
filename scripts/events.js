var DiagramClientSideEvents = (function () {
    function DiagramClientSideEvents(){
    };
    // var diagram = document.getElementById('diagram').ej2_instances[0];
    DiagramClientSideEvents.prototype.selectionChange = function (args) {
        {
            if(args.state === 'Changed'){
                var multiSelect;
                var selectedItems = diagram.selectedItems.nodes;
                selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
                enableToolbarItems(selectedItems);
                var nodeContainer = document.getElementById('nodePropertyContainer');
                nodeContainer.classList.remove('multiple');
                nodeContainer.classList.remove('connector');
                if(selectedItems.length>0)
                {
                    // toolbarObj.hideItem(18,false);
                    
                }
                if (selectedItems.length > 1) {
                    multiSelect = true;
                    this.multipleSelectionSettings(selectedItems);
                        toolbarObj.items[8].tooltipText = 'Group';
                        toolbarObj.items[8].prefixIcon = 'sf-icon-group';
                        toolbarObj.items[8].template = '';
                    multipleSelection(); 
                    toolbarObj.hideItem(9,false);
                    toolbarObj.hideItem(18,false);
                    toolbarObj.hideItem(23,false);
                    toolbarObj.hideItem(26,true);
                    toolbarObj.hideItem(29,true);
                }
                else if (selectedItems.length === 1) {
                    multiSelect = false;
                    this.singleSelectionSettings(selectedItems[0]);
                    UtilityMethods.prototype.onClickDisable(false);
                    toolbarObj.hideItem(9,true);
                    toolbarObj.hideItem(18,false);
                    toolbarObj.hideItem(23,false);
                    toolbarObj.hideItem(26,false);
                    // toolbarObj.hideItem(29,false);
                    if(selectedItems[0].children && selectedItems[0].children.length>0)
                    {
                        toolbarObj.items[8].tooltipText = 'UnGroup';
                        toolbarObj.items[8].prefixIcon = 'sf-icon-ungroup';
                        toolbarObj.items[8].disabled = false;
                        toolbarObj.items[8].template = '';
                    }
                }
                else {
                    this.objectTypeChange('diagram');
                    UtilityMethods.prototype.onClickDisable(true);
                    toolbarObj.hideItem(9,true);
                    toolbarObj.hideItem(18,true);
                    toolbarObj.hideItem(23,true);
                    toolbarObj.hideItem(26,true);
                    toolbarObj.hideItem(29,true);
                    // toolbarObj.hideItem(18,true);
                    //toolbarObj.hideItem(17,true);
                    // toolbarObj.items[23].template = '<div style="margin-left:345px;"></div>';
                }
                if(args.newValue.length>0 && args.newValue[0] instanceof ej.diagrams.Node){
                    diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All|ej.diagrams.SelectorConstraints.UserHandle, userHandles: handles };
                    // UtilityMethods.prototype.onClickDisable(false);
                    // enable();
                    if(diagram.selectedItems.nodes.length>0){
                        drawingNode = diagram.selectedItems.nodes[diagram.selectedItems.nodes.length-1];
                    }
                }
                else{
                diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All&~ej.diagrams.SelectorConstraints.UserHandle };
                // UtilityMethods.prototype.onClickDisable(true);
                // disable();
                }
            }
        }
    };
    DiagramClientSideEvents.prototype.positionChange = function(args)
    {
        if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
            nodeProperties.offsetX.value = args.newValue.offsetX;
            nodeProperties.offsetY.value = args.newValue.offsetY;
        }
    };
    DiagramClientSideEvents.prototype.sizeChange =function(args)
    {
        if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
            nodeProperties.width.value = args.newValue.width;
            nodeProperties.height.value = args.newValue.height;
            nodeProperties.offsetX.value = args.newValue.offsetX;
            nodeProperties.offsetY.value = args.newValue.offsetY;
            }
    };
    DiagramClientSideEvents.prototype.rotateChange =function(args)
    {
        if(args.state === 'Start' || args.state === 'Progress')
        {
            diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.None};
        }
        if(args.state === 'Completed'){
            diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All|ej.diagrams.SelectorConstraints.UserHandle, userHandles: handles };
        }
        if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
            nodeProperties.rotateAngle.value = args.newValue.rotateAngle;
        }
    };
    DiagramClientSideEvents.prototype.created= function(args)
    {
        diagram.fitToPage({ mode: 'Page', region: 'Content'});
    };
    DiagramClientSideEvents.prototype.getNodeDefaults= function(obj)
    {
        obj.userHandles = [];
        obj.ports = getNodePorts(obj);
        return obj;
    };
    DiagramClientSideEvents.prototype.getConnectorDefaults= function(obj)
    {
        if(obj.annotations.length>0){
            obj.annotations[0].style.fill = 'White'
            }
        return obj;
    };
    DiagramClientSideEvents.prototype.historyChange = function(args)
    {
        var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if (diagram.historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if (diagram.historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
        viewSelectionChange(args)
        // diagram.historyManager.undoStack.length>0?toolbarObj.items[6].disabled = false:toolbarObj.items[6].disabled = true
        // diagram.historyManager.redoStack.length>0?toolbarObj.items[7].disabled = false:toolbarObj.items[7].disabled = true
    };
    DiagramClientSideEvents.prototype.userHandleClick = function(args)
    {
        switch(args.element.name)
        {
            case 'Delete':
                diagram.remove();
                break;
            case 'Clone':
               diagram.paste(diagram.selectedItems.selectedObjects);
               break;
            case 'Draw':
                diagram.drawingObject.shape = {};
                diagram.drawingObject.type = diagram.drawingObject.type?diagram.drawingObject.type:'Orthogonal';
                diagram.drawingObject.sourceID = drawingNode.id;
                diagram.dataBind();
                break;
        }
    }
    DiagramClientSideEvents.prototype.dragEnter = function(obj)
    {
        if(obj.dragItem.type === 'Straight')
        {
            if(obj.dragItem.sourceDecorator && obj.dragItem.sourceDecorator.shape === 'Circle'){
                obj.dragItem.shape = {
                    type: 'Bpmn',
                    flow: 'Message',
                    message: 'InitiatingMessage'
                        }
            }  
        }
    };
    DiagramClientSideEvents.prototype.contextMenuClick = function(args)
    {
        if (diagram.selectedItems.nodes.length > 0 ) {
            var bpmnShape = diagram.selectedItems.nodes[0].shape;
            if (args.item.iconCss.indexOf('e-adhocs') > -1) {
                bpmnShape.activity.subProcess.adhoc = args.item.id === 'AdhocNone' ? false : true;
            }
            if (args.item.iconCss.indexOf("e-event") > -1) {
                bpmnShape.event.event = args.item.id;
            }
            if (args.item.iconCss.indexOf("e-trigger") > -1) {
                bpmnShape.event.trigger = args.item.text;
            }
            if (args.item.iconCss.indexOf("e-loop") > -1) {
                var loop = (args.item.id === 'LoopNone') ? 'None' : args.item.id;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.loop = loop;
                }
                if (bpmnShape.activity.activity === 'SubProcess') {
                    bpmnShape.activity.subProcess.loop = loop;
                }
            }
            if (args.item.iconCss.indexOf("e-compensation") > -1) {
                var compensation = (args.item.id === 'CompensationNone') ? false : true;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.compensation = compensation;
                }
                if (bpmnShape.activity.activity === 'SubProcess') {
                    bpmnShape.activity.subProcess.compensation = compensation;
                }
            }
            if (args.item.iconCss.indexOf('e-call') > -1) {
                var compensations = (args.item.id === 'CallNone') ? false : true;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.call = compensations;
                }
            }
            if (args.item.id === 'CollapsedSubProcess' || args.item.id === 'ExpandedSubProcess') {
                if (args.item.id === 'ExpandedSubProcess') {
                    bpmnShape.activity.activity = 'SubProcess';
                    bpmnShape.activity.subProcess.collapsed = false;
                }
                else {
                    bpmnShape.activity.activity = 'SubProcess';
                    bpmnShape.activity.subProcess.collapsed = true;
                }
            }
            if (args.item.iconCss.indexOf('e-boundry') > -1) {
                call = args.item.id;
                if (args.item.id !== 'Default') {
                    call = (args.item.id === 'BoundryEvent') ? 'Event' : 'Call';
                }
                bpmnShape.activity.subProcess.boundary = call;
            }
            if (args.item.iconCss.indexOf('e-data') > -1) {
                var data = args.item.id === 'DataObjectNone' ? 'None' : args.item.id;
                bpmnShape.dataObject.type = data;
            }
            if (args.item.iconCss.indexOf('e-collection') > -1) {
                var collection = (args.item.id === 'Collectioncollection') ? true : false;
                bpmnShape.dataObject.collection = collection;
            }
            if (args.item.iconCss.indexOf("e-task") > -1) {
                var task = task === 'TaskNone' ? 'None' : args.item.id;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.type = task;
                }
            }
            if (args.item.iconCss.indexOf("e-gate") > -1) {
                var gate = args.item.id.replace('Gateway', '');
                if (bpmnShape.shape === 'Gateway') {
                    bpmnShape.gateway.type = gate;
                }
            }
            diagram.dataBind();
        }
        if(diagram.selectedItems.connectors.length && diagram.selectedItems.connectors[0].shape)
        {
            if(args.item.id === 'Association')
            {
                diagram.selectedItems.connectors[0].shape.flow = 'Association';
                // diagram.selectedItems.connectors[0].shape.sequence = 'Normal';
                // diagram.selectedItems.connectors[0].shape.message = 'Default';
                diagram.selectedItems.connectors[0].shape.association = 'Directional';
            }
            if(args.item.id === 'Sequence')
            {
                diagram.selectedItems.connectors[0].shape.flow = 'Sequence';
                // diagram.selectedItems.connectors[0].shape.association = 'Default';
                // diagram.selectedItems.connectors[0].shape.message = 'Default';
                diagram.selectedItems.connectors[0].shape.sequence = 'Conditional';
                // diagram.selectedItems.connectors[0].style.strokeDashArray = '';
            }
            if(args.item.id === 'MessageFlow')
            {
                diagram.selectedItems.connectors[0].shape.flow = 'Message';
                diagram.selectedItems.connectors[0].shape.message = 'InitiatingMessage';
                // diagram.selectedItems.connectors[0].shape.association = 'Default';
                // diagram.selectedItems.connectors[0].shape.sequence = 'Normal';
            }
            if(args.item.id === 'None')
            {
                diagram.selectedItems.connectors[0].shape.flow === 'Sequence' ? 
                diagram.selectedItems.connectors[0].shape.sequence = 'Default':
                diagram.selectedItems.connectors[0].shape.association = 'Default';
            }
            if(args.item.id === 'Directional' || args.item.id === 'BiDirectional')
            {
                args.item.id === 'Directional' ? 
                diagram.selectedItems.connectors[0].shape.association = 'Directional':
                diagram.selectedItems.connectors[0].shape.association = 'BiDirectional';
            }
            if(args.item.id === 'Conditional' || args.item.id === 'Normal')
            {
                args.item.id === 'Conditional' ? 
                diagram.selectedItems.connectors[0].shape.sequence = 'Conditional':
                diagram.selectedItems.connectors[0].shape.sequence = 'Normal';
            }
        diagram.dataBind();
        }
        if (args.item.id === 'Cut') {
            diagram.cut();
        }if (args.item.id === 'Copy') {
            diagram.copy();
        }if (args.item.id === 'Paste') {
            diagram.paste();
        }if (args.item.id === 'Delete'){
            diagram.remove();
        }
        if (args.item.id === 'SelectAll'){
            diagram.selectAll();
        }
    };
    DiagramClientSideEvents.prototype.contextMenuOpen = function(args)
    {
        var hiddenId = [];
        if (args.element.className !== 'e-menu-parent e-ul ') {
            hiddenId = ['Adhoc', 'Loop', 'taskCompensation', 'Activity-Type', 'Boundry', 'DataObject',
                'collection', 'DeftCall', 'TriggerResult', 'EventType', 'TaskType', 'GateWay','Copy','Paste','Cut','SelectAll','Delete',
            'Association','Sequence','MessageFlow','Condition type','Direction'];
        }
        for (var i = 0; i < args.items.length; i++) {
            if(args.items[i].text === 'Paste')
            {
                if(diagram.commandHandler.clipboardData.pasteIndex !== undefined
                    && diagram.commandHandler.clipboardData.clipObject !==undefined){
                        hiddenId.splice(hiddenId.indexOf(args.items[i].id), 1);
                        
                    }
            }
            if(args.items[i].text === 'Select All')
            {
                if((diagram.nodes.length || diagram.connectors.length))
                {
                    hiddenId.splice(hiddenId.indexOf(args.items[i].id), 1);
                }
            }
            if (diagram.selectedItems.nodes.length || diagram.selectedItems.connectors.length) {
                
                    var item = args.items[i];
                    if(diagram.selectedItems.nodes.length< 1 && diagram.selectedItems.connectors.length)
                    {
                        if(diagram.selectedItems.connectors[0].shape && diagram.selectedItems.connectors[0].shape.type === 'Bpmn')
                        {
                            if(item.text === 'Association' && diagram.selectedItems.connectors[0].shape.flow === 'Association')
                            {
                                hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                                hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                                hiddenId.splice(hiddenId.indexOf('Direction'), 1);
                            }
                            else if(item.text === 'Sequence' && diagram.selectedItems.connectors[0].shape.flow === 'Sequence')
                            {
                                hiddenId.splice(hiddenId.indexOf('Association'), 1);
                                hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                                hiddenId.splice(hiddenId.indexOf('Condition type'), 1);
                            }
                            else if(item.text === 'MessageFlow' && diagram.selectedItems.connectors[0].shape.flow === 'Message')
                            {
                                hiddenId.splice(hiddenId.indexOf('Association'), 1);
                                hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                            }
                        }
                    }
                    
                    if(item.text === 'Cut' || item.text === 'Copy' || item.text === 'Delete')
                        {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }    
    
                    if(diagram.selectedItems.nodes.length){
                    var bpmnShape = diagram.selectedItems.nodes[0].shape;
                    if (bpmnShape.shape !== 'DataObject' && bpmnShape.shape !== 'Gateway') {
                        if (item.text === 'Ad-Hoc') {
                            if (bpmnShape.activity.activity === 'SubProcess') {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Loop' || item.text === 'Compensation' || item.text === 'Activity-Type') {
                            if (bpmnShape.shape === 'Activity') {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Boundry') {
                            if ((bpmnShape.activity.activity === 'SubProcess')) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                    }
                    if (item.text === 'Data Object') {
                        if ((bpmnShape.shape === 'DataObject')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Collection') {
                        if ((bpmnShape.shape === 'DataObject')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Call') {
                        if ((bpmnShape.shape === 'Activity') &&
                            (bpmnShape.activity.activity === 'Task')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Trigger Result') {
                        if ((bpmnShape.shape === 'Event')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Event Type') {
                        if ((bpmnShape.shape === 'Event')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Task Type') {
                        if ((bpmnShape.shape === 'Activity') &&
                            (bpmnShape.activity.activity === 'Task')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'GateWay') {
                        if ((bpmnShape.shape === 'Gateway')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (diagram.selectedItems.nodes.length > 0 && args.parentItem && args.parentItem.id === 'TriggerResult' &&
                        bpmnShape.shape === 'Event') {
                        var shape = bpmnShape;
                        if (item.text !== 'None' && (item.text === shape.event.event ||
                            item.text === shape.event.trigger)) {
                            hiddenId.push(item.id);
                        }
                        if (shape.event.event === 'Start') {
                            if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Link') {
                                hiddenId.push(item.id);
                            }
                        }
                        if (shape.event.event === 'NonInterruptingStart' || item.text === 'Link') {
                            if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' ||
                                item.text === 'Error' || item.text === 'None') {
                                hiddenId.push(item.id);
                            }
                        }
                        if (shape.event.event === 'Intermediate') {
                            if (item.text === 'Terminate') {
                                hiddenId.push(item.id);
                            }
                        }
                        if (shape.event.event === 'NonInterruptingIntermediate') {
                            if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' ||
                                item.text === 'Error' || item.text === 'None' || item.text === 'Link') {
                                hiddenId.push(item.id);
                            }
                        }
                        if (shape.event.event === 'ThrowingIntermediate') {
                            if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Timer' || item.text === 'Error' ||
                                item.text === 'None' || item.text === 'Pareller' || item.text === 'Conditional') {
                                hiddenId.push(item.id);
                            }
                        }
                        if (shape.event.event === 'End') {
                            if (item.text === 'Parallel' || item.text === 'Timer' || item.text === 'Conditional' || item.text === 'Link') {
                                hiddenId.push(item.id);
                            }
                        }
                    }
                    if (diagram.selectedItems.nodes.length > 0 && args.parentItem && args.parentItem.id === 'EventType' &&
                        bpmnShape.shape === 'Event') {
                        if ((item.text === bpmnShape.event.event)) {
                            hiddenId.push(item.id);
                        }
                    }
                }
            }
        }
        updateContextMenuSelection();
        args.hiddenItems = hiddenId;
    };
    DiagramClientSideEvents.prototype.multipleSelectionSettings = function(selectedItems) 
    {
        this.objectTypeChange('None');
        var showConnectorPanel = false, showNodePanel = false;
        var showTextPanel = false, showConTextPanel = false;
        var nodeContainer = document.getElementById('nodePropertyContainer');
        for (var i = 0; i < selectedItems.length; i++) {
            var object = selectedItems[i];
            if (object instanceof ej.diagrams.Node && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
            else if (object instanceof ej.diagrams.Connector && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
        }
        var selectItem1 = diagram.selectedItems;
        if (showNodePanel) {
            nodeContainer.style.display = '';
            nodeContainer.classList.add('multiple');
            if (showConnectorPanel) {
                nodeContainer.classList.add('connector');
            }
            this.bindNodeProperties(selectItem1.nodes[0]);
        }
        if (showConnectorPanel && !showNodePanel) {
            document.getElementById('connectorPropertyContainer').style.display = '';
            this.bindConnectorProperties(selectItem1.connectors[0]);
        }
        if (showTextPanel || showConTextPanel) {
            document.getElementById('textPropertyContainer').style.display = '';
            if (showTextPanel && showConTextPanel) {
                document.getElementById('textPositionDiv').style.display = 'none';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            }
            else {
                document.getElementById('textPositionDiv').style.display = '';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
                if (showConTextPanel) {
                    ddlTextPosition.dataSource = textProperties.getConnectorTextPositions();
                    //selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, selectedItem);
                }
                else {
                    ddlTextPosition.dataSource = textProperties.getNodeTextPositions();
                    //selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, selectedItem);
                }
                ddlTextPosition.dataBind();
            }
        }
    }
    DiagramClientSideEvents.prototype.singleSelectionSettings = function(selectedObject)
    {
        var object = null;
        if (selectedObject instanceof ej.diagrams.Node) {
            this.objectTypeChange('node');
            object = selectedObject;
            this.bindNodeProperties(object);
        }
        else if (selectedObject instanceof  ej.diagrams.Connector) {
            this.objectTypeChange('connector');
            object = selectedObject;
            this.bindConnectorProperties(object);
        }
        if (object.shape && object.shape.type === 'Text') {
            document.getElementById('textPropertyContainer').style.display = '';
            document.getElementById('toolbarTextAlignmentDiv').style.display = 'none';
            document.getElementById('textPositionDiv').style.display = 'none';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            this.bindTextProperties(object.style);
        }
        else if (object.annotations.length > 0 && object.annotations[0].content) {
            document.getElementById('textPropertyContainer').style.display = '';
            var annotation = null;
            document.getElementById('toolbarTextAlignmentDiv').style.display = '';
            document.getElementById('textPositionDiv').style.display = '';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
            this.bindTextProperties(object.annotations[0].style);
            UtilityMethods.prototype.updateHorVertAlign(object.annotations[0].horizontalAlignment, object.annotations[0].verticalAlignment);
            if (object.annotations[0] instanceof ej.diagrams.ShapeAnnotation) {
                annotation = object.annotations[0];
                ddlTextPosition.dataSource = textProperties.getNodeTextPositions();
                ddlTextPosition.value = textProperties.textPosition = null;
                ddlTextPosition.dataBind();
                ddlTextPosition.value = textProperties.textPosition = UtilityMethods.prototype.getPosition(annotation.offset);
                ddlTextPosition.dataBind();
            }
            else if (object.annotations[0] instanceof ej.diagrams.PathAnnotation) {
                annotation = object.annotations[0];
                ddlTextPosition.dataSource = textProperties.getConnectorTextPositions();
                ddlTextPosition.value = textProperties.textPosition = null;
                ddlTextPosition.dataBind();
                ddlTextPosition.value = textProperties.textPosition = annotation.alignment;
                ddlTextPosition.dataBind();
            }
        }
    }
    DiagramClientSideEvents.prototype.objectTypeChange = function(objectType)
    {
        document.getElementById('diagramPropertyContainer').style.display = 'none';
        document.getElementById('nodePropertyContainer').style.display = 'none';
        document.getElementById('textPropertyContainer').style.display = 'none';
        document.getElementById('connectorPropertyContainer').style.display = 'none';
        switch (objectType) {
            case 'diagram':
                document.getElementById('diagramPropertyContainer').style.display = '';
                break;
            case 'node':
                document.getElementById('nodePropertyContainer').style.display = '';
                break;
            case 'connector':
                document.getElementById('connectorPropertyContainer').style.display = '';
                break;
        }
    }
    DiagramClientSideEvents.prototype.bindNodeProperties = function(node)
    {
        nodeProperties.offsetX.value = node.offsetX;
        nodeProperties.offsetY.value = node.offsetY;
        nodeProperties.width.value = node.width;
        nodeProperties.height.value = node.height;
        nodeProperties.rotateAngle.value = node.rotateAngle;
        nodeProperties.rotateAngle.value = node.rotateAngle;
        nodeProperties.fillColor.value = UtilityMethods.prototype.getHexColor(node.style.fill);
        nodeProperties.strokeColor.value = UtilityMethods.prototype.getHexColor(node.style.strokeColor);
        nodeProperties.strokeWidth.value = node.style.strokeWidth;
        nodeProperties.strokeStyle.value = node.style.strokeDashArray ? node.style.strokeDashArray : 'None';
        nodeProperties.opacity.value = node.style.opacity * 100;
        // nodeProperties.aspectRatio.cssClass =
         node.constraints & ej.diagrams.NodeConstraints.AspectRatio ? document.getElementById('aspectRatioBtn').classList.add('e-active') : document.getElementById('aspectRatioBtn').classList.remove('e-active');
        node.constraints & ej.diagrams.NodeConstraints.AspectRatio ? aspectRatioBtn.iconCss = 'sf-icon-lock': aspectRatioBtn.iconCss = 'sf-icon-unlock';
        nodeProperties.gradient.value = node.style.gradient.type !== 'None' ? 'Gradient' : 'Solid';
         var gradientElement = document.getElementById('gradientStyle');
             if (nodeProperties.gradient.value === 'Gradient') {
                 gradientElement.className = 'row db-prop-row db-gradient-style-show';
                 nodeProperties.gradientColor.value = node.style.gradient.stops[1].color;
                 var gradient = node.style.gradient;
                 if (gradient.x1) {
                     nodeProperties.gradientDirection.value = 'North';
                 }
                 else if (gradient.x2) {
                     nodeProperties.gradientDirection.value = 'East';
                 }
                 else if (gradient.y1) {
                     nodeProperties.gradientDirection.value = 'West';
                 }
                 else if (gradient.y2) {
                     nodeProperties.gradientDirection.value = 'South';
                 }
             }
             else {
                 gradientElement.className = 'row db-prop-row db-gradient-style-hide';
                 nodeProperties.gradientColor.value = '#ffffff';
                 nodeProperties.gradientDirection.value = 'South';
             }     
     }

     DiagramClientSideEvents.prototype.bindConnectorProperties = function(connector)
     {
        connectorProperties.lineType.value  = connector.type;
        connectorProperties.lineColor.value = UtilityMethods.prototype.getHexColor(connector.style.strokeColor);
        connectorProperties.lineStyle.value = connector.style.strokeDashArray ? connector.style.strokeDashArray : '';
        connectorProperties.lineWidth.value = connector.style.strokeWidth;
        connectorProperties.sourceType.value = connector.sourceDecorator.shape;
        connectorProperties.sourceSize.value = connector.sourceDecorator.width;
        connectorProperties.targetType.value = connector.targetDecorator.shape;
        connectorProperties.targetSize.value = connector.targetDecorator.width;
        connectorProperties.opacity.value = connector.style.opacity * 100;
        connectorProperties.lineJumpSize.value = connector.bridgeSpace;
        connectorProperties.lineJump.checked = connector.constraints & ej.diagrams.ConnectorConstraints.Bridging ? true : false;
     };
     DiagramClientSideEvents.prototype.bindTextProperties = function(text)
     {
        textProperties.fontColor.value = UtilityMethods.prototype.getHexColor(text.color);
        textProperties.fontFamily.value = text.fontFamily;
        textProperties.fontSize.value = text.fontSize;
        textProperties.opacity.value = text.opacity * 100;
        var toolbarTextStyle = document.getElementById('toolbarTextStyle');
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            toolbarTextStyle.items[0].cssClass = text.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
            toolbarTextStyle.items[1].cssClass = text.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
            toolbarTextStyle.items[2].cssClass = text.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
        }
        UtilityMethods.prototype.updateTextAlign(text.textAlign);
     }
     return DiagramClientSideEvents;
}());