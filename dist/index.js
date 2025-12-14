var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// ts/util/math/vector2.ts
var Vector2 = class _Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(...args) {
    let x = this.x;
    let y = this.y;
    for (const arg of args) {
      if (typeof arg === "number") {
        x += arg;
        y += arg;
      } else {
        x += arg.x;
        y += arg.y;
      }
    }
    return new _Vector2(x, y);
  }
  subtract(...args) {
    let x = this.x;
    let y = this.y;
    for (const arg of args) {
      if (typeof arg === "number") {
        x -= arg;
        y -= arg;
      } else {
        x -= arg.x;
        y -= arg.y;
      }
    }
    return new _Vector2(x, y);
  }
  multiply(...args) {
    let x = this.x;
    let y = this.y;
    for (const arg of args) {
      if (typeof arg === "number") {
        x *= arg;
        y *= arg;
      } else {
        x *= arg.x;
        y *= arg.y;
      }
    }
    return new _Vector2(x, y);
  }
  divide(...args) {
    let x = this.x;
    let y = this.y;
    for (const arg of args) {
      if (typeof arg === "number") {
        x /= arg;
        y /= arg;
      } else {
        x /= arg.x;
        y /= arg.y;
      }
    }
    return new _Vector2(x, y);
  }
  angle() {
    const mag = this.magnitude();
    if (mag === 0)
      return 0;
    return Math.atan2(this.y, this.x) * 180 / Math.PI;
  }
  angleRadians() {
    const mag = this.magnitude();
    if (mag === 0)
      return 0;
    return Math.atan2(this.y, this.x);
  }
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  rotate(angleDegrees) {
    return this.rotateRadians(angleDegrees * Math.PI / 180);
  }
  rotateRadians(angleRadians) {
    const cos = Math.cos(angleRadians);
    const sin = Math.sin(angleRadians);
    return new _Vector2(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos
    );
  }
  floor(arg1, arg2) {
    if (arg1 === void 0) {
      return new _Vector2(Math.floor(this.x), Math.floor(this.y));
    } else if (typeof arg1 === "number" && arg2 !== void 0) {
      return new _Vector2(Math.floor(this.x / arg1) * arg1, Math.floor(this.y / arg2) * arg2);
    } else if (typeof arg1 === "number") {
      return new _Vector2(Math.floor(this.x / arg1) * arg1, Math.floor(this.y / arg1) * arg1);
    } else {
      return new _Vector2(Math.floor(this.x / arg1.x) * arg1.x, Math.floor(this.y / arg1.y) * arg1.y);
    }
  }
  ceil(arg1, arg2) {
    if (arg1 === void 0) {
      return new _Vector2(Math.ceil(this.x), Math.ceil(this.y));
    } else if (typeof arg1 === "number" && arg2 !== void 0) {
      return new _Vector2(Math.ceil(this.x / arg1) * arg1, Math.ceil(this.y / arg2) * arg2);
    } else if (typeof arg1 === "number") {
      return new _Vector2(Math.ceil(this.x / arg1) * arg1, Math.ceil(this.y / arg1) * arg1);
    } else {
      return new _Vector2(Math.ceil(this.x / arg1.x) * arg1.x, Math.ceil(this.y / arg1.y) * arg1.y);
    }
  }
  clamp(minArg, maxArg) {
    if (typeof minArg === "number" && typeof maxArg === "number") {
      return new _Vector2(
        Math.max(minArg, Math.min(maxArg, this.x)),
        Math.max(minArg, Math.min(maxArg, this.y))
      );
    } else if (minArg instanceof _Vector2 && maxArg instanceof _Vector2) {
      return new _Vector2(
        Math.max(minArg.x, Math.min(maxArg.x, this.x)),
        Math.max(minArg.y, Math.min(maxArg.y, this.y))
      );
    }
    throw new Error("Invalid clamp arguments: both min and max must be either numbers or Vector2 objects");
  }
  clampMagnitude(maxMagnitude) {
    const magnitude = this.magnitude();
    if (magnitude > maxMagnitude) {
      return this.normalise().multiply(maxMagnitude);
    }
    return this;
  }
  clone() {
    return new _Vector2(this.x, this.y);
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  lerp(target, factor) {
    return new _Vector2(
      this.x + (target.x - this.x) * factor,
      this.y + (target.y - this.y) * factor
    );
  }
  moveTowards(target, maxDistance) {
    return this.add(target.subtract(this).clampMagnitude(maxDistance));
  }
  normalise() {
    const mag = this.magnitude();
    if (mag === 0)
      return new _Vector2(0, 0);
    return new _Vector2(this.x / mag, this.y / mag);
  }
  flip() {
    return new _Vector2(-this.x, -this.y);
  }
  flipx() {
    return new _Vector2(-this.x, this.y);
  }
  flipy() {
    return new _Vector2(this.x, -this.y);
  }
  round(arg1, arg2) {
    const roundToPrecision = (value, precision) => {
      const factor = Math.pow(10, precision);
      return Math.round(value * factor) / factor;
    };
    if (arg1 === void 0) {
      return new _Vector2(roundToPrecision(this.x, 2), roundToPrecision(this.y, 2));
    } else if (typeof arg1 === "number" && arg2 !== void 0) {
      return new _Vector2(roundToPrecision(this.x, arg1), roundToPrecision(this.y, arg2));
    } else if (typeof arg1 === "number") {
      return new _Vector2(roundToPrecision(this.x, arg1), roundToPrecision(this.y, arg1));
    } else {
      return new _Vector2(roundToPrecision(this.x, arg1.x), roundToPrecision(this.y, arg1.y));
    }
  }
  stringSize() {
    return "".concat(this.x, "px ").concat(this.y, "px");
  }
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
};

// ts/util/html/css/background.ts
var Background = class {
  static getStyle(options) {
    let style = "";
    if (typeof options === "string") {
      style += "background: ".concat(options, ";");
      return style;
    }
    if (options.color) {
      style += "background-color: ".concat(options.color, ";");
    }
    if ("type" in options && options.type === "image") {
      style += "background-image: url(".concat(options.image, ");");
      style += "background-position: ".concat(options.position || "center center", ";");
      style += "background-repeat: ".concat(options.repeat || "no-repeat", ";");
      style += "background-size: ".concat(options.size || "cover", ";");
      style += "background-attachment: ".concat(options.attachment || "scroll", ";");
      style += "background-origin: ".concat(options.origin || "padding-box", ";");
      style += "background-clip: ".concat(options.clip || "border-box", ";");
    } else if ("type" in options && options.type === "linear") {
      style += "background-image: linear-gradient(".concat(options.direction || "to bottom", ", ").concat(options.colors.map((color) => "".concat(color.color, " ").concat(color.position || "")).join(", "), ");");
    } else if ("type" in options && options.type === "repeat-linear") {
      style += "background-image: repeating-linear-gradient(".concat(options.direction || "to bottom", ", ").concat(options.colors.map((color) => "".concat(color.color, " ").concat(color.position || "")).join(", "), ");");
    }
    return style;
  }
};

// ts/util/html/css/size.ts
var Size = class {
  static getStyle(size) {
    let style = "";
    if (Array.isArray(size)) {
      style += "width: ".concat(size[0], "; height: ").concat(size[1], ";");
    } else {
      style += "width: ".concat(size.x.toString(), "px; height: ").concat(size.y.toString(), "px;");
    }
    return style;
  }
};

// ts/util/math/transform.ts
var Transform2d = class _Transform2d {
  constructor(element) {
    this._position = new Vector2(0, 0);
    this._rotation = 0;
    // in degrees
    this._scale = new Vector2(1, 1);
    this._anchor = new Vector2(0, 0);
    // normalized 0-1 or pixel values
    this._cachedMatrix = null;
    this._element = element;
  }
  get position() {
    return this._position.clone();
  }
  setPosition(value, y) {
    if (typeof value === "number") {
      this._position = new Vector2(value, y != null ? y : value);
    } else {
      this._position = value.clone();
    }
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  move(value) {
    this._position = this._position.add(value);
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  get rotation() {
    return this._rotation;
  }
  setRotation(value) {
    this._rotation = value;
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  rotate(value) {
    this._rotation = this._rotation + value;
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  get scale() {
    return this._scale.clone();
  }
  setScale(value) {
    if (typeof value === "number") {
      this._scale = new Vector2(value, value);
    } else {
      this._scale = value.clone();
    }
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  get anchor() {
    return this._anchor.clone();
  }
  setAnchor(value) {
    this._anchor = value.clone();
    this._cachedMatrix = null;
    this.calculateMatrix();
    return this;
  }
  /**
   * Gets the anchor point in pixels.
   * If anchor values are between 0-1, they're treated as normalized (0-1 range).
   * Otherwise, they're treated as pixel values.
   */
  getAnchorPoint() {
    return this._anchor;
  }
  /**
   * Calculates and caches the CSS transform matrix string.
   * The matrix combines: translation, rotation, and scale with proper anchor point handling.
   * 
   * Transformation order: T(-anchor) -> Scale -> Rotate -> T(anchor) -> T(position)
   * This ensures transformations occur around the anchor point, then the element is moved to position.
   */
  calculateMatrix() {
    const anchorPoint = this.getAnchorPoint();
    const rotationRad = this._rotation * Math.PI / 180;
    const cos = Math.cos(rotationRad);
    const sin = Math.sin(rotationRad);
    const sx = this._scale.x;
    const sy = this._scale.y;
    const anchorX = anchorPoint.x;
    const anchorY = anchorPoint.y;
    const a = sx * cos;
    const b = sx * sin;
    const c = -sy * sin;
    const d = sy * cos;
    const e = this._position.x + anchorX - anchorX * a - anchorY * c;
    const f = this._position.y + anchorY - anchorX * b - anchorY * d;
    this._cachedMatrix = "matrix(".concat(a, ", ").concat(b, ", ").concat(c, ", ").concat(d, ", ").concat(e, ", ").concat(f, ")");
    this._element.style("transform: ".concat(this._cachedMatrix, "; transform-origin: 0 0;"));
  }
  /**
   * Gets the CSS transform matrix string.
   * Returns the cached matrix if available, otherwise calculates it.
   */
  getMatrix() {
    if (this._cachedMatrix === null) {
      this.calculateMatrix();
    }
    return this._cachedMatrix;
  }
  /**
   * Gets the CSS transform-origin string based on the anchor point.
   * Note: When using getMatrix(), the anchor is baked into the matrix, so transform-origin should be 0,0.
   * This method is provided for cases where you want to use transform-origin separately.
   */
  getTransformOrigin() {
    const anchorPoint = this.getAnchorPoint();
    return "".concat(anchorPoint.x, "px ").concat(anchorPoint.y, "px");
  }
  /**
   * Gets the complete CSS transform string (matrix only, with transform-origin set to 0,0).
   * The anchor point is baked into the matrix calculation.
   */
  getCSS() {
    return "transform: ".concat(this.getMatrix(), "; transform-origin: 0 0;");
  }
  /**
   * Gets just the transform property value.
   */
  getTransform() {
    return this.getMatrix();
  }
  /**
   * Clones this transform.
   */
  clone() {
    return new _Transform2d(this._element).setPosition(this._position.clone()).setRotation(this._rotation).setScale(this._scale.clone()).setAnchor(this._anchor.clone());
  }
};

// ts/util/html/dom.ts
var Dom = class {
  constructor() {
    this.children = [];
    this._lastDisplay = "block";
    this._visible = true;
  }
  get visible() {
    return this._visible;
  }
  set visible(value) {
    this._visible = value;
    this.dom.style.display = value ? this._lastDisplay : "none";
  }
  build(options) {
    this._visible = options.visible || true;
    if (options.classNames) {
      this.dom.classList.add(...options.classNames);
    }
    if (options.id) {
      this.dom.id = options.id;
    }
    if (options.style) {
      this.style(options.style);
    }
    if (options.background) {
      this.style(Background.getStyle(options.background));
    }
    if (options.size) {
      this.size(options.size);
    }
    if (options.attributes) {
      for (const [key, value] of Object.entries(options.attributes)) {
        this.dom.setAttribute(key, value);
      }
    }
    if (options.text) {
      this.dom.textContent = options.text;
    }
    if (options.html) {
      this.dom.innerHTML = options.html;
    }
    this.transform = new Transform2d(this).setPosition(options.position || new Vector2(0, 0)).setRotation(options.rotation || 0).setScale(options.scale || new Vector2(1, 1)).setAnchor(options.anchor || new Vector2(0, 0));
  }
  size(size) {
    if (typeof size === "object") {
      this.dom.style.cssText += Size.getStyle(size);
    } else {
      this.dom.style.cssText += Size.getStyle([size[0], size[1]]);
    }
  }
  style(style) {
    this.dom.style.cssText += style;
    if (this.dom.style.display !== "none") {
      this._lastDisplay = this.dom.style.display || "block";
    }
  }
  background(background) {
    this.dom.style.cssText += Background.getStyle(background);
  }
  tick() {
    for (const child of this.children) {
      child.tick();
    }
  }
  resize() {
    for (const child of this.children) {
      child.resize();
    }
  }
  append(child) {
    this.dom.appendChild(child.dom);
    this.children.push(child);
    return child;
  }
  removeChild(child) {
    this.dom.removeChild(child.dom);
    this.children = this.children.filter((c) => c !== child);
  }
};

// ts/util/html/el.ts
var El = class extends Dom {
  constructor(type, options) {
    super();
    this.dom = document.createElement(type);
    this.build(options);
  }
  append(child) {
    this.dom.appendChild(child.dom);
    this.children.push(child);
    return child;
  }
  removeChild(child) {
    this.dom.removeChild(child.dom);
    this.children = this.children.filter((c) => c !== child);
  }
};

// ts/util/html/div.ts
var Div = class extends El {
  constructor(options = {}) {
    super("div", options);
  }
};

// ts/util/html/svg.ts
var Svg = class extends Dom {
  constructor(type, options) {
    super();
    this.children = [];
    this.dom = document.createElementNS("http://www.w3.org/2000/svg", type);
    this.build(options);
  }
  getPointAtLength(length) {
    const point = this.dom.getPointAtLength(length);
    return new Vector2(point.x, point.y);
  }
  build(options) {
    super.build(options);
    if (options.points) {
      this.dom.setAttribute("points", options.points);
    }
    if (options.d) {
      this.dom.setAttribute("d", options.d);
    }
    if (options.fill) {
      this.dom.setAttribute("fill", options.fill);
    }
    if (options.stroke) {
      this.dom.setAttribute("stroke", options.stroke);
    }
    if (options.strokeWidth) {
      this.dom.setAttribute("stroke-width", options.strokeWidth.toString());
    }
    if (options.strokeLinecap) {
      this.dom.setAttribute("stroke-linecap", options.strokeLinecap);
    }
    if (options.strokeLinejoin) {
      this.dom.setAttribute("stroke-linejoin", options.strokeLinejoin);
    }
    if (options.strokeMiterlimit) {
      this.dom.setAttribute("stroke-miterlimit", options.strokeMiterlimit.toString());
    }
    if (options.strokeDasharray) {
      this.dom.setAttribute("stroke-dasharray", options.strokeDasharray);
    }
    if (options.strokeDashoffset) {
      this.dom.setAttribute("stroke-dashoffset", options.strokeDashoffset.toString());
    }
    if (options.strokeOpacity) {
      this.dom.setAttribute("stroke-opacity", options.strokeOpacity.toString());
    }
    if (options.cx) {
      this.dom.setAttribute("cx", options.cx.toString());
    }
    if (options.cy) {
      this.dom.setAttribute("cy", options.cy.toString());
    }
    if (options.r) {
      this.dom.setAttribute("r", options.r.toString());
    }
    if (options.x) {
      this.dom.setAttribute("x", options.x.toString());
    }
    if (options.y) {
      this.dom.setAttribute("y", options.y.toString());
    }
  }
  append(child) {
    this.dom.appendChild(child.dom);
    this.children.push(child);
    return child;
  }
  removeChild(child) {
    this.dom.removeChild(child.dom);
    this.children = this.children.filter((c) => c !== child);
  }
};

// ts/logic/tasks/task.ts
var Task = class {
  constructor(data) {
    this.data = data;
    var _a;
    this.data.priority = (_a = this.data.priority) != null ? _a : 0.5;
    if (!this.data.depth) {
      this.data.depth = this.data.location.data.depth;
    }
  }
  build() {
    this.dom = new Div({
      size: new Vector2(Schedule.TASK_WIDTH * (this.data.end - this.data.start), Schedule.TASK_HEIGHT),
      background: { color: this.data.color || "white" },
      style: 'display: flex; align-items: center; justify-content: center; font-size: 10px; font-family: "Arial", sans-serif; padding: 12.5px 3px; border: 1px solid black; overflow: hidden; box-sizing: border-box; position: absolute;',
      text: this.data.name
    });
  }
  getLocation() {
    return this.data.location.data.position;
  }
  getDepth() {
    return this.data.depth;
  }
};

// ts/visuals/visualTask.ts
var VisualTask = class extends Task {
  constructor(data) {
    var _a, _b, _c, _d;
    super(data);
    this.data = data;
    this.data.animationStart = (_a = this.data.animationStart) != null ? _a : 50;
    this.data.animationDuration = (_b = this.data.animationDuration) != null ? _b : 6;
    this.data.animationOffset = (_c = this.data.animationOffset) != null ? _c : new Vector2(0, 0);
    this.data.animationSpeed = (_d = this.data.animationSpeed) != null ? _d : 200;
  }
};

// ts/visuals/prefabs.ts
var IdleTask = class extends VisualTask {
  constructor({ start, end, location }) {
    super({
      name: "",
      start,
      end,
      location,
      color: "white",
      priority: 0,
      animationDuration: 5,
      animationStart: 0,
      animationSpeed: 300
    });
  }
};
var SleepTask = class extends VisualTask {
  constructor({ start, end, location }) {
    super({
      name: "Sleep",
      start,
      end,
      location,
      color: "#9f9f9f",
      priority: 0.1,
      animationDuration: 2,
      animationStart: 68,
      animationOffset: new Vector2(20, -30),
      animationSpeed: 1e3,
      depth: 15
    });
  }
};
var ShowerTask = class extends VisualTask {
  constructor({ start, end, location }) {
    super({
      name: "Wash",
      start,
      end,
      location,
      color: "#c7c7ff",
      priority: 1,
      animationDuration: 4,
      animationStart: 30,
      animationSpeed: 1e3,
      depth: 10
    });
  }
};
var EatTask = class extends VisualTask {
  constructor({ start, end, location }) {
    super({
      name: "Food",
      start,
      end,
      location,
      color: "#b5d5d8",
      priority: 1,
      animationDuration: 5,
      animationStart: 0,
      animationSpeed: 200
    });
  }
};
var EngineTask = class extends VisualTask {
  constructor({ start, end, location }) {
    super({
      name: "Helm",
      start,
      end,
      location,
      color: "#e1e1e1",
      animationDuration: 4,
      animationStart: 30,
      animationSpeed: 1e3
    });
  }
};
var WorkTask = class extends VisualTask {
  constructor({ start, end, location }) {
    super({ name: "Work", start, end, location, color: "#dcb1cd" });
  }
};

// ts/logic/tasks/schedule.ts
var _Schedule = class _Schedule {
  constructor(managers, person, data = {}) {
    this.managers = managers;
    this.person = person;
    this.data = data;
    this.taskList = [];
    this.travels = [];
    if (data.tasks)
      for (const task of data.tasks) {
        this.addTask(task);
      }
  }
  addTask(task) {
    if (task instanceof Task) {
      this.taskList.push(task);
    } else {
      this.taskList.push(new Task(task));
    }
  }
  createIdleTask(start, end, location) {
    return new IdleTask({
      start,
      end,
      location
    });
  }
  checkTasks() {
    const tempTable = {};
    let lastLocation;
    let idleTask;
    for (let i = 0; i < 24; i++) {
      const tasks = this.taskList.filter((task) => task.data.start <= i && task.data.end > i);
      if (tasks.length === 0) {
        if (!idleTask) {
          idleTask = this.createIdleTask(i, i + 1, lastLocation);
        } else {
          idleTask.data.end = i + 1;
        }
        tempTable[i] = idleTask;
      } else {
        if (idleTask) {
          idleTask = null;
        }
        tempTable[i] = tasks[0];
        lastLocation = tasks[0].data.location;
      }
    }
    this.table = tempTable;
  }
  checkTravels() {
    for (let i = 0; i < 24; i++) {
      const from = this.table[i];
      const to = this.table[(i + 1) % 24];
      const route = this.managers.routeManager.findRoute(
        from.data.location,
        to.data.location
      );
      const travel = route.createTravel(this.person, i + 1);
      if (from.data.priority === to.data.priority) {
        travel.offset = 0.5;
      } else if (from.data.priority === 0) {
        travel.offset = 0;
      } else if (to.data.priority === 0) {
        travel.offset = 1;
      } else {
        travel.offset = 0.5 + from.data.priority / 2 - to.data.priority / 2;
      }
      travel.build();
      this.dom.append(travel.dom);
      this.travels.push(travel);
    }
  }
  build() {
    this.debug = new Div({});
    this.dom = new Div({
      position: new Vector2(100, 0),
      size: new Vector2(_Schedule.TASK_WIDTH * 24, _Schedule.TASK_HEIGHT),
      style: "position: absolute;"
    });
    this.checkTasks();
    for (const task of Object.values(this.table)) {
      task.build();
      task.dom.transform.setPosition(new Vector2(task.data.start * _Schedule.TASK_WIDTH, 0));
      this.dom.append(task.dom);
    }
    this.checkTravels();
    this.lineDom = new Div({
      position: new Vector2(0, 0),
      size: new Vector2(2, _Schedule.TASK_HEIGHT),
      background: { color: "black" }
    });
    this.dom.append(this.lineDom);
  }
  getTaskAtTime(time) {
    return this.table[Math.floor(time % 24)];
  }
  setTime(time) {
    this.lineDom.transform.setPosition(new Vector2(time % 24 / 24 * (_Schedule.TASK_WIDTH * 24), 0));
  }
  getInfoAtTime(time) {
    var _a, _b;
    for (const travel of this.travels) {
      const d = travel.getTimePostion(time % 24);
      if (d) {
        return { phase: "travel", position: d[0], depth: d[1], task: void 0 };
      }
    }
    const task = this.getTaskAtTime(time % 24);
    return { phase: "task", position: (_a = task == null ? void 0 : task.getLocation()) != null ? _a : new Vector2(0, 0), depth: (_b = task == null ? void 0 : task.getDepth()) != null ? _b : 1, task };
  }
};
_Schedule.TASK_WIDTH = 30;
_Schedule.TASK_HEIGHT = 30;
var Schedule = _Schedule;

// ts/logic/tasks/travel.ts
var Travel = class {
  constructor(data) {
    this.data = data;
    this._active = false;
    this.offset = 0.5;
    this.stages = [];
  }
  get active() {
    return this._active;
  }
  set active(value) {
    this._active = value;
  }
  build() {
    this.duration = this.data.route.distance / this.data.subject.speed;
    this.leaveTime = this.data.arrivalTime - this.duration + this.duration * this.offset;
    this.arrivalTime = this.data.arrivalTime + this.duration * this.offset;
    this.dom = new Div({
      position: new Vector2(this.leaveTime * (Schedule.TASK_WIDTH * 24) / 24, 0),
      size: new Vector2(Schedule.TASK_WIDTH * this.duration, Schedule.TASK_HEIGHT),
      background: { type: "repeat-linear", direction: "50deg", colors: [{ position: "0px", color: "#00000022" }, { position: "2px", color: "black" }, { position: "2px", color: "transparent" }, { position: "6px", color: "transparent" }] },
      style: "box-sizing: border-box; position: absolute;"
    });
  }
  getTimePostion(time) {
    if (time > this.leaveTime && time < this.arrivalTime) {
      return this.data.route.getSegmentVector((time - this.leaveTime) * this.data.subject.speed);
    }
    return void 0;
  }
};

// ts/logic/tasks/route.ts
var Route = class {
  constructor(managers, data) {
    this.managers = managers;
    this.data = data;
    this.segments = [];
    let totalDistance = 0;
    for (let index = 0; index < data.connections.length; index++) {
      const connection = data.connections[index];
      this.segments.push({
        connection,
        distance: connection.distance,
        start: totalDistance,
        end: totalDistance + connection.distance,
        direction: connection.fromLocation === data.through[index] ? 1 : -1
      });
      totalDistance += connection.distance;
    }
    this.distance = totalDistance;
  }
  getSegmentVector(time) {
    const segment = this.segments.find((segment2) => time >= segment2.start && time <= segment2.end);
    let delta = (time - segment.start) / segment.distance;
    if (segment.direction === -1) {
      delta = 1 - delta;
    }
    return [segment.connection.getVector(delta), segment.connection.data.depth];
  }
  createTravel(subject, arrivalTime) {
    return new Travel({
      route: this,
      subject,
      arrivalTime
    });
  }
};

// ts/logic/tasks/routeManager.ts
var RouteManager = class _RouteManager {
  constructor(managers) {
    this.managers = managers;
    this.routes = [];
  }
  createNullRoute(locationA) {
    const route = new Route(this.managers, {
      from: locationA,
      to: locationA,
      through: [],
      connections: []
    });
    return route;
  }
  findRoute(locationA, locationB) {
    const found = this.routes.find((route) => route.data.from === locationA && route.data.to === locationB);
    if (found) {
      return found;
    }
    return this.createRoute(locationA, locationB);
  }
  static recursiveRoute(locationA, locationB, route, distance, exclude, connections) {
    const excludeList = [...exclude, locationA];
    if (locationA === locationB) {
      return {
        route: [...route, locationA],
        distance,
        end: true,
        connections: [...connections]
      };
    }
    const possiblities = [];
    for (const neighbor of locationA.neighbors) {
      if (excludeList.includes(neighbor[0])) {
        continue;
      }
      const d = neighbor[1].distance;
      const foundRoute = _RouteManager.recursiveRoute(neighbor[0], locationB, [...route, locationA], distance + d, excludeList, [...connections, neighbor[1]]);
      if (foundRoute) {
        possiblities.push(foundRoute);
      }
    }
    if (possiblities.length > 0) {
      return possiblities.sort((a, b) => a.distance - b.distance)[0];
    }
    return false;
  }
  createRoute(locationA, locationB) {
    const foundRoute = _RouteManager.recursiveRoute(locationA, locationB, [], 0, [], []);
    if (!foundRoute) {
      throw new Error("No route found");
    }
    const route = new Route(this.managers, {
      from: locationA,
      to: locationB,
      through: foundRoute.route,
      distance: foundRoute.distance,
      connections: foundRoute.connections
    });
    return route;
  }
};

// ts/util/pathCreator.ts
function PathCreator(start, ...d) {
  let path = "M ".concat(start.x, " ").concat(start.y);
  for (const segment of d) {
    if ("controlA" in segment) {
      path += "C ".concat(segment.controlA.x, " ").concat(segment.controlA.y, " ").concat(segment.controlB.x, " ").concat(segment.controlB.y, " ").concat(segment.point.x, " ").concat(segment.point.y);
    } else if ("control" in segment) {
      path += "Q ".concat(segment.control.x, " ").concat(segment.control.y, " ").concat(segment.point.x, " ").concat(segment.point.y);
    } else if ("radius" in segment) {
      path += "A ".concat(segment.radius, " ").concat(segment.radius, " 0 ").concat(segment.largeArcFlag ? 1 : 0, " ").concat(segment.sweepFlag ? 1 : 0, " ").concat(segment.point.x, " ").concat(segment.point.y);
    } else {
      path += "L ".concat(segment.point.x, " ").concat(segment.point.y);
    }
  }
  return path;
}

// ts/logic/map/mapConnection.ts
var MapConnection = class {
  constructor(managers, data) {
    this.managers = managers;
    this.data = data;
    if (this.data.from === this.data.to) {
      throw new Error("From and to cannot be the same");
    }
  }
  build() {
    var _a, _b;
    this.fromLocation = this.managers.mapManager.getLocation(this.data.from);
    this.toLocation = this.managers.mapManager.getLocation(this.data.to);
    this.fromLocation.registerConnection(this, this.fromLocation, this.toLocation);
    if (!this.data.oneWay) {
      this.toLocation.registerConnection(this, this.fromLocation, this.toLocation);
    }
    this.line = new Svg("path", {
      d: (_a = this.data.path) != null ? _a : PathCreator(this.fromLocation.data.position, { point: this.toLocation.data.position }),
      stroke: "black",
      strokeWidth: 2,
      fill: "none"
    });
    this.distance = this.line.dom.getTotalLength();
    this.data.depth = (_b = this.data.depth) != null ? _b : this.toLocation.data.depth;
  }
  getVector(delta) {
    return this.line.getPointAtLength(delta * this.distance);
  }
};

// ts/logic/map/mapLocation.ts
var MapLocation = class {
  constructor(managers, data) {
    this.managers = managers;
    this.data = data;
    this.connections = [];
    this.neighbors = [];
    this.routes = {};
    var _a;
    this.data.depth = (_a = this.data.depth) != null ? _a : 0;
  }
  registerConnection(connection, a, b) {
    this.connections.push(connection);
    if (a !== this)
      this.neighbors.push([a, connection]);
    if (b !== this)
      this.neighbors.push([b, connection]);
  }
  registerRoute(to, route) {
    this.routes[to] = route;
  }
  build() {
    this.dom = new Svg("g", {});
    this.dom.append(new Svg("circle", {
      cx: this.data.position.x,
      cy: this.data.position.y,
      r: 5,
      fill: "black"
    }));
    this.dom.append(new Svg("text", {
      text: this.data.name,
      x: this.data.position.x + 15,
      y: this.data.position.y + 25
    }));
  }
};

// ts/logic/map/mapManager.ts
var MapManager = class {
  constructor(managers, locations = {}, connections = []) {
    this.managers = managers;
    this.locations = {};
    this.mapConnections = [];
    for (const location of Object.entries(locations)) {
      this.locations[location[0]] = new MapLocation(this.managers, { name: location[0], position: location[1][0], depth: location[1][1] });
    }
    for (const connection of connections) {
      this.mapConnections.push(new MapConnection(this.managers, connection));
    }
    this.routeManager = new RouteManager(this.managers);
  }
  getLocation(name) {
    return this.locations[name];
  }
  build() {
    this.dom = new Div();
    this.mapSvg = new Svg("svg", {
      size: new Vector2(3e3, 2e3)
    });
    this.dom.append(this.mapSvg);
    this.mapSvg.visible = false;
    for (const connection of this.mapConnections) {
      connection.build();
      this.mapSvg.append(connection.line);
    }
    for (const location of Object.values(this.locations)) {
      location.build();
      this.mapSvg.append(location.dom);
    }
  }
};

// ts/logic/people/peopleManager.ts
var PeopleManager = class {
  constructor(managers, data = [], personClass) {
    this.managers = managers;
    this.data = data;
    this.personClass = personClass;
    this.people = [];
    for (const person of this.data) {
      if (person instanceof this.personClass) {
        this.people.push(person);
      } else {
        this.people.push(new this.personClass(this.managers, person));
      }
    }
  }
  getPerson(name) {
    return this.people.find((person) => person.data.name === name);
  }
  build() {
    this.dom = new Div({
      size: new Vector2(850, this.people.length * Schedule.TASK_HEIGHT + Schedule.TASK_HEIGHT + 20),
      style: "z-index: 20; background-color: white; padding: 10px;"
    });
    this.people.forEach((person, index) => {
      person.build();
      this.dom.append(person.scheduleDom);
      person.scheduleDom.transform.setPosition(new Vector2(0, index * Schedule.TASK_HEIGHT));
    });
    this.timeDom = this.dom.append(new Div({
      position: new Vector2(0, this.people.length * Schedule.TASK_HEIGHT),
      size: new Vector2(100, Schedule.TASK_HEIGHT),
      text: "".toString(),
      style: 'font-size: 20px; display: flex; align-items: center; justify-content: center; font-family: "monospace", sans-serif; box-sizing: border-box; position: absolute; '
    }));
  }
  setTime(time) {
    this.people.forEach((person) => {
      person.setTime(time % 24);
    });
    const hours = Math.floor(time % 24).toString().padStart(2, "0");
    const minutes = Math.round(time % 1 * 60).toString().padStart(2, "0");
    this.timeDom.dom.textContent = hours + ":" + minutes;
  }
};

// ts/logic/map/list.ts
var mapLocations = {
  deck0: [new Vector2(555, 785), 35],
  deck0showers: [new Vector2(550, 775), 20],
  deck1: [new Vector2(610, 792), 35],
  deck1Wheel: [new Vector2(615, 789), 35],
  deck2: [new Vector2(720, 800), 35],
  deck2Stair: [new Vector2(730, 794), 35],
  deck3: [new Vector2(820, 807), 35],
  deck4: [new Vector2(1e3, 809), 35],
  deck5: [new Vector2(1170, 800), 35],
  gun1: [new Vector2(435, 803), 35],
  gun2: [new Vector2(550, 828), 35],
  gun3: [new Vector2(699, 845), 35],
  gun4: [new Vector2(815, 853), 35],
  gun4Stair: [new Vector2(800, 845), 35],
  gun5: [new Vector2(890, 854), 35],
  gun6: [new Vector2(1010, 850), 35],
  gun6Stair: [new Vector2(1030, 843), 35],
  gun7: [new Vector2(1129, 840), 35],
  gun8: [new Vector2(1249, 822), 35],
  orlop1: [new Vector2(455, 853), 35],
  orlop2: [new Vector2(550, 872), 35],
  orlop3: [new Vector2(699, 885), 35],
  orlop4: [new Vector2(815, 890), 35],
  orlop5: [new Vector2(890, 892), 35],
  orlop6: [new Vector2(1e3, 892), 35],
  orlop7: [new Vector2(1110, 886), 35],
  orlop7Stair: [new Vector2(1095, 883), 35],
  orlop8: [new Vector2(1249, 866), 35]
};
var mapConnections = [
  { from: "deck0", to: "deck0showers" },
  { from: "deck0", to: "deck1" },
  { from: "deck1", to: "deck1Wheel" },
  { from: "deck1", to: "deck2" },
  { from: "deck2", to: "deck3" },
  { from: "deck3", to: "deck4" },
  { from: "deck4", to: "deck5" },
  { from: "gun1", to: "gun2" },
  { from: "gun2", to: "gun3" },
  { from: "gun3", to: "gun4" },
  { from: "gun4", to: "gun5" },
  { from: "gun5", to: "gun6" },
  { from: "gun6", to: "gun7" },
  { from: "gun7", to: "gun8" },
  { from: "orlop1", to: "orlop2" },
  { from: "orlop2", to: "orlop3" },
  { from: "orlop3", to: "orlop4" },
  { from: "orlop4", to: "orlop5" },
  { from: "orlop5", to: "orlop6" },
  { from: "orlop6", to: "orlop7" },
  { from: "orlop7", to: "orlop8" },
  { from: "deck2", to: "deck2Stair", depth: 5 },
  { from: "deck2Stair", to: "gun4Stair", depth: 5 },
  { from: "gun4Stair", to: "gun4", depth: 5 },
  { from: "gun6", to: "gun6Stair", depth: 5 },
  { from: "gun6Stair", to: "orlop7Stair", depth: 5 },
  { from: "orlop7Stair", to: "orlop7", depth: 5 }
];

// ts/util/game/main.ts
var Main = class extends Div {
  constructor(container) {
    super({
      classNames: ["main"],
      size: ["100%", "100%"]
    });
    window["$"] = {
      get size() {
        return new Vector2(window.innerWidth, window.innerHeight);
      },
      main: this,
      frame: 0,
      time: 0,
      get intervalMultiplier() {
        return container.ticker.currentFPS / 60;
      },
      transitions: container.transitions
    };
  }
};

// ts/util/game/ticker.ts
var Ticker = class {
  constructor() {
    this.animationFrameId = null;
    this.callbacks = /* @__PURE__ */ new Set();
    this.startTime = 0;
    this.lastFrameTime = 0;
    this.frameCount = 0;
    this.isRunning = false;
  }
  /**
   * Starts the ticker using requestAnimationFrame
   */
  start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.startTime = performance.now();
    this.lastFrameTime = this.startTime;
    this.frameCount = 0;
    this.tick();
  }
  /**
   * Stops the ticker
   */
  stop() {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  /**
   * Adds a callback to be called on each tick
   */
  addCallback(callback) {
    this.callbacks.add(callback);
  }
  /**
   * Removes a callback
   */
  removeCallback(callback) {
    this.callbacks.delete(callback);
  }
  /**
   * Removes all callbacks
   */
  clearCallbacks() {
    this.callbacks.clear();
  }
  /**
   * Gets the current average frame rate based on elapsed time and frame count
   */
  get currentFPS() {
    if (!this.isRunning || this.frameCount === 0) {
      return 0;
    }
    const elapsedSeconds = (performance.now() - this.startTime) / 1e3;
    return this.frameCount / elapsedSeconds;
  }
  /**
   * Gets whether the ticker is currently running
   */
  get running() {
    return this.isRunning;
  }
  /**
   * Gets the current frame count
   */
  get currentFrameCount() {
    return this.frameCount;
  }
  /**
   * Gets the total elapsed time since start in milliseconds
   */
  get elapsedTime() {
    if (!this.isRunning) {
      return 0;
    }
    return performance.now() - this.startTime;
  }
  tick() {
    if (!this.isRunning) {
      return;
    }
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;
    const elapsedTime = currentTime - this.startTime;
    this.frameCount++;
    this.lastFrameTime = currentTime;
    this.callbacks.forEach((callback) => {
      callback(deltaTime, elapsedTime, this.frameCount);
    });
    this.animationFrameId = requestAnimationFrame(() => {
      this.tick();
    });
  }
};
var ticker = new Ticker();

// ts/render/renderLayer.ts
var RenderLayer = class extends Div {
  constructor(element, depth, options = {}) {
    super();
    this.element = element;
    this._opacity = 1;
    this.append(element);
    this.opacity = 1;
    this.depth = depth;
    this.setOptions(options);
  }
  get depth() {
    return this._depth;
  }
  set depth(value) {
    this._depth = value;
    this.style("z-index: ".concat(this._depth, ";"));
  }
  get opacity() {
    return this._opacity;
  }
  set opacity(value) {
    if (value !== this._opacity) {
      this._opacity = value;
      this.style("opacity: ".concat(value));
    }
  }
  setOptions(options) {
    if (options.transition) {
      this.style("transition: opacity ".concat(options.transition, "s ease-in-out;"));
    }
  }
};

// ts/util/math/timeEaser.ts
function timeEaser(value, keyframes, range = 1) {
  if (keyframes.length === 0) {
    return 0;
  }
  if (keyframes.length === 1) {
    return keyframes[0][1];
  }
  const sorted = [...keyframes].sort((a, b) => a[0] - b[0]);
  if (value <= sorted[0][0]) {
    return sorted[0][1];
  }
  if (value >= sorted[sorted.length - 1][0]) {
    return sorted[sorted.length - 1][1];
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    const [time1, val1] = sorted[i];
    const [time2, val2] = sorted[i + 1];
    if (time1 === time2) {
      if (value <= time1) {
        return val1;
      }
      continue;
    }
    if (value >= time1 && value <= time2) {
      const t = (value - time1) / (time2 - time1);
      return val1 + (val2 - val1) * t;
    }
  }
  return sorted[sorted.length - 1][1];
}

// ts/logic/scene/ship/ship.ts
var ShipTheme = class {
  constructor(layers, time, managers, scale = 0.35, layer = "ship") {
    this.time = time;
    this.managers = managers;
    this._open = 0;
    this.layers = Object.fromEntries(Object.entries(layers).map(([layer2, image]) => {
      const div = new Div({
        background: {
          image: "dist/images/ship/".concat(image, ".png"),
          type: "image"
        },
        scale: new Vector2(scale, scale),
        style: "opacity: 1; transition: opacity 0.1s ease-in-out;",
        size: new Vector2(3840, 3200),
        position: new Vector2(300, -120)
      });
      return [layer2, {
        div,
        renderLayer: new RenderLayer(div, 40)
      }];
    }));
    this.managers.renderer.add(this.layers.int0.renderLayer, layer, 0);
    this.managers.renderer.add(this.layers.int1.renderLayer, layer, 10);
    this.managers.renderer.add(this.layers.int2.renderLayer, layer, 20);
    this.managers.renderer.add(this.layers.int3.renderLayer, layer, 30);
    this.managers.renderer.add(this.layers.overlay.renderLayer, layer, 40);
    this.managers.renderer.add(this.layers.ext.renderLayer, layer, 100);
    this.setTime(0);
  }
  setTime(time) {
    let opacity = timeEaser(time % 24, this.time, 24);
    this.layers.ext.renderLayer.opacity = 0;
    this.layers.int1.renderLayer.opacity = opacity;
    this.layers.int2.renderLayer.opacity = opacity;
    this.layers.int3.renderLayer.opacity = opacity;
    this.layers.overlay.renderLayer.opacity = (1 - this.open) * opacity;
  }
  get open() {
    return this._open;
  }
  set open(value) {
    this._open = value;
  }
};
var Ship = class {
  constructor(managers, scale = 0.35, layer = "ship") {
    this.managers = managers;
    this._open = false;
    this.night = new ShipTheme(
      { int0: "1_int0", int1: "1_int1", int2: "1_int2", int3: "1_int3", overlay: "1_rail", ext: "1_ext" },
      [[6, 1], [7, 0], [17, 0], [18, 1]],
      this.managers,
      scale,
      layer
    );
    this.morning = new ShipTheme(
      { int0: "2_int0", int1: "2_int1", int2: "2_int2", int3: "2_int3", overlay: "2_rail", ext: "2_ext" },
      [[6, 0], [7, 1], [12, 1], [14, 0]],
      this.managers,
      scale,
      layer
    );
    this.day = new ShipTheme(
      { int0: "0_int0", int1: "0_int1", int2: "0_int2", int3: "0_int3", overlay: "0_rail", ext: "0_ext" },
      [[12, 0], [14, 1], [17, 1], [18, 0]],
      this.managers,
      scale,
      layer
    );
  }
  setTime(time) {
    this.night.setTime(time % 24);
    this.morning.setTime(time % 24);
    this.day.setTime(time % 24);
  }
  get open() {
    return this._open;
  }
  set open(value) {
    this._open = value;
    this.day.open = Number(value);
    this.night.open = Number(value);
    this.morning.open = Number(value);
  }
};

// ts/util/math/util.ts
var Utils = class {
  static easeColor(interval, from, to) {
    return "rgba(".concat(from[0] * interval + to[0] * (1 - interval), ", ").concat(from[1] * interval + to[1] * (1 - interval), ", ").concat(from[2] * interval + to[2] * (1 - interval), ", ").concat(from[3] * interval + to[3] * (1 - interval), ")");
  }
  static colorToArray(color) {
    const match = color.match(/^rgba?\((\d+),(\d+),(\d+),?(\d*)?\)$/);
    if (!match) {
      throw new Error("Invalid color: ".concat(color));
    }
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), match[4] ? parseInt(match[4]) : 1];
  }
};

// ts/logic/scene/backgrounds/horizon.ts
var Horizon = class extends Div {
  constructor(managers) {
    super({
      position: new Vector2(0, 1080 - 150 - 150),
      size: ["3000px", "150px"],
      background: {
        color: "rgb(28 42 58 / 85%)"
      }
    });
    this.managers = managers;
    this.managers.renderer.add(this, "bg", 40);
    this.overlay = this.managers.renderer.add(new Div({
      position: new Vector2(0, 1080 - 150),
      size: ["3000px", "150px"],
      background: {
        color: "rgb(28 42 58 / 85%)"
      }
    }), "overlay", 40);
  }
  setTime(time) {
    this.overlay.element.background({
      color: Utils.easeColor(timeEaser(time % 24, [
        [7, 1],
        [12, 0],
        [15, 0],
        [20, 1]
      ], 24), [28, 42, 58, 1], [90, 130, 180, 1])
    });
    this.background({
      color: Utils.easeColor(timeEaser(time % 24, [
        [7, 1],
        [12, 0],
        [15, 0],
        [20, 1]
      ], 24), [28, 42, 58, 1], [90, 130, 180, 1])
    });
  }
};

// ts/logic/scene/backgrounds/moon.ts
var Moon = class extends Div {
  constructor(managers) {
    super({
      size: ["3000px", "800px"],
      style: "overflow: hidden;"
    });
    this.managers = managers;
    this.moon = new Div({
      size: ["90px", "90px"],
      background: {
        color: "rgb(255, 255, 255)"
      },
      anchor: new Vector2(45, 45),
      style: "position: absolute; border-radius: 50%; filter: drop-shadow(0 0 50px rgb(255, 255, 255)) blur(1px); margin-top: -45px; margin-left: -45px; "
    });
    this.managers.renderer.add(this, "bg", 35);
    this.append(this.moon);
    this.reflectionWrap = new Div({
      size: ["3000px", "300px"],
      position: new Vector2(0, 1080 - 300),
      style: "overflow: hidden;"
    });
    this.reflection = new Div({
      size: ["180px", "180px"],
      background: {
        color: "rgba(255, 255, 255, 0.36)"
      },
      anchor: new Vector2(90, 90),
      style: "position: absolute; border-radius: 50%; filter: drop-shadow(0 0 300px rgb(255, 255, 255)) blur(200px) ; margin-top: -90px; margin-left: -90px; "
    });
    this.reflectionWrap.append(this.reflection);
    this.managers.renderer.add(this.reflectionWrap, "overlay", 50);
    this.overlay = this.managers.renderer.add(new Div({
      size: new Vector2(3e3, 3e3),
      position: new Vector2(-1080 / 2, -1920 / 2),
      background: {
        type: "linear",
        colors: [
          { color: "rgba(255, 255, 255, 0.4)", position: "20%" },
          { color: "rgba(255, 255, 255, 0)", position: "80%" }
        ],
        direction: "to right"
      },
      anchor: new Vector2(1500, 1500)
    }), "overlay", 60);
  }
  setTime(time) {
    const p = new Vector2(0, -1e3).rotate(time * 360 / 24).add(new Vector2(1920, 1080).divide(2)).add(new Vector2(0, 300));
    this.moon.transform.setPosition(p);
    const p2 = p.multiply(new Vector2(1, -1)).add(new Vector2(0, 700));
    let o = 1 - (p2.y - 300) / 600;
    this.reflection.transform.setPosition(p2);
    this.reflection.style("opacity: ".concat(o, ";"));
    this.overlay.element.transform.setRotation(time / 24 * 360 + 90);
    const opacity = timeEaser(time % 24, [
      [0, 0.7],
      [5, 1],
      [6, 0],
      [18, 0],
      [19, 1],
      [24, 0.7]
    ], 24);
    this.overlay.opacity = opacity;
  }
};

// ts/logic/scene/backgrounds/sun.ts
var Sun = class extends Div {
  constructor(managers) {
    super({
      size: ["3000px", "800px"],
      style: "overflow: hidden;"
    });
    this.managers = managers;
    this.sun = new Div({
      size: ["200px", "200px"],
      background: {
        color: "rgba(244, 244, 73, 0.3)"
      },
      anchor: new Vector2(100, 100),
      style: "position: absolute; border-radius: 50%; filter: drop-shadow(0 0 100px rgba(244, 244, 73, 1)) blur(10px); margin-top: -100px; margin-left: -100px; "
    });
    this.managers.renderer.add(this, "bg", 30);
    this.append(this.sun);
    this.reflectionWrap = new Div({
      size: ["3000px", "300px"],
      position: new Vector2(0, 1080 - 300),
      style: "overflow: hidden;"
    });
    this.reflection = new Div({
      size: ["500px", "500px"],
      background: {
        color: "rgba(244, 244, 73, 0.36)"
      },
      anchor: new Vector2(90, 90),
      style: "position: absolute; border-radius: 50%; filter: blur(300px) ; margin-top: -250px; margin-left: -250px; "
    });
    this.reflectionWrap.append(this.reflection);
    this.managers.renderer.add(this.reflectionWrap, "overlay", 50);
    this.overlay = this.managers.renderer.add(new Div({
      size: new Vector2(3e3, 3e3),
      position: new Vector2(-1080 / 2, -1920 / 2),
      background: {
        type: "linear",
        colors: [
          { color: "rgba(244, 237, 147, 0.3)", position: "0%" },
          { color: "rgba(245, 239, 64, 0)", position: "100%" }
        ],
        direction: "to right"
      },
      anchor: new Vector2(1500, 1500)
    }), "overlay", 59);
  }
  setTime(time) {
    const p = new Vector2(0, 1e3).rotate(time * 360 / 24).add(new Vector2(1920, 1080).divide(2)).add(new Vector2(0, 300));
    this.sun.transform.setPosition(p);
    const p2 = p.multiply(new Vector2(1, -1)).add(new Vector2(0, 700));
    let o = 1 - (p2.y - 100) / 400;
    this.reflection.transform.setPosition(p2);
    this.reflection.style("opacity: ".concat(o, ";"));
    this.overlay.element.transform.setRotation(time / 24 * 360 - 90);
    const opacity = timeEaser(time % 24, [
      [6, 0],
      [7, 1],
      [12.5, 0.5],
      [17, 1],
      [18, 0]
    ], 24);
    this.overlay.opacity = opacity;
  }
};

// ts/logic/scene/backgrounds/sky.ts
var Sky = class extends Div {
  constructor(managers) {
    super({
      size: ["3000px", "1080px"],
      background: {
        color: "blue"
      }
    });
    this.managers = managers;
    this.managers.renderer.add(this, "bg", 25);
    this.sun = new Sun(this.managers);
    this.moon = new Moon(this.managers);
    this.horizon = new Horizon(this.managers);
    this.setTime(15);
  }
  setTime(time) {
    const color = Utils.easeColor(timeEaser(time % 24, [
      [5, 0],
      [9, 1],
      [15, 1],
      [19, 0]
    ], 24), [173, 202, 251, 1], [10, 20, 30, 1]);
    this.background({
      color
    });
    window.document.body.style.backgroundColor = color;
    this.sun.setTime(time);
    this.moon.setTime(time);
    this.horizon.setTime(time);
  }
};

// ts/util/math/math.ts
var MathUtil = class {
  static max(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a > b ? a : b;
    } else if (a instanceof Vector2 && b instanceof Vector2) {
      return new Vector2(
        a.x > b.x ? a.x : b.x,
        a.y > b.y ? a.y : b.y
      );
    }
    throw new Error("Invalid max arguments: both arguments must be either numbers or Vector2 objects");
  }
  static min(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a < b ? a : b;
    } else if (a instanceof Vector2 && b instanceof Vector2) {
      return new Vector2(
        a.x < b.x ? a.x : b.x,
        a.y < b.y ? a.y : b.y
      );
    }
    throw new Error("Invalid min arguments: both arguments must be either numbers or Vector2 objects");
  }
  static clamp(value, min, max) {
    if (typeof value === "number" && typeof min === "number" && typeof max === "number") {
      return this.max(min, this.min(value, max));
    } else if (value instanceof Vector2 && min instanceof Vector2 && max instanceof Vector2) {
      return new Vector2(
        this.max(min.x, this.min(value.x, max.x)),
        this.max(min.y, this.min(value.y, max.y))
      );
    }
    throw new Error("Invalid clamp arguments: all arguments must be either numbers or Vector2 objects");
  }
  static lerp(a, b, t) {
    if (typeof a === "number" && typeof b === "number") {
      return a + (b - a) * t;
    } else if (a instanceof Vector2 && b instanceof Vector2) {
      return new Vector2(
        a.x + (b.x - a.x) * t,
        a.y + (b.y - a.y) * t
      );
    }
    throw new Error("Invalid lerp arguments: a and b must be either both numbers or both Vector2 objects");
  }
};

// ts/render/renderer.ts
var Renderer = class extends Div {
  constructor(wrappers) {
    super({
      size: new Vector2(1920, 1080),
      classNames: ["renderer"],
      style: "transition: transform 0.05s ease-in-out;"
    });
    this.zoomData = {
      value: 1,
      position: new Vector2(0.5, 0.5)
    };
    this.wrappers = {};
    Object.entries(wrappers).forEach(([name, depth]) => {
      const div = new Div({
        classNames: [name],
        style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      });
      this.wrappers[name] = {
        div,
        depth
      };
      div.style("z-index: ".concat(depth, ";"));
      this.append(this.wrappers[name].div);
    });
  }
  add(element, wrapperName, depth, options) {
    let layer;
    if (element instanceof RenderLayer) {
      layer = element;
      if (depth !== void 0) {
        layer.depth = depth;
      }
      if (options) {
        layer.setOptions(options);
      }
    } else {
      layer = new RenderLayer(element, depth != null ? depth : 0, options);
    }
    this.wrappers[wrapperName].div.append(layer);
    return layer;
  }
  getWrapper(wrapperName) {
    return this.wrappers[wrapperName].div;
  }
  resize() {
    super.resize();
    this.setPanZoom(void 0, void 0, void 0, true);
  }
  setPanZoom(x = this.zoomData.position.x, y = this.zoomData.position.y, zoom = this.zoomData.value, force = false) {
    if (!force && x === this.zoomData.position.x && y === this.zoomData.position.y && zoom === this.zoomData.value) {
      return;
    }
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080) * zoom;
    const offset = new Vector2(1920 * (zoom - 1), 1080 * (zoom - 1)).multiply(new Vector2(x, y).multiply(-1));
    this.transform.setScale(scale);
    this.transform.setPosition(offset);
    this.zoomData.value = zoom;
    this.zoomData.position = new Vector2(x, y);
  }
  pan(x = 0, y = 0) {
    if (x === 0 && y === 0) {
      return;
    }
    this.setPanZoom(this.zoomData.position.x + x, this.zoomData.position.y + y);
  }
  zoom(v) {
    this.setPanZoom(void 0, void 0, MathUtil.clamp(this.zoomData.value + v, 1, 5));
  }
};

// ts/logic/logicManager.ts
var LogicManager = class _LogicManager extends Main {
  constructor(container, classes, peopleData = () => []) {
    super(container);
    this.container = container;
    this.classes = classes;
    this.peopleData = peopleData;
    this.values = {
      secondsPerDay: 50
    };
    this.managers = {
      mapManager: null,
      peopleManager: null,
      routeManager: null,
      renderer: new Renderer({
        bg: 10,
        world: 20,
        shipBG: 25,
        ship: 30,
        overlay: 30,
        ui: 40
      })
    };
    this.timeOffset = 0;
    container.append(this.managers.renderer);
    this.sky = new Sky(this.managers);
    this.shipBG = new Ship(this.managers, 0.2, "shipBG");
    this.ship = new Ship(this.managers);
    this.mapManager = new MapManager(this.managers, mapLocations, mapConnections);
    this.peopleManager = new PeopleManager(
      this.managers,
      this.peopleData(this.mapManager),
      this.classes.Person
    );
    this.managers.mapManager = this.mapManager;
    this.managers.peopleManager = this.peopleManager;
    this.managers.routeManager = this.mapManager.routeManager;
    this.mapManager.build();
    this.peopleManager.build();
    this.managers.renderer.add(this.peopleManager.dom, "ui", 1);
    this.managers.renderer.add(this.mapManager.dom, "ship", 90);
    this.peopleManager.dom.visible = false;
    this.ticker = new Ticker().addCallback(this.tick.bind(this));
    this.shipLayer = this.managers.renderer.getWrapper("ship");
    this.shipLayer.transform.setAnchor(new Vector2(1920 / 2, 800));
    this.shipBGLayer = this.managers.renderer.getWrapper("shipBG");
    this.shipBGLayer.transform.setAnchor(new Vector2(1920 / 2, 800));
    this.shipBGLayer.visible = false;
    this.shipBGLayer.style("height: 480px; overflow: hidden;");
  }
  setup() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("spd"))
      this.values.secondsPerDay = parseInt(urlParams.get("spd"));
    if (urlParams.get("ship"))
      this.shipBGLayer.visible = true;
    if (urlParams.get("zoom") !== null)
      this.managers.renderer.setPanZoom(void 0, void 0, parseInt(urlParams.get("zoom")));
    if (urlParams.get("x") !== null)
      this.managers.renderer.setPanZoom(parseInt(urlParams.get("x")) / 10);
    if (urlParams.get("y") !== null)
      this.managers.renderer.setPanZoom(void 0, parseInt(urlParams.get("y")) / 10);
    if (urlParams.get("open") !== null)
      this.ship.open = Boolean(urlParams.get("open"));
    if (urlParams.get("time") !== null)
      this.timeOffset = 0 - _LogicManager.timeToMs((parseInt(urlParams.get("time")) - 1) / 9 * 24, this.values.secondsPerDay);
    if (urlParams.get("debug") !== null) {
      this.mapManager.mapSvg.visible = true;
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "s") {
        this.peopleManager.dom.visible = !this.peopleManager.dom.visible;
      }
      if (e.key === " ") {
        this.ship.open = !this.ship.open;
      }
      if (e.key === "o") {
        this.shipBGLayer.visible = !this.shipBGLayer.visible;
      }
      if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
        this.timeOffset = $.time - _LogicManager.timeToMs((parseInt(e.key) - 1) / 9 * 24, this.values.secondsPerDay);
      }
      if (e.key === "z") {
        this.managers.renderer.zoom(0.1);
      }
      if (e.key === "x") {
        this.managers.renderer.zoom(-0.1);
      }
      if (e.key === "ArrowLeft") {
        this.managers.renderer.pan(-0.02, 0);
      }
      if (e.key === "ArrowRight") {
        this.managers.renderer.pan(0.02, 0);
      }
      if (e.key === "ArrowUp") {
        this.managers.renderer.pan(0, -0.02);
      }
      if (e.key === "ArrowDown") {
        this.managers.renderer.pan(0, 0.02);
      }
    });
    this.container.dom.addEventListener("resize", () => {
      this.managers.renderer.resize();
    });
  }
  setTime(time) {
    this.peopleManager.setTime(time);
    this.ship.setTime(time);
    this.shipBG.setTime(time);
    this.sky.setTime(time);
    const waveRotation = 1;
    const waveTime = 1e3;
    const waveHeight = 10;
    const wave = Math.sin($.time / waveTime);
    const wave2 = Math.sin(($.time - 800) / 1e3);
    this.shipLayer.transform.setRotation(wave * waveRotation);
    this.shipLayer.transform.setPosition(0, wave2 * waveHeight);
    const waveRotationBG = 1;
    const waveTimeBG = 500;
    const waveHeightBG = 5;
    const waveBG = Math.sin(($.time + 2e3) / waveTime);
    const wave2BG = Math.sin(($.time + 2e3 - 800) / 1e3);
    this.shipBGLayer.transform.setRotation(waveBG * waveRotationBG);
    this.shipBGLayer.transform.setPosition(700, wave2BG * waveHeightBG + 350);
  }
  static msToTime(ms, secondsPerDay) {
    return ms * 24 / 1e3 / secondsPerDay;
  }
  static timeToMs(time, secondsPerDay) {
    return secondsPerDay * 1e3 / 24 * (time % 24);
  }
  tick() {
    this.setTime((_LogicManager.msToTime($.time - this.timeOffset, this.values.secondsPerDay) + 24) % 24);
  }
};

// ts/util/game/transitions/transitionBase.ts
var TransitionIn = class extends Div {
  constructor(defaultSettings) {
    super({
      classNames: ["transition-in"],
      size: ["100%", "100%"]
    });
    this.defaultSettings = defaultSettings;
    this.active = false;
  }
  get active() {
    return this._active;
  }
  set active(value) {
    this._active = value;
    this.visible = value;
  }
  trigger(from, to, via, settings, settingsOut) {
    this.startTime = $.time;
    this.data = {
      from,
      to,
      via,
      settings,
      settingsOut
    };
    this.applySettings(settings);
    this.active = true;
  }
  applySettings(settings) {
    this.duration = (settings == null ? void 0 : settings.duration) || this.defaultSettings.duration;
  }
  tick() {
    if (this.active) {
      const p = ($.time - this.startTime) / this.duration;
      this.progress = Math.min(p, 1);
      if (p >= 1) {
        this.active = false;
        this.progress = 0;
        if (this.data.from) {
          this.data.from.visible = false;
        }
        if (this.data.via) {
          this.data.via.trigger(this.data.to, this.data.settingsOut);
        }
      }
    }
  }
};
var TransitionOut = class extends Div {
  constructor(defaultSettings) {
    super({
      classNames: ["transition-out"],
      size: ["100%", "100%"]
    });
    this.defaultSettings = defaultSettings;
    this.active = false;
  }
  get active() {
    return this._active;
  }
  set active(value) {
    this._active = value;
    this.visible = value;
  }
  trigger(to, settings) {
    this.startTime = $.time;
    this.data = {
      to,
      settings
    };
    this.applySettings(settings);
    this.active = true;
    if (to) {
      to.visible = true;
    }
  }
  applySettings(settings) {
    this.duration = (settings == null ? void 0 : settings.duration) || this.defaultSettings.duration;
  }
  tick() {
    if (this.active) {
      const p = ($.time - this.startTime) / this.duration;
      this.progress = Math.min(p, 1);
      if (p >= 1) {
        this.active = false;
        this.progress = 0;
      }
    }
  }
};

// ts/util/game/transitions/transitionFade.ts
var TransitionInFade = class extends TransitionIn {
  set progress(value) {
    this.cover.style("opacity: ".concat(value, ";"));
  }
  constructor() {
    super({ duration: 400, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};
var TransitionOutFade = class extends TransitionOut {
  set progress(value) {
    this.cover.style("opacity: ".concat(1 - value, ";"));
  }
  constructor() {
    super({ duration: 400, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};

// ts/util/game/transitions/transitionInstant.ts
var TransitionInInstant = class extends TransitionIn {
  set progress(value) {
    this.cover.style("opacity: ".concat(value >= 1 ? 0 : 1, ";"));
  }
  constructor() {
    super({ duration: 0, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};
var TransitionOutInstant = class extends TransitionOut {
  set progress(value) {
    this.cover.style("opacity: ".concat(value >= 1 ? 0 : 1, ";"));
  }
  constructor() {
    super({ duration: 0, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};

// ts/util/math/ease.ts
var Ease = class {
  static easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  static easeIn(t) {
    return t * t;
  }
  static easeOut(t) {
    return 1 - (1 - t) * (1 - t);
  }
};

// ts/util/game/transitions/transitionWipe.ts
var TransitionInWipeLeft = class extends TransitionIn {
  set progress(value) {
    this.cover.style("transform: translateX(".concat((1 - Ease.easeIn(value)) * 100, "%);"));
  }
  constructor() {
    super({ duration: 800, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};
var TransitionOutWipeLeft = class extends TransitionOut {
  set progress(value) {
    this.cover.style("transform: translateX(".concat(Ease.easeOut(value) * -100, "%);"));
  }
  constructor() {
    super({ duration: 800, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: "black"
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};
var TransitionInWipeRight = class extends TransitionIn {
  set progress(value) {
    this.cover.style("transform: translateX(".concat((1 - Ease.easeIn(value)) * -100, "%);"));
  }
  constructor() {
    super({ duration: 800, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: this.defaultSettings.color
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || this.defaultSettings.color, ";"));
  }
};
var TransitionOutWipeRight = class extends TransitionOut {
  set progress(value) {
    this.cover.style("transform: translateX(".concat(Ease.easeOut(value) * 100, "%);"));
  }
  constructor() {
    super({ duration: 800, color: "black" });
    this.cover = new Div({
      size: ["100%", "100%"],
      background: "black"
    });
    this.append(this.cover);
  }
  applySettings(settings) {
    super.applySettings(settings);
    this.cover.style("background: ".concat((settings == null ? void 0 : settings.color) || "black", ";"));
  }
};

// ts/util/game/transitions/transitionLibrary.ts
var Transitions = class extends Div {
  constructor() {
    super({
      classNames: ["transitions"],
      size: ["100%", "100%"],
      style: " z-index: 100; pointer-events: none;"
    });
    this.IN = {
      FADE: new TransitionInFade(),
      WIPELEFT: new TransitionInWipeLeft(),
      WIPERIGHT: new TransitionInWipeRight(),
      INSTANT: new TransitionInInstant()
    };
    this.OUT = {
      FADE: new TransitionOutFade(),
      WIPELEFT: new TransitionOutWipeLeft(),
      WIPERIGHT: new TransitionOutWipeRight(),
      INSTANT: new TransitionOutInstant()
    };
    [...Object.values(this.IN), ...Object.values(this.OUT)].forEach((transition) => {
      this.append(transition);
      transition.active = false;
      transition.progress = 0;
    });
  }
  trigger({
    from,
    to,
    inTransition,
    inSettings,
    outTransition,
    outSettings
  }) {
    inTransition.trigger(from, to, outTransition, inSettings, outSettings);
  }
};

// ts/util/game/container.ts
var Container = class extends Div {
  constructor() {
    super({
      classNames: ["container"],
      style: "width: 100%; height: 100%; overflow: hidden;"
    });
    this.ticker = new Ticker();
    this.ticker.addCallback(this.tick.bind(this));
    this.append(this.transitions = new Transitions());
    window.addEventListener("resize", this.resize.bind(this));
  }
  resize() {
    super.resize();
  }
  tick() {
    $.frame++;
    $.time = this.ticker.elapsedTime;
    super.tick();
  }
  start() {
    this.ticker.start();
    this.resize();
  }
};

// ts/util/html/sprite.ts
var Sprite = class extends Div {
  constructor(options) {
    super(__spreadValues({
      size: options.size,
      background: {
        type: "image",
        image: options.image,
        size: "".concat(options.size.x * options.columns, "px ").concat(options.size.y * options.rows, "px"),
        repeat: "no-repeat"
      },
      style: "transform-origin: ".concat(options.size.x * options.columns / 2, "px ").concat(options.size.y * options.rows / 2, "px; image-rendering: pixelated;")
    }, options));
    this.max = options.columns * options.rows;
    this.options = options;
    this.value = options.value || 0;
  }
  getSize() {
    return new Vector2(this.options.size.x * this.options.columns, this.options.size.y * this.options.rows);
  }
  set value(value) {
    this._value = Math.floor(value % this.max);
    let column = this._value % this.options.columns;
    let row = Math.floor(this._value / this.options.columns);
    this.style("background-position-x: -".concat(this.options.size.x * column, "px; background-position-y: -").concat(this.options.size.y * row, "px;"));
  }
  set factor(factor) {
    this.value = MathUtil.clamp(factor, 0, 1) * (this.max - 1);
  }
};

// ts/visuals/character.ts
var Character = class extends Div {
  constructor(data) {
    super({
      scale: new Vector2(0.75, 0.75)
    });
    this.data = data;
    this.layers = [];
    const skin = new Sprite({
      image: "dist/images/Character_skin_colors/".concat(data.skin, ".png"),
      size: new Vector2(100, 64),
      columns: 10,
      rows: 7,
      value: 0,
      position: new Vector2(15, 19)
    });
    this.layers.push(skin);
    this.append(skin);
    this.data.layers.forEach((d) => {
      const layer = new Sprite({
        image: "dist/images/".concat(d, ".png"),
        size: new Vector2(100, 64),
        columns: 10,
        rows: 7,
        value: 0,
        position: new Vector2(15, 19)
      });
      this.layers.push(layer);
      this.append(layer);
    });
  }
  set value(value) {
    var _a;
    (_a = this.layers) == null ? void 0 : _a.forEach((layer) => {
      layer.value = value;
    });
  }
  get value() {
    return this.layers[0].value;
  }
};

// ts/visuals/visualPeople.ts
function getVisualPeople(mapManager) {
  return [
    {
      name: "Dave",
      tasks: [
        new EatTask({ start: 0, end: 1, location: mapManager.getLocation("deck4") }),
        new EngineTask({ start: 2, end: 10, location: mapManager.getLocation("deck1Wheel") }),
        new EatTask({ start: 10, end: 11, location: mapManager.getLocation("deck3") }),
        new SleepTask({ start: 15, end: 23, location: mapManager.getLocation("orlop4") }),
        new EatTask({ start: 23, end: 24, location: mapManager.getLocation("deck4") })
      ],
      character: new Character({
        skin: "Male_Skin1",
        layers: [
          "Male_Hair/Male_Hair1",
          "Male_Clothing/Boots",
          "Male_Clothing/Shirt",
          "Male_Clothing/Pants"
        ]
      }),
      offset: new Vector2(0, 0)
    },
    {
      name: "Jane",
      tasks: [
        new SleepTask({ start: 0, end: 7, location: mapManager.getLocation("orlop3") }),
        new EngineTask({ start: 10, end: 18, location: mapManager.getLocation("deck1Wheel") }),
        new ShowerTask({ start: 18, end: 19, location: mapManager.getLocation("deck0showers") }),
        new EatTask({ start: 19, end: 21, location: mapManager.getLocation("deck4") }),
        new SleepTask({ start: 23, end: 24, location: mapManager.getLocation("orlop3") })
      ],
      character: new Character({
        skin: "Female_Skin2",
        layers: [
          "Female_Hair/Female_Hair4",
          "Female_Clothing/Corset",
          "Female_Clothing/Boots",
          "Female_Clothing/Skirt"
        ]
      }),
      offset: new Vector2(10, -15)
    },
    {
      name: "Andrew",
      tasks: [
        new EngineTask({ start: 0, end: 2, location: mapManager.getLocation("deck1Wheel") }),
        new SleepTask({ start: 2, end: 10, location: mapManager.getLocation("orlop4") }),
        new ShowerTask({ start: 10, end: 11, location: mapManager.getLocation("deck0showers") }),
        new EatTask({ start: 12, end: 14, location: mapManager.getLocation("deck4") }),
        new EngineTask({ start: 18, end: 24, location: mapManager.getLocation("deck1Wheel") })
      ],
      character: new Character({
        skin: "Male_Skin3",
        layers: [
          "Male_Hair/Male_Hair3",
          "Male_Clothing/Boots",
          "Male_Clothing/Green_Shirt_v2",
          "Male_Clothing/Pants"
        ]
      }),
      offset: new Vector2(-15, 10)
    },
    {
      name: "Tim",
      tasks: [
        new SleepTask({ start: 0, end: 6, location: mapManager.getLocation("orlop8") }),
        new EatTask({ start: 7, end: 9, location: mapManager.getLocation("deck4") }),
        new WorkTask({ start: 9, end: 10, location: mapManager.getLocation("deck2") }),
        new WorkTask({ start: 10, end: 11, location: mapManager.getLocation("deck3") }),
        new WorkTask({ start: 11, end: 12, location: mapManager.getLocation("deck4") }),
        new WorkTask({ start: 12, end: 13, location: mapManager.getLocation("deck5") }),
        new WorkTask({ start: 14, end: 15, location: mapManager.getLocation("orlop5") }),
        new WorkTask({ start: 15, end: 16, location: mapManager.getLocation("orlop4") }),
        new WorkTask({ start: 16, end: 17, location: mapManager.getLocation("orlop3") }),
        new WorkTask({ start: 17, end: 18, location: mapManager.getLocation("orlop2") }),
        new ShowerTask({ start: 21, end: 22, location: mapManager.getLocation("deck0showers") }),
        new SleepTask({ start: 22, end: 24, location: mapManager.getLocation("orlop8") })
      ],
      character: new Character({
        skin: "Male_Skin4",
        layers: [
          "Male_Clothing/Boots",
          "Male_Clothing/Pants"
        ]
      }),
      offset: new Vector2(-15, 10)
    }
  ];
}

// ts/logic/people/person.ts
var Person = class {
  constructor(managers, data, scheduleClass) {
    this.managers = managers;
    this.data = data;
    this.speed = 1e3;
    // pixels per hour
    this._phase = "idle";
    this.schedule = new scheduleClass(this.managers, this, {
      tasks: data.tasks
    });
    this.speed = data.speed || 1e3;
  }
  get phase() {
    return this._phase;
  }
  set phase(value) {
    this._phase = value;
  }
  build() {
    this.schedule.build();
    this.scheduleDom = new Div({
      position: new Vector2(0, 0),
      size: new Vector2(Schedule.TASK_WIDTH * 24, Schedule.TASK_HEIGHT),
      style: "box-sizing: border-box; position: absolute;"
    });
    this.scheduleDom.append(new Div({
      position: new Vector2(0, 0),
      size: new Vector2(100, Schedule.TASK_HEIGHT),
      text: this.data.name,
      style: 'display: flex; align-items: center; justify-content: center; font-size: 15px; font-family: "Arial", sans-serif; box-sizing: border-box; position: absolute; '
    }));
    this.scheduleDom.append(this.schedule.dom);
    this.characterDom = new Div({
      position: new Vector2(0, 0)
      // background: { color: 'white' },
      // style: 'box-sizing: border-box; position: absolute; border-radius: 50%; margin-left: -10px; margin-top: -10px; border: 2px solid black; box-sizing: border-box;',
    });
    this.renderLayer = this.managers.renderer.add(this.characterDom, "ship", 35);
  }
  setTime(time) {
    const info = this.schedule.getInfoAtTime(time);
    this.phase = info.phase;
    this.activeTask = info.task;
    const lastPosition = this.characterDom.transform.position;
    if (lastPosition.subtract(info.position).magnitude() > 0) {
      this.direction = info.position.subtract(lastPosition).normalise();
    } else {
      this.direction = void 0;
    }
    this.characterDom.transform.setPosition(info.position);
    this.renderLayer.depth = info.depth;
    this.schedule.setTime(time);
    this.tick();
  }
  tick() {
  }
};

// ts/visuals/schedule.ts
var VisualSchedule = class extends Schedule {
  constructor(managers, person, data = {}) {
    super(managers, person, data);
  }
  addTask(task) {
    if (task instanceof VisualTask) {
      this.taskList.push(task);
    } else {
      this.taskList.push(new VisualTask(task));
    }
  }
  createIdleTask(start, end, location) {
    return new IdleTask({
      start,
      end,
      location
    });
  }
};

// ts/visuals/visualPerson.ts
var PersonVisual = class extends Person {
  constructor(managers, data) {
    super(managers, data, VisualSchedule);
    this.data = data;
  }
  build() {
    super.build();
    this.characterDom.append(this.data.character);
    this.characterDom.transform.setPosition(this.data.offset);
  }
  tick() {
    super.tick();
    switch (this.phase) {
      case "travel":
        this.data.character.value = Math.floor($.time / 200 % 8) + 20;
        this.data.character.transform.setPosition(new Vector2(-50, -60));
        break;
      default:
      case "task":
        this.data.character.value = Math.floor($.time / this.activeTask.data.animationSpeed % this.activeTask.data.animationDuration) + this.activeTask.data.animationStart;
        this.data.character.transform.setPosition(this.activeTask.data.animationOffset.add(new Vector2(-50, -60)));
        break;
    }
    if (this.direction && this.direction.x !== 0) {
      if (this.direction.x < 0) {
        this.characterDom.transform.setScale(new Vector2(1, 1));
      } else {
        this.characterDom.transform.setScale(new Vector2(-1, 1));
      }
    }
  }
};

// ts/index.ts
document.addEventListener("DOMContentLoaded", async () => {
  const g = new Container();
  document.body.appendChild(g.dom);
  const manager = new LogicManager(g, { Person: PersonVisual }, getVisualPeople);
  g.append(manager);
  manager.setup();
  g.start();
});
//# sourceMappingURL=index.js.map
