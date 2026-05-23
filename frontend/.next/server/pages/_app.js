/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/styles.css */ \"./styles/styles.css\");\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dynamic */ \"./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst Header = next_dynamic__WEBPACK_IMPORTED_MODULE_3___default()(()=>Promise.all(/*! import() */[__webpack_require__.e(\"vendor-chunks/next\"), __webpack_require__.e(\"vendor-chunks/@swc\"), __webpack_require__.e(\"components_Header_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Header */ \"./components/Header.js\")), {\n    loadableGenerated: {\n        modules: [\n            \"pages\\\\_app.js -> \" + \"../components/Header\"\n        ]\n    },\n    ssr: false\n});\nfunction AppLayout({ children }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (false) {}\n        return ()=>{\n            if (false) {}\n        };\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Header, {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\namra\\\\Downloads\\\\DailyDiary\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"notebook\",\n                children: children\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\namra\\\\Downloads\\\\DailyDiary\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\nfunction MyApp({ Component, pageProps }) {\n    // On initial load capture `token` and `username` from query params\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (true) return;\n        try {\n            const url = new URL(window.location.href);\n            const token = url.searchParams.get(\"token\");\n            const username = url.searchParams.get(\"username\");\n            if (token) {\n                localStorage.setItem(\"token\", token);\n                if (username) localStorage.setItem(\"username\", username);\n                // notify app that auth changed\n                window.dispatchEvent(new Event(\"authChanged\"));\n                // If user just returned from OAuth, send them to the journals page\n                try {\n                    const currentPath = window.location.pathname || \"/\";\n                    if (!currentPath || currentPath === \"/\") {\n                        // replace location so the token isn't left in history\n                        window.location.replace(\"/journals\");\n                        return;\n                    }\n                } catch (e) {\n                // ignore\n                }\n                // remove token from URL to avoid leaking it in browser history\n                url.searchParams.delete(\"token\");\n                url.searchParams.delete(\"username\");\n                const clean = url.pathname + (url.search ? \"?\" + url.searchParams.toString() : \"\") + url.hash;\n                window.history.replaceState({}, document.title, clean);\n            }\n        } catch (err) {\n        // ignore\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AppLayout, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\namra\\\\Downloads\\\\DailyDiary\\\\frontend\\\\pages\\\\_app.js\",\n            lineNumber: 62,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\namra\\\\Downloads\\\\DailyDiary\\\\frontend\\\\pages\\\\_app.js\",\n        lineNumber: 61,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBNkI7QUFDSTtBQUNDO0FBRWxDLE1BQU1FLFNBQVNELG1EQUFPQSxDQUFDLElBQU0sK1FBQU87Ozs7OztJQUEyQkUsS0FBSzs7QUFFcEUsU0FBU0MsVUFBVSxFQUFFQyxRQUFRLEVBQUU7SUFDN0JMLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxLQUFrQixFQUFhTSxFQUE0QjtRQUMvRCxPQUFPO1lBQ0wsSUFBSSxLQUFrQixFQUFhQSxFQUErQjtRQUNwRTtJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFOzswQkFDRSw4REFBQ0o7Ozs7OzBCQUNELDhEQUFDUztnQkFBSUMsV0FBVTswQkFDWlA7Ozs7Ozs7O0FBSVQ7QUFFZSxTQUFTUSxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3BELG1FQUFtRTtJQUNuRWYsZ0RBQVNBLENBQUM7UUFDUixJQUFJLElBQWtCLEVBQWE7UUFDbkMsSUFBSTtZQUNGLE1BQU1nQixNQUFNLElBQUlDLElBQUlDLE9BQU9DLFFBQVEsQ0FBQ0MsSUFBSTtZQUN4QyxNQUFNQyxRQUFRTCxJQUFJTSxZQUFZLENBQUNDLEdBQUcsQ0FBQztZQUNuQyxNQUFNQyxXQUFXUixJQUFJTSxZQUFZLENBQUNDLEdBQUcsQ0FBQztZQUN0QyxJQUFJRixPQUFPO2dCQUNUSSxhQUFhQyxPQUFPLENBQUMsU0FBU0w7Z0JBQzlCLElBQUlHLFVBQVVDLGFBQWFDLE9BQU8sQ0FBQyxZQUFZRjtnQkFDL0MsK0JBQStCO2dCQUMvQk4sT0FBT1MsYUFBYSxDQUFDLElBQUlDLE1BQU07Z0JBQy9CLG1FQUFtRTtnQkFDbkUsSUFBSTtvQkFDRixNQUFNQyxjQUFjWCxPQUFPQyxRQUFRLENBQUNXLFFBQVEsSUFBSTtvQkFDaEQsSUFBSSxDQUFDRCxlQUFlQSxnQkFBZ0IsS0FBSzt3QkFDdkMsc0RBQXNEO3dCQUN0RFgsT0FBT0MsUUFBUSxDQUFDWSxPQUFPLENBQUM7d0JBQ3hCO29CQUNGO2dCQUNGLEVBQUUsT0FBT0MsR0FBRztnQkFDVixTQUFTO2dCQUNYO2dCQUNBLCtEQUErRDtnQkFDL0RoQixJQUFJTSxZQUFZLENBQUNXLE1BQU0sQ0FBQztnQkFDeEJqQixJQUFJTSxZQUFZLENBQUNXLE1BQU0sQ0FBQztnQkFDeEIsTUFBTUMsUUFBUWxCLElBQUljLFFBQVEsR0FBSWQsQ0FBQUEsSUFBSW1CLE1BQU0sR0FBSSxNQUFNbkIsSUFBSU0sWUFBWSxDQUFDYyxRQUFRLEtBQU0sRUFBQyxJQUFLcEIsSUFBSXFCLElBQUk7Z0JBQy9GbkIsT0FBT29CLE9BQU8sQ0FBQ0MsWUFBWSxDQUFDLENBQUMsR0FBR2pDLFNBQVNrQyxLQUFLLEVBQUVOO1lBQ2xEO1FBQ0YsRUFBRSxPQUFPTyxLQUFLO1FBQ1osU0FBUztRQUNYO0lBQ0YsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNyQztrQkFDQyw0RUFBQ1U7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUc5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2RhaWx5LWRpYXJ5LWZyb250ZW5kLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL3N0eWxlcy5jc3MnXHJcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgZHluYW1pYyBmcm9tICduZXh0L2R5bmFtaWMnXHJcblxyXG5jb25zdCBIZWFkZXIgPSBkeW5hbWljKCgpID0+IGltcG9ydCgnLi4vY29tcG9uZW50cy9IZWFkZXInKSwgeyBzc3I6IGZhbHNlIH0pXHJcblxyXG5mdW5jdGlvbiBBcHBMYXlvdXQoeyBjaGlsZHJlbiB9KSB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdqb3VybmFsLXRoZW1lJylcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdqb3VybmFsLXRoZW1lJylcclxuICAgIH1cclxuICB9LCBbXSlcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxIZWFkZXIgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RlYm9va1wiPlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8Lz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xyXG4gIC8vIE9uIGluaXRpYWwgbG9hZCBjYXB0dXJlIGB0b2tlbmAgYW5kIGB1c2VybmFtZWAgZnJvbSBxdWVyeSBwYXJhbXNcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpXHJcbiAgICAgIGNvbnN0IHRva2VuID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3Rva2VuJylcclxuICAgICAgY29uc3QgdXNlcm5hbWUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgndXNlcm5hbWUnKVxyXG4gICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCB0b2tlbilcclxuICAgICAgICBpZiAodXNlcm5hbWUpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VybmFtZScsIHVzZXJuYW1lKVxyXG4gICAgICAgIC8vIG5vdGlmeSBhcHAgdGhhdCBhdXRoIGNoYW5nZWRcclxuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2F1dGhDaGFuZ2VkJykpXHJcbiAgICAgICAgLy8gSWYgdXNlciBqdXN0IHJldHVybmVkIGZyb20gT0F1dGgsIHNlbmQgdGhlbSB0byB0aGUgam91cm5hbHMgcGFnZVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSB8fCAnLydcclxuICAgICAgICAgIGlmICghY3VycmVudFBhdGggfHwgY3VycmVudFBhdGggPT09ICcvJykge1xyXG4gICAgICAgICAgICAvLyByZXBsYWNlIGxvY2F0aW9uIHNvIHRoZSB0b2tlbiBpc24ndCBsZWZ0IGluIGhpc3RvcnlcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoJy9qb3VybmFscycpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIC8vIGlnbm9yZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZW1vdmUgdG9rZW4gZnJvbSBVUkwgdG8gYXZvaWQgbGVha2luZyBpdCBpbiBicm93c2VyIGhpc3RvcnlcclxuICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgndG9rZW4nKVxyXG4gICAgICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKCd1c2VybmFtZScpXHJcbiAgICAgICAgY29uc3QgY2xlYW4gPSB1cmwucGF0aG5hbWUgKyAodXJsLnNlYXJjaCA/ICgnPycgKyB1cmwuc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkpIDogJycpICsgdXJsLmhhc2hcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCBjbGVhbilcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIC8vIGlnbm9yZVxyXG4gICAgfVxyXG4gIH0sIFtdKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEFwcExheW91dD5cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgPC9BcHBMYXlvdXQ+XHJcbiAgKVxyXG59XHJcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJkeW5hbWljIiwiSGVhZGVyIiwic3NyIiwiQXBwTGF5b3V0IiwiY2hpbGRyZW4iLCJkb2N1bWVudCIsImJvZHkiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkaXYiLCJjbGFzc05hbWUiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInVybCIsIlVSTCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInRva2VuIiwic2VhcmNoUGFyYW1zIiwiZ2V0IiwidXNlcm5hbWUiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiY3VycmVudFBhdGgiLCJwYXRobmFtZSIsInJlcGxhY2UiLCJlIiwiZGVsZXRlIiwiY2xlYW4iLCJzZWFyY2giLCJ0b1N0cmluZyIsImhhc2giLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidGl0bGUiLCJlcnIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/styles.css":
/*!***************************!*\
  !*** ./styles/styles.css ***!
  \***************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();