/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@mizdra/strictly-typed-event-target/dist/esm/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@mizdra/strictly-typed-event-target/dist/esm/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSTEventTarget": () => (/* binding */ createSTEventTarget)
/* harmony export */ });
function createSTEventTarget() {
    var STCustomEvent = CustomEvent;
    var STEventTarget = EventTarget;
    return [STCustomEvent, STEventTarget];
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/components/action-dropdown.ts":
/*!*******************************************!*\
  !*** ./src/components/action-dropdown.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateActionDropdown = void 0;
const generateActionDropdown = ({ instance, onStartClick, onStopClick, onRestartClick, onDestroyClick, }) => {
    const $dropdown = document.createElement("div");
    $dropdown.classList.add("dropdown");
    const $toggleButton = document.createElement("button");
    $toggleButton.type = "button";
    $toggleButton.classList.add("btn", "btn-sm", "dropdown-toggle");
    $toggleButton.dataset.bsToggle = "dropdown";
    $toggleButton.ariaExpanded = "false";
    $toggleButton.textContent = "操作";
    const $menu = document.createElement("ul");
    $menu.classList.add("dropdown-menu");
    const $startActionLi = document.createElement("li");
    const $startAction = document.createElement("button");
    $startAction.type = "button";
    $startAction.classList.add("dropdown-item");
    $startAction.textContent = "開始";
    if (onStartClick) {
        $startAction.addEventListener("click", onStartClick);
    }
    $startActionLi.append($startAction);
    const $stopActionLi = document.createElement("li");
    const $stopAction = document.createElement("button");
    $stopAction.type = "button";
    $stopAction.classList.add("dropdown-item");
    $stopAction.textContent = "停止";
    if (onStopClick) {
        $stopAction.addEventListener("click", onStopClick);
    }
    $stopActionLi.append($stopAction);
    const $restartActionLi = document.createElement("li");
    const $restartAction = document.createElement("button");
    $restartAction.type = "button";
    $restartAction.classList.add("dropdown-item");
    $restartAction.textContent = "再起動";
    if (onRestartClick) {
        $restartAction.addEventListener("click", onRestartClick);
    }
    $restartActionLi.append($restartAction);
    const $destroyActionLi = document.createElement("li");
    const $destroyAction = document.createElement("button");
    $destroyAction.type = "button";
    $destroyAction.classList.add("dropdown-item");
    $destroyAction.textContent = "消去";
    if (onDestroyClick) {
        $destroyAction.addEventListener("click", onDestroyClick);
    }
    $destroyActionLi.append($destroyAction);
    if (instance.status === "Running") {
        $startAction.disabled = true;
        $destroyAction.disabled = true;
    }
    else if (instance.status === "Stopped") {
        $stopAction.disabled = true;
        $restartAction.disabled = true;
    }
    $menu.append($startActionLi, $stopActionLi, $restartActionLi, $destroyActionLi);
    $dropdown.append($toggleButton, $menu);
    return $dropdown;
};
exports.generateActionDropdown = generateActionDropdown;


/***/ }),

/***/ "./src/components/create-form.ts":
/*!***************************************!*\
  !*** ./src/components/create-form.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateOsOptions = exports.generateOsOption = exports.generateHostOptions = exports.generateHostOption = void 0;
const generateHostOption = (host) => new Option(host.name, host.name);
exports.generateHostOption = generateHostOption;
function generateHostOptions(hosts) {
    return hosts.map((host) => (0, exports.generateHostOption)(host));
}
exports.generateHostOptions = generateHostOptions;
const generateOsOption = (image) => {
    const text = image.os + " " + image.release;
    return new Option(text, image.aliases[0]);
};
exports.generateOsOption = generateOsOption;
function generateOsOptions(images) {
    return images.map((image) => (0, exports.generateOsOption)(image));
}
exports.generateOsOptions = generateOsOptions;


/***/ }),

/***/ "./src/components/table-row.ts":
/*!*************************************!*\
  !*** ./src/components/table-row.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateTableRow = void 0;
const action_dropdown_1 = __webpack_require__(/*! ./action-dropdown */ "./src/components/action-dropdown.ts");
const generateTableRow = ({ instance, onStartClick, onStopClick, onRestartClick, onDestroyClick, }) => {
    const $tr = document.createElement("tr");
    const $status = document.createElement("td");
    $status.textContent = instance.status;
    const $instanceName = document.createElement("td");
    $instanceName.textContent = instance.name;
    const $address = document.createElement("td");
    const $addressList = document.createElement("ul");
    $addressList.classList.add("list-unstyled", "mb-0");
    for (const address of instance.addresses) {
        const $li = document.createElement("li");
        $li.textContent = address.address + "/" + address.netmask;
        $addressList.append($li);
    }
    $address.append($addressList);
    const $hostName = document.createElement("td");
    $hostName.textContent = instance.host;
    const $actions = document.createElement("td");
    $actions.classList.add("text-end");
    const $dropdown = (0, action_dropdown_1.generateActionDropdown)({
        instance,
        onStartClick: (event) => {
            onStartClick?.(event, instance);
        },
        onStopClick: (event) => {
            onStopClick?.(event, instance);
        },
        onRestartClick: (event) => {
            onRestartClick?.(event, instance);
        },
        onDestroyClick: (event) => {
            onDestroyClick?.(event, instance);
        },
    });
    $actions.append($dropdown);
    $tr.append($status, $instanceName, $address, $hostName, $actions);
    return $tr;
};
exports.generateTableRow = generateTableRow;


/***/ }),

/***/ "./src/components/table-rows.ts":
/*!**************************************!*\
  !*** ./src/components/table-rows.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateTableRows = void 0;
const table_row_1 = __webpack_require__(/*! ./table-row */ "./src/components/table-row.ts");
function* generateTableRows({ hosts, onStartClick, onStopClick, onRestartClick, onDestroyClick, }) {
    for (const host of hosts) {
        for (const instance of host.instances) {
            const flatInstance = {
                ...instance,
                host: host.name,
                updatedAt: host.updatedAt,
            };
            yield (0, table_row_1.generateTableRow)({
                instance: flatInstance,
                onStartClick,
                onStopClick,
                onRestartClick,
                onDestroyClick,
            });
        }
    }
}
exports.generateTableRows = generateTableRows;


/***/ }),

/***/ "./src/control-plane-client.ts":
/*!*************************************!*\
  !*** ./src/control-plane-client.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ControlPlaneClient_instances, _ControlPlaneClient_socket, _ControlPlaneClient_onClose, _ControlPlaneClient_onError, _ControlPlaneClient_onMessage, _ControlPlaneClient_onOpen;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControlPlaneClient = void 0;
const strictly_typed_event_target_1 = __webpack_require__(/*! @mizdra/strictly-typed-event-target */ "./node_modules/@mizdra/strictly-typed-event-target/dist/esm/index.js");
const [ControlPlaneEvent, ControlPlaneEventTarget] = (0, strictly_typed_event_target_1.createSTEventTarget)();
class ControlPlaneClient extends ControlPlaneEventTarget {
    constructor(url, protocols) {
        super();
        _ControlPlaneClient_instances.add(this);
        _ControlPlaneClient_socket.set(this, void 0);
        __classPrivateFieldSet(this, _ControlPlaneClient_socket, new WebSocket(url, protocols), "f");
        __classPrivateFieldGet(this, _ControlPlaneClient_socket, "f").addEventListener("close", __classPrivateFieldGet(this, _ControlPlaneClient_instances, "m", _ControlPlaneClient_onClose).bind(this));
        __classPrivateFieldGet(this, _ControlPlaneClient_socket, "f").addEventListener("error", __classPrivateFieldGet(this, _ControlPlaneClient_instances, "m", _ControlPlaneClient_onError).bind(this));
        __classPrivateFieldGet(this, _ControlPlaneClient_socket, "f").addEventListener("message", __classPrivateFieldGet(this, _ControlPlaneClient_instances, "m", _ControlPlaneClient_onMessage).bind(this));
        __classPrivateFieldGet(this, _ControlPlaneClient_socket, "f").addEventListener("open", __classPrivateFieldGet(this, _ControlPlaneClient_instances, "m", _ControlPlaneClient_onOpen).bind(this));
    }
    send(message) {
        return __classPrivateFieldGet(this, _ControlPlaneClient_socket, "f")?.send(JSON.stringify(message));
    }
    get readyState() {
        return __classPrivateFieldGet(this, _ControlPlaneClient_socket, "f").readyState;
    }
}
exports.ControlPlaneClient = ControlPlaneClient;
_ControlPlaneClient_socket = new WeakMap(), _ControlPlaneClient_instances = new WeakSet(), _ControlPlaneClient_onClose = function _ControlPlaneClient_onClose(event) {
    const customCloseEvent = new ControlPlaneEvent("close", {
        detail: {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean,
        },
    });
    this.dispatchEvent(customCloseEvent);
}, _ControlPlaneClient_onError = function _ControlPlaneClient_onError(event) {
    const customErrorEvent = new ControlPlaneEvent("error");
    this.dispatchEvent(customErrorEvent);
}, _ControlPlaneClient_onMessage = function _ControlPlaneClient_onMessage(event) {
    const message = JSON.parse(event.data);
    const customMessageEvent = new ControlPlaneEvent("message", {
        detail: {
            data: message,
        },
    });
    this.dispatchEvent(customMessageEvent);
}, _ControlPlaneClient_onOpen = function _ControlPlaneClient_onOpen(event) {
    const customOpenEvent = new ControlPlaneEvent("open");
    this.dispatchEvent(customOpenEvent);
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const on_change_1 = __importDefault(__webpack_require__(/*! on-change */ "./node_modules/on-change/index.js"));
const create_form_1 = __webpack_require__(/*! ./components/create-form */ "./src/components/create-form.ts");
const table_rows_1 = __webpack_require__(/*! ./components/table-rows */ "./src/components/table-rows.ts");
const control_plane_client_1 = __webpack_require__(/*! ./control-plane-client */ "./src/control-plane-client.ts");
const QUERY_INTERVAL_SEC = 60;
const INITIAL_HOST = [];
const $appRoot = document.getElementById("app");
const $connectionStatus = document.getElementById("connection-status");
const $instanceTable = document.getElementById("instance-table");
const $reloadButton = document.getElementById("reload-button");
const $createForm = document.getElementById("create-form");
if ($createForm === null || !($createForm instanceof HTMLFormElement)) {
    throw new Error("Failed to initialize");
}
const $hostSelect = $createForm.elements.namedItem("host");
const $osSelect = $createForm.elements.namedItem("os");
if ($appRoot === null ||
    $connectionStatus === null ||
    $instanceTable === null ||
    !($instanceTable instanceof HTMLTableElement) ||
    $reloadButton === null ||
    !($reloadButton instanceof HTMLButtonElement) ||
    $hostSelect === null ||
    !($hostSelect instanceof HTMLSelectElement) ||
    $osSelect === null ||
    !($osSelect instanceof HTMLSelectElement)) {
    throw new Error("Failed to initialize");
}
// 状態
const hosts = (0, on_change_1.default)(INITIAL_HOST, function () {
    renderTableBody($instanceTable.tBodies[0], this);
    renderHostSelection($hostSelect, this);
});
const connectionStatus = (0, on_change_1.default)({ state: WebSocket.CLOSED }, function () {
    renderConnectionStatus($connectionStatus, this.state);
    $reloadButton.disabled = this.state !== WebSocket.OPEN;
});
const selectedHostname = (0, on_change_1.default)({ value: $hostSelect.value }, function () {
    renderOsSelection($osSelect, this.value);
});
let lastQueryHostDate;
const CONNECTION_MESSAGE_MAP = {
    0: "接続試行中",
    1: "接続完了",
    2: "切断中",
    3: "切断",
};
const renderConnectionStatus = ($root, state) => {
    $root.textContent = CONNECTION_MESSAGE_MAP[state];
};
const renderTableBody = ($tbody, hosts) => {
    const rows = (0, table_rows_1.generateTableRows)({
        hosts,
        onStartClick(_, instance) {
            client.send({
                type: "COMMAND_START",
                host: instance.host,
                instance: instance.name,
            });
        },
        onStopClick(_, instance) {
            client.send({
                type: "COMMAND_STOP",
                host: instance.host,
                instance: instance.name,
            });
        },
        onRestartClick(_, instance) {
            client.send({
                type: "COMMAND_RESTART",
                host: instance.host,
                instance: instance.name,
            });
        },
        onDestroyClick(_, instance) {
            client.send({
                type: "COMMAND_DESTROY",
                host: instance.host,
                instance: instance.name,
            });
        },
    });
    $tbody.replaceChildren(...rows);
};
const renderHostSelection = ($select, hosts) => {
    const options = (0, create_form_1.generateHostOptions)(hosts);
    $select.replaceChildren(...options);
    selectedHostname.value = $select.value;
};
const renderOsSelection = ($select, hostname) => {
    const selectedHost = hosts.find((host) => host.name === hostname);
    if (selectedHost === undefined) {
        $select.replaceChildren();
        return;
    }
    const options = (0, create_form_1.generateOsOptions)(selectedHost.images);
    $select.replaceChildren(...options);
};
$reloadButton.addEventListener("click", () => {
    client.send({
        type: "QUERY_HOST",
    });
});
const url = prompt("Enter the control plane URI");
if (url === null) {
    throw new Error("URL was not provided");
}
const token = prompt("Enter token");
if (token === null) {
    throw new Error("Token was not provided");
}
const params = new URLSearchParams({
    t: token,
});
const client = new control_plane_client_1.ControlPlaneClient(url + "?" + params.toString());
connectionStatus.state = client.readyState;
let intervalQueryId;
$hostSelect.addEventListener("input", (e) => {
    selectedHostname.value = $hostSelect.value;
});
$createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const hostname = $createForm.elements.namedItem("host").value;
    const os = $createForm.elements.namedItem("os").value;
    const name = $createForm.elements.namedItem("name")
        .value;
    const username = $createForm.elements.namedItem("username").value;
    const password = $createForm.elements.namedItem("password").value;
    client.send({
        type: "COMMAND_CREATE",
        host: hostname,
        alias: os,
        name: name,
        user: username,
        password: password,
    });
});
client.addEventListener("message", (event) => {
    console.log("MESSAGE RECIEVED");
    console.log(event.detail);
    const message = event.detail.data;
    if (message.type === "QUERY_HOST") {
        lastQueryHostDate = new Date();
    }
    if (message.type === "ADVERTISE_HOST") {
        const i = hosts.findIndex((host) => host.name === message.host);
        const host = {
            name: message.host,
            images: message.images,
            instances: message.instances,
            updatedAt: new Date(),
        };
        if (i === -1) {
            hosts.push(host);
        }
        else {
            hosts[i] = host;
        }
    }
});
client.addEventListener("open", (event) => {
    connectionStatus.state = client.readyState;
    client.send({
        type: "QUERY_HOST",
    });
    intervalQueryId = window.setInterval(() => {
        if (document.hidden) {
            console.log("非アクティブ節約");
            return;
        }
        if (lastQueryHostDate === undefined) {
            return;
        }
        const diffMs = Date.now() - lastQueryHostDate.getTime();
        if (diffMs / 1000 < QUERY_INTERVAL_SEC / 2) {
            console.log("頻回節約");
            return;
        }
        client.send({
            type: "QUERY_HOST",
        });
    }, QUERY_INTERVAL_SEC * 1000);
});
client.addEventListener("close", (event) => {
    connectionStatus.state = client.readyState;
    console.log(event.detail);
    if (intervalQueryId !== undefined) {
        clearInterval(intervalQueryId);
    }
});
client.addEventListener("error", (event) => {
    connectionStatus.state = client.readyState;
    console.log(event);
});


/***/ }),

/***/ "./node_modules/on-change/index.js":
/*!*****************************************!*\
  !*** ./node_modules/on-change/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/constants.js */ "./node_modules/on-change/lib/constants.js");
/* harmony import */ var _lib_is_builtin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/is-builtin.js */ "./node_modules/on-change/lib/is-builtin.js");
/* harmony import */ var _lib_path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/path.js */ "./node_modules/on-change/lib/path.js");
/* harmony import */ var _lib_is_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/is-symbol.js */ "./node_modules/on-change/lib/is-symbol.js");
/* harmony import */ var _lib_is_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/is-iterator.js */ "./node_modules/on-change/lib/is-iterator.js");
/* harmony import */ var _lib_wrap_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/wrap-iterator.js */ "./node_modules/on-change/lib/wrap-iterator.js");
/* harmony import */ var _lib_ignore_property_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/ignore-property.js */ "./node_modules/on-change/lib/ignore-property.js");
/* harmony import */ var _lib_cache_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/cache.js */ "./node_modules/on-change/lib/cache.js");
/* harmony import */ var _lib_smart_clone_smart_clone_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/smart-clone/smart-clone.js */ "./node_modules/on-change/lib/smart-clone/smart-clone.js");
/* eslint-disable unicorn/prefer-spread */










const defaultOptions = {
	equals: Object.is,
	isShallow: false,
	pathAsArray: false,
	ignoreSymbols: false,
	ignoreUnderscores: false,
	ignoreDetached: false,
	details: false,
};

const onChange = (object, onChange, options = {}) => {
	options = {
		...defaultOptions,
		...options,
	};

	const proxyTarget = Symbol('ProxyTarget');
	const {equals, isShallow, ignoreDetached, details} = options;
	const cache = new _lib_cache_js__WEBPACK_IMPORTED_MODULE_7__["default"](equals);
	const hasOnValidate = typeof options.onValidate === 'function';
	const smartClone = new _lib_smart_clone_smart_clone_js__WEBPACK_IMPORTED_MODULE_8__["default"](hasOnValidate);

	// eslint-disable-next-line max-params
	const validate = (target, property, value, previous, applyData) => !hasOnValidate
		|| smartClone.isCloning
		|| options.onValidate(_lib_path_js__WEBPACK_IMPORTED_MODULE_2__["default"].concat(cache.getPath(target), property), value, previous, applyData) === true;

	const handleChangeOnTarget = (target, property, value, previous) => {
		if (
			!(0,_lib_ignore_property_js__WEBPACK_IMPORTED_MODULE_6__["default"])(cache, options, property)
			&& !(ignoreDetached && cache.isDetached(target, object))
		) {
			handleChange(cache.getPath(target), property, value, previous);
		}
	};

	// eslint-disable-next-line max-params
	const handleChange = (changePath, property, value, previous, applyData) => {
		if (smartClone.isCloning) {
			smartClone.update(changePath, property, previous);
		} else {
			onChange(_lib_path_js__WEBPACK_IMPORTED_MODULE_2__["default"].concat(changePath, property), value, previous, applyData);
		}
	};

	const getProxyTarget = value => value
		? (value[proxyTarget] || value)
		: value;

	const prepareValue = (value, target, property, basePath) => {
		if (
			(0,_lib_is_builtin_js__WEBPACK_IMPORTED_MODULE_1__.isBuiltinWithoutMutableMethods)(value)
			|| property === 'constructor'
			|| (isShallow && !_lib_smart_clone_smart_clone_js__WEBPACK_IMPORTED_MODULE_8__["default"].isHandledMethod(target, property))
			|| (0,_lib_ignore_property_js__WEBPACK_IMPORTED_MODULE_6__["default"])(cache, options, property)
			|| cache.isGetInvariant(target, property)
			|| (ignoreDetached && cache.isDetached(target, object))
		) {
			return value;
		}

		if (basePath === undefined) {
			basePath = cache.getPath(target);
		}

		return cache.getProxy(value, _lib_path_js__WEBPACK_IMPORTED_MODULE_2__["default"].concat(basePath, property), handler, proxyTarget);
	};

	const handler = {
		get(target, property, receiver) {
			if ((0,_lib_is_symbol_js__WEBPACK_IMPORTED_MODULE_3__["default"])(property)) {
				if (property === proxyTarget || property === _lib_constants_js__WEBPACK_IMPORTED_MODULE_0__.TARGET) {
					return target;
				}

				if (
					property === _lib_constants_js__WEBPACK_IMPORTED_MODULE_0__.UNSUBSCRIBE
					&& !cache.isUnsubscribed
					&& cache.getPath(target).length === 0
				) {
					cache.unsubscribe();
					return target;
				}
			}

			const value = (0,_lib_is_builtin_js__WEBPACK_IMPORTED_MODULE_1__.isBuiltinWithMutableMethods)(target)
				? Reflect.get(target, property)
				: Reflect.get(target, property, receiver);

			return prepareValue(value, target, property);
		},

		set(target, property, value, receiver) {
			value = getProxyTarget(value);

			const reflectTarget = target[proxyTarget] || target;
			const previous = reflectTarget[property];

			if (equals(previous, value) && property in target) {
				return true;
			}

			const isValid = validate(target, property, value, previous);

			if (
				isValid
				&& cache.setProperty(reflectTarget, property, value, receiver, previous)
			) {
				handleChangeOnTarget(target, property, target[property], previous);

				return true;
			}

			return !isValid;
		},

		defineProperty(target, property, descriptor) {
			if (!cache.isSameDescriptor(descriptor, target, property)) {
				const previous = target[property];

				if (
					validate(target, property, descriptor.value, previous)
					&& cache.defineProperty(target, property, descriptor, previous)
				) {
					handleChangeOnTarget(target, property, descriptor.value, previous);
				}
			}

			return true;
		},

		deleteProperty(target, property) {
			if (!Reflect.has(target, property)) {
				return true;
			}

			const previous = Reflect.get(target, property);
			const isValid = validate(target, property, undefined, previous);

			if (
				isValid
				&& cache.deleteProperty(target, property, previous)
			) {
				handleChangeOnTarget(target, property, undefined, previous);

				return true;
			}

			return !isValid;
		},

		apply(target, thisArg, argumentsList) {
			const thisProxyTarget = thisArg[proxyTarget] || thisArg;

			if (cache.isUnsubscribed) {
				return Reflect.apply(target, thisProxyTarget, argumentsList);
			}

			if (
				(details === false
					|| (details !== true && !details.includes(target.name)))
				&& _lib_smart_clone_smart_clone_js__WEBPACK_IMPORTED_MODULE_8__["default"].isHandledType(thisProxyTarget)
			) {
				let applyPath = _lib_path_js__WEBPACK_IMPORTED_MODULE_2__["default"].initial(cache.getPath(target));
				const isHandledMethod = _lib_smart_clone_smart_clone_js__WEBPACK_IMPORTED_MODULE_8__["default"].isHandledMethod(thisProxyTarget, target.name);

				smartClone.start(thisProxyTarget, applyPath, argumentsList);

				let result = Reflect.apply(
					target,
					smartClone.preferredThisArg(target, thisArg, thisProxyTarget),
					isHandledMethod
						? argumentsList.map(argument => getProxyTarget(argument))
						: argumentsList,
				);

				const isChanged = smartClone.isChanged(thisProxyTarget, equals);
				const previous = smartClone.stop();

				if (_lib_smart_clone_smart_clone_js__WEBPACK_IMPORTED_MODULE_8__["default"].isHandledType(result) && isHandledMethod) {
					if (thisArg instanceof Map && target.name === 'get') {
						applyPath = _lib_path_js__WEBPACK_IMPORTED_MODULE_2__["default"].concat(applyPath, argumentsList[0]);
					}

					result = cache.getProxy(result, applyPath, handler);
				}

				if (isChanged) {
					const applyData = {
						name: target.name,
						args: argumentsList,
						result,
					};
					const changePath = smartClone.isCloning
						? _lib_path_js__WEBPACK_IMPORTED_MODULE_2__["default"].initial(applyPath)
						: applyPath;
					const property = smartClone.isCloning
						? _lib_path_js__WEBPACK_IMPORTED_MODULE_2__["default"].last(applyPath)
						: '';

					if (validate(_lib_path_js__WEBPACK_IMPORTED_MODULE_2__["default"].get(object, changePath), property, thisProxyTarget, previous, applyData)) {
						handleChange(changePath, property, thisProxyTarget, previous, applyData);
					} else {
						smartClone.undo(thisProxyTarget);
					}
				}

				if (
					(thisArg instanceof Map || thisArg instanceof Set)
					&& (0,_lib_is_iterator_js__WEBPACK_IMPORTED_MODULE_4__["default"])(result)
				) {
					return (0,_lib_wrap_iterator_js__WEBPACK_IMPORTED_MODULE_5__["default"])(result, target, thisArg, applyPath, prepareValue);
				}

				return result;
			}

			return Reflect.apply(target, thisArg, argumentsList);
		},
	};

	const proxy = cache.getProxy(object, options.pathAsArray ? [] : '', handler);
	onChange = onChange.bind(proxy);

	if (hasOnValidate) {
		options.onValidate = options.onValidate.bind(proxy); // eslint-disable-line unicorn/prefer-prototype-methods
	}

	return proxy;
};

onChange.target = proxy => (proxy && proxy[_lib_constants_js__WEBPACK_IMPORTED_MODULE_0__.TARGET]) || proxy;
onChange.unsubscribe = proxy => proxy[_lib_constants_js__WEBPACK_IMPORTED_MODULE_0__.UNSUBSCRIBE] || proxy;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (onChange);


/***/ }),

/***/ "./node_modules/on-change/lib/cache.js":
/*!*********************************************!*\
  !*** ./node_modules/on-change/lib/cache.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cache)
/* harmony export */ });
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path.js */ "./node_modules/on-change/lib/path.js");


/**
@class Cache
@private
*/
class Cache {
	constructor(equals) {
		this._equals = equals;
		this._proxyCache = new WeakMap();
		this._pathCache = new WeakMap();
		this.isUnsubscribed = false;
	}

	_getDescriptorCache() {
		if (this._descriptorCache === undefined) {
			this._descriptorCache = new WeakMap();
		}

		return this._descriptorCache;
	}

	_getProperties(target) {
		const descriptorCache = this._getDescriptorCache();
		let properties = descriptorCache.get(target);

		if (properties === undefined) {
			properties = {};
			descriptorCache.set(target, properties);
		}

		return properties;
	}

	_getOwnPropertyDescriptor(target, property) {
		if (this.isUnsubscribed) {
			return Reflect.getOwnPropertyDescriptor(target, property);
		}

		const properties = this._getProperties(target);
		let descriptor = properties[property];

		if (descriptor === undefined) {
			descriptor = Reflect.getOwnPropertyDescriptor(target, property);
			properties[property] = descriptor;
		}

		return descriptor;
	}

	getProxy(target, path, handler, proxyTarget) {
		if (this.isUnsubscribed) {
			return target;
		}

		const reflectTarget = target[proxyTarget];
		const source = reflectTarget || target;

		this._pathCache.set(source, path);

		let proxy = this._proxyCache.get(source);

		if (proxy === undefined) {
			proxy = reflectTarget === undefined
				? new Proxy(target, handler)
				: target;

			this._proxyCache.set(source, proxy);
		}

		return proxy;
	}

	getPath(target) {
		return this.isUnsubscribed ? undefined : this._pathCache.get(target);
	}

	isDetached(target, object) {
		return !Object.is(target, _path_js__WEBPACK_IMPORTED_MODULE_0__["default"].get(object, this.getPath(target)));
	}

	defineProperty(target, property, descriptor) {
		if (!Reflect.defineProperty(target, property, descriptor)) {
			return false;
		}

		if (!this.isUnsubscribed) {
			this._getProperties(target)[property] = descriptor;
		}

		return true;
	}

	setProperty(target, property, value, receiver, previous) { // eslint-disable-line max-params
		if (!this._equals(previous, value) || !(property in target)) {
			const descriptor = this._getOwnPropertyDescriptor(target, property);

			if (descriptor !== undefined && 'set' in descriptor) {
				return Reflect.set(target, property, value, receiver);
			}

			return Reflect.set(target, property, value);
		}

		return true;
	}

	deleteProperty(target, property, previous) {
		if (Reflect.deleteProperty(target, property)) {
			if (!this.isUnsubscribed) {
				const properties = this._getDescriptorCache().get(target);

				if (properties) {
					delete properties[property];
					this._pathCache.delete(previous);
				}
			}

			return true;
		}

		return false;
	}

	isSameDescriptor(a, target, property) {
		const b = this._getOwnPropertyDescriptor(target, property);

		return a !== undefined
			&& b !== undefined
			&& Object.is(a.value, b.value)
			&& (a.writable || false) === (b.writable || false)
			&& (a.enumerable || false) === (b.enumerable || false)
			&& (a.configurable || false) === (b.configurable || false)
			&& a.get === b.get
			&& a.set === b.set;
	}

	isGetInvariant(target, property) {
		const descriptor = this._getOwnPropertyDescriptor(target, property);

		return descriptor !== undefined
			&& descriptor.configurable !== true
			&& descriptor.writable !== true;
	}

	unsubscribe() {
		this._descriptorCache = null;
		this._pathCache = null;
		this._proxyCache = null;
		this.isUnsubscribed = true;
	}
}


/***/ }),

/***/ "./node_modules/on-change/lib/constants.js":
/*!*************************************************!*\
  !*** ./node_modules/on-change/lib/constants.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PATH_SEPARATOR": () => (/* binding */ PATH_SEPARATOR),
/* harmony export */   "TARGET": () => (/* binding */ TARGET),
/* harmony export */   "UNSUBSCRIBE": () => (/* binding */ UNSUBSCRIBE)
/* harmony export */ });
const PATH_SEPARATOR = '.';
const TARGET = Symbol('target');
const UNSUBSCRIBE = Symbol('unsubscribe');


/***/ }),

/***/ "./node_modules/on-change/lib/ignore-property.js":
/*!*******************************************************!*\
  !*** ./node_modules/on-change/lib/ignore-property.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ignoreProperty)
/* harmony export */ });
/* harmony import */ var _is_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-symbol.js */ "./node_modules/on-change/lib/is-symbol.js");


function ignoreProperty(cache, options, property) {
	return cache.isUnsubscribed
		|| (options.ignoreSymbols && (0,_is_symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"])(property))
		|| (options.ignoreUnderscores && property.charAt(0) === '_')
		|| ('ignoreKeys' in options && options.ignoreKeys.includes(property));
}


/***/ }),

/***/ "./node_modules/on-change/lib/is-array.js":
/*!************************************************!*\
  !*** ./node_modules/on-change/lib/is-array.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Array.isArray);


/***/ }),

/***/ "./node_modules/on-change/lib/is-builtin.js":
/*!**************************************************!*\
  !*** ./node_modules/on-change/lib/is-builtin.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isBuiltinWithMutableMethods": () => (/* binding */ isBuiltinWithMutableMethods),
/* harmony export */   "isBuiltinWithoutMutableMethods": () => (/* binding */ isBuiltinWithoutMutableMethods)
/* harmony export */ });
function isBuiltinWithMutableMethods(value) {
	return value instanceof Date
		|| value instanceof Set
		|| value instanceof Map
		|| value instanceof WeakSet
		|| value instanceof WeakMap
		|| ArrayBuffer.isView(value);
}

function isBuiltinWithoutMutableMethods(value) {
	return (typeof value === 'object' ? value === null : typeof value !== 'function') || value instanceof RegExp;
}


/***/ }),

/***/ "./node_modules/on-change/lib/is-iterator.js":
/*!***************************************************!*\
  !*** ./node_modules/on-change/lib/is-iterator.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isIterator)
/* harmony export */ });
function isIterator(value) {
	return typeof value === 'object' && typeof value.next === 'function';
}


/***/ }),

/***/ "./node_modules/on-change/lib/is-object.js":
/*!*************************************************!*\
  !*** ./node_modules/on-change/lib/is-object.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isObject)
/* harmony export */ });
function isObject(value) {
	return toString.call(value) === '[object Object]';
}


/***/ }),

/***/ "./node_modules/on-change/lib/is-symbol.js":
/*!*************************************************!*\
  !*** ./node_modules/on-change/lib/is-symbol.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSymbol)
/* harmony export */ });
function isSymbol(value) {
	return typeof value === 'symbol';
}


/***/ }),

/***/ "./node_modules/on-change/lib/path.js":
/*!********************************************!*\
  !*** ./node_modules/on-change/lib/path.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/on-change/lib/constants.js");
/* harmony import */ var _is_array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-array.js */ "./node_modules/on-change/lib/is-array.js");
/* harmony import */ var _is_symbol_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-symbol.js */ "./node_modules/on-change/lib/is-symbol.js");




const path = {
	after: (path, subPath) => {
		if ((0,_is_array_js__WEBPACK_IMPORTED_MODULE_1__["default"])(path)) {
			return path.slice(subPath.length);
		}

		if (subPath === '') {
			return path;
		}

		return path.slice(subPath.length + 1);
	},
	concat: (path, key) => {
		if ((0,_is_array_js__WEBPACK_IMPORTED_MODULE_1__["default"])(path)) {
			path = [...path];

			if (key) {
				path.push(key);
			}

			return path;
		}

		if (key && key.toString !== undefined) {
			if (path !== '') {
				path += _constants_js__WEBPACK_IMPORTED_MODULE_0__.PATH_SEPARATOR;
			}

			if ((0,_is_symbol_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key)) {
				return path + key.toString();
			}

			return path + key;
		}

		return path;
	},
	initial: path => {
		if ((0,_is_array_js__WEBPACK_IMPORTED_MODULE_1__["default"])(path)) {
			return path.slice(0, -1);
		}

		if (path === '') {
			return path;
		}

		const index = path.lastIndexOf(_constants_js__WEBPACK_IMPORTED_MODULE_0__.PATH_SEPARATOR);

		if (index === -1) {
			return '';
		}

		return path.slice(0, index);
	},
	last: path => {
		if ((0,_is_array_js__WEBPACK_IMPORTED_MODULE_1__["default"])(path)) {
			return path[path.length - 1] || '';
		}

		if (path === '') {
			return path;
		}

		const index = path.lastIndexOf(_constants_js__WEBPACK_IMPORTED_MODULE_0__.PATH_SEPARATOR);

		if (index === -1) {
			return path;
		}

		return path.slice(index + 1);
	},
	walk: (path, callback) => {
		if ((0,_is_array_js__WEBPACK_IMPORTED_MODULE_1__["default"])(path)) {
			for (const key of path) {
				callback(key);
			}
		} else if (path !== '') {
			let position = 0;
			let index = path.indexOf(_constants_js__WEBPACK_IMPORTED_MODULE_0__.PATH_SEPARATOR);

			if (index === -1) {
				callback(path);
			} else {
				while (position < path.length) {
					if (index === -1) {
						index = path.length;
					}

					callback(path.slice(position, index));

					position = index + 1;
					index = path.indexOf(_constants_js__WEBPACK_IMPORTED_MODULE_0__.PATH_SEPARATOR, position);
				}
			}
		}
	},
	get(object, path) {
		this.walk(path, key => {
			if (object) {
				object = object[key];
			}
		});

		return object;
	},
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (path);


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/clone/clone-array.js":
/*!*********************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/clone/clone-array.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CloneArray)
/* harmony export */ });
/* harmony import */ var _methods_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../methods/array.js */ "./node_modules/on-change/lib/smart-clone/methods/array.js");
/* harmony import */ var _clone_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clone-object.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-object.js");



class CloneArray extends _clone_object_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static isHandledMethod(name) {
		return _methods_array_js__WEBPACK_IMPORTED_MODULE_0__.HANDLED_ARRAY_METHODS.has(name);
	}
}


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/clone/clone-date.js":
/*!********************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/clone/clone-date.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CloneDate)
/* harmony export */ });
/* harmony import */ var _clone_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clone-object.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-object.js");


class CloneDate extends _clone_object_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	undo(object) {
		object.setTime(this.clone.getTime());
	}

	isChanged(value, equals) {
		return !equals(this.clone.valueOf(), value.valueOf());
	}
}


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/clone/clone-map.js":
/*!*******************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/clone/clone-map.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CloneMap)
/* harmony export */ });
/* harmony import */ var _methods_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../methods/map.js */ "./node_modules/on-change/lib/smart-clone/methods/map.js");
/* harmony import */ var _clone_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clone-object.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-object.js");



class CloneMap extends _clone_object_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static isHandledMethod(name) {
		return _methods_map_js__WEBPACK_IMPORTED_MODULE_0__.HANDLED_MAP_METHODS.has(name);
	}

	undo(object) {
		for (const [key, value] of this.clone.entries()) {
			object.set(key, value);
		}

		for (const key of object.keys()) {
			if (!this.clone.has(key)) {
				object.delete(key);
			}
		}
	}
}


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/clone/clone-object.js":
/*!**********************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/clone/clone-object.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CloneObject)
/* harmony export */ });
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../path.js */ "./node_modules/on-change/lib/path.js");
/* harmony import */ var _is_array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../is-array.js */ "./node_modules/on-change/lib/is-array.js");
/* harmony import */ var _is_object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../is-object.js */ "./node_modules/on-change/lib/is-object.js");
/* harmony import */ var _methods_array_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../methods/array.js */ "./node_modules/on-change/lib/smart-clone/methods/array.js");
/* harmony import */ var _methods_set_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../methods/set.js */ "./node_modules/on-change/lib/smart-clone/methods/set.js");
/* harmony import */ var _methods_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../methods/map.js */ "./node_modules/on-change/lib/smart-clone/methods/map.js");
/* harmony import */ var _methods_object_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../methods/object.js */ "./node_modules/on-change/lib/smart-clone/methods/object.js");








class CloneObject {
	constructor(value, path, argumentsList, hasOnValidate) {
		this._path = path;
		this._isChanged = false;
		this._clonedCache = new Set();
		this._hasOnValidate = hasOnValidate;
		this._changes = hasOnValidate ? [] : null;

		this.clone = path === undefined ? value : this._shallowClone(value);
	}

	static isHandledMethod(name) {
		return _methods_object_js__WEBPACK_IMPORTED_MODULE_6__.IMMUTABLE_OBJECT_METHODS.has(name);
	}

	_shallowClone(value) {
		let clone = value;

		if ((0,_is_object_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value)) {
			clone = {...value};
		} else if ((0,_is_array_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value)) {
			clone = [...value];
		} else if (value instanceof Date) {
			clone = new Date(value);
		} else if (value instanceof Set) {
			clone = new Set([...value].map(item => this._shallowClone(item)));
		} else if (value instanceof Map) {
			clone = new Map();

			for (const [key, item] of value.entries()) {
				clone.set(key, this._shallowClone(item));
			}
		}

		this._clonedCache.add(clone);

		return clone;
	}

	preferredThisArg(isHandledMethod, name, thisArg, thisProxyTarget) {
		if (isHandledMethod) {
			if ((0,_is_array_js__WEBPACK_IMPORTED_MODULE_1__["default"])(thisProxyTarget)) {
				this._onIsChanged = _methods_array_js__WEBPACK_IMPORTED_MODULE_3__.MUTABLE_ARRAY_METHODS[name];
			} else if (thisProxyTarget instanceof Set) {
				this._onIsChanged = _methods_set_js__WEBPACK_IMPORTED_MODULE_4__.MUTABLE_SET_METHODS[name];
			} else if (thisProxyTarget instanceof Map) {
				this._onIsChanged = _methods_map_js__WEBPACK_IMPORTED_MODULE_5__.MUTABLE_MAP_METHODS[name];
			}

			return thisProxyTarget;
		}

		return thisArg;
	}

	update(fullPath, property, value) {
		const changePath = _path_js__WEBPACK_IMPORTED_MODULE_0__["default"].after(fullPath, this._path);

		if (property !== 'length') {
			let object = this.clone;

			_path_js__WEBPACK_IMPORTED_MODULE_0__["default"].walk(changePath, key => {
				if (object && object[key]) {
					if (!this._clonedCache.has(object[key])) {
						object[key] = this._shallowClone(object[key]);
					}

					object = object[key];
				}
			});

			if (this._hasOnValidate) {
				this._changes.push({
					path: changePath,
					property,
					previous: value,
				});
			}

			if (object && object[property]) {
				object[property] = value;
			}
		}

		this._isChanged = true;
	}

	undo(object) {
		let change;

		for (let index = this._changes.length - 1; index !== -1; index--) {
			change = this._changes[index];

			_path_js__WEBPACK_IMPORTED_MODULE_0__["default"].get(object, change.path)[change.property] = change.previous;
		}
	}

	isChanged(value) {
		return this._onIsChanged === undefined
			? this._isChanged
			: this._onIsChanged(this.clone, value);
	}
}


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/clone/clone-set.js":
/*!*******************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/clone/clone-set.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CloneSet)
/* harmony export */ });
/* harmony import */ var _methods_set_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../methods/set.js */ "./node_modules/on-change/lib/smart-clone/methods/set.js");
/* harmony import */ var _clone_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clone-object.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-object.js");



class CloneSet extends _clone_object_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
	static isHandledMethod(name) {
		return _methods_set_js__WEBPACK_IMPORTED_MODULE_0__.HANDLED_SET_METHODS.has(name);
	}

	undo(object) {
		for (const value of this.clone) {
			object.add(value);
		}

		for (const value of object) {
			if (!this.clone.has(value)) {
				object.delete(value);
			}
		}
	}
}



/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/clone/clone-weakmap.js":
/*!***********************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/clone/clone-weakmap.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CloneWeakMap)
/* harmony export */ });
/* harmony import */ var _clone_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clone-object.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-object.js");


class CloneWeakMap extends _clone_object_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor(value, path, argumentsList, hasOnValidate) {
		super(undefined, path, argumentsList, hasOnValidate);

		this._weakKey = argumentsList[0];
		this._weakHas = value.has(this._weakKey);
		this._weakValue = value.get(this._weakKey);
	}

	isChanged(value) {
		return this._weakValue !== value.get(this._weakKey);
	}

	undo(object) {
		const weakHas = object.has(this._weakKey);

		if (this._weakHas && !weakHas) {
			object.set(this._weakKey, this._weakValue);
		} else if (!this._weakHas && weakHas) {
			object.delete(this._weakKey);
		} else if (this._weakValue !== object.get(this._weakKey)) {
			object.set(this._weakKey, this._weakValue);
		}
	}
}


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/clone/clone-weakset.js":
/*!***********************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/clone/clone-weakset.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CloneWeakSet)
/* harmony export */ });
/* harmony import */ var _clone_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clone-object.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-object.js");


class CloneWeakSet extends _clone_object_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor(value, path, argumentsList, hasOnValidate) {
		super(undefined, path, argumentsList, hasOnValidate);

		this._arg1 = argumentsList[0];
		this._weakValue = value.has(this._arg1);
	}

	isChanged(value) {
		return this._weakValue !== value.has(this._arg1);
	}

	undo(object) {
		if (this._weakValue && !object.has(this._arg1)) {
			object.add(this._arg1);
		} else {
			object.delete(this._arg1);
		}
	}
}



/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/diff/is-diff-arrays.js":
/*!***********************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/diff/is-diff-arrays.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isDiffArrays)
/* harmony export */ });
function isDiffArrays(clone, value) {
	return clone.length !== value.length || clone.some((item, index) => value[index] !== item);
}


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/diff/is-diff-certain.js":
/*!************************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/diff/is-diff-certain.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isDiffCertain)
/* harmony export */ });
function isDiffCertain() {
	return true;
}


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/diff/is-diff-maps.js":
/*!*********************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/diff/is-diff-maps.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isDiffMaps)
/* harmony export */ });
function isDiffMaps(clone, value) {
	if (clone.size !== value.size) {
		return true;
	}

	let bValue;
	for (const [key, aValue] of clone) {
		bValue = value.get(key);

		if (bValue !== aValue || (bValue === undefined && !value.has(key))) {
			return true;
		}
	}

	return false;
}


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/diff/is-diff-sets.js":
/*!*********************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/diff/is-diff-sets.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isDiffSets)
/* harmony export */ });
function isDiffSets(clone, value) {
	if (clone.size !== value.size) {
		return true;
	}

	for (const element of clone) {
		if (!value.has(element)) {
			return true;
		}
	}

	return false;
}


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/methods/array.js":
/*!*****************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/methods/array.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MUTABLE_ARRAY_METHODS": () => (/* binding */ MUTABLE_ARRAY_METHODS),
/* harmony export */   "HANDLED_ARRAY_METHODS": () => (/* binding */ HANDLED_ARRAY_METHODS)
/* harmony export */ });
/* harmony import */ var _diff_is_diff_certain_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../diff/is-diff-certain.js */ "./node_modules/on-change/lib/smart-clone/diff/is-diff-certain.js");
/* harmony import */ var _diff_is_diff_arrays_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../diff/is-diff-arrays.js */ "./node_modules/on-change/lib/smart-clone/diff/is-diff-arrays.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object.js */ "./node_modules/on-change/lib/smart-clone/methods/object.js");




const IMMUTABLE_ARRAY_METHODS = new Set([
	'concat',
	'includes',
	'indexOf',
	'join',
	'keys',
	'lastIndexOf',
]);

const MUTABLE_ARRAY_METHODS = {
	push: _diff_is_diff_certain_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	pop: _diff_is_diff_certain_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	shift: _diff_is_diff_certain_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	unshift: _diff_is_diff_certain_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	copyWithin: _diff_is_diff_arrays_js__WEBPACK_IMPORTED_MODULE_1__["default"],
	reverse: _diff_is_diff_arrays_js__WEBPACK_IMPORTED_MODULE_1__["default"],
	sort: _diff_is_diff_arrays_js__WEBPACK_IMPORTED_MODULE_1__["default"],
	splice: _diff_is_diff_arrays_js__WEBPACK_IMPORTED_MODULE_1__["default"],
	flat: _diff_is_diff_arrays_js__WEBPACK_IMPORTED_MODULE_1__["default"],
	fill: _diff_is_diff_arrays_js__WEBPACK_IMPORTED_MODULE_1__["default"],
};

const HANDLED_ARRAY_METHODS = new Set([
	..._object_js__WEBPACK_IMPORTED_MODULE_2__.IMMUTABLE_OBJECT_METHODS,
	...IMMUTABLE_ARRAY_METHODS,
	...Object.keys(MUTABLE_ARRAY_METHODS),
]);


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/methods/map.js":
/*!***************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/methods/map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MUTABLE_MAP_METHODS": () => (/* binding */ MUTABLE_MAP_METHODS),
/* harmony export */   "HANDLED_MAP_METHODS": () => (/* binding */ HANDLED_MAP_METHODS)
/* harmony export */ });
/* harmony import */ var _diff_is_diff_maps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../diff/is-diff-maps.js */ "./node_modules/on-change/lib/smart-clone/diff/is-diff-maps.js");
/* harmony import */ var _set_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./set.js */ "./node_modules/on-change/lib/smart-clone/methods/set.js");



const IMMUTABLE_MAP_METHODS = new Set([..._set_js__WEBPACK_IMPORTED_MODULE_1__.IMMUTABLE_SET_METHODS, 'get']);

const MUTABLE_MAP_METHODS = {
	set: _diff_is_diff_maps_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	clear: _diff_is_diff_maps_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	delete: _diff_is_diff_maps_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	forEach: _diff_is_diff_maps_js__WEBPACK_IMPORTED_MODULE_0__["default"],
};

const HANDLED_MAP_METHODS = new Set([
	...IMMUTABLE_MAP_METHODS,
	...Object.keys(MUTABLE_MAP_METHODS),
	..._set_js__WEBPACK_IMPORTED_MODULE_1__.COLLECTION_ITERATOR_METHODS,
]);


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/methods/object.js":
/*!******************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/methods/object.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IMMUTABLE_OBJECT_METHODS": () => (/* binding */ IMMUTABLE_OBJECT_METHODS)
/* harmony export */ });
const IMMUTABLE_OBJECT_METHODS = new Set([
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'toLocaleString',
	'toString',
	'valueOf',
]);


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/methods/set.js":
/*!***************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/methods/set.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COLLECTION_ITERATOR_METHODS": () => (/* binding */ COLLECTION_ITERATOR_METHODS),
/* harmony export */   "IMMUTABLE_SET_METHODS": () => (/* binding */ IMMUTABLE_SET_METHODS),
/* harmony export */   "MUTABLE_SET_METHODS": () => (/* binding */ MUTABLE_SET_METHODS),
/* harmony export */   "HANDLED_SET_METHODS": () => (/* binding */ HANDLED_SET_METHODS)
/* harmony export */ });
/* harmony import */ var _diff_is_diff_sets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../diff/is-diff-sets.js */ "./node_modules/on-change/lib/smart-clone/diff/is-diff-sets.js");


const COLLECTION_ITERATOR_METHODS = [
	'keys',
	'values',
	'entries',
];

const IMMUTABLE_SET_METHODS = new Set([
	'has',
	'toString',
]);

const MUTABLE_SET_METHODS = {
	add: _diff_is_diff_sets_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	clear: _diff_is_diff_sets_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	delete: _diff_is_diff_sets_js__WEBPACK_IMPORTED_MODULE_0__["default"],
	forEach: _diff_is_diff_sets_js__WEBPACK_IMPORTED_MODULE_0__["default"],
};

const HANDLED_SET_METHODS = new Set([
	...IMMUTABLE_SET_METHODS,
	...Object.keys(MUTABLE_SET_METHODS),
	...COLLECTION_ITERATOR_METHODS,
]);


/***/ }),

/***/ "./node_modules/on-change/lib/smart-clone/smart-clone.js":
/*!***************************************************************!*\
  !*** ./node_modules/on-change/lib/smart-clone/smart-clone.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SmartClone)
/* harmony export */ });
/* harmony import */ var _is_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../is-array.js */ "./node_modules/on-change/lib/is-array.js");
/* harmony import */ var _is_builtin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../is-builtin.js */ "./node_modules/on-change/lib/is-builtin.js");
/* harmony import */ var _is_object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../is-object.js */ "./node_modules/on-change/lib/is-object.js");
/* harmony import */ var _clone_clone_object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clone/clone-object.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-object.js");
/* harmony import */ var _clone_clone_array_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./clone/clone-array.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-array.js");
/* harmony import */ var _clone_clone_date_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clone/clone-date.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-date.js");
/* harmony import */ var _clone_clone_set_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./clone/clone-set.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-set.js");
/* harmony import */ var _clone_clone_map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clone/clone-map.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-map.js");
/* harmony import */ var _clone_clone_weakset_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./clone/clone-weakset.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-weakset.js");
/* harmony import */ var _clone_clone_weakmap_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./clone/clone-weakmap.js */ "./node_modules/on-change/lib/smart-clone/clone/clone-weakmap.js");











class SmartClone {
	constructor(hasOnValidate) {
		this._stack = [];
		this._hasOnValidate = hasOnValidate;
	}

	static isHandledType(value) {
		return (0,_is_object_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value)
			|| (0,_is_array_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)
			|| (0,_is_builtin_js__WEBPACK_IMPORTED_MODULE_1__.isBuiltinWithMutableMethods)(value);
	}

	static isHandledMethod(target, name) {
		if ((0,_is_object_js__WEBPACK_IMPORTED_MODULE_2__["default"])(target)) {
			return _clone_clone_object_js__WEBPACK_IMPORTED_MODULE_3__["default"].isHandledMethod(name);
		}

		if ((0,_is_array_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target)) {
			return _clone_clone_array_js__WEBPACK_IMPORTED_MODULE_4__["default"].isHandledMethod(name);
		}

		if (target instanceof Set) {
			return _clone_clone_set_js__WEBPACK_IMPORTED_MODULE_6__["default"].isHandledMethod(name);
		}

		if (target instanceof Map) {
			return _clone_clone_map_js__WEBPACK_IMPORTED_MODULE_7__["default"].isHandledMethod(name);
		}

		return (0,_is_builtin_js__WEBPACK_IMPORTED_MODULE_1__.isBuiltinWithMutableMethods)(target);
	}

	get isCloning() {
		return this._stack.length > 0;
	}

	start(value, path, argumentsList) {
		let CloneClass = _clone_clone_object_js__WEBPACK_IMPORTED_MODULE_3__["default"];

		if ((0,_is_array_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
			CloneClass = _clone_clone_array_js__WEBPACK_IMPORTED_MODULE_4__["default"];
		} else if (value instanceof Date) {
			CloneClass = _clone_clone_date_js__WEBPACK_IMPORTED_MODULE_5__["default"];
		} else if (value instanceof Set) {
			CloneClass = _clone_clone_set_js__WEBPACK_IMPORTED_MODULE_6__["default"];
		} else if (value instanceof Map) {
			CloneClass = _clone_clone_map_js__WEBPACK_IMPORTED_MODULE_7__["default"];
		} else if (value instanceof WeakSet) {
			CloneClass = _clone_clone_weakset_js__WEBPACK_IMPORTED_MODULE_8__["default"];
		} else if (value instanceof WeakMap) {
			CloneClass = _clone_clone_weakmap_js__WEBPACK_IMPORTED_MODULE_9__["default"];
		}

		this._stack.push(new CloneClass(value, path, argumentsList, this._hasOnValidate));
	}

	update(fullPath, property, value) {
		this._stack[this._stack.length - 1].update(fullPath, property, value);
	}

	preferredThisArg(target, thisArg, thisProxyTarget) {
		const {name} = target;
		const isHandledMethod = SmartClone.isHandledMethod(thisProxyTarget, name);

		return this._stack[this._stack.length - 1]
			.preferredThisArg(isHandledMethod, name, thisArg, thisProxyTarget);
	}

	isChanged(isMutable, value, equals) {
		return this._stack[this._stack.length - 1].isChanged(isMutable, value, equals);
	}

	undo(object) {
		if (this._previousClone !== undefined) {
			this._previousClone.undo(object);
		}
	}

	stop() {
		this._previousClone = this._stack.pop();

		return this._previousClone.clone;
	}
}


/***/ }),

/***/ "./node_modules/on-change/lib/wrap-iterator.js":
/*!*****************************************************!*\
  !*** ./node_modules/on-change/lib/wrap-iterator.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ wrapIterator)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/on-change/lib/constants.js");


// eslint-disable-next-line max-params
function wrapIterator(iterator, target, thisArg, applyPath, prepareValue) {
	const originalNext = iterator.next;

	if (target.name === 'entries') {
		iterator.next = function () {
			const result = originalNext.call(this);

			if (result.done === false) {
				result.value[0] = prepareValue(
					result.value[0],
					target,
					result.value[0],
					applyPath,
				);
				result.value[1] = prepareValue(
					result.value[1],
					target,
					result.value[0],
					applyPath,
				);
			}

			return result;
		};
	} else if (target.name === 'values') {
		const keyIterator = thisArg[_constants_js__WEBPACK_IMPORTED_MODULE_0__.TARGET].keys();

		iterator.next = function () {
			const result = originalNext.call(this);

			if (result.done === false) {
				result.value = prepareValue(
					result.value,
					target,
					keyIterator.next().value,
					applyPath,
				);
			}

			return result;
		};
	} else {
		iterator.next = function () {
			const result = originalNext.call(this);

			if (result.done === false) {
				result.value = prepareValue(
					result.value,
					target,
					result.value,
					applyPath,
				);
			}

			return result;
		};
	}

	return iterator;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxvREFBb0QseUJBQXlCO0FBQzdFO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsb0RBQW9ELDBCQUEwQjtBQUM5RTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzlGc0M7O0FBRXRDO0FBQ2U7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILDhCQUE4QixpREFBTTs7QUFFcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O1VDOURBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2MycmUtd2ViLWNsaWVudC8uL25vZGVfbW9kdWxlcy9AbWl6ZHJhL3N0cmljdGx5LXR5cGVkLWV2ZW50LXRhcmdldC9kaXN0L2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vc3JjL2NvbXBvbmVudHMvYWN0aW9uLWRyb3Bkb3duLnRzIiwid2VicGFjazovL2tjMnJlLXdlYi1jbGllbnQvLi9zcmMvY29tcG9uZW50cy9jcmVhdGUtZm9ybS50cyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vc3JjL2NvbXBvbmVudHMvdGFibGUtcm93LnRzIiwid2VicGFjazovL2tjMnJlLXdlYi1jbGllbnQvLi9zcmMvY29tcG9uZW50cy90YWJsZS1yb3dzLnRzIiwid2VicGFjazovL2tjMnJlLXdlYi1jbGllbnQvLi9zcmMvY29udHJvbC1wbGFuZS1jbGllbnQudHMiLCJ3ZWJwYWNrOi8va2MycmUtd2ViLWNsaWVudC8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvY2FjaGUuanMiLCJ3ZWJwYWNrOi8va2MycmUtd2ViLWNsaWVudC8uL25vZGVfbW9kdWxlcy9vbi1jaGFuZ2UvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvaWdub3JlLXByb3BlcnR5LmpzIiwid2VicGFjazovL2tjMnJlLXdlYi1jbGllbnQvLi9ub2RlX21vZHVsZXMvb24tY2hhbmdlL2xpYi9pcy1hcnJheS5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvaXMtYnVpbHRpbi5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvaXMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8va2MycmUtd2ViLWNsaWVudC8uL25vZGVfbW9kdWxlcy9vbi1jaGFuZ2UvbGliL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvaXMtc3ltYm9sLmpzIiwid2VicGFjazovL2tjMnJlLXdlYi1jbGllbnQvLi9ub2RlX21vZHVsZXMvb24tY2hhbmdlL2xpYi9wYXRoLmpzIiwid2VicGFjazovL2tjMnJlLXdlYi1jbGllbnQvLi9ub2RlX21vZHVsZXMvb24tY2hhbmdlL2xpYi9zbWFydC1jbG9uZS9jbG9uZS9jbG9uZS1hcnJheS5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvc21hcnQtY2xvbmUvY2xvbmUvY2xvbmUtZGF0ZS5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvc21hcnQtY2xvbmUvY2xvbmUvY2xvbmUtbWFwLmpzIiwid2VicGFjazovL2tjMnJlLXdlYi1jbGllbnQvLi9ub2RlX21vZHVsZXMvb24tY2hhbmdlL2xpYi9zbWFydC1jbG9uZS9jbG9uZS9jbG9uZS1vYmplY3QuanMiLCJ3ZWJwYWNrOi8va2MycmUtd2ViLWNsaWVudC8uL25vZGVfbW9kdWxlcy9vbi1jaGFuZ2UvbGliL3NtYXJ0LWNsb25lL2Nsb25lL2Nsb25lLXNldC5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvc21hcnQtY2xvbmUvY2xvbmUvY2xvbmUtd2Vha21hcC5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvc21hcnQtY2xvbmUvY2xvbmUvY2xvbmUtd2Vha3NldC5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvc21hcnQtY2xvbmUvZGlmZi9pcy1kaWZmLWFycmF5cy5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvc21hcnQtY2xvbmUvZGlmZi9pcy1kaWZmLWNlcnRhaW4uanMiLCJ3ZWJwYWNrOi8va2MycmUtd2ViLWNsaWVudC8uL25vZGVfbW9kdWxlcy9vbi1jaGFuZ2UvbGliL3NtYXJ0LWNsb25lL2RpZmYvaXMtZGlmZi1tYXBzLmpzIiwid2VicGFjazovL2tjMnJlLXdlYi1jbGllbnQvLi9ub2RlX21vZHVsZXMvb24tY2hhbmdlL2xpYi9zbWFydC1jbG9uZS9kaWZmL2lzLWRpZmYtc2V0cy5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvc21hcnQtY2xvbmUvbWV0aG9kcy9hcnJheS5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvc21hcnQtY2xvbmUvbWV0aG9kcy9tYXAuanMiLCJ3ZWJwYWNrOi8va2MycmUtd2ViLWNsaWVudC8uL25vZGVfbW9kdWxlcy9vbi1jaGFuZ2UvbGliL3NtYXJ0LWNsb25lL21ldGhvZHMvb2JqZWN0LmpzIiwid2VicGFjazovL2tjMnJlLXdlYi1jbGllbnQvLi9ub2RlX21vZHVsZXMvb24tY2hhbmdlL2xpYi9zbWFydC1jbG9uZS9tZXRob2RzL3NldC5qcyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL29uLWNoYW5nZS9saWIvc21hcnQtY2xvbmUvc21hcnQtY2xvbmUuanMiLCJ3ZWJwYWNrOi8va2MycmUtd2ViLWNsaWVudC8uL25vZGVfbW9kdWxlcy9vbi1jaGFuZ2UvbGliL3dyYXAtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8va2MycmUtd2ViLWNsaWVudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va2MycmUtd2ViLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tjMnJlLXdlYi1jbGllbnQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9rYzJyZS13ZWItY2xpZW50L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY3JlYXRlU1RFdmVudFRhcmdldCgpIHtcbiAgICB2YXIgU1RDdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xuICAgIHZhciBTVEV2ZW50VGFyZ2V0ID0gRXZlbnRUYXJnZXQ7XG4gICAgcmV0dXJuIFtTVEN1c3RvbUV2ZW50LCBTVEV2ZW50VGFyZ2V0XTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZW5lcmF0ZUFjdGlvbkRyb3Bkb3duID0gdm9pZCAwO1xuY29uc3QgZ2VuZXJhdGVBY3Rpb25Ecm9wZG93biA9ICh7IGluc3RhbmNlLCBvblN0YXJ0Q2xpY2ssIG9uU3RvcENsaWNrLCBvblJlc3RhcnRDbGljaywgb25EZXN0cm95Q2xpY2ssIH0pID0+IHtcbiAgICBjb25zdCAkZHJvcGRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICRkcm9wZG93bi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd25cIik7XG4gICAgY29uc3QgJHRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgJHRvZ2dsZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICAkdG9nZ2xlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tc21cIiwgXCJkcm9wZG93bi10b2dnbGVcIik7XG4gICAgJHRvZ2dsZUJ1dHRvbi5kYXRhc2V0LmJzVG9nZ2xlID0gXCJkcm9wZG93blwiO1xuICAgICR0b2dnbGVCdXR0b24uYXJpYUV4cGFuZGVkID0gXCJmYWxzZVwiO1xuICAgICR0b2dnbGVCdXR0b24udGV4dENvbnRlbnQgPSBcIuaTjeS9nFwiO1xuICAgIGNvbnN0ICRtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICRtZW51LmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1tZW51XCIpO1xuICAgIGNvbnN0ICRzdGFydEFjdGlvbkxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGNvbnN0ICRzdGFydEFjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgJHN0YXJ0QWN0aW9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICRzdGFydEFjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICAkc3RhcnRBY3Rpb24udGV4dENvbnRlbnQgPSBcIumWi+Wni1wiO1xuICAgIGlmIChvblN0YXJ0Q2xpY2spIHtcbiAgICAgICAgJHN0YXJ0QWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvblN0YXJ0Q2xpY2spO1xuICAgIH1cbiAgICAkc3RhcnRBY3Rpb25MaS5hcHBlbmQoJHN0YXJ0QWN0aW9uKTtcbiAgICBjb25zdCAkc3RvcEFjdGlvbkxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGNvbnN0ICRzdG9wQWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAkc3RvcEFjdGlvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICAkc3RvcEFjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICAkc3RvcEFjdGlvbi50ZXh0Q29udGVudCA9IFwi5YGc5q2iXCI7XG4gICAgaWYgKG9uU3RvcENsaWNrKSB7XG4gICAgICAgICRzdG9wQWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvblN0b3BDbGljayk7XG4gICAgfVxuICAgICRzdG9wQWN0aW9uTGkuYXBwZW5kKCRzdG9wQWN0aW9uKTtcbiAgICBjb25zdCAkcmVzdGFydEFjdGlvbkxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGNvbnN0ICRyZXN0YXJ0QWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAkcmVzdGFydEFjdGlvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICAkcmVzdGFydEFjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICAkcmVzdGFydEFjdGlvbi50ZXh0Q29udGVudCA9IFwi5YaN6LW35YuVXCI7XG4gICAgaWYgKG9uUmVzdGFydENsaWNrKSB7XG4gICAgICAgICRyZXN0YXJ0QWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvblJlc3RhcnRDbGljayk7XG4gICAgfVxuICAgICRyZXN0YXJ0QWN0aW9uTGkuYXBwZW5kKCRyZXN0YXJ0QWN0aW9uKTtcbiAgICBjb25zdCAkZGVzdHJveUFjdGlvbkxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGNvbnN0ICRkZXN0cm95QWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAkZGVzdHJveUFjdGlvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICAkZGVzdHJveUFjdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICAkZGVzdHJveUFjdGlvbi50ZXh0Q29udGVudCA9IFwi5raI5Y67XCI7XG4gICAgaWYgKG9uRGVzdHJveUNsaWNrKSB7XG4gICAgICAgICRkZXN0cm95QWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkRlc3Ryb3lDbGljayk7XG4gICAgfVxuICAgICRkZXN0cm95QWN0aW9uTGkuYXBwZW5kKCRkZXN0cm95QWN0aW9uKTtcbiAgICBpZiAoaW5zdGFuY2Uuc3RhdHVzID09PSBcIlJ1bm5pbmdcIikge1xuICAgICAgICAkc3RhcnRBY3Rpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAkZGVzdHJveUFjdGlvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGluc3RhbmNlLnN0YXR1cyA9PT0gXCJTdG9wcGVkXCIpIHtcbiAgICAgICAgJHN0b3BBY3Rpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAkcmVzdGFydEFjdGlvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgICRtZW51LmFwcGVuZCgkc3RhcnRBY3Rpb25MaSwgJHN0b3BBY3Rpb25MaSwgJHJlc3RhcnRBY3Rpb25MaSwgJGRlc3Ryb3lBY3Rpb25MaSk7XG4gICAgJGRyb3Bkb3duLmFwcGVuZCgkdG9nZ2xlQnV0dG9uLCAkbWVudSk7XG4gICAgcmV0dXJuICRkcm9wZG93bjtcbn07XG5leHBvcnRzLmdlbmVyYXRlQWN0aW9uRHJvcGRvd24gPSBnZW5lcmF0ZUFjdGlvbkRyb3Bkb3duO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdlbmVyYXRlT3NPcHRpb25zID0gZXhwb3J0cy5nZW5lcmF0ZU9zT3B0aW9uID0gZXhwb3J0cy5nZW5lcmF0ZUhvc3RPcHRpb25zID0gZXhwb3J0cy5nZW5lcmF0ZUhvc3RPcHRpb24gPSB2b2lkIDA7XG5jb25zdCBnZW5lcmF0ZUhvc3RPcHRpb24gPSAoaG9zdCkgPT4gbmV3IE9wdGlvbihob3N0Lm5hbWUsIGhvc3QubmFtZSk7XG5leHBvcnRzLmdlbmVyYXRlSG9zdE9wdGlvbiA9IGdlbmVyYXRlSG9zdE9wdGlvbjtcbmZ1bmN0aW9uIGdlbmVyYXRlSG9zdE9wdGlvbnMoaG9zdHMpIHtcbiAgICByZXR1cm4gaG9zdHMubWFwKChob3N0KSA9PiAoMCwgZXhwb3J0cy5nZW5lcmF0ZUhvc3RPcHRpb24pKGhvc3QpKTtcbn1cbmV4cG9ydHMuZ2VuZXJhdGVIb3N0T3B0aW9ucyA9IGdlbmVyYXRlSG9zdE9wdGlvbnM7XG5jb25zdCBnZW5lcmF0ZU9zT3B0aW9uID0gKGltYWdlKSA9PiB7XG4gICAgY29uc3QgdGV4dCA9IGltYWdlLm9zICsgXCIgXCIgKyBpbWFnZS5yZWxlYXNlO1xuICAgIHJldHVybiBuZXcgT3B0aW9uKHRleHQsIGltYWdlLmFsaWFzZXNbMF0pO1xufTtcbmV4cG9ydHMuZ2VuZXJhdGVPc09wdGlvbiA9IGdlbmVyYXRlT3NPcHRpb247XG5mdW5jdGlvbiBnZW5lcmF0ZU9zT3B0aW9ucyhpbWFnZXMpIHtcbiAgICByZXR1cm4gaW1hZ2VzLm1hcCgoaW1hZ2UpID0+ICgwLCBleHBvcnRzLmdlbmVyYXRlT3NPcHRpb24pKGltYWdlKSk7XG59XG5leHBvcnRzLmdlbmVyYXRlT3NPcHRpb25zID0gZ2VuZXJhdGVPc09wdGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2VuZXJhdGVUYWJsZVJvdyA9IHZvaWQgMDtcbmNvbnN0IGFjdGlvbl9kcm9wZG93bl8xID0gcmVxdWlyZShcIi4vYWN0aW9uLWRyb3Bkb3duXCIpO1xuY29uc3QgZ2VuZXJhdGVUYWJsZVJvdyA9ICh7IGluc3RhbmNlLCBvblN0YXJ0Q2xpY2ssIG9uU3RvcENsaWNrLCBvblJlc3RhcnRDbGljaywgb25EZXN0cm95Q2xpY2ssIH0pID0+IHtcbiAgICBjb25zdCAkdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAgY29uc3QgJHN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAkc3RhdHVzLnRleHRDb250ZW50ID0gaW5zdGFuY2Uuc3RhdHVzO1xuICAgIGNvbnN0ICRpbnN0YW5jZU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgJGluc3RhbmNlTmFtZS50ZXh0Q29udGVudCA9IGluc3RhbmNlLm5hbWU7XG4gICAgY29uc3QgJGFkZHJlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgY29uc3QgJGFkZHJlc3NMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICRhZGRyZXNzTGlzdC5jbGFzc0xpc3QuYWRkKFwibGlzdC11bnN0eWxlZFwiLCBcIm1iLTBcIik7XG4gICAgZm9yIChjb25zdCBhZGRyZXNzIG9mIGluc3RhbmNlLmFkZHJlc3Nlcykge1xuICAgICAgICBjb25zdCAkbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICRsaS50ZXh0Q29udGVudCA9IGFkZHJlc3MuYWRkcmVzcyArIFwiL1wiICsgYWRkcmVzcy5uZXRtYXNrO1xuICAgICAgICAkYWRkcmVzc0xpc3QuYXBwZW5kKCRsaSk7XG4gICAgfVxuICAgICRhZGRyZXNzLmFwcGVuZCgkYWRkcmVzc0xpc3QpO1xuICAgIGNvbnN0ICRob3N0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAkaG9zdE5hbWUudGV4dENvbnRlbnQgPSBpbnN0YW5jZS5ob3N0O1xuICAgIGNvbnN0ICRhY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICRhY3Rpb25zLmNsYXNzTGlzdC5hZGQoXCJ0ZXh0LWVuZFwiKTtcbiAgICBjb25zdCAkZHJvcGRvd24gPSAoMCwgYWN0aW9uX2Ryb3Bkb3duXzEuZ2VuZXJhdGVBY3Rpb25Ecm9wZG93bikoe1xuICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgb25TdGFydENsaWNrOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIG9uU3RhcnRDbGljaz8uKGV2ZW50LCBpbnN0YW5jZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3RvcENsaWNrOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIG9uU3RvcENsaWNrPy4oZXZlbnQsIGluc3RhbmNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZXN0YXJ0Q2xpY2s6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgb25SZXN0YXJ0Q2xpY2s/LihldmVudCwgaW5zdGFuY2UpO1xuICAgICAgICB9LFxuICAgICAgICBvbkRlc3Ryb3lDbGljazogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBvbkRlc3Ryb3lDbGljaz8uKGV2ZW50LCBpbnN0YW5jZSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgJGFjdGlvbnMuYXBwZW5kKCRkcm9wZG93bik7XG4gICAgJHRyLmFwcGVuZCgkc3RhdHVzLCAkaW5zdGFuY2VOYW1lLCAkYWRkcmVzcywgJGhvc3ROYW1lLCAkYWN0aW9ucyk7XG4gICAgcmV0dXJuICR0cjtcbn07XG5leHBvcnRzLmdlbmVyYXRlVGFibGVSb3cgPSBnZW5lcmF0ZVRhYmxlUm93O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdlbmVyYXRlVGFibGVSb3dzID0gdm9pZCAwO1xuY29uc3QgdGFibGVfcm93XzEgPSByZXF1aXJlKFwiLi90YWJsZS1yb3dcIik7XG5mdW5jdGlvbiogZ2VuZXJhdGVUYWJsZVJvd3MoeyBob3N0cywgb25TdGFydENsaWNrLCBvblN0b3BDbGljaywgb25SZXN0YXJ0Q2xpY2ssIG9uRGVzdHJveUNsaWNrLCB9KSB7XG4gICAgZm9yIChjb25zdCBob3N0IG9mIGhvc3RzKSB7XG4gICAgICAgIGZvciAoY29uc3QgaW5zdGFuY2Ugb2YgaG9zdC5pbnN0YW5jZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZsYXRJbnN0YW5jZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5pbnN0YW5jZSxcbiAgICAgICAgICAgICAgICBob3N0OiBob3N0Lm5hbWUsXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0OiBob3N0LnVwZGF0ZWRBdCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB5aWVsZCAoMCwgdGFibGVfcm93XzEuZ2VuZXJhdGVUYWJsZVJvdykoe1xuICAgICAgICAgICAgICAgIGluc3RhbmNlOiBmbGF0SW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgb25TdGFydENsaWNrLFxuICAgICAgICAgICAgICAgIG9uU3RvcENsaWNrLFxuICAgICAgICAgICAgICAgIG9uUmVzdGFydENsaWNrLFxuICAgICAgICAgICAgICAgIG9uRGVzdHJveUNsaWNrLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmdlbmVyYXRlVGFibGVSb3dzID0gZ2VuZXJhdGVUYWJsZVJvd3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0ID0gKHRoaXMgJiYgdGhpcy5fX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KSB8fCBmdW5jdGlvbiAocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn07XG52YXIgX19jbGFzc1ByaXZhdGVGaWVsZEdldCA9ICh0aGlzICYmIHRoaXMuX19jbGFzc1ByaXZhdGVGaWVsZEdldCkgfHwgZnVuY3Rpb24gKHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufTtcbnZhciBfQ29udHJvbFBsYW5lQ2xpZW50X2luc3RhbmNlcywgX0NvbnRyb2xQbGFuZUNsaWVudF9zb2NrZXQsIF9Db250cm9sUGxhbmVDbGllbnRfb25DbG9zZSwgX0NvbnRyb2xQbGFuZUNsaWVudF9vbkVycm9yLCBfQ29udHJvbFBsYW5lQ2xpZW50X29uTWVzc2FnZSwgX0NvbnRyb2xQbGFuZUNsaWVudF9vbk9wZW47XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNvbnRyb2xQbGFuZUNsaWVudCA9IHZvaWQgMDtcbmNvbnN0IHN0cmljdGx5X3R5cGVkX2V2ZW50X3RhcmdldF8xID0gcmVxdWlyZShcIkBtaXpkcmEvc3RyaWN0bHktdHlwZWQtZXZlbnQtdGFyZ2V0XCIpO1xuY29uc3QgW0NvbnRyb2xQbGFuZUV2ZW50LCBDb250cm9sUGxhbmVFdmVudFRhcmdldF0gPSAoMCwgc3RyaWN0bHlfdHlwZWRfZXZlbnRfdGFyZ2V0XzEuY3JlYXRlU1RFdmVudFRhcmdldCkoKTtcbmNsYXNzIENvbnRyb2xQbGFuZUNsaWVudCBleHRlbmRzIENvbnRyb2xQbGFuZUV2ZW50VGFyZ2V0IHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIHByb3RvY29scykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBfQ29udHJvbFBsYW5lQ2xpZW50X2luc3RhbmNlcy5hZGQodGhpcyk7XG4gICAgICAgIF9Db250cm9sUGxhbmVDbGllbnRfc29ja2V0LnNldCh0aGlzLCB2b2lkIDApO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHRoaXMsIF9Db250cm9sUGxhbmVDbGllbnRfc29ja2V0LCBuZXcgV2ViU29ja2V0KHVybCwgcHJvdG9jb2xzKSwgXCJmXCIpO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db250cm9sUGxhbmVDbGllbnRfc29ja2V0LCBcImZcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRyb2xQbGFuZUNsaWVudF9pbnN0YW5jZXMsIFwibVwiLCBfQ29udHJvbFBsYW5lQ2xpZW50X29uQ2xvc2UpLmJpbmQodGhpcykpO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db250cm9sUGxhbmVDbGllbnRfc29ja2V0LCBcImZcIikuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRyb2xQbGFuZUNsaWVudF9pbnN0YW5jZXMsIFwibVwiLCBfQ29udHJvbFBsYW5lQ2xpZW50X29uRXJyb3IpLmJpbmQodGhpcykpO1xuICAgICAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db250cm9sUGxhbmVDbGllbnRfc29ja2V0LCBcImZcIikuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfQ29udHJvbFBsYW5lQ2xpZW50X2luc3RhbmNlcywgXCJtXCIsIF9Db250cm9sUGxhbmVDbGllbnRfb25NZXNzYWdlKS5iaW5kKHRoaXMpKTtcbiAgICAgICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfQ29udHJvbFBsYW5lQ2xpZW50X3NvY2tldCwgXCJmXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsIF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0NvbnRyb2xQbGFuZUNsaWVudF9pbnN0YW5jZXMsIFwibVwiLCBfQ29udHJvbFBsYW5lQ2xpZW50X29uT3BlbikuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHNlbmQobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gX19jbGFzc1ByaXZhdGVGaWVsZEdldCh0aGlzLCBfQ29udHJvbFBsYW5lQ2xpZW50X3NvY2tldCwgXCJmXCIpPy5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICB9XG4gICAgZ2V0IHJlYWR5U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9Db250cm9sUGxhbmVDbGllbnRfc29ja2V0LCBcImZcIikucmVhZHlTdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzLkNvbnRyb2xQbGFuZUNsaWVudCA9IENvbnRyb2xQbGFuZUNsaWVudDtcbl9Db250cm9sUGxhbmVDbGllbnRfc29ja2V0ID0gbmV3IFdlYWtNYXAoKSwgX0NvbnRyb2xQbGFuZUNsaWVudF9pbnN0YW5jZXMgPSBuZXcgV2Vha1NldCgpLCBfQ29udHJvbFBsYW5lQ2xpZW50X29uQ2xvc2UgPSBmdW5jdGlvbiBfQ29udHJvbFBsYW5lQ2xpZW50X29uQ2xvc2UoZXZlbnQpIHtcbiAgICBjb25zdCBjdXN0b21DbG9zZUV2ZW50ID0gbmV3IENvbnRyb2xQbGFuZUV2ZW50KFwiY2xvc2VcIiwge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgIGNvZGU6IGV2ZW50LmNvZGUsXG4gICAgICAgICAgICByZWFzb246IGV2ZW50LnJlYXNvbixcbiAgICAgICAgICAgIHdhc0NsZWFuOiBldmVudC53YXNDbGVhbixcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3VzdG9tQ2xvc2VFdmVudCk7XG59LCBfQ29udHJvbFBsYW5lQ2xpZW50X29uRXJyb3IgPSBmdW5jdGlvbiBfQ29udHJvbFBsYW5lQ2xpZW50X29uRXJyb3IoZXZlbnQpIHtcbiAgICBjb25zdCBjdXN0b21FcnJvckV2ZW50ID0gbmV3IENvbnRyb2xQbGFuZUV2ZW50KFwiZXJyb3JcIik7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGN1c3RvbUVycm9yRXZlbnQpO1xufSwgX0NvbnRyb2xQbGFuZUNsaWVudF9vbk1lc3NhZ2UgPSBmdW5jdGlvbiBfQ29udHJvbFBsYW5lQ2xpZW50X29uTWVzc2FnZShldmVudCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgIGNvbnN0IGN1c3RvbU1lc3NhZ2VFdmVudCA9IG5ldyBDb250cm9sUGxhbmVFdmVudChcIm1lc3NhZ2VcIiwge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgIGRhdGE6IG1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGN1c3RvbU1lc3NhZ2VFdmVudCk7XG59LCBfQ29udHJvbFBsYW5lQ2xpZW50X29uT3BlbiA9IGZ1bmN0aW9uIF9Db250cm9sUGxhbmVDbGllbnRfb25PcGVuKGV2ZW50KSB7XG4gICAgY29uc3QgY3VzdG9tT3BlbkV2ZW50ID0gbmV3IENvbnRyb2xQbGFuZUV2ZW50KFwib3BlblwiKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3VzdG9tT3BlbkV2ZW50KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG9uX2NoYW5nZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJvbi1jaGFuZ2VcIikpO1xuY29uc3QgY3JlYXRlX2Zvcm1fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY3JlYXRlLWZvcm1cIik7XG5jb25zdCB0YWJsZV9yb3dzXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3RhYmxlLXJvd3NcIik7XG5jb25zdCBjb250cm9sX3BsYW5lX2NsaWVudF8xID0gcmVxdWlyZShcIi4vY29udHJvbC1wbGFuZS1jbGllbnRcIik7XG5jb25zdCBRVUVSWV9JTlRFUlZBTF9TRUMgPSA2MDtcbmNvbnN0IElOSVRJQUxfSE9TVCA9IFtdO1xuY29uc3QgJGFwcFJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKTtcbmNvbnN0ICRjb25uZWN0aW9uU3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0aW9uLXN0YXR1c1wiKTtcbmNvbnN0ICRpbnN0YW5jZVRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnN0YW5jZS10YWJsZVwiKTtcbmNvbnN0ICRyZWxvYWRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbG9hZC1idXR0b25cIik7XG5jb25zdCAkY3JlYXRlRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlLWZvcm1cIik7XG5pZiAoJGNyZWF0ZUZvcm0gPT09IG51bGwgfHwgISgkY3JlYXRlRm9ybSBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gaW5pdGlhbGl6ZVwiKTtcbn1cbmNvbnN0ICRob3N0U2VsZWN0ID0gJGNyZWF0ZUZvcm0uZWxlbWVudHMubmFtZWRJdGVtKFwiaG9zdFwiKTtcbmNvbnN0ICRvc1NlbGVjdCA9ICRjcmVhdGVGb3JtLmVsZW1lbnRzLm5hbWVkSXRlbShcIm9zXCIpO1xuaWYgKCRhcHBSb290ID09PSBudWxsIHx8XG4gICAgJGNvbm5lY3Rpb25TdGF0dXMgPT09IG51bGwgfHxcbiAgICAkaW5zdGFuY2VUYWJsZSA9PT0gbnVsbCB8fFxuICAgICEoJGluc3RhbmNlVGFibGUgaW5zdGFuY2VvZiBIVE1MVGFibGVFbGVtZW50KSB8fFxuICAgICRyZWxvYWRCdXR0b24gPT09IG51bGwgfHxcbiAgICAhKCRyZWxvYWRCdXR0b24gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkgfHxcbiAgICAkaG9zdFNlbGVjdCA9PT0gbnVsbCB8fFxuICAgICEoJGhvc3RTZWxlY3QgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkgfHxcbiAgICAkb3NTZWxlY3QgPT09IG51bGwgfHxcbiAgICAhKCRvc1NlbGVjdCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBpbml0aWFsaXplXCIpO1xufVxuLy8g54q25oWLXG5jb25zdCBob3N0cyA9ICgwLCBvbl9jaGFuZ2VfMS5kZWZhdWx0KShJTklUSUFMX0hPU1QsIGZ1bmN0aW9uICgpIHtcbiAgICByZW5kZXJUYWJsZUJvZHkoJGluc3RhbmNlVGFibGUudEJvZGllc1swXSwgdGhpcyk7XG4gICAgcmVuZGVySG9zdFNlbGVjdGlvbigkaG9zdFNlbGVjdCwgdGhpcyk7XG59KTtcbmNvbnN0IGNvbm5lY3Rpb25TdGF0dXMgPSAoMCwgb25fY2hhbmdlXzEuZGVmYXVsdCkoeyBzdGF0ZTogV2ViU29ja2V0LkNMT1NFRCB9LCBmdW5jdGlvbiAoKSB7XG4gICAgcmVuZGVyQ29ubmVjdGlvblN0YXR1cygkY29ubmVjdGlvblN0YXR1cywgdGhpcy5zdGF0ZSk7XG4gICAgJHJlbG9hZEJ1dHRvbi5kaXNhYmxlZCA9IHRoaXMuc3RhdGUgIT09IFdlYlNvY2tldC5PUEVOO1xufSk7XG5jb25zdCBzZWxlY3RlZEhvc3RuYW1lID0gKDAsIG9uX2NoYW5nZV8xLmRlZmF1bHQpKHsgdmFsdWU6ICRob3N0U2VsZWN0LnZhbHVlIH0sIGZ1bmN0aW9uICgpIHtcbiAgICByZW5kZXJPc1NlbGVjdGlvbigkb3NTZWxlY3QsIHRoaXMudmFsdWUpO1xufSk7XG5sZXQgbGFzdFF1ZXJ5SG9zdERhdGU7XG5jb25zdCBDT05ORUNUSU9OX01FU1NBR0VfTUFQID0ge1xuICAgIDA6IFwi5o6l57aa6Kmm6KGM5LitXCIsXG4gICAgMTogXCLmjqXntprlrozkuoZcIixcbiAgICAyOiBcIuWIh+aWreS4rVwiLFxuICAgIDM6IFwi5YiH5patXCIsXG59O1xuY29uc3QgcmVuZGVyQ29ubmVjdGlvblN0YXR1cyA9ICgkcm9vdCwgc3RhdGUpID0+IHtcbiAgICAkcm9vdC50ZXh0Q29udGVudCA9IENPTk5FQ1RJT05fTUVTU0FHRV9NQVBbc3RhdGVdO1xufTtcbmNvbnN0IHJlbmRlclRhYmxlQm9keSA9ICgkdGJvZHksIGhvc3RzKSA9PiB7XG4gICAgY29uc3Qgcm93cyA9ICgwLCB0YWJsZV9yb3dzXzEuZ2VuZXJhdGVUYWJsZVJvd3MpKHtcbiAgICAgICAgaG9zdHMsXG4gICAgICAgIG9uU3RhcnRDbGljayhfLCBpbnN0YW5jZSkge1xuICAgICAgICAgICAgY2xpZW50LnNlbmQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiQ09NTUFORF9TVEFSVFwiLFxuICAgICAgICAgICAgICAgIGhvc3Q6IGluc3RhbmNlLmhvc3QsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlLm5hbWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TdG9wQ2xpY2soXywgaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGNsaWVudC5zZW5kKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkNPTU1BTkRfU1RPUFwiLFxuICAgICAgICAgICAgICAgIGhvc3Q6IGluc3RhbmNlLmhvc3QsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlLm5hbWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZXN0YXJ0Q2xpY2soXywgaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGNsaWVudC5zZW5kKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkNPTU1BTkRfUkVTVEFSVFwiLFxuICAgICAgICAgICAgICAgIGhvc3Q6IGluc3RhbmNlLmhvc3QsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlLm5hbWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EZXN0cm95Q2xpY2soXywgaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGNsaWVudC5zZW5kKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkNPTU1BTkRfREVTVFJPWVwiLFxuICAgICAgICAgICAgICAgIGhvc3Q6IGluc3RhbmNlLmhvc3QsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlLm5hbWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICAkdGJvZHkucmVwbGFjZUNoaWxkcmVuKC4uLnJvd3MpO1xufTtcbmNvbnN0IHJlbmRlckhvc3RTZWxlY3Rpb24gPSAoJHNlbGVjdCwgaG9zdHMpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gKDAsIGNyZWF0ZV9mb3JtXzEuZ2VuZXJhdGVIb3N0T3B0aW9ucykoaG9zdHMpO1xuICAgICRzZWxlY3QucmVwbGFjZUNoaWxkcmVuKC4uLm9wdGlvbnMpO1xuICAgIHNlbGVjdGVkSG9zdG5hbWUudmFsdWUgPSAkc2VsZWN0LnZhbHVlO1xufTtcbmNvbnN0IHJlbmRlck9zU2VsZWN0aW9uID0gKCRzZWxlY3QsIGhvc3RuYW1lKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRIb3N0ID0gaG9zdHMuZmluZCgoaG9zdCkgPT4gaG9zdC5uYW1lID09PSBob3N0bmFtZSk7XG4gICAgaWYgKHNlbGVjdGVkSG9zdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICRzZWxlY3QucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9ucyA9ICgwLCBjcmVhdGVfZm9ybV8xLmdlbmVyYXRlT3NPcHRpb25zKShzZWxlY3RlZEhvc3QuaW1hZ2VzKTtcbiAgICAkc2VsZWN0LnJlcGxhY2VDaGlsZHJlbiguLi5vcHRpb25zKTtcbn07XG4kcmVsb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2xpZW50LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIlFVRVJZX0hPU1RcIixcbiAgICB9KTtcbn0pO1xuY29uc3QgdXJsID0gcHJvbXB0KFwiRW50ZXIgdGhlIGNvbnRyb2wgcGxhbmUgVVJJXCIpO1xuaWYgKHVybCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVSTCB3YXMgbm90IHByb3ZpZGVkXCIpO1xufVxuY29uc3QgdG9rZW4gPSBwcm9tcHQoXCJFbnRlciB0b2tlblwiKTtcbmlmICh0b2tlbiA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRva2VuIHdhcyBub3QgcHJvdmlkZWRcIik7XG59XG5jb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICB0OiB0b2tlbixcbn0pO1xuY29uc3QgY2xpZW50ID0gbmV3IGNvbnRyb2xfcGxhbmVfY2xpZW50XzEuQ29udHJvbFBsYW5lQ2xpZW50KHVybCArIFwiP1wiICsgcGFyYW1zLnRvU3RyaW5nKCkpO1xuY29ubmVjdGlvblN0YXR1cy5zdGF0ZSA9IGNsaWVudC5yZWFkeVN0YXRlO1xubGV0IGludGVydmFsUXVlcnlJZDtcbiRob3N0U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4ge1xuICAgIHNlbGVjdGVkSG9zdG5hbWUudmFsdWUgPSAkaG9zdFNlbGVjdC52YWx1ZTtcbn0pO1xuJGNyZWF0ZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBob3N0bmFtZSA9ICRjcmVhdGVGb3JtLmVsZW1lbnRzLm5hbWVkSXRlbShcImhvc3RcIikudmFsdWU7XG4gICAgY29uc3Qgb3MgPSAkY3JlYXRlRm9ybS5lbGVtZW50cy5uYW1lZEl0ZW0oXCJvc1wiKS52YWx1ZTtcbiAgICBjb25zdCBuYW1lID0gJGNyZWF0ZUZvcm0uZWxlbWVudHMubmFtZWRJdGVtKFwibmFtZVwiKVxuICAgICAgICAudmFsdWU7XG4gICAgY29uc3QgdXNlcm5hbWUgPSAkY3JlYXRlRm9ybS5lbGVtZW50cy5uYW1lZEl0ZW0oXCJ1c2VybmFtZVwiKS52YWx1ZTtcbiAgICBjb25zdCBwYXNzd29yZCA9ICRjcmVhdGVGb3JtLmVsZW1lbnRzLm5hbWVkSXRlbShcInBhc3N3b3JkXCIpLnZhbHVlO1xuICAgIGNsaWVudC5zZW5kKHtcbiAgICAgICAgdHlwZTogXCJDT01NQU5EX0NSRUFURVwiLFxuICAgICAgICBob3N0OiBob3N0bmFtZSxcbiAgICAgICAgYWxpYXM6IG9zLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICB1c2VyOiB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgIH0pO1xufSk7XG5jbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJNRVNTQUdFIFJFQ0lFVkVEXCIpO1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LmRldGFpbCk7XG4gICAgY29uc3QgbWVzc2FnZSA9IGV2ZW50LmRldGFpbC5kYXRhO1xuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiUVVFUllfSE9TVFwiKSB7XG4gICAgICAgIGxhc3RRdWVyeUhvc3REYXRlID0gbmV3IERhdGUoKTtcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJBRFZFUlRJU0VfSE9TVFwiKSB7XG4gICAgICAgIGNvbnN0IGkgPSBob3N0cy5maW5kSW5kZXgoKGhvc3QpID0+IGhvc3QubmFtZSA9PT0gbWVzc2FnZS5ob3N0KTtcbiAgICAgICAgY29uc3QgaG9zdCA9IHtcbiAgICAgICAgICAgIG5hbWU6IG1lc3NhZ2UuaG9zdCxcbiAgICAgICAgICAgIGltYWdlczogbWVzc2FnZS5pbWFnZXMsXG4gICAgICAgICAgICBpbnN0YW5jZXM6IG1lc3NhZ2UuaW5zdGFuY2VzLFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoaSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGhvc3RzLnB1c2goaG9zdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBob3N0c1tpXSA9IGhvc3Q7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmNsaWVudC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCAoZXZlbnQpID0+IHtcbiAgICBjb25uZWN0aW9uU3RhdHVzLnN0YXRlID0gY2xpZW50LnJlYWR5U3RhdGU7XG4gICAgY2xpZW50LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIlFVRVJZX0hPU1RcIixcbiAgICB9KTtcbiAgICBpbnRlcnZhbFF1ZXJ5SWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIumdnuOCouOCr+ODhuOCo+ODluevgOe0hFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFF1ZXJ5SG9zdERhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRpZmZNcyA9IERhdGUubm93KCkgLSBsYXN0UXVlcnlIb3N0RGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIGlmIChkaWZmTXMgLyAxMDAwIDwgUVVFUllfSU5URVJWQUxfU0VDIC8gMikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLpoLvlm57nr4DntIRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2xpZW50LnNlbmQoe1xuICAgICAgICAgICAgdHlwZTogXCJRVUVSWV9IT1NUXCIsXG4gICAgICAgIH0pO1xuICAgIH0sIFFVRVJZX0lOVEVSVkFMX1NFQyAqIDEwMDApO1xufSk7XG5jbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIChldmVudCkgPT4ge1xuICAgIGNvbm5lY3Rpb25TdGF0dXMuc3RhdGUgPSBjbGllbnQucmVhZHlTdGF0ZTtcbiAgICBjb25zb2xlLmxvZyhldmVudC5kZXRhaWwpO1xuICAgIGlmIChpbnRlcnZhbFF1ZXJ5SWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsUXVlcnlJZCk7XG4gICAgfVxufSk7XG5jbGllbnQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIChldmVudCkgPT4ge1xuICAgIGNvbm5lY3Rpb25TdGF0dXMuc3RhdGUgPSBjbGllbnQucmVhZHlTdGF0ZTtcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XG59KTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHVuaWNvcm4vcHJlZmVyLXNwcmVhZCAqL1xuaW1wb3J0IHtUQVJHRVQsIFVOU1VCU0NSSUJFfSBmcm9tICcuL2xpYi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHtpc0J1aWx0aW5XaXRoTXV0YWJsZU1ldGhvZHMsIGlzQnVpbHRpbldpdGhvdXRNdXRhYmxlTWV0aG9kc30gZnJvbSAnLi9saWIvaXMtYnVpbHRpbi5qcyc7XG5pbXBvcnQgcGF0aCBmcm9tICcuL2xpYi9wYXRoLmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2xpYi9pcy1zeW1ib2wuanMnO1xuaW1wb3J0IGlzSXRlcmF0b3IgZnJvbSAnLi9saWIvaXMtaXRlcmF0b3IuanMnO1xuaW1wb3J0IHdyYXBJdGVyYXRvciBmcm9tICcuL2xpYi93cmFwLWl0ZXJhdG9yLmpzJztcbmltcG9ydCBpZ25vcmVQcm9wZXJ0eSBmcm9tICcuL2xpYi9pZ25vcmUtcHJvcGVydHkuanMnO1xuaW1wb3J0IENhY2hlIGZyb20gJy4vbGliL2NhY2hlLmpzJztcbmltcG9ydCBTbWFydENsb25lIGZyb20gJy4vbGliL3NtYXJ0LWNsb25lL3NtYXJ0LWNsb25lLmpzJztcblxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG5cdGVxdWFsczogT2JqZWN0LmlzLFxuXHRpc1NoYWxsb3c6IGZhbHNlLFxuXHRwYXRoQXNBcnJheTogZmFsc2UsXG5cdGlnbm9yZVN5bWJvbHM6IGZhbHNlLFxuXHRpZ25vcmVVbmRlcnNjb3JlczogZmFsc2UsXG5cdGlnbm9yZURldGFjaGVkOiBmYWxzZSxcblx0ZGV0YWlsczogZmFsc2UsXG59O1xuXG5jb25zdCBvbkNoYW5nZSA9IChvYmplY3QsIG9uQ2hhbmdlLCBvcHRpb25zID0ge30pID0+IHtcblx0b3B0aW9ucyA9IHtcblx0XHQuLi5kZWZhdWx0T3B0aW9ucyxcblx0XHQuLi5vcHRpb25zLFxuXHR9O1xuXG5cdGNvbnN0IHByb3h5VGFyZ2V0ID0gU3ltYm9sKCdQcm94eVRhcmdldCcpO1xuXHRjb25zdCB7ZXF1YWxzLCBpc1NoYWxsb3csIGlnbm9yZURldGFjaGVkLCBkZXRhaWxzfSA9IG9wdGlvbnM7XG5cdGNvbnN0IGNhY2hlID0gbmV3IENhY2hlKGVxdWFscyk7XG5cdGNvbnN0IGhhc09uVmFsaWRhdGUgPSB0eXBlb2Ygb3B0aW9ucy5vblZhbGlkYXRlID09PSAnZnVuY3Rpb24nO1xuXHRjb25zdCBzbWFydENsb25lID0gbmV3IFNtYXJ0Q2xvbmUoaGFzT25WYWxpZGF0ZSk7XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcblx0Y29uc3QgdmFsaWRhdGUgPSAodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIHByZXZpb3VzLCBhcHBseURhdGEpID0+ICFoYXNPblZhbGlkYXRlXG5cdFx0fHwgc21hcnRDbG9uZS5pc0Nsb25pbmdcblx0XHR8fCBvcHRpb25zLm9uVmFsaWRhdGUocGF0aC5jb25jYXQoY2FjaGUuZ2V0UGF0aCh0YXJnZXQpLCBwcm9wZXJ0eSksIHZhbHVlLCBwcmV2aW91cywgYXBwbHlEYXRhKSA9PT0gdHJ1ZTtcblxuXHRjb25zdCBoYW5kbGVDaGFuZ2VPblRhcmdldCA9ICh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgcHJldmlvdXMpID0+IHtcblx0XHRpZiAoXG5cdFx0XHQhaWdub3JlUHJvcGVydHkoY2FjaGUsIG9wdGlvbnMsIHByb3BlcnR5KVxuXHRcdFx0JiYgIShpZ25vcmVEZXRhY2hlZCAmJiBjYWNoZS5pc0RldGFjaGVkKHRhcmdldCwgb2JqZWN0KSlcblx0XHQpIHtcblx0XHRcdGhhbmRsZUNoYW5nZShjYWNoZS5nZXRQYXRoKHRhcmdldCksIHByb3BlcnR5LCB2YWx1ZSwgcHJldmlvdXMpO1xuXHRcdH1cblx0fTtcblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xuXHRjb25zdCBoYW5kbGVDaGFuZ2UgPSAoY2hhbmdlUGF0aCwgcHJvcGVydHksIHZhbHVlLCBwcmV2aW91cywgYXBwbHlEYXRhKSA9PiB7XG5cdFx0aWYgKHNtYXJ0Q2xvbmUuaXNDbG9uaW5nKSB7XG5cdFx0XHRzbWFydENsb25lLnVwZGF0ZShjaGFuZ2VQYXRoLCBwcm9wZXJ0eSwgcHJldmlvdXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvbkNoYW5nZShwYXRoLmNvbmNhdChjaGFuZ2VQYXRoLCBwcm9wZXJ0eSksIHZhbHVlLCBwcmV2aW91cywgYXBwbHlEYXRhKTtcblx0XHR9XG5cdH07XG5cblx0Y29uc3QgZ2V0UHJveHlUYXJnZXQgPSB2YWx1ZSA9PiB2YWx1ZVxuXHRcdD8gKHZhbHVlW3Byb3h5VGFyZ2V0XSB8fCB2YWx1ZSlcblx0XHQ6IHZhbHVlO1xuXG5cdGNvbnN0IHByZXBhcmVWYWx1ZSA9ICh2YWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eSwgYmFzZVBhdGgpID0+IHtcblx0XHRpZiAoXG5cdFx0XHRpc0J1aWx0aW5XaXRob3V0TXV0YWJsZU1ldGhvZHModmFsdWUpXG5cdFx0XHR8fCBwcm9wZXJ0eSA9PT0gJ2NvbnN0cnVjdG9yJ1xuXHRcdFx0fHwgKGlzU2hhbGxvdyAmJiAhU21hcnRDbG9uZS5pc0hhbmRsZWRNZXRob2QodGFyZ2V0LCBwcm9wZXJ0eSkpXG5cdFx0XHR8fCBpZ25vcmVQcm9wZXJ0eShjYWNoZSwgb3B0aW9ucywgcHJvcGVydHkpXG5cdFx0XHR8fCBjYWNoZS5pc0dldEludmFyaWFudCh0YXJnZXQsIHByb3BlcnR5KVxuXHRcdFx0fHwgKGlnbm9yZURldGFjaGVkICYmIGNhY2hlLmlzRGV0YWNoZWQodGFyZ2V0LCBvYmplY3QpKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblxuXHRcdGlmIChiYXNlUGF0aCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRiYXNlUGF0aCA9IGNhY2hlLmdldFBhdGgodGFyZ2V0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2FjaGUuZ2V0UHJveHkodmFsdWUsIHBhdGguY29uY2F0KGJhc2VQYXRoLCBwcm9wZXJ0eSksIGhhbmRsZXIsIHByb3h5VGFyZ2V0KTtcblx0fTtcblxuXHRjb25zdCBoYW5kbGVyID0ge1xuXHRcdGdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuXHRcdFx0aWYgKGlzU3ltYm9sKHByb3BlcnR5KSkge1xuXHRcdFx0XHRpZiAocHJvcGVydHkgPT09IHByb3h5VGFyZ2V0IHx8IHByb3BlcnR5ID09PSBUQVJHRVQpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHByb3BlcnR5ID09PSBVTlNVQlNDUklCRVxuXHRcdFx0XHRcdCYmICFjYWNoZS5pc1Vuc3Vic2NyaWJlZFxuXHRcdFx0XHRcdCYmIGNhY2hlLmdldFBhdGgodGFyZ2V0KS5sZW5ndGggPT09IDBcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y2FjaGUudW5zdWJzY3JpYmUoKTtcblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHZhbHVlID0gaXNCdWlsdGluV2l0aE11dGFibGVNZXRob2RzKHRhcmdldClcblx0XHRcdFx0PyBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5KVxuXHRcdFx0XHQ6IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcblxuXHRcdFx0cmV0dXJuIHByZXBhcmVWYWx1ZSh2YWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eSk7XG5cdFx0fSxcblxuXHRcdHNldCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgcmVjZWl2ZXIpIHtcblx0XHRcdHZhbHVlID0gZ2V0UHJveHlUYXJnZXQodmFsdWUpO1xuXG5cdFx0XHRjb25zdCByZWZsZWN0VGFyZ2V0ID0gdGFyZ2V0W3Byb3h5VGFyZ2V0XSB8fCB0YXJnZXQ7XG5cdFx0XHRjb25zdCBwcmV2aW91cyA9IHJlZmxlY3RUYXJnZXRbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoZXF1YWxzKHByZXZpb3VzLCB2YWx1ZSkgJiYgcHJvcGVydHkgaW4gdGFyZ2V0KSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBpc1ZhbGlkID0gdmFsaWRhdGUodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIHByZXZpb3VzKTtcblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRpc1ZhbGlkXG5cdFx0XHRcdCYmIGNhY2hlLnNldFByb3BlcnR5KHJlZmxlY3RUYXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgcmVjZWl2ZXIsIHByZXZpb3VzKVxuXHRcdFx0KSB7XG5cdFx0XHRcdGhhbmRsZUNoYW5nZU9uVGFyZ2V0KHRhcmdldCwgcHJvcGVydHksIHRhcmdldFtwcm9wZXJ0eV0sIHByZXZpb3VzKTtcblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICFpc1ZhbGlkO1xuXHRcdH0sXG5cblx0XHRkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCBkZXNjcmlwdG9yKSB7XG5cdFx0XHRpZiAoIWNhY2hlLmlzU2FtZURlc2NyaXB0b3IoZGVzY3JpcHRvciwgdGFyZ2V0LCBwcm9wZXJ0eSkpIHtcblx0XHRcdFx0Y29uc3QgcHJldmlvdXMgPSB0YXJnZXRbcHJvcGVydHldO1xuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWxpZGF0ZSh0YXJnZXQsIHByb3BlcnR5LCBkZXNjcmlwdG9yLnZhbHVlLCBwcmV2aW91cylcblx0XHRcdFx0XHQmJiBjYWNoZS5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCBkZXNjcmlwdG9yLCBwcmV2aW91cylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0aGFuZGxlQ2hhbmdlT25UYXJnZXQodGFyZ2V0LCBwcm9wZXJ0eSwgZGVzY3JpcHRvci52YWx1ZSwgcHJldmlvdXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5KSB7XG5cdFx0XHRpZiAoIVJlZmxlY3QuaGFzKHRhcmdldCwgcHJvcGVydHkpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBwcmV2aW91cyA9IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHkpO1xuXHRcdFx0Y29uc3QgaXNWYWxpZCA9IHZhbGlkYXRlKHRhcmdldCwgcHJvcGVydHksIHVuZGVmaW5lZCwgcHJldmlvdXMpO1xuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdGlzVmFsaWRcblx0XHRcdFx0JiYgY2FjaGUuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwgcHJldmlvdXMpXG5cdFx0XHQpIHtcblx0XHRcdFx0aGFuZGxlQ2hhbmdlT25UYXJnZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdW5kZWZpbmVkLCBwcmV2aW91cyk7XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAhaXNWYWxpZDtcblx0XHR9LFxuXG5cdFx0YXBwbHkodGFyZ2V0LCB0aGlzQXJnLCBhcmd1bWVudHNMaXN0KSB7XG5cdFx0XHRjb25zdCB0aGlzUHJveHlUYXJnZXQgPSB0aGlzQXJnW3Byb3h5VGFyZ2V0XSB8fCB0aGlzQXJnO1xuXG5cdFx0XHRpZiAoY2FjaGUuaXNVbnN1YnNjcmliZWQpIHtcblx0XHRcdFx0cmV0dXJuIFJlZmxlY3QuYXBwbHkodGFyZ2V0LCB0aGlzUHJveHlUYXJnZXQsIGFyZ3VtZW50c0xpc3QpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdChkZXRhaWxzID09PSBmYWxzZVxuXHRcdFx0XHRcdHx8IChkZXRhaWxzICE9PSB0cnVlICYmICFkZXRhaWxzLmluY2x1ZGVzKHRhcmdldC5uYW1lKSkpXG5cdFx0XHRcdCYmIFNtYXJ0Q2xvbmUuaXNIYW5kbGVkVHlwZSh0aGlzUHJveHlUYXJnZXQpXG5cdFx0XHQpIHtcblx0XHRcdFx0bGV0IGFwcGx5UGF0aCA9IHBhdGguaW5pdGlhbChjYWNoZS5nZXRQYXRoKHRhcmdldCkpO1xuXHRcdFx0XHRjb25zdCBpc0hhbmRsZWRNZXRob2QgPSBTbWFydENsb25lLmlzSGFuZGxlZE1ldGhvZCh0aGlzUHJveHlUYXJnZXQsIHRhcmdldC5uYW1lKTtcblxuXHRcdFx0XHRzbWFydENsb25lLnN0YXJ0KHRoaXNQcm94eVRhcmdldCwgYXBwbHlQYXRoLCBhcmd1bWVudHNMaXN0KTtcblxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gUmVmbGVjdC5hcHBseShcblx0XHRcdFx0XHR0YXJnZXQsXG5cdFx0XHRcdFx0c21hcnRDbG9uZS5wcmVmZXJyZWRUaGlzQXJnKHRhcmdldCwgdGhpc0FyZywgdGhpc1Byb3h5VGFyZ2V0KSxcblx0XHRcdFx0XHRpc0hhbmRsZWRNZXRob2Rcblx0XHRcdFx0XHRcdD8gYXJndW1lbnRzTGlzdC5tYXAoYXJndW1lbnQgPT4gZ2V0UHJveHlUYXJnZXQoYXJndW1lbnQpKVxuXHRcdFx0XHRcdFx0OiBhcmd1bWVudHNMaXN0LFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGNvbnN0IGlzQ2hhbmdlZCA9IHNtYXJ0Q2xvbmUuaXNDaGFuZ2VkKHRoaXNQcm94eVRhcmdldCwgZXF1YWxzKTtcblx0XHRcdFx0Y29uc3QgcHJldmlvdXMgPSBzbWFydENsb25lLnN0b3AoKTtcblxuXHRcdFx0XHRpZiAoU21hcnRDbG9uZS5pc0hhbmRsZWRUeXBlKHJlc3VsdCkgJiYgaXNIYW5kbGVkTWV0aG9kKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXNBcmcgaW5zdGFuY2VvZiBNYXAgJiYgdGFyZ2V0Lm5hbWUgPT09ICdnZXQnKSB7XG5cdFx0XHRcdFx0XHRhcHBseVBhdGggPSBwYXRoLmNvbmNhdChhcHBseVBhdGgsIGFyZ3VtZW50c0xpc3RbMF0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdCA9IGNhY2hlLmdldFByb3h5KHJlc3VsdCwgYXBwbHlQYXRoLCBoYW5kbGVyKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc0NoYW5nZWQpIHtcblx0XHRcdFx0XHRjb25zdCBhcHBseURhdGEgPSB7XG5cdFx0XHRcdFx0XHRuYW1lOiB0YXJnZXQubmFtZSxcblx0XHRcdFx0XHRcdGFyZ3M6IGFyZ3VtZW50c0xpc3QsXG5cdFx0XHRcdFx0XHRyZXN1bHQsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRjb25zdCBjaGFuZ2VQYXRoID0gc21hcnRDbG9uZS5pc0Nsb25pbmdcblx0XHRcdFx0XHRcdD8gcGF0aC5pbml0aWFsKGFwcGx5UGF0aClcblx0XHRcdFx0XHRcdDogYXBwbHlQYXRoO1xuXHRcdFx0XHRcdGNvbnN0IHByb3BlcnR5ID0gc21hcnRDbG9uZS5pc0Nsb25pbmdcblx0XHRcdFx0XHRcdD8gcGF0aC5sYXN0KGFwcGx5UGF0aClcblx0XHRcdFx0XHRcdDogJyc7XG5cblx0XHRcdFx0XHRpZiAodmFsaWRhdGUocGF0aC5nZXQob2JqZWN0LCBjaGFuZ2VQYXRoKSwgcHJvcGVydHksIHRoaXNQcm94eVRhcmdldCwgcHJldmlvdXMsIGFwcGx5RGF0YSkpIHtcblx0XHRcdFx0XHRcdGhhbmRsZUNoYW5nZShjaGFuZ2VQYXRoLCBwcm9wZXJ0eSwgdGhpc1Byb3h5VGFyZ2V0LCBwcmV2aW91cywgYXBwbHlEYXRhKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c21hcnRDbG9uZS51bmRvKHRoaXNQcm94eVRhcmdldCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdCh0aGlzQXJnIGluc3RhbmNlb2YgTWFwIHx8IHRoaXNBcmcgaW5zdGFuY2VvZiBTZXQpXG5cdFx0XHRcdFx0JiYgaXNJdGVyYXRvcihyZXN1bHQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiB3cmFwSXRlcmF0b3IocmVzdWx0LCB0YXJnZXQsIHRoaXNBcmcsIGFwcGx5UGF0aCwgcHJlcGFyZVZhbHVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBSZWZsZWN0LmFwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJndW1lbnRzTGlzdCk7XG5cdFx0fSxcblx0fTtcblxuXHRjb25zdCBwcm94eSA9IGNhY2hlLmdldFByb3h5KG9iamVjdCwgb3B0aW9ucy5wYXRoQXNBcnJheSA/IFtdIDogJycsIGhhbmRsZXIpO1xuXHRvbkNoYW5nZSA9IG9uQ2hhbmdlLmJpbmQocHJveHkpO1xuXG5cdGlmIChoYXNPblZhbGlkYXRlKSB7XG5cdFx0b3B0aW9ucy5vblZhbGlkYXRlID0gb3B0aW9ucy5vblZhbGlkYXRlLmJpbmQocHJveHkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHVuaWNvcm4vcHJlZmVyLXByb3RvdHlwZS1tZXRob2RzXG5cdH1cblxuXHRyZXR1cm4gcHJveHk7XG59O1xuXG5vbkNoYW5nZS50YXJnZXQgPSBwcm94eSA9PiAocHJveHkgJiYgcHJveHlbVEFSR0VUXSkgfHwgcHJveHk7XG5vbkNoYW5nZS51bnN1YnNjcmliZSA9IHByb3h5ID0+IHByb3h5W1VOU1VCU0NSSUJFXSB8fCBwcm94eTtcblxuZXhwb3J0IGRlZmF1bHQgb25DaGFuZ2U7XG4iLCJpbXBvcnQgcGF0aCBmcm9tICcuL3BhdGguanMnO1xuXG4vKipcbkBjbGFzcyBDYWNoZVxuQHByaXZhdGVcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWNoZSB7XG5cdGNvbnN0cnVjdG9yKGVxdWFscykge1xuXHRcdHRoaXMuX2VxdWFscyA9IGVxdWFscztcblx0XHR0aGlzLl9wcm94eUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblx0XHR0aGlzLl9wYXRoQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXHRcdHRoaXMuaXNVbnN1YnNjcmliZWQgPSBmYWxzZTtcblx0fVxuXG5cdF9nZXREZXNjcmlwdG9yQ2FjaGUoKSB7XG5cdFx0aWYgKHRoaXMuX2Rlc2NyaXB0b3JDYWNoZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9kZXNjcmlwdG9yQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9kZXNjcmlwdG9yQ2FjaGU7XG5cdH1cblxuXHRfZ2V0UHJvcGVydGllcyh0YXJnZXQpIHtcblx0XHRjb25zdCBkZXNjcmlwdG9yQ2FjaGUgPSB0aGlzLl9nZXREZXNjcmlwdG9yQ2FjaGUoKTtcblx0XHRsZXQgcHJvcGVydGllcyA9IGRlc2NyaXB0b3JDYWNoZS5nZXQodGFyZ2V0KTtcblxuXHRcdGlmIChwcm9wZXJ0aWVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHByb3BlcnRpZXMgPSB7fTtcblx0XHRcdGRlc2NyaXB0b3JDYWNoZS5zZXQodGFyZ2V0LCBwcm9wZXJ0aWVzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvcGVydGllcztcblx0fVxuXG5cdF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eSkge1xuXHRcdGlmICh0aGlzLmlzVW5zdWJzY3JpYmVkKSB7XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcHJvcGVydGllcyA9IHRoaXMuX2dldFByb3BlcnRpZXModGFyZ2V0KTtcblx0XHRsZXQgZGVzY3JpcHRvciA9IHByb3BlcnRpZXNbcHJvcGVydHldO1xuXG5cdFx0aWYgKGRlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0ZGVzY3JpcHRvciA9IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHkpO1xuXHRcdFx0cHJvcGVydGllc1twcm9wZXJ0eV0gPSBkZXNjcmlwdG9yO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZXNjcmlwdG9yO1xuXHR9XG5cblx0Z2V0UHJveHkodGFyZ2V0LCBwYXRoLCBoYW5kbGVyLCBwcm94eVRhcmdldCkge1xuXHRcdGlmICh0aGlzLmlzVW5zdWJzY3JpYmVkKSB7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlZmxlY3RUYXJnZXQgPSB0YXJnZXRbcHJveHlUYXJnZXRdO1xuXHRcdGNvbnN0IHNvdXJjZSA9IHJlZmxlY3RUYXJnZXQgfHwgdGFyZ2V0O1xuXG5cdFx0dGhpcy5fcGF0aENhY2hlLnNldChzb3VyY2UsIHBhdGgpO1xuXG5cdFx0bGV0IHByb3h5ID0gdGhpcy5fcHJveHlDYWNoZS5nZXQoc291cmNlKTtcblxuXHRcdGlmIChwcm94eSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwcm94eSA9IHJlZmxlY3RUYXJnZXQgPT09IHVuZGVmaW5lZFxuXHRcdFx0XHQ/IG5ldyBQcm94eSh0YXJnZXQsIGhhbmRsZXIpXG5cdFx0XHRcdDogdGFyZ2V0O1xuXG5cdFx0XHR0aGlzLl9wcm94eUNhY2hlLnNldChzb3VyY2UsIHByb3h5KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJveHk7XG5cdH1cblxuXHRnZXRQYXRoKHRhcmdldCkge1xuXHRcdHJldHVybiB0aGlzLmlzVW5zdWJzY3JpYmVkID8gdW5kZWZpbmVkIDogdGhpcy5fcGF0aENhY2hlLmdldCh0YXJnZXQpO1xuXHR9XG5cblx0aXNEZXRhY2hlZCh0YXJnZXQsIG9iamVjdCkge1xuXHRcdHJldHVybiAhT2JqZWN0LmlzKHRhcmdldCwgcGF0aC5nZXQob2JqZWN0LCB0aGlzLmdldFBhdGgodGFyZ2V0KSkpO1xuXHR9XG5cblx0ZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwgZGVzY3JpcHRvcikge1xuXHRcdGlmICghUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCBkZXNjcmlwdG9yKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5pc1Vuc3Vic2NyaWJlZCkge1xuXHRcdFx0dGhpcy5fZ2V0UHJvcGVydGllcyh0YXJnZXQpW3Byb3BlcnR5XSA9IGRlc2NyaXB0b3I7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRzZXRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgcmVjZWl2ZXIsIHByZXZpb3VzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbWF4LXBhcmFtc1xuXHRcdGlmICghdGhpcy5fZXF1YWxzKHByZXZpb3VzLCB2YWx1ZSkgfHwgIShwcm9wZXJ0eSBpbiB0YXJnZXQpKSB7XG5cdFx0XHRjb25zdCBkZXNjcmlwdG9yID0gdGhpcy5fZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHkpO1xuXG5cdFx0XHRpZiAoZGVzY3JpcHRvciAhPT0gdW5kZWZpbmVkICYmICdzZXQnIGluIGRlc2NyaXB0b3IpIHtcblx0XHRcdFx0cmV0dXJuIFJlZmxlY3Quc2V0KHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCByZWNlaXZlcik7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBSZWZsZWN0LnNldCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCBwcmV2aW91cykge1xuXHRcdGlmIChSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHkpKSB7XG5cdFx0XHRpZiAoIXRoaXMuaXNVbnN1YnNjcmliZWQpIHtcblx0XHRcdFx0Y29uc3QgcHJvcGVydGllcyA9IHRoaXMuX2dldERlc2NyaXB0b3JDYWNoZSgpLmdldCh0YXJnZXQpO1xuXG5cdFx0XHRcdGlmIChwcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHByb3BlcnRpZXNbcHJvcGVydHldO1xuXHRcdFx0XHRcdHRoaXMuX3BhdGhDYWNoZS5kZWxldGUocHJldmlvdXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlzU2FtZURlc2NyaXB0b3IoYSwgdGFyZ2V0LCBwcm9wZXJ0eSkge1xuXHRcdGNvbnN0IGIgPSB0aGlzLl9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eSk7XG5cblx0XHRyZXR1cm4gYSAhPT0gdW5kZWZpbmVkXG5cdFx0XHQmJiBiICE9PSB1bmRlZmluZWRcblx0XHRcdCYmIE9iamVjdC5pcyhhLnZhbHVlLCBiLnZhbHVlKVxuXHRcdFx0JiYgKGEud3JpdGFibGUgfHwgZmFsc2UpID09PSAoYi53cml0YWJsZSB8fCBmYWxzZSlcblx0XHRcdCYmIChhLmVudW1lcmFibGUgfHwgZmFsc2UpID09PSAoYi5lbnVtZXJhYmxlIHx8IGZhbHNlKVxuXHRcdFx0JiYgKGEuY29uZmlndXJhYmxlIHx8IGZhbHNlKSA9PT0gKGIuY29uZmlndXJhYmxlIHx8IGZhbHNlKVxuXHRcdFx0JiYgYS5nZXQgPT09IGIuZ2V0XG5cdFx0XHQmJiBhLnNldCA9PT0gYi5zZXQ7XG5cdH1cblxuXHRpc0dldEludmFyaWFudCh0YXJnZXQsIHByb3BlcnR5KSB7XG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IHRoaXMuX2dldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5KTtcblxuXHRcdHJldHVybiBkZXNjcmlwdG9yICE9PSB1bmRlZmluZWRcblx0XHRcdCYmIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlICE9PSB0cnVlXG5cdFx0XHQmJiBkZXNjcmlwdG9yLndyaXRhYmxlICE9PSB0cnVlO1xuXHR9XG5cblx0dW5zdWJzY3JpYmUoKSB7XG5cdFx0dGhpcy5fZGVzY3JpcHRvckNhY2hlID0gbnVsbDtcblx0XHR0aGlzLl9wYXRoQ2FjaGUgPSBudWxsO1xuXHRcdHRoaXMuX3Byb3h5Q2FjaGUgPSBudWxsO1xuXHRcdHRoaXMuaXNVbnN1YnNjcmliZWQgPSB0cnVlO1xuXHR9XG59XG4iLCJleHBvcnQgY29uc3QgUEFUSF9TRVBBUkFUT1IgPSAnLic7XG5leHBvcnQgY29uc3QgVEFSR0VUID0gU3ltYm9sKCd0YXJnZXQnKTtcbmV4cG9ydCBjb25zdCBVTlNVQlNDUklCRSA9IFN5bWJvbCgndW5zdWJzY3JpYmUnKTtcbiIsImltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzLXN5bWJvbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlnbm9yZVByb3BlcnR5KGNhY2hlLCBvcHRpb25zLCBwcm9wZXJ0eSkge1xuXHRyZXR1cm4gY2FjaGUuaXNVbnN1YnNjcmliZWRcblx0XHR8fCAob3B0aW9ucy5pZ25vcmVTeW1ib2xzICYmIGlzU3ltYm9sKHByb3BlcnR5KSlcblx0XHR8fCAob3B0aW9ucy5pZ25vcmVVbmRlcnNjb3JlcyAmJiBwcm9wZXJ0eS5jaGFyQXQoMCkgPT09ICdfJylcblx0XHR8fCAoJ2lnbm9yZUtleXMnIGluIG9wdGlvbnMgJiYgb3B0aW9ucy5pZ25vcmVLZXlzLmluY2x1ZGVzKHByb3BlcnR5KSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBBcnJheS5pc0FycmF5O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzQnVpbHRpbldpdGhNdXRhYmxlTWV0aG9kcyh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlXG5cdFx0fHwgdmFsdWUgaW5zdGFuY2VvZiBTZXRcblx0XHR8fCB2YWx1ZSBpbnN0YW5jZW9mIE1hcFxuXHRcdHx8IHZhbHVlIGluc3RhbmNlb2YgV2Vha1NldFxuXHRcdHx8IHZhbHVlIGluc3RhbmNlb2YgV2Vha01hcFxuXHRcdHx8IEFycmF5QnVmZmVyLmlzVmlldyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0J1aWx0aW5XaXRob3V0TXV0YWJsZU1ldGhvZHModmFsdWUpIHtcblx0cmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8gdmFsdWUgPT09IG51bGwgOiB0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicpIHx8IHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNJdGVyYXRvcih2YWx1ZSkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUubmV4dCA9PT0gJ2Z1bmN0aW9uJztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG5cdHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJztcbn1cbiIsImltcG9ydCB7UEFUSF9TRVBBUkFUT1J9IGZyb20gJy4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXMtYXJyYXkuanMnO1xuaW1wb3J0IGlzU3ltYm9sIGZyb20gJy4vaXMtc3ltYm9sLmpzJztcblxuY29uc3QgcGF0aCA9IHtcblx0YWZ0ZXI6IChwYXRoLCBzdWJQYXRoKSA9PiB7XG5cdFx0aWYgKGlzQXJyYXkocGF0aCkpIHtcblx0XHRcdHJldHVybiBwYXRoLnNsaWNlKHN1YlBhdGgubGVuZ3RoKTtcblx0XHR9XG5cblx0XHRpZiAoc3ViUGF0aCA9PT0gJycpIHtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1cblxuXHRcdHJldHVybiBwYXRoLnNsaWNlKHN1YlBhdGgubGVuZ3RoICsgMSk7XG5cdH0sXG5cdGNvbmNhdDogKHBhdGgsIGtleSkgPT4ge1xuXHRcdGlmIChpc0FycmF5KHBhdGgpKSB7XG5cdFx0XHRwYXRoID0gWy4uLnBhdGhdO1xuXG5cdFx0XHRpZiAoa2V5KSB7XG5cdFx0XHRcdHBhdGgucHVzaChrZXkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcGF0aDtcblx0XHR9XG5cblx0XHRpZiAoa2V5ICYmIGtleS50b1N0cmluZyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZiAocGF0aCAhPT0gJycpIHtcblx0XHRcdFx0cGF0aCArPSBQQVRIX1NFUEFSQVRPUjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzU3ltYm9sKGtleSkpIHtcblx0XHRcdFx0cmV0dXJuIHBhdGggKyBrZXkudG9TdHJpbmcoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHBhdGggKyBrZXk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBhdGg7XG5cdH0sXG5cdGluaXRpYWw6IHBhdGggPT4ge1xuXHRcdGlmIChpc0FycmF5KHBhdGgpKSB7XG5cdFx0XHRyZXR1cm4gcGF0aC5zbGljZSgwLCAtMSk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhdGggPT09ICcnKSB7XG5cdFx0XHRyZXR1cm4gcGF0aDtcblx0XHR9XG5cblx0XHRjb25zdCBpbmRleCA9IHBhdGgubGFzdEluZGV4T2YoUEFUSF9TRVBBUkFUT1IpO1xuXG5cdFx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdHJldHVybiBwYXRoLnNsaWNlKDAsIGluZGV4KTtcblx0fSxcblx0bGFzdDogcGF0aCA9PiB7XG5cdFx0aWYgKGlzQXJyYXkocGF0aCkpIHtcblx0XHRcdHJldHVybiBwYXRoW3BhdGgubGVuZ3RoIC0gMV0gfHwgJyc7XG5cdFx0fVxuXG5cdFx0aWYgKHBhdGggPT09ICcnKSB7XG5cdFx0XHRyZXR1cm4gcGF0aDtcblx0XHR9XG5cblx0XHRjb25zdCBpbmRleCA9IHBhdGgubGFzdEluZGV4T2YoUEFUSF9TRVBBUkFUT1IpO1xuXG5cdFx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdFx0cmV0dXJuIHBhdGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBhdGguc2xpY2UoaW5kZXggKyAxKTtcblx0fSxcblx0d2FsazogKHBhdGgsIGNhbGxiYWNrKSA9PiB7XG5cdFx0aWYgKGlzQXJyYXkocGF0aCkpIHtcblx0XHRcdGZvciAoY29uc3Qga2V5IG9mIHBhdGgpIHtcblx0XHRcdFx0Y2FsbGJhY2soa2V5KTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHBhdGggIT09ICcnKSB7XG5cdFx0XHRsZXQgcG9zaXRpb24gPSAwO1xuXHRcdFx0bGV0IGluZGV4ID0gcGF0aC5pbmRleE9mKFBBVEhfU0VQQVJBVE9SKTtcblxuXHRcdFx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdFx0XHRjYWxsYmFjayhwYXRoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdoaWxlIChwb3NpdGlvbiA8IHBhdGgubGVuZ3RoKSB7XG5cdFx0XHRcdFx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdFx0XHRcdFx0aW5kZXggPSBwYXRoLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjYWxsYmFjayhwYXRoLnNsaWNlKHBvc2l0aW9uLCBpbmRleCkpO1xuXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpbmRleCArIDE7XG5cdFx0XHRcdFx0aW5kZXggPSBwYXRoLmluZGV4T2YoUEFUSF9TRVBBUkFUT1IsIHBvc2l0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0Z2V0KG9iamVjdCwgcGF0aCkge1xuXHRcdHRoaXMud2FsayhwYXRoLCBrZXkgPT4ge1xuXHRcdFx0aWYgKG9iamVjdCkge1xuXHRcdFx0XHRvYmplY3QgPSBvYmplY3Rba2V5XTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBvYmplY3Q7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYXRoO1xuIiwiaW1wb3J0IHtIQU5ETEVEX0FSUkFZX01FVEhPRFN9IGZyb20gJy4uL21ldGhvZHMvYXJyYXkuanMnO1xuaW1wb3J0IENsb25lT2JqZWN0IGZyb20gJy4vY2xvbmUtb2JqZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xvbmVBcnJheSBleHRlbmRzIENsb25lT2JqZWN0IHtcblx0c3RhdGljIGlzSGFuZGxlZE1ldGhvZChuYW1lKSB7XG5cdFx0cmV0dXJuIEhBTkRMRURfQVJSQVlfTUVUSE9EUy5oYXMobmFtZSk7XG5cdH1cbn1cbiIsImltcG9ydCBDbG9uZU9iamVjdCBmcm9tICcuL2Nsb25lLW9iamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb25lRGF0ZSBleHRlbmRzIENsb25lT2JqZWN0IHtcblx0dW5kbyhvYmplY3QpIHtcblx0XHRvYmplY3Quc2V0VGltZSh0aGlzLmNsb25lLmdldFRpbWUoKSk7XG5cdH1cblxuXHRpc0NoYW5nZWQodmFsdWUsIGVxdWFscykge1xuXHRcdHJldHVybiAhZXF1YWxzKHRoaXMuY2xvbmUudmFsdWVPZigpLCB2YWx1ZS52YWx1ZU9mKCkpO1xuXHR9XG59XG4iLCJpbXBvcnQge0hBTkRMRURfTUFQX01FVEhPRFN9IGZyb20gJy4uL21ldGhvZHMvbWFwLmpzJztcbmltcG9ydCBDbG9uZU9iamVjdCBmcm9tICcuL2Nsb25lLW9iamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb25lTWFwIGV4dGVuZHMgQ2xvbmVPYmplY3Qge1xuXHRzdGF0aWMgaXNIYW5kbGVkTWV0aG9kKG5hbWUpIHtcblx0XHRyZXR1cm4gSEFORExFRF9NQVBfTUVUSE9EUy5oYXMobmFtZSk7XG5cdH1cblxuXHR1bmRvKG9iamVjdCkge1xuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIHRoaXMuY2xvbmUuZW50cmllcygpKSB7XG5cdFx0XHRvYmplY3Quc2V0KGtleSwgdmFsdWUpO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3Qga2V5IG9mIG9iamVjdC5rZXlzKCkpIHtcblx0XHRcdGlmICghdGhpcy5jbG9uZS5oYXMoa2V5KSkge1xuXHRcdFx0XHRvYmplY3QuZGVsZXRlKGtleSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgcGF0aCBmcm9tICcuLi8uLi9wYXRoLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4uLy4uL2lzLWFycmF5LmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuLi8uLi9pcy1vYmplY3QuanMnO1xuaW1wb3J0IHtNVVRBQkxFX0FSUkFZX01FVEhPRFN9IGZyb20gJy4uL21ldGhvZHMvYXJyYXkuanMnO1xuaW1wb3J0IHtNVVRBQkxFX1NFVF9NRVRIT0RTfSBmcm9tICcuLi9tZXRob2RzL3NldC5qcyc7XG5pbXBvcnQge01VVEFCTEVfTUFQX01FVEhPRFN9IGZyb20gJy4uL21ldGhvZHMvbWFwLmpzJztcbmltcG9ydCB7SU1NVVRBQkxFX09CSkVDVF9NRVRIT0RTfSBmcm9tICcuLi9tZXRob2RzL29iamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb25lT2JqZWN0IHtcblx0Y29uc3RydWN0b3IodmFsdWUsIHBhdGgsIGFyZ3VtZW50c0xpc3QsIGhhc09uVmFsaWRhdGUpIHtcblx0XHR0aGlzLl9wYXRoID0gcGF0aDtcblx0XHR0aGlzLl9pc0NoYW5nZWQgPSBmYWxzZTtcblx0XHR0aGlzLl9jbG9uZWRDYWNoZSA9IG5ldyBTZXQoKTtcblx0XHR0aGlzLl9oYXNPblZhbGlkYXRlID0gaGFzT25WYWxpZGF0ZTtcblx0XHR0aGlzLl9jaGFuZ2VzID0gaGFzT25WYWxpZGF0ZSA/IFtdIDogbnVsbDtcblxuXHRcdHRoaXMuY2xvbmUgPSBwYXRoID09PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHRoaXMuX3NoYWxsb3dDbG9uZSh2YWx1ZSk7XG5cdH1cblxuXHRzdGF0aWMgaXNIYW5kbGVkTWV0aG9kKG5hbWUpIHtcblx0XHRyZXR1cm4gSU1NVVRBQkxFX09CSkVDVF9NRVRIT0RTLmhhcyhuYW1lKTtcblx0fVxuXG5cdF9zaGFsbG93Q2xvbmUodmFsdWUpIHtcblx0XHRsZXQgY2xvbmUgPSB2YWx1ZTtcblxuXHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdGNsb25lID0gey4uLnZhbHVlfTtcblx0XHR9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRjbG9uZSA9IFsuLi52YWx1ZV07XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdGNsb25lID0gbmV3IERhdGUodmFsdWUpO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBTZXQpIHtcblx0XHRcdGNsb25lID0gbmV3IFNldChbLi4udmFsdWVdLm1hcChpdGVtID0+IHRoaXMuX3NoYWxsb3dDbG9uZShpdGVtKSkpO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcblx0XHRcdGNsb25lID0gbmV3IE1hcCgpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IFtrZXksIGl0ZW1dIG9mIHZhbHVlLmVudHJpZXMoKSkge1xuXHRcdFx0XHRjbG9uZS5zZXQoa2V5LCB0aGlzLl9zaGFsbG93Q2xvbmUoaXRlbSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX2Nsb25lZENhY2hlLmFkZChjbG9uZSk7XG5cblx0XHRyZXR1cm4gY2xvbmU7XG5cdH1cblxuXHRwcmVmZXJyZWRUaGlzQXJnKGlzSGFuZGxlZE1ldGhvZCwgbmFtZSwgdGhpc0FyZywgdGhpc1Byb3h5VGFyZ2V0KSB7XG5cdFx0aWYgKGlzSGFuZGxlZE1ldGhvZCkge1xuXHRcdFx0aWYgKGlzQXJyYXkodGhpc1Byb3h5VGFyZ2V0KSkge1xuXHRcdFx0XHR0aGlzLl9vbklzQ2hhbmdlZCA9IE1VVEFCTEVfQVJSQVlfTUVUSE9EU1tuYW1lXTtcblx0XHRcdH0gZWxzZSBpZiAodGhpc1Byb3h5VGFyZ2V0IGluc3RhbmNlb2YgU2V0KSB7XG5cdFx0XHRcdHRoaXMuX29uSXNDaGFuZ2VkID0gTVVUQUJMRV9TRVRfTUVUSE9EU1tuYW1lXTtcblx0XHRcdH0gZWxzZSBpZiAodGhpc1Byb3h5VGFyZ2V0IGluc3RhbmNlb2YgTWFwKSB7XG5cdFx0XHRcdHRoaXMuX29uSXNDaGFuZ2VkID0gTVVUQUJMRV9NQVBfTUVUSE9EU1tuYW1lXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXNQcm94eVRhcmdldDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpc0FyZztcblx0fVxuXG5cdHVwZGF0ZShmdWxsUGF0aCwgcHJvcGVydHksIHZhbHVlKSB7XG5cdFx0Y29uc3QgY2hhbmdlUGF0aCA9IHBhdGguYWZ0ZXIoZnVsbFBhdGgsIHRoaXMuX3BhdGgpO1xuXG5cdFx0aWYgKHByb3BlcnR5ICE9PSAnbGVuZ3RoJykge1xuXHRcdFx0bGV0IG9iamVjdCA9IHRoaXMuY2xvbmU7XG5cblx0XHRcdHBhdGgud2FsayhjaGFuZ2VQYXRoLCBrZXkgPT4ge1xuXHRcdFx0XHRpZiAob2JqZWN0ICYmIG9iamVjdFtrZXldKSB7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9jbG9uZWRDYWNoZS5oYXMob2JqZWN0W2tleV0pKSB7XG5cdFx0XHRcdFx0XHRvYmplY3Rba2V5XSA9IHRoaXMuX3NoYWxsb3dDbG9uZShvYmplY3Rba2V5XSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b2JqZWN0ID0gb2JqZWN0W2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAodGhpcy5faGFzT25WYWxpZGF0ZSkge1xuXHRcdFx0XHR0aGlzLl9jaGFuZ2VzLnB1c2goe1xuXHRcdFx0XHRcdHBhdGg6IGNoYW5nZVBhdGgsXG5cdFx0XHRcdFx0cHJvcGVydHksXG5cdFx0XHRcdFx0cHJldmlvdXM6IHZhbHVlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9iamVjdCAmJiBvYmplY3RbcHJvcGVydHldKSB7XG5cdFx0XHRcdG9iamVjdFtwcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9pc0NoYW5nZWQgPSB0cnVlO1xuXHR9XG5cblx0dW5kbyhvYmplY3QpIHtcblx0XHRsZXQgY2hhbmdlO1xuXG5cdFx0Zm9yIChsZXQgaW5kZXggPSB0aGlzLl9jaGFuZ2VzLmxlbmd0aCAtIDE7IGluZGV4ICE9PSAtMTsgaW5kZXgtLSkge1xuXHRcdFx0Y2hhbmdlID0gdGhpcy5fY2hhbmdlc1tpbmRleF07XG5cblx0XHRcdHBhdGguZ2V0KG9iamVjdCwgY2hhbmdlLnBhdGgpW2NoYW5nZS5wcm9wZXJ0eV0gPSBjaGFuZ2UucHJldmlvdXM7XG5cdFx0fVxuXHR9XG5cblx0aXNDaGFuZ2VkKHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRoaXMuX29uSXNDaGFuZ2VkID09PSB1bmRlZmluZWRcblx0XHRcdD8gdGhpcy5faXNDaGFuZ2VkXG5cdFx0XHQ6IHRoaXMuX29uSXNDaGFuZ2VkKHRoaXMuY2xvbmUsIHZhbHVlKTtcblx0fVxufVxuIiwiaW1wb3J0IHtIQU5ETEVEX1NFVF9NRVRIT0RTfSBmcm9tICcuLi9tZXRob2RzL3NldC5qcyc7XG5pbXBvcnQgQ2xvbmVPYmplY3QgZnJvbSAnLi9jbG9uZS1vYmplY3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbG9uZVNldCBleHRlbmRzIENsb25lT2JqZWN0IHtcblx0c3RhdGljIGlzSGFuZGxlZE1ldGhvZChuYW1lKSB7XG5cdFx0cmV0dXJuIEhBTkRMRURfU0VUX01FVEhPRFMuaGFzKG5hbWUpO1xuXHR9XG5cblx0dW5kbyhvYmplY3QpIHtcblx0XHRmb3IgKGNvbnN0IHZhbHVlIG9mIHRoaXMuY2xvbmUpIHtcblx0XHRcdG9iamVjdC5hZGQodmFsdWUpO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgdmFsdWUgb2Ygb2JqZWN0KSB7XG5cdFx0XHRpZiAoIXRoaXMuY2xvbmUuaGFzKHZhbHVlKSkge1xuXHRcdFx0XHRvYmplY3QuZGVsZXRlKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuIiwiaW1wb3J0IENsb25lT2JqZWN0IGZyb20gJy4vY2xvbmUtb2JqZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xvbmVXZWFrTWFwIGV4dGVuZHMgQ2xvbmVPYmplY3Qge1xuXHRjb25zdHJ1Y3Rvcih2YWx1ZSwgcGF0aCwgYXJndW1lbnRzTGlzdCwgaGFzT25WYWxpZGF0ZSkge1xuXHRcdHN1cGVyKHVuZGVmaW5lZCwgcGF0aCwgYXJndW1lbnRzTGlzdCwgaGFzT25WYWxpZGF0ZSk7XG5cblx0XHR0aGlzLl93ZWFrS2V5ID0gYXJndW1lbnRzTGlzdFswXTtcblx0XHR0aGlzLl93ZWFrSGFzID0gdmFsdWUuaGFzKHRoaXMuX3dlYWtLZXkpO1xuXHRcdHRoaXMuX3dlYWtWYWx1ZSA9IHZhbHVlLmdldCh0aGlzLl93ZWFrS2V5KTtcblx0fVxuXG5cdGlzQ2hhbmdlZCh2YWx1ZSkge1xuXHRcdHJldHVybiB0aGlzLl93ZWFrVmFsdWUgIT09IHZhbHVlLmdldCh0aGlzLl93ZWFrS2V5KTtcblx0fVxuXG5cdHVuZG8ob2JqZWN0KSB7XG5cdFx0Y29uc3Qgd2Vha0hhcyA9IG9iamVjdC5oYXModGhpcy5fd2Vha0tleSk7XG5cblx0XHRpZiAodGhpcy5fd2Vha0hhcyAmJiAhd2Vha0hhcykge1xuXHRcdFx0b2JqZWN0LnNldCh0aGlzLl93ZWFrS2V5LCB0aGlzLl93ZWFrVmFsdWUpO1xuXHRcdH0gZWxzZSBpZiAoIXRoaXMuX3dlYWtIYXMgJiYgd2Vha0hhcykge1xuXHRcdFx0b2JqZWN0LmRlbGV0ZSh0aGlzLl93ZWFrS2V5KTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuX3dlYWtWYWx1ZSAhPT0gb2JqZWN0LmdldCh0aGlzLl93ZWFrS2V5KSkge1xuXHRcdFx0b2JqZWN0LnNldCh0aGlzLl93ZWFrS2V5LCB0aGlzLl93ZWFrVmFsdWUpO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IENsb25lT2JqZWN0IGZyb20gJy4vY2xvbmUtb2JqZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xvbmVXZWFrU2V0IGV4dGVuZHMgQ2xvbmVPYmplY3Qge1xuXHRjb25zdHJ1Y3Rvcih2YWx1ZSwgcGF0aCwgYXJndW1lbnRzTGlzdCwgaGFzT25WYWxpZGF0ZSkge1xuXHRcdHN1cGVyKHVuZGVmaW5lZCwgcGF0aCwgYXJndW1lbnRzTGlzdCwgaGFzT25WYWxpZGF0ZSk7XG5cblx0XHR0aGlzLl9hcmcxID0gYXJndW1lbnRzTGlzdFswXTtcblx0XHR0aGlzLl93ZWFrVmFsdWUgPSB2YWx1ZS5oYXModGhpcy5fYXJnMSk7XG5cdH1cblxuXHRpc0NoYW5nZWQodmFsdWUpIHtcblx0XHRyZXR1cm4gdGhpcy5fd2Vha1ZhbHVlICE9PSB2YWx1ZS5oYXModGhpcy5fYXJnMSk7XG5cdH1cblxuXHR1bmRvKG9iamVjdCkge1xuXHRcdGlmICh0aGlzLl93ZWFrVmFsdWUgJiYgIW9iamVjdC5oYXModGhpcy5fYXJnMSkpIHtcblx0XHRcdG9iamVjdC5hZGQodGhpcy5fYXJnMSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9iamVjdC5kZWxldGUodGhpcy5fYXJnMSk7XG5cdFx0fVxuXHR9XG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzRGlmZkFycmF5cyhjbG9uZSwgdmFsdWUpIHtcblx0cmV0dXJuIGNsb25lLmxlbmd0aCAhPT0gdmFsdWUubGVuZ3RoIHx8IGNsb25lLnNvbWUoKGl0ZW0sIGluZGV4KSA9PiB2YWx1ZVtpbmRleF0gIT09IGl0ZW0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNEaWZmQ2VydGFpbigpIHtcblx0cmV0dXJuIHRydWU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0RpZmZNYXBzKGNsb25lLCB2YWx1ZSkge1xuXHRpZiAoY2xvbmUuc2l6ZSAhPT0gdmFsdWUuc2l6ZSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0bGV0IGJWYWx1ZTtcblx0Zm9yIChjb25zdCBba2V5LCBhVmFsdWVdIG9mIGNsb25lKSB7XG5cdFx0YlZhbHVlID0gdmFsdWUuZ2V0KGtleSk7XG5cblx0XHRpZiAoYlZhbHVlICE9PSBhVmFsdWUgfHwgKGJWYWx1ZSA9PT0gdW5kZWZpbmVkICYmICF2YWx1ZS5oYXMoa2V5KSkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzRGlmZlNldHMoY2xvbmUsIHZhbHVlKSB7XG5cdGlmIChjbG9uZS5zaXplICE9PSB2YWx1ZS5zaXplKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY2xvbmUpIHtcblx0XHRpZiAoIXZhbHVlLmhhcyhlbGVtZW50KSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IGlzRGlmZkNlcnRhaW4gZnJvbSAnLi4vZGlmZi9pcy1kaWZmLWNlcnRhaW4uanMnO1xuaW1wb3J0IGlzRGlmZkFycmF5cyBmcm9tICcuLi9kaWZmL2lzLWRpZmYtYXJyYXlzLmpzJztcbmltcG9ydCB7SU1NVVRBQkxFX09CSkVDVF9NRVRIT0RTfSBmcm9tICcuL29iamVjdC5qcyc7XG5cbmNvbnN0IElNTVVUQUJMRV9BUlJBWV9NRVRIT0RTID0gbmV3IFNldChbXG5cdCdjb25jYXQnLFxuXHQnaW5jbHVkZXMnLFxuXHQnaW5kZXhPZicsXG5cdCdqb2luJyxcblx0J2tleXMnLFxuXHQnbGFzdEluZGV4T2YnLFxuXSk7XG5cbmV4cG9ydCBjb25zdCBNVVRBQkxFX0FSUkFZX01FVEhPRFMgPSB7XG5cdHB1c2g6IGlzRGlmZkNlcnRhaW4sXG5cdHBvcDogaXNEaWZmQ2VydGFpbixcblx0c2hpZnQ6IGlzRGlmZkNlcnRhaW4sXG5cdHVuc2hpZnQ6IGlzRGlmZkNlcnRhaW4sXG5cdGNvcHlXaXRoaW46IGlzRGlmZkFycmF5cyxcblx0cmV2ZXJzZTogaXNEaWZmQXJyYXlzLFxuXHRzb3J0OiBpc0RpZmZBcnJheXMsXG5cdHNwbGljZTogaXNEaWZmQXJyYXlzLFxuXHRmbGF0OiBpc0RpZmZBcnJheXMsXG5cdGZpbGw6IGlzRGlmZkFycmF5cyxcbn07XG5cbmV4cG9ydCBjb25zdCBIQU5ETEVEX0FSUkFZX01FVEhPRFMgPSBuZXcgU2V0KFtcblx0Li4uSU1NVVRBQkxFX09CSkVDVF9NRVRIT0RTLFxuXHQuLi5JTU1VVEFCTEVfQVJSQVlfTUVUSE9EUyxcblx0Li4uT2JqZWN0LmtleXMoTVVUQUJMRV9BUlJBWV9NRVRIT0RTKSxcbl0pO1xuIiwiaW1wb3J0IGlzRGlmZk1hcHMgZnJvbSAnLi4vZGlmZi9pcy1kaWZmLW1hcHMuanMnO1xuaW1wb3J0IHtJTU1VVEFCTEVfU0VUX01FVEhPRFMsIENPTExFQ1RJT05fSVRFUkFUT1JfTUVUSE9EU30gZnJvbSAnLi9zZXQuanMnO1xuXG5jb25zdCBJTU1VVEFCTEVfTUFQX01FVEhPRFMgPSBuZXcgU2V0KFsuLi5JTU1VVEFCTEVfU0VUX01FVEhPRFMsICdnZXQnXSk7XG5cbmV4cG9ydCBjb25zdCBNVVRBQkxFX01BUF9NRVRIT0RTID0ge1xuXHRzZXQ6IGlzRGlmZk1hcHMsXG5cdGNsZWFyOiBpc0RpZmZNYXBzLFxuXHRkZWxldGU6IGlzRGlmZk1hcHMsXG5cdGZvckVhY2g6IGlzRGlmZk1hcHMsXG59O1xuXG5leHBvcnQgY29uc3QgSEFORExFRF9NQVBfTUVUSE9EUyA9IG5ldyBTZXQoW1xuXHQuLi5JTU1VVEFCTEVfTUFQX01FVEhPRFMsXG5cdC4uLk9iamVjdC5rZXlzKE1VVEFCTEVfTUFQX01FVEhPRFMpLFxuXHQuLi5DT0xMRUNUSU9OX0lURVJBVE9SX01FVEhPRFMsXG5dKTtcbiIsImV4cG9ydCBjb25zdCBJTU1VVEFCTEVfT0JKRUNUX01FVEhPRFMgPSBuZXcgU2V0KFtcblx0J2hhc093blByb3BlcnR5Jyxcblx0J2lzUHJvdG90eXBlT2YnLFxuXHQncHJvcGVydHlJc0VudW1lcmFibGUnLFxuXHQndG9Mb2NhbGVTdHJpbmcnLFxuXHQndG9TdHJpbmcnLFxuXHQndmFsdWVPZicsXG5dKTtcbiIsImltcG9ydCBpc0RpZmZTZXRzIGZyb20gJy4uL2RpZmYvaXMtZGlmZi1zZXRzLmpzJztcblxuZXhwb3J0IGNvbnN0IENPTExFQ1RJT05fSVRFUkFUT1JfTUVUSE9EUyA9IFtcblx0J2tleXMnLFxuXHQndmFsdWVzJyxcblx0J2VudHJpZXMnLFxuXTtcblxuZXhwb3J0IGNvbnN0IElNTVVUQUJMRV9TRVRfTUVUSE9EUyA9IG5ldyBTZXQoW1xuXHQnaGFzJyxcblx0J3RvU3RyaW5nJyxcbl0pO1xuXG5leHBvcnQgY29uc3QgTVVUQUJMRV9TRVRfTUVUSE9EUyA9IHtcblx0YWRkOiBpc0RpZmZTZXRzLFxuXHRjbGVhcjogaXNEaWZmU2V0cyxcblx0ZGVsZXRlOiBpc0RpZmZTZXRzLFxuXHRmb3JFYWNoOiBpc0RpZmZTZXRzLFxufTtcblxuZXhwb3J0IGNvbnN0IEhBTkRMRURfU0VUX01FVEhPRFMgPSBuZXcgU2V0KFtcblx0Li4uSU1NVVRBQkxFX1NFVF9NRVRIT0RTLFxuXHQuLi5PYmplY3Qua2V5cyhNVVRBQkxFX1NFVF9NRVRIT0RTKSxcblx0Li4uQ09MTEVDVElPTl9JVEVSQVRPUl9NRVRIT0RTLFxuXSk7XG4iLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuLi9pcy1hcnJheS5qcyc7XG5pbXBvcnQge2lzQnVpbHRpbldpdGhNdXRhYmxlTWV0aG9kc30gZnJvbSAnLi4vaXMtYnVpbHRpbi5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi4vaXMtb2JqZWN0LmpzJztcbmltcG9ydCBDbG9uZU9iamVjdCBmcm9tICcuL2Nsb25lL2Nsb25lLW9iamVjdC5qcyc7XG5pbXBvcnQgQ2xvbmVBcnJheSBmcm9tICcuL2Nsb25lL2Nsb25lLWFycmF5LmpzJztcbmltcG9ydCBDbG9uZURhdGUgZnJvbSAnLi9jbG9uZS9jbG9uZS1kYXRlLmpzJztcbmltcG9ydCBDbG9uZVNldCBmcm9tICcuL2Nsb25lL2Nsb25lLXNldC5qcyc7XG5pbXBvcnQgQ2xvbmVNYXAgZnJvbSAnLi9jbG9uZS9jbG9uZS1tYXAuanMnO1xuaW1wb3J0IENsb25lV2Vha1NldCBmcm9tICcuL2Nsb25lL2Nsb25lLXdlYWtzZXQuanMnO1xuaW1wb3J0IENsb25lV2Vha01hcCBmcm9tICcuL2Nsb25lL2Nsb25lLXdlYWttYXAuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbWFydENsb25lIHtcblx0Y29uc3RydWN0b3IoaGFzT25WYWxpZGF0ZSkge1xuXHRcdHRoaXMuX3N0YWNrID0gW107XG5cdFx0dGhpcy5faGFzT25WYWxpZGF0ZSA9IGhhc09uVmFsaWRhdGU7XG5cdH1cblxuXHRzdGF0aWMgaXNIYW5kbGVkVHlwZSh2YWx1ZSkge1xuXHRcdHJldHVybiBpc09iamVjdCh2YWx1ZSlcblx0XHRcdHx8IGlzQXJyYXkodmFsdWUpXG5cdFx0XHR8fCBpc0J1aWx0aW5XaXRoTXV0YWJsZU1ldGhvZHModmFsdWUpO1xuXHR9XG5cblx0c3RhdGljIGlzSGFuZGxlZE1ldGhvZCh0YXJnZXQsIG5hbWUpIHtcblx0XHRpZiAoaXNPYmplY3QodGFyZ2V0KSkge1xuXHRcdFx0cmV0dXJuIENsb25lT2JqZWN0LmlzSGFuZGxlZE1ldGhvZChuYW1lKTtcblx0XHR9XG5cblx0XHRpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG5cdFx0XHRyZXR1cm4gQ2xvbmVBcnJheS5pc0hhbmRsZWRNZXRob2QobmFtZSk7XG5cdFx0fVxuXG5cdFx0aWYgKHRhcmdldCBpbnN0YW5jZW9mIFNldCkge1xuXHRcdFx0cmV0dXJuIENsb25lU2V0LmlzSGFuZGxlZE1ldGhvZChuYW1lKTtcblx0XHR9XG5cblx0XHRpZiAodGFyZ2V0IGluc3RhbmNlb2YgTWFwKSB7XG5cdFx0XHRyZXR1cm4gQ2xvbmVNYXAuaXNIYW5kbGVkTWV0aG9kKG5hbWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBpc0J1aWx0aW5XaXRoTXV0YWJsZU1ldGhvZHModGFyZ2V0KTtcblx0fVxuXG5cdGdldCBpc0Nsb25pbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YWNrLmxlbmd0aCA+IDA7XG5cdH1cblxuXHRzdGFydCh2YWx1ZSwgcGF0aCwgYXJndW1lbnRzTGlzdCkge1xuXHRcdGxldCBDbG9uZUNsYXNzID0gQ2xvbmVPYmplY3Q7XG5cblx0XHRpZiAoaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdENsb25lQ2xhc3MgPSBDbG9uZUFycmF5O1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRDbG9uZUNsYXNzID0gQ2xvbmVEYXRlO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBTZXQpIHtcblx0XHRcdENsb25lQ2xhc3MgPSBDbG9uZVNldDtcblx0XHR9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG5cdFx0XHRDbG9uZUNsYXNzID0gQ2xvbmVNYXA7XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFdlYWtTZXQpIHtcblx0XHRcdENsb25lQ2xhc3MgPSBDbG9uZVdlYWtTZXQ7XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFdlYWtNYXApIHtcblx0XHRcdENsb25lQ2xhc3MgPSBDbG9uZVdlYWtNYXA7XG5cdFx0fVxuXG5cdFx0dGhpcy5fc3RhY2sucHVzaChuZXcgQ2xvbmVDbGFzcyh2YWx1ZSwgcGF0aCwgYXJndW1lbnRzTGlzdCwgdGhpcy5faGFzT25WYWxpZGF0ZSkpO1xuXHR9XG5cblx0dXBkYXRlKGZ1bGxQYXRoLCBwcm9wZXJ0eSwgdmFsdWUpIHtcblx0XHR0aGlzLl9zdGFja1t0aGlzLl9zdGFjay5sZW5ndGggLSAxXS51cGRhdGUoZnVsbFBhdGgsIHByb3BlcnR5LCB2YWx1ZSk7XG5cdH1cblxuXHRwcmVmZXJyZWRUaGlzQXJnKHRhcmdldCwgdGhpc0FyZywgdGhpc1Byb3h5VGFyZ2V0KSB7XG5cdFx0Y29uc3Qge25hbWV9ID0gdGFyZ2V0O1xuXHRcdGNvbnN0IGlzSGFuZGxlZE1ldGhvZCA9IFNtYXJ0Q2xvbmUuaXNIYW5kbGVkTWV0aG9kKHRoaXNQcm94eVRhcmdldCwgbmFtZSk7XG5cblx0XHRyZXR1cm4gdGhpcy5fc3RhY2tbdGhpcy5fc3RhY2subGVuZ3RoIC0gMV1cblx0XHRcdC5wcmVmZXJyZWRUaGlzQXJnKGlzSGFuZGxlZE1ldGhvZCwgbmFtZSwgdGhpc0FyZywgdGhpc1Byb3h5VGFyZ2V0KTtcblx0fVxuXG5cdGlzQ2hhbmdlZChpc011dGFibGUsIHZhbHVlLCBlcXVhbHMpIHtcblx0XHRyZXR1cm4gdGhpcy5fc3RhY2tbdGhpcy5fc3RhY2subGVuZ3RoIC0gMV0uaXNDaGFuZ2VkKGlzTXV0YWJsZSwgdmFsdWUsIGVxdWFscyk7XG5cdH1cblxuXHR1bmRvKG9iamVjdCkge1xuXHRcdGlmICh0aGlzLl9wcmV2aW91c0Nsb25lICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX3ByZXZpb3VzQ2xvbmUudW5kbyhvYmplY3QpO1xuXHRcdH1cblx0fVxuXG5cdHN0b3AoKSB7XG5cdFx0dGhpcy5fcHJldmlvdXNDbG9uZSA9IHRoaXMuX3N0YWNrLnBvcCgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3ByZXZpb3VzQ2xvbmUuY2xvbmU7XG5cdH1cbn1cbiIsImltcG9ydCB7VEFSR0VUfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3cmFwSXRlcmF0b3IoaXRlcmF0b3IsIHRhcmdldCwgdGhpc0FyZywgYXBwbHlQYXRoLCBwcmVwYXJlVmFsdWUpIHtcblx0Y29uc3Qgb3JpZ2luYWxOZXh0ID0gaXRlcmF0b3IubmV4dDtcblxuXHRpZiAodGFyZ2V0Lm5hbWUgPT09ICdlbnRyaWVzJykge1xuXHRcdGl0ZXJhdG9yLm5leHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBvcmlnaW5hbE5leHQuY2FsbCh0aGlzKTtcblxuXHRcdFx0aWYgKHJlc3VsdC5kb25lID09PSBmYWxzZSkge1xuXHRcdFx0XHRyZXN1bHQudmFsdWVbMF0gPSBwcmVwYXJlVmFsdWUoXG5cdFx0XHRcdFx0cmVzdWx0LnZhbHVlWzBdLFxuXHRcdFx0XHRcdHRhcmdldCxcblx0XHRcdFx0XHRyZXN1bHQudmFsdWVbMF0sXG5cdFx0XHRcdFx0YXBwbHlQYXRoLFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXN1bHQudmFsdWVbMV0gPSBwcmVwYXJlVmFsdWUoXG5cdFx0XHRcdFx0cmVzdWx0LnZhbHVlWzFdLFxuXHRcdFx0XHRcdHRhcmdldCxcblx0XHRcdFx0XHRyZXN1bHQudmFsdWVbMF0sXG5cdFx0XHRcdFx0YXBwbHlQYXRoLFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH07XG5cdH0gZWxzZSBpZiAodGFyZ2V0Lm5hbWUgPT09ICd2YWx1ZXMnKSB7XG5cdFx0Y29uc3Qga2V5SXRlcmF0b3IgPSB0aGlzQXJnW1RBUkdFVF0ua2V5cygpO1xuXG5cdFx0aXRlcmF0b3IubmV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsTmV4dC5jYWxsKHRoaXMpO1xuXG5cdFx0XHRpZiAocmVzdWx0LmRvbmUgPT09IGZhbHNlKSB7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZSA9IHByZXBhcmVWYWx1ZShcblx0XHRcdFx0XHRyZXN1bHQudmFsdWUsXG5cdFx0XHRcdFx0dGFyZ2V0LFxuXHRcdFx0XHRcdGtleUl0ZXJhdG9yLm5leHQoKS52YWx1ZSxcblx0XHRcdFx0XHRhcHBseVBhdGgsXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRpdGVyYXRvci5uZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gb3JpZ2luYWxOZXh0LmNhbGwodGhpcyk7XG5cblx0XHRcdGlmIChyZXN1bHQuZG9uZSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0cmVzdWx0LnZhbHVlID0gcHJlcGFyZVZhbHVlKFxuXHRcdFx0XHRcdHJlc3VsdC52YWx1ZSxcblx0XHRcdFx0XHR0YXJnZXQsXG5cdFx0XHRcdFx0cmVzdWx0LnZhbHVlLFxuXHRcdFx0XHRcdGFwcGx5UGF0aCxcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIGl0ZXJhdG9yO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==