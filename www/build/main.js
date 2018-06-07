webpackJsonp([0],{

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login__ = __webpack_require__(322);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__login_login__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_settings__ = __webpack_require__(402);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__settings_settings__["a"]; });

//export * from './contacts';

//export * from './invoices/invoices';
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 200:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 200;

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CacheControlObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CacheService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schema__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_utils__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var CacheControlObject = /** @class */ (function () {
    function CacheControlObject() {
    }
    return CacheControlObject;
}());

var CacheService = /** @class */ (function () {
    function CacheService(sjcl) {
        this.sjcl = sjcl;
        this.channels = [];
        this.fullChannels = [];
        this.newData = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["w" /* EventEmitter */](true);
        this.currentItemCount = -1;
        this.filteredItemCount = -1;
        this.fullItemCount = -2;
        this.isFull = false;
        this.curChannel = '&initial&';
    }
    /**
     * Unlock Database
     *
     * Unlocks the local SQLcipher database using a pbkdf2 of the provided passcode. If no passcode is
     * provided, it will use the cached sqlite code to unlock the database.
     *
     * @param passcode The unsalted code used to unlock the database
     * @returns Boolean on success / failure
     */
    CacheService.prototype.unlockDatabase = function (passcode, destroyExisting) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var code = (passcode) ?
                            _this.sjcl.hash(passcode + __WEBPACK_IMPORTED_MODULE_0__schema__["c" /* version */] + 'a8853jkhlafsasf783g' + ((typeof device !== 'undefined') ? device.uuid : 'blank')) :
                            localStorage.getItem('sqlite-code');
                        if (code === null || typeof sqlitePlugin === 'undefined') {
                            resolve(false);
                        }
                        var dbname = _this.sjcl.sha256(code);
                        var existingDb = localStorage.getItem('sqlite-db');
                        if (existingDb !== null && dbname !== existingDb && destroyExisting) {
                            sqlitePlugin.deleteDatabase({ name: existingDb + '.db', location: 'default' });
                        }
                        else if (existingDb !== null && dbname !== existingDb) {
                            resolve(false);
                        }
                        if (existingDb !== dbname) {
                            localStorage.setItem('sqlite-db', dbname);
                        }
                        if (code !== null) {
                            _this.db = sqlitePlugin.openDatabase({
                                name: dbname + '.db', key: code, location: 'default'
                            }, function (db) {
                                _this.db = db;
                                var tables = __WEBPACK_IMPORTED_MODULE_0__schema__["b" /* schemaSQL */].split(';');
                                for (var i = 0; i < tables.length; i++) {
                                    _this.db.executeSql(tables[i].replace('CREATE TABLE', 'CREATE TABLE IF NOT EXISTS'));
                                }
                                localStorage.setItem('sqlite-code', code);
                                resolve(true);
                            }, function (err) {
                                console.log('error');
                                console.log(err);
                                reject(false);
                            });
                        }
                    })];
            });
        });
    };
    CacheService.prototype.checkDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.db) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.unlockDatabase()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * execute
     *
     * Runs a SQLite query on the local database.
     */
    CacheService.prototype.execute = function (query, values) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkDb()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                _this.db.transaction(function (tx) {
                                    _this.db.executeSql(query, values, function (resultSet) {
                                        resolve(resultSet);
                                    }, function (err) {
                                        debugger;
                                        console.log('query error: ', err);
                                        reject(err);
                                    });
                                }, function (txError) {
                                    console.log('transaction error: ', txError);
                                    reject(txError.message);
                                });
                            })];
                }
            });
        });
    };
    /**
     * Create an object in local cache
     *
     * @param obj The object to save in the local cacher
     * @param objType The type name
     * @param pending Boolean based on whether or not the object has already saved successfully in the server
     */
    CacheService.prototype.create = function (obj, objType, pending) {
        return __awaiter(this, void 0, void 0, function () {
            var fields, newObj, field, createStmt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkDb()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        fields = __WEBPACK_IMPORTED_MODULE_0__schema__["a" /* schema */][objType]['properties'];
                        newObj = [undefined];
                        for (field in fields) {
                            if (field === 'cache_age') {
                                newObj.push(this.currentTime());
                            }
                            else if (field === 'pending_create' && pending) {
                                newObj.push(1);
                            }
                            else {
                                newObj.push(this.processField(field, obj, fields[field]));
                            }
                        }
                        createStmt = 'INSERT INTO ' + objType + ' VALUES (' + (newObj.map(function (a) { return '?'; }).join(',')) + ')';
                        return [4 /*yield*/, this.execute(createStmt, newObj)];
                    case 2: return [2 /*return*/, (_a.sent()).insertId];
                }
            });
        });
    };
    /**
     * Update an object in local cache
     *
     * @param obj Object changes (PATCH style)
     * @param objType The type name
     * @param id The ID of the object to update
     * @param idField The field name used to track the local id. Defaut: "local_id"
     */
    CacheService.prototype.update = function (obj, objType, id, idField) {
        return __awaiter(this, void 0, void 0, function () {
            var fields, newObj, fieldStr, addField, field, updateStmt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkDb()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        idField = (idField) ? idField : 'local_id';
                        fields = __WEBPACK_IMPORTED_MODULE_0__schema__["a" /* schema */][objType]['properties'];
                        newObj = [];
                        fieldStr = '';
                        addField = function (f) {
                            if (fieldStr !== '') {
                                fieldStr += ', ';
                            }
                            fieldStr += f + ' = ?';
                        };
                        for (field in fields) {
                            if (field === 'cache_age') {
                                newObj.push(this.currentTime());
                                addField(field);
                            }
                            else if (typeof obj[field] !== 'undefined') {
                                newObj.push(obj[field]);
                                addField(field);
                            }
                        }
                        updateStmt = 'UPDATE ' + objType + ' SET ' + fieldStr + ' WHERE ' + idField + '=\'' + id + '\'';
                        return [2 /*return*/, this.execute(updateStmt, newObj)];
                }
            });
        });
    };
    /**
     * Deletes an object from local cache.
     *
     * @param objType The type name
     * @param id The ID of the object to delete
     * @param idField The field name used to track the local id. Default: "local_id"
     */
    CacheService.prototype.delete = function (objType, id, idField) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteStmt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkDb()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        idField = (idField) ? idField : 'local_id';
                        deleteStmt = 'DELETE FROM ' + objType + ' WHERE ' + idField + '=\'' + id + '\'';
                        return [2 /*return*/, this.execute(deleteStmt, [])];
                }
            });
        });
    };
    /**
     * Updates and inserts a list of objects into local cache. Can perform both updates and inserts
     * in the same operation.
     *
     * @param objs An array of objects to update/insert into local cache.
     * @param objType The type name.
     */
    CacheService.prototype.batchUpsert = function (objs, objType) {
        return __awaiter(this, void 0, void 0, function () {
            var toCreate, toUpdate, toUpdateLocalId, valSet, existing, idSet, resultSet, i, i, needUpdate, i, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (objs.length === 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.checkDb()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        toCreate = [];
                        toUpdate = [];
                        toUpdateLocalId = {};
                        valSet = [];
                        existing = [];
                        idSet = objs.map(function (obj) { return obj['id']; });
                        return [4 /*yield*/, this.execute('SELECT id FROM ' + objType + ' WHERE id IN (' + idSet.map(function (a) { return '?'; }).join(',') + ')', idSet)];
                    case 2:
                        resultSet = _a.sent();
                        console.log(resultSet);
                        for (i = 0; i < resultSet.rows.length; i++) {
                            existing.push(resultSet.rows.item(i).id);
                        }
                        for (i = 0; i < objs.length; i++) {
                            if (!(objs[i]['id'] in existing)) {
                                toCreate.push(objs[i]);
                            }
                            else {
                                valSet.push(objs[i]['id']);
                                valSet.push(objs[i]['lastmodifieddate']);
                                toUpdate.push('(id = ? and lastmodifieddate != ?)');
                            }
                        }
                        if (!(toUpdate.length > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.execute('SELECT id, local_id FROM ' + objType + ' WHERE ' + toUpdate.join(' OR '), valSet)];
                    case 3:
                        needUpdate = _a.sent();
                        existing = [];
                        toUpdate = [];
                        for (i = 0; i < needUpdate.rows.length; i++) {
                            existing.push(needUpdate.rows.item(i).id);
                            toUpdateLocalId[needUpdate.rows.item(i).id] = needUpdate.rows.item(i).local_id;
                        }
                        for (i = 0; i < objs.length; i++) {
                            if (!(objs[i]['id'] in existing)) {
                                toUpdate.push(objs[i]);
                            }
                        }
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < toUpdate.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.update(toUpdate[i], objType, toUpdateLocalId[toUpdate[i]['id']])];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        this.batchCreate(toCreate, objType);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a list of objects in local cache. Used by batchUpsert to create objects which
     * don't currently exist in local store.
     *
     * @param objs An array of objects to create
     * @param objType The type name
     */
    CacheService.prototype.batchCreate = function (objs, objType) {
        return __awaiter(this, void 0, void 0, function () {
            var fields, newObjs, fieldMap, i, obj, j, field, singleInsert, createStmt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (objs.length === 0) {
                            throw 'Error: No objects provided';
                        }
                        return [4 /*yield*/, this.checkDb()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        fields = __WEBPACK_IMPORTED_MODULE_0__schema__["a" /* schema */][objType]['properties'];
                        newObjs = [];
                        fieldMap = null;
                        for (i = 0; i < objs.length; i++) {
                            newObjs.push(undefined);
                            obj = objs[i];
                            j = ['?'];
                            for (field in fields) {
                                if (field === 'cache_age') {
                                    newObjs.push(this.currentTime());
                                }
                                else {
                                    newObjs.push(this.processField(field, obj, fields[field]));
                                }
                                if (fieldMap === null) {
                                    j.push('?');
                                }
                            }
                            if (fieldMap === null) {
                                fieldMap = j;
                            }
                        }
                        singleInsert = '(' + fieldMap.join(',') + ')';
                        createStmt = 'INSERT INTO ' + objType + ' VALUES ' + objs.map(function (a) { return singleInsert; }).join(',');
                        return [2 /*return*/, this.execute(createStmt, newObjs)];
                }
            });
        });
    };
    /**
     * This function is called when a service is first initialized. If the object can be cached, this will take data
     * from local cache and add it to the application state.
     *
     * @param store Reference to the reducer to add into.
     * @param key (Optional) The type name to rebuild. Default: null (rebuild all cached models)
     */
    CacheService.prototype.rebuildReducers = function (store, key) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, key_1, resultSet, records, fieldList, _loop_1, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!key) return [3 /*break*/, 5];
                        _a = [];
                        for (_b in this.cachedModels())
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        key_1 = _a[_i];
                        return [4 /*yield*/, this.rebuildReducers(store, key_1)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.execute('SELECT * FROM ' + key, [])];
                    case 6:
                        resultSet = _c.sent();
                        records = [];
                        fieldList = this.serverFields(key);
                        _loop_1 = function (i) {
                            var obj = {};
                            var result = resultSet.rows.item(i);
                            fieldList.map(function (field) {
                                obj[field] = result[field];
                            });
                            records.push(obj);
                        };
                        for (i = 0; i < resultSet.rows.length; i++) {
                            _loop_1(i);
                        }
                        store.select(key);
                        store.dispatch({
                            type: 'set_' + key,
                            payload: { data: records }
                        });
                        _c.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Purges items which have exceeded the schema's set freshness limit. Only runs after a connection has
     * been established with the server and data can be refreshed.
     *
     * @param key (Optional) The type name to purge. Default: null (purge all cached models)
     */
    CacheService.prototype.purgeOldItems = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, key_2, pruneTime;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.checkDb()];
                    case 1:
                        if (!(_c.sent())) {
                            return [2 /*return*/];
                        }
                        if (!!key) return [3 /*break*/, 6];
                        _a = [];
                        for (_b in this.cachedModels())
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key_2 = _a[_i];
                        return [4 /*yield*/, this.purgeOldItems(key_2)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        pruneTime = 172800;
                        try {
                            pruneTime = __WEBPACK_IMPORTED_MODULE_0__schema__["a" /* schema */][key]['properties']['prune']['default'];
                        }
                        catch (e) { }
                        return [4 /*yield*/, this.execute('DELETE FROM ' + key + ' WHERE cache_age < ' + (this.currentTime() - pruneTime), [])];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retries pending items which have been stored in the local sqlite database
     */
    CacheService.prototype.retryFromDatabase = function (restService, key) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, key_3, fieldList, pending, toCreate, toUpdate, i, item, _c, _d, _e, obj, _f, _g, _h, obj;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (!!key) return [3 /*break*/, 5];
                        _a = [];
                        for (_b in this.cachedModels())
                            _a.push(_b);
                        _i = 0;
                        _j.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        key_3 = _a[_i];
                        return [4 /*yield*/, this.retryFromDatabase(restService, key_3)];
                    case 2:
                        _j.sent();
                        _j.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 14];
                    case 5:
                        fieldList = this.serverFields(key);
                        return [4 /*yield*/, this.execute('SELECT ' + fieldList.join(',') + ' FROM ' + key + ' WHERE pending_create = 1 OR pending_update = 1', [])];
                    case 6:
                        pending = _j.sent();
                        toCreate = [];
                        toUpdate = [];
                        for (i = 0; i < pending.rows.length; i++) {
                            item = pending.rows.item(i);
                            if (item['pending_create'] === 1) {
                                toCreate.push(item);
                            }
                            else if (item['pending_update'] === 1) {
                                toUpdate.push(item);
                            }
                            else {
                                throw 'Logic Error: item was returned from database which had neither pending create or pending update flag set.';
                            }
                        }
                        if (toCreate.length + toUpdate.length === 0) {
                            return [2 /*return*/];
                        }
                        _c = [];
                        for (_d in toCreate)
                            _c.push(_d);
                        _e = 0;
                        _j.label = 7;
                    case 7:
                        if (!(_e < _c.length)) return [3 /*break*/, 10];
                        obj = _c[_e];
                        return [4 /*yield*/, restService.create(key, obj)];
                    case 8:
                        _j.sent();
                        _j.label = 9;
                    case 9:
                        _e++;
                        return [3 /*break*/, 7];
                    case 10:
                        _f = [];
                        for (_g in toUpdate)
                            _f.push(_g);
                        _h = 0;
                        _j.label = 11;
                    case 11:
                        if (!(_h < _f.length)) return [3 /*break*/, 14];
                        obj = _f[_h];
                        return [4 /*yield*/, restService.update(key, obj)];
                    case 12:
                        _j.sent();
                        _j.label = 13;
                    case 13:
                        _h++;
                        return [3 /*break*/, 11];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    CacheService.prototype.cacheQuery = function (query) {
        var hash = this.microhash(query);
        localStorage.setItem(hash, '' + this.currentTime());
    };
    CacheService.prototype.isFresh = function (query, time) {
        var hash = this.microhash(query);
        var lastFetch = localStorage.getItem(hash);
        return (lastFetch !== null && parseInt(lastFetch, 10) + time > this.currentTime());
    };
    /**
     * Hashes any size string into a small, insecure hash quickly.
     */
    CacheService.prototype.microhash = function (s) {
        var a = 1, c = 0, h, o;
        if (s) {
            a = 0;
            /*jshint plusplus:false bitwise:false*/
            for (h = s.length - 1; h >= 0; h--) {
                o = s.charCodeAt(h);
                a = (a << 6 & 268435455) + o + (o << 14);
                c = a & 266338304;
                a = c !== 0 ? a ^ c >> 21 : a;
            }
        }
        return String(a);
    };
    CacheService.prototype.cachedModels = function () {
        return Object.keys(__WEBPACK_IMPORTED_MODULE_0__schema__["a" /* schema */]).filter(function (key) { return typeof __WEBPACK_IMPORTED_MODULE_0__schema__["a" /* schema */][key]['properties']['pending_create'] !== 'undefined'; });
    };
    CacheService.prototype.serverFields = function (key) {
        var metaFields = __WEBPACK_IMPORTED_MODULE_0__schema__["a" /* schema */][key]['ignoreList'];
        var fieldList = [];
        var j = 0;
        for (var field in __WEBPACK_IMPORTED_MODULE_0__schema__["a" /* schema */][key]['properties']) {
            j++;
            if (metaFields.indexOf(j) === -1) {
                fieldList.push(field);
            }
        }
        return fieldList;
    };
    CacheService.prototype.processField = function (field, obj, column) {
        if (column['type'] === 'boolean') {
            return (typeof obj[field] !== 'undefined' && (obj[field] === true || obj[field] === 1)) ? 1 : 0;
        }
        else {
            return obj[field];
        }
    };
    CacheService.prototype.currentTime = function () {
        return Math.round((new Date).getTime() / 1000);
    };
    CacheService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__common_utils__["c" /* SJCLWrapper */]])
    ], CacheService);
    return CacheService;
}());

//# sourceMappingURL=cache.service.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FingerprintSetupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { ContactComponent } from "..";
var FingerprintSetupComponent = /** @class */ (function () {
    function FingerprintSetupComponent(fingerprint, navParams, nav) {
        this.fingerprint = fingerprint;
        this.navParams = navParams;
        this.nav = nav;
        this.fp_status = 'suggestion';
        var fp_name = localStorage.getItem('fingerprint');
        if (fp_name === 'nextlogin') {
            this.fp_status = 'setup';
            this.showFingerprint();
        }
    }
    FingerprintSetupComponent.prototype.showFingerprint = function () {
        var _this = this;
        this.fingerprint.show().then(function (result) {
            if (result) {
                localStorage.setItem('fingerprint', _this.navParams.data['username']);
                localStorage.setItem('fingerprint_cipher', _this.navParams.data['cipher']);
                localStorage.setItem('fingerprint_enabled', 'true');
                //this.nav.setRoot(ContactComponent);
            }
        }).catch(function (err) {
            //this.nav.setRoot(ContactComponent);
        });
    };
    FingerprintSetupComponent.prototype.noThanks = function () {
        localStorage.setItem('fingerprint_enabled', 'false');
        localStorage.removeItem('fingerprint');
        //this.nav.setRoot(ContactComponent);
    };
    FingerprintSetupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'jh-fingerprint-setup',template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\login\fingerprint-setup.html"*/'<ion-header>\n\n  <ion-navbar color="secondary">\n\n    <ion-title>Setup Fingerprint Sign On</ion-title>\n\n  </ion-navbar>\n\n  <jh-nav-pending></jh-nav-pending>\n\n</ion-header>\n\n<ion-content>\n\n  <mat-icon>fingerprint</mat-icon>\n\n  <h1 *ngIf="fp_status === \'setup\'">Fingerprint Sign On is almost ready</h1>\n\n  <div *ngIf="fp_status === \'suggestion\'" class="info">\n\n    <h1>Sign into your account using your fingerprint</h1>\n\n    <span>You can choose to sign into the John Hancock app using your fingerprint. Want to check in with a client but you don\'t have an internet connection? Fingerprint sign on allows you to log into your account and make certain changes. Once you reconnect, your changes will sync automatically.\n\n      <br /><br />This feature can be enabled or disabled in your app Settings at any time.</span>\n\n  </div>\n\n\n\n  <button mat-button (click)="showFingerprint()">ENROLL FINGERPRINT</button>\n\n\n\n  <button mat-button (click)="noThanks()">NO THANKS</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\login\fingerprint-setup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common__["b" /* FingerprintWrapper */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], FingerprintSetupComponent);
    return FingerprintSetupComponent;
}());

//# sourceMappingURL=fingerprint-setup.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2____ = __webpack_require__(137);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TermsPage = /** @class */ (function () {
    function TermsPage(navParams, nav) {
        this.navParams = navParams;
        this.nav = nav;
    }
    TermsPage.prototype.agree = function () {
        //this.nav.setRoot(ContactComponent);
    };
    TermsPage.prototype.decline = function () {
        localStorage.removeItem('sf_oauth');
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2____["a" /* LoginComponent */], { 'logout': true });
    };
    TermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'jh-terms',template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\login\terms.html"*/'<ion-header>\n\n  <ion-navbar color="secondary">\n\n    <ion-title>Success</ion-title>\n\n  </ion-navbar>\n\n  <jh-nav-pending></jh-nav-pending>\n\n</ion-header>\n\n<ion-content>\n\n  You have successfully logged in.\n\n  <!--<ion-navbar color="secondary">\n\n      <ion-title>Terms and Conditions</ion-title>\n\n    </ion-navbar>\n\n    <jh-nav-pending></jh-nav-pending>\n\n  </ion-header>\n\n  <ion-content>\n\n    <div class="info">\n\n      <h4>Terms and Conditions</h4>\n\n        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\n\n\n\n        <h4>Another Section</h4>\n\n        But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n\n\n\n        <h4>Trying to fill up space</h4>\n\n        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\n\n\n        <h4>I hope you don\'t read this section</h4>\n\n        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains\n\n\n\n    </div>\n\n    <section>\n\n      \n\n      <button class="primary" mat-button (click)="agree()">AGREE</button>\n\n      <button mat-button (click)="decline()">DECLINE</button>\n\n    </section>-->\n\n  \n\n  </ion-content>\n\n  '/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\login\terms.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], TermsPage);
    return TermsPage;
}());

//# sourceMappingURL=terms.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__billing__ = __webpack_require__(403);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__billing__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fingerprint__ = __webpack_require__(404);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__fingerprint__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return reducers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_reducer__ = __webpack_require__(268);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__base_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__meta_reducer__ = __webpack_require__(405);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__meta_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schema__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(267);





var reducers = {
    'meta': __WEBPACK_IMPORTED_MODULE_3____["b" /* metaReducer */]
};
for (var key in __WEBPACK_IMPORTED_MODULE_2__schema__["a" /* schema */])
    if (!('' + key.toLowerCase() in reducers)) {
        key = key.toLowerCase();
        var generic = new __WEBPACK_IMPORTED_MODULE_0__base_reducer__["a" /* BaseReducer */]();
        generic.REDUCER_TYPE = key;
        generic.init();
        reducers[key] = generic.getObjStore();
        reducers[key + '_interactivity'] = generic.getInteractivityReducer();
    }
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseReducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_utils__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schema__ = __webpack_require__(84);



/**
 * BaseReducer
 *
 * This is the base reducer used to search, sort, and filter datasets.
 */
var BaseReducer = /** @class */ (function () {
    function BaseReducer() {
        this.REDUCER_TYPE = 'NOT_SET';
        this.default_sort = '-last_modified_date';
        this.nulls_last = true;
        this.initial_filter = { '0': {
                'filter': function (obj) { return true; },
                'search': function (obj) { return true; },
                'sort': function (a, b) { return a['id'] < b['id']; },
                'current_filters': {},
                'current_sort': this.default_sort,
                'current_search': ''
            } };
        this.reducers = {
            'update': this.doUpdate,
            'insert': this.doInsert,
            'set': this.doSet,
            'delete': this.doDelete,
            'update_pending': this.doUpdatePending
        };
        this.interactions = {};
        this.clear_filter_on_search = false;
        this.clear_sort_on_search = false;
    }
    BaseReducer.prototype.init = function () {
        this.interactions = {
            'search': this.buildSearch(),
            'search_all': this.buildSearchAll(),
            'sort': this.buildSort(),
            'filter': this.buildFilter()
        };
    };
    /**
     * getObjStore
     *
     * Returns a function used to interact with a reducer which maps to the data schema
     */
    BaseReducer.prototype.getObjStore = function () {
        var $this = this;
        return function (state, action) {
            if (state === void 0) { state = []; }
            var actionType = action.type.replace('_' + $this.REDUCER_TYPE, '');
            if ($this.reducers.hasOwnProperty(actionType)) {
                return $this.reducers[actionType](state, action);
            }
            return state;
        };
    };
    /**
     * getInteractivityReducer
     *
     * Same as getObjStore, but strictly holds the reducer which tracks interactions on t he data set.
     */
    BaseReducer.prototype.getInteractivityReducer = function () {
        var _this = this;
        var $this = this;
        return function (state, action) {
            if (state === void 0) { state = _this.initial_filter; }
            var actionType = action.type.replace('_' + $this.REDUCER_TYPE, '');
            if ($this.interactions.hasOwnProperty(actionType)) {
                return $this.interactions[actionType](state, action);
            }
            return state;
        };
    };
    /**
     * combineReducers
     *
     * Takes an data set and the interactivity reducer, which together make up that object's application state
     * and return a combined reducer.
     */
    BaseReducer.prototype.combineReducers = function (objStore, interactivity) {
        var combiner = {};
        combiner[this.REDUCER_TYPE] = objStore;
        combiner[this.REDUCER_TYPE + '_interactivity'] = interactivity;
        return Object(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["c" /* combineReducers */])(combiner);
    };
    // ==================================================================
    /**
     * do*Operation*
     *
     * lambda functions referenced in the object store's properties to facilitate changes to the application state.
     */
    BaseReducer.prototype.doUpdate = function (state, action) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__common_utils__["f" /* upsert */])(state, [action.payload.data]);
    };
    BaseReducer.prototype.doInsert = function (state, action) {
        return [action.payload.data].concat(state);
    };
    BaseReducer.prototype.doSet = function (state, action) {
        var data = (typeof action.payload.data.push === 'function') ?
            action.payload.data :
            [action.payload.data];
        return Object(__WEBPACK_IMPORTED_MODULE_0__common_utils__["f" /* upsert */])(state, data);
    };
    BaseReducer.prototype.doDelete = function (state, action) {
        return state.filter(function (obj) { return obj.id !== action.payload.id; });
    };
    BaseReducer.prototype.doUpdatePending = function (state, action) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__common_utils__["f" /* upsert */])(state, [action.payload.data], 'tempId');
    };
    BaseReducer.prototype.doReset = function (state, action) {
        return this.initial_filter;
    };
    // ==================================================================
    /**
     * Filter Builders
     *
     * build* functions build and return a reducer function for performing
     * operations on the dataset. For example, Search compiles the searchable
     * fields for a given type and returns a function which can be run on the
     * dataset to reduce it to only items which match the query.
     */
    BaseReducer.prototype.buildUpdateState = function () {
        return function (state, key) {
            var newState = {};
            newState['' + (parseInt(key) + 1)] = state;
            return newState;
        };
    };
    BaseReducer.prototype.buildSearchAll = function () {
        return this.buildSearch(true);
    };
    BaseReducer.prototype.canSearch = function (prop) {
        return prop.hasOwnProperty('searchable') ||
            (prop.hasOwnProperty('indexed') && !prop.hasOwnProperty('not-searchable'));
    };
    BaseReducer.prototype.buildSearch = function (search_all) {
        var _this = this;
        var fields = [];
        var props = __WEBPACK_IMPORTED_MODULE_2__schema__["a" /* schema */][this.REDUCER_TYPE]['properties'];
        for (var field_name in props) {
            if (search_all || this.canSearch(props[field_name])) {
                var property = props[field_name];
                if (property['type'] === 'boolean') {
                    continue;
                }
                var searchMethod = (property['type'] === 'integer') ?
                    function (val, query) { return val === parseInt(query, 10); } :
                    (property['type'] === 'datetime') ?
                        function (val, query) { return false && _this.roundTime(val) === _this.roundTime(query); } :
                        function (val, query) {
                            if (typeof (val) === 'string' && val.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                                return true;
                            }
                            else if (query.toLowerCase() === 'null' && val === null) {
                                return true;
                            }
                            return false;
                        };
                fields.push([field_name, searchMethod]);
            }
        }
        var updateState = this.buildUpdateState();
        return function (state, action) {
            var curState = Object.keys(state)[0];
            state = state[curState];
            if (action.payload.data === '') {
                state['search'] = function (obj) { return true; };
            }
            else {
                var searchTerm_1 = action.payload.data;
                state['search'] = function (obj) {
                    for (var i = 0; i < fields.length; i++) {
                        if (!obj.hasOwnProperty(fields[i][0])) {
                            console.log('MISSING PROPERTY');
                            continue;
                        }
                        if (fields[i][1](obj[fields[i][0]], searchTerm_1)) {
                            return true;
                        }
                    }
                    return false;
                };
            }
            return updateState(state, curState);
        };
    };
    BaseReducer.prototype.buildFilter = function () {
        var updateState = this.buildUpdateState();
        var fields = {};
        var props = __WEBPACK_IMPORTED_MODULE_2__schema__["a" /* schema */][this.REDUCER_TYPE]['properties'];
        for (var prop in props) {
            var propType = props[prop]['type'];
            fields[prop] =
                (propType === 'datetime') ?
                    function (val, query) {
                        // @todo: Handle datetime enums like TODAY, LAST WEEK...
                        return false;
                    } :
                    (propType === 'boolean') ?
                        function (val, query) { return ((val === true && query === 'true')
                            || (val === false && query === 'false')); } :
                        (propType.indexOf('[]') !== -1) ?
                            function (val, query) {
                                return val.indexOf(query) !== -1;
                            } :
                            function (val, query) {
                                if (val === null || query === null || typeof val === 'undefined' || typeof val.toLowerCase === 'undefined' || typeof query.toLowerCase === 'undefined') {
                                    return val === query;
                                }
                                return val.toLowerCase() === query.toLowerCase();
                            };
        }
        return function (state, action) {
            var curState = Object.keys(state)[0];
            state = state[curState];
            if (action.payload.data === '') {
                state['filter'] = function (obj) { return true; };
                return state;
            }
            else {
                var key = Object.keys(action.payload.data)[0];
                state['current_filters'][key] = action.payload.data[key];
                var empty = true;
                for (var key_1 in state['current_filters']) {
                    if (state['current_filters'][key_1] === '') {
                        delete state['current_filters'][key_1];
                    }
                    else {
                        empty = false;
                    }
                }
                if (empty) {
                    state['filter'] = function (obj) { return true; };
                    return updateState(state, curState);
                }
                state['filter'] = function (obj) {
                    for (var key_2 in state['current_filters']) {
                        var compare = obj;
                        if (key_2.indexOf('.') !== -1) {
                            var path = key_2.split('.');
                            for (var i = 0; i < path.length; i++) {
                                if (compare.hasOwnProperty(path[i])) {
                                    compare = compare[path[i]];
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        else {
                            compare = obj[key_2];
                        }
                        if (!fields[key_2](compare, state['current_filters'][key_2])) {
                            return false;
                        }
                    }
                    return true;
                };
            }
            return updateState(state, curState);
        };
    };
    BaseReducer.prototype.buildSort = function () {
        var _this = this;
        var updateState = this.buildUpdateState();
        var fields = {};
        var props = __WEBPACK_IMPORTED_MODULE_2__schema__["a" /* schema */][this.REDUCER_TYPE]['properties'];
        for (var prop in props) {
            var propType = props[prop]['type'];
            fields[prop] =
                (propType === 'datetime') ?
                    function (val, query) {
                        // @todo: Handle datetime enums like TODAY, LAST WEEK...
                        return false;
                    } :
                    (propType === 'boolean') ?
                        function (val, query) { return ((val === true && query === 'true')
                            || (val === false && query === 'false')); } :
                        (propType.indexOf('[]') !== -1) ?
                            function (val, query) {
                                return val.indexOf(query) !== -1;
                            } :
                            function (val, query) {
                                return val.toLowerCase() === query.toLowerCase();
                            };
        }
        return function (state, action) {
            var curState = Object.keys(state)[0];
            state = state[curState];
            var lt = false;
            if (action.payload.data === '') {
                state['current_sort'] = _this.default_sort;
            }
            else {
                state['current_sort'] = action.payload.data;
            }
            var field = '';
            if (state['current_sort'][0] === '-') {
                lt = true;
                field = state['current_sort'].substring(1);
            }
            if (lt) {
                state['sort'] = function (a, b) { return a[field] < b[field]; };
            }
            else {
                state['sort'] = function (a, b) { return a[field] > b[field]; };
            }
            return updateState(state, curState);
        };
    };
    BaseReducer.prototype.roundTime = function (time) {
        return 0;
    };
    return BaseReducer;
}());

//# sourceMappingURL=base.reducer.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(283);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngrx_store__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reducers__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_material__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_cdk_table__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__common__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_common_http__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_settings_dialogs__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_login_fingerprint_setup__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_local_notifications__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_date_picker__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_login_terms__ = __webpack_require__(263);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__pages__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_16__common__["f" /* SearchComponent */],
                __WEBPACK_IMPORTED_MODULE_16__common__["d" /* RateFormatPipe */],
                __WEBPACK_IMPORTED_MODULE_16__common__["h" /* TimeEstimatePipe */],
                __WEBPACK_IMPORTED_MODULE_16__common__["c" /* PendingComponent */],
                __WEBPACK_IMPORTED_MODULE_16__common__["g" /* StaticMapComponent */],
                __WEBPACK_IMPORTED_MODULE_6__pages__["b" /* SettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_18__pages_settings_dialogs__["a" /* BillingDialog */],
                __WEBPACK_IMPORTED_MODULE_18__pages_settings_dialogs__["b" /* FingerprintSignInDialog */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_fingerprint_setup__["a" /* FingerprintSetupComponent */],
                __WEBPACK_IMPORTED_MODULE_16__common__["a" /* DateTimePickerComponent */],
                __WEBPACK_IMPORTED_MODULE_22__pages_login_terms__["a" /* TermsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_cdk_table__["m" /* CdkTableModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["c" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["f" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["g" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["i" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["k" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["l" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["m" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["n" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["p" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["q" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["r" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["s" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["t" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["u" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["v" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["w" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["x" /* MatRippleModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["y" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["A" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["C" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["B" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["D" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["E" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["G" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["H" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["I" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["J" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material__["F" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["i" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__ngrx_store__["b" /* StoreModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__reducers__["c" /* reducers */]),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__pages__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_16__common__["f" /* SearchComponent */],
                __WEBPACK_IMPORTED_MODULE_16__common__["c" /* PendingComponent */],
                __WEBPACK_IMPORTED_MODULE_16__common__["g" /* StaticMapComponent */],
                __WEBPACK_IMPORTED_MODULE_6__pages__["b" /* SettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_18__pages_settings_dialogs__["a" /* BillingDialog */],
                __WEBPACK_IMPORTED_MODULE_18__pages_settings_dialogs__["b" /* FingerprintSignInDialog */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_fingerprint_setup__["a" /* FingerprintSetupComponent */],
                __WEBPACK_IMPORTED_MODULE_16__common__["a" /* DateTimePickerComponent */],
                __WEBPACK_IMPORTED_MODULE_22__pages_login_terms__["a" /* TermsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__services__["a" /* BaseService */],
                __WEBPACK_IMPORTED_MODULE_8__reducers__["a" /* BaseReducer */],
                __WEBPACK_IMPORTED_MODULE_14__services__["h" /* SalesforceService */],
                __WEBPACK_IMPORTED_MODULE_14__services__["b" /* CacheService */],
                __WEBPACK_IMPORTED_MODULE_14__services__["g" /* SObjectService */],
                __WEBPACK_IMPORTED_MODULE_14__services__["e" /* DetailService */],
                __WEBPACK_IMPORTED_MODULE_14__services__["c" /* CheckinService */],
                __WEBPACK_IMPORTED_MODULE_16__common__["e" /* SJCLWrapper */],
                __WEBPACK_IMPORTED_MODULE_14__services__["f" /* InvoiceService */],
                __WEBPACK_IMPORTED_MODULE_14__services__["d" /* ClaimService */],
                __WEBPACK_IMPORTED_MODULE_16__common__["b" /* FingerprintWrapper */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_date_picker__["a" /* DatePicker */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_local_notifications__["a" /* LocalNotifications */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = /** @class */ (function () {
    function AppComponent(platform, menu, statusBar, splashScreen, iconRegistry, sanitizer) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.iconRegistry = iconRegistry;
        this.sanitizer = sanitizer;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages__["a" /* LoginComponent */];
        this.pages = {
            'settings': __WEBPACK_IMPORTED_MODULE_2__pages__["b" /* SettingsComponent */]
            //'patients': ContactComponent,
            //'invoices': InvoicesComponent
        };
        this.initializeApp();
    }
    /**
     * initializeApp
     *
     * Any code that needs to run right after platform ready goes here.
     * Currently sets up the icon database, app styles, and removes the splashscreen.
     */
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.iconRegistry.addSvgIcon('check-in', _this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/clock-in.svg')).addSvgIcon('check-out', _this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/clock-out.svg')).addSvgIcon('timetable', _this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/timetable.svg'));
            _this.statusBar.styleDefault();
            //Before running this, check status of login details
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.openPage = function (page) {
        this.menu.close();
        if (page === 'settings') {
            this.nav.push(this.pages[page]);
        }
        else {
            this.nav.setRoot(this.pages[page]);
        }
    };
    AppComponent.prototype.logout = function () {
        localStorage.removeItem('sf_oauth');
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages__["a" /* LoginComponent */], { 'logout': true });
        this.menu.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], AppComponent.prototype, "nav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["z" /* MatSidenav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["z" /* MatSidenav */])
    ], AppComponent.prototype, "sidenav", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-content>\n\n    <div name="sidenav-profile">\n\n      <img src="assets/imgs/default_profile.png" />\n\n      <span>\n\n        Ed Montalbano\n\n        <small>eddie.montalbano@gmail.com</small>\n\n      </span>\n\n    </div>\n\n\n\n    <button (click)="openPage(\'patients\')"><mat-icon>people</mat-icon><span>CLIENTS</span></button>\n\n    \n\n    <button (click)="openPage(\'invoices\')"><mat-icon>history</mat-icon><span>INVOICE HISTORY</span></button>\n\n\n\n    <button (click)="openPage(\'settings\')"><mat-icon>settings</mat-icon><span>SETTINGS</span></button>\n\n\n\n    <button mat-button (click)="logout()">LOGOUT</button>\n\n  </ion-content>\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n\n\n'/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["o" /* MatIconRegistry */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */]])
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Login */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_cache_service__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fingerprint_setup__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__terms__ = __webpack_require__(263);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { ContactComponent } from '../contacts/contacts';





/**
 * Login Object
 *
 * Describes the form structure for a typical login.
 */
var Login = /** @class */ (function () {
    function Login(username, password, encrypted) {
        this.username = username;
        this.password = password;
        this.encrypted = encrypted;
    }
    return Login;
}());

/**
 * LoginComponent
 *
 * Provides interactivity for the login screen.
 */
var LoginComponent = /** @class */ (function () {
    function LoginComponent(store, sforce, cacher, fingerprint, sjcl, navParams, nav) {
        var _this = this;
        this.store = store;
        this.sforce = sforce;
        this.cacher = cacher;
        this.fingerprint = fingerprint;
        this.sjcl = sjcl;
        this.navParams = navParams;
        this.nav = nav;
        this.model = new Login();
        this.selectedTab = 0;
        this.loading = true;
        this.fingerprint_enabled = false;
        this.error = '';
        //If the user is currently logged in, reload their credentials
        var oauthData = localStorage.getItem('sf_oauth');
        if (oauthData !== null && oauthData) {
            oauthData = JSON.parse(oauthData);
        }
        //Timeout to set loading to false if querying salesforce fails.
        setTimeout(function () {
            _this.loading = false;
        }, 8000);
        //Initializes salesforce connection
        this.sforce.init({
            appId: '3MVG9d3kx8wbPieHBpF8GIw2hY.rWIkaI.5M71yZGZKXw0pTThTrymPHZNPinLkvJno7m4bhW6Gylu2vxUqF8',
            apiVersion: 'v39.0',
            loginURL: 'https://portaldev6-jhltc.cs91.force.com/provider',
            oauthCallbackURL: 'http://localhost:8100/assets/oauthcallback.html',
            oauth: oauthData
        });
        if (oauthData) {
            var userId = this.sforce.getUserId();
            this.sforce.query('SELECT Id, Name FROM Account WHERE Id = \'' + userId + '\' LIMIT 1').then(function (data) {
                _this.unlockCacher();
            }).catch(function (err) {
                _this.loading = false;
            });
        }
        else {
            setTimeout(function () {
                _this.loading = false;
            }, 300);
            this.setupFingerprintLogin();
        }
    }
    /**
     * unlockCacher
     *
     * Using the user's login creds, unlock an encrypted cache database
     */
    LoginComponent.prototype.unlockCacher = function () {
        var _this = this;
        this.cacher.unlockDatabase().then(function (success) {
            // Console logging for debug purposes
            if (success) {
                console.log('cache enabled');
            }
            else {
                console.log('no caching');
            }
            _this.gotoRoot();
        }).catch(function (e) {
            console.log('no caching');
            _this.gotoRoot();
        });
    };
    /**
     * setupFingerprintLogin
     *
     * If the device is linked to a fingerprint database and the fingerprint is linked to an ISAM login, show the fingerprint dialog and button
     */
    LoginComponent.prototype.setupFingerprintLogin = function () {
        var _this = this;
        if (localStorage.getItem('fingerprint_enabled') === 'true' && localStorage.getItem('fingerprint') !== 'nextlogin') {
            this.fingerprint.isAvailable().then(function (result) {
                if (result) {
                    _this.fingerprint_enabled = true;
                    if (typeof _this.navParams.data === 'undefined' || _this.navParams.data['logout'] !== true) {
                        setTimeout(function () {
                            _this.showFingerprint();
                        }, 2000);
                    }
                }
            });
        }
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        if (typeof this.model.password === 'undefined') {
            return false;
        }
        try {
            this.cacher.unlockDatabase(this.model.password, true);
        }
        catch (e) { }
        this.sforce.jhLogin(this.model.username, this.model.password).then(function (data) {
            if (_this.needFingerprintSetup()) {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__fingerprint_setup__["a" /* FingerprintSetupComponent */], { 'username': _this.model.username, 'cipher': _this.sjcl.encrypt(_this.model.password) });
            }
            else {
                _this.gotoRoot();
            }
        }, function (err) {
            _this.error = err;
        });
        // var $this = this;
        // this.loginService.doLogin(this.model.username, this.model.password, function(data: any) {
        // $this.router.navigate(['/todo']);
        // }); 
    };
    /**
     * loginWithSalesforce
     *
     * While ISAM is not currently fully available, allows developers and testers to log into the app using
     * a salesforce community user email and password.
     */
    LoginComponent.prototype.loginWithSalesforce = function () {
        var _this = this;
        this.sforce.login().then(function (data) {
            localStorage.setItem('sf_oauth', JSON.stringify(data));
            if (_this.needFingerprintSetup()) {
                var userid = data.id.split('/').pop();
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__fingerprint_setup__["a" /* FingerprintSetupComponent */], { 'username': userid, 'cipher': _this.sjcl.encrypt(userid) });
            }
            else {
                _this.gotoRoot();
            }
        }, function (e) {
            console.log('Error', e);
        });
    };
    /**
     * needFingerprintSetup
     *
     * Checks to see if the user needs to be redirected to fingerprint setup as its next step in the setup pipeline
     */
    LoginComponent.prototype.needFingerprintSetup = function () {
        return ((localStorage.getItem('fingerprint_enabled') === 'true' && localStorage.getItem('fingerprint') === 'nextlogin')
            || (localStorage.getItem('fingerprint_enabled') === null && localStorage.getItem('fingerprint') === null));
    };
    /**
     * showFingerprint
     *
     * Shows the fingerprint login prompt. On success, logs the user in.
     */
    LoginComponent.prototype.showFingerprint = function () {
        var _this = this;
        this.fingerprint.show().then(function (result) {
            if (result) {
                _this.model.username = localStorage.getItem('fingerprint');
                _this.model.password = _this.sjcl.decrypt(localStorage.getItem('fingerprint_cipher'));
                _this.onSubmit();
            }
        });
    };
    LoginComponent.prototype.gotoRoot = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__terms__["a" /* TermsPage */]);
    };
    LoginComponent.prototype.setTab = function (index) {
        this.selectedTab = index;
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'jh-login',template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\login\login.html"*/'<mat-tab-group [(selectedIndex)]="selectedTab" [ngClass]="loading ? \'loading\' : \'\'">\n\n    <mat-tab label="Login" class="login">\n\n      <div class="container">\n\n        <div class="logo-wrapper">\n\n          <img src="assets/imgs/jh.png" />\n\n        </div>\n\n        <h1>LTC Provider Login</h1>\n\n        <div class="error" *ngIf="error">\n\n          {{ error }}\n\n        </div>\n\n        <mat-form-field [floatLabel]="true">\n\n          <mat-label>Username</mat-label>\n\n          <input matInput [(ngModel)]="model.username">\n\n        </mat-form-field>\n\n      \n\n        <mat-form-field [floatLabel]="true">\n\n          <mat-label>Password</mat-label>\n\n          <input type="password" [(ngModel)]="model.password" matInput>\n\n        </mat-form-field>\n\n      \n\n        <div class="centered">\n\n          <button mat-raised-button color="primary" (click)="onSubmit()">LOGIN</button>\n\n          <div><a (click)="setTab(2)">Forgot password?</a></div>\n\n          <div><a (click)="loginWithSalesforce()">Login with Salesforce</a></div>\n\n        </div>\n\n      </div>\n\n      <button mat-fab color="white" *ngIf="fingerprint_enabled" (click)="showFingerprint()"><mat-icon>fingerprint</mat-icon></button>\n\n    </mat-tab>\n\n    <mat-tab label="Enter Verification Code">\n\n      <div class="container">\n\n        <h1>Enter Verification Code</h1>\n\n        <mat-form-field [floatLabel]="true">\n\n          <mat-label>Email</mat-label>\n\n          <input matInput [(ngModel)]="model.username">\n\n        </mat-form-field>\n\n      \n\n        <mat-form-field [floatLabel]="true">\n\n          <mat-label>Password</mat-label>\n\n          <input type="password" [(ngModel)]="model.password" matInput>\n\n        </mat-form-field>\n\n\n\n          <mat-form-field [floatLabel]="true">\n\n            <mat-label>Password Again</mat-label>\n\n            <input type="password" matInput>\n\n          </mat-form-field>\n\n      \n\n        <div class="centered">\n\n          <button mat-raised-button color="primary" (click)="onSubmit()">REGISTER</button>\n\n          \n\n          <div><a (click)="setTab(0)">Back</a></div>\n\n        </div>\n\n      </div>\n\n    </mat-tab>\n\n    <mat-tab label="Forgot Password">\n\n        <div class="container">\n\n          <h1>Reset Password</h1>\n\n          <mat-form-field [floatLabel]="true">\n\n            <mat-label>Email</mat-label>\n\n            <input matInput [(ngModel)]="model.username">\n\n          </mat-form-field>\n\n        \n\n          <div class="centered">\n\n            <button mat-raised-button color="primary" (click)="onSubmit()">RESET PASSWORD</button>\n\n            \n\n            <div><a (click)="setTab(0)">Back</a></div>\n\n          </div>\n\n        </div>\n\n      </mat-tab>\n\n  </mat-tab-group>\n\n\n\n'/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */], __WEBPACK_IMPORTED_MODULE_2__services__["h" /* SalesforceService */],
            __WEBPACK_IMPORTED_MODULE_4__services_cache_service__["a" /* CacheService */], __WEBPACK_IMPORTED_MODULE_5__common__["b" /* FingerprintWrapper */],
            __WEBPACK_IMPORTED_MODULE_5__common__["e" /* SJCLWrapper */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */]])
    ], LoginComponent);
    return LoginComponent;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schema__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_combineLatest__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_combineLatest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_combineLatest__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*tshint disable: no-bitwise*/







var BaseService = /** @class */ (function () {
    function BaseService(http, store) {
        this.http = http;
        this.store = store;
        this.objMode = true;
        this.options = {
            requiresAuth: false,
            baseUrl: '/api/',
            restUrl: '',
            clearOnSearch: false,
        };
    }
    /**
     * Initializes the service. Ensures required values are set.
     */
    BaseService.prototype.init = function (config) {
        if (!config.hasOwnProperty('type')) {
            throw 'Service must have property \'type\'';
        }
        for (var key in config) {
            this.options[key] = config[key];
        }
        this.type = this.options['type'];
        if (!'' + this.type.toLowerCase() in __WEBPACK_IMPORTED_MODULE_4__schema__["a" /* schema */]) {
            throw 'Object type \'' + this.type + '\' not found in schema';
        }
        this.schema = __WEBPACK_IMPORTED_MODULE_4__schema__["a" /* schema */][this.type.toLowerCase()];
        this.meta = this.store.select('meta');
        this.items = this.store.select(this.type);
        if (this.options.restUrl.length === 0) {
            this.options['restUrl'] = this.options['baseUrl'] + this.type;
        }
        this.buildFilteredList();
    };
    /**
     * Builds and saves the active application state associated with this instance of the service.
     * This filtered list will reflect search, sort, and filter operations applied to it.
     */
    BaseService.prototype.buildFilteredList = function () {
        var _this = this;
        var interactiveStore = this.store.select(this.type + '_interactivity');
        this.filteredItems = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].combineLatest(this.store.select(this.type), interactiveStore, function (objs, interactivityFilter) {
            if (typeof interactivityFilter === 'undefined') {
                return objs;
            }
            var f = interactivityFilter[Object.keys(interactivityFilter)[0]];
            if (f.pending && _this.options.clearOnSearch) {
                return [];
            }
            var items = objs.filter(f.filter).filter(f.search).sort(f.sort);
            // this.cacher.filteredItemCount = items.length;
            _this.lastItemInList = items[items.length - 1];
            _this.currentSort = f.current_sort;
            return items;
        });
    };
    BaseService.prototype.handlePayloadData = function (operation, data) {
        for (var key in data) {
            if (key !== this.type) {
                this.data = this.store.select(key);
            }
            console.log('store dispatch :' + operation + '_' + key);
            this.store.dispatch({
                type: operation + '_' + key,
                payload: { 'data': data[key] }
            });
            if (key !== this.type) {
                this.store.select(this.type);
            }
        }
    };
    /**
     * Sets a value in the application metadata.
     */
    BaseService.prototype.setMetadata = function (payload) {
        this.store.select('meta');
        this.store.dispatch({
            type: 'set_meta',
            payload: payload
        });
        this.store.select(this.type);
    };
    BaseService.prototype.search = function (query) {
        this.doSearch(query);
    };
    BaseService.prototype.doSearch = function (query) {
        this.store.select(this.type + '_interactivity');
        this.store.dispatch({
            type: 'search_' + this.type,
            payload: { data: query }
        });
        this.store.select(this.type);
        //@todo: implement (call getAll with url_query set)
    };
    BaseService.prototype.filter = function (field, query) {
        this.store.select(this.type + '_interactivity');
        var filterData = {};
        filterData[field] = query;
        this.store.dispatch({
            type: 'filter_' + this.type,
            payload: { data: filterData }
        });
        this.store.select(this.type);
    };
    BaseService.prototype.getAll = function (params) {
        var _this = this;
        var url = this.options.restUrl;
        this.store.dispatch({
            type: 'pending_' + this.type,
            payload: true
        });
        this.http.get(url, { headers: this.basicHeader })
            .map(function (res) { return res.json(); })
            .subscribe(function (payload) {
            _this.store.dispatch({
                type: 'pending_' + _this.type,
                payload: false
            });
            //@todo: handle standard network returns
            _this.handlePayloadData('set', payload.data);
            if (typeof params !== 'undefined' && params.callback === 'function')
                params.callback(payload);
        });
    };
    /**
     * Restful get of a single data object.
     */
    BaseService.prototype.get = function (id, callback) {
        var _this = this;
        this.http.get(this.options.restUrl + '/' + id, { headers: this.basicHeader })
            .map(function (res) { return res.json(); })
            .subscribe(function (payload) {
            _this.handlePayloadData('set', payload.data);
            if (typeof callback === 'function')
                callback(payload);
        });
    };
    /**
     * Create call
     */
    BaseService.prototype.beforeCreate = function (newObj, parentObject) {
        var user = this.user;
        newObj['created_date'] = new Date().getTime();
        newObj['last_modified_date'] = new Date().getTime();
        if (typeof user !== 'undefined' && user.id) {
            newObj['last_modified_user_id'] = user.id;
            newObj['owner_user_id'] = user.id;
        }
        return newObj;
    };
    BaseService.prototype.create = function (newObj, callback, parentObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var postData, key, promise;
            return __generator(this, function (_a) {
                newObj = this.beforeCreate(newObj, parentObject);
                if (newObj.hasOwnProperty('id'))
                    throw 'New object cannot have property, \'id\'';
                postData = '';
                for (key in newObj) {
                    postData += key + '=' + encodeURIComponent(newObj[key]) + '&';
                }
                promise = this.http.post(this.options.restUrl, postData.substring(0, postData.length - 1), { headers: this.formHeader });
                newObj['pending'] = true;
                newObj['tempId'] = this.uuid(false);
                this.store.dispatch({
                    type: 'insert_' + this.type,
                    payload: { data: newObj }
                });
                promise.map(function (res) { return res.json(); })
                    .subscribe(function (payload) {
                    if (_this.afterCreate(payload, newObj)) {
                        _this.store.dispatch({
                            type: 'update_pending_' + _this.type,
                            payload: { data: payload.data }
                        });
                        if (typeof callback === 'function')
                            callback(payload);
                    }
                });
                return [2 /*return*/, promise];
            });
        });
    };
    BaseService.prototype.afterCreate = function (payload, data) { return data; };
    /**
     * Update call
     */
    BaseService.prototype.beforeUpdate = function (updates) {
        var user = this.user;
        updates['last_modified_date'] = new Date().getTime();
        if (typeof user !== 'undefined' && user.id) {
            updates['last_modified_user_id'] = user.id;
        }
        return updates;
    };
    BaseService.prototype.update = function (updates, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var $this, postData, key, promise;
            return __generator(this, function (_a) {
                $this = this;
                postData = '';
                updates = this.beforeUpdate(updates);
                if (!updates.hasOwnProperty('id'))
                    throw 'Update statement requires an ID';
                for (key in updates) {
                    if (key != 'id')
                        postData += key + '=' + encodeURIComponent(updates[key]) + '&';
                }
                promise = this.http.put(this.options.restUrl + '/' + updates.id, postData.substring(0, postData.length - 1), { headers: this.formHeader });
                updates['pending'] = true;
                updates['tempId'] = this.uuid(false);
                $this.store.dispatch({ type: 'update_' + this.type, payload: { data: updates } });
                promise
                    .map(function (res) { return res.json(); })
                    .subscribe(function (response) {
                    updates['pending'] = false;
                    if (_this.afterUpdate(updates)) {
                        _this.store.dispatch({
                            type: 'update_pending_' + _this.type,
                            payload: { data: updates }
                        });
                        if (typeof callback === 'function') {
                            callback(updates);
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    BaseService.prototype.afterUpdate = function (payload) { return true; };
    /**
     * Delete call
     */
    BaseService.prototype.beforeDelete = function (object) {
        var user = this.user;
        object['lastModifiedDate'] = new Date().getTime();
        if (typeof user !== 'undefined' && user.id) {
            object['lastModifiedBy'] = user.id;
        }
        return object;
    };
    BaseService.prototype.delete = function (object, callback) {
        var _this = this;
        object = this.beforeDelete(object);
        if (!object.hasOwnProperty('id')) {
            throw 'Delete statement requires an ID';
        }
        this.http.delete(this.options.restUrl + '/' + object.id, { headers: this.basicHeader })
            .map(function (res) { return res.json(); })
            .map(function (payload) { return ({ type: 'delete_' + _this.type, payload: payload }); })
            .subscribe(function (action) {
            if (_this.afterDelete(action.payload)) {
                _this.store.dispatch(action);
                if (typeof callback === 'function')
                    callback(action.payload);
            }
        });
    };
    BaseService.prototype.afterDelete = function (payload) { return true; };
    /**
     * Helper Functions
     */
    BaseService.prototype.hasProperty = function (prop) {
        return prop in __WEBPACK_IMPORTED_MODULE_4__schema__["a" /* schema */][this.type]['properties'];
    };
    /**
     * Returns a uuid
     */
    BaseService.prototype.uuid = function (a) {
        return a ?
            (a ^ Math.random() * 16 >> a / 4).toString(16) :
            ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.uuid);
    };
    /**
     * Strips any characters which aren't alphanumeric (a-z, 0-9, period, undershift, dash)
     */
    BaseService.prototype.alphanumeric = function (s) {
        return s.replace(/[^a-z0-9._-]/gi, '');
    };
    BaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["a" /* Store */]])
    ], BaseService);
    return BaseService;
}());

//# sourceMappingURL=base.service.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesforceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var BASE_URL = '/api/';
var LOCALIZED_LOGIN = false;
var SalesforceService = /** @class */ (function () {
    function SalesforceService(http, store, zone) {
        var _this = this;
        this.http = http;
        this.store = store;
        this.zone = zone;
        this.loginURL = 'https://portaldev6-jhltc.cs91.force.com/provider'; //'https://test.salesforce.com';
        this.communityUrl = 'https://portaldev6-jhltc.cs91.force.com/provider/';
        this.scopeParameters = ['full'];
        this.appId = '3MVG9d3kx8wbPieHBpF8GIw2hY.rWIkaI.5M71yZGZKXw0pTThTrymPHZNPinLkvJno7m4bhW6Gylu2vxUqF8';
        this.apiVersion = 'v37.0';
        this.tokenStore = {};
        this.context = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));
        this.serverURL = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        this.baseURL = this.serverURL + this.context;
        this.proxyURL = 'https://ltc-cors-proxy.herokuapp.com/';
        this.oauthCallbackURL = this.baseURL + '/oauthcallback.html';
        this.useProxy = (!(window.cordova || window.SfdcApp));
        this.onlyOne = true;
        this.prefix = '/services/oauth2/';
        this.data = {
            name: 'Guest',
            token: null
        };
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        window.angularComponentRef = {
            zone: this.zone,
            componentFn: function (value) { return _this.oauthCallback(value); },
            component: this
        };
        this.deferredLogin = {
            resolve: undefined,
            reject: undefined
        };
    }
    SalesforceService.prototype.init = function (params) {
        if (params) {
            this.appId = params.appId || this.appId;
            this.apiVersion = params.apiVersion || this.apiVersion;
            this.loginURL = params.loginURL || this.loginURL;
            this.oauthCallbackURL = params.oauthCallbackURL || this.oauthCallbackURL;
            this.proxyURL = params.proxyURL || this.proxyURL;
            this.useProxy = params.useProxy === undefined ? this.useProxy : params.useProxy;
            if (params.oauth) {
                this.oauth = params.oauth;
            }
            if (params.accessToken) {
                if (!this.oauth)
                    this.oauth = {};
                this.oauth.access_token = params.accessToken;
            }
            if (params.instanceURL) {
                if (!this.oauth)
                    this.oauth = {};
                this.oauth.instance_url = params.instanceURL;
            }
            if (params.refreshToken) {
                if (!this.oauth)
                    this.oauth = {};
                this.oauth.refresh_token = params.refreshToken;
            }
        }
    };
    SalesforceService.prototype.jhLogin = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        username = encodeURIComponent(username);
                        password = encodeURIComponent(password);
                        var url = 'https://test.usc.jhancock.com/pkmslogin.form?token=Unknown';
                        //var headers = new Headers();
                        //headers.append('Content-Type', 'application/x-www-form-urlencoded');
                        //headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
                        //headers.append('Accept-Language', 'en-US,en;q=0.9');
                        //GET form to get the set-cookie
                        /*const setup = new XMLHttpRequest();
                        setup.addEventListener("load", function(data) {
                          console.log(data);
                          console.log(this);
                        });
                        setup.open("GET", url);
                        setup.setRequestHeader('Access-Control-Expose-Headers', 'Set-Cookie');
                        setup.send();
                  
                        var optionInput: any;
                  
                        const data = 'username='+username+'&password='+password+'&login-form-type=pwd';
                        optionInput = {
                          headers: headers,
                          method: 'POST',
                          data: data
                        };
                  
                  
                        let options = new RequestOptions(optionInput);
                        this.http.post(url, data, options).subscribe( result => {
                          console.log(result);
                          //<!-- ERROR_TEXT = HPDIA0200W   Authentication failed. You have used an invalid user name, password or client certificate. -->
                  
                          //Search for error text, if exists add to page.
                          debugger;
                        });*/
                        var windowInstance = window.open(url, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes,toolbar=no,enableviewportscale=yes,hidden=yes');
                        var firstAttempt = true;
                        windowInstance.addEventListener('loadstop', function (e) {
                            windowInstance.executeScript({
                                code: "const doc = document;\n          for (const node of doc.body.children) {\n            node.style.setProperty('display', 'none');\n          }\n      \n          doc.body.style.setProperty('background', 'linear-gradient(135deg, #006BA6 0%, #005990 50%, #092759 100%)');\n          doc.body.style.setProperty('height', '100%');\n          doc.getRootNode().children[0].style.setProperty('height', '100%');\n          doc.body.style.setProperty('width', '100%');\n          doc.body.style.setProperty('align-items', 'center');\n          doc.body.style.setProperty('display', 'flex');\n          \n          const loginHtml = `<form id='mobileLogin' name=\"register\" method=\"POST\" action=\"/pkmslogin.form?token=Unknown\" style=\"padding: 0 48px; transform: none; width: 100%\">\n            <style>.footer { display:none!important } </style>\n            <div>\n              <div class=\"logo-wrapper\" style=\"text-align: center;margin-bottom: 5rem;\" >\n                <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA0CAYAAAANODN4AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gEZASgI1W1tIwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAARpElEQVR42u1deVhVR5YvFmVciR2XGJP057QTk+lOMonJ5/Sk093GrJ9JZ5mJS1wjajQh2i0RlyggouAGoiwioCIoKMoui2yyypPlKYIgCAiCgCiPfX/85g+qinvfAjwFRHzn+84Xc2+9e+tWnTp1lt8pdAAQLQ08WftEQYfokC0L5+poR6ObdAf7hb8cCzJ92gdt5QEflFTK+rxypbfL8O37b5J9QQlaiVMkAIPNWO/oD01/N33FbjyBvqrk2RsOgVKP7d41tkN7hxxZReW9tp2zyQlmHqFD5hsHiwf9hTtOhgIA3vvFrs+DfToqHT/s9x5qkwOLU+Fq+7THOxIAcLO4otd+e0am4U5FNT7Z6qIVwMHgoKQbaGvvgHuYBP/zr8MqB32WsS1MXAJQ09AMe7+4ITUxy+19PaX5pcgproR3TAZW2Z7FvO2u+PVYIOz94lBQ9gAA8LCuscd+T1hkjuKKajS3tsH0eOjfnjXhA0B0noQT8ouTP/R1dcjz40aT/5g2mYz9txGktrGVNLe1k3GjDEgnQKQFpWTvqi+JT6yULJzztsaG+z/M3WH2/SekTS4nK+3OklzXzf1m/C/dexr//drvyc9f/UXH3j8Or0yaQFraOkiFrI5MHD+WLP34XUIIIZMW7SRV3uYq3zt3szOi964jHfJOoq+nOywdk7+bOuG3BXOJro4OORaWQs7+tkxnKNiAxC/hOuZscuLaYeYqG8zb7oqvzN3x6baubejAuRj4J2Y+kuY7dSkVza1teNfYDpLcYmxw8u9XDeobJ8WBczEqnxmfWQAAWGt/Xu07V9ueZTYkjF0CTYejZnMISAAAfLfrJOIzCxCdkYchswVn5Jfiwx1uJerub3YL7pORr4olOcX8tzNX2cAv4Xq/b983CssxZYml0nMzC+8BADLyS9W+kwomAGCWse2wtPnORKcDAF5ebgUApKj8If/3ExfAH+19kZxdhJ7uA8AfVu7ReHKYAAAgM4ysUVZVq/bDNeUJi8yx9XgIDvvHAwA+2uIMRUeJ0djvdqh859K9p3mbLe7Bw1L4vGMyAABTl/IFiv+zPIkh44SUP6zF+xuPqOzQX7quY+PRAI0n5/L12wCAP67Zhz+s3IO80iq8vmYv+stpSs+7C6/oNLS2tSM97y6iM/Jw7XYZvtjhhn+Yu3PBUrc1028GAMReyx+WwucWmgIA+OuvDnhrg30DAKzqMjeGhhfsn5gJn1ipyg5NXmYl7237Usd00mHuEYbZG+xx5eYdTFuyq18m+e59GcIkN0H7R9Lz7nKP1eigDyLTcrlg1Te39PhtANAhlw9L4TvoGwsAOB9/DT/a+6KqtgHf7DyBIROGORwQD7pFqtWMj2L3zd5gDwCQyzsRlHQDh/wuoz/DRel5d/nzzDxCESMVa6+jwclcsNTF8QrvPeBC+rXF8WEngELT4n5NPUIl2cIt+MkLoI1PFC51aQqV98Ov5qAv6loV36+pBwDIGprw05EL/Ta5k5dZyVvb2kXPkzU0Yfb6Q/waFTghqfTIGanzBJ9mpoIGAMgprsSiPZ4afeOAd3Dh7lOgXq3K+8aOfgCA3JJKjSdn37loAEBldR0mLrTo18m1OBWO4OQs/szdZyJBPWzeprq+iQ/+nYpqJfvv461HexXQp52Lyh8CAOh/h14mpKc4F/V0AQD//oNmXi+18QAAr6yw6vfJDZPcxE5PUapN5JlvO36Rvz/7TgWW2/t6FpQ9wDc2XldYm7b2Dt5mk2vQsBNAa++ox56DJ/oBzO5T55j0FosDgN1nIgdkYsMkN7k3nppbAvcwieJ7OLFtJ6+0CqZU0AKSMvn9u/dlw074qMABAJxDkh75+564y/4oW9Murwi+9Q5U/7yi07B83xkIwicq7bqq2gZ+72ysFKcupWLS9xaiffddY7thJ4As392iYCc/FQIogDOBClOffyu0q3oKcD4uz1xlgxuF5ahrasGfftwHYUBaSNQDJADIFvdglD+sxa279/l96mANK+FjiCYAWLH/zNMngBQlgqaWNo06P8PIGp2dnQCAtFslgzGxSpCruMzbfPDLqmqhLs02XHO9Ly3ttr2pFny64Fi252PVxsQmLrTAByYOePung1AFz2pubQMAUNtRqJFUvksVxKmvAnExJRvXbpchKv0WFDM1jGgGRCkNxYgGZ4niNy6x8cJrq7uzNKNVpO6MXQJNHwWi9f7GI/jbJkf0ZLsJNboqnrLEEuoAwCWVMgCAMES1aI8ndnqGcyDJkBVAGioBALR3yDFvuysO+8cj/GoO7j2oEdlVQgygqWsQM+S51xkmuckyD7heUCb6cI+IVHTI5Whpa+fReBufKJRUytDa1o47FdXMTlPZz7jM2zwjEya5yQPo+WVVarUfAELtQaUJAkDe+8UO0Rl56JDL4RiUCJeQZJyOSsfDukZU1TZwTfnhDrcSSW4xWtvaOaLnjbX7kV9WhaaWNlRU12LuZmeld685dA61jc1qF4jRQR8+xvdr6iFVkXHa5BqE0iqZyHn645puYfWI6LJ9Ozu7gv6rbc8ywC2nvmQ/npgASnI5UgUZ+aXYdy6aeVAAgLb2DkxbsgtvrjvA0zpnY6Uw9wjDHu9IrgEBwDMyDTnFlUqOTPjVHPjGScE07c3iClyIz4RXdBqSukAQAKByEgGQUEk2aHyPX3MMSkRxRbVooD/77ZioDZ0oTiwr8qqRNUKuZCm9lwa0AYCHeyYutEBydhFSc0tEz0rKLmIZGAAAHUdRlonR+PlmmLx4J+49qMHn27v6yNApzCGaucoGAHAhvgvu9uk2F1Y2wO3a/6JzQGOtIggZAJRUymDmEYqpSy0hND2OBCYMPQFca38eoZJs3km6UkWpLACiYHKlrB4hV7L4dsxCNrKGJp7npWkyeEamAQCx94vjAW2hp8rCJCzoTTWBSuHrwavj1NjcqtRGmBOW5pfi9TV7GRSM03wrD/67E5euAgATbJ53/sDEAR+YOPDfUJQNAUDaO7pSyk7B3WGPrcdDeFtVZQ40mK6IUCF0nJB9R6zBKBqJsMUDgHxo6iRqU9vYDGoL8pQlI03RRwMKW3cKTkJ8ZgFbFZxYymyJjRe/tnyf2JuiKTYOYlD8QAWDn1BoPwCQedtd+Y1vLbu2hAmLzJlwicCwjJOzi0QLQ1EwhRSfWYCQK1k4HBCPby1PiNAwTEMdCUxgNiAAMC3Ii5UYUa+e+MZJYXehK4/N+plwo5D/hm3/nZ2dHBjx53/a8+ew3wr5fPw1fl/RPqusrsNa+/P4aIszMxdUOnbv/HwQjc2tfOzqmroBFxMXWnBtXVXbAJqXJ+Pnm4kEdNAF0CMiFfllVfCKToPhAnPM2eTEP1Lo+dY0NKu04RKzCvngM7CBYjUdfY4wzYd3fu7SlsxTpsFgAoCw7ZdtO0K+96CGaQKlb6Foak7s959sdYGZRyhMXAIYwoXnew0XdDlGVqcvcaFRFYCnfSIrD3iDChhheEMADNIkWmzrDncjrWUNTUqxSMY0cA4AopQiu8eQO9/tOsnbKSKI5m13RdqtEjgEJDCtj8i0XLz900EEJ2fhYV0jahubRYjzry2OwyEgAb8eC8S+c9G9QuL6HZJTKatHQFImZlD1rZiSMvcIAwBCU29KxjI1YkXbkqLLz+BXDNgqyS0GtYP4wNPtqksbd2lXEVzqa4vjeOfng5DkFqvUHgDIYoGGBoBKWX2v27Oq61SouD0pdFKYY2bsEmhKUeIAAAppJwAIs32FjoPQ/jU66CN6b0RqDg4HxDPcIWjclQAgb6zdL9quGY5SMRu12vYsCu89wCsrrEQ2aXV9E3cg2UITOlomLgH4YocbnEOS4BaaAjqGAyuAn2x1QUV1LYorqvHXXx1EL2RaQFETCFM5whUnDM9QjQcAoHYIYUBHphHtLlxmgV9RbllYxsk0hXAwGERKXTyR1uiKPHNVnjOzQwHwRQCA0JXPQbIM0MCI1bvUNbVg5YGuvjItTRcs914ZsdBI+NUcXEzpNgvYYh8/3wzS/FJQu5rHW1n5Ay0BgEtIMhRR5MxUAUCOhV7hW61wEa61P4+JCy3QIZdz50TIK/afgdFBH8wytkWMNB/vbzwieu6ACCDz8HooqoaqVQ2AUIgWojPyYOMTheKKalAhFAlTjLQbxjR58U6RYCigaNTVZHA7bOvxEMRI83HI7zK+MndH7LV8yOWduF9Tj9hr+UoeKABcSstVGVBW3J4V71ONiUpZPS6mZCNGmoe80iqRM8OKl0xcAvh1S0F26HtrT349MasQEak5fHGx+pe6phYcD5dAml8KCpIQOTqS3GImdEp4yX86+3M85YlLV3GjsJybBrTuRcl0ouUISvAyY5dAU0uvCKw84I15210RkZoD2v/+F0DmGd2pqMb4+WboqT6gp5zvmkPn4B2ToVQj8aGpE7yi03DYPx6Kgdpvdp7AiUtXRTbhq0bW8I2TwjEoEYrB6SU2XghKuoHYa/lwCEgQYfoAkAW7PZQE796DGvglXOeaVxWbe4ThaHAynEOS8MUON6V2f9/hWnLI7zJ846R8m5y61BIXU7IRciVLlCO29o7Cmeh0HAu9olKzuIalwPZ8rNK3mbgEIDg5C84hSVAVlDd29EOMNB9BSTfU1tnMt/JAcHIWQq5kgTo2hNmH7mES2J6PVarfZjFBxa179Hc7sMU9GD/s98aC3R4Dg4imq6hH9LEwZaNoBw1lXm7v69lTxZ6Wu5nZ9kLHaMAzISx+1NsxEtS2GtZgzGedhfZhTynRfhFA5rW2trX3+jJFJLBrWIpWAIcpR6TmCAPaA3M0xwcmDkg4aEyKK2Xk91Mm9HqMRFVtAyYZjhVe0p6J94Rpjplbyb17D15+6XlDMvV348mEcaPJFMMxZNxoA2I4djQZM3IkmWg4hkwYO4qMHKFPRujrkTEGI0lreztpaGkjza3tpLK6jpTJ6oisvolUyhpIQflDMuPF54ntj18RHR0dYn4qjOxc9rlGc92rAH6+3RVhVqtJVlEF+dP0F3p9uKlbMPat+pL/v1u4hKz6bLZWAAeJDBeY4/WpvyNTnhtHpj1vSKa/MIH858tTyCiDkWTsKAMyQl+PjNDTI3p6OkQ49Z2dIJ3oZGfVkBH6ekRPV5eMNhhBRo7QJ+NGGZBRBiN6fb9jYCKRFpSRjIIykuG4UeexBPCz344hfPcacqOonLwxfWpfhUjxgVrhG+QDgV54bixpaG4j8q44I6msbSBvvvpKit/mxX/uT0Gf9twY8uKE8eSt6VOJyf/OIS9OHK/ULjGriDgEJRCfbct0NDqgkqE1KP6rzyk4IQ21Y9W0PDjlma5hKZhlbIsz0emsbAKdnZ2KRV7qnRCWbdAEsawIVdd6vs8es3N9ZA1NotitsUug6SbXIJRV1aKiulaEGVT5oDsU+6bJ8RZCrB0AXh2m5WeLhfAvmncWJx7szqG+uYXhNZUFkIZMlACX6OV8YyEJITtafvZYCN5VdxCVrKEJ6x39Vdt9mtpuLOeprlZCy88Wv7XBvoHVjgDAl2bKacrx880QfjVHfFEu7+TIkr6yjU+USPh6OvtPy88WM6gXoPo8xF1eEcpHqi639/XUNDsynMsQtfx4/NuJi7x4rL1DDhufKHxreQI7PcMRlX5LDFmi2L0+P1xYQaVY86BlLQt5vaM/WNnDrbv3EZGag9dW7+0+B0XTsAlzVlSBMbWsZU3BCD2e6q7IQpAkAFbxph1QLWsugNbeURodGys81wUYvucda3mQBLCo/CEodLtPToewAiyyh1NPtazlvrDuS5OeI2diM3pNPs8wssY1x41ET7frD2yejEwlH82aqQUaaOnx/lyrvp4ukRZV9Nho7mZn3HbfSsaNMiAAyL+OBpAVH7+nFT4tPTbpAyBz35iutoHV6UuI3ruOEEJIRGouWefkRwpPbNMKn5b6h9ifxVps48WD0LM3HGJ1n7x2llbQa+0WLfcr6zAYjdGns0ljSysZZTCSvDTRkOjr6ZIY6W3iEJJIku3WazWelgaE/h/7Xy3stRoEOwAAAABJRU5ErkJggg==\">\n              </div>\n              <h1 style=\"color: white; font-weight: 200; margin: 0 0 48px; font-size: 24px;\">LTC Provider Login</h1>\n              <div id=\"errorMessage\"></div>\n            <div style=\"position:relative; margin-bottom: 4rem;\"><div class=\"mat-input-flex mat-form-field-flex\">\n              <div>\n              <input id='mobileUsername'  name='username' style=\"font: inherit; background: 0 0; color: white; border: none; outline: 0; padding: 0; margin: 0; width: 100%; max-width: 100%; vertical-align: bottom; text-align: inherit; caret-color: rgba(255, 255, 255, 0.5);\">\n            <span class=\"mat-form-field-label-wrapper mat-input-placeholder-wrapper mat-form-field-placeholder-wrapper\" style=\"top: -0.84375em; padding-top: 0.84375em; position: absolute; left: 0; box-sizing: content-box; width: 100%; height: 100%; overflow: hidden; pointer-events: none;\">\n            <label style=\"transform: translateY(-1.28125em) perspective(100px) translateZ(0.001px);color: rgba(255, 255, 255, 0.7);display: block;width: 100%;font-size: 1.3rem;\">\n            Username\n            </label></span></div><!--bindings={\n      \"ng-reflect-ng-if\": \"0\"\n      }--></div><div class=\"mat-input-underline mat-form-field-underline\" style=\"background-color: rgba(255, 255, 255, 0.7);position: absolute;height: 1px;width: 100%;\"><span class=\"mat-input-ripple mat-form-field-ripple\"></span></div><div class=\"mat-input-subscript-wrapper mat-form-field-subscript-wrapper\" ng-reflect-ng-switch=\"hint\"><!--bindings={\n      \"ng-reflect-ng-switch-case\": \"error\"\n      }--><!--bindings={\n      \"ng-reflect-ng-switch-case\": \"hint\"\n      }--><div class=\"mat-input-hint-wrapper mat-form-field-hint-wrapper ng-tns-c3-0 ng-trigger ng-trigger-transitionMessages ng-star-inserted\" style=\"opacity: 1; transform: translateY(0%);\"><!--bindings={\n      \"ng-reflect-ng-if\": \"\"\n      }--><div class=\"mat-input-hint-spacer mat-form-field-hint-spacer\"></div></div></div></div>\n      \n          \n      \n            <div class=\"mat-input-wrapper mat-form-field-wrapper\"  style=\"position:relative; margin-bottom: 4rem;\"><div class=\"mat-input-flex mat-form-field-flex\"><!--bindings={\n      \"ng-reflect-ng-if\": \"0\"\n      }--><div class=\"mat-input-infix mat-form-field-infix\">\n      \n              \n      \n              <input id='mobilePassword' name='password' type=\"password\" style=\"font: inherit; background: 0 0; color: white; border: none; outline: 0; padding: 0; margin: 0; width: 100%; max-width: 100%; vertical-align: bottom; text-align: inherit; caret-color: rgba(255, 255, 255, 0.5);\">\n              <input type=\"HIDDEN\" name=\"login-form-type\" value=\"pwd\" />\n            <span style=\"top: -0.84375em; padding-top: 0.84375em; position: absolute; left: 0; box-sizing: content-box; width: 100%; height: 100%; overflow: hidden; pointer-events: none;\">\n              <label style=\"transform: translateY(-1.28125em) perspective(100px) translateZ(0.001px);color: rgba(255, 255, 255, 0.7);display: block;width: 100%;font-size: 1.3rem;\">\n              Password\n              </label>\n            </span></div></div>\n            <div class=\"mat-input-underline mat-form-field-underline\" style=\"background-color: rgba(255, 255, 255, 0.7);position: absolute;height: 1px;width: 100%;\"><span class=\"mat-input-ripple mat-form-field-ripple\"></span></div><div class=\"mat-input-subscript-wrapper mat-form-field-subscript-wrapper\" ng-reflect-ng-switch=\"hint\"><!--bindings={\n          \"ng-reflect-ng-switch-case\": \"error\"\n          }--><!--bindings={\n          \"ng-reflect-ng-switch-case\": \"hint\"\n          }--><div class=\"mat-input-hint-wrapper mat-form-field-hint-wrapper ng-tns-c3-1 ng-trigger ng-trigger-transitionMessages ng-star-inserted\" style=\"opacity: 1; transform: translateY(0%);\"><!--bindings={\n          \"ng-reflect-ng-if\": \"\"\n          }--><div class=\"mat-input-hint-spacer mat-form-field-hint-spacer\"></div></div></div></div>\n          \n              \n          \n                <div class=\"centered\" style=\"margin-top:2rem; text-align:center\">\n          \n                  <button style=\"margin-bottom: 3rem; background: white; color: #003e6b; box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); cursor: pointer; outline: 0; border: none; -webkit-tap-highlight-color: transparent; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: baseline; text-align: center; margin: 0; min-width: 88px; line-height: 36px;padding: 0 16px;border-radius: 2px;\"><span class=\"mat-button-wrapper\">LOGIN</span></button>\n          \n                  <div style=\"margin-top:3rem\"><a style=\"color:white; text-decoration: none\">Forgot password?</a></div>\n          \n                </div>\n          \n              </div>\n          </form>`;\n          loginNode = doc.createElement('div');\n          loginNode.innerHTML = loginHtml;\n          doc.body.insertBefore(loginNode, doc.body.childNodes[0]);"
                            });
                            if (firstAttempt) {
                                firstAttempt = false;
                                windowInstance.executeScript({ 'code': "\n            \n            doc.getElementById('mobileUsername').value = '" + username + "';\n            doc.getElementById('mobilePassword').value = '" + password + "';\n            doc.getElementById('mobileLogin').submit();\n            "
                                });
                            }
                            else {
                                windowInstance.executeScript({ 'code': "doc.getElementById('GeneralErrorAlert').innerText.substring(1);"
                                }, function (error) {
                                    if (error && error.length > 0 && error[0].length > 2) {
                                        reject(error[0]);
                                    }
                                });
                                windowInstance.executeScript({
                                    'code': "\n              let errorText = '';\n              for (var i=0; i<document.body.childNodes.length; i++) {\n                if (document.body.childNodes[i].nodeType === 8 && document.body.childNodes[i].textContent.indexOf('ERROR_TEXT') !== -1) {\n                  errorText = document.body.childNodes[i].textContent.substring(document.body.childNodes[i].textContent.indexOf('   '));\n                }\n              }\n              errorText;"
                                }, function (errorText) {
                                    if (errorText.length > 0 && errorText[0].length > 0) {
                                        reject(errorText[0]);
                                    }
                                });
                                windowInstance.executeScript({ 'code': 'doc.getElementById("helpPhAccLocked") !== null' }, function (acctLocked) {
                                    if (acctLocked[0]) {
                                        reject('Your account is suspended. You have exceeded the maximum number of failed login attempts.');
                                    }
                                });
                                //doc.getElementById('errorMessage').innerHTML = '<div style="background:rgba(255,255,255,0.2); margin-top:-2rem; margin-bottom:4rem; border-radius:4px;border:1px solid rgba(255,255,255,0.25);text-align:center;color: white;font-size: 14px;padding: 4px;">' + errorMessage + '</div>';
                            }
                        });
                    })];
            });
        });
    };
    SalesforceService.prototype.restyleJHLogin = function (doc) {
        // 100: #06A7E2
        // 200: #1495db
        // 300: #006BA6
        // 400: #005990
        // 500: #003e6b
        // 600: #092759
        // 700: #0a2e55
    };
    SalesforceService.prototype.extractErrorMessage = function (body) {
        var m = body.match(/ERROR_TEXT (.+)--/mgi);
        return m[0].substring(m[0].indexOf('  ') + 3, m[0].length - 3);
    };
    SalesforceService.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window.cordova) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loginWithDevice()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.loginWithBrowser()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SalesforceService.prototype.loginWithBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var loginWindowURL = _this.loginURL + _this.prefix + 'authorize?client_id=' // '/authorize?client...'
                            + _this.appId + '&redirect_uri=' + _this.oauthCallbackURL
                            + '&response_type=token&scope=' + _this.scopeParameters.join('%20');
                        window.open(loginWindowURL, '_blank', 'location=no');
                        _this.deferredLogin.resolve = resolve;
                        _this.deferredLogin.reject = reject;
                    })];
            });
        });
    };
    SalesforceService.prototype.loginWithDevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var deviceOauthCallback = _this.loginURL + '/success', loginWindowURL = _this.loginURL + _this.prefix + 'authorize?client_id=' + _this.appId + '&redirect_uri=' + deviceOauthCallback + '&response_type=token', successOauth = 'success#access_token', userDeniedAuth = _this.prefix + '/success?error=access_denied&error_description=end-user+denied+authorization', oauthTimeout = '/setup/secur/RemoteAccessErrorPage';
                        if (window.cordova && window.cordova.InAppBrowser) {
                            var ref = window.cordova.InAppBrowser.open(loginWindowURL, '_blank', 'location=no,zoom=no');
                            ref.addEventListener('loadstop', function (event) {
                                if (event.url.indexOf(successOauth) > -1) {
                                    _this.oauthCallback(event.url);
                                    ref.close();
                                }
                                else if (event.url.indexOf(userDeniedAuth) > -1) {
                                    ref.close();
                                    reject('User denied authorization');
                                }
                                else if (event.url.indexOf(oauthTimeout) > -1) {
                                    ref.close();
                                    reject('Oauth timeout');
                                }
                            });
                            _this.deferredLogin.resolve = resolve;
                            _this.deferredLogin.reject = reject;
                        }
                        else {
                            reject('Cordova InAppBrowser plugin required');
                        }
                    })];
            });
        });
    };
    SalesforceService.prototype.oauthCallback = function (url) {
        var queryString;
        if (url.indexOf("access_token=") > 0) {
            queryString = url.substr(url.indexOf('#') + 1);
            this.oauth = this.parseQueryString(queryString);
            this.tokenStore['forceOAuth'] = JSON.stringify(this.oauth);
            this.deferredLogin.resolve(this.oauth);
        }
        else if (url.indexOf("error=") > 0) {
            queryString = decodeURIComponent(url.substring(url.indexOf('?') + 1));
            this.deferredLogin.reject(this.parseQueryString(queryString));
        }
        else {
            this.deferredLogin.reject({
                status: 'access_denied'
            });
        }
    };
    SalesforceService.prototype.parseQueryString = function (queryString) {
        var qs = decodeURIComponent(queryString), obj = {}, params = qs.split('&');
        params.forEach(function (param) {
            var splitter = param.split('=');
            obj[splitter[0]] = splitter[1];
        });
        return obj;
    };
    ;
    SalesforceService.prototype.getUserId = function () {
        return this.oauth ? this.oauth.id.split('/').pop() : undefined;
    };
    SalesforceService.prototype.isAuthenticated = function () {
        return (this.oauth && this.oauth.access_token) ? true : false;
    };
    SalesforceService.prototype.getUser = function () {
        var userData = localStorage.getItem('userData');
        if (typeof userData !== 'undefined' && userData.length > 0) {
            return JSON.parse(userData);
        }
        return this.data;
    };
    SalesforceService.prototype.getRequestBaseURL = function () {
        var url;
        if (this.useProxy) {
            url = this.proxyURL;
        }
        else if (this.oauth.instance_url) {
            url = this.oauth.instance_url;
        }
        else {
            url = this.communityUrl;
            //url = this.serverURL;
        }
        if (url.slice(-1) === '/') {
            url = url.slice(0, -1);
        }
        return url;
    };
    SalesforceService.prototype.toQueryString = function (obj) {
        var parts = [], i;
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    };
    SalesforceService.prototype.refreshToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.oauth.refresh_token) {
                reject('No refresh token found');
            }
            else {
                var params = {
                    'grant_type': 'refresh_token',
                    'refresh_token': _this.oauth.refresh_token,
                    'client_id': _this.appId
                }, url = _this.useProxy ? _this.proxyURL : _this.loginURL;
                if (url.slice(-1) === '/') {
                    url = url.slice(0, -1);
                }
                url = url + _this.prefix + 'token?' + _this.toQueryString(params);
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                if (_this.useProxy) {
                    headers.append('Target-URL', _this.loginURL);
                }
                var method = 'POST';
                var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers, method: method });
                _this.http.get(url, options)
                    .map(function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        reject();
                    }
                    else {
                        return res.json();
                    }
                })
                    .subscribe(function (data) {
                    _this.oauth.access_token = data.access_token;
                    _this.tokenStore.forceOAuth = JSON.stringify(_this.oauth);
                    resolve(data);
                }, function (error) {
                    reject(error);
                });
            }
        });
    };
    SalesforceService.prototype.request = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!_this.oauth || (!_this.oauth.access_token && !_this.oauth.refresh_token)) {
                            reject('No access token. Login and try again.');
                        }
                        else {
                            // Compose url
                            var url = _this.getRequestBaseURL();
                            if (obj.path.charAt(0) !== '/') {
                                obj.path = '/' + obj.path;
                            }
                            url = url + obj.path;
                            //Compose headers
                            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                            headers.append('Authorization', 'Bearer ' + _this.oauth.access_token);
                            if (obj.contentType) {
                                headers.append('Content-Type', obj.contentType);
                            }
                            if (_this.useProxy) {
                                headers.append('Target-URL', _this.oauth.instance_url);
                            }
                            // Compose options
                            var method = obj.method ? obj.method : 'GET';
                            var optionInput;
                            optionInput = {
                                headers: headers,
                                method: method,
                                params: obj.params,
                                data: obj.data
                            };
                            if (obj.responseType === 'arraybuffer') {
                                optionInput.responseType = __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* ResponseContentType */].ArrayBuffer;
                            }
                            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */](optionInput);
                            if (method === "POST") {
                                _this.http.post(url, obj.data, options)
                                    .map(function (res) {
                                    if (res.status < 200 || res.status >= 300) {
                                        if (res.status === 401) {
                                            _this.onlyOne = false;
                                            if (_this.oauth.refresh_token) {
                                                return _this.refreshToken().then(function () {
                                                    return _this.request(obj);
                                                });
                                            }
                                            else {
                                                return _this.login().then(function () {
                                                    return _this.request(obj);
                                                });
                                            }
                                        }
                                        else {
                                            throw new Error('This request has failed ' + res.status);
                                        }
                                    }
                                    else {
                                        return res.json();
                                    }
                                })
                                    .subscribe(function (data) {
                                    resolve(data);
                                }, function (error) {
                                    reject(error);
                                });
                            }
                            else {
                                _this.http.get(url, options)
                                    .map(function (res) {
                                    if (res.status < 200 || res.status >= 300) {
                                        if (res.status === 401) {
                                            _this.onlyOne = false;
                                            if (_this.oauth.refresh_token) {
                                                // Unauthorized, try to refresh token
                                                return _this.refreshToken().then(function () {
                                                    return _this.request(obj);
                                                });
                                            }
                                            else {
                                                // Unauthorized, try to login again
                                                return _this.login().then(function () {
                                                    return _this.request(obj);
                                                });
                                            }
                                        }
                                        else {
                                            throw new Error('This request has failed ' + res.status);
                                        }
                                    }
                                    else {
                                        return res.json();
                                    }
                                })
                                    .subscribe(function (data) {
                                    //@todo: remove
                                    setTimeout(function () {
                                        resolve(data);
                                    }, 2000);
                                }, function (error) {
                                    reject(error);
                                });
                            }
                        }
                    })];
            });
        });
    };
    SalesforceService.prototype.query = function (soql) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            path: '/services/data/' + this.apiVersion + '/query',
                            params: {
                                q: soql
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SalesforceService.prototype.retrieve = function (objectName, id, fields) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            path: '/services/data/' + this.apiVersion + '/sobjects/' + objectName + '/' + id,
                            params: fields ? {
                                fields: fields
                            } : undefined
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SalesforceService.prototype.create = function (objectName, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request({
                        method: 'POST',
                        contentType: 'application/json',
                        path: '/services/data/' + this.apiVersion + '/sobjects/' + objectName + '/',
                        data: data
                    })];
            });
        });
    };
    SalesforceService.prototype.update = function (objectName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var id, fields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = data.id, fields = __assign({}, data);
                        delete fields.attributes;
                        delete fields.id;
                        return [4 /*yield*/, this.request({
                                method: 'POST',
                                contentType: 'application/json',
                                path: '/services/data/' + this.apiVersion + '/sobjects/' + objectName + '/' + id,
                                params: {
                                    '_HttpMethod': 'PATCH'
                                },
                                data: fields
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SalesforceService.prototype.del = function (objectName, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            method: 'DELETE',
                            path: '/services/data/' + this.apiVersion + '/sobjects/' + objectName + '/' + id
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SalesforceService.prototype.upsert = function (objectName, externalIdField, externalId, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            method: 'PATCH',
                            contentType: 'application/json',
                            path: '/services/data/' + this.apiVersion + '/sobjects/' + objectName + '/' + externalIdField + '/' + externalId,
                            data: data
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SalesforceService.prototype.doLogin = function (username, password, callback) {
        var _this = this;
        if (LOCALIZED_LOGIN) {
            // const passwordSalt = sjcl.codec.hex.toBits( '314653651774a345466a3769267142325466' );
            // const derivedKey = sjcl.misc.pbkdf2( password, passwordSalt, 20000, 256 );
            // password = sjcl.codec.hex.fromBits( derivedKey );
            this.http.post(BASE_URL + 'login', 'username=' + username + '&password=' + password, { headers: this.headers })
                .map(function (res) { return res.json(); })
                .map(function (res) { return res; })
                .subscribe(function (res) {
                console.log(res);
                localStorage.setItem('userData', JSON.stringify(res.user));
                _this.data = res.user;
                callback(res);
            });
        }
        else {
        }
    };
    SalesforceService.prototype.ngOnDestroy = function () {
        window.angularComponentRef = null;
    };
    SalesforceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */]])
    ], SalesforceService);
    return SalesforceService;
}());

//# sourceMappingURL=salesforce.service.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SObjectService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__(53);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var SObjectService = /** @class */ (function (_super) {
    __extends(SObjectService, _super);
    function SObjectService(http, store, sforce, cacher) {
        var _this = _super.call(this, http, store) || this;
        _this.http = http;
        _this.store = store;
        _this.sforce = sforce;
        _this.cacher = cacher;
        _this.queryLimit = 2000;
        return _this;
    }
    SObjectService.prototype.setType = function (type) {
        this.init({
            type: type
        });
    };
    SObjectService.prototype.getAll = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, freshTime, queryCached_1, refreshing_1;
            return __generator(this, function (_a) {
                try {
                    this.setMetadata({ 'pending': true });
                    query = 'select ' + this.buildFieldList() + ' from ' + this.type + ' ' + this.buildWhere() + ' LIMIT ' + this.queryLimit;
                    console.log(query);
                    freshTime = 1800;
                    queryCached_1 = false;
                    refreshing_1 = (params && params.refresh);
                    if (refreshing_1) {
                        this.setMetadata({ 'refreshing': true });
                    }
                    try {
                        freshTime = this.schema['properties']['keep_fresh']['default'];
                    }
                    catch (e) { }
                    if (false) {
                        //try {
                        //  await this.cacher.rebuildReducers(this.type);
                        //  queryCached = true;
                        //} catch (e) {}
                    }
                    else {
                        this.sforce.query(query).then(function (data) {
                            var records = [];
                            data['records'].map(function (a) { return records.push(_this.lowercaseAttributes(a)); });
                            _this.handlePayloadData('set', records);
                            if (refreshing_1) {
                                _this.setMetadata({ 'refreshing': false });
                            }
                            _this.setMetadata({ 'pending': false });
                            if (queryCached_1) {
                                // this.cacher.cacheQuery(query);            
                            }
                        }, function (e) {
                            console.log('Error', e);
                        });
                    }
                }
                catch (e) {
                    if (typeof this.schema == 'undefined') {
                        throw 'The sObject type was either not set or not found.';
                    }
                    else {
                        throw 'Unknown Error: ' + e;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    SObjectService.prototype.getFieldList = function () {
        var i = 0;
        var fieldList = [];
        for (var key in this.schema['properties']) {
            i++;
            if (this.schema['ignoreList'].indexOf(i) === -1) {
                fieldList.push(key);
            }
        }
        if (this.additionalFields && this.additionalFields.length > 0) {
            return fieldList.concat(this.additionalFields);
        }
        return fieldList;
    };
    SObjectService.prototype.buildFieldList = function () {
        console.log(this.getFieldList());
        return this.getFieldList().join(', ');
    };
    SObjectService.prototype.buildWhere = function () {
        return '';
    };
    SObjectService.prototype.beforeCreate = function () { };
    SObjectService.prototype.create = function (newObj, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var local_id;
            return __generator(this, function (_a) {
                // @todo: If Cached
                if (this.hasProperty('pending_create')) {
                    try {
                        // local_id = await this.cacher.create(newObj, this.type, true);
                    }
                    catch (e) { }
                }
                return [2 /*return*/, this.doCreate(newObj, local_id)];
            });
        });
    };
    SObjectService.prototype.afterCreate = function (payload, data) {
        return data;
    };
    SObjectService.prototype.doCreate = function (newObj, local_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var promise;
            return __generator(this, function (_a) {
                promise = this.sforce.create(this.type, newObj);
                newObj['pending'] = true;
                newObj['tempId'] = this.uuid(false);
                this.store.dispatch({
                    type: 'insert_' + this.type,
                    payload: { data: newObj }
                });
                promise.then(function (payload) {
                    console.log('Create Result', payload);
                    newObj = _this.afterCreate(payload, newObj);
                    if (payload !== false) {
                        newObj['id'] = payload['id'];
                        newObj['pending'] = false;
                        _this.store.dispatch({
                            type: 'update_pending_' + _this.type,
                            payload: { data: newObj }
                        });
                        try {
                            // this.cacher.update({ 'id': payload['id'], 'pending_create': false }, this.type, local_id);
                        }
                        catch (e) { }
                        return payload['id'];
                    }
                }, function (error) {
                    // @todo: Delete item from store
                    // @todo: catch possible errors and handle each by type
                    return false;
                });
                return [2 /*return*/, promise];
            });
        });
    };
    SObjectService.prototype.beforeUpdate = function () { };
    SObjectService.prototype.update = function (newObj, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.hasProperty('pending_update')) {
                    try {
                        // await this.cacher.update(newObj, this.type, newObj.id, 'id');
                    }
                    catch (e) { }
                }
                this.doUpdate(newObj);
                return [2 /*return*/];
            });
        });
    };
    SObjectService.prototype.doUpdate = function (newObj) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var promise;
            return __generator(this, function (_a) {
                promise = this.sforce.update(this.type, newObj);
                newObj['pending'] = true;
                this.store.dispatch({
                    type: 'update_' + this.type,
                    payload: { data: newObj }
                });
                promise.then(function (payload) {
                    console.log('update result', payload);
                    if (payload !== false) {
                        newObj['pending'] = false;
                        _this.handlePayloadData('update_pending', newObj);
                        try {
                            // this.cacher.update({ 'pending_update':false }, this.type, newObj['id'], 'id');
                        }
                        catch (e) { }
                    }
                }).catch(function (err) {
                    console.log('update error: ', err);
                });
                return [2 /*return*/];
            });
        });
    };
    SObjectService.prototype.handlePayloadData = function (operation, data) {
        this.store.dispatch({
            type: operation + '_' + this.type,
            payload: { data: data }
        });
        if (this.hasProperty('pending_create')) {
            try {
                // this.cacher.batchUpsert(data, this.type);
            }
            catch (e) { }
        }
    };
    SObjectService.prototype.lowercaseAttributes = function (obj) {
        var _ths = this;
        return Object.keys(obj).reduce(function (newObj, key) {
            var val = obj[key];
            var newVal = (typeof val === 'object' && val !== null) ? _ths.lowercaseAttributes(val) : val;
            newObj[key.toLowerCase()] = newVal;
            return newObj;
        }, {});
    };
    SObjectService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */], __WEBPACK_IMPORTED_MODULE_3__index__["h" /* SalesforceService */], __WEBPACK_IMPORTED_MODULE_3__index__["b" /* CacheService */]])
    ], SObjectService);
    return SObjectService;
}(__WEBPACK_IMPORTED_MODULE_3__index__["a" /* BaseService */]));

//# sourceMappingURL=sobject.service.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(53);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Detail Service models the master-detail relationship.
 */
var DetailService = /** @class */ (function (_super) {
    __extends(DetailService, _super);
    function DetailService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetailService.prototype.setParentId = function (id, field) {
        this.parentId = this.alphanumeric(id);
        this.parentField = this.alphanumeric(field);
        this.store.select(this.type + '_interactivity');
        this.filter(field, id);
    };
    DetailService.prototype.buildWhere = function () {
        return 'WHERE ' + this.parentField + ' = \'' + this.parentId + '\'';
    };
    DetailService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], DetailService);
    return DetailService;
}(__WEBPACK_IMPORTED_MODULE_1__index__["g" /* SObjectService */]));

//# sourceMappingURL=detail.service.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckinService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_utils__ = __webpack_require__(85);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CheckinService = /** @class */ (function (_super) {
    __extends(CheckinService, _super);
    function CheckinService(http, store, sforce, cacher, notification, dialog) {
        var _this = _super.call(this, http, store, sforce, cacher) || this;
        _this.http = http;
        _this.store = store;
        _this.sforce = sforce;
        _this.cacher = cacher;
        _this.notification = notification;
        _this.dialog = dialog;
        _this.type = '';
        return _this;
    }
    CheckinService.prototype.forceInit = function () {
        if (this.type === '') {
            this.setType('time_log__c');
        }
    };
    /**
     * Creates a timelog object which marks the user as checked in for a given claim.
     */
    CheckinService.prototype.checkin = function (data, claim_id, nav) {
        var _this = this;
        if (typeof data !== 'undefined' && parseFloat(data.rate__c) > 0) {
            this.setMetadata({ 'checkedin': claim_id });
            var checkin_1 = {
                ltc_hourly_rate__c: data.rate__c,
                ltc_related_claim__c: claim_id,
                ltc_check_in_datetime__c: new Date(),
                ltc_check_out_time__c: null,
                ltc_related_invoice__c: null
            };
            this.create(checkin_1).then(function (payload) {
                _this.setMetadata({ 'checkedin_id': payload.id });
                checkin_1['id'] = payload.id;
                _this.notification.schedule([{
                        id: 1,
                        title: 'You are currently checked in with a client.',
                        text: 'Checked in for 0:00.',
                        silent: true,
                        sound: null,
                        priority: 2,
                        ongoing: true,
                        data: { id: 'test' }
                    }]);
                var startTime = new Date();
                var noti = _this.notification;
                var updateFunc = function () {
                    var timeStr = Object(__WEBPACK_IMPORTED_MODULE_6__common_utils__["e" /* timeDiff */])(startTime, new Date());
                    noti.update({
                        id: 1,
                        text: 'Checked in for ' + timeStr
                    });
                };
                _this.runner = setInterval(updateFunc, 60000);
                _this.notification.on('click', function (notification, state) {
                    //nav.push(CheckOutPage, [ { id: claim_id }, checkin ]);
                });
                nav.pop();
            });
        }
    };
    /**
     * Checks the user out from their previous check in
     */
    CheckinService.prototype.checkout = function (data, nav) {
        if (typeof data !== 'undefined' && data !== '' && data.checkout__c !== '') {
            this.setMetadata({ 'checkedin': '' });
            this.setMetadata({ 'checkedin_id': '' });
            var checkout = data.checkout__c;
            if (typeof checkout.getHours !== 'function') {
                checkout = new Date(checkout);
            }
            var hours = checkout.getHours() < 9 ? '0' + checkout.getHours() : checkout.getHours();
            var minutes = checkout.getMinutes() < 9 ? '0' + checkout.getMinutes() : checkout.getMinutes();
            var timeStr = hours + ':' + minutes + ':00';
            this.update({
                id: data.id,
                ltc_check_out_time__c: timeStr
            });
            this.notification.cancel(1);
            clearInterval(this.runner);
            nav.pop();
        }
    };
    /**
     * Gets the current check-in status for the current user.
     */
    CheckinService.prototype.getCheckinStatus = function () {
        var _this = this;
        this.forceInit();
        // const user_id = this.sforce.getUserId();
        this.sforce.query('SELECT Id, ltc_related_claim__c FROM time_log__c WHERE ltc_check_out_time__c = NULL LIMIT 1').then(function (data) {
            if (data.records.length > 0) {
                console.log(data.records[0]);
                _this.setMetadata({ 'checkedin': data.records[0].LTC_Related_Claim__c });
                _this.setMetadata({ 'checkedin_id': data.records[0].Id });
            }
            else {
                _this.setMetadata({ 'checkedin': '' });
                _this.setMetadata({ 'checkedin_id': '' });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    CheckinService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["a" /* Store */], __WEBPACK_IMPORTED_MODULE_0____["h" /* SalesforceService */], __WEBPACK_IMPORTED_MODULE_0____["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MatDialog */]])
    ], CheckinService);
    return CheckinService;
}(__WEBPACK_IMPORTED_MODULE_0____["e" /* DetailService */]));

//# sourceMappingURL=checkin.service.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvoiceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var InvoiceService = /** @class */ (function (_super) {
    __extends(InvoiceService, _super);
    function InvoiceService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = '';
        _this.additionalFields = ['ltc_related_claim__r.name'];
        return _this;
    }
    InvoiceService.prototype.forceInit = function () {
        if (this.type === '') {
            this.setType('time_log__c');
        }
    };
    InvoiceService.prototype.createInvoice = function (obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.type = 'ltc_claim_invoice_submission__c';
            _this.create({
                ltc_associated_claim__c: obj.ltc_associated_claim__c,
                ltc_submission_status__c: 'Submitted',
                LTC_Agree_With_Fraud_Disclaimer__c: true
            }).then(function (result) {
                _this.type = 'ltc_claim_invoice__c';
                _this.create({
                    ltc_service_date_to__c: obj.latestDate,
                    ltc_service_date_from__c: obj.earliestDate,
                    ltc_total_charges__c: obj.totalCharges,
                    ltc_hourly_rate__c: obj.hourlyRate,
                    ltc_invoice_submission__c: result['id']
                }).then(function (res2) {
                    resolve(res2);
                }).catch(function (err) { return reject(err); });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    InvoiceService.prototype.buildWhere = function () {
        console.log(this.parentId);
        if (this.parentId) {
            return 'WHERE ' + this.parentField + ' = \'' + this.parentId + '\'';
        }
        return '';
    };
    InvoiceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])()
    ], InvoiceService);
    return InvoiceService;
}(__WEBPACK_IMPORTED_MODULE_0____["e" /* DetailService */]));

//# sourceMappingURL=invoice.service.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClaimService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ClaimService = /** @class */ (function (_super) {
    __extends(ClaimService, _super);
    function ClaimService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = '';
        _this.additionalFields = ['associated_policy__r.insured__r.name', 'associated_policy__r.insured__r.type'];
        return _this;
    }
    ClaimService.prototype.forceInit = function () {
        if (this.type === '') {
            this.setType('claim__c');
        }
    };
    ClaimService.prototype.buildWhere = function () {
        return '';
    };
    ClaimService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])()
    ], ClaimService);
    return ClaimService;
}(__WEBPACK_IMPORTED_MODULE_0____["e" /* DetailService */]));

//# sourceMappingURL=claim.service.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchComponent = /** @class */ (function () {
    function SearchComponent(renderer) {
        this.renderer = renderer;
        this.isActive = false;
        this.query = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    SearchComponent.prototype.onChange = function (e) {
        this.query.next(e);
    };
    SearchComponent.prototype.beginSearch = function () {
        this.isActive = true;
        var searchEl = this.renderer.selectRootElement('#search');
        searchEl.focus();
        /*searchEl.onblur( evt => {
          console.log('blur');
          if (searchEl.value.length < 1) {
            this.clearSearch();
          }
        });*/
    };
    SearchComponent.prototype.clearSearch = function () {
        this.renderer.selectRootElement('#search').value = '';
        this.isActive = false;
        this.query.next('');
    };
    SearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'jh-nav-search',template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\common\search\search.html"*/'<div [ngClass]="isActive ? \'search_wrapper active\' : \'search_wrapper\'">\n\n  <div class="search_area">\n\n    <mat-icon aria-label="Search">search</mat-icon>\n\n    <input type="search" placeholder="Search..." id="search" (keydown)="onChange($event.target.value)" />\n\n    <button mat-icon-button (click)="clearSearch()">\n\n      <mat-icon aria-label="Clear">close</mat-icon>\n\n    </button>\n\n  </div>\n\n  <button mat-icon-button (click)="beginSearch()" class="begin_search" color="white">\n\n    <mat-icon aria-label="Search">search</mat-icon>\n\n  </button>\n\n</div>'/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\common\search\search.html"*/,
            providers: []
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer2 */]])
    ], SearchComponent);
    return SearchComponent;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BaseComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1____ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generic Component used to give typical components a standard structure
 */
var BaseComponent = /** @class */ (function () {
    function BaseComponent(sObjects, store, navCtrl) {
        this.sObjects = sObjects;
        this.store = store;
        this.navCtrl = navCtrl;
    }
    /**
     * Sets the primary sObject type.
     * @param type
     */
    BaseComponent.prototype.setType = function (type) {
        this.sObjects.setType(type);
        this.items = this.sObjects.filteredItems;
        this.beforeGet();
        this.sObjects.getAll();
    };
    BaseComponent.prototype.beforeGet = function () { };
    BaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.search.query.subscribe(function (data) {
            _this.sObjects.search(data);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1____["f" /* SearchComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1____["f" /* SearchComponent */])
    ], BaseComponent.prototype, "search", void 0);
    return BaseComponent;
}());

//# sourceMappingURL=base.component.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PendingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generic component used to handle various types of pending 'getAll' requests.
 */
var PendingComponent = /** @class */ (function () {
    function PendingComponent(store) {
        this.store = store;
        this.meta = this.store.select('meta');
    }
    PendingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'jh-nav-pending',template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\common\pending\pending.html"*/'<div class="mat-spin-wrapper" *ngIf="(meta | async).pending">\n\n  <mat-spinner diameter="30"></mat-spinner>\n\n</div>\n\n'/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\common\pending\pending.html"*/,
            providers: []
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]])
    ], PendingComponent);
    return PendingComponent;
}());

//# sourceMappingURL=pending.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaticMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var StaticMapComponent = /** @class */ (function () {
    function StaticMapComponent() {
        this.apiKey = 'AIzaSyAv0QRF_YvM-KdUG6Q10AxBhlpBCJfaH0U';
        this.zoomLevel = 17;
        this.gettingLocation = true;
        this.accuracyPath = '';
        this.coords = {
            latitude: 0,
            longitude: 0
        };
    }
    StaticMapComponent.prototype.setCoord = function (coords) {
        console.log(coords);
        this.coords = coords;
        this.gettingLocation = false;
        this.buildAccuracyPolygon(coords);
    };
    StaticMapComponent.prototype.buildAccuracyPolygon = function (coords) {
        //Position, decimal degrees
        var lat = coords.latitude;
        var lon = coords.longitude;
        //Earth’s radius, sphere
        var R = 6378137;
        //offsets in meters
        var accuracy = coords.accuracy;
        //Coordinate offsets in radians
        var dLat = accuracy / R;
        var dLon = accuracy / (R * Math.cos(Math.PI * lat / 180));
        //OffsetPosition, decimal degrees
        var deltas = [dLat * 180 / Math.PI, dLon * 180 / Math.PI];
        var coordArray = [];
        for (var angle = 0; angle <= 180; angle += 10) {
            coordArray.push([lat + (deltas[0] * Math.cos(angle * Math.PI / 180)),
                lon + (deltas[1] * Math.sin(angle * Math.PI / 180))]);
        }
        for (var angle = 180; angle >= 0; angle -= 10) {
            coordArray.push([lat + (deltas[0] * Math.cos(-angle * Math.PI / 180)),
                lon + (deltas[1] * Math.sin(-angle * Math.PI / 180))]);
        }
        //coordArray.push(coordArray[0]);
        console.log(coordArray);
        this.accuracyPath = this.magicEncode(coordArray);
    };
    /**
     * Reverse Engineered Google map encoding system.
     * See: https://developers.google.com/maps/documentation/utilities/polylinealgorithm
     *
     * @param coordArray Array of coordinate pairs to encode
     *     Ex. [ [12.41252, -14.15212 ], [13.4124, -14.1234] ]
     */
    StaticMapComponent.prototype.magicEncode = function (coordArray) {
        coordArray.map(function (coords) {
            coords[0] = Math.round(coords[0] * 100000);
            coords[1] = Math.round(coords[1] * 100000);
            return coords;
        });
        var encodeStr = [];
        var delta = [0, 0];
        var encode = function (a) {
            getChar(0 > a ? ~(a << 1) : a << 1);
        };
        var getChar = function (encoded) {
            for (; 32 <= encoded;)
                encodeStr.push(String.fromCharCode((32 | encoded & 31) + 63)),
                    encoded >>= 5;
            encodeStr.push(String.fromCharCode(encoded + 63));
        };
        for (var i = 0; i < coordArray.length; i++) {
            encode(coordArray[i][0] - delta[0]);
            encode(coordArray[i][1] - delta[1]);
            delta = coordArray[i];
        }
        return encodeStr.join('');
    };
    StaticMapComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'jh-static-map',template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\common\static-map\static-map.html"*/'<div *ngIf="gettingLocation">\n\n  <div style="margin-top:100px"></div>\n\n  <mat-spinner diameter="30"></mat-spinner>\n\n  <br />\n\n  Getting location data...\n\n</div>\n\n\n\n<img *ngIf="coords.longitude !== 0" [src]="\'https://maps.googleapis.com/maps/api/staticmap?zoom=\' + zoomLevel + \'&size=400x1640&maptype=roadmap&scale=2&markers=color:red%7Clabel:A%7C\' + coords.latitude + \',\' + coords.longitude + \'&center=\'+ (coords.latitude - 0.0009) + \',\' + coords.longitude +\'&path=color:0x0066FF00%7Cfillcolor:0x0066FF66%7Cenc:\' + accuracyPath +\'&key=\' + apiKey"  />'/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\common\static-map\static-map.html"*/,
            providers: []
        })
    ], StaticMapComponent);
    return StaticMapComponent;
}());

//# sourceMappingURL=static-map.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateTimePickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_date_picker__ = __webpack_require__(261);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DateTimePickerComponent = /** @class */ (function () {
    function DateTimePickerComponent(datePicker) {
        this.datePicker = datePicker;
    }
    DateTimePickerComponent.prototype.setValue = function (value) {
        this.formValue.next(value);
        this.value = value;
    };
    DateTimePickerComponent.prototype.ngOnInit = function () {
        this.value = new Date();
    };
    DateTimePickerComponent.prototype.openPicker = function () {
        var _this = this;
        this.datePicker.show({
            date: this.value,
            mode: 'datetime',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(function (date) { return _this.setValue(date); }, function (err) { return console.log('error when getting date: ', err); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", Date)
    ], DateTimePickerComponent.prototype, "value", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], DateTimePickerComponent.prototype, "label", void 0);
    DateTimePickerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'datetime-picker',template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\common\datetime-picker\datetime-picker.html"*/'<mat-label>{{ label }}</mat-label>\n\n<button mat-button (click)="openPicker()">\n\n  <mat-icon>date_range</mat-icon> {{ value | date: \'short\' }}\n\n</button>\n\n'/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\common\datetime-picker\datetime-picker.html"*/,
            providers: []
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_date_picker__["a" /* DatePicker */]])
    ], DateTimePickerComponent);
    return DateTimePickerComponent;
}());

//# sourceMappingURL=datetime-picker.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialogs__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(dialog, fingerprint) {
        var _this = this;
        this.dialog = dialog;
        this.fingerprint = fingerprint;
        this.billing_rate = '';
        this.username = '';
        this.enabled = false;
        this.available = false;
        this.billing_rate = (localStorage.getItem('billing_rate') !== null) ? localStorage.getItem('billing_rate') : '';
        this.checkFingerprint();
        fingerprint.isAvailable().then(function (result) {
            _this.available = result;
        });
    }
    SettingsComponent.prototype.editBilling = function () {
        var _this = this;
        this.billingDialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__dialogs__["a" /* BillingDialog */]);
        this.billingDialogRef.afterClosed().subscribe(function (data) {
            if (typeof data !== 'undefined' && data.rate__c) {
                localStorage.setItem('billing_rate', data.rate__c);
                _this.billing_rate = data.rate__c;
            }
        });
    };
    SettingsComponent.prototype.editFingerprint = function () {
        var _this = this;
        this.fingerprintDialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__dialogs__["b" /* FingerprintSignInDialog */]);
        this.fingerprintDialogRef.afterClosed().subscribe(function (data) {
            _this.checkFingerprint();
        });
    };
    SettingsComponent.prototype.checkFingerprint = function () {
        var fingerprint = localStorage.getItem('fingerprint');
        if (fingerprint !== null) {
            this.username = fingerprint;
            this.enabled = true;
        }
        else {
            this.username = '';
            this.enabled = false;
        }
    };
    SettingsComponent.prototype.toggleFingerprint = function () {
        this.enabled = !this.enabled;
        var fpEnable = (this.enabled) ? 'true' : 'false';
        localStorage.setItem('fingerprint_enabled', fpEnable);
        if (this.enabled && localStorage.getItem('fingerprint') === null) {
            localStorage.setItem('fingerprint', 'nextlogin');
            this.username = 'nextlogin';
        }
        else if (!this.enabled && this.username === 'nextlogin') {
            this.username = '';
            localStorage.removeItem('fingerprint');
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], SettingsComponent.prototype, "nav", void 0);
    SettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'jh-settings',template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\settings\settings.html"*/'<ion-header>\n\n  <ion-navbar color="secondary">\n\n    <ion-title>Settings</ion-title>\n\n  </ion-navbar>\n\n  <jh-nav-pending></jh-nav-pending>\n\n</ion-header>\n\n<ion-content>\n\n  <mat-list>\n\n    <mat-list-item>\n\n      <button mat-button (click)="editBilling()">\n\n        <mat-icon>attach_money</mat-icon>\n\n        <div>\n\n          <strong mat-line>Default Billing Rate</strong>\n\n          <p mat-line *ngIf="billing_rate !== \'\'">${{billing_rate}} / hour</p>\n\n          <p mat-line *ngIf="billing_rate === \'\'">Unset</p>\n\n        </div>\n\n      </button>\n\n    </mat-list-item>\n\n\n\n    <mat-list-item class="flex">\n\n      <button mat-button class="left" (click)="editFingerprint()" [disabled]="!available">\n\n        <mat-icon>fingerprint</mat-icon>\n\n        <div>\n\n          <strong mat-line>Fingerprint Login</strong>\n\n          <p mat-line *ngIf="!available">Not available on your device</p>\n\n          <p mat-line *ngIf="available && username === \'\'">Not set up</p>\n\n          <p mat-line *ngIf="available && username === \'nextlogin\' && enabled">Setup on next login</p>\n\n          <p mat-line *ngIf="available && username !== \'nextlogin\' && username !== \'\' && enabled">Fingerprint Sign In enabled for {{ username }}</p>\n\n          <p mat-line *ngIf="available && username !== \'nextlogin\' && username !== \'\' && !enabled">Fingerprint Sign In disabled</p>\n\n        </div>\n\n      </button>\n\n      <section>\n\n        <mat-slide-toggle [checked]="enabled && available" [disabled]="!available" (change)="toggleFingerprint()">\n\n        </mat-slide-toggle>\n\n      </section>\n\n    </mat-list-item>\n\n  </mat-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\settings\settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_4__common__["b" /* FingerprintWrapper */]])
    ], SettingsComponent);
    return SettingsComponent;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BillingDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BillingDialog = /** @class */ (function () {
    function BillingDialog(formBuilder, dialogRef) {
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
    }
    BillingDialog.prototype.ngOnInit = function () {
        var rate = (localStorage.getItem('billing_rate') === null) ? '' : localStorage.getItem('billing_rate');
        this.form = this.formBuilder.group({
            rate__c: rate
        });
    };
    BillingDialog.prototype.submit = function (form) {
        this.dialogRef.close(form.value);
    };
    BillingDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'jh-settings-billing',template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\settings\dialogs\billing.html"*/'<h1 mat-dialog-title>Default Billing Rate</h1>\n\n<form [formGroup]="form" (ngSubmit)="submit(form)">\n\n  <mat-dialog-content>    \n\n    <mat-form-field [floatLabel]="true">\n\n      <mat-label>Hourly Rate</mat-label>\n\n      <span class="prefix">$</span>\n\n      <input matInput formControlName="rate__c" >\n\n    </mat-form-field>    \n\n  </mat-dialog-content>\n\n  <mat-dialog-actions>\n\n    <button mat-button color="primary" type="submit">SAVE</button>\n\n    <button mat-button mat-dialog-close>CANCEL</button>\n\n  </mat-dialog-actions>\n\n</form>'/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\settings\dialogs\billing.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatDialogRef */]])
    ], BillingDialog);
    return BillingDialog;
}());

//# sourceMappingURL=billing.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FingerprintSignInDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FingerprintSignInDialog = /** @class */ (function () {
    function FingerprintSignInDialog(formBuilder, dialogRef) {
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
        this.enabled = false;
        this.username = '';
        this.form = this.formBuilder.group({});
        var fingerprint = localStorage.getItem('fingerprint');
        if (fingerprint !== null) {
            this.enabled = true;
            this.username = fingerprint;
        }
    }
    FingerprintSignInDialog.prototype.submit = function (form) {
        if (this.enabled) {
            localStorage.removeItem('fingerprint');
            localStorage.removeItem('fingerprint_cipher');
            localStorage.removeItem('fingerprint_enabled');
        }
        else {
            if (localStorage.getItem('fingerprint') === null) {
                localStorage.setItem('fingerprint', 'nextlogin');
            }
            localStorage.setItem('fingerprint_enabled', 'true');
        }
        this.dialogRef.close(true);
    };
    FingerprintSignInDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'jh-settings-fingerprint',template:/*ion-inline-start:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\settings\dialogs\fingerprint.html"*/'<h1 mat-dialog-title>Fingerprint Sign In</h1>\n\n<form [formGroup]="form" (ngSubmit)="submit(form)">\n\n  <mat-dialog-content>    \n\n    <span *ngIf="!enabled">This device can be unlocked with your fingerprint. Once enabled, it will be setup on your next login.</span>\n\n    <span *ngIf="enabled && username === \'nextlogin\'">Fingerprint Sign In is currently set to enable after your next login.</span>\n\n    <span *ngIf="enabled && username !== \'nextlogin\'">Fingerprint Sign In is currently linked to {{username}}.</span>\n\n  </mat-dialog-content>\n\n  <mat-dialog-actions>\n\n    <button mat-button color="primary" type="submit" *ngIf="!enabled">ENABLE</button>\n\n    <button mat-button color="primary" type="submit" *ngIf="enabled">RESET</button>\n\n    <button mat-button mat-dialog-close>CANCEL</button>\n\n  </mat-dialog-actions>\n\n</form>'/*ion-inline-end:"C:\Users\edd\Documents\GitHub\LTC-provider-app-dev\src\pages\settings\dialogs\fingerprint.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatDialogRef */]])
    ], FingerprintSignInDialog);
    return FingerprintSignInDialog;
}());

//# sourceMappingURL=fingerprint.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return metaReducer; });
var defaultState = {
    'pending': false,
    'refreshing': false,
    'checkedin': ''
};
/**
 * metaReducer
 *
 * Holds metadata about the application in a reducer.
 */
var metaReducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case 'set_meta':
            return Object.assign(state, action.payload);
        default:
            return state;
    }
};
//# sourceMappingURL=meta.reducer.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_service__ = __webpack_require__(337);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__base_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__salesforce_service__ = __webpack_require__(339);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__salesforce_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cache_service__ = __webpack_require__(247);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__cache_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sobject_service__ = __webpack_require__(340);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__sobject_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detail_service__ = __webpack_require__(341);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__detail_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__checkin_service__ = __webpack_require__(342);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__checkin_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invoice_service__ = __webpack_require__(395);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__invoice_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__claim_service__ = __webpack_require__(396);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_7__claim_service__["a"]; });








//# sourceMappingURL=index.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(85);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__utils__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__utils__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__utils__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__utils__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_search__ = __webpack_require__(397);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__search_search__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_component__ = __webpack_require__(398);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pending_pending__ = __webpack_require__(399);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__pending_pending__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__static_map_static_map__ = __webpack_require__(400);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__static_map_static_map__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__datetime_picker_datetime_picker__ = __webpack_require__(401);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__datetime_picker_datetime_picker__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return schema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return schemaSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return version; });
/**
 * F2B Schema
 *
 * This file is automatically generated. DO NOT MAKE CHANGES HERE. Use the schema builder:
 *   cd ltc-provider-app/tools
 *   python3 schemaBuilder.py
 */
var schema = {
    "account": {
        "properties": {
            "id": {
                "type": "string",
                "read-only": true
            },
            "lastmodifieddate": {
                "type": "datetime",
                "read-only": true
            },
            "createddate": {
                "type": "datetime",
                "read-only": true
            },
            "isdeleted": {
                "type": "boolean",
                "read-only": true
            },
            "pending_create": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "pending_update": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "pending_delete": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "cache_age": {
                "type": "integer",
                "local-only": true
            },
            "keep_fresh": {
                "type": "integer",
                "local-only": true,
                "default": 1800
            },
            "prune": {
                "type": "integer",
                "local-only": true,
                "default": 172800
            },
            "name": {
                "type": "string",
                "searchable": true
            },
            "lastname": {
                "type": "string",
                "searchable": true
            },
            "firstname": {
                "type": "string",
                "searchable": true
            },
            "type": {
                "type": "string",
                "searchable": true
            }
        },
        "permissions": {
            "create": "member",
            "update": "member",
            "delete": "member",
            "read": "guest"
        },
        "config": {
            "abstract": false
        },
        "skipList": [],
        "ignoreList": [
            5,
            6,
            7,
            8,
            9,
            10
        ]
    },
    "claim__c": {
        "properties": {
            "id": {
                "type": "string",
                "read-only": true
            },
            "lastmodifieddate": {
                "type": "datetime",
                "read-only": true
            },
            "createddate": {
                "type": "datetime",
                "read-only": true
            },
            "isdeleted": {
                "type": "boolean",
                "read-only": true
            },
            "pending_create": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "pending_update": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "pending_delete": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "cache_age": {
                "type": "integer",
                "local-only": true
            },
            "keep_fresh": {
                "type": "integer",
                "local-only": true,
                "default": 1800
            },
            "prune": {
                "type": "integer",
                "local-only": true,
                "default": 172800
            },
            "associated_policy__c": {
                "type": "string",
                "required": true,
                "searchable": true,
                "read-only": true
            },
            "claim_status__c": {
                "type": "string",
                "searchable": true
            }
        },
        "permissions": {
            "create": "member",
            "update": "member",
            "delete": "member",
            "read": "guest"
        },
        "config": {
            "abstract": false
        },
        "skipList": [],
        "ignoreList": [
            5,
            6,
            7,
            8,
            9,
            10
        ]
    },
    "ltc_claim_invoice_submission__c": {
        "properties": {
            "id": {
                "type": "string",
                "read-only": true
            },
            "lastmodifieddate": {
                "type": "datetime",
                "read-only": true
            },
            "createddate": {
                "type": "datetime",
                "read-only": true
            },
            "isdeleted": {
                "type": "boolean",
                "read-only": true
            },
            "ltc_submission_status__c": {
                "type": "string",
                "required": true,
                "searchable": true
            },
            "ltc_associated_claim__c": {
                "type": "string",
                "required": true,
                "searchable": true,
                "read-only": true
            }
        },
        "permissions": {
            "create": "member",
            "update": "member",
            "delete": "member",
            "read": "guest"
        },
        "config": {
            "abstract": false
        },
        "skipList": [],
        "ignoreList": []
    },
    "ltc_claim_invoice__c": {
        "properties": {
            "id": {
                "type": "string",
                "read-only": true
            },
            "lastmodifieddate": {
                "type": "datetime",
                "read-only": true
            },
            "createddate": {
                "type": "datetime",
                "read-only": true
            },
            "isdeleted": {
                "type": "boolean",
                "read-only": true
            },
            "ltc_invoice_submission__c": {
                "type": "string",
                "required": true,
                "searchable": true
            },
            "ltc_hourly_rate__c": {
                "type": "string",
                "searchable": true
            },
            "ltc_service_date_from__c": {
                "type": "string",
                "required": true,
                "searchable": true
            },
            "ltc_service_date_to__c": {
                "type": "string",
                "required": true,
                "searchable": true
            },
            "ltc_service_dates__c": {
                "type": "string",
                "searchable": true,
                "read-only": true
            },
            "ltc_submission_date__c": {
                "type": "datetime",
                "searchable": true,
                "read-only": true
            },
            "ltc_total_charges__c": {
                "type": "string",
                "required": true,
                "searchable": true
            },
            "ltc_type__c": {
                "type": "string",
                "searchable": true
            },
            "ltc_invoice_submission__r.ltc_associated_claim__c": {
                "type": "string",
                "searchable": true
            }
        },
        "permissions": {
            "create": "member",
            "update": "member",
            "delete": "member",
            "read": "guest"
        },
        "config": {
            "abstract": false
        },
        "skipList": [],
        "ignoreList": []
    },
    "policy__c": {
        "properties": {
            "id": {
                "type": "string",
                "read-only": true
            },
            "lastmodifieddate": {
                "type": "datetime",
                "read-only": true
            },
            "createddate": {
                "type": "datetime",
                "read-only": true
            },
            "isdeleted": {
                "type": "boolean",
                "read-only": true
            },
            "pending_create": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "pending_update": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "pending_delete": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "cache_age": {
                "type": "integer",
                "local-only": true
            },
            "keep_fresh": {
                "type": "integer",
                "local-only": true,
                "default": 1800
            },
            "prune": {
                "type": "integer",
                "local-only": true,
                "default": 172800
            },
            "insured__c": {
                "type": "string",
                "searchable": true
            }
        },
        "permissions": {
            "create": "member",
            "update": "member",
            "delete": "member",
            "read": "guest"
        },
        "config": {
            "abstract": false
        },
        "skipList": [],
        "ignoreList": [
            5,
            6,
            7,
            8,
            9,
            10
        ]
    },
    "time_log__c": {
        "properties": {
            "id": {
                "type": "string",
                "read-only": true
            },
            "lastmodifieddate": {
                "type": "datetime",
                "read-only": true
            },
            "createddate": {
                "type": "datetime",
                "read-only": true
            },
            "isdeleted": {
                "type": "boolean",
                "read-only": true
            },
            "pending_create": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "pending_update": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "pending_delete": {
                "type": "boolean",
                "local-only": true,
                "default": false
            },
            "cache_age": {
                "type": "integer",
                "local-only": true
            },
            "keep_fresh": {
                "type": "integer",
                "local-only": true,
                "default": 1800
            },
            "prune": {
                "type": "integer",
                "local-only": true,
                "default": 172800
            },
            "ltc_related_claim__c": {
                "type": "string",
                "searchable": true
            },
            "ltc_check_in_date__c": {
                "type": "string"
            },
            "ltc_check_in_time__c": {
                "type": "string"
            },
            "ltc_check_out_time__c": {
                "type": "string"
            },
            "type_of_care__c": {
                "type": "string"
            },
            "ltc_hourly_rate__c": {
                "type": "string"
            },
            "ltc_number_of_hours__c": {
                "type": "string"
            },
            "ltc_related_invoice__c": {
                "type": "string"
            },
            "ltc_check_in_type__c": {
                "type": "string"
            },
            "ltc_check_out_type__c": {
                "type": "string"
            },
            "ltc_check_in_geolocation__latitude__s": {
                "type": "string"
            },
            "ltc_check_in_geolocation__longitude__s": {
                "type": "string"
            },
            "ltc_check_in_geolocation__c": {
                "type": "string",
                "read-only": true
            },
            "ltc_check_out_geolocation__latitude__s": {
                "type": "string"
            },
            "ltc_check_out_geolocation__longitude__s": {
                "type": "string"
            },
            "ltc_check_out_geolocation__c": {
                "type": "string",
                "read-only": true
            },
            "ltc_check_in_geolocation_accuracy__c": {
                "type": "string"
            },
            "check_out_geolocation_accuracy__c": {
                "type": "string"
            },
            "ltc_check_in_datetime__c": {
                "type": "datetime"
            }
        },
        "permissions": {
            "create": "member",
            "update": "member",
            "delete": "member",
            "read": "guest"
        },
        "config": {
            "abstract": false
        },
        "skipList": [],
        "ignoreList": [
            5,
            6,
            7,
            8,
            9,
            10
        ]
    }
};
var schemaSQL = "\nCREATE TABLE account (\n\tlocal_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \n\tid VARCHAR, \n\tlastmodifieddate DATETIME, \n\tcreateddate DATETIME, \n\tisdeleted BOOLEAN, \n\tpending_create BOOLEAN, \n\tpending_update BOOLEAN, \n\tpending_delete BOOLEAN, \n\tcache_age INTEGER, \n\tkeep_fresh INTEGER, \n\tprune INTEGER, \n\tname VARCHAR, \n\tlastname VARCHAR, \n\tfirstname VARCHAR, \n\ttype VARCHAR, \n\tCHECK (isdeleted IN (0, 1)), \n\tCHECK (pending_create IN (0, 1)), \n\tCHECK (pending_update IN (0, 1)), \n\tCHECK (pending_delete IN (0, 1))\n)\n\n;\nCREATE TABLE claim__c (\n\tlocal_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \n\tid VARCHAR, \n\tlastmodifieddate DATETIME, \n\tcreateddate DATETIME, \n\tisdeleted BOOLEAN, \n\tpending_create BOOLEAN, \n\tpending_update BOOLEAN, \n\tpending_delete BOOLEAN, \n\tcache_age INTEGER, \n\tkeep_fresh INTEGER, \n\tprune INTEGER, \n\tassociated_policy__c VARCHAR NOT NULL, \n\tclaim_status__c VARCHAR, \n\tCHECK (isdeleted IN (0, 1)), \n\tCHECK (pending_create IN (0, 1)), \n\tCHECK (pending_update IN (0, 1)), \n\tCHECK (pending_delete IN (0, 1))\n)\n\n;\nCREATE TABLE ltc_claim_invoice_submission__c (\n\tlocal_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \n\tid VARCHAR, \n\tlastmodifieddate DATETIME, \n\tcreateddate DATETIME, \n\tisdeleted BOOLEAN, \n\tltc_submission_status__c VARCHAR NOT NULL, \n\tltc_associated_claim__c VARCHAR NOT NULL, \n\tCHECK (isdeleted IN (0, 1))\n)\n\n;\nCREATE TABLE ltc_claim_invoice__c (\n\tlocal_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \n\tid VARCHAR, \n\tlastmodifieddate DATETIME, \n\tcreateddate DATETIME, \n\tisdeleted BOOLEAN, \n\tltc_invoice_submission__c VARCHAR NOT NULL, \n\tltc_hourly_rate__c VARCHAR, \n\tltc_service_date_from__c VARCHAR NOT NULL, \n\tltc_service_date_to__c VARCHAR NOT NULL, \n\tltc_service_dates__c VARCHAR, \n\tltc_submission_date__c DATETIME, \n\tltc_total_charges__c VARCHAR NOT NULL, \n\tltc_type__c VARCHAR, \n\tCHECK (isdeleted IN (0, 1))\n)\n\n;\nCREATE TABLE policy__c (\n\tlocal_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \n\tid VARCHAR, \n\tlastmodifieddate DATETIME, \n\tcreateddate DATETIME, \n\tisdeleted BOOLEAN, \n\tpending_create BOOLEAN, \n\tpending_update BOOLEAN, \n\tpending_delete BOOLEAN, \n\tcache_age INTEGER, \n\tkeep_fresh INTEGER, \n\tprune INTEGER, \n\tinsured__c VARCHAR, \n\tCHECK (isdeleted IN (0, 1)), \n\tCHECK (pending_create IN (0, 1)), \n\tCHECK (pending_update IN (0, 1)), \n\tCHECK (pending_delete IN (0, 1))\n)\n\n;\nCREATE TABLE time_log__c (\n\tlocal_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \n\tid VARCHAR, \n\tlastmodifieddate DATETIME, \n\tcreateddate DATETIME, \n\tisdeleted BOOLEAN, \n\tpending_create BOOLEAN, \n\tpending_update BOOLEAN, \n\tpending_delete BOOLEAN, \n\tcache_age INTEGER, \n\tkeep_fresh INTEGER, \n\tprune INTEGER, \n\tltc_related_claim__c VARCHAR, \n\tltc_check_in_date__c VARCHAR, \n\tltc_check_in_time__c VARCHAR, \n\tltc_check_out_time__c VARCHAR, \n\ttype_of_care__c VARCHAR, \n\tltc_hourly_rate__c VARCHAR, \n\tltc_number_of_hours__c VARCHAR, \n\tltc_related_invoice__c VARCHAR, \n\tltc_check_in_type__c VARCHAR, \n\tltc_check_out_type__c VARCHAR, \n\tltc_check_in_geolocation__latitude__s VARCHAR, \n\tltc_check_in_geolocation__longitude__s VARCHAR, \n\tltc_check_in_geolocation__c VARCHAR, \n\tltc_check_out_geolocation__latitude__s VARCHAR, \n\tltc_check_out_geolocation__longitude__s VARCHAR, \n\tltc_check_out_geolocation__c VARCHAR, \n\tltc_check_in_geolocation_accuracy__c VARCHAR, \n\tcheck_out_geolocation_accuracy__c VARCHAR, \n\tltc_check_in_datetime__c DATETIME, \n\tCHECK (isdeleted IN (0, 1)), \n\tCHECK (pending_create IN (0, 1)), \n\tCHECK (pending_update IN (0, 1)), \n\tCHECK (pending_delete IN (0, 1))\n)\n\n;";
var version = '5d04d4d3-d673-4066-aa56-cf9d330c3f95';
//# sourceMappingURL=schema.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return upsert; });
/* unused harmony export uuid */
/* unused harmony export updatePending */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SJCLWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FingerprintWrapper; });
/* unused harmony export insertPending */
/* unused harmony export DataSourceWrapper */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RateFormatPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TimeEstimatePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return timeDiff; });
/* unused harmony export timeDiffNumber */
/* unused harmony export getGeoCoords */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var upsert = function (state, data, idField, replaceFields) {
    idField = (idField) ? idField : 'id';
    state = state.map(function (obj) {
        var findById = function (newObj) {
            return typeof newObj !== 'undefined' && obj[idField] === newObj[idField];
        };
        var i = data.findIndex(findById);
        if (i > -1) {
            var retObj = data[i];
            if (!replaceFields) {
                for (var key in data[i]) {
                    obj[key] = data[i][key];
                }
                retObj = obj;
            }
            delete data[i];
            return retObj;
        }
        return obj;
    });
    state = state.concat(data.filter(function (obj) { return (typeof obj !== 'undefined'); }));
    return state;
};
var uuid = function (a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid); };
var updatePending = function (state, newObject, uuid) {
    if (uuid) {
        newObject['tempId'] = uuid;
    }
    return upsert(state, newObject, 'tempId');
};
/**
 * Wraps all SJCL-dependent code into a wrapper which makes it testable and modular.
 */
var SJCLWrapper = /** @class */ (function () {
    function SJCLWrapper() {
        /**
         * Hasher takes a password-like code and adds entropy to it by passing it through a pbkdf
         * at 2,000 iterations
         */
        this.hash = function (passcode) { return sjcl.codec.hex.fromBits(sjcl.misc.pbkdf2(passcode, sjcl.codec.hex.toBits('1156739577753345366a3269387173326966'), 2000, 256)); };
        this.sha256 = function (code) { return sjcl.codec.base64url.fromBits(sjcl.hash.sha256.hash(code)); };
        this.encrypt = function (code) { return sjcl.encrypt('@todo: secure this cipher', code); };
        this.decrypt = function (json_string) { return sjcl.decrypt('@todo: secure this cipher', json_string); };
    }
    return SJCLWrapper;
}());

/**
 * Wraps all fingerprint-related code into a wrapper which makes it testable and modular.
 */
var FingerprintWrapper = /** @class */ (function () {
    function FingerprintWrapper() {
    }
    FingerprintWrapper.prototype.isAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (typeof Fingerprint === 'undefined') {
                            resolve(false);
                        }
                        Fingerprint.isAvailable(function (result) {
                            resolve(true);
                        }, function (message) {
                            resolve(false);
                        });
                    })];
            });
        });
    };
    FingerprintWrapper.prototype.show = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (typeof Fingerprint === 'undefined') {
                            reject('fingerprint module not loaded');
                        }
                        Fingerprint.show({
                            clientId: 'JH-LTC-Login',
                            clientSecret: '@todo!:'
                        }, function () {
                            resolve(true);
                        }, function (err) {
                            reject(err);
                        });
                    })];
            });
        });
    };
    return FingerprintWrapper;
}());

/**
 * Creates a temporary UID and inserts an object into the application state with a pending status,
 * then binds to the RESTful call to swap out the temporary UID with the server id once the operation
 * completes.
 */
var insertPending = function (state, data, serviceCall, callback) {
    data['pending'] = true;
    var uid = uuid(false);
    data['tempId'] = uid;
    serviceCall(data, callback);
    return [upsert(state, data), uid];
};
/**
 * Used to bind reducers to a standard observable which acts like a mock-server. Primarily
 * utilized by material data tables.
 */
var DataSourceWrapper = /** @class */ (function () {
    function DataSourceWrapper(observable) {
        this.observable = observable;
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    DataSourceWrapper.prototype.connect = function () {
        return this.observable;
    };
    DataSourceWrapper.prototype.disconnect = function () { };
    return DataSourceWrapper;
}());

/**
 * Given a start time and end time, returns the time difference in hours:minutes.
 * Given a rate as well, it gives the total charge for that time difference.
 */
var RateFormatPipe = /** @class */ (function () {
    function RateFormatPipe() {
    }
    RateFormatPipe.prototype.transform = function (start, end, rate) {
        try {
            end = new Date(end);
            start = new Date(start);
            if (rate) {
                return (timeDiffNumber(start, end) * rate / 60).toFixed(2);
            }
            return timeDiff(start, end);
        }
        catch (e) {
            return 'INVALID DATE';
        }
    };
    RateFormatPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: 'rateFormat'
        })
    ], RateFormatPipe);
    return RateFormatPipe;
}());

/**
 * Given a start and an end, returns the time difference in hours:minutes. If
 * asNumber is set, it will return that as an integer.
 */
var TimeEstimatePipe = /** @class */ (function () {
    function TimeEstimatePipe() {
    }
    TimeEstimatePipe.prototype.transform = function (start, end, asNumber) {
        try {
            end = new Date(end);
            start = new Date(start);
            if (asNumber) {
                return (timeDiffNumber(start, end) / 60).toFixed(2);
            }
            return timeDiff(start, end);
        }
        catch (e) {
            return 'INVALID DATE';
        }
    };
    TimeEstimatePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: 'timeEst'
        })
    ], TimeEstimatePipe);
    return TimeEstimatePipe;
}());

/**
 * Returns the difference between two times as a time string in hours:minutes
 */
var timeDiff = function (startDate, endDate) {
    try {
        var timeDiff_1 = Math.abs(startDate.getTime() - endDate.getTime());
        var hh = Math.floor(timeDiff_1 / 1000 / 60 / 60);
        var timeStr = '' + hh;
        timeDiff_1 -= hh * 1000 * 60 * 60;
        var mm = Math.floor(timeDiff_1 / 1000 / 60);
        if (mm < 10) {
            timeStr += ':0' + mm;
        }
        else {
            timeStr += ':' + mm;
        }
        return timeStr;
    }
    catch (e) {
        return '0:00';
    }
};
/**
 * Difference in hours between two times. Used to calculate the rate a customer was charged.
 */
var timeDiffNumber = function (start, end) { return Math.abs(parseFloat(((end.getTime() - start.getTime()) / 1000 / 60).toFixed(2))); };
/**
 * Utility function which asynchronously returns the user's geolocation data once it is able to obtain it.
 */
var getGeoCoords = function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        resolve(position);
                    }, function (error) {
                        if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.diagnostic) {
                            cordova.plugins.diagnostic.isLocationAuthorized(function (enabled) {
                                if (!enabled) {
                                    var statusEnum_1 = cordova.plugins.diagnostic.permissionStatus;
                                    cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
                                        if (status === statusEnum_1.GRANTED || status === statusEnum_1.GRANTED_WHEN_IN_USE) {
                                            getGeoCoords().then(function (data) { return resolve(data); }, function (error) { return reject(error); });
                                        }
                                        else {
                                            reject('You have disabled location data for this app.');
                                        }
                                    }, function (error) {
                                        reject(error);
                                    });
                                }
                            }, function (error) {
                                reject(error);
                            });
                        }
                        else {
                            reject('Could not request location status at this time.');
                        }
                    }, {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 0
                    });
                })];
        });
    });
};
//# sourceMappingURL=utils.js.map

/***/ })

},[269]);
//# sourceMappingURL=main.js.map