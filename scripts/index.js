ej.diagrams.Diagram.Inject(ej.diagrams.BpmnDiagrams, ej.diagrams.UndoRedo, ej.diagrams.DiagramContextMenu);
ej.diagrams.SymbolPalette.Inject(ej.diagrams.BpmnDiagrams);
var btnObj;
var conTypeBtn;
var drawingNode;
// var diagramEvents = new DiagramClientSideEvents();

window.onload = function()
{
    document.getElementById('btnHideToolbar').onclick = hideMenuBar.bind(this);
    document.onmouseover = menumouseover.bind(this);
    zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
    // var diagramEvents = new DiagramClientSideEvents();

}

var NodeProperties = (function () {
    function NodeProperties() {
        this.m_offsetX = 0;
        this.m_offsetY = 0;
        this.m_width = 0;
        this.m_height = 0;
        this.m_rotateAngle = 0;
        this.m_fillColor = '#ffffff';
        this.m_strokeColor = '#000000';
        this.m_strokeStyle = 'None';
        this.m_strokeWidth = 1;
        this.m_opacity = 0;
        this.opacityText = '0%';
        this.m_aspectRatio = false;
        this.m_gradient = false;
        this.m_gradientDirection = 'BottomToTop';
        this.m_gradientColor = '#ffffff';
    }

    NodeProperties.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };
    NodeProperties.prototype.getGradient = function (node) {
        var gradientValue = this.getGradientDirectionValue(nodeProperties.gradientDirection.value);
        node.style.gradient = {
            type: 'Linear',
            x1: gradientValue.x1, x2: gradientValue.x2, y1: gradientValue.y1, y2: gradientValue.y2,
            stops: [
                { color: node.style.fill, offset: 0 },
                { color: getColor(nodeProperties.gradientColor.value), offset: 1 }
            ]
        };
    };
    NodeProperties.prototype.getGradientDirectionValue = function (direction) {
        var gradientValue = {};
        var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
        if (direction === 'LeftToRight') {
            x1 = 100;
        }
        else if (direction === 'BottomToTop') {
            y2 = 100;
        }
        else if (direction === 'RightToLeft') {
            x2 = 100;
        }
        else {
            y1 = 100;
        }
        gradientValue = { x1: x1, y1: y1, x2: x2, y2: y2 };
        return gradientValue;
    };
    NodeProperties.prototype.getColor = function (colorName) {
        if (window.navigator.msSaveBlob && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    };

    return NodeProperties;
}());

var nodeProperties = new NodeProperties();

var ConnectorProperties = (function () {
    function ConnectorProperties() {
        this.m_lineColor = '#ffffff';
    }
    ConnectorProperties.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };
    return ConnectorProperties;
}());

var connectorProperties = new ConnectorProperties();

var TextProperties = (function () {
    function TextProperties() {
        this.m_textPosition = '';
        this.m_fontFamily = 'Arial';
        this.m_fontColor = '#ffffff';
        this.textPositionDataSource = this.getNodeTextPositions();
    }
    TextProperties.prototype.getNodeTextPositions = function () {
        return [
            { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
            { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
            { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
            { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
            { text: 'BottomRight', value: 'BottomRight' },
        ];
    };
    TextProperties.prototype.getConnectorTextPositions = function () {
        return [
            { text: 'Before', value: 'Before' }, { text: 'Center', value: 'Center' },
            { text: 'After', value: 'After' },
        ];
    };
    TextProperties.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
        if (!ej.base.isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
        }
    };
    return TextProperties;
}());

var textProperties = new TextProperties();


var ExportSettings = (function () {
    function ExportSettings() {
        this.m_fileName = 'Diagram';
        this.m_format = 'JPG';
        this.m_region = 'PageSettings';
    }
    Object.defineProperty(ExportSettings.prototype, "fileName", {
        get: function () {
            return this.m_fileName;
        },
        set: function (fileName) {
            this.m_fileName = fileName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportSettings.prototype, "format", {
        get: function () {
            return this.m_format;
        },
        set: function (format) {
            this.m_format = format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportSettings.prototype, "region", {
        get: function () {
            return this.m_region;
        },
        set: function (region) {
            this.m_region = region;
        },
        enumerable: true,
        configurable: true
    });
    return ExportSettings;
}());

var exportSettings = new ExportSettings();

var PrintSettings = (function () {
    function PrintSettings() {
        this.m_region = 'PageSettings';
        this.m_pageWidth = 0;
        this.m_pageHeight = 0;
        this.m_isPortrait = true;
        this.m_isLandscape = false;
        this.m_multiplePage = false;
        this.m_paperSize = 'Letter';
    }
    Object.defineProperty(PrintSettings.prototype, "region", {
        get: function () {
            return this.m_region;
        },
        set: function (region) {
            this.m_region = region;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "pageWidth", {
        get: function () {
            return this.m_pageWidth;
        },
        set: function (pageWidth) {
            this.m_pageWidth = pageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "pageHeight", {
        get: function () {
            return this.m_pageHeight;
        },
        set: function (pageHeight) {
            this.m_pageHeight = pageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "isPortrait", {
        get: function () {
            return this.m_isPortrait;
        },
        set: function (isPortrait) {
            this.m_isPortrait = isPortrait;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "isLandscape", {
        get: function () {
            return this.m_isLandscape;
        },
        set: function (isLandscape) {
            this.m_isLandscape = isLandscape;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "multiplePage", {
        get: function () {
            return this.m_multiplePage;
        },
        set: function (multiplePage) {
            this.m_multiplePage = multiplePage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintSettings.prototype, "paperSize", {
        get: function () {
            return this.m_paperSize;
        },
        set: function (paperSize) {
            this.m_paperSize = paperSize;
            document.getElementById('printCustomSize').style.display = 'none';
            document.getElementById('printOrientation').style.display = 'none';
            if (paperSize === 'Custom') {
                document.getElementById('printCustomSize').style.display = '';
            }
            else {
                document.getElementById('printOrientation').style.display = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    return PrintSettings;
}());

var printSettings = new PrintSettings();

var PageSettings = (function () {
    function PageSettings() {
        this.pageWidth = 1056;
        this.pageHeight = 816;
        this.backgroundColor = '#ffffff';
        this.isPortrait = false;
        this.isLandscape = true;
        this.paperSize = 'Letter';
        this.pageBreaks = false;
    }
    return PageSettings;
}());

var pageSettings = new PageSettings();


function renameDiagram(args) {
    document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
    var element = document.getElementById('diagramEditable');
    element.value = document.getElementById('diagramName').innerHTML;
    element.focus();
    element.select();
}

function diagramNameKeyDown(args) {
    if (args.which === 13) {
        document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
        document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    }
}

function diagramNameChange(args) {
    document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
    document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    document.getElementById("exportfileName").value = document.getElementById('diagramName').innerHTML;
}

// window.onload = function(){
//     zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
// }
var nodes = [
    {
        id: 'Start1', offsetX:100, offsetY: 300 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Start' }
        },
    },
    {
        id: 'Task1', width: 120, height: 75, offsetX: 250, offsetY: 300,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Receive'}
            },
        },
        annotations:[{content:'Receive Book lending Request'}]
    },
    {
        id: 'Task2', width: 120, height: 75, offsetX: 420, offsetY: 300,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Service'}
            },
        },
        annotations:[{content:'Get the Book Status',offset:{x:0.5,y:0.5}}]
    },
    {
        id: 'Gateway1', width: 70, height: 60, offsetX: 570, offsetY: 300,
        shape: { type: 'Bpmn', shape: 'Gateway',  },
    },
    {
        id: 'Task3', width: 120, height: 75, offsetX: 780, offsetY: 300,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Send'}
            },
        },
        annotations:[{content:'On loan Reply'}]
    },
    {
        id: 'Gateway2', width: 70, height: 60, offsetX: 920, offsetY: 300,
        shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'EventBased' } },
    },
    {
        id: 'Intermediate1', offsetX:1050, offsetY: 300 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate',trigger:'Message'},
        },
        annotations:[{content:'Decline Hold',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
    },
    {
        id: 'Task4', width: 120, height: 75, offsetX: 1200, offsetY: 300,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Receive'}
            },
        },
        annotations:[{content:'Cancel Request'}]
    },
    {
        id: 'End1', offsetX:1400, offsetY: 300 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'End',},
        },
    },
    {
        id: 'Intermediate2', offsetX:1050, offsetY: 200 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate',trigger:'Message'},
        },
        annotations:[{content:'Hold Book',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
    },
    {
        id: 'Intermediate3', offsetX:1050, offsetY: 400 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate',trigger:'Message'},
        },
        annotations:[{content:'One Week',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
    },
    {
        id: 'Intermediate4', offsetX:900, offsetY: 60 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate',trigger:'Message'},
        },
        annotations:[{content:'Two Weeks',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
    },
    {
        id: 'Task5', width: 120, height: 75, offsetX: 780, offsetY: 550,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'User'}
            },
        },
        annotations:[{content:'Checkout the Book'}]
    },
    {
        id: 'Task6', width: 120, height: 75, offsetX: 1050, offsetY: 550,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Receive'}
            },
        },
        annotations:[{content:'Checkout Reply'}]
    },
    {
        id: 'Task7', width: 120, height: 75, offsetX: 1200, offsetY: 200,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Service'}
            },
        },
        annotations:[{content:'Request Hold'}]
    },
    {
        id: 'Task8', width: 120, height: 75, offsetX: 1400, offsetY: 200,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Receive'}
            },
        },
        annotations:[{content:'Hold Reply'}]
    },
];

//Initialize bpmn shapes for symbol palette
var bpmnShapes = [
    {
        id: 'Task', width: 96, height: 72, offsetX: 700, offsetY: 700,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',
            },
        },
    },
    {
        id: 'Gateway', width: 60, height: 60, offsetX: 100, offsetY: 100,
        shape: { type: 'Bpmn', shape: 'Gateway',}
    },
    {
        id: 'Intermediate Event', width: 30, height: 30, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate' }
        },
    },
    {
        id: 'End Event', width: 30, height: 30, offsetX: 665, offsetY: 230, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'End' }
        },
    },
    {
        id: 'Start Event', width: 30, height: 30, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Start' }
        },
    },
    {
        id:'Collapsed Sub-process', width:96,height:72,shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'SubProcess', subProcess: { collapsed: true, boundary: 'Default' }
            },
        },
    },
     {
        id: 'Expanded Sub-Process', width: 576, height: 384, offsetX: 355, offsetY: 230,
        constraints: ej.diagrams.NodeConstraints.Default | ej.diagrams.NodeConstraints.AllowDrop,
        shape: {
            shape: 'Activity', type: 'Bpmn',
            activity: {
                activity: 'SubProcess', subProcess: {
                    type: 'Transaction', collapsed: false,
                    processes: [], transaction: {
                        cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
                    }
                }
            }
        },
    },
    // {
    //     id:'Expanded Sub-process', width:70,height:70,shape: {
    //         type: 'Bpmn', shape: 'Activity', activity: {
    //             activity: 'SubProcess', subProcess: { collapsed: false, boundary: 'Default' }
    //         },
    //     },
    // },
    {
        id:'Sequence Flow',
        sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        type: 'Straight',
        shape: { type: 'Bpmn', flow: 'Sequence',sequence: 'None'
        },
    },
    {
        id:'Association Flow',
        sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        type: 'Straight',style:{strokeDashArray:"3"},
        //sourceDecorator:{shape:'None'},targetDecorator:{shape:'None'},
        shape: { type: 'Bpmn', flow: 'Association',}, 
    },
    {
        id:'Message Flow',
        sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },type: 'Straight',
        sourceDecorator:{shape:'Circle'},targetDecorator:{shape:'Arrow'},
        // shape: {
        // type: 'Bpmn',
        // flow: 'Message',
        // message: 'InitiatingMessage'
        //     },
    },
    {
        id: 'Message', width: 60,
        height: 60,shape: { type: 'Bpmn', shape: 'Message',},
      },
    {
        id: 'Data Object', width: 48, height: 63, offsetX: 500, offsetY: 100,
        shape: { type: 'Bpmn', shape: 'DataObject', dataObject: { collection: false, type: 'None' } },
    },
    {
        id:'Data Source', width:96,height:72, shape: {
            type: 'Bpmn', shape: 'DataSource',   
        }
    },
    // {
    //     id:'Group', width:60,height:60, shape: {
    //         type: 'Bpmn', shape: 'Group', 
    //     },
    // },
    // {
    //     id: 'Text Annotation', width: 60, height: 60, offsetX: 500, offsetY: 100,
    //     shape: { type: 'Bpmn', shape: 'TextAnnotation', },annotations:[{length:100,angle:180,text:'text ann'}]
    // },
    
      
    //  {
    //     id: 'subProcess', width: 520, height: 250, offsetX: 355, offsetY: 230,
    //     constraints: ej.diagrams.NodeConstraints.Default | ej.diagrams.NodeConstraints.AllowDrop,
    //     shape: {
    //         shape: 'Activity', type: 'Bpmn',
    //         activity: {
    //             activity: 'SubProcess', subProcess: {
    //                 type: 'Transaction', collapsed: false,
    //                 processes: [], transaction: {
    //                     cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
    //                 }
    //             }
    //         }
    //     },
    // },
   
    
   
    
];

//Initialize connectors for symbol palette
var connectorSymbols = [
    {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow', style:{strokeColor: '#757575', fill: '#757575'} }, style: { strokeWidth: 2, strokeColor: '#757575' }
    },
    {
        id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow', style:{strokeColor: '#757575', fill: '#757575'} }, style: { strokeWidth: 2, strokeDashArray: '4 4', strokeColor: '#757575' }
    },
    {
        id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow', style:{strokeColor: '#757575', fill: '#757575'} }, style: { strokeWidth: 2, strokeColor: '#757575' }
    },
    {
        id: 'link4', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 }, type: 'Orthogonal',
        targetDecorator: { style:{strokeColor: '#757575', fill: '#757575'} },
        shape: {
            type: 'Bpmn',
            flow: 'Association',
            association: 'Directional'
        }, style: {
            strokeDashArray: '2,2', strokeColor: '#757575'
        },
    },
];
// Initialize connectors for diagram
var connectors = [
    {
        id:'connector1',sourceID:'Start1',targetID:'Task1',type:'Orthogonal'
    },
    {
        id:'connector2',sourceID:'Task1',targetID:'Task2',type:'Orthogonal'
    },
    {
        id:'connector3',sourceID:'Task2',targetID:'Gateway1',type:'Orthogonal'
    },
    {
        id:'connector4',sourceID:'Gateway1',targetID:'Task3',annotations:[{content:'Book is on Loan'}],type:'Orthogonal'
    },
    {
        id:'connector5',sourceID:'Task3',targetID:'Gateway2',type:'Orthogonal'
    },
    {
        id:'connector6',sourceID:'Gateway2',targetID:'Intermediate1',sourcePortID:'right',targetPortID:'left',type:'Orthogonal'
    },
    {
        id:'connector7',sourceID:'Intermediate1',targetID:'Task4',type:'Orthogonal'
    },
    {
        id:'connector8',sourceID:'Task4',targetID:'End1',type:'Orthogonal'
    },
    {
        id:'connector9',sourceID:'Gateway2',targetID:'Intermediate2',sourcePortID:'top',targetPortID:'left',type:'Orthogonal'
    },
    {
        id:'connector10',sourceID:'Gateway2',targetID:'Intermediate3',sourcePortID:'bottom',targetPortID:'left',type:'Orthogonal'
    },
    {
        id:'connector11',sourceID:'Intermediate2',targetID:'Task7',type:'Orthogonal'
    },
    {
        id:'connector12',sourceID:'Intermediate3',targetID:'Task4',sourcePortID:'right',targetPortID:'bottom',type:'Orthogonal'
    },
    {
        id:'connector13',sourceID:'Task7',targetID:'Task8',type:'Orthogonal'
    },
    {
        id:'connector14',sourceID:'Task8',targetID:'Intermediate4',sourcePortID:'top',targetPortID:'right',type:'Orthogonal'
    },
    {
        id:'connector15',sourceID:'Intermediate4',targetID:'Task2',sourcePortID:'left',targetPortID:'top',type:'Orthogonal'
    },
    {
        id:'connector16',sourceID:'Gateway1',targetID:'Task5',sourcePortID:'bottom',targetPortID:'left',
        annotations:[{content:'Book is Avaliable'}],type:'Orthogonal'
    },
    {
        id:'connector17',sourceID:'Task5',targetID:'Task6',type:'Orthogonal'
    },
    {
        id:'connector18',sourceID:'Task6',targetID:'End1',sourcePortID:'right',targetPortID:'bottom',type:'Orthogonal'
    },
]

//Context menu items
var contextMenu = {
    show: true, items: [
        {
            text: 'Copy', id: 'Copy', target: '.e-diagramcontent', iconCss: 'e-menu-icon e-icons e-copy'
        },
        {
            text: 'Cut', id: 'Cut', target: '.e-diagramcontent', iconCss: 'e-menu-icon e-icons e-cut'
        },
        {
            text: 'Paste', id: 'Paste', target: '.e-diagramcontent', iconCss: 'e-menu-icon e-icons e-paste'
        },
        {
            text: 'Delete', id: 'Delete', target: '.e-diagramcontent', iconCss: 'e-menu-icon e-icons e-delete'
        },
        {
            text: 'Select All', id: 'SelectAll', target: '.e-diagramcontent', iconCss: 'e-menu-icon e-icons e-paste'
        },
        {
            text: 'Association', id: 'Association' 
        },
        {
            text: 'Sequence', id: 'Sequence'
        },
        {
            text: 'MessageFlow', id: 'MessageFlow'
        },
        {
            text: 'Condition type', id: 'Condition type', items: [
                    {text: 'Default', id: 'Default'}, {text: 'Conditional', id: 'Conditional'},
                    {text: 'Normal', id: 'Normal'},
            ]
        },
        {
            text: 'Direction', id: 'Direction', items: [
                    {text: 'Default', id: 'Default'}, {text: 'Directional', id: 'Directional'},
                    {text: 'BiDirectional', id: 'BiDirectional'},
            ]
        },
        {
            text: 'Ad-Hoc', id: 'Adhoc',
            items: [{ text: 'None', iconCss: 'e-adhocs e-bpmn-event e-bpmn-icons e-None', id: 'AdhocNone' },
            { iconCss: 'e-adhocs e-bpmn-icons e-adhoc', text: 'Ad-Hoc', id: 'AdhocAdhoc' }]
        }, {
            text: 'Loop', id: 'Loop',
            items: [{ text: 'None', iconCss: 'e-loop e-bpmn-icons e-None', id: 'LoopNone' },
            { text: 'Standard', iconCss: 'e-loop e-bpmn-icons e-Loop', id: 'Standard' },
            { text: 'Parallel Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-ParallelMI', id: 'ParallelMultiInstance' },
            { text: 'Sequence Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-SequentialMI', id: 'SequenceMultiInstance' }]
        }, {
            text: 'Compensation', id: 'taskCompensation',
            items: [{ text: 'None', iconCss: 'e-compensation e-bpmn-icons e-None', id: 'CompensationNone' },
            { iconCss: 'e-compensation e-bpmn-icons e-Compensation', text: 'Compensation', id: 'CompensationCompensation' }]
        }, {
            text: 'Activity-Type', id: 'Activity-Type',
            items: [{ text: 'Collapsed sub-process', iconCss: 'e-bpmn-icons e-SubProcess', id: 'CollapsedSubProcess' },
            { iconCss: 'e-bpmn-icons e-Task', text: 'Expanded sub-process', id: 'ExpandedSubProcess' }]
        }, {
            text: 'Boundry', id: 'Boundry',
            items: [{ text: 'Default', iconCss: 'e-boundry e-bpmn-icons e-Default', id: 'Default' },
            { text: 'Call', iconCss: 'e-boundry e-bpmn-icons e-Call', id: 'BoundryCall' },
            { text: 'Event', iconCss: 'e-boundry e-bpmn-icons e-Event', id: 'BoundryEvent' }]
        }, {
            text: 'Data Object', id: 'DataObject',
            items: [{ text: 'None', iconCss: 'e-data e-bpmn-icons e-None', id: 'DataObjectNone' },
            { text: 'Input', iconCss: 'e-data e-bpmn-icons e-DataInput', id: 'Input' },
            { text: 'Output', iconCss: 'e-data e-bpmn-icons e-DataOutput', id: 'Output' }]
        }, {
            text: 'Collection', id: 'collection',
            items: [{ text: 'None', iconCss: 'e-collection e-bpmn-icons e-None', id: 'collectionNone' },
            { text: 'Collection', iconCss: 'e-collection e-bpmn-icons e-ParallelMI', id: 'Collectioncollection' }]
        }, {
            text: 'Call', id: 'DeftCall',
            items: [{ text: 'None', iconCss: 'e-call e-bpmn-icons e-None', id: 'CallNone' },
            { text: 'Call', iconCss: 'e-call e-bpmn-icons e-CallActivity', id: 'CallCall' }]
        }, {
            text: 'Trigger Result', id: 'TriggerResult',
            items: [{ text: 'None', id: 'TriggerNone', iconCss: 'e-trigger e-bpmn-icons e-None' },
            { text: 'Message', id: 'Message', iconCss: 'e-trigger e-bpmn-icons e-InMessage' },
            { text: 'Multiple', id: 'Multiple', iconCss: 'e-trigger e-bpmn-icons e-InMultiple' },
            { text: 'Parallel', id: 'Parallel', iconCss: 'e-trigger e-bpmn-icons e-InParallelMultiple' },
            { text: 'Signal', id: 'Signal', iconCss: 'e-trigger e-bpmn-icons e-InSignal' },
            { text: 'Timer', id: 'Timer', iconCss: 'e-trigger e-bpmn-icons e-InTimer' },
            { text: 'Cancel', id: 'Cancel', iconCss: 'e-trigger e-bpmn-icons e-CancelEnd' },
            { text: 'Escalation', id: 'Escalation', iconCss: 'e-trigger e-bpmn-icons e-InEscalation' },
            { text: 'Error', id: 'Error', iconCss: 'e-trigger e-bpmn-icons e-InError' },
            { text: 'Compensation', id: 'triggerCompensation', iconCss: 'e-trigger e-bpmn-icons e-InCompensation' },
            { text: 'Terminate', id: 'Terminate', iconCss: 'e-trigger e-bpmn-icons e-TerminateEnd' },
            { text: 'Conditional', id: 'Conditional', iconCss: 'e-trigger e-bpmn-icons e-InConditional' },
            { text: 'Link', id: 'Link', iconCss: 'e-trigger e-bpmn-icons e-ThrowLinkin' }
            ]
        },
        {
            text: 'Event Type', id: 'EventType',
            items: [{ text: 'Start', id: 'Start', iconCss: 'e-event e-bpmn-icons e-NoneStart', },
            { text: 'Intermediate', id: 'Intermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
            { text: 'NonInterruptingStart', id: 'NonInterruptingStart', iconCss: 'e-event e-bpmn-icons e-Noninterruptingstart' },
            { text: 'ThrowingIntermediate', id: 'ThrowingIntermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
            {
                text: 'NonInterruptingIntermediate', id: 'NonInterruptingIntermediate',
                iconCss: 'e-event e-bpmn-icons e-NoninterruptingIntermediate'
            },
            { text: 'End', id: 'End', iconCss: 'e-event e-bpmn-icons e-NoneEnd' }]
        }, {
            text: 'Task Type', id: 'TaskType',
            items: [
                { text: 'None', id: 'TaskNone', iconCss: 'e-task e-bpmn-icons e-None' },
                { text: 'Service', id: 'Service', iconCss: 'e-task e-bpmn-icons e-ServiceTask' },
                { text: 'BusinessRule', id: 'BusinessRule', iconCss: 'e-task e-bpmn-icons e-BusinessRule' },
                { text: 'InstantiatingReceive', id: 'InstantiatingReceive', iconCss: 'e-task e-bpmn-icons e-InstantiatingReceive' },
                { text: 'Manual', id: 'Manual', iconCss: 'e-task e-bpmn-icons e-ManualCall' },
                { text: 'Receive', id: 'Receive', iconCss: 'e-task e-bpmn-icons e-InMessage' },
                { text: 'Script', id: 'Script', iconCss: 'e-task e-bpmn-icons e-ScriptCall' },
                { text: 'Send', id: 'Send', iconCss: 'e-task e-bpmn-icons e-InMessage' },
                { text: 'User', id: 'User', iconCss: 'e-task e-bpmn-icons e-UserCall' },
            ]
        }, {
            text: 'GateWay', id: 'GateWay',
            iconCss: 'e-bpmn-icons e-Gateway', items: [
                { text: 'None', id: 'GatewayNone', iconCss: 'e-gate e-bpmn-icons e-None' },
                { text: 'Exclusive', iconCss: 'e-gate e-bpmn-icons e-ExclusiveGatewayWithMarker', id: 'Exclusive' },
                { text: 'Inclusive', iconCss: 'e-gate e-bpmn-icons e-InclusiveGateway', id: 'Inclusive' },
                { text: 'Parallel', iconCss: 'e-gate e-bpmn-icons e-ParallelGateway', id: 'GatewayParallel' },
                { text: 'Complex', iconCss: 'e-gate e-bpmn-icons e-ComplexGateway', id: 'Complex' },
                { text: 'EventBased', iconCss: 'e-gate e-bpmn-icons e-EventBasedGateway', id: 'EventBased' },
                { text: 'ExclusiveEventBased', iconCss: 'e-gate e-bpmn-icons e-ExclusiveEventBased', id: 'ExclusiveEventBased' },
                { text: 'ParallelEventBased', iconCss: 'e-gate e-bpmn-icons e-ParallelEventBasedGatewaytostart', id: 'ParallelEventBased' }
            ]
        },
    ],
    showCustomMenuOnly: true,
};

var handles = [
    {
        name: 'Clone', pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',tooltip:{content:'Clone'},
        visible: true, offset: 1, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
        name: 'Delete', pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',tooltip:{content:'Delete'},
        visible: true, offset: 0, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
        name: 'Draw', pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',tooltip:{content:'Draw'},
        visible: true, offset: 0.5, side: 'Right', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
];

var btnFileMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: getFileMenuItems(),
    content: 'File',
    select: menuClick,
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnFileMenu.appendTo('#btnFileMenu');


var btnSelectMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: getSelectMenuItems(),
    content: 'Select',
    select: menuClick,
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnSelectMenu.appendTo('#btnSelectMenu');



var btnViewMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: getViewMenuItems(),
    content: 'View',
    select: menuClick,
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnViewMenu.appendTo('#btnViewMenu');




function getFileMenuItems()
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

function getEditMenuItems()
{
    var items = [
        { text: 'Undo', iconCss: 'sf-icon-Undo' },
        { text: 'Redo', iconCss: 'sf-icon-Redo' },
        { separator: true },
        { text: 'Cut', iconCss: 'sf-icon-Cut' },
        { text: 'Copy', iconCss: 'sf-icon-Copy' },
        { text: 'Paste', iconCss: 'sf-icon-Paste' },
        { separator: true },
        { text: 'Rotate',iconCss:'', items:[
            { text: 'Rotate Right 90', iconCss: 'sf-icon-Redo' },
            { text: 'Rotate Left 90', iconCss: 'sf-icon-Undo' },
            { text: 'Flip Vertical', iconCss: 'sf-icon-Undo' },
            { text: 'Flip Horizontal', iconCss: 'sf-icon-Undo' },
        ]},
        { text: 'Delete', iconCss: 'sf-icon-Delete' },
        { separator: true },
        {text: 'Order Commands',iconCss:'tb-item-end tb-item-order tb-dropdown-btn-icon',
            items:[ { text: 'Bring Forward', iconCss: 'sf-icon-BringForward' },
                    { text: 'Bring To Front', iconCss: 'sf-icon-BringFront' },
                    { text: 'Send Backward', iconCss: 'sf-icon-SendBackward' },
                    { text: 'Send To Back', iconCss: 'sf-icon-Sendback' },
                    ]
        } 
    ]
    return items;
};

function getDesignMenuItems()
{
    var items = [
        { text: 'Orientation',
        items:[
            { text: 'Landscape', iconCss: 'sf-icon-Selection' },
            { text: 'Portrait', iconCss: '' }
        ]    
        },
        { text: 'Size', iconCss: 'em-icons e-copy',
        items:paperList1()
        },
    ]
    return items;
};

function getSelectMenuItems()
{
    var items = [
        { text: 'Select All', iconCss: 'em-icons e-cut' },
        { text: 'Select All Nodes', iconCss: 'em-icons e-copy' },
        { text: 'Select All Connectors', iconCss: 'em-icons e-paste' },
        { text: 'Deselect All', iconCss: 'em-icons e-paste' }
    ]
    return items;
};

function getToolsMenuItems()
{
    var items1 = [
        { text: 'Selection Tool',iconCss: 'sf-icon-Selector tb-icons' },
        { text: 'Pan Tool', iconCss: 'sf-icon-Pan tb-icons' },
        { separator: true },
        { text: 'Connector Tool',iconCss:'sf-icon-ConnectorMode',items:[
            {text:'Straight',iconCss: 'sf-icon-StraightLine'},
            {text:'Orthogonal',iconCss: 'sf-icon-ConnectorMode'},
            {text:'Bezier',iconCss: 'sf-icon-BeizerLine'},
        ] }
    ]
    return items1;
};

function getViewMenuItems()
{
    var items = [
        { text: 'Show Lines',iconCss: 'sf-icon-Selection'},
        { text: 'Snap To Grid',iconCss : 'sf-icon-Selection'},
        { text: 'Snap To Object',iconCss : 'sf-icon-Selection'},
        { text: 'Show Ruler',iconCss: 'sf-icon-Selection'},
        { text: 'Show Page Breaks',iconCss: 'sf-icon-Selection'},
        { text: 'Show Multiple page',iconCss: ''},
        { separator: true },
        { text: 'Fit To Width'},
        { text: 'Fit To Page'},
    ]
    return items;
};

function toolsContextMenuOpen (args) {
    if (args.element.classList.contains('e-menu-parent')) {
        var popup = document.querySelector('#btnToolsMenu-popup');
        args.element.style.left = ej.base.formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
        args.element.style.top = ej.base.formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
}
function designContextMenuOpen (args) {
    if (args.element.classList.contains('e-menu-parent')) {
        var popup = document.querySelector('#btnDesignMenu-popup');
        args.element.style.left = ej.base.formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
        args.element.style.top = ej.base.formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
}
function editContextMenuOpen (args) {
    if (args.element.classList.contains('e-menu-parent')) {
        var popup = document.querySelector('#btnEditMenu-popup');
        args.element.style.left = ej.base.formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
        args.element.style.top = ej.base.formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
}

function arrangeMenuBeforeOpen(args)
{
    for (var i = 0; i < args.element.children.length; i++) {
        args.element.children[i].style.display = 'block';
    }
    //(args.element.children[0]).style.display = 'block';
    if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
}

function arrangeMenuBeforeClose(args)
{
    if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
    if (!args.element) {
        args.cancel = true;
    }
}

function beforeItemRender(args) {
    var shortCutText = getShortCutKey(args.item.text);
    if (shortCutText) {
        var shortCutSpan = document.createElement('span');
        var text = args.item.text;
        shortCutSpan.textContent = shortCutText;
        shortCutSpan.style.pointerEvents = 'none';
        args.element.appendChild(shortCutSpan);
        shortCutSpan.setAttribute('class', 'db-shortcut');
    }
    var status = enableMenuItems(args.item.text, diagram);
    if (status) {
        args.element.classList.add('e-disabled');
    } else {
        if (args.element.classList.contains('e-disabled')) {
            args.element.classList.remove('e-disabled');
        }
    }
}

function getShortCutKey(menuItem) {
    var shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
    switch (menuItem) {
        case 'New':
            shortCutKey = 'Shift' + '+N';
            break;
        case 'Open':
            shortCutKey = shortCutKey + '+O';
            break;
        case 'Save':
            shortCutKey = shortCutKey + '+S';
            break;
        case 'Undo':
            shortCutKey = shortCutKey + '+Z';
            break;
        case 'Redo':
            shortCutKey = shortCutKey + '+Y';
            break;
        case 'Cut':
            shortCutKey = shortCutKey + '+X';
            break;
        case 'Copy':
            shortCutKey = shortCutKey + '+C';
            break;
        case 'Paste':
            shortCutKey = shortCutKey + '+V';
            break;
        case 'Delete':
            shortCutKey = 'Delete';
            break;
        case 'Select All':
            shortCutKey = shortCutKey + '+A';
            break;
        case 'Zoom In':
            shortCutKey = shortCutKey + '++';
            break;
        case 'Zoom Out':
            shortCutKey = shortCutKey + '+-';
            break;
        // case 'Rotate Right 90':
        //     shortCutKey = shortCutKey + '+R';
        //     break;
        // case 'Rotate Left 90':
        //     shortCutKey = shortCutKey + '+L';
        //     break;
        // case 'Flip Horizontal':
        //     shortCutKey = shortCutKey + '+H';
        //     break;
        // case 'Flip Vertical':
        //     shortCutKey = shortCutKey + '+J';
        default:
            shortCutKey = '';
            break;
    }
    return shortCutKey;
}

function enableMenuItems(itemText, diagram) {
    var selectedItems = diagram.selectedItems.nodes;
    selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
    if (itemText) {
        var commandType = itemText.replace(/[' ']/g, '');
        if (selectedItems.length === 0) {
            switch (commandType.toLowerCase()) {
                case 'cut':
                    return true;
                case 'copy':
                    return true;
                case 'delete':
                    return true;
            }
        }
        if (!(diagram.commandHandler.clipboardData.pasteIndex !== undefined
            && diagram.commandHandler.clipboardData.clipObject !==undefined) && itemText === 'Paste') {
            return true;
        }
        if (itemText === 'Undo' && diagram.historyManager.undoStack.length<1) {
            return true;
        }
        if (itemText === 'Redo' && diagram.historyManager.redoStack.length<1) {
            return true;
        }
        if(itemText === 'Rotate Clockwise' && diagram.selectedItems.nodes.length < 1)
        {
            return true;
        }
        if(itemText === 'Rotate Counter Clockwise' && diagram.selectedItems.nodes.length < 1)
        {
            return true;
        }
        if(itemText === 'Send To Back' && selectedItems.length === 0)
        {
            return true;
        }
        if(itemText === 'Bring To Front' && selectedItems.length === 0)
        {
            return true;
        }
        if(itemText === 'Bring Forward' && selectedItems.length === 0)
        {
            return true;
        }
        if(itemText === 'Send Backward' && selectedItems.length === 0)
        {
            return true;
        }
    }
    return false;
};

function menumouseover(args) {
    var target = args.target;
    if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
        target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
        if (this.buttonInstance && this.buttonInstance.id !== target.id) {
            if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                var buttonElement = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.remove('e-btn-hover');
            }
        }
        var button1 = target.ej2_instances[0];
        this.buttonInstance = button1;
        if (button1.getPopUpElement().classList.contains('e-popup-close')) {
            button1.toggle();
            // if (button1.element.id === 'btnToolsMenu') {
            //     enableToolsMenuItems(diagram);
            // }
            if(button1.element.id === 'btnEditMenu') {
                enableEditMenuItems(diagram);
            }
            var buttonElement1 = document.getElementById(this.buttonInstance.element.id);
            buttonElement1.classList.add('e-btn-hover');
        }
    } else {
        if (ej.base.closest(target, '.e-dropdown-popup') === null && ej.base.closest(target, '.e-dropdown-btn') === null) {
            if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                var buttonElement2 = document.getElementById(this.buttonInstance.element.id);
                buttonElement2.classList.remove('e-btn-hover');
            }
        }
    }
};
// function enableToolsMenuItems(diagram) {
//     var contextInstance = document.getElementById('toolsContextMenu');
//     var contextMenu = contextInstance.ej2_instances[0];
//     var selectedItems = diagram.selectedItems.nodes;
//     selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
//     for (var i = 0; i < contextMenu.items.length; i++) {
//         contextMenu.enableItems([contextMenu.items[i].text], false);
//     }
        
//             // contextMenu.enableItems(['Connectors'], true);
//             // contextMenu.enableItems(['Selection Tool', 'Pan Tool', 'Connector Tool']);                  
// };

function enableEditMenuItems(diagram)
{
    var contextInstance = document.getElementById('editContextMenu');
    var contextMenu = contextInstance.ej2_instances[0];
    var selectedItems = diagram.selectedItems.nodes;
    selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
    for (var i = 0; i < contextMenu.items.length; i++) {
        contextMenu.enableItems([contextMenu.items[i].text], false);
    }
    var objects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
        if(objects.length>0)
        {
            contextMenu.enableItems(['Cut', 'Copy', 'Delete','Order Commands','Rotate']);
        }
        if(diagram.historyManager.undoStack.length>0){
            contextMenu.enableItems(['Undo']);
        }
        if(diagram.historyManager.redoStack.length>0){
            contextMenu.enableItems(['Redo']);
        }
        if((diagram.commandHandler.clipboardData.pasteIndex !== undefined
            && diagram.commandHandler.clipboardData.clipObject !==undefined)){
                contextMenu.enableItems(['Paste']);
            }  
}

    var disabledItems = ['Cut','Copy','Send To Back','Bring To Front','Delete'];
    var undoRedoItems = ['Undo','Redo'];
    var rotateItems = ['Rotate Clockwise','Rotate Counter Clockwise'];
    var pasteItem = ['Paste'];

    //Initialize Toolbar component
    var toolbarObj = new ej.navigations.Toolbar({
        clicked:toolbarClick,
        items: [
                    { prefixIcon: 'e-ddb-icons e-paste', tooltipText: 'New Diagram',cssClass: 'tb-item-start' },
                    { prefixIcon: 'e-icons e-copy', tooltipText: 'Open Diagram',cssClass: 'tb-item-middle' },
                    { prefixIcon: 'sf-icon-Save', tooltipText: 'Save Diagram',cssClass: 'tb-item-middle' },
                    { prefixIcon: 'e-print e-icons', tooltipText: 'Print Diagram',cssClass: 'tb-item-middle'},
                    { type: 'Input', tooltipText: 'Export Diagram',template: '<button id="custombtn" style="width:100%;"></button>',cssClass: 'tb-item-end tb-dropdown-btn-icon'},
                                    { type: 'Separator' },
                    { prefixIcon: 'e-icons e-undo', tooltipText: 'Undo',disabled:true,cssClass: 'tb-item-start'  },
                    { prefixIcon: 'e-icons e-redo', tooltipText: 'Redo',disabled:true,cssClass: 'tb-item-end'  },
                                    {type :'Seperator'},
                    { prefixIcon: 'sf-icon-Cut', tooltipText: 'Cut',click: pasteClick,disabled:true,cssClass: 'tb-item-start'  },
                    { prefixIcon: 'sf-icon-Copy', tooltipText: 'Copy',click: pasteClick,disabled:true,cssClass: 'tb-item-middle'  },
                    { prefixIcon: 'e-icons e-paste', tooltipText: 'Paste',disabled:true,cssClass: 'tb-item-end' },
                                    {type: 'Separator' },
                    {
                        prefixIcon: 'sf-icon-ZoomOut tb-icons', tooltipText: 'Zoom Out(Ctrl + -)', cssClass: 'tb-item-start'
                    },
                    {
                        cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>'
                    },
                    {
                        prefixIcon: 'sf-icon-ZoomIn tb-icons', tooltipText: 'Zoom In(Ctrl + +)', cssClass: 'tb-item-end'
                    },
                                    {
                                        type: 'Separator'
                                    },
                    { prefixIcon: 'sf-icon-Pan tb-icons', tooltipText: 'Pan Tool',cssClass: 'tb-item-start'},
                    { prefixIcon: 'sf-icon-Selector tb-icons', tooltipText: 'Select Tool',cssClass: 'tb-item-middle tb-item-selected'},
                    { tooltipText: 'Change Connector Type',template: '<button id="conTypeBtn" style="width:100%;"></button>',cssClass: 'tb-item-end'},
                                    { type: 'Separator' },
                    
                    {prefixIcon: 'sf-icon-Lock tb-icons', tooltipText: 'Lock',disabled:true,cssClass: 'tb-item-start'}, 
                    { prefixIcon: 'sf-icon-Delete', tooltipText: 'Delete',disabled:true,cssClass: 'tb-item-end'},
                                    { type: 'Separator' },
                    { prefixIcon: 'sf-icon-Redo', tooltipText: 'Rotate Clockwise' ,disabled:true,cssClass: 'tb-item-start' },
                    { prefixIcon: 'sf-icon-Undo', tooltipText: 'Rotate Counter-clockwise',disabled:true,cssClass: 'tb-item-end'  },
                                    { type: 'Separator' },
                    { prefixIcon: 'sf-icon-BringFront', tooltipText: 'Bring To Front',disabled:true,cssClass: 'tb-item-start' },
                    { prefixIcon: 'sf-icon-Sendback' , tooltipText: 'Send To Back',disabled:true,cssClass: 'tb-item-middle'  },
                    { prefixIcon: 'sf-icon-BringForward', tooltipText: 'Bring Forward',disabled:true,cssClass: 'tb-item-middle' },
                    { prefixIcon: 'sf-icon-SendBackward' , tooltipText: 'Send Backward',disabled:true,cssClass: 'tb-item-end'  },
                                    { type: 'Separator' },
                    { prefixIcon: 'sf-icon-Flip-Horizontal', tooltipText: 'Flip Horizontal',disabled:true,cssClass: 'tb-item-start' },
                    { prefixIcon: 'sf-icon-Flip-Vertical' , tooltipText: 'Flip Vertical',disabled:true,cssClass: 'tb-item-end'  },
        
         ],
         width:'100%'
 });
 //Render initialized Toolbar component
 var items = [{ text: 'JPG' }, { text: 'PNG' }, { text: 'BMP' }, { text: 'SVG' }];
 var conTypeItems = [
                     {text: 'Straight',iconCss: 'sf-icon-StraightLine'},
                     {text: 'Orthogonal',iconCss: 'sf-icon-ConnectorMode'},
                     {text: 'Bezier',iconCss: 'sf-icon-BeizerLine'}
                    ];
var zoomMenuItems = [
                        { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
                        { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
                        { text: 'Fit To Screen' }
                    ];
 var fontType = [
                        { type: 'Arial', text: 'Arial' },
                        { type: 'Aharoni', text: 'Aharoni' },
                        { type: 'Bell MT', text: 'Bell MT' },
                        { type: 'Fantasy', text: 'Fantasy' },
                        { type: 'Times New Roman', text: 'Times New Roman' },
                        { type: 'Segoe UI', text: 'Segoe UI' },
                        { type: 'Verdana', text: 'Verdana' }
                    ];
 btnObj = new ej.splitbuttons.DropDownButton({
   items: items, iconCss: 'sf-icon-Export',  select: onselectExport,
});
conTypeBtn = new ej.splitbuttons.DropDownButton({
    items: conTypeItems, iconCss:'sf-icon-ConnectorMode', select: onConnectorSelect
});



var uploadObj = new ej.inputs.Uploader({
    asyncSettings: {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    },
    success: onUploadSuccess,
    showFileList:false
});
uploadObj.appendTo('#fileupload');


 toolbarObj.appendTo('#toolbarEditor');
 var btnHideToolbar = new ej.buttons.Button({ iconCss: 'sf-icon-Collapse tb-icons' });
 btnHideToolbar.appendTo('#btnHideToolbar');
 btnObj.appendTo('#custombtn');
 conTypeBtn.appendTo('#conTypeBtn');


 function menuClick(args)
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
            historyChange();
            break;
        case 'Save':
            download(diagram.saveDiagram());
            break;
        case 'Print':
            // var options = {};
            // options.mode = 'Data';
            // diagram.print(options)
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
            onselectExport(args);
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
            paperListChange(args)
            pageSettingsList.text = args.item.text;
            updateSelection(args.item)
            break;
    //     case 'Background':
    //         document.getElementById('background').style.display = 'block';
    //        var fillElement= document.getElementById('background').parentElement.getElementsByClassName('e-dropdown-btn')[0];
    // fillElement.click();
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
            // diagram.selectedItems.nodes = [];
            // diagram.selectedItems.connectors = [];
            break;
        case 'Selection Tool':
            diagram.tool = ej.diagrams.DiagramTools.Default;
            removeSelectedToolbarItem();
            break;
        case 'Pan Tool':
            diagram.clearSelection();
            diagram.tool = ej.diagrams.DiagramTools.ZoomPan;
            removeSelectedToolbarItem();
            break;
        case 'Orthogonal':
            diagram.clearSelection();
            diagram.drawingObject.sourceID = '';
            diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
            diagram.selectedItems.userHandles = [];
            diagram.drawingObject.type = 'Orthogonal';
            removeSelectedToolbarItem();
            break;
        case 'Straight':
            diagram.clearSelection();
            diagram.drawingObject.sourceID = '';
            diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
            diagram.selectedItems.userHandles = [];
            diagram.drawingObject.type = 'Straight';
            removeSelectedToolbarItem();
            break;
        case 'Bezier':
            diagram.clearSelection();
            diagram.drawingObject.sourceID = '';
            diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
            diagram.selectedItems.userHandles = [];
            diagram.drawingObject.type = 'Bezier';
            removeSelectedToolbarItem();
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
 }

 function updateSelection(item)
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
 }


 function toolbarClick(args)
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
            historyChange();
            break;
        case 'Print Diagram':
            printDialog.show();
            // var options = {};
            // options.mode = 'Data';
            // diagram.print(options)
            break;
        case 'Save Diagram':
            download(diagram.saveDiagram());
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
            removeSelectedToolbarItem();
            args.item.cssClass += ' tb-item-selected';
        }
    }
    diagram.dataBind();
 }

 function removeSelectedToolbarItem (args) {
    // var toolbarEd = selectedItem.utilityMethods.toolbarEditor;
    for (var i = 0; i < toolbarObj.items.length; i++) {
        var item = toolbarObj.items[i];
        if (item.cssClass.indexOf('tb-item-selected') !== -1) {
            item.cssClass = item.cssClass.replace(' tb-item-selected', '');
        }
    }
    toolbarObj.dataBind();
    document.getElementById('conTypeBtn').classList.remove('tb-item-selected');
}

function flipObjects(flipType)
{
    var selectedObjects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
 for(i=0;i<selectedObjects.length;i++)
 {
    selectedObjects[i].flip = flipType === 'Flip Horizontal'? 'Horizontal':'Vertical';
 }
 diagram.dataBind();
}

 function onUploadSuccess(args) {
    var file1 = args.file;
    var file = file1.rawFile;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = loadDiagram;
}
//Load the diagraming object.
function loadDiagram(event) {
    diagram.loadDiagram(event.target.result);
}

 function showColorPicker (propertyName, toolbarName) {
    var fillElement =
        document.getElementById(propertyName).parentElement.getElementsByClassName('e-dropdown-btn')[0];
    fillElement.click();
    var popupElement = document.getElementById(fillElement.id + '-popup');
    var bounds = document.getElementsByClassName(toolbarName)[0].getBoundingClientRect();
    popupElement.style.left = bounds.left + 'px';
    popupElement.style.top = (bounds.top + 40) + 'px';
}

function updateAnnotation(value, fontSize, fontFamily) {
    for (var i = 0; i < diagram.selectedItems.nodes.length; i++) {
        var node = diagram.selectedItems.nodes[i];
        for (var j = 0; j < node.annotations.length; j++) {
            var annotationStyle = node.annotations[j].style;
            updateAnnotationStyle(value,annotationStyle,fontSize,fontFamily)
        }
    }  for (var i = 0; i < diagram.selectedItems.connectors.length; i++) {
        var connector = diagram.selectedItems.connectors[i];
        for (var j = 0; j < connector.annotations.length; j++) {
            var connectorAnnStyle = connector.annotations[j].style;
            updateAnnotationStyle(value,connectorAnnStyle,fontSize,fontFamily)
           
        }
    }
    
}

function updateAnnotationStyle(value,annotationStyle,fontSize,fontFamily)
{
    if (value === 'fontsize') {
        annotationStyle.fontSize = fontSize.value;
    } else if (value === 'Underline') {
        annotationStyle.textDecoration = 'Underline';
    } else if (value === 'fontfamily') {
        annotationStyle.fontFamily = fontFamily.value.toString();
    } else if (value === 'Bold') {
        annotationStyle.bold = true;
    } else if (value === 'Italic') {
        annotationStyle.italic = true;
    } 
    diagram.dataBind();
}

function updateFontColor(obj,args)
{
    for (var i = 0; i < obj.length; i++) {
        var node = obj[i];
        for (var j = 0; j < node.annotations.length; j++) {
            node.annotations[j].style.color = args.target.value;
            diagram.dataBind();
        }
    }
}
function updateFillColor(obj,args)
{
    for (var i = 0; i < obj.length; i++) {
        if(obj[i].sourceID!== undefined){
            obj[i].style.strokeColor = args.target.value;
            obj[i].style.fill = args.target.value;
            obj[i].targetDecorator.style.strokeColor = args.target.value;
            obj[i].targetDecorator.style.fill = args.target.value;
        }else{
            obj[i].style.fill = args.target.value;
        }
            diagram.dataBind();
        }
}


function lockObject (args) {
    for (var i = 0; i < diagram.selectedItems.nodes.length; i++) {
        var node = diagram.selectedItems.nodes[i];
        if (node.constraints & ej.diagrams.NodeConstraints.Drag) {
            node.constraints = ej.diagrams.NodeConstraints.PointerEvents | ej.diagrams.NodeConstraints.Select;
        } else {
            node.constraints = ej.diagrams.NodeConstraints.Default;
        }
    }
    for (var j = 0; j < diagram.selectedItems.connectors.length; j++) {
        var connector = diagram.selectedItems.connectors[j];
        if (connector.constraints & ej.diagrams.ConnectorConstraints.Drag) {
            connector.constraints = ej.diagrams.ConnectorConstraints.PointerEvents | ej.diagrams.ConnectorConstraints.Select;
        } else {
            connector.constraints = ej.diagrams.ConnectorConstraints.Default;
        }
    }
    diagram.dataBind();
}

 function zoomChange(args){
    var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
    if (args.item.text === 'Custom') {
        var ss = '';
    } else if (args.item.text === 'Fit To Screen') {
        zoomCurrentValue.content = diagram.scrollSettings.currentZoom = 'Fit ...';
        diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
    } else {
        var currentZoom = diagram.scrollSettings.currentZoom;
        var zoom = {};
        switch (args.item.text) {
            case '400%':
                zoom.zoomFactor = (4 / currentZoom) - 1;
                break;
            case '300%':
                zoom.zoomFactor = (3 / currentZoom) - 1;
                break;
            case '200%':
                zoom.zoomFactor = (2 / currentZoom) - 1;
                break;
            case '150%':
                zoom.zoomFactor = (1.5 / currentZoom) - 1;
                break;
            case '100%':
                zoom.zoomFactor = (1 / currentZoom) - 1;
                break;
            case '75%':
                zoom.zoomFactor = (0.75 / currentZoom) - 1;
                break;
            case '50%':
                zoom.zoomFactor = (0.5 / currentZoom) - 1;
                break;
            case '25%':
                zoom.zoomFactor = (0.25 / currentZoom) - 1;
                break;
        }
        zoomCurrentValue.content = diagram.scrollSettings.currentZoom = args.item.text;
        diagram.zoomTo(zoom);
    }
 }
 function pasteClick()
 {
    toolbarObj.items[11].disabled = false;
 }

 function onClickDisable(args) {
    if(args === false)
    {
        toolbarObj.items[9].disabled = false;
        toolbarObj.items[10].disabled = false;
        toolbarObj.items[21].disabled = false;
        toolbarObj.items[22].disabled = false;
        toolbarObj.items[24].disabled = false;
        toolbarObj.items[25].disabled = false;
        toolbarObj.items[27].disabled = false;
        toolbarObj.items[28].disabled = false;
        toolbarObj.items[29].disabled = false;
        toolbarObj.items[30].disabled = false;
        toolbarObj.items[32].disabled = false;
        toolbarObj.items[33].disabled = false;
    }
    else if(args === true ){
        var isTrue;
       
        if(diagram.selectedItems.connectors.length>0){
            isTrue = false;
            // toolbarObj.items[24].disabled = true;
            // toolbarObj.items[25].disabled = true;
        }
        else{
            isTrue = true;
            // toolbarObj.items[24].disabled = true;
            // toolbarObj.items[25].disabled = true;
        }
        toolbarObj.items[9].disabled = isTrue;
        toolbarObj.items[10].disabled = isTrue;
        toolbarObj.items[21].disabled = isTrue;
        toolbarObj.items[22].disabled = isTrue;
        toolbarObj.items[24].disabled = isTrue;
        toolbarObj.items[25].disabled = isTrue;
        toolbarObj.items[27].disabled = isTrue;
        toolbarObj.items[28].disabled = isTrue;
        toolbarObj.items[29].disabled = isTrue;
        toolbarObj.items[30].disabled = isTrue;
        toolbarObj.items[32].disabled = isTrue;
        toolbarObj.items[33].disabled = isTrue;
        }
  }

var diagram = new ej.diagrams.Diagram({
    width: '100%', height: '100%',
    nodes: nodes,
    connectors:connectors,
    drawingObject:{type:'Orthogonal'},
    pageSettings:{showPageBreaks:true},
    // pageSettings:{height:600,width:1500,showPageBreaks:true},
    pageSettings: {
        background: { color: '#FFFFFF' }, width: 600, height: 1460, margin: { left: 5, top: 5 },
        orientation: 'Landscape',showPageBreaks:true,
        // multiplePage: true,
    },
    scrollSettings: { canAutoScroll: true, scrollLimit: 'Infinity', minZoom: 0.25, maxZoom: 30 },
    getNodeDefaults: getNodeDefaults,
    getConnectorDefaults:getConnectorDefaults,
    contextMenuSettings: contextMenu,
    contextMenuClick:contextMenuClick,
    contextMenuOpen:contextMenuOpen,
    onUserHandleMouseDown:UserHandleClick,
    historyChange:historyChange,
    selectionChange:selectionChange, 
    // selectionChange: function (args) { DiagramClientSideEvents.prototype.selectionChange(args); },
    positionChange:positionChange,
    sizeChange:sizeChange,
    rotateChange:rotateChange,
    dragEnter:dragEnter,
    rulerSettings: {
        showRulers: true, dynamicGrid: true, horizontalRuler: {
            interval: 10,
            segmentWidth: 100,
            thickness: 25,
          },
          verticalRuler: {
            interval: 10,
            segmentWidth: 100,
            thickness: 25,
          },
    },created:created,
    commandManager: {
        commands: [{
                name: 'New',
                canExecute: function () {
                   return true
                },
                execute: function () {
                    diagram.clear();
                },
                gesture: {
                    key: ej.diagrams.Keys.N,
                    keyModifiers: ej.diagrams.KeyModifiers.Shift
                }
            },
            {
                name: 'Save',
                canExecute: function () {
                   return true
                },
                execute: function () {
                    download(diagram.saveDiagram());
                },
                gesture: {
                    key: ej.diagrams.Keys.S,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                name: 'Open',
                canExecute: function () {
                   return true
                },
                execute: function () {
                    document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                },
                gesture: {
                    key: ej.diagrams.Keys.O,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                name: 'Rotate Right 90',
                canExecute: function () {
                    if(diagram.selectedItems.nodes.length >0 || diagram.selectedItems.connectors.length>0){
                         return true
                    }
                   return false
                },
                execute: function () {
                    diagram.rotate(diagram.selectedItems,90);
                },
                gesture: {
                    key: ej.diagrams.Keys.R,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                name: 'Rotate Left 90',
                canExecute: function () {
                    if(diagram.selectedItems.nodes.length >0 || diagram.selectedItems.connectors.length>0){
                         return true
                    }
                   return false
                },
                execute: function () {
                    diagram.rotate(diagram.selectedItems,-90);
                },
                gesture: {
                    key: ej.diagrams.Keys.L,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                name: 'Flip Horizontal',
                canExecute: function () {
                    if(diagram.selectedItems.nodes.length >0 || diagram.selectedItems.connectors.length>0){
                         return true
                    }
                   return false
                },
                execute: function () {
                    flipObjects('Flip Horizontal');
                },
                gesture: {
                    key: ej.diagrams.Keys.H,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
            {
                name: 'Flip Vertical',
                canExecute: function () {
                    if(diagram.selectedItems.nodes.length >0 || diagram.selectedItems.connectors.length>0){
                         return true
                    }
                   return false
                },
                execute: function () {
                    flipObjects('Flip Vertical');
                },
                gesture: {
                    key: ej.diagrams.Keys.J,
                    keyModifiers: ej.diagrams.KeyModifiers.Control
                }
            },
        ]
    }
});

function dragEnter(obj)
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
}

function download(data) {
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
}
function onfocus(args)
{
    document.getElementById('menu').focus();
}

//Export the diagraming object based on the format.
function onselectExport(args) {
    exportFormat.value = args.item.text;
    exportDialog.show();
}

function onConnectorSelect(args){
    diagram.clearSelection();
    diagram.drawingObject.sourceID = '';
    diagram.drawingObject.type = args.item.text;
    diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
    diagram.selectedItems.userHandles = [];
    diagram.dataBind();
    removeSelectedToolbarItem();
    document.getElementById('conTypeBtn').classList.add('tb-item-selected');
}

function getNodeDefaults(obj)
{
    obj.userHandles = [];
    obj.ports = getNodePorts(obj);
    return obj;
}

function getConnectorDefaults(obj)
{
    if(obj.annotations.length>0){
    obj.annotations[0].style.fill = 'White'
    }
    return obj;
}

function selectionChange(args)
{
    if(args.state === 'Changed'){
        var selectedItems = diagram.selectedItems.nodes;
        selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
        var nodeContainer = document.getElementById('nodePropertyContainer');
        nodeContainer.classList.remove('multiple');
        nodeContainer.classList.remove('connector');
        if (selectedItems.length > 1) {
            multipleSelectionSettings(selectedItems);
        }
        else if (selectedItems.length === 1) {
            singleSelectionSettings(selectedItems[0]);
        }
        else {
            objectTypeChange('diagram');
        }
        if(args.newValue.length>0 && args.newValue[0] instanceof ej.diagrams.Node){
            diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All|ej.diagrams.SelectorConstraints.UserHandle, userHandles: handles };
            onClickDisable(false);
            if(diagram.selectedItems.nodes.length>0){
                drawingNode = diagram.selectedItems.nodes[diagram.selectedItems.nodes.length-1];
            }
        }
        else{
        diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All&~ej.diagrams.SelectorConstraints.UserHandle };
        onClickDisable(true);
        }
    }
    // if(args.newValue.length>0 && args.newValue[0] instanceof ej.diagrams.Node){
    //  diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All|ej.diagrams.SelectorConstraints.UserHandle, userHandles: handles };
    //     var showTextPanel = checkTextAnnotation();
    //     onClickDisable(false)
    //     if(diagram.selectedItems.nodes.length>0){
    //     drawingNode = diagram.selectedItems.nodes[diagram.selectedItems.nodes.length-1];
    //     bindNodeProperties(args.newValue[0]);
    //     }
    //     document.getElementById('dimen').style.display = 'block';
    //     if(args.newValue.length>1)
    //     {
    //         document.getElementById('dimen').style.display = 'none';
    //     }
    //     document.getElementById('diagramPropertyContainer').style.display = 'none';
    //     document.getElementById('textPropertyContainer').style.display = 'none';
    //     document.getElementById('connectorPropertyContainer').style.display = 'none';
    //     document.getElementById('nodePropertyContainer').style.display = 'block';
    //     if(showTextPanel){
    //     document.getElementById('textPropertyContainer').style.display = 'block';
    //     checkAnnotation(args.newValue)
    //     // bindTextProperties(args.newValue[0].annotations[0].style);
    //     }

    // }
    // else{
    //  diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All&~ej.diagrams.SelectorConstraints.UserHandle },

    //     onClickDisable(true)
    //     var showConTextPanel = checkTextAnnotation();
    //     if(args.newValue.length>0 && args.newValue[0] instanceof ej.diagrams.Connector){
    //         document.getElementById('diagramPropertyContainer').style.display = 'none';
    //         document.getElementById('nodePropertyContainer').style.display = 'none';
    //         document.getElementById('textPropertyContainer').style.display = 'none';
    //         document.getElementById('connectorPropertyContainer').style.display = 'block';
    //         if(showConTextPanel){
    //             document.getElementById('textPropertyContainer').style.display = 'block';
    //             checkAnnotation(args.newValue);
    //             // bindTextProperties(args.newValue[0].annotations[0].style)
    //             }
    //         bindConnectorProperties(args.newValue[0]);

    //     }
    //     else{
            
    //         document.getElementById('nodePropertyContainer').style.display = 'none';
    //         document.getElementById('connectorPropertyContainer').style.display = 'none';
    //         document.getElementById('textPropertyContainer').style.display = 'none';
    //         document.getElementById('diagramPropertyContainer').style.display = 'block';
    //     }
    // }
}


function objectTypeChange  (objectType) {
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
};

function multipleSelectionSettings (selectedItems) {
    objectTypeChange('None');
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
        bindNodeProperties(selectItem1.nodes[0]);
    }
    if (showConnectorPanel && !showNodePanel) {
        document.getElementById('connectorPropertyContainer').style.display = '';
        bindConnectorProperties(selectItem1.connectors[0]);
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
};

function singleSelectionSettings (selectedObject) {
    var object = null;
    if (selectedObject instanceof ej.diagrams.Node) {
        objectTypeChange('node');
        object = selectedObject;
        bindNodeProperties(object);
    }
    else if (selectedObject instanceof  ej.diagrams.Connector) {
        objectTypeChange('connector');
        object = selectedObject;
        bindConnectorProperties(object);
    }
    if (object.shape && object.shape.type === 'Text') {
        document.getElementById('textPropertyContainer').style.display = '';
        document.getElementById('toolbarTextAlignmentDiv').style.display = 'none';
        document.getElementById('textPositionDiv').style.display = 'none';
        document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
        bindTextProperties(object.style);
    }
    else if (object.annotations.length > 0 && object.annotations[0].content) {
        document.getElementById('textPropertyContainer').style.display = '';
        var annotation = null;
        document.getElementById('toolbarTextAlignmentDiv').style.display = '';
        document.getElementById('textPositionDiv').style.display = '';
        document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
        bindTextProperties(object.annotations[0].style);
        updateHorVertAlign(object.annotations[0].horizontalAlignment, object.annotations[0].verticalAlignment);
        if (object.annotations[0] instanceof ej.diagrams.ShapeAnnotation) {
            annotation = object.annotations[0];
            ddlTextPosition.dataSource = textProperties.getNodeTextPositions();
            ddlTextPosition.value = textProperties.textPosition = null;
            ddlTextPosition.dataBind();
            ddlTextPosition.value = textProperties.textPosition = getPosition(annotation.offset);
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
};

function checkAnnotation(args)
{
    for(i=0;i<args.length;i++)
    {
        if(args[i].annotations.length)
        {
            for(j=0;j<args[i].annotations.length;j++)
            {
                if(args[i].annotations[j].content)
                {
                    bindTextProperties(args[i].annotations[j].style);
                    updateHorVertAlign(args[i].annotations[j].horizontalAlignment, args[i].annotations[j].verticalAlignment);
                    if (args[i].annotations[j] instanceof ej.diagrams.ShapeAnnotation) {
                        annotation = args[i].annotations[j];
                        ddlTextPosition.dataSource = textProperties.getNodeTextPositions();
                        ddlTextPosition.value = textProperties.textPosition = null;
                        ddlTextPosition.dataBind();
                        ddlTextPosition.value = textProperties.textPosition = getPosition(annotation.offset);
                        ddlTextPosition.dataBind();
                    }
                    else if (args[i].annotations[j] instanceof ej.diagrams.PathAnnotation) {
                        annotation = args[i].annotations[j];
                        ddlTextPosition.dataSource = textProperties.getConnectorTextPositions();
                        ddlTextPosition.value = textProperties.textPosition = null;
                        ddlTextPosition.dataBind();
                        ddlTextPosition.value = textProperties.textPosition = annotation.alignment;
                        ddlTextPosition.dataBind();
                    }
                    break;
                }
            }
        }
    }
};

function getPosition(offset) {
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

function positionChange(args)
{
    if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
    nodeProperties.offsetX.value = args.newValue.offsetX;
    nodeProperties.offsetY.value = args.newValue.offsetY;
}
}

function sizeChange(args)
{
    if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
    nodeProperties.width.value = args.newValue.width;
    nodeProperties.height.value = args.newValue.height;
    nodeProperties.offsetX.value = args.newValue.offsetX;
    nodeProperties.offsetY.value = args.newValue.offsetY;
    }
}

function rotateChange(args)
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
}

function bindNodeProperties(node)
{
   nodeProperties.offsetX.value = node.offsetX;
   nodeProperties.offsetY.value = node.offsetY;
   nodeProperties.width.value = node.width;
   nodeProperties.height.value = node.height;
   nodeProperties.rotateAngle.value = node.rotateAngle;
   nodeProperties.rotateAngle.value = node.rotateAngle;
   nodeProperties.fillColor.value = getHexColor(node.style.fill);
   nodeProperties.strokeColor.value = getHexColor(node.style.strokeColor);
   nodeProperties.strokeWidth.value = node.style.strokeWidth;
   nodeProperties.strokeStyle.value = node.style.strokeDashArray ? node.style.strokeDashArray : 'None';
   nodeProperties.opacity.value = node.style.opacity * 100;
   nodeProperties.aspectRatio.checked = node.constraints & ej.diagrams.NodeConstraints.AspectRatio ? true : false;
   nodeProperties.gradient.checked = node.style.gradient.type !== 'None' ? true : false;
    var gradientElement = document.getElementById('gradientStyle');
        if (nodeProperties.gradient.checked) {
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

function bindConnectorProperties(connector)
{
    connectorProperties.lineType.value  = connector.type;
    connectorProperties.lineColor.value = this.getHexColor(connector.style.strokeColor);
    connectorProperties.lineStyle.value = connector.style.strokeDashArray ? connector.style.strokeDashArray : '';
    connectorProperties.lineWidth.value = connector.style.strokeWidth;
    connectorProperties.sourceType.value = connector.sourceDecorator.shape;
    connectorProperties.sourceSize.value = connector.sourceDecorator.width;
    connectorProperties.targetType.value = connector.targetDecorator.shape;
    connectorProperties.targetSize.value = connector.targetDecorator.width;
    connectorProperties.opacity.value = connector.style.opacity * 100;
    connectorProperties.lineJumpSize.value = connector.bridgeSpace;
    connectorProperties.lineJump.checked = connector.constraints & ej.diagrams.ConnectorConstraints.Bridging ? true : false;
}

function bindTextProperties(text)
{
    textProperties.fontColor.value = this.getHexColor(text.color);
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
    this.updateTextAlign(text.textAlign);

}

function updateTextAlign(textAlign)
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
}

function checkTextAnnotation()
{
    var selectedObjects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
    var showPanel = false;
    for(i = 0; i < selectedObjects.length; i++)
    {
        if(selectedObjects[i].annotations.length)
        {
            for(j = 0; j < selectedObjects[i].annotations.length; j++)
            {
                if(selectedObjects[i].annotations[j].content)
                {
                    showPanel = true;
                }
            }
        }
    }
    return showPanel;
}

function historyChange()
{
    diagram.historyManager.undoStack.length>0?toolbarObj.items[6].disabled = false:toolbarObj.items[6].disabled = true
    diagram.historyManager.redoStack.length>0?toolbarObj.items[7].disabled = false:toolbarObj.items[7].disabled = true
}

function getHexColor(colorStr) {
    var a = document.createElement('div');
    a.style.color = colorStr;
    var colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(function (a) {
        return parseInt(a, 10);
    });
    document.body.removeChild(a);
    return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
};

function UserHandleClick(args)
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
            diagram.drawingObject.sourceID = drawingNode.id;
           // diagram.drawingObject.sourceID = diagram.selectedItems.nodes[diagram.selectedItems.nodes.length-1].id;
            diagram.dataBind();
            break;
    }
    this.endAction = true;
}

var PaperSize = (function () {
    function PaperSize() {
    }
    return PaperSize;
}());

function getPaperSize(args)
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
}

function paperListChange(args)
{
    document.getElementById('pageDimension').style.display = 'none';
    document.getElementById('pageOrientation').style.display = '';
    var value = args.value || args.item.value;
    var paperSize = getPaperSize(value);
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
    updatePaperSelection(designContextMenu.items[1],args.value);
    diagram.dataBind();
}

function updatePaperSelection(items,value){
   for(i=0;i<items.items.length;i++)
   {
    if(value === items.items[i].value){
        items.items[i].iconCss = 'sf-icon-Selection';
    }
    else{
        items.items[i].iconCss = '';
    }
   }
}

//Create and add ports for node.
function getNodePorts(obj) {
    var ports = [
        { id: 'left', shape: 'Circle', offset: { x: 0, y: 0.5 } },
        { id: 'bottom', shape: 'Circle', offset: { x: 0.5, y: 1 } },
        { id: 'right', shape: 'Circle', offset: { x: 1, y: 0.5 } },
        { id: 'top', shape: 'Circle', offset: { x: 0.5, y: 0 } }
    ];
    return ports;
}

function created()
{
    diagram.fitToPage();
}

function contextMenuClick(args) {
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
        if(args.item.id === 'Default')
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
        pasteClick();
    }if (args.item.id === 'Copy') {
        diagram.copy();
        pasteClick();
    }if (args.item.id === 'Paste') {
        diagram.paste();
    }if (args.item.id === 'Delete'){
        diagram.remove();
    }
    if (args.item.id === 'SelectAll'){
        diagram.selectAll();
    }
}
function contextMenuOpen(args) {
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
    args.hiddenItems = hiddenId;
}

    diagram.appendTo('#diagram');

    var editContextMenu = new ej.navigations.ContextMenu({
        animationSettings: { effect: 'None' },
        items: getEditMenuItems(),
        onOpen: editContextMenuOpen,
        cssClass: "EditMenu",
        beforeItemRender: beforeItemRender,
        select: menuClick,
        beforeClose: arrangeMenuBeforeClose
    })
    editContextMenu.appendTo('#editContextMenu');

    var designContextMenu = new ej.navigations.ContextMenu({
        animationSettings: { effect: 'None' },
        items: getDesignMenuItems(),
        onOpen: designContextMenuOpen,
        cssClass: "DesignMenu",
        beforeItemRender: beforeItemRender,
        select: menuClick,
        beforeClose: arrangeMenuBeforeClose
    })
    designContextMenu.appendTo('#designContextMenu');

    var toolsContextMenu = new ej.navigations.ContextMenu({
        animationSettings: { effect: 'None' },
        items: getToolsMenuItems(),
        onOpen: toolsContextMenuOpen,
        cssClass: "ToolsMenu",
        beforeItemRender: beforeItemRender,
        select: menuClick,
        beforeClose: arrangeMenuBeforeClose
    });
    toolsContextMenu.appendTo('#toolsContextMenu');

    var btnDesignMenu = new ej.splitbuttons.DropDownButton({
        cssClass: 'db-dropdown-menu',
        target: '.e-contextmenu-wrapper.designMenu',
        content: 'Design',
        select: menuClick,
        beforeItemRender: beforeItemRender,
        beforeOpen: arrangeMenuBeforeOpen,
        beforeClose: arrangeMenuBeforeClose
    });
    btnDesignMenu.appendTo('#btnDesignMenu');
    var btnToolsMenu = new ej.splitbuttons.DropDownButton({
        cssClass: 'db-dropdown-menu',
        target: '.e-contextmenu-wrapper.toolsMenu',
        content: 'Tools',
        items: getToolsMenuItems(),
        select: menuClick,
        beforeItemRender: beforeItemRender,
        beforeOpen: arrangeMenuBeforeOpen,
        beforeClose: arrangeMenuBeforeClose
    });
    btnToolsMenu.appendTo('#btnToolsMenu');

    var btnEditMenu = new ej.splitbuttons.DropDownButton({
        cssClass: 'db-dropdown-menu',
        target: '.e-contextmenu-wrapper.editMenu',
        content: 'Edit',
        select: menuClick,
       beforeItemRender: beforeItemRender,
       beforeOpen: arrangeMenuBeforeOpen,
       beforeClose: arrangeMenuBeforeClose
    });
    btnEditMenu.appendTo('#btnEditMenu');

function minValue(){
    var size;
    if(diagram.selectedItems.nodes.length>0)
    {
      size =   diagram.selectedItems.nodes[0].annotations[0].style.fontSize;
    }
    else if(diagram.selectedItems.connectors.length>0){
        size =   diagram.selectedItems.connectors[0].annotations[0].style.fontSize;
    }
    return size;
}

    var btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items: zoomMenuItems, content: Math.round(diagram.scrollSettings.currentZoom*100) + ' %', select: zoomChange });
    btnZoomIncrement.appendTo('#btnZoomIncrement');

var palette = new ej.diagrams.SymbolPalette({
    expandMode: 'Multiple', symbolMargin: { left: 5, right: 15, top: 15, bottom: 10 }, symbolHeight: 60, symbolWidth: 55,
    palettes: [
        { id: 'Bpmn', expanded: true, symbols: bpmnShapes, title: 'BPMN Shapes' },
    ],
    width: '100%', height: '100%',
    getNodeDefaults: function (symbol) {
        symbol.style.strokeColor = '#757575';
        if(symbol.id === 'Message')
        {
            symbol.width = 72,symbol.height =48
        }
        else if(symbol.id === 'Message Flow')
        {
            symbol.shape =  {
                type: 'Bpmn',
                flow: 'Message',
                message: 'InitiatingMessage'
                    }
        }
    },

    
});

palette.appendTo('#symbolpalette');

// Property panel

var pageSettingsList = new ej.dropdowns.DropDownList({
    dataSource: paperList(),
    change: function (args) { paperListChange(args); },
    fields: { text: 'text', value: 'value' },
    index: 0
});
pageSettingsList.appendTo('#pageSettingsList');

var pagePortrait = new ej.buttons.RadioButton({
    label: 'Portrait',
    name: 'pageSettings',
    checked: false,
    change: function (args) { pageOrientationChange(args); },
});
pagePortrait.appendTo('#pagePortrait');

 var pageLandscape = new ej.buttons.RadioButton({
    label: 'Landscape',
    name: 'pageSettings',
    checked: true,
    change: function (args) { pageOrientationChange(args); },
});
pageLandscape.appendTo('#pageLandscape');

var pageWidth = new ej.inputs.NumericTextBox({
    min: 100,
    format: 'n0',
    value: diagram.pageSettings.width,
    change: function (args) { pageDimensionChange(args); }
});
pageWidth.appendTo('#pageWidth');

var pageHeight = new ej.inputs.NumericTextBox({
    min: 100,
    format: 'n0',
    value: diagram.pageSettings.height,
    change: function (args) { pageDimensionChange(args); }
});
pageHeight.appendTo('#pageHeight');


var pageBgColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    width: '100%',
    showButtons:false,
    // modeSwitcher: true,
    value: diagram.pageSettings.background.color,
    change: function (args) { pageBackgroundChange1(args); }
});
pageBgColor.appendTo('#pageBgColor');
var pageBgColorPickerBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
    pageBgColorPickerBtn.appendTo('#pageBgColorPickerBtn');

    var showPageBreaks = new ej.buttons.CheckBox({ label: 'Page Breaks', checked: diagram.pageSettings.showPageBreaks, change: function (args) { pageBreaksChange(args); } });
    showPageBreaks.appendTo('#showPageBreaks');

    var nodeOffsetX = new ej.inputs.NumericTextBox({
        format: 'n0',
        change: function(args) {
            if(args.isInteracted) {
               nodeProperties.offsetX.value = args.value;
               
               nodePropertyChange({ propertyName: 'offsetX', propertyValue: args });
            }
        }
    });
    nodeOffsetX.appendTo('#nodeOffsetX');
    nodeProperties.offsetX = nodeOffsetX;

    var nodeOffsetY = new ej.inputs.NumericTextBox({
        format: 'n0',
        change: function(args) {
            if(args.isInteracted) {
              nodeProperties.offsetY.value = args.value;
              nodePropertyChange({ propertyName: 'offsetY', propertyValue: args });
            }
        }
    });
    nodeOffsetY.appendTo('#nodeOffsetY');
    nodeProperties.offsetY = nodeOffsetY;

    var nodeWidth = new ej.inputs.NumericTextBox({
        format: 'n0',
        min: 1,
        change: function(args) {
            if(args.isInteracted) {
              nodeProperties.width.value = args.value;
              nodePropertyChange({ propertyName: 'width', propertyValue: args });
            }
        }
    });
    nodeWidth.appendTo('#nodeWidth');
    nodeProperties.width = nodeWidth;

    var nodeHeight = new ej.inputs.NumericTextBox({
        format: 'n0',
        min: 1,
        change: function(args) {
            if(args.isInteracted) {
              nodeProperties.height.value = args.value;
              nodePropertyChange({ propertyName: 'height', propertyValue: args });
            }
        }
    });
    nodeHeight.appendTo('#nodeHeight');
   nodeProperties.height = nodeHeight;

   var aspectRatio = new ej.buttons.CheckBox({ label: 'Aspect Ratio',
   change: function(args) {
       nodePropertyChange({propertyName: 'aspectRatio', propertyValue: args.checked});
      }
   });
   aspectRatio.appendTo('#aspectRatio');
   nodeProperties.aspectRatio = aspectRatio;

   var rotateIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-Rotate1 tb-icons' });
   rotateIconBtn.appendTo('#rotateIconBtn');

   var nodeRotateAngle = new ej.inputs.NumericTextBox({
       format: 'n0',
       change: function(args) {
           nodeProperties.rotateAngle.value = args.value;
           nodePropertyChange({ propertyName: 'rotateAngle', propertyValue: args });
       }
   });
   nodeRotateAngle.appendTo('#nodeRotateAngle');
   nodeProperties.rotateAngle = nodeRotateAngle;

   var toolbarNodeInsert = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: toolbarInsertClick,
    items: [
        { prefixIcon: 'sf-icon-InsertLink tb-icons', tooltipText: 'Insert Link', cssClass: 'tb-item-start' },
        // { prefixIcon: 'sf-icon-InsertImage tb-icons', tooltipText: 'Insert Image', cssClass: 'tb-item-end' }
    ]
});
toolbarNodeInsert.appendTo('#toolbarNodeInsert');

var nodeFillColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function(args) {
        nodePropertyChange({propertyName: 'fillColor', propertyValue: args.currentValue.hex});
    }
});
nodeFillColor.appendTo('#nodeFillColor');
nodeProperties.fillColor = nodeFillColor;

var gradient = new ej.buttons.CheckBox({ label: 'Gradient',
    change: function(args) {
        var gradientElement = document.getElementById('gradientStyle');
        if (args.checked) {
            gradientElement.className = 'row db-prop-row db-gradient-style-show';
        }
        else {
            gradientElement.className = 'row db-prop-row db-gradient-style-hide';
        }
        nodePropertyChange({ propertyName: 'gradient', propertyValue: args });
      }
    });
    gradient.appendTo('#gradient');
    nodeProperties.gradient = gradient;

var fillColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
fillColorIconBtn.appendTo('#fillColorIconBtn');

var gradientDirectionDropdown = new ej.dropdowns.DropDownList({
    dataSource: gradientDirections(),
    fields: { text: 'text', value: 'value' },
    popupWidth: '200px',
    index: 0,
    change: function(args) {
        nodeProperties.gradientDirection.value = args.itemData.text;
        nodePropertyChange({ propertyName: 'gradientDirection', propertyValue: args });
    }
});
gradientDirectionDropdown.appendTo('#gradientDirectionDropdown');
nodeProperties.gradientDirection = gradientDirectionDropdown;

var nodeGradientColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function(args) {
        nodeProperties.gradientColor.value = args.currentValue.hex;
        nodePropertyChange({ propertyName: 'gradientColor', propertyValue: args });
    }
});
nodeGradientColor.appendTo('#nodeGradientColor');
nodeProperties.gradientColor = nodeGradientColor;

var gradientColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
gradientColorIconBtn.appendTo('#gradientColorIconBtn');

var nodeStrokeColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function(args) {
        nodeProperties.strokeColor.value = args.currentValue.hex;
        nodePropertyChange({ propertyName: 'strokeColor', propertyValue: args });
    }
});
nodeStrokeColor.appendTo('#nodeStrokeColor');
nodeProperties.strokeColor = nodeStrokeColor;

var strokeColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-Pickers tb-icons' });
strokeColorIconBtn.appendTo('#strokeColorIconBtn');

var nodeBorderStyle = new ej.dropdowns.DropDownList({
    dataSource: borderStyles(),
    fields: { text: 'text', value: 'value' },
    index: 0,
    popupWidth: '160px',
    itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    change: function (args) {
        nodeProperties.strokeStyle.value= args.itemData.text;
        nodePropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
    }
});
nodeBorderStyle.appendTo('#nodeBorderStyle');
nodeProperties.strokeStyle = nodeBorderStyle;

var nodeStrokeWidth = new ej.inputs.NumericTextBox({
    min: 0,
    step: 0.5,
    change: function (args) {
       nodeProperties.strokeWidth.value= args.value;
       nodePropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
   }
});
nodeStrokeWidth.appendTo('#nodeStrokeWidth');
nodeProperties.strokeWidth = nodeStrokeWidth;

var nodeOpacitySlider = new ej.inputs.Slider({
    min: 0,
    max: 100,
    step: 10,
    type: 'MinRange',
    value: 1,
    change: function (args) {
       nodeProperties.opacity.value= args.value;
       nodePropertyChange({ propertyName: 'opacity', propertyValue: args });
   }
});
nodeOpacitySlider.appendTo('#nodeOpacitySlider');
nodeProperties.opacity =  nodeOpacitySlider;

var lineTypeDropdown = new ej.dropdowns.DropDownList({
    dataSource: lineTypes(),
    fields: { text: 'text', value: 'value' },
    change: function(args) {
        connectorProperties.lineType.value = args.value;
        connectorPropertyChange({ propertyName: 'lineType', propertyValue: args });
    }
});
lineTypeDropdown.appendTo('#lineTypeDropdown');
connectorProperties.lineType = lineTypeDropdown;

var lineColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function(args) {
        connectorProperties.lineColor.value = args.currentValue.hex;
        connectorPropertyChange({ propertyName: 'lineColor', propertyValue: args });
    }
});
lineColor.appendTo('#lineColor');
connectorProperties.lineColor = lineColor;

var lineColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-Pickers tb-icons' });
lineColorIconBtn.appendTo('#lineColorIconBtn');

var lineStyle = new ej.dropdowns.DropDownList({
    dataSource: borderStyles(),
    fields: { text: 'text', value: 'value' },
    itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    change: function(args) {
        connectorProperties.lineStyle.value = args.value;
        connectorPropertyChange({ propertyName: 'lineStyle', propertyValue: args });
    }
});
lineStyle.appendTo('#lineStyle');
connectorProperties.lineStyle =  lineStyle;

var lineWidth = new ej.inputs.NumericTextBox({
    min: 0.5,
    step: 0.5,
    change: function(args) {
        connectorProperties.lineWidth.value = args.value;
        connectorPropertyChange({ propertyName: 'lineWidth', propertyValue: args });
    }
});
lineWidth.appendTo('#lineWidth');
connectorProperties.lineWidth = lineWidth;

var sourceType = new ej.dropdowns.DropDownList({
    dataSource: decoratorList(),
    fields: { text: 'text', value: 'value' },
    change: function(args) {
        connectorProperties.sourceType.value = args.value;
        connectorPropertyChange({ propertyName: 'sourceType', propertyValue: args });
    }
});
sourceType.appendTo('#sourceType');
connectorProperties.sourceType = sourceType;

var sourceSize = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    change: function(args) {
        connectorProperties.sourceSize.value = args.value;
        connectorPropertyChange({ propertyName: 'sourceSize', propertyValue: args });
    }
});
sourceSize.appendTo('#sourceSize');
connectorProperties.sourceSize = sourceSize;

var targetType = new ej.dropdowns.DropDownList({
    dataSource: decoratorList(),
    fields: { text: 'text', value: 'value' },
    change: function(args) {
        connectorProperties.targetType.value = args.value;
        connectorPropertyChange({ propertyName: 'targetType', propertyValue: args });
    }
});
targetType.appendTo('#targetType');
connectorProperties.targetType = targetType;

var targetSize = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    change: function(args) {
        connectorProperties.targetSize.value = args.value;
        connectorPropertyChange({ propertyName: 'targetSize', propertyValue: args });
    }
});
targetSize.appendTo('#targetSize');
connectorProperties.targetSize = targetSize;

var lineJump = new ej.buttons.CheckBox({ label: 'Bridging',
    change: function(args) {
        if (args.checked) {
            document.getElementById('lineJumpSizeDiv').style.display = '';
        }
        else {
            document.getElementById('lineJumpSizeDiv').style.display = 'none';
        }
        connectorPropertyChange({propertyName: 'lineJump', propertyValue: args});
       }
    });
    lineJump.appendTo('#lineJump');
    connectorProperties.lineJump = lineJump;

    var lineJumpSize = new ej.inputs.NumericTextBox({
        min: 1,
        step: 1,
        change: function(args) {
            connectorProperties.lineJumpSize.value = args.value;
            connectorPropertyChange({propertyName: 'lineJumpSize', propertyValue: args});
         }
    });
    lineJumpSize.appendTo('#lineJumpSize');
    connectorProperties.lineJumpSize = lineJumpSize;

    var default1 = new ej.inputs.Slider({
        min: 0,
        max: 100,
        step: 10,
        type: 'MinRange',
        value: 0,
        change: function (args) {
            connectorProperties.opacity.value= args.value;
            connectorPropertyChange({ propertyName: 'opacity', propertyValue: args });
        }
   });
   default1.appendTo('#default1');
   connectorProperties.opacity = default1;

var fontFamily = new ej.dropdowns.DropDownList({
dataSource: fontFamilyList(),
    height: '34px',
    fields: { text: 'text', value: 'value' },
    change: function (args) {
        textProperties.fontFamily.value = args.value;
        textPropertyChange({propertyName: 'fontFamily', propertyValue: args});
    }
});
fontFamily.appendTo('#fontFamily');
textProperties.fontFamily = fontFamily;

var fontSizeTextProperties = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    change: function (args) {
        textProperties.fontSize.value = args.value;
        textPropertyChange({propertyName: 'fontSize', propertyValue: args});
    }
});
fontSizeTextProperties.appendTo('#fontSizeTextProperties');
textProperties.fontSize = fontSizeTextProperties;


var ddlTextPosition = new ej.dropdowns.DropDownList({
    dataSource: textPositionDataSource(),
    fields: { text: 'text', value: 'value' },
    index: 4,
    change: function (args) { textPositionChange(args); }
});
ddlTextPosition.appendTo('#ddlTextPosition');

var textColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function (args) {
        textProperties.fontColor.value = args.currentValue.hex;
        textPropertyChange({propertyName: 'fontColor', propertyValue: args});
    }
});
textColor.appendTo('#textColor');
textProperties.fontColor = textColor;

var fontColorBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
fontColorBtn.appendTo('#fontColorBtn');

var toolbarTextStyle = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: function (args) { toolbarTextStyleChange(args); },
    items: [
        { prefixIcon: 'sf-icon-Bold tb-icons', tooltipText: 'Bold', cssClass: 'tb-item-start' },
        { prefixIcon: 'sf-icon-Italic tb-icons', tooltipText: 'Italic', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-Underline tb-icons', tooltipText: 'Underline', cssClass: 'tb-item-end' }
    ]
});
toolbarTextStyle.appendTo('#toolbarTextStyle');

var toolbarTextSubAlignment = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked:  function (args) { toolbarTextSubAlignChange(args); },
    items: [
        { prefixIcon: 'sf-icon-ParaAlignLeft tb-icons', tooltipText: 'Align Text Left', cssClass: 'tb-item-start' },
        { prefixIcon: 'sf-icon-ParaAlignCenter tb-icons', tooltipText: 'Align Text Center', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-ParaAlignRight tb-icons', tooltipText: 'Align Text Right', cssClass: 'tb-item-end' }
    ]
});
toolbarTextSubAlignment.appendTo('#toolbarTextSubAlignment');

var toolbarTextAlignment = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: function (args) { toolbarTextAlignChange(args); },
    items: [
        { prefixIcon: 'sf-icon-TextLeft tb-icons', tooltipText: 'Align Right', cssClass: 'tb-item-start' },
        { prefixIcon: 'sf-icon-TextVerticalCenter tb-icons', tooltipText: 'Align Center', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-TextRight tb-icons', tooltipText: 'Align Left', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-TextTop tb-icons', tooltipText: 'Align Bottom', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-TextHorizontalCenter tb-icons', tooltipText: 'Align Middle', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-TextBottom tb-icons', tooltipText: 'Align Top', cssClass: 'tb-item-end' }
    ]
});
toolbarTextAlignment.appendTo('#toolbarTextAlignment');

var opacityTextSlider = new ej.inputs.Slider({
    min: 0,
    max: 100,
    step: 10,
    type: 'MinRange',
    value: 0,
    change: function (args) {
        textProperties.opacity.value= args.value;
        textPropertyChange({ propertyName: 'opacity', propertyValue: args });
    }
});
opacityTextSlider.appendTo('#opacityTextSlider');
textProperties.opacity = opacityTextSlider;

function hideMenuBar() {
    var expandcollapseicon = document.getElementById('btnHideToolbar');
    var button1 = expandcollapseicon.ej2_instances[0];
    if (button1.iconCss.indexOf('sf-icon-Collapse tb-icons') > -1) {
        button1.iconCss = 'sf-icon-DownArrow2 tb-icons';
    } else {
        button1.iconCss = 'sf-icon-Collapse tb-icons';
    }
    hideElements('hide-menubar', diagram);
    // diagram.refresh();
};

function hideElements(elementType, diagram, diagramType) {
    var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
    if (diagramContainer.classList.contains(elementType)) {
        if (!(diagramType === 'mindmap-diagram' || diagramType === 'orgchart-diagram')) {
            diagramContainer.classList.remove(elementType);
        }
    }
    else {
        diagramContainer.classList.add(elementType);
    }
    if (diagram) {
        diagram.updateViewPort();
    }
};

function lineTypes() {
    var lineTypes = [
        { text: 'Straight', value: 'Straight' }, { text: 'Orthogonal', value: 'Orthogonal' },
        { text: 'Bezier', value: 'Bezier' }
    ];
    return lineTypes;
};

function decoratorList() {
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

function fontFamilyList()
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
}

function textPositionDataSource() {
    var textPosition = [
        { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
        { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
        { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
        { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
        { text: 'BottomRight', value: 'BottomRight' },
    ];
    return textPosition;
};

function textPositionChange(args) {
    if (args.value !== null) {
        this.textPropertyChange1('textPosition', args.value);
    }
};

function textPropertyChange1(propertyName, propertyValue) {
    if (!diagram.preventPropertyChange) {
        var selectedObjects = diagram.selectedItems.nodes;
        selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
        propertyName = propertyName.toLowerCase();
        if (selectedObjects.length > 0) {
            for (var i = 0; i < selectedObjects.length; i++) {
                var node = selectedObjects[i];
                if (node instanceof ej.diagrams.Node || node instanceof ej.diagrams.Connector) {
                    if (node.annotations.length > 0) {
                        for (var j = 0; j < node.annotations.length; j++) {
                            var annotation = null;
                            if (node.annotations[j] instanceof ej.diagrams.ShapeAnnotation) {
                                annotation = node.annotations[j];
                                if (propertyName === 'textposition') {
                                    textProperties.textPosition = propertyValue.toString();
                                    annotation.offset = getOffset(propertyValue);
                                }
                            }
                            else if (node.annotations[j] instanceof ej.diagrams.PathAnnotation) {
                                annotation = node.annotations[j];
                                if (propertyName === 'textposition') {
                                    textProperties.textPosition = propertyValue.toString();
                                    annotation.alignment = textProperties.textPosition;
                                }
                            }
                            if (propertyName === 'left' || propertyName === 'right' || propertyName === 'center') {
                                annotation.horizontalAlignment = propertyValue;
                                updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                            }
                            else if (propertyName === 'top' || propertyName === 'bottom') {
                                annotation.verticalAlignment = propertyValue;
                                updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                            }
                            else if (propertyName === 'middle') {
                                annotation.verticalAlignment = 'Center';
                                updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                            }
                            else {
                                this.updateTextProperties1(propertyName, propertyValue, annotation.style);
                            }
                        }
                    }
                    else if (node.shape && node.shape.type === 'Text') {
                        this.updateTextProperties1(propertyName, propertyValue, node.style);
                    }
                }
            }
            diagram.dataBind();
        }
    }
};

function getOffset (position) {
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
};

function updateHorVertAlign(horizontalAlignment, verticalAlignment) {
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

function toolbarTextStyleChange(args) {
    this.textPropertyChange1(args.item.tooltipText, false);
};
function toolbarTextSubAlignChange(args) {
    var propertyName = args.item.tooltipText.replace(/[' ']/g, '');
    this.textPropertyChange1(propertyName, propertyName);
};
function toolbarTextAlignChange(args) {
    var propertyName = args.item.tooltipText.replace('Align ', '');
    this.textPropertyChange1(propertyName, propertyName);
};

function textPropertyChange(args) {
    if (!diagram.preventPropertyChange) {
        if (diagram) {
            var selectedObjects = diagram.selectedItems.nodes;
            selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
            var propertyName = args.propertyName.toString().toLowerCase();
            if (selectedObjects.length > 0) {
                for (var i = 0; i < selectedObjects.length; i++) {
                    var node = selectedObjects[i];
                    if (node instanceof ej.diagrams.Node || node instanceof ej.diagrams.Connector) {
                        if (node.annotations.length > 0) {
                            for (var j = 0; j < node.annotations.length; j++) {
                                var annotation = node.annotations[j].style;
                                this.updateTextProperties(propertyName, annotation);
                            }
                        }
                    }
                }
                diagram.dataBind();
                this.isModified = true;
            }
        }
    }
};

function updateTextProperties (propertyName, annotation) {
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
function updateTextProperties1 (propertyName, propertyValue, annotation) {
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
            updateTextAlign(annotation.textAlign);
            break;
    }
};

function updateToolbarState (toolbarName, isSelected, index) {
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

function pageOrientationChange(args)
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
}

function pageDimensionChange(args)
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
}
function paperList  () {
    var paperList = [
        { text: 'Letter (8.5 in x 11 in)', value: 'Letter' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
        { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
        { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
        { text: 'A6 (105 mm x 148 mm)', value: 'A6' }, { text: 'Custom', value: 'Custom' },
    ];
    return paperList;
};
function paperList1  () {
    var paperList1 = [
        { text: 'Letter (8.5 in x 11 in)', value: 'Letter',iconCss:'sf-icon-Selection' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
        { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
        { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
        { text: 'A6 (105 mm x 148 mm)', value: 'A6' },
    ];
    return paperList1;
};

function pageBackgroundChange1(args)
{
    if (args.currentValue) {
        diagram.pageSettings.background = {
            color: args.currentValue.rgba
        };
        // document.getElementById('background').style.display = 'none';
        diagram.dataBind();
    }
};
 function pageBreaksChange(args)
 {
    if (args.event) {
        diagram.pageSettings.showPageBreaks = args.checked;
        diagram.dataBind();
        var items = btnViewMenu.items;
        items[4].iconCss = items[4].iconCss ? '' : 'sf-icon-Selection';
    }
 }

 function gradientDirections () {
    var gradientDirections = [
        { text: 'BottomToTop', value: 'BottomToTop' }, { text: 'TopToBottom', value: 'TopToBottom' },
        { text: 'RightToLeft', value: 'RightToLeft' }, { text: 'LeftToRight', value: 'LeftToRight' }
    ];
    return gradientDirections;
};

function borderStyles() {
    var borderStyles = [
        { text: '', value: '', className: 'ddl-svg-style ddl_linestyle_none' },
        { text: '1,2', value: '1,2', className: 'ddl-svg-style ddl_linestyle_one_two' },
        { text: '3,3', value: '3,3', className: 'ddl-svg-style ddl_linestyle_three_three' },
        { text: '5,3', value: '5,3', className: 'ddl-svg-style ddl_linestyle_five_three' },
        { text: '4,4,1', value: '4,4,1', className: 'ddl-svg-style ddl_linestyle_four_four_one' }
    ];
    return borderStyles;
};

 function nodePropertyChange(args)
 {
    if (!diagram.preventPropertyChange) {
        if (diagram) {
            if (diagram.selectedItems.nodes.length > 0) {
                var selectedNodes = diagram.selectedItems.nodes;
                for (var i = 0; i < selectedNodes.length; i++) {
                    var node = selectedNodes[i];
                    var propertyName1 = args.propertyName.toString().toLowerCase();
                    switch (propertyName1) {
                        case 'offsetx':
                            node.offsetX = nodeProperties.offsetX.value;
                            nodeOffsetX.value = nodeProperties.offsetX.value;
                            break;
                        case 'offsety':
                            node.offsetY = nodeProperties.offsetY.value;
                            break;
                        case 'width':
                            node.width = nodeProperties.width.value;
                            break;
                        case 'height':
                            node.height = nodeProperties.height.value;
                            break;
                        case 'rotateangle':
                            node.rotateAngle = nodeProperties.rotateAngle.value;
                            break;
                        case 'aspectratio':
                            node.constraints = node.constraints ^ ej.diagrams.NodeConstraints.AspectRatio;
                            break;
                    }
                    if (!node.children) {
                        this.applyNodeStyle(propertyName1, node, args.propertyValue);
                    }
                    else {
                        for (var j = 0; j < node.children.length; j++) {
                            this.applyNodeStyle(propertyName1, diagram.getObject(node.children[j]), args.propertyValue);
                        }
                    }
                }
                this.isModified = true;
            }
            if (diagram.connectors.length > 0) {
                var selectedNodes = diagram.selectedItems.connectors;
                for (var i = 0; i < selectedNodes.length; i++) {
                    switch (args.propertyName.toString().toLowerCase()) {
                        case 'strokecolor':
                            connectorProperties.lineColor.value = getColor(nodeProperties.strokeColor.value);
                            break;
                        case 'strokewidth':
                            connectorProperties.lineWidth.value = nodeProperties.strokeWidth.value;
                            break;
                        case 'strokestyle':
                            connectorProperties.lineStyle.value = nodeProperties.strokeStyle.value;
                            break;
                        case 'opacity':
                            connectorProperties.opacity.value = nodeProperties.opacity.value;
                            break;
                    }
                }
                this.isModified = true;
            }
            diagram.dataBind();
        }
    }
};

function connectorPropertyChange(args) {
    if (!diagram.preventPropertyChange) {
        if (diagram && diagram.selectedItems.connectors.length > 0) {
            var selectedNodes = diagram.selectedItems.connectors;
            for (var i = 0; i < selectedNodes.length; i++) {
                var connector = selectedNodes[i];
                switch (args.propertyName.toString().toLowerCase()) {
                    case 'linecolor':
                        connector.style.strokeColor = this.getColor(connectorProperties.lineColor.value);
                        connector.sourceDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                        connector.targetDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                        break;
                    case 'linewidth':
                        connector.style.strokeWidth = connectorProperties.lineWidth.value;
                        if (connector.sourceDecorator.style) {
                            connector.sourceDecorator.style.strokeWidth = connector.style.strokeWidth;
                        }
                        else {
                            connector.sourceDecorator.style = { strokeWidth: connector.style.strokeWidth };
                        }
                        if (connector.targetDecorator.style) {
                            connector.targetDecorator.style.strokeWidth = connector.style.strokeWidth;
                        }
                        else {
                            connector.targetDecorator.style = { strokeWidth: connector.style.strokeWidth };
                        }
                        break;
                    case 'linestyle':
                        connector.style.strokeDashArray = connectorProperties.lineStyle.value;
                        break;
                    case 'linetype':
                        connector.type = connectorProperties.lineType.value;
                        break;
                    case 'sourcetype':
                        connector.sourceDecorator.shape = connectorProperties.sourceType.value;
                        break;
                    case 'targettype':
                        connector.targetDecorator.shape = connectorProperties.targetType.value;
                        break;
                    case 'sourcesize':
                        connector.sourceDecorator.width = connector.sourceDecorator.height = connectorProperties.sourceSize.value;
                        break;
                    case 'targetsize':
                        connector.targetDecorator.width = connector.targetDecorator.height = connectorProperties.targetSize.value;
                        break;
                    case 'opacity':
                        connector.style.opacity = connectorProperties.opacity.value / 100;
                        connector.targetDecorator.style.opacity = connector.style.opacity;
                        connector.sourceDecorator.style.opacity = connector.style.opacity;
                        document.getElementById("connectorOpacitySliderText").value = connectorProperties.opacity.value + '%';
                        break;
                    case 'linejump':
                        if (args.propertyValue.checked) {
                            connector.constraints = connector.constraints | ej.diagrams.ConnectorConstraints.Bridging;
                        }
                        else {
                            connector.constraints = connector.constraints & ~ej.diagrams.ConnectorConstraints.Bridging;
                        }
                        break;
                    case 'linejumpsize':
                        connector.bridgeSpace = connectorProperties.lineJumpSize.value;
                        break;
                }
            }
            diagram.dataBind();
            this.isModified = true;
        }
    }
};

function applyNodeStyle  (propertyName, node, value) {
    var addInfo = node.addInfo || {};
    switch (propertyName) {
        case 'fillcolor':
            node.style.fill = getColor(value);
            // nodeFillColor.value = nodeProperties.fillColor;
            if (value && value.checked) {
                NodeProperties.prototype.getGradient(node);
            }
            break;
        case 'strokecolor':
            node.style.strokeColor = getColor(nodeProperties.strokeColor.value);
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
function getColor(colorName) {
    if (window.navigator.msSaveBlob && colorName.length === 9) {
        return colorName.substring(0, 7);
    }
    return colorName;
};
var hyperlinkDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Insert Link',
    target: document.body,
    isModal:true,
    animationSettings: { effect: 'None' },
    showCloseIcon: true,
    visible: false,
    buttons: getDialogButtons('hyperlink'),
    content: '<div id="hyperlinkDialogContent"><div class="row"><div class="row">Enter URL</div><div class="row db-dialog-child-prop-row"><input type="text" id="hyperlink">' +
    '</div></div><div class="row db-dialog-prop-row"><div class="row">Link Text (Optional)</div><div class="row db-dialog-child-prop-row"><input type="text" id="hyperlinkText"></div></div></div>'
});
hyperlinkDialog.appendTo('#hyperlinkDialog');

var fileUploadDialog = new ej.popups.Dialog({
    width: '500px',
    height: '485px',
    header: 'Upload File',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: getUploadButtons(),
    visible: false,
    showCloseIcon: true,
    allowDragging: true,
    content: ' <div id="uploadDialogContent" class="db-upload-content firstPage"> <div id="tooltip"> <div id="uploadInformationDiv" class="row db-dialog-prop-row" style="margin-top: 0px;">' +
    ' <div class="row"> <div class="row" style="font-size: 12px;font-weight: 500;color: black;"><div class="db-info-text">Choose Format</div>' +
    ' <div class="db-format-type" style="display: none"> </div> </div><div class="row db-dialog-child-prop-row"><div class="col-xs-3 db-prop-col-style">' +
    ' <input id="csvFormat" type="radio"></div> <div class="col-xs-3 db-prop-col-style"><input id="xmlFormat" type="radio"></div> <div class="col-xs-3 db-prop-col-style">' +
    '<input id="jsonFormat" type="radio"> </div> </div> </div> <div class="row db-dialog-prop-row" style="padding: 10px; background-color: #FFF7B5; border: 1px solid #FFF7B5">' +
    '<div class="db-info-parent" style="width: 10%; background-color:transparent; height: 60px;"></div> <div style="float:left; width: calc(90% - 5px)">' +
    ' <ul style="padding-left: 25px; margin-bottom: 0px"><li style="margin-bottom: 5px"><span id="descriptionText1" style="color: #515151;font-size: 11px;line-height: 15px;">Makesure that the every column of your table has a header</span>' +
    '</li><li><span id="descriptionText2" style="color: #515151;font-size: 11px;line-height: 15px;">Each employee should have a reporting person (except for top most employee of the organization) and it should be indicated by any field from your data source.</span></li></ul>' +
    '</div></div><div class="row db-dialog-prop-row"><button id="btnDownloadFile"></button></div><div class="row"> <div id="dropArea">' +
    '<span id="dropRegion" class="droparea"> Drop files here or <a href="" id="browseFile"><u>Browse</u></a></span><input type="file" id="defaultfileupload" name="UploadFiles"/>' +
    '</div></div></div><div id="parentChildRelationDiv" class="row db-dialog-prop-row"> <div class="row db-dialog-child-prop-row" style="margin-top:20px">' +
    '<div class="row"><div class="db-info-text">Employee Id</div><div class="db-info-style db-employee-id"></div></div><div class="row db-dialog-child-prop-row">' +
    '<input type="text" id="employeeId"/></div></div><div class="row db-dialog-prop-row"><div class="row"><div class="db-info-text"> Supervisor Id</div>' +
    ' <div class="db-info-style db-supervisor-id"> </div> </div> <div class="row db-dialog-child-prop-row"><input type="text" id="superVisorId"/></div></div></div>' +
    '<div id="moreInformationDiv" class="row db-dialog-prop-row"><div id="bindingFields" class="row"><div class="row"><div class="db-info-text">Name</div>' +
    '<div class="db-info-style db-nameField-id"></div></div><div class="row db-dialog-child-prop-row"><input type="text" id="orgNameField"/></div></div>' +
    '<div id="bindingFields" class="row db-dialog-prop-row" style="margin-top:20px"><div class="row"><div class="db-info-text">Binding Fields</div><div class="db-info-style db-bindingField-id">' +
    '</div></div><div class="row db-dialog-child-prop-row"><input type="text" id="orgBindingFields" /></div></div><div id="imageFields" class="row db-dialog-prop-row">' +
    '<div class="row"><div class="db-info-text">Image Field</div><div class="db-info-style db-imageField-id"></div></div>' +
    '<div class="row db-dialog-child-prop-row"><input type="text" id="orgImageField"/></div></div> <div id="additionalFields" class="row db-dialog-prop-row">' +
    '<div class="row"><div class="db-info-text">Additional Fields</div><div class="db-info-style db-additionalField-id"></div></div><div class="row db-dialog-child-prop-row">' +
    '<input type="text" id="orgAdditionalField"/></div></div></div></div></div>'
});
fileUploadDialog.appendTo('#fileUploadDialog');

var printDialog = new ej.popups.Dialog({
    width: '335px',
    header: 'Print Diagram',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: getDialogButtons('print'),
    visible: false,
    showCloseIcon: true,
    content: '<div id="printDialogContent"><div class="row"><div class="row">Region</div> <div class="row db-dialog-child-prop-row">' +
    '<input type="text" id="printRegionDropdown"/> </div> </div><div class="row db-dialog-prop-row"><div class="row">Print Settings</div>' +
    '<div class="row db-dialog-child-prop-row"><input type="text" id="printPaperSizeDropdown"/> </div> </div>' +
    '<div id="printCustomSize" class="row db-dialog-prop-row" style="display:none; height: 28px;"> <div class="col-xs-6 db-col-left">' +
    '<div class="db-text-container"><div class="db-text"><span>W</span></div><div class="db-text-input"><input id="printPageWidth" type="text" />' +
    '</div> </div> </div> <div class="col-xs-6 db-col-right"><div class="db-text-container"> <div class="db-text"><span>H</span></div>' +
    '<div class="db-text-input"><input id="printPageHeight" type="text" /></div></div></div></div><div id="printOrientation" class="row db-dialog-prop-row" style="height: 28px; padding: 5px 0px;">' +
    '<div class="col-xs-3 db-prop-col-style" style="margin-right: 8px;"><input id="printPortrait" type="radio"></div> <div class="col-xs-3 db-prop-col-style">' +
    '<input id="printLandscape" type="radio"></div></div> <div class="row db-dialog-prop-row" style="margin-top: 16px"> <input id="printMultiplePage" type="checkbox" /> </div> </div>'
});
printDialog.appendTo('#printDialog');

  // dropdown template for printDialog control
  var printRegionDropdown = new ej.dropdowns.DropDownList({
    dataSource: diagramRegions(),
    fields: { text: 'text', value: 'value' },
    value: printSettings.region
});
printRegionDropdown.appendTo('#printRegionDropdown');

  // dropdown template for printDialog control
var printPaperSizeDropdown = new ej.dropdowns.DropDownList({
    dataSource: paperList(),
    fields: { text: 'text', value: 'value' },
    value: printSettings.paperSize
});
printPaperSizeDropdown.appendTo('#printPaperSizeDropdown');

// numerictextbox template for printDialog control
var printPageWidth = new ej.inputs.NumericTextBox({
    min: 100,
    step: 1,
    format: 'n0',
    value: printSettings.pageWidth
});
printPageWidth.appendTo('#printPageWidth');

// numerictextbox template for printDialog control
var printPageHeight = new ej.inputs.NumericTextBox({
    min: 100,
    step: 1,
    format: 'n0',
    value: printSettings.pageHeight
});
printPageHeight.appendTo('#printPageHeight');

// radiobutton template for printDialog control
var printPortrait = new ej.buttons.RadioButton({ label: 'Portrait', name: 'printSettings', checked: printSettings.isPortrait });
printPortrait.appendTo('#printPortrait');

// radiobutton template for printDialog control
var printLandscape = new ej.buttons.RadioButton({ label: 'Landscape', name: 'printSettings', checked: printSettings.isLandscape });
printLandscape.appendTo('#printLandscape');

// checkbox template for printDialog control
var printMultiplePage = new ej.buttons.CheckBox({ label: 'Scale to fit 1 page', checked: printSettings.multiplePage,
change: function (args) {multiplePage(args); }
});
printMultiplePage.appendTo('#printMultiplePage');

function multiplePage (args) {
    if (args.event) {
        printSettings.multiplePage = args.checked; 
    }
};
function diagramRegions () {
    var diagramRegions = [
        { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
    ];
    return diagramRegions;
};

var exportDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Export Diagram',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: getDialogButtons('export'),
    visible: false,
    showCloseIcon: true,
    content: '<div id="exportDialogContent"><div class="row"><div class="row"> File Name </div> <div class="row db-dialog-child-prop-row">' +
     '<input type="text" id="exportfileName" value = "Untitled Diagram"></div></div>' +
     '<div class="row db-dialog-prop-row"> <div class="col-xs-6 db-col-left"> <div class="row"> Format </div>' +
     '<div class="row db-dialog-child-prop-row"> <input type="text" id="exportFormat"/> </div> </div>' +
     '<div class="col-xs-6 db-col-right"> <div class="row"> Region </div> <div class="row db-dialog-child-prop-row">' +
     '<input type="text" id="exportRegion"/></div></div></div></div>'
});
exportDialog.appendTo('#exportDialog');

var exportFormat = new ej.dropdowns.DropDownList({
    dataSource: fileFormats(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.format,
});
exportFormat.appendTo('#exportFormat');

  // dropdown template for exportDialog control
var exportRegion = new ej.dropdowns.DropDownList({
    dataSource: diagramRegions(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.region
});
exportRegion.appendTo('#exportRegion');


function fileFormats() {
    var fileFormats = [
        { text: 'JPG', value: 'JPG' }, { text: 'PNG', value: 'PNG' },
        { text: 'BMP', value: 'BMP' }, { text: 'SVG', value: 'SVG' }
    ];
    return fileFormats;
};
function diagramRegions() {
    var diagramRegions = [
        { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
    ];
    return diagramRegions;
};
function toolbarInsertClick(args) {
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
            case 'insertimage':
                openUploadBox(false, '.jpg,.png,.bmp');
                break;
        }
    }
}
function openUploadBox(isOpen,extensionType)
{
    var defaultUpload = document.getElementById('defaultfileupload');
        defaultUpload = defaultUpload.ej2_instances[0];
        defaultUpload.clearAll();
        diagram.orgDataSettings.extensionType = defaultUpload.allowedExtensions = extensionType;
        defaultUpload.dataBind();
        diagram.isOpen = isOpen;
        document.getElementsByClassName('e-file-select-wrap')[0].children[0].click();
}

function getDialogButtons(dialogType) {
    var buttons= [];
    switch (dialogType) {
        case 'export':
            buttons.push({
                click: btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
            });
            break;
        case 'print':
            buttons.push({
                click: btnPrintClick.bind(this),
                buttonModel: { content: 'Print', cssClass: 'e-flat e-db-primary', isPrimary: true }
            });
            break;
        case 'hyperlink':
            buttons.push({
                click: btnHyperLink.bind(this),
                buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
            });
            break;
       
    }
    buttons.push({
        click: btnCancelClick.bind(this),
        buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
    });
    return buttons;
}

function btnCancelClick(args) {
    var ss = args.target;
    var key = ss.offsetParent.id;
    switch (key) {
        case 'exportDialog':
            exportDialog.hide();
            break;
        case 'printDialog':
            printDialog.hide();
            break;
        case 'saveDialog':
            saveDialog.hide();
            break;
        case 'customPropertyDialog':
            this.customPropertyDialog.hide();
            break;
        case 'tooltipDialog':
            tooltipDialog.hide();
            break;
        case 'hyperlinkDialog':
            this.hyperlinkDialog.hide();
            break;
        case 'deleteConfirmationDialog':
            this.deleteConfirmationDialog.hide();
            break;
        case 'fileUploadDialog':
            OrgChartUtilityMethods.uploadDialog.hide();
            OrgChartUtilityMethods.isUploadSuccess = false;
            break;
        case 'moreShapesDialog':
            moreShapesDialog.hide();
            break;
    }
}

function btnHyperLink() {
    var node = diagram.selectedItems.nodes[0];
    if (node.annotations.length > 0) {
        node.annotations[0].hyperlink.link = document.getElementById('hyperlink').value;
        node.annotations[0].hyperlink.content = document.getElementById('hyperlinkText').value;
        applyToolTipforHyperlink(node);
        diagram.dataBind();
    } else {
        var annotation = {
            hyperlink: {
                content: document.getElementById('hyperlinkText').value,
                link: document.getElementById('hyperlink').value
            }
        };
        diagram.addLabels(node, [annotation]);
        applyToolTipforHyperlink(node);
        diagram.dataBind();
    }
    hyperlinkDialog.hide();
}

function btnExportClick() {
    diagram.exportDiagram({
        fileName: document.getElementById("exportfileName").value,
        format: exportFormat.value,
        region: exportRegion.value
    });
    exportDialog.hide();
}

function btnPrintClick() {
    var pageWidth = printSettings.pageWidth;
    var pageHeight = printSettings.pageHeight;
    var paperSize = getPaperSize(printSettings.paperSize);
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
}

function applyToolTipforHyperlink(node) {
    node.constraints = ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.InheritTooltip | ej.diagrams.NodeConstraints.Tooltip;
    node.tooltip = {
        content: node.annotations[0].hyperlink.link, relativeMode: 'Object',
        position: 'TopCenter', showTipPointer: true,
    };
}

function getUploadButtons() {
    var buttons = [];
    buttons.push({
        click: btnCancelClick.bind(this),
        buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
    });
    // buttons.push({
    //     click: btnUploadNext.bind(this),
    //     buttonModel: { content: 'Next', cssClass: 'e-flat e-db-primary', isPrimary: true },
    // });
    return buttons;
}

var splitObj = new ej.layouts.Splitter({
    height: '500px',
    paneSettings: [
        { size: '75%', collapsible: false },
        { collapsible: true }
    ],
    separatorSize: 5,
    expanded:spliterExpanded,
    collapsed:splitterColapsed,
    width: '100%'
});
splitObj.appendTo('#splitter');
// document.getElementById('splitter').onclick = (args) =>{
// var proPan = document.getElementById('propertyPanel').style.display;
// if(proPan !== 'none'){
//     document.getElementById('propertyPanel').style.display = 'none';
// }
// else{
//     document.getElementById('propertyPanel').style.display = 'block';
// }
// }
function spliterExpanded(args)
{
    args.pane[1].style.display = 'none';
}
function splitterColapsed(args)
{
    args.pane[1].style.display = 'block';
}