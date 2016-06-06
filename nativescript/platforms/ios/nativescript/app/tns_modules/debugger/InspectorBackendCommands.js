function DomainDispatcher(domain) {
    return function (klass) { return __registerDomainDispatcher(domain, klass); };
}
exports.DomainDispatcher = DomainDispatcher;
var ApplicationCacheDomain;
(function (ApplicationCacheDomain) {
    var ApplicationCacheFrontend = (function () {
        function ApplicationCacheFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        ApplicationCacheFrontend.prototype.applicationCacheStatusUpdated = function (frameId, manifestURL, status) {
            this.dispatchMessage(JSON.stringify({ "method": "ApplicationCache.applicationCacheStatusUpdated", "params": { "frameId": frameId, "manifestURL": manifestURL, "status": status } }));
        };
        ApplicationCacheFrontend.prototype.networkStateUpdated = function (isNowOnline) {
            this.dispatchMessage(JSON.stringify({ "method": "ApplicationCache.networkStateUpdated", "params": { "isNowOnline": isNowOnline } }));
        };
        return ApplicationCacheFrontend;
    }());
    ApplicationCacheDomain.ApplicationCacheFrontend = ApplicationCacheFrontend;
})(ApplicationCacheDomain = exports.ApplicationCacheDomain || (exports.ApplicationCacheDomain = {}));
var CSSDomain;
(function (CSSDomain) {
    ;
    ;
    var CSSFrontend = (function () {
        function CSSFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        CSSFrontend.prototype.mediaQueryResultChanged = function () {
            this.dispatchMessage(JSON.stringify({ "method": "CSS.mediaQueryResultChanged", "params": {} }));
        };
        CSSFrontend.prototype.styleSheetChanged = function (styleSheetId) {
            this.dispatchMessage(JSON.stringify({ "method": "CSS.styleSheetChanged", "params": { "styleSheetId": styleSheetId } }));
        };
        CSSFrontend.prototype.namedFlowCreated = function (namedFlow) {
            this.dispatchMessage(JSON.stringify({ "method": "CSS.namedFlowCreated", "params": { "namedFlow": namedFlow } }));
        };
        CSSFrontend.prototype.namedFlowRemoved = function (documentNodeId, flowName) {
            this.dispatchMessage(JSON.stringify({ "method": "CSS.namedFlowRemoved", "params": { "documentNodeId": documentNodeId, "flowName": flowName } }));
        };
        CSSFrontend.prototype.regionOversetChanged = function (namedFlow) {
            this.dispatchMessage(JSON.stringify({ "method": "CSS.regionOversetChanged", "params": { "namedFlow": namedFlow } }));
        };
        CSSFrontend.prototype.registeredNamedFlowContentElement = function (documentNodeId, flowName, contentNodeId, nextContentNodeId) {
            this.dispatchMessage(JSON.stringify({ "method": "CSS.registeredNamedFlowContentElement", "params": { "documentNodeId": documentNodeId, "flowName": flowName, "contentNodeId": contentNodeId, "nextContentNodeId": nextContentNodeId } }));
        };
        CSSFrontend.prototype.unregisteredNamedFlowContentElement = function (documentNodeId, flowName, contentNodeId) {
            this.dispatchMessage(JSON.stringify({ "method": "CSS.unregisteredNamedFlowContentElement", "params": { "documentNodeId": documentNodeId, "flowName": flowName, "contentNodeId": contentNodeId } }));
        };
        return CSSFrontend;
    }());
    CSSDomain.CSSFrontend = CSSFrontend;
})(CSSDomain = exports.CSSDomain || (exports.CSSDomain = {}));
var ConsoleDomain;
(function (ConsoleDomain) {
    var ConsoleFrontend = (function () {
        function ConsoleFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        ConsoleFrontend.prototype.messageAdded = function (message) {
            this.dispatchMessage(JSON.stringify({ "method": "Console.messageAdded", "params": { "message": message } }));
        };
        ConsoleFrontend.prototype.messageRepeatCountUpdated = function (count) {
            this.dispatchMessage(JSON.stringify({ "method": "Console.messageRepeatCountUpdated", "params": { "count": count } }));
        };
        ConsoleFrontend.prototype.messagesCleared = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Console.messagesCleared", "params": {} }));
        };
        return ConsoleFrontend;
    }());
    ConsoleDomain.ConsoleFrontend = ConsoleFrontend;
})(ConsoleDomain = exports.ConsoleDomain || (exports.ConsoleDomain = {}));
var DOMDomain;
(function (DOMDomain) {
    ;
    var DOMFrontend = (function () {
        function DOMFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        DOMFrontend.prototype.documentUpdated = function () {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.documentUpdated", "params": {} }));
        };
        DOMFrontend.prototype.setChildNodes = function (parentId, nodes) {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.setChildNodes", "params": { "parentId": parentId, "nodes": nodes } }));
        };
        DOMFrontend.prototype.attributeModified = function (nodeId, name, value) {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.attributeModified", "params": { "nodeId": nodeId, "name": name, "value": value } }));
        };
        DOMFrontend.prototype.attributeRemoved = function (nodeId, name) {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.attributeRemoved", "params": { "nodeId": nodeId, "name": name } }));
        };
        DOMFrontend.prototype.inlineStyleInvalidated = function (nodeIds) {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.inlineStyleInvalidated", "params": { "nodeIds": nodeIds } }));
        };
        DOMFrontend.prototype.characterDataModified = function (nodeId, characterData) {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.characterDataModified", "params": { "nodeId": nodeId, "characterData": characterData } }));
        };
        DOMFrontend.prototype.childNodeCountUpdated = function (nodeId, childNodeCount) {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.childNodeCountUpdated", "params": { "nodeId": nodeId, "childNodeCount": childNodeCount } }));
        };
        DOMFrontend.prototype.childNodeInserted = function (parentNodeId, previousNodeId, node) {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.childNodeInserted", "params": { "parentNodeId": parentNodeId, "previousNodeId": previousNodeId, "node": node } }));
        };
        DOMFrontend.prototype.childNodeRemoved = function (parentNodeId, nodeId) {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.childNodeRemoved", "params": { "parentNodeId": parentNodeId, "nodeId": nodeId } }));
        };
        DOMFrontend.prototype.shadowRootPushed = function (hostId, root) {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.shadowRootPushed", "params": { "hostId": hostId, "root": root } }));
        };
        DOMFrontend.prototype.shadowRootPopped = function (hostId, rootId) {
            this.dispatchMessage(JSON.stringify({ "method": "DOM.shadowRootPopped", "params": { "hostId": hostId, "rootId": rootId } }));
        };
        return DOMFrontend;
    }());
    DOMDomain.DOMFrontend = DOMFrontend;
})(DOMDomain = exports.DOMDomain || (exports.DOMDomain = {}));
var DOMDebuggerDomain;
(function (DOMDebuggerDomain) {
    ;
})(DOMDebuggerDomain = exports.DOMDebuggerDomain || (exports.DOMDebuggerDomain = {}));
var DOMStorageDomain;
(function (DOMStorageDomain) {
    var DOMStorageFrontend = (function () {
        function DOMStorageFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        DOMStorageFrontend.prototype.domStorageItemsCleared = function (storageId) {
            this.dispatchMessage(JSON.stringify({ "method": "DOMStorage.domStorageItemsCleared", "params": { "storageId": storageId } }));
        };
        DOMStorageFrontend.prototype.domStorageItemRemoved = function (storageId, key) {
            this.dispatchMessage(JSON.stringify({ "method": "DOMStorage.domStorageItemRemoved", "params": { "storageId": storageId, "key": key } }));
        };
        DOMStorageFrontend.prototype.domStorageItemAdded = function (storageId, key, newValue) {
            this.dispatchMessage(JSON.stringify({ "method": "DOMStorage.domStorageItemAdded", "params": { "storageId": storageId, "key": key, "newValue": newValue } }));
        };
        DOMStorageFrontend.prototype.domStorageItemUpdated = function (storageId, key, oldValue, newValue) {
            this.dispatchMessage(JSON.stringify({ "method": "DOMStorage.domStorageItemUpdated", "params": { "storageId": storageId, "key": key, "oldValue": oldValue, "newValue": newValue } }));
        };
        return DOMStorageFrontend;
    }());
    DOMStorageDomain.DOMStorageFrontend = DOMStorageFrontend;
})(DOMStorageDomain = exports.DOMStorageDomain || (exports.DOMStorageDomain = {}));
var DatabaseDomain;
(function (DatabaseDomain) {
    var DatabaseFrontend = (function () {
        function DatabaseFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        DatabaseFrontend.prototype.addDatabase = function (database) {
            this.dispatchMessage(JSON.stringify({ "method": "Database.addDatabase", "params": { "database": database } }));
        };
        return DatabaseFrontend;
    }());
    DatabaseDomain.DatabaseFrontend = DatabaseFrontend;
})(DatabaseDomain = exports.DatabaseDomain || (exports.DatabaseDomain = {}));
var DebuggerDomain;
(function (DebuggerDomain) {
    var DebuggerFrontend = (function () {
        function DebuggerFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        DebuggerFrontend.prototype.globalObjectCleared = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Debugger.globalObjectCleared", "params": {} }));
        };
        DebuggerFrontend.prototype.scriptParsed = function (scriptId, url, startLine, startColumn, endLine, endColumn, isContentScript, sourceMapURL, hasSourceURL) {
            this.dispatchMessage(JSON.stringify({ "method": "Debugger.scriptParsed", "params": { "scriptId": scriptId, "url": url, "startLine": startLine, "startColumn": startColumn, "endLine": endLine, "endColumn": endColumn, "isContentScript": isContentScript, "sourceMapURL": sourceMapURL, "hasSourceURL": hasSourceURL } }));
        };
        DebuggerFrontend.prototype.scriptFailedToParse = function (url, scriptSource, startLine, errorLine, errorMessage) {
            this.dispatchMessage(JSON.stringify({ "method": "Debugger.scriptFailedToParse", "params": { "url": url, "scriptSource": scriptSource, "startLine": startLine, "errorLine": errorLine, "errorMessage": errorMessage } }));
        };
        DebuggerFrontend.prototype.breakpointResolved = function (breakpointId, location) {
            this.dispatchMessage(JSON.stringify({ "method": "Debugger.breakpointResolved", "params": { "breakpointId": breakpointId, "location": location } }));
        };
        DebuggerFrontend.prototype.paused = function (callFrames, reason, data) {
            this.dispatchMessage(JSON.stringify({ "method": "Debugger.paused", "params": { "callFrames": callFrames, "reason": reason, "data": data } }));
        };
        DebuggerFrontend.prototype.resumed = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Debugger.resumed", "params": {} }));
        };
        DebuggerFrontend.prototype.didSampleProbe = function (sample) {
            this.dispatchMessage(JSON.stringify({ "method": "Debugger.didSampleProbe", "params": { "sample": sample } }));
        };
        DebuggerFrontend.prototype.playBreakpointActionSound = function (breakpointActionId) {
            this.dispatchMessage(JSON.stringify({ "method": "Debugger.playBreakpointActionSound", "params": { "breakpointActionId": breakpointActionId } }));
        };
        return DebuggerFrontend;
    }());
    DebuggerDomain.DebuggerFrontend = DebuggerFrontend;
})(DebuggerDomain = exports.DebuggerDomain || (exports.DebuggerDomain = {}));
var InspectorDomain;
(function (InspectorDomain) {
    var InspectorFrontend = (function () {
        function InspectorFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        InspectorFrontend.prototype.evaluateForTestInFrontend = function (script) {
            this.dispatchMessage(JSON.stringify({ "method": "Inspector.evaluateForTestInFrontend", "params": { "script": script } }));
        };
        InspectorFrontend.prototype.inspect = function (object, hints) {
            this.dispatchMessage(JSON.stringify({ "method": "Inspector.inspect", "params": { "object": object, "hints": hints } }));
        };
        InspectorFrontend.prototype.detached = function (reason) {
            this.dispatchMessage(JSON.stringify({ "method": "Inspector.detached", "params": { "reason": reason } }));
        };
        InspectorFrontend.prototype.activateExtraDomains = function (domains) {
            this.dispatchMessage(JSON.stringify({ "method": "Inspector.activateExtraDomains", "params": { "domains": domains } }));
        };
        InspectorFrontend.prototype.targetCrashed = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Inspector.targetCrashed", "params": {} }));
        };
        return InspectorFrontend;
    }());
    InspectorDomain.InspectorFrontend = InspectorFrontend;
})(InspectorDomain = exports.InspectorDomain || (exports.InspectorDomain = {}));
var LayerTreeDomain;
(function (LayerTreeDomain) {
    var LayerTreeFrontend = (function () {
        function LayerTreeFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        LayerTreeFrontend.prototype.layerTreeDidChange = function () {
            this.dispatchMessage(JSON.stringify({ "method": "LayerTree.layerTreeDidChange", "params": {} }));
        };
        return LayerTreeFrontend;
    }());
    LayerTreeDomain.LayerTreeFrontend = LayerTreeFrontend;
})(LayerTreeDomain = exports.LayerTreeDomain || (exports.LayerTreeDomain = {}));
var NetworkDomain;
(function (NetworkDomain) {
    var NetworkFrontend = (function () {
        function NetworkFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        NetworkFrontend.prototype.requestWillBeSent = function (requestId, frameId, loaderId, documentURL, request, timestamp, initiator, redirectResponse, type) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.requestWillBeSent", "params": { "requestId": requestId, "frameId": frameId, "loaderId": loaderId, "documentURL": documentURL, "request": request, "timestamp": timestamp, "initiator": initiator, "redirectResponse": redirectResponse, "type": type } }));
        };
        NetworkFrontend.prototype.requestServedFromCache = function (requestId) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.requestServedFromCache", "params": { "requestId": requestId } }));
        };
        NetworkFrontend.prototype.responseReceived = function (requestId, frameId, loaderId, timestamp, type, response) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.responseReceived", "params": { "requestId": requestId, "frameId": frameId, "loaderId": loaderId, "timestamp": timestamp, "type": type, "response": response } }));
        };
        NetworkFrontend.prototype.dataReceived = function (requestId, timestamp, dataLength, encodedDataLength) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.dataReceived", "params": { "requestId": requestId, "timestamp": timestamp, "dataLength": dataLength, "encodedDataLength": encodedDataLength } }));
        };
        NetworkFrontend.prototype.loadingFinished = function (requestId, timestamp, sourceMapURL) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.loadingFinished", "params": { "requestId": requestId, "timestamp": timestamp, "sourceMapURL": sourceMapURL } }));
        };
        NetworkFrontend.prototype.loadingFailed = function (requestId, timestamp, errorText, canceled) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.loadingFailed", "params": { "requestId": requestId, "timestamp": timestamp, "errorText": errorText, "canceled": canceled } }));
        };
        NetworkFrontend.prototype.requestServedFromMemoryCache = function (requestId, frameId, loaderId, documentURL, timestamp, initiator, resource) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.requestServedFromMemoryCache", "params": { "requestId": requestId, "frameId": frameId, "loaderId": loaderId, "documentURL": documentURL, "timestamp": timestamp, "initiator": initiator, "resource": resource } }));
        };
        NetworkFrontend.prototype.webSocketWillSendHandshakeRequest = function (requestId, timestamp, request) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.webSocketWillSendHandshakeRequest", "params": { "requestId": requestId, "timestamp": timestamp, "request": request } }));
        };
        NetworkFrontend.prototype.webSocketHandshakeResponseReceived = function (requestId, timestamp, response) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.webSocketHandshakeResponseReceived", "params": { "requestId": requestId, "timestamp": timestamp, "response": response } }));
        };
        NetworkFrontend.prototype.webSocketCreated = function (requestId, url) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.webSocketCreated", "params": { "requestId": requestId, "url": url } }));
        };
        NetworkFrontend.prototype.webSocketClosed = function (requestId, timestamp) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.webSocketClosed", "params": { "requestId": requestId, "timestamp": timestamp } }));
        };
        NetworkFrontend.prototype.webSocketFrameReceived = function (requestId, timestamp, response) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.webSocketFrameReceived", "params": { "requestId": requestId, "timestamp": timestamp, "response": response } }));
        };
        NetworkFrontend.prototype.webSocketFrameError = function (requestId, timestamp, errorMessage) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.webSocketFrameError", "params": { "requestId": requestId, "timestamp": timestamp, "errorMessage": errorMessage } }));
        };
        NetworkFrontend.prototype.webSocketFrameSent = function (requestId, timestamp, response) {
            this.dispatchMessage(JSON.stringify({ "method": "Network.webSocketFrameSent", "params": { "requestId": requestId, "timestamp": timestamp, "response": response } }));
        };
        return NetworkFrontend;
    }());
    NetworkDomain.NetworkFrontend = NetworkFrontend;
})(NetworkDomain = exports.NetworkDomain || (exports.NetworkDomain = {}));
var PageDomain;
(function (PageDomain) {
    ;
    ;
    var PageFrontend = (function () {
        function PageFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        PageFrontend.prototype.domContentEventFired = function (timestamp) {
            this.dispatchMessage(JSON.stringify({ "method": "Page.domContentEventFired", "params": { "timestamp": timestamp } }));
        };
        PageFrontend.prototype.loadEventFired = function (timestamp) {
            this.dispatchMessage(JSON.stringify({ "method": "Page.loadEventFired", "params": { "timestamp": timestamp } }));
        };
        PageFrontend.prototype.frameNavigated = function (frame) {
            this.dispatchMessage(JSON.stringify({ "method": "Page.frameNavigated", "params": { "frame": frame } }));
        };
        PageFrontend.prototype.frameDetached = function (frameId) {
            this.dispatchMessage(JSON.stringify({ "method": "Page.frameDetached", "params": { "frameId": frameId } }));
        };
        PageFrontend.prototype.frameStartedLoading = function (frameId) {
            this.dispatchMessage(JSON.stringify({ "method": "Page.frameStartedLoading", "params": { "frameId": frameId } }));
        };
        PageFrontend.prototype.frameStoppedLoading = function (frameId) {
            this.dispatchMessage(JSON.stringify({ "method": "Page.frameStoppedLoading", "params": { "frameId": frameId } }));
        };
        PageFrontend.prototype.frameScheduledNavigation = function (frameId, delay) {
            this.dispatchMessage(JSON.stringify({ "method": "Page.frameScheduledNavigation", "params": { "frameId": frameId, "delay": delay } }));
        };
        PageFrontend.prototype.frameClearedScheduledNavigation = function (frameId) {
            this.dispatchMessage(JSON.stringify({ "method": "Page.frameClearedScheduledNavigation", "params": { "frameId": frameId } }));
        };
        PageFrontend.prototype.javascriptDialogOpening = function (message) {
            this.dispatchMessage(JSON.stringify({ "method": "Page.javascriptDialogOpening", "params": { "message": message } }));
        };
        PageFrontend.prototype.javascriptDialogClosed = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Page.javascriptDialogClosed", "params": {} }));
        };
        PageFrontend.prototype.scriptsEnabled = function (isEnabled) {
            this.dispatchMessage(JSON.stringify({ "method": "Page.scriptsEnabled", "params": { "isEnabled": isEnabled } }));
        };
        return PageFrontend;
    }());
    PageDomain.PageFrontend = PageFrontend;
})(PageDomain = exports.PageDomain || (exports.PageDomain = {}));
var ReplayDomain;
(function (ReplayDomain) {
    ;
    ;
    var ReplayFrontend = (function () {
        function ReplayFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        ReplayFrontend.prototype.captureStarted = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.captureStarted", "params": {} }));
        };
        ReplayFrontend.prototype.captureStopped = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.captureStopped", "params": {} }));
        };
        ReplayFrontend.prototype.playbackHitPosition = function (position, timestamp) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.playbackHitPosition", "params": { "position": position, "timestamp": timestamp } }));
        };
        ReplayFrontend.prototype.playbackStarted = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.playbackStarted", "params": {} }));
        };
        ReplayFrontend.prototype.playbackPaused = function (position) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.playbackPaused", "params": { "position": position } }));
        };
        ReplayFrontend.prototype.playbackFinished = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.playbackFinished", "params": {} }));
        };
        ReplayFrontend.prototype.inputSuppressionChanged = function (willSuppress) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.inputSuppressionChanged", "params": { "willSuppress": willSuppress } }));
        };
        ReplayFrontend.prototype.sessionCreated = function (id) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.sessionCreated", "params": { "id": id } }));
        };
        ReplayFrontend.prototype.sessionModified = function (id) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.sessionModified", "params": { "id": id } }));
        };
        ReplayFrontend.prototype.sessionRemoved = function (id) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.sessionRemoved", "params": { "id": id } }));
        };
        ReplayFrontend.prototype.sessionLoaded = function (id) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.sessionLoaded", "params": { "id": id } }));
        };
        ReplayFrontend.prototype.segmentCreated = function (id) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.segmentCreated", "params": { "id": id } }));
        };
        ReplayFrontend.prototype.segmentRemoved = function (id) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.segmentRemoved", "params": { "id": id } }));
        };
        ReplayFrontend.prototype.segmentCompleted = function (id) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.segmentCompleted", "params": { "id": id } }));
        };
        ReplayFrontend.prototype.segmentLoaded = function (segmentIdentifier) {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.segmentLoaded", "params": { "segmentIdentifier": segmentIdentifier } }));
        };
        ReplayFrontend.prototype.segmentUnloaded = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Replay.segmentUnloaded", "params": {} }));
        };
        return ReplayFrontend;
    }());
    ReplayDomain.ReplayFrontend = ReplayFrontend;
})(ReplayDomain = exports.ReplayDomain || (exports.ReplayDomain = {}));
var RuntimeDomain;
(function (RuntimeDomain) {
    ;
    var RuntimeFrontend = (function () {
        function RuntimeFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        RuntimeFrontend.prototype.executionContextCreated = function (context) {
            this.dispatchMessage(JSON.stringify({ "method": "Runtime.executionContextCreated", "params": { "context": context } }));
        };
        return RuntimeFrontend;
    }());
    RuntimeDomain.RuntimeFrontend = RuntimeFrontend;
})(RuntimeDomain = exports.RuntimeDomain || (exports.RuntimeDomain = {}));
var TimelineDomain;
(function (TimelineDomain) {
    ;
    var TimelineFrontend = (function () {
        function TimelineFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        TimelineFrontend.prototype.eventRecorded = function (record) {
            this.dispatchMessage(JSON.stringify({ "method": "Timeline.eventRecorded", "params": { "record": record } }));
        };
        TimelineFrontend.prototype.recordingStarted = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Timeline.recordingStarted", "params": {} }));
        };
        TimelineFrontend.prototype.recordingStopped = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Timeline.recordingStopped", "params": {} }));
        };
        return TimelineFrontend;
    }());
    TimelineDomain.TimelineFrontend = TimelineFrontend;
})(TimelineDomain = exports.TimelineDomain || (exports.TimelineDomain = {}));
var WorkerDomain;
(function (WorkerDomain) {
    var WorkerFrontend = (function () {
        function WorkerFrontend(dispatchMessage) {
            this.dispatchMessage = dispatchMessage;
        }
        WorkerFrontend.prototype.workerCreated = function (workerId, url, inspectorConnected) {
            this.dispatchMessage(JSON.stringify({ "method": "Worker.workerCreated", "params": { "workerId": workerId, "url": url, "inspectorConnected": inspectorConnected } }));
        };
        WorkerFrontend.prototype.workerTerminated = function (workerId) {
            this.dispatchMessage(JSON.stringify({ "method": "Worker.workerTerminated", "params": { "workerId": workerId } }));
        };
        WorkerFrontend.prototype.dispatchMessageFromWorker = function (workerId, message) {
            this.dispatchMessage(JSON.stringify({ "method": "Worker.dispatchMessageFromWorker", "params": { "workerId": workerId, "message": message } }));
        };
        WorkerFrontend.prototype.disconnectedFromWorker = function () {
            this.dispatchMessage(JSON.stringify({ "method": "Worker.disconnectedFromWorker", "params": {} }));
        };
        return WorkerFrontend;
    }());
    WorkerDomain.WorkerFrontend = WorkerFrontend;
})(WorkerDomain = exports.WorkerDomain || (exports.WorkerDomain = {}));
