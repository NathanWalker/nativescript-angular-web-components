var dialogs = require("ui/dialogs");
var dialogsCommon = require("./dialogs-common");
var types = require("utils/types");
var utils = require("utils/utils");
global.moduleMerge(dialogsCommon, exports);
var UIAlertViewDelegateImpl = (function (_super) {
    __extends(UIAlertViewDelegateImpl, _super);
    function UIAlertViewDelegateImpl() {
        _super.apply(this, arguments);
    }
    UIAlertViewDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    UIAlertViewDelegateImpl.prototype.initWithCallback = function (callback) {
        this._callback = callback;
        return this;
    };
    UIAlertViewDelegateImpl.prototype.alertViewClickedButtonAtIndex = function (view, index) {
        this._callback(view, index);
    };
    UIAlertViewDelegateImpl.ObjCProtocols = [UIAlertViewDelegate];
    return UIAlertViewDelegateImpl;
}(NSObject));
var UIActionSheetDelegateImpl = (function (_super) {
    __extends(UIActionSheetDelegateImpl, _super);
    function UIActionSheetDelegateImpl() {
        _super.apply(this, arguments);
    }
    UIActionSheetDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    UIActionSheetDelegateImpl.prototype.initWithCallback = function (callback) {
        this._callback = callback;
        return this;
    };
    UIActionSheetDelegateImpl.prototype.actionSheetClickedButtonAtIndex = function (actionSheet, index) {
        this._callback(actionSheet, index);
    };
    UIActionSheetDelegateImpl.ObjCProtocols = [UIActionSheetDelegate];
    return UIActionSheetDelegateImpl;
}(NSObject));
function createUIAlertView(options) {
    var alert = new UIAlertView();
    alert.title = options && options.title ? options.title : "";
    alert.message = options && options.message ? options.message : "";
    return alert;
}
var allertButtons;
(function (allertButtons) {
    allertButtons[allertButtons["cancel"] = 1] = "cancel";
    allertButtons[allertButtons["neutral"] = 2] = "neutral";
    allertButtons[allertButtons["ok"] = 4] = "ok";
})(allertButtons || (allertButtons = {}));
function addButtonsToAlertDialog(alert, options) {
    if (!options) {
        return;
    }
    if (options.cancelButtonText) {
        alert.tag = allertButtons.cancel;
        alert.addButtonWithTitle(options.cancelButtonText);
    }
    if (options.neutralButtonText) {
        alert.tag = alert.tag | allertButtons.neutral;
        alert.addButtonWithTitle(options.neutralButtonText);
    }
    if (options.okButtonText) {
        alert.tag = alert.tag | allertButtons.ok;
        alert.addButtonWithTitle(options.okButtonText);
    }
}
function getDialogResult(buttons, index) {
    var hasCancel = buttons & allertButtons.cancel;
    var hasNeutral = buttons & allertButtons.neutral;
    var hasOk = buttons & allertButtons.ok;
    if (hasCancel && hasNeutral && hasOk) {
        return index === 0 ? false : index === 2 ? true : undefined;
    }
    else if (buttons & hasNeutral && hasOk) {
        return index === 0 ? undefined : true;
    }
    else if (hasCancel && hasOk) {
        return index !== 0;
    }
    else if (hasCancel && hasNeutral) {
        return index === 0 ? false : undefined;
    }
    else if (hasCancel) {
        return false;
    }
    else if (hasOk) {
        return true;
    }
    return undefined;
}
function addButtonsToAlertController(alertController, options, callback) {
    if (!options) {
        return;
    }
    if (types.isString(options.cancelButtonText)) {
        alertController.addAction(UIAlertAction.actionWithTitleStyleHandler(options.cancelButtonText, UIAlertActionStyle.UIAlertActionStyleDefault, function (arg) {
            raiseCallback(callback, false);
        }));
    }
    if (types.isString(options.neutralButtonText)) {
        alertController.addAction(UIAlertAction.actionWithTitleStyleHandler(options.neutralButtonText, UIAlertActionStyle.UIAlertActionStyleDefault, function (arg) {
            raiseCallback(callback, undefined);
        }));
    }
    if (types.isString(options.okButtonText)) {
        alertController.addAction(UIAlertAction.actionWithTitleStyleHandler(options.okButtonText, UIAlertActionStyle.UIAlertActionStyleDefault, function (arg) {
            raiseCallback(callback, true);
        }));
    }
}
function raiseCallback(callback, result) {
    if (types.isFunction(callback)) {
        callback(result);
    }
}
function alert(arg) {
    return new Promise(function (resolve, reject) {
        try {
            var options = !dialogsCommon.isDialogOptions(arg) ? { title: dialogsCommon.ALERT, okButtonText: dialogsCommon.OK, message: arg + "" } : arg;
            if (utils.ios.MajorVersion < 8) {
                var alert = createUIAlertView(options);
                if (options.okButtonText) {
                    alert.addButtonWithTitle(options.okButtonText);
                }
                var delegate = UIAlertViewDelegateImpl.new().initWithCallback(function (view, index) {
                    resolve();
                    delegate = undefined;
                });
                alert.delegate = delegate;
                alert.show();
            }
            else {
                var alertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle(options.title, options.message, UIAlertControllerStyle.UIAlertControllerStyleAlert);
                addButtonsToAlertController(alertController, options, function () { resolve(); });
                showUIAlertController(alertController);
            }
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports.alert = alert;
function confirm(arg) {
    return new Promise(function (resolve, reject) {
        try {
            var options = !dialogsCommon.isDialogOptions(arg) ? { title: dialogsCommon.CONFIRM, okButtonText: dialogsCommon.OK, cancelButtonText: dialogsCommon.CANCEL, message: arg + "" } : arg;
            if (utils.ios.MajorVersion < 8) {
                var alert = createUIAlertView(options);
                addButtonsToAlertDialog(alert, options);
                var delegate = UIAlertViewDelegateImpl.new().initWithCallback(function (view, index) {
                    resolve(getDialogResult(alert.tag, index));
                    delegate = undefined;
                });
                alert.delegate = delegate;
                alert.show();
            }
            else {
                var alertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle(options.title, options.message, UIAlertControllerStyle.UIAlertControllerStyleAlert);
                addButtonsToAlertController(alertController, options, function (r) { resolve(r); });
                showUIAlertController(alertController);
            }
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports.confirm = confirm;
function prompt(arg) {
    var options;
    var defaultOptions = {
        title: dialogsCommon.PROMPT,
        okButtonText: dialogsCommon.OK,
        cancelButtonText: dialogsCommon.CANCEL,
        inputType: dialogs.inputType.text,
    };
    if (arguments.length === 1) {
        if (types.isString(arg)) {
            options = defaultOptions;
            options.message = arg;
        }
        else {
            options = arg;
        }
    }
    else if (arguments.length === 2) {
        if (types.isString(arguments[0]) && types.isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.defaultText = arguments[1];
        }
    }
    return new Promise(function (resolve, reject) {
        try {
            var textField;
            if (utils.ios.MajorVersion < 8) {
                var alert = createUIAlertView(options);
                if (options.inputType === dialogs.inputType.password) {
                    alert.alertViewStyle = UIAlertViewStyle.UIAlertViewStyleSecureTextInput;
                }
                else {
                    alert.alertViewStyle = UIAlertViewStyle.UIAlertViewStylePlainTextInput;
                }
                addButtonsToAlertDialog(alert, options);
                textField = alert.textFieldAtIndex(0);
                textField.text = types.isString(options.defaultText) ? options.defaultText : "";
                var delegate = UIAlertViewDelegateImpl.new().initWithCallback(function (view, index) {
                    resolve({ result: getDialogResult(alert.tag, index), text: textField.text });
                    delegate = undefined;
                });
                alert.delegate = delegate;
                alert.show();
            }
            else {
                var alertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle(options.title, options.message, UIAlertControllerStyle.UIAlertControllerStyleAlert);
                alertController.addTextFieldWithConfigurationHandler(function (arg) {
                    arg.text = types.isString(options.defaultText) ? options.defaultText : "";
                    arg.secureTextEntry = options && options.inputType === dialogs.inputType.password;
                    var color = dialogsCommon.getTextFieldColor();
                    if (color) {
                        arg.textColor = arg.tintColor = color.ios;
                    }
                });
                textField = alertController.textFields.firstObject;
                addButtonsToAlertController(alertController, options, function (r) { resolve({ result: r, text: textField.text }); });
                showUIAlertController(alertController);
            }
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports.prompt = prompt;
function login(arg) {
    var options;
    var defaultOptions = { title: dialogsCommon.LOGIN, okButtonText: dialogsCommon.OK, cancelButtonText: dialogsCommon.CANCEL };
    if (arguments.length === 1) {
        if (types.isString(arguments[0])) {
            options = defaultOptions;
            options.message = arguments[0];
        }
        else {
            options = arguments[0];
        }
    }
    else if (arguments.length === 2) {
        if (types.isString(arguments[0]) && types.isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.userName = arguments[1];
        }
    }
    else if (arguments.length === 3) {
        if (types.isString(arguments[0]) && types.isString(arguments[1]) && types.isString(arguments[2])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.userName = arguments[1];
            options.password = arguments[2];
        }
    }
    return new Promise(function (resolve, reject) {
        try {
            var userNameTextField;
            var passwordTextField;
            if (utils.ios.MajorVersion < 8) {
                var alert = createUIAlertView(options);
                alert.alertViewStyle = UIAlertViewStyle.UIAlertViewStyleLoginAndPasswordInput;
                addButtonsToAlertDialog(alert, options);
                userNameTextField = alert.textFieldAtIndex(0);
                userNameTextField.text = types.isString(options.userName) ? options.userName : "";
                passwordTextField = alert.textFieldAtIndex(1);
                passwordTextField.text = types.isString(options.password) ? options.password : "";
                var delegate = UIAlertViewDelegateImpl.new().initWithCallback(function (view, index) {
                    resolve({ result: getDialogResult(alert.tag, index), userName: userNameTextField.text, password: passwordTextField.text });
                    delegate = undefined;
                });
                alert.delegate = delegate;
                alert.show();
            }
            else {
                var alertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle(options.title, options.message, UIAlertControllerStyle.UIAlertControllerStyleAlert);
                alertController.addTextFieldWithConfigurationHandler(function (arg) {
                    arg.placeholder = "Login";
                    arg.text = types.isString(options.userName) ? options.userName : "";
                    var color = dialogsCommon.getTextFieldColor();
                    if (color) {
                        arg.textColor = arg.tintColor = color.ios;
                    }
                });
                alertController.addTextFieldWithConfigurationHandler(function (arg) {
                    arg.placeholder = "Password";
                    arg.secureTextEntry = true;
                    arg.text = types.isString(options.password) ? options.password : "";
                    var color = dialogsCommon.getTextFieldColor();
                    if (color) {
                        arg.textColor = arg.tintColor = color.ios;
                    }
                });
                userNameTextField = alertController.textFields.firstObject;
                passwordTextField = alertController.textFields.lastObject;
                addButtonsToAlertController(alertController, options, function (r) {
                    resolve({
                        result: r,
                        userName: userNameTextField.text,
                        password: passwordTextField.text
                    });
                });
                showUIAlertController(alertController);
            }
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports.login = login;
function showUIAlertController(alertController) {
    var currentPage = dialogsCommon.getCurrentPage();
    if (currentPage) {
        var viewController = currentPage.modal ? currentPage.modal.ios : currentPage.ios;
        if (viewController) {
            if (alertController.popoverPresentationController) {
                alertController.popoverPresentationController.sourceView = viewController.view;
                alertController.popoverPresentationController.sourceRect = CGRectMake(viewController.view.bounds.size.width / 2.0, viewController.view.bounds.size.height / 2.0, 1.0, 1.0);
                alertController.popoverPresentationController.permittedArrowDirections = 0;
            }
            var color = dialogsCommon.getButtonColor();
            if (color) {
                alertController.view.tintColor = color.ios;
            }
            var lblColor = dialogsCommon.getLabelColor();
            if (lblColor) {
                if (alertController.title) {
                    var title = NSAttributedString.alloc().initWithStringAttributes(alertController.title, (_a = {}, _a[NSForegroundColorAttributeName] = lblColor.ios, _a));
                    alertController.setValueForKey(title, "attributedTitle");
                }
                if (alertController.message) {
                    var message = NSAttributedString.alloc().initWithStringAttributes(alertController.message, (_b = {}, _b[NSForegroundColorAttributeName] = lblColor.ios, _b));
                    alertController.setValueForKey(message, "attributedMessage");
                }
            }
            viewController.presentModalViewControllerAnimated(alertController, true);
        }
    }
    var _a, _b;
}
function action(arg) {
    var options;
    var defaultOptions = { title: null, cancelButtonText: dialogsCommon.CANCEL };
    if (arguments.length === 1) {
        if (types.isString(arguments[0])) {
            options = defaultOptions;
            options.message = arguments[0];
        }
        else {
            options = arguments[0];
        }
    }
    else if (arguments.length === 2) {
        if (types.isString(arguments[0]) && types.isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.cancelButtonText = arguments[1];
        }
    }
    else if (arguments.length === 3) {
        if (types.isString(arguments[0]) && types.isString(arguments[1]) && types.isDefined(arguments[2])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.cancelButtonText = arguments[1];
            options.actions = arguments[2];
        }
    }
    return new Promise(function (resolve, reject) {
        try {
            var i;
            var action;
            if (utils.ios.MajorVersion < 8) {
                var actionSheet = new UIActionSheet();
                if (types.isString(options.message)) {
                    actionSheet.title = options.message;
                }
                if (options.actions) {
                    for (i = 0; i < options.actions.length; i++) {
                        action = options.actions[i];
                        if (types.isString(action)) {
                            actionSheet.addButtonWithTitle(action);
                        }
                    }
                }
                if (types.isString(options.cancelButtonText)) {
                    actionSheet.addButtonWithTitle(options.cancelButtonText);
                    actionSheet.cancelButtonIndex = actionSheet.numberOfButtons - 1;
                }
                var delegate = UIActionSheetDelegateImpl.new().initWithCallback(function (sender, index) {
                    resolve(sender.buttonTitleAtIndex(index));
                    delegate = undefined;
                });
                actionSheet.delegate = delegate;
                actionSheet.showInView(UIApplication.sharedApplication().keyWindow);
            }
            else {
                var alertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle(options.title, options.message, UIAlertControllerStyle.UIAlertControllerStyleActionSheet);
                if (options.actions) {
                    for (i = 0; i < options.actions.length; i++) {
                        action = options.actions[i];
                        if (types.isString(action)) {
                            alertController.addAction(UIAlertAction.actionWithTitleStyleHandler(action, UIAlertActionStyle.UIAlertActionStyleDefault, function (arg) {
                                resolve(arg.title);
                            }));
                        }
                    }
                }
                if (types.isString(options.cancelButtonText)) {
                    alertController.addAction(UIAlertAction.actionWithTitleStyleHandler(options.cancelButtonText, UIAlertActionStyle.UIAlertActionStyleCancel, function (arg) {
                        resolve(arg.title);
                    }));
                }
                showUIAlertController(alertController);
            }
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports.action = action;
