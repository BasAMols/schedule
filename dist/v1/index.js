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
};

// ts/logic/tasks/prefabs.ts
var IdleTask = class extends Task {
  constructor({ start, end, location }) {
    super({ name: "", start, end, location, color: "white", priority: 0 });
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
    for (const travel of this.travels) {
      const position = travel.getTimePostion(time % 24);
      if (position) {
        return { phase: "travel", position, task: void 0 };
      }
    }
    const task = this.getTaskAtTime(time % 24);
    return { phase: "task", position: task.data.location.data.position, task };
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
    return segment.connection.getVector(delta);
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
    var _a;
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
  }
};

// ts/logic/map/mapManager.ts
var MapManager = class {
  constructor(managers, locations = {}, connections = []) {
    this.managers = managers;
    this.locations = {};
    this.mapConnections = [];
    for (const location of Object.entries(locations)) {
      this.locations[location[0]] = new MapLocation(this.managers, { name: location[0], position: location[1] });
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
      size: new Vector2(1e3, 1e3)
    });
    this.dom.append(this.mapSvg);
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
    this.dom = new Div({});
    this.people.forEach((person, index) => {
      person.build();
      this.dom.append(person.scheduleDom);
      person.scheduleDom.transform.setPosition(new Vector2(0, index * Schedule.TASK_HEIGHT));
      this.managers.mapManager.dom.append(person.characterDom);
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
  bedroom1: new Vector2(400 + 60, 250),
  bathroom1: new Vector2(400 + 60 + 60, 200),
  bedroom2: new Vector2(300, 300),
  bathroom2: new Vector2(300 - 60, 350),
  hallway1: new Vector2(400, 300),
  main: new Vector2(500, 300),
  work: new Vector2(600, 300),
  engine: new Vector2(500 - 60, 350)
};
var mapConnections = [
  {
    from: "main",
    to: "work",
    path: PathCreator(
      mapLocations.main,
      { point: mapLocations.work, controlA: mapLocations.main.add(new Vector2(60, -50)), controlB: mapLocations.work.add(new Vector2(60, -50)) }
    )
  },
  { from: "main", to: "engine" },
  { from: "main", to: "hallway1" },
  { from: "hallway1", to: "bedroom1" },
  { from: "hallway1", to: "bedroom2" },
  { from: "bedroom1", to: "bathroom1" },
  { from: "bedroom2", to: "bathroom2" }
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

// ts/logic/logicManager.ts
var _LogicManager = class _LogicManager extends Main {
  constructor(container, classes, peopleData = () => []) {
    super(container);
    this.container = container;
    this.classes = classes;
    this.peopleData = peopleData;
    this.managers = {
      mapManager: null,
      peopleManager: null,
      routeManager: null
    };
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
    this.container.append(this.mapManager.dom);
    this.container.append(this.peopleManager.dom);
    this.ticker = new Ticker().addCallback(this.tick.bind(this));
  }
  setup() {
  }
  setTime(time) {
    this.peopleManager.setTime(time + 150);
  }
  tick() {
    this.setTime($.time * 24 / 1e3 / _LogicManager.SECONDS_PER_DAY);
  }
};
_LogicManager.SECONDS_PER_DAY = 80;
var LogicManager = _LogicManager;

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
      style: "transform-origin: ".concat(options.size.x * options.columns / 2, "px ").concat(options.size.y * options.rows / 2, "px;")
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
var Character = class extends Sprite {
  constructor(data) {
    super({
      image: "dist/images/Character_skin_colors/".concat(data.skin, ".png"),
      size: new Vector2(100, 64),
      columns: 10,
      rows: 7,
      value: 0
    });
    this.data = data;
    this.layers = [];
    this.data.layers.forEach((d) => {
      const layer = new Sprite({
        image: "dist/images/".concat(d, ".png"),
        size: new Vector2(100, 64),
        columns: 10,
        rows: 7,
        value: 0
      });
      this.layers.push(layer);
      this.append(layer);
    });
  }
  set value(value) {
    var _a;
    super.value = value;
    (_a = this.layers) == null ? void 0 : _a.forEach((layer) => {
      layer.value = value;
    });
  }
  get value() {
    return super.value;
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
var IdleTask2 = class extends VisualTask {
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
      animationOffset: new Vector2(20, 0),
      animationSpeed: 1e3
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
      animationSpeed: 1e3
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
    super({ name: "Office", start, end, location, color: "#e1e1e1" });
  }
};
var WorkTask = class extends VisualTask {
  constructor({ start, end, location }) {
    super({ name: "Work", start, end, location, color: "#dcb1cd" });
  }
};

// ts/visuals/visualPeople.ts
function getVisualPeople(mapManager) {
  return [
    {
      name: "Dave",
      tasks: [
        new SleepTask({ start: 0, end: 7, location: mapManager.getLocation("bedroom1") }),
        new ShowerTask({ start: 7, end: 8, location: mapManager.getLocation("bathroom1") }),
        new EatTask({ start: 8, end: 9, location: mapManager.getLocation("main") }),
        new WorkTask({ start: 9, end: 12, location: mapManager.getLocation("work") }),
        new EngineTask({ start: 13, end: 17, location: mapManager.getLocation("engine") }),
        new ShowerTask({ start: 17, end: 18, location: mapManager.getLocation("bathroom1") }),
        new EatTask({ start: 18, end: 20, location: mapManager.getLocation("main") }),
        new SleepTask({ start: 23, end: 24, location: mapManager.getLocation("bedroom1") })
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
        new SleepTask({ start: 0, end: 6, location: mapManager.getLocation("bedroom1") }),
        new ShowerTask({ start: 6, end: 7, location: mapManager.getLocation("bathroom1") }),
        new EatTask({ start: 7, end: 8, location: mapManager.getLocation("main") }),
        new EngineTask({ start: 8, end: 11, location: mapManager.getLocation("engine") }),
        new WorkTask({ start: 12, end: 16, location: mapManager.getLocation("work") }),
        new ShowerTask({ start: 16, end: 17, location: mapManager.getLocation("bathroom1") }),
        new EatTask({ start: 17, end: 19, location: mapManager.getLocation("main") }),
        new SleepTask({ start: 21, end: 24, location: mapManager.getLocation("bedroom1") })
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
        new EngineTask({ start: 0, end: 3, location: mapManager.getLocation("engine") }),
        new ShowerTask({ start: 4, end: 5, location: mapManager.getLocation("bathroom2") }),
        new EatTask({ start: 5, end: 7, location: mapManager.getLocation("main") }),
        new SleepTask({ start: 8, end: 16, location: mapManager.getLocation("bedroom2") }),
        new EatTask({ start: 16, end: 17, location: mapManager.getLocation("main") }),
        new WorkTask({ start: 17, end: 20, location: mapManager.getLocation("work") }),
        new ShowerTask({ start: 20, end: 21, location: mapManager.getLocation("bathroom2") }),
        new EngineTask({ start: 22, end: 24, location: mapManager.getLocation("engine") })
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
    }
  ];
}

// ts/logic/people/person.ts
var Person = class {
  constructor(managers, data, scheduleClass) {
    this.managers = managers;
    this.data = data;
    this.speed = 500;
    // pixels per hour
    this._phase = "idle";
    this.schedule = new scheduleClass(this.managers, this, {
      tasks: data.tasks
    });
    this.speed = data.speed || 500;
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
    return new IdleTask2({
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
    this.characterDom.dom.style.zIndex = (2e3 - this.characterDom.transform.position.y).toString();
  }
};

// ts/index.ts
document.addEventListener("DOMContentLoaded", async () => {
  const g = new Container();
  document.body.appendChild(g.dom);
  g.append(new LogicManager(g, { Person: PersonVisual }, getVisualPeople));
  g.start();
});
//# sourceMappingURL=index.js.map
