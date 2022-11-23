ej.diagrams.Diagram.Inject(ej.diagrams.BpmnDiagrams, ej.diagrams.UndoRedo, ej.diagrams.DiagramContextMenu);
ej.diagrams.SymbolPalette.Inject(ej.diagrams.BpmnDiagrams);
var conTypeBtn;
var drawingNode;
var diagramEvents = new DiagramClientSideEvents();
var dropDownDataSources = new DropDownDataSources();
var propertyChange = new PropertyChange();
var utilityMethods = new UtilityMethods();

window.onload = function()
{
    document.getElementById('btnHideToolbar').onclick =  UtilityMethods.prototype.hideMenuBar.bind(this);
    document.onmouseover = menumouseover.bind(this);
    zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
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
                { color:UtilityMethods.prototype.getColor(nodeProperties.gradientColor.value), offset: 1 }
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
                    {text: 'None', id: 'None'}, {text: 'Conditional', id: 'Conditional'},
                    {text: 'Normal', id: 'Normal'},
            ]
        },
        {
            text: 'Direction', id: 'Direction', items: [
                    {text: 'None', id: 'None'}, {text: 'Directional', id: 'Directional'},
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
    items: DropDownDataSources.prototype.getFileMenuItems(),
    content: 'File',
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnFileMenu.appendTo('#btnFileMenu');


var btnSelectMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items:DropDownDataSources.prototype.getSelectMenuItems(),
    content: 'Select',
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnSelectMenu.appendTo('#btnSelectMenu');



var btnViewMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: DropDownDataSources.prototype.getViewMenuItems(),
    content: 'View',
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnViewMenu.appendTo('#btnViewMenu');


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
        clicked: function (args) { UtilityMethods.prototype.toolbarClick(args)},
        items: DropDownDataSources.prototype.toolbarItems(),
        width:'100%'
 });
 //Render initialized Toolbar component
 var items = [{ text: 'JPG' }, { text: 'PNG' }, { text: 'BMP' }, { text: 'SVG' }];
 var conTypeItems = [
                     {text: 'Straight',iconCss: 'sf-icon-straight_line'},
                     {text: 'Orthogonal',iconCss: 'sf-icon-orthogonal_line'},
                     {text: 'Bezier',iconCss: 'sf-icon-bezier'}
                    ];
var zoomMenuItems = [
                        { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
                        { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
                        { text: 'Fit To Screen' }
                    ];
conTypeBtn = new ej.splitbuttons.DropDownButton({
    items: conTypeItems, iconCss:'sf-icon-orthogonal_line',
    select: function (args) {UtilityMethods.prototype.onConnectorSelect(args)}
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
 var btnHideToolbar = new ej.buttons.Button({ iconCss: 'sf-icon-chevron-up' });
 btnHideToolbar.appendTo('#btnHideToolbar');
 conTypeBtn.appendTo('#conTypeBtn');

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

var diagram = new ej.diagrams.Diagram({
    width: '100%', height: '100%',
    nodes: nodes,
    connectors:connectors,
    drawingObject:{type:'Orthogonal'},
    pageSettings:{showPageBreaks:true},
    pageSettings: {
        background: { color: '#FFFFFF' }, width: 600, height: 1460, margin: { left: 5, top: 5 },
        orientation: 'Landscape',showPageBreaks:true,
    },
    scrollSettings: { canAutoScroll: true, scrollLimit: 'Infinity', minZoom: 0.25, maxZoom: 30 },
    getNodeDefaults: function (args) { DiagramClientSideEvents.prototype.getNodeDefaults(args); },
    getConnectorDefaults:function (args) { DiagramClientSideEvents.prototype.getConnectorDefaults(args); },
    contextMenuSettings: contextMenu,
    contextMenuClick:function (args) { DiagramClientSideEvents.prototype.contextMenuClick(args); },
    contextMenuOpen:function (args) { DiagramClientSideEvents.prototype.contextMenuOpen(args); },
    onUserHandleMouseDown:function (args) { DiagramClientSideEvents.prototype.userHandleClick(args); },
    historyChange: function (args) { DiagramClientSideEvents.prototype.historyChange(args); },
    // selectionChange:selectionChange, 
    selectionChange: function (args) { DiagramClientSideEvents.prototype.selectionChange(args); },
    positionChange: function (args) { DiagramClientSideEvents.prototype.positionChange(args); },
    sizeChange: function (args) { DiagramClientSideEvents.prototype.sizeChange(args); },
    rotateChange: function (args) { DiagramClientSideEvents.prototype.rotateChange(args); },
    dragEnter:function (args) { DiagramClientSideEvents.prototype.dragEnter(args); },
    created: function (args) { DiagramClientSideEvents.prototype.created(args);},
    rulerSettings: {
        showRulers: true, dynamicGrid: true, horizontalRuler: { interval: 10,segmentWidth: 100,thickness: 25,},
        verticalRuler: { interval: 10,segmentWidth: 100,thickness: 25,},
    },
    commandManager: {  commands : [{
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
            UtilityMethods.prototype.download(diagram.saveDiagram());
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
    ]}
});

var PaperSize = (function () {
    function PaperSize() {
    }
    return PaperSize;
}());

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
    diagram.appendTo('#diagram');

    var editContextMenu = new ej.navigations.ContextMenu({
        animationSettings: { effect: 'None' },
        items: DropDownDataSources.prototype.getEditMenuItems(),
        onOpen: editContextMenuOpen,
        cssClass: "EditMenu",
        beforeItemRender: beforeItemRender,
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
        beforeClose: arrangeMenuBeforeClose
    })
    editContextMenu.appendTo('#editContextMenu');

    var designContextMenu = new ej.navigations.ContextMenu({
        animationSettings: { effect: 'None' },
        items:DropDownDataSources.prototype.getDesignMenuItems(),
        onOpen: designContextMenuOpen,
        cssClass: "DesignMenu",
        beforeItemRender: beforeItemRender,
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
        beforeClose: arrangeMenuBeforeClose
    })
    designContextMenu.appendTo('#designContextMenu');

    var toolsContextMenu = new ej.navigations.ContextMenu({
        animationSettings: { effect: 'None' },
        items: DropDownDataSources.prototype.getToolsMenuItems(),
        onOpen: toolsContextMenuOpen,
        cssClass: "ToolsMenu",
        beforeItemRender: beforeItemRender,
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
        beforeClose: arrangeMenuBeforeClose
    });
    toolsContextMenu.appendTo('#toolsContextMenu');

    var btnDesignMenu = new ej.splitbuttons.DropDownButton({
        cssClass: 'db-dropdown-menu',
        target: '.e-contextmenu-wrapper.designMenu',
        content: 'Design',
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
        beforeItemRender: beforeItemRender,
        beforeOpen: arrangeMenuBeforeOpen,
        beforeClose: arrangeMenuBeforeClose
    });
    btnDesignMenu.appendTo('#btnDesignMenu');
    var btnToolsMenu = new ej.splitbuttons.DropDownButton({
        cssClass: 'db-dropdown-menu',
        target: '.e-contextmenu-wrapper.toolsMenu',
        content: 'Tools',
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
        beforeItemRender: beforeItemRender,
        beforeOpen: arrangeMenuBeforeOpen,
        beforeClose: arrangeMenuBeforeClose
    });
    btnToolsMenu.appendTo('#btnToolsMenu');

    var btnEditMenu = new ej.splitbuttons.DropDownButton({
        cssClass: 'db-dropdown-menu',
        target: '.e-contextmenu-wrapper.editMenu',
        content: 'Edit',
        select: function (args) { UtilityMethods.prototype.menuClick(args) },
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
    dataSource: DropDownDataSources.prototype.paperList(),
    change: function (args) {UtilityMethods.prototype.paperListChange(args); },
    fields: { text: 'text', value: 'value' },
    index: 0
});
pageSettingsList.appendTo('#pageSettingsList');

var pagePortrait = new ej.buttons.RadioButton({
    label: 'Portrait',
    name: 'pageSettings',
    checked: false,
    change: function (args) { UtilityMethods.prototype.pageOrientationChange(args); },
});
pagePortrait.appendTo('#pagePortrait');

 var pageLandscape = new ej.buttons.RadioButton({
    label: 'Landscape',
    name: 'pageSettings',
    checked: true,
    change: function (args) { UtilityMethods.prototype.pageOrientationChange(args); },
});
pageLandscape.appendTo('#pageLandscape');

var pageWidth = new ej.inputs.NumericTextBox({
    min: 100,
    format: 'n0',
    value: diagram.pageSettings.width,
    change: function (args) { UtilityMethods.prototype.pageDimensionChange(args); }
});
pageWidth.appendTo('#pageWidth');

var pageHeight = new ej.inputs.NumericTextBox({
    min: 100,
    format: 'n0',
    value: diagram.pageSettings.height,
    change: function (args) { UtilityMethods.prototype.pageDimensionChange(args); }
});
pageHeight.appendTo('#pageHeight');


var pageBgColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    width: '100%',
    showButtons:false,
    // modeSwitcher: true,
    value: diagram.pageSettings.background.color,
    change: function (args) { UtilityMethods.prototype.pageBackgroundChange1(args); }
});
pageBgColor.appendTo('#pageBgColor');
var pageBgColorPickerBtn = new ej.buttons.Button({ iconCss: 'sf-icon-fil_colour' });
    pageBgColorPickerBtn.appendTo('#pageBgColorPickerBtn');

var showPageBreaks = new ej.buttons.CheckBox({ label: 'Page Breaks', checked: diagram.pageSettings.showPageBreaks,
change: function (args) { UtilityMethods.prototype.pageBreaksChange(args); } });
showPageBreaks.appendTo('#showPageBreaks');

    var nodeOffsetX = new ej.inputs.NumericTextBox({
        format: 'n0',
        change: function(args) {
            if(args.isInteracted) {
               nodeProperties.offsetX.value = args.value;
               PropertyChange.prototype.nodePropertyChange({ propertyName: 'offsetX', propertyValue: args });
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
             PropertyChange.prototype.nodePropertyChange({ propertyName: 'offsetY', propertyValue: args });
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
              PropertyChange.prototype.nodePropertyChange({ propertyName: 'width', propertyValue: args });
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
              PropertyChange.prototype.nodePropertyChange({ propertyName: 'height', propertyValue: args });
            }
        }
    });
    nodeHeight.appendTo('#nodeHeight');
   nodeProperties.height = nodeHeight;

   var aspectRatio = new ej.buttons.CheckBox({ label: 'Aspect Ratio',
   change: function(args) {
    PropertyChange.prototype.nodePropertyChange({propertyName: 'aspectRatio', propertyValue: args.checked});
      }
   });
   aspectRatio.appendTo('#aspectRatio');
   nodeProperties.aspectRatio = aspectRatio;

   var rotateIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-rotate' });
   rotateIconBtn.appendTo('#rotateIconBtn');

   var nodeRotateAngle = new ej.inputs.NumericTextBox({
       format: 'n0',
       change: function(args) {
           nodeProperties.rotateAngle.value = args.value;
           PropertyChange.prototype.nodePropertyChange({ propertyName: 'rotateAngle', propertyValue: args });
       }
   });
   nodeRotateAngle.appendTo('#nodeRotateAngle');
   nodeProperties.rotateAngle = nodeRotateAngle;

   var toolbarNodeInsert = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: function (args) { UtilityMethods.prototype.toolbarInsertClick(args)},
    items: [
        { prefixIcon: 'sf-icon-insert_link', tooltipText: 'Insert Link', cssClass: 'tb-item-start' },
        // { prefixIcon: 'sf-icon-InsertImage tb-icons', tooltipText: 'Insert Image', cssClass: 'tb-item-end' }
    ]
});
toolbarNodeInsert.appendTo('#toolbarNodeInsert');

var nodeFillColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function(args) {
        PropertyChange.prototype.nodePropertyChange({propertyName: 'fillColor', propertyValue: args.currentValue.hex});
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
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'gradient', propertyValue: args });
      }
    });
    gradient.appendTo('#gradient');
    nodeProperties.gradient = gradient;

var fillColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-fil_colour' });
fillColorIconBtn.appendTo('#fillColorIconBtn');

var gradientDirectionDropdown = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.gradientDirections(),
    fields: { text: 'text', value: 'value' },
    popupWidth: '200px',
    index: 0,
    change: function(args) {
        nodeProperties.gradientDirection.value = args.itemData.text;
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'gradientDirection', propertyValue: args });
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
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'gradientColor', propertyValue: args });
    }
});
nodeGradientColor.appendTo('#nodeGradientColor');
nodeProperties.gradientColor = nodeGradientColor;

var gradientColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-fil_colour' });
gradientColorIconBtn.appendTo('#gradientColorIconBtn');

var nodeStrokeColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function(args) {
        nodeProperties.strokeColor.value = args.currentValue.hex;
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'strokeColor', propertyValue: args });
    }
});
nodeStrokeColor.appendTo('#nodeStrokeColor');
nodeProperties.strokeColor = nodeStrokeColor;

var strokeColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-border_colour' });
strokeColorIconBtn.appendTo('#strokeColorIconBtn');

var nodeBorderStyle = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.borderStyles(),
    fields: { text: 'text', value: 'value' },
    index: 0,
    popupWidth: '160px',
    itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    change: function (args) {
        nodeProperties.strokeStyle.value= args.itemData.text;
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
    }
});
nodeBorderStyle.appendTo('#nodeBorderStyle');
nodeProperties.strokeStyle = nodeBorderStyle;

var nodeStrokeWidth = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    format: 'n0',
    change: function (args) {
       nodeProperties.strokeWidth.value= args.value;
       PropertyChange.prototype.nodePropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
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
       PropertyChange.prototype.nodePropertyChange({ propertyName: 'opacity', propertyValue: args });
   }
});
nodeOpacitySlider.appendTo('#nodeOpacitySlider');
nodeProperties.opacity =  nodeOpacitySlider;

var lineTypeDropdown = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.lineTypes(),
    fields: { text: 'text', value: 'value' },
    change: function(args) {
        connectorProperties.lineType.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'lineType', propertyValue: args });
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
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'lineColor', propertyValue: args });
    }
});
lineColor.appendTo('#lineColor');
connectorProperties.lineColor = lineColor;

var lineColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-border_colour' });
lineColorIconBtn.appendTo('#lineColorIconBtn');

var lineStyle = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.borderStyles(),
    fields: { text: 'text', value: 'value' },
    itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    change: function(args) {
        connectorProperties.lineStyle.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'lineStyle', propertyValue: args });
    }
});
lineStyle.appendTo('#lineStyle');
connectorProperties.lineStyle =  lineStyle;

var lineWidth = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    format: 'n0',
    change: function(args) {
        connectorProperties.lineWidth.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'lineWidth', propertyValue: args });
    }
});
lineWidth.appendTo('#lineWidth');
connectorProperties.lineWidth = lineWidth;

var sourceType = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.decoratorList(),
    fields: { text: 'text', value: 'value' },
    change: function(args) {
        connectorProperties.sourceType.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'sourceType', propertyValue: args });
    }
});
sourceType.appendTo('#sourceType');
connectorProperties.sourceType = sourceType;

var sourceSize = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    format: 'n0',
    change: function(args) {
        connectorProperties.sourceSize.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'sourceSize', propertyValue: args });
    }
});
sourceSize.appendTo('#sourceSize');
connectorProperties.sourceSize = sourceSize;

var targetType = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.decoratorList(),
    fields: { text: 'text', value: 'value' },
    change: function(args) {
        connectorProperties.targetType.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'targetType', propertyValue: args });
    }
});
targetType.appendTo('#targetType');
connectorProperties.targetType = targetType;

var targetSize = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    format: 'n0',
    change: function(args) {
        connectorProperties.targetSize.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'targetSize', propertyValue: args });
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
        PropertyChange.prototype.connectorPropertyChange({propertyName: 'lineJump', propertyValue: args});
       }
    });
    lineJump.appendTo('#lineJump');
    connectorProperties.lineJump = lineJump;

    var lineJumpSize = new ej.inputs.NumericTextBox({
        min: 1,
        step: 1,
        format: 'n0',
        change: function(args) {
            connectorProperties.lineJumpSize.value = args.value;
            PropertyChange.prototype.connectorPropertyChange({propertyName: 'lineJumpSize', propertyValue: args});
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
            PropertyChange.prototype.connectorPropertyChange({ propertyName: 'opacity', propertyValue: args });
        }
   });
   default1.appendTo('#default1');
   connectorProperties.opacity = default1;

var fontFamily = new ej.dropdowns.DropDownList({
dataSource: DropDownDataSources.prototype.fontFamilyList(),
    height: '34px',
    fields: { text: 'text', value: 'value' },
    change: function (args) {
        textProperties.fontFamily.value = args.value;
        PropertyChange.prototype.textPropertyChange({propertyName: 'fontFamily', propertyValue: args});
    }
});
fontFamily.appendTo('#fontFamily');
textProperties.fontFamily = fontFamily;

var fontSizeTextProperties = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    format: 'n0',
    change: function (args) {
        textProperties.fontSize.value = args.value;
        PropertyChange.prototype.textPropertyChange({propertyName: 'fontSize', propertyValue: args});
    }
});
fontSizeTextProperties.appendTo('#fontSizeTextProperties');
textProperties.fontSize = fontSizeTextProperties;


var ddlTextPosition = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.textPositionDataSource(),
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
        PropertyChange.prototype.textPropertyChange({propertyName: 'fontColor', propertyValue: args});
    }
});
textColor.appendTo('#textColor');
textProperties.fontColor = textColor;

var fontColorBtn = new ej.buttons.Button({ iconCss: 'sf-icon-border_colour' });
fontColorBtn.appendTo('#fontColorBtn');

var toolbarTextStyle = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: function (args) { toolbarTextStyleChange(args); },
    items: [
        { prefixIcon: 'sf-icon-bold ', tooltipText: 'Bold', cssClass: 'tb-item-start' },
        { prefixIcon: 'sf-icon-text', tooltipText: 'Italic', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-underline', tooltipText: 'Underline', cssClass: 'tb-item-end' }
    ]
});
toolbarTextStyle.appendTo('#toolbarTextStyle');

var toolbarTextSubAlignment = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked:  function (args) { toolbarTextSubAlignChange(args); },
    items: [
        { prefixIcon: 'sf-icon-align_left', tooltipText: 'Align Text Left', cssClass: 'tb-item-start' },
        { prefixIcon: 'sf-icon-align_center', tooltipText: 'Align Text Center', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-align_right', tooltipText: 'Align Text Right', cssClass: 'tb-item-end' }
    ]
});
toolbarTextSubAlignment.appendTo('#toolbarTextSubAlignment');

var toolbarTextAlignment = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: function (args) { toolbarTextAlignChange(args); },
    items: [
        { prefixIcon: 'sf-icon-align_right', tooltipText: 'Align Right', cssClass: 'tb-item-start' },
        { prefixIcon: 'sf-icon-align_center', tooltipText: 'Align Center', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-align_left', tooltipText: 'Align Left', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-align_bottom', tooltipText: 'Align Bottom', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-align_middle', tooltipText: 'Align Middle', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-align_top', tooltipText: 'Align Top', cssClass: 'tb-item-end' }
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
        PropertyChange.prototype.textPropertyChange({ propertyName: 'opacity', propertyValue: args });
    }
});
opacityTextSlider.appendTo('#opacityTextSlider');
textProperties.opacity = opacityTextSlider;


function textPositionChange(args) {
    if (args.value !== null) {
        PropertyChange.prototype.textPropertiesChange('textPosition', args.value);
    }
};

function toolbarTextStyleChange(args) {
    PropertyChange.prototype.textPropertiesChange(args.item.tooltipText, false);
};
function toolbarTextSubAlignChange(args) {
    var propertyName = args.item.tooltipText.replace(/[' ']/g, '');
    PropertyChange.prototype.textPropertiesChange(propertyName, propertyName);
};
function toolbarTextAlignChange(args) {
    var propertyName = args.item.tooltipText.replace('Align ', '');
    PropertyChange.prototype.textPropertiesChange(propertyName, propertyName);
};

var hyperlinkDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Insert Link',
    target: document.body,
    isModal:true,
    animationSettings: { effect: 'None' },
    showCloseIcon: true,
    visible: false,
    buttons: UtilityMethods.prototype.getDialogButtons('hyperlink'),
    content: '<div id="hyperlinkDialogContent"><div class="row"><div class="row">Enter URL</div><div class="row db-dialog-child-prop-row"><input type="text" id="hyperlink">' +
    '</div></div><div class="row db-dialog-prop-row"><div class="row">Link Text (Optional)</div><div class="row db-dialog-child-prop-row"><input type="text" id="hyperlinkText"></div></div></div>'
});
hyperlinkDialog.appendTo('#hyperlinkDialog');

var printDialog = new ej.popups.Dialog({
    width: '335px',
    header: 'Print Diagram',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: UtilityMethods.prototype.getDialogButtons('print'),
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
    dataSource:DropDownDataSources.prototype.diagramRegions(),
    fields: { text: 'text', value: 'value' },
    value: printSettings.region
});
printRegionDropdown.appendTo('#printRegionDropdown');

  // dropdown template for printDialog control
var printPaperSizeDropdown = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.paperList(),
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

var exportDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Export Diagram',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: UtilityMethods.prototype.getDialogButtons('export'),
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
    dataSource:DropDownDataSources.prototype.fileFormats(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.format,
});
exportFormat.appendTo('#exportFormat');

  // dropdown template for exportDialog control
var exportRegion = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.diagramRegions(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.region
});
exportRegion.appendTo('#exportRegion');

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
function spliterExpanded(args)
{
    args.pane[1].style.display = 'none';
}
function splitterColapsed(args)
{
    args.pane[1].style.display = 'block';
}