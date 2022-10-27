ej.diagrams.Diagram.Inject(ej.diagrams.BpmnDiagrams, ej.diagrams.UndoRedo, ej.diagrams.DiagramContextMenu);
ej.diagrams.SymbolPalette.Inject(ej.diagrams.BpmnDiagrams);
// Initialize nodes for diagram
var btnObj;
var conTypeBtn;

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
        annotations:[{content:'Get the Book Status',offset:{x:0.5,y:0.6}}]
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
        annotations:[{content:'Decline Hold',offset:{x:0.5,y:1.4}}]
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
        annotations:[{content:'Hold Book',offset:{x:0.5,y:1.4}}]
    },
    {
        id: 'Intermediate3', offsetX:1050, offsetY: 400 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate',trigger:'Message'},
        },
        annotations:[{content:'One Week',offset:{x:0.5,y:1.4}}]
    },
    {
        id: 'Intermediate4', offsetX:900, offsetY: 60 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate',trigger:'Message'},
        },
        annotations:[{content:'Two Weeks',offset:{x:0.5,y:1.4}}]
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
        id: 'Start', width: 60, height: 60, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Start' }
        },
    },
    {
        id:'compensation', width:70,height:70,      shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task', task: {
                    compensation : true
                }
            },
        },
    },
    {
        id:'dataObj', width:70,height:70,shape: {
            type: 'Bpmn', shape: 'DataObject',
            dataObject: { collection: true, type: 'Input' }
        }
    },
    {
        id:'boundaryCall', width:70,height:70,shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'SubProcess', subProcess: { collapsed: true, boundary: 'Call' }
            },
        },
    },
    {
        id:'dataSource', width:70,height:70, shape: {
            type: 'Bpmn', shape: 'DataSource',   
        }
    },
    {
        id: 'NonInterruptingIntermediate', width: 60, height: 60, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'NonInterruptingIntermediate' }
        },
    },
    {
        id: 'End', width: 60, height: 60, offsetX: 665, offsetY: 230, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'End' }
        },
    },
    {
        id: 'Task', width: 60, height: 60, offsetX: 700, offsetY: 700,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',
            },
        },
    },
    {
        id: 'Transaction', width: 60, height: 60, offsetX: 300, offsetY: 100,
        constraints: ej.diagrams.NodeConstraints.Default | ej.diagrams.NodeConstraints.AllowDrop,
        shape: {
            type: 'Bpmn', shape: 'Activity',
            activity: {
                activity: 'SubProcess', subProcess: {
                    type: 'Transaction', transaction: {
                        cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
                    }
                }
            }
        },
    }, {
        id: 'Task_Service', width: 60, height: 60, offsetX: 700, offsetY: 700,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task', task: { type: 'Service' }
            },
        },
    },
    {
        id: 'Gateway', width: 60, height: 60, offsetX: 100, offsetY: 100,
        shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Exclusive' } },
    },
    {
        id: 'DataObject', width: 60, height: 60, offsetX: 500, offsetY: 100,
        shape: { type: 'Bpmn', shape: 'DataObject', dataObject: { collection: false, type: 'None' } },
    }, {
        id: 'subProcess', width: 520, height: 250, offsetX: 355, offsetY: 230,
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
    }
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
        name: 'Clone', pathData: 'M60.3,18H27.5c-3,0-5.5,2.4-5.5,5.5v38.2h5.5V23.5h32.7V18z M68.5,28.9h-30c-3,' +
            '0-5.5,2.4-5.5,5.5v38.2c0,3,2.4,5.5,5.5,5.5h30c3,0,5.5-2.4,5.5-5.5V34.4C73.9,31.4,71.5,28.9,68.5,28.9z ' +
            'M68.5,72.5h-30V34.4h30V72.5z',tooltip:{content:'Clone'},
        visible: true, offset: 1, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
        name: 'Delete', pathData: 'M60.3,18H27.5c-3,0-5.5,2.4-5.5,5.5v38.2h5.5V23.5h32.7V18z M68.5,28.9h-30c-3,' +
            '0-5.5,2.4-5.5,5.5v38.2c0,3,2.4,5.5,5.5,5.5h30c3,0,5.5-2.4,5.5-5.5V34.4C73.9,31.4,71.5,28.9,68.5,28.9z ' +
            'M68.5,72.5h-30V34.4h30V72.5z',tooltip:{content:'Delete'},
        visible: true, offset: 0, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
        name: 'Draw', pathData: 'M60.3,18H27.5c-3,0-5.5,2.4-5.5,5.5v38.2h5.5V23.5h32.7V18z M68.5,28.9h-30c-3,' +
            '0-5.5,2.4-5.5,5.5v38.2c0,3,2.4,5.5,5.5,5.5h30c3,0,5.5-2.4,5.5-5.5V34.4C73.9,31.4,71.5,28.9,68.5,28.9z ' +
            'M68.5,72.5h-30V34.4h30V72.5z',tooltip:{content:'Draw'},
        visible: true, offset: 0.5, side: 'Right', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
];

    // Menu items definition 
    var menuItems = [
        {
            text: 'File',
            // iconCss: 'em-icons e-file',
            items: [
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
        },
        {
            text: 'Edit',
            // iconCss: 'em-icons e-edit',
            items: [
                { text: 'Undo', iconCss: 'sf-icon-Undo' },
                { text: 'Redo', iconCss: 'sf-icon-Redo' },
                { separator: true },
                { text: 'Cut', iconCss: 'sf-icon-Cut' },
                { text: 'Copy', iconCss: 'sf-icon-Copy' },
                { text: 'Paste', iconCss: 'sf-icon-Paste' },
                { separator: true },
                { text: 'Rotate Clockwise', iconCss: 'em-icons e-cut' },
                { text: 'Rotate Counter Clockwise', iconCss: 'em-icons e-copy' },
                { text: 'Delete', iconCss: 'sf-icon-Delete' },
                { separator: true },
                { text: 'Bring To Front', iconCss: 'sf-icon-BringFront' },
                { text: 'Send To Back', iconCss: 'sf-icon-Sendback' },
            ]
        },
        {
            text: 'Design',
            // iconCss: 'em-icons e-edit',
            items: [
                { text: 'Orientation', iconCss: 'em-icons e-cut',
                items:[
                    { text: 'Landscape', iconCss: 'em-icons e-copy' },
                    { text: 'Portrait', iconCss: 'em-icons e-paste' }
                ]    
                },
                { text: 'Size', iconCss: 'em-icons e-copy',
                items:[
                     { text: 'Letter', value: 'Letter' },
                     { text: 'Legal', value: 'Legal' },
                     { text: 'Ledger',value: 'Ledger'  },
                     { text: 'A5', value:'A5' },
                     { text: 'A4',  value:'A4' },
                     { text: 'A3', value:'A3'  },
                     { text: 'A2', value:'A2'  },
                     { text: 'A1', value:'A1'  },
                     { text: 'A0', value:'A0'  },
                     
                ]
                },
            ]
        },
        {
            text: 'Select',
            // iconCss: 'em-icons e-edit',
            items: [
                { text: 'Select All', iconCss: 'em-icons e-cut' },
                { text: 'Select All Nodes', iconCss: 'em-icons e-copy' },
                { text: 'Select All Connectors', iconCss: 'em-icons e-paste' },
                { text: 'Deselect All', iconCss: 'em-icons e-paste' }

            ]
        },
        {
            text: 'Tools',
            items: [
                { text: 'Selection Tool',iconCss: 'sf-icon-Selector tb-icons' },
                { text: 'Pan Tool', iconCss: 'sf-icon-Pan tb-icons' },
                { text: 'Connector Tool' ,iconCss:'sf-icon-ConnectorMode'},
                { text: 'Connectors',items:[
                    {text:'Straight',iconCss: 'sf-icon-StraightLine'},
                    {text:'Orthogonal',iconCss: 'sf-icon-ConnectorMode'},
                    {text:'Bezier',iconCss: 'sf-icon-BeizerLine'},
                ] }

            ]
        },
        {
            text: 'View',
            items: [
                   { text: 'Show Lines',iconCss: 'sf-icon-Selection'},
                   { text: 'Snap To Grid',iconCss : 'sf-icon-Selection'},
                   { text: 'Snap To Object',iconCss : 'sf-icon-Selection'},
                   { text: 'Show Ruler',iconCss: 'sf-icon-Selection'},
                   { text: 'Show Page Breaks',iconCss: 'sf-icon-Selection'},
                   { separator: true },
                   { text: 'Fit To Width'},
                   { text: 'Fit To Page'},
                   { text: 'Reset View'},

            ]
        },
    ];
    var disabledItems = ['Cut','Copy','Send To Back','Bring To Front','Delete'];
    var undoRedoItems = ['Undo','Redo'];
    var rotateItems = ['Rotate Clockwise','Rotate Counter Clockwise'];
    var pasteItem = ['Paste'];
    

    //Menu initialization
    var menuObj = new ej.navigations.Menu({ items: menuItems,height:'10px',
    beforeOpen: function (args) {
        //Handling sub menu items
        for (var i = 0; i  < args.items.length; i++) {
            if(args.items[i].text === 'Undo' || args.items[i].text === 'Redo')
            {
                if(args.items[i].text === 'Undo' && diagram.historyManager.undoStack.length<1){
                    menuObj.enableItems([args.items[i].text], false, false);
                }
                if(args.items[i].text === 'Redo' && diagram.historyManager.redoStack.length<1){
                    menuObj.enableItems([args.items[i].text], false, false);
                }
            }
            if(!(diagram.commandHandler.clipboardData.pasteIndex !== undefined
                && diagram.commandHandler.clipboardData.clipObject !==undefined))
                {
                    if(pasteItem.indexOf(args.items[i].text)> -1)
                    {
                        menuObj.enableItems([args.items[i].text], false, false);
                    }
                }
            if(!(diagram.selectedItems.nodes.length>0 || diagram.selectedItems.connectors.length>0)){
                if (disabledItems.indexOf(args.items[i].text) > -1) {
                    menuObj.enableItems([args.items[i].text], false, false);
                }
                if(rotateItems.indexOf(args.items[i].text)> -1){
                    menuObj.enableItems([args.items[i].text], false, false);
                }
        }
            else if(diagram.selectedItems.nodes.length<1 && diagram.selectedItems.connectors.length>0)
            {
                if(rotateItems.indexOf(args.items[i].text)> -1){
                    menuObj.enableItems([args.items[i].text], false, false);
                }
            }
        }
    } ,select:onMenuSelect}, '#menu');
    // menuObj.enableItems(disabledItems, false, false);

    //Initialize Toolbar component
    var toolbarObj = new ej.navigations.Toolbar({
        clicked:toolbarClick,
        items: [
            { prefixIcon: 'sf-icon-Cut', tooltipText: 'New Diagram' },
            { prefixIcon: 'e-icons e-copy', tooltipText: 'Open Diagram', },
            { prefixIcon: 'sf-icon-Save', tooltipText: 'Save Diagram' },
            { prefixIcon: 'e-print e-icons', tooltipText: 'Print Diagram'},
            { type: 'Input', tooltipText: 'Export Diagram',template: '<button id="custombtn" style="width:100%;"></button>'},
                    { type: 'Separator' },
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
                    
                      {  prefixIcon: 'e-icons e-bold', tooltipText: 'Bold',disabled:true },
                    
                       { prefixIcon: 'e-icons e-underline', tooltipText: 'Underline',disabled:true },
                    
                      {  prefixIcon: 'e-icons e-italic', tooltipText: 'Italic',disabled:true },
                       { type: 'Separator' },
                       { prefixIcon:'e-icons e-font',type: 'Input',tooltipText:'Font Family',template:'<input type="text" id="fontFamilyBtn" style="width:100%;">'},
                       { prefixIcon:'e-icons e-fontSize',type:'Input',tooltipText:'Font Size',template:' <input type="number" id="fontSizeBtn" min="0" max="50" step="1" value="12">'},
            
            { prefixIcon:'e-icons e-fontSize',type:'Input',tooltipText:'Font Color',template:'<input id="fontcolor" type="color"/>'},
                       {type:'Separator'},
                       {
                        prefixIcon: 'sf-icon-Lock tb-icons', tooltipText: 'Lock',disabled:true 
                       },
                       {
                        prefixIcon: 'e-icons e-align-center',tooltipText:'Reset'
                       },
            { prefixIcon: 'sf-icon-ColorPickers tb-icons', mode: 'Palette', tooltipText: 'Fill Color', cssClass: 'tb-item-start tb-item-fill',template:'<input type="color" id="fillcolor">'},  
            { prefixIcon: 'e-icons e-undo', tooltipText: 'Undo',disabled:true  },
            { prefixIcon: 'e-icons e-redo', tooltipText: 'Redo',disabled:true  },
                    {type: 'Separator' },
            { prefixIcon: 'sf-icon-Selector tb-icons', tooltipText: 'Select Tool'},
            { prefixIcon: 'sf-icon-Pan tb-icons', tooltipText: 'Pan Tool',cssClass:'tb-item-start' },
            { prefixIcon: 'sf-icon-ConnectorMode', tooltipText: 'Connector Tool' },
                    { type: 'Separator' },
            { tooltipText: 'Change Connector Type',template: '<button id="conTypeBtn" style="width:100%;"></button>'},
                    { type: 'Separator' },
            { prefixIcon: 'sf-icon-Cut', tooltipText: 'Cut',click: pasteClick,disabled:true  },
            { prefixIcon: 'sf-icon-Copy', tooltipText: 'Copy',click: pasteClick,disabled:true  },
            { prefixIcon: 'e-icons e-paste', tooltipText: 'Paste',disabled:true },
            { prefixIcon: 'sf-icon-Delete', tooltipText: 'Delete',disabled:true  },
                    { type: 'Separator' },
            { prefixIcon: 'sf-icon-Redo', tooltipText: 'Rotate Clockwise' ,disabled:true },
            { prefixIcon: 'sf-icon-Undo', tooltipText: 'Rotate Counter-clockwise',disabled:true  },
                    { type: 'Separator' },
            { prefixIcon: 'sf-icon-BringFront', tooltipText: 'Bring To Front',disabled:true },
            { prefixIcon: 'sf-icon-Sendback' , tooltipText: 'Send To Back',disabled:true  },
                     { type: 'Separator' },
        
         ],height:30,width:'100%'
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
   items: items, iconCss: 'e-ddb-icons e-export', content: 'Export', select: onselectExport,
});
conTypeBtn = new ej.splitbuttons.DropDownButton({
    items: conTypeItems, iconCss:'sf-icon-ConnectorMode', select: onConnectorSelect
});
var fontFamilyBtn = new ej.dropdowns.DropDownList({
    dataSource: fontType,
    content:'font',
    fields: { value: 'type', text: 'text' }, popupWidth: 150,
    width: '100%', placeholder: 'select a font type',
    index: 0, change: function () {
        updateAnnotation('fontfamily', null, fontFamilyBtn);
    }
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

   //Colorpicker used to apply for Color of the Annotation
var fontColor = new ej.inputs.ColorPicker({
    value: '#000',  mode: 'Palette',
    
     change: function (arg) {
        let nodes = diagram.selectedItems.nodes;
        let connectors = diagram.selectedItems.connectors;
        if(nodes.length>0){
        updateFontColor(nodes);
        }
        if(connectors.length>0)
        {
            updateFontColor(connectors)
        }
       
    }
});
fontColor.appendTo('#fontcolor');
// var defaultObj = new ej.inputs.ColorPicker({}, '#color-picker');
    
// var defaultObj = new ej.inputs.ColorPicker({}, '#color-picker');



// var fillColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
// fillColorIconBtn.appendTo('#fillColorIconBtn');

 toolbarObj.appendTo('#toolbar_default');
 fontFamilyBtn.appendTo('#fontFamilyBtn');
 btnObj.appendTo('#custombtn');
 conTypeBtn.appendTo('#conTypeBtn');


 function onMenuSelect(args)
 {
    var option = args.item.text;
    switch(option)
    {
        case 'New':
            diagram.clear();
            break;
        case 'Save':
            download(diagram.saveDiagram());
            break;
        case 'Print':
            var options = {};
            options.mode = 'Data';
            diagram.print(options)
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
        case 'Rotate Clockwise':
            diagram.rotate(diagram.selectedItems,90);
            break;
        case 'Rotate Counter Clockwise':
            diagram.rotate(diagram.selectedItems,-90);
            break;
        case 'Delete':
            diagram.remove();
        case 'Send To Back':
            diagram.sendToBack();
            break;
        case 'Bring To Front':
            diagram.bringToFront();
            break;
        case 'Landscape':
            diagram.pageSettings.orientation = 'Landscape';
            break;
        case 'Portrait':
            diagram.pageSettings.orientation = 'Portrait';
            break;
        case 'Letter':
        case 'Legal':
        case 'A0':
        case 'A1':
        case 'A2':
        case 'A3':
        case 'A4':
        case 'A5':
        case 'Ledger':
            paperListChange(args)
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
            break;
        case 'Pan Tool':
            diagram.tool = ej.diagrams.DiagramTools.ZoomPan;
            break;
        case 'Connector Tool':
            diagram.drawingObject.sourceID = "";
            diagram.dataBind();
            diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
            break;
        case 'Orthogonal':
            diagram.drawingObject.type = 'Orthogonal';
            break;
        case 'Straight':
            diagram.drawingObject.type = 'Straight';
            break;
        case 'Bezier':
            diagram.drawingObject.type = 'Bezier';
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
            break;
        case 'Fit To Width':
            diagram.fitToPage({mode:'Width'});
            break;
        case 'Fit To Page':
            diagram.fitToPage();
            break;
        case 'Reset View':
            diagram.reset();
            break;

    }
    diagram.dataBind();
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
        case 'Bold':
        case 'Underline':
        case 'Italic':
            updateAnnotation(args.item.tooltipText);
            break;
        case 'Lock':
            lockObject();
            break;
        case 'Reset':
            diagram.reset();
            break;
        case 'Fill Color':
            // showColorPicker('nodeFillColor', 'tb-item-fill')
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
        case 'Connector Tool':
            diagram.drawingObject.sourceID = '';
            diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
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
        case 'New Diagram':
            diagram.clear();
            break;
        case 'Print Diagram':
            var options = {};
            options.mode = 'Data';
            diagram.print(options)
            break;
        case 'Font Color':
            // document.getElementById('fontcolor').onchange=(args) =>{
            //     let nodes = diagram.selectedItems.nodes;
            //     let connectors = diagram.selectedItems.connectors;
            //     if(nodes.length>0){
            //     updateFontColor(nodes,args);
            //     }
            //     if(connectors.length>0)
            //     {
            //         updateFontColor(connectors,args)
            //     }  
            // }
            break;
        case 'Save Diagram':
            download(diagram.saveDiagram());
            break;
        case 'Open Diagram':
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            break;
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
    toolbarObj.items[32].disabled = false;
 }

 function onClickDisable(args) {
    if(args === false)
    {
        toolbarObj.items[10].disabled = false;
        toolbarObj.items[11].disabled = false;
        toolbarObj.items[12].disabled = false;
        // toolbarObj.items[14].disabled = false;
        // toolbarObj.items[15].disabled = false;
        // toolbarObj.items[16].disabled = false;
        toolbarObj.items[18].disabled = false;
        // toolbarObj.items[20].disabled = false;
        toolbarObj.items[30].disabled = false;
        toolbarObj.items[31].disabled = false;
        toolbarObj.items[33].disabled = false;
        toolbarObj.items[35].disabled = false;
        toolbarObj.items[36].disabled = false;
        toolbarObj.items[38].disabled = false;
        toolbarObj.items[39].disabled = false;
    }
    else if(args === true ){
        var isTrue;
       
        if(diagram.selectedItems.connectors.length>0){
            isTrue = false;
            toolbarObj.items[35].disabled = true;
            toolbarObj.items[36].disabled = true;
        }
        else{
            isTrue = true;
            toolbarObj.items[35].disabled = true;
            toolbarObj.items[36].disabled = true;
        }
        toolbarObj.items[10].disabled = isTrue;
        toolbarObj.items[11].disabled = isTrue;
        toolbarObj.items[12].disabled = isTrue;
        // toolbarObj.items[14].disabled = isTrue;
        // toolbarObj.items[15].disabled = isTrue;
        // toolbarObj.items[16].disabled = isTrue;
        toolbarObj.items[18].disabled = isTrue;
        // toolbarObj.items[20].disabled = isTrue;
        toolbarObj.items[30].disabled = isTrue;
        toolbarObj.items[31].disabled = isTrue;
        toolbarObj.items[33].disabled = isTrue;
        toolbarObj.items[38].disabled = isTrue;
        toolbarObj.items[39].disabled = isTrue;
       
        }
  }

var diagram = new ej.diagrams.Diagram({
    width: '100%', height: '100%',
    nodes: nodes,
    connectors:connectors,
    drawingObject:{type:'Orthogonal'},
    pageSettings:{showPageBreaks:true},
    // pageSettings:{height:600,width:1500,showPageBreaks:true},
    getNodeDefaults: getNodeDefaults,
    getConnectorDefaults:getConnectorDefaults,
    contextMenuSettings: contextMenu,
    contextMenuClick:contextMenuClick,
    contextMenuOpen:contextMenuOpen,
    onUserHandleMouseDown:UserHandleClick,
    historyChange:historyChange, 
    click:onfocus,
    drop:onfocus,
    mouseEnter:onfocus,
    selectionChange:selectionChange,
    // selectedItems: { constraints: ej.diagrams.SelectorConstraints.UserHandle, userHandles: handles },
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
    },created:created
});

function download(data) {
    if (window.navigator.msSaveBlob) {
        var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
        window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
        var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = 'Diagram.json';
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
    var exportOptions = {};
    exportOptions.format = args.item.text;
    exportOptions.mode = 'Download';
    exportOptions.region = 'PageSettings';
    // exportOptions.multiplePage = checkBoxObj.checked;
    exportOptions.fileName = 'Export';
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    diagram.exportDiagram(exportOptions);
}

function onConnectorSelect(args){
    diagram.drawingObject.type = args.item.text;
    diagram.dataBind();
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
// function getTool()

function selectionChange(args)
{
    if(args.newValue.length>0 && args.newValue[0] instanceof ej.diagrams.Node){
     diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All|ej.diagrams.SelectorConstraints.UserHandle, userHandles: handles },

        onClickDisable(false)
    }
    else{
     diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All&~ej.diagrams.SelectorConstraints.UserHandle },

        onClickDisable(true)
    }
}

function historyChange()
{
    diagram.historyManager.undoStack.length>0?toolbarObj.items[21].disabled = false:toolbarObj.items[21].disabled = true
    diagram.historyManager.redoStack.length>0?toolbarObj.items[22].disabled = false:toolbarObj.items[22].disabled = true
}

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
            diagram.drawingObject.sourceID = diagram.selectedItems.nodes[diagram.selectedItems.nodes.length-1].id;
            diagram.dataBind();
            break;
    }
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
            case 'Ledger':
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
           
        }
        return paperSize
}

function paperListChange(args)
{
    var value = args.item.value;
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
        diagram.dataBind();
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
    document.getElementById('menu').focus();
}
function contextMenuOpen(args) {
    var hiddenId = [];
    if (args.element.className !== 'e-menu-parent e-ul ') {
        hiddenId = ['Adhoc', 'Loop', 'taskCompensation', 'Activity-Type', 'Boundry', 'DataObject',
            'collection', 'DeftCall', 'TriggerResult', 'EventType', 'TaskType', 'GateWay','Copy','Paste','Cut','SelectAll','Delete'];
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
    var  fontSize = new ej.inputs.NumericTextBox({
        value: minValue(), min: 10,
        max: 20, width: '100%',
        format: '##.##',
        step: 2,
        change: function (args) { updateAnnotation('fontsize', fontSize); }
    });

    fontSize.appendTo('#fontSizeBtn');

    var btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items: zoomMenuItems, content: Math.round(diagram.scrollSettings.currentZoom*100) + ' %', select: zoomChange });
    btnZoomIncrement.appendTo('#btnZoomIncrement');

var palette = new ej.diagrams.SymbolPalette({
    expandMode: 'Multiple',enableSearch:true, symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 }, symbolHeight: 60, symbolWidth: 60,
    palettes: [
        { id: 'Bpmn', expanded: true, symbols: bpmnShapes, iconCss: 'shapes', title: 'BPMN Shapes' },
        { id: 'Connector', expanded: true, symbols: connectorSymbols, iconCss: 'shapes', title: 'Connectors' },
    ],
    width: '100%', height: '100%',
    getNodeDefaults: function (symbol) {
        symbol.style.strokeColor = '#757575';
    },

    
});
document.getElementById('fontcolor').onchange = (args) =>{
    let nodes = diagram.selectedItems.nodes;
    let connectors = diagram.selectedItems.connectors;
    if(nodes.length>0){
    updateFontColor(nodes,args);
    }
    if(connectors.length>0)
    {
        updateFontColor(connectors,args)
    }  
}
document.getElementById('fillcolor').onchange = (args) =>{
    let nodes = diagram.selectedItems.nodes;
    let connectors = diagram.selectedItems.connectors;
    if(nodes.length>0){
        updateFillColor(nodes,args);
        }
        if(connectors.length>0)
        {
            updateFillColor(connectors,args)
        }  
}

palette.appendTo('#symbolpalette');