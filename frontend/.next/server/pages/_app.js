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

/***/ "./components/Header.js":
/*!******************************!*\
  !*** ./components/Header.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Header)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"../node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"../node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction Header() {\n    const [username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    // Fetch current user from server when needed\n    async function fetchMe(token) {\n        try {\n            const r = await fetch(\"http://localhost:4000/api/auth/me\", {\n                headers: {\n                    Authorization: \"Bearer \" + token\n                }\n            });\n            if (r.ok) {\n                const j = await r.json();\n                const uname = j && j.user && j.user.username || j.username || null;\n                if (uname) {\n                    setUsername(uname);\n                    localStorage.setItem(\"username\", uname);\n                    return;\n                }\n            }\n            // invalid token or no user\n            localStorage.removeItem(\"token\");\n            localStorage.removeItem(\"username\");\n            setUsername(null);\n        } catch (err) {\n            console.error(\"fetch /me failed\", err);\n        }\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (true) return;\n        function updateFromStorage() {\n            const uname = localStorage.getItem(\"username\");\n            const token = localStorage.getItem(\"token\");\n            if (uname) {\n                setUsername(uname);\n            } else if (token) {\n                fetchMe(token);\n            } else {\n                setUsername(null);\n            }\n        }\n        // Initial check\n        updateFromStorage();\n        // Listen for auth changes dispatched within the same window\n        const onAuthChanged = ()=>updateFromStorage();\n        window.addEventListener(\"authChanged\", onAuthChanged);\n        // Also listen for storage events from other tabs/windows\n        const onStorage = (e)=>{\n            if (e.key === \"token\" || e.key === \"username\") updateFromStorage();\n        };\n        window.addEventListener(\"storage\", onStorage);\n        return ()=>{\n            window.removeEventListener(\"authChanged\", onAuthChanged);\n            window.removeEventListener(\"storage\", onStorage);\n        };\n    }, []);\n    function logout() {\n        if (false) {}\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n        style: {\n            padding: 12,\n            borderBottom: \"1px solid #ddd\",\n            marginBottom: 12\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                href: \"/\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                    children: \"Daily Diary\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\components\\\\Header.js\",\n                    lineNumber: 79,\n                    columnNumber: 22\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\components\\\\Header.js\",\n                lineNumber: 79,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                style: {\n                    float: \"right\"\n                },\n                children: username ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            style: {\n                                marginRight: 12\n                            },\n                            children: [\n                                \"Hi, \",\n                                username\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\components\\\\Header.js\",\n                            lineNumber: 83,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: logout,\n                            children: \"Logout\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\components\\\\Header.js\",\n                            lineNumber: 84,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true) : // If we're on the homepage, don't show login/signup here because\n                // the page itself provides those controls. Also hide the login link\n                // when we're already on the login page.\n                router.pathname === \"/\" ? null : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        router.pathname !== \"/login\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/login\",\n                            className: \"button-like\",\n                            children: \"Log in\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\components\\\\Header.js\",\n                            lineNumber: 93,\n                            columnNumber: 17\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/signup\",\n                            className: \"button-like\",\n                            children: \"Sign up\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\components\\\\Header.js\",\n                            lineNumber: 95,\n                            columnNumber: 15\n                        }, this)\n                    ]\n                }, void 0, true)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\components\\\\Header.js\",\n                lineNumber: 80,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\components\\\\Header.js\",\n        lineNumber: 78,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bmQvLi9jb21wb25lbnRzL0hlYWRlci5qcz80ZGJiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhlYWRlcigpIHtcclxuICBjb25zdCBbdXNlcm5hbWUsIHNldFVzZXJuYW1lXSA9IHVzZVN0YXRlKG51bGwpXHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcclxuXHJcbiAgLy8gRmV0Y2ggY3VycmVudCB1c2VyIGZyb20gc2VydmVyIHdoZW4gbmVlZGVkXHJcbiAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hNZSh0b2tlbikge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgciA9IGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjQwMDAvYXBpL2F1dGgvbWUnLCB7XHJcbiAgICAgICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uOiAnQmVhcmVyICcgKyB0b2tlbiB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyLm9rKSB7XHJcbiAgICAgICAgY29uc3QgaiA9IGF3YWl0IHIuanNvbigpXHJcbiAgICAgICAgY29uc3QgdW5hbWUgPSAoaiAmJiBqLnVzZXIgJiYgai51c2VyLnVzZXJuYW1lKSB8fCBqLnVzZXJuYW1lIHx8IG51bGxcclxuICAgICAgICBpZiAodW5hbWUpIHtcclxuICAgICAgICAgIHNldFVzZXJuYW1lKHVuYW1lKVxyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJuYW1lJywgdW5hbWUpXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gaW52YWxpZCB0b2tlbiBvciBubyB1c2VyXHJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpXHJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VybmFtZScpXHJcbiAgICAgIHNldFVzZXJuYW1lKG51bGwpXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignZmV0Y2ggL21lIGZhaWxlZCcsIGVycilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVyblxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZyb21TdG9yYWdlKCkge1xyXG4gICAgICBjb25zdCB1bmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpXHJcbiAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcclxuICAgICAgaWYgKHVuYW1lKSB7XHJcbiAgICAgICAgc2V0VXNlcm5hbWUodW5hbWUpXHJcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4pIHtcclxuICAgICAgICBmZXRjaE1lKHRva2VuKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFVzZXJuYW1lKG51bGwpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsIGNoZWNrXHJcbiAgICB1cGRhdGVGcm9tU3RvcmFnZSgpXHJcblxyXG4gICAgLy8gTGlzdGVuIGZvciBhdXRoIGNoYW5nZXMgZGlzcGF0Y2hlZCB3aXRoaW4gdGhlIHNhbWUgd2luZG93XHJcbiAgICBjb25zdCBvbkF1dGhDaGFuZ2VkID0gKCkgPT4gdXBkYXRlRnJvbVN0b3JhZ2UoKVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2F1dGhDaGFuZ2VkJywgb25BdXRoQ2hhbmdlZClcclxuXHJcbiAgICAvLyBBbHNvIGxpc3RlbiBmb3Igc3RvcmFnZSBldmVudHMgZnJvbSBvdGhlciB0YWJzL3dpbmRvd3NcclxuICAgIGNvbnN0IG9uU3RvcmFnZSA9IChlKSA9PiB7XHJcbiAgICAgIGlmIChlLmtleSA9PT0gJ3Rva2VuJyB8fCBlLmtleSA9PT0gJ3VzZXJuYW1lJykgdXBkYXRlRnJvbVN0b3JhZ2UoKVxyXG4gICAgfVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBvblN0b3JhZ2UpXHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2F1dGhDaGFuZ2VkJywgb25BdXRoQ2hhbmdlZClcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBvblN0b3JhZ2UpXHJcbiAgICB9XHJcbiAgfSwgW10pXHJcblxyXG4gIGZ1bmN0aW9uIGxvZ291dCgpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKVxyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcm5hbWUnKVxyXG4gICAgICAvLyBub3RpZnkgb3RoZXIgcGFydHMgb2YgdGhlIGFwcFxyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2F1dGhDaGFuZ2VkJykpXHJcbiAgICAgIHJvdXRlci5wdXNoKCcvJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8aGVhZGVyIHN0eWxlPXt7IHBhZGRpbmc6IDEyLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2RkZCcsIG1hcmdpbkJvdHRvbTogMTIgfX0+XHJcbiAgICAgIDxMaW5rIGhyZWY9XCIvXCI+PHN0cm9uZz5EYWlseSBEaWFyeTwvc3Ryb25nPjwvTGluaz5cclxuICAgICAgPHNwYW4gc3R5bGU9e3sgZmxvYXQ6ICdyaWdodCcgfX0+XHJcbiAgICAgICAge3VzZXJuYW1lID8gKFxyXG4gICAgICAgICAgPD5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luUmlnaHQ6IDEyIH19PkhpLCB7dXNlcm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2xvZ291dH0+TG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgICA8Lz5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgLy8gSWYgd2UncmUgb24gdGhlIGhvbWVwYWdlLCBkb24ndCBzaG93IGxvZ2luL3NpZ251cCBoZXJlIGJlY2F1c2VcclxuICAgICAgICAgIC8vIHRoZSBwYWdlIGl0c2VsZiBwcm92aWRlcyB0aG9zZSBjb250cm9scy4gQWxzbyBoaWRlIHRoZSBsb2dpbiBsaW5rXHJcbiAgICAgICAgICAvLyB3aGVuIHdlJ3JlIGFscmVhZHkgb24gdGhlIGxvZ2luIHBhZ2UuXHJcbiAgICAgICAgICByb3V0ZXIucGF0aG5hbWUgPT09ICcvJyA/IG51bGwgOiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAge3JvdXRlci5wYXRobmFtZSAhPT0gJy9sb2dpbicgJiYgKFxyXG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9sb2dpblwiIGNsYXNzTmFtZT1cImJ1dHRvbi1saWtlXCI+TG9nIGluPC9MaW5rPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9zaWdudXBcIiBjbGFzc05hbWU9XCJidXR0b24tbGlrZVwiPlNpZ24gdXA8L0xpbms+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvaGVhZGVyPlxyXG4gIClcclxufVxyXG4iXSwibmFtZXMiOlsiTGluayIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlUm91dGVyIiwiSGVhZGVyIiwidXNlcm5hbWUiLCJzZXRVc2VybmFtZSIsInJvdXRlciIsImZldGNoTWUiLCJ0b2tlbiIsInIiLCJmZXRjaCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwib2siLCJqIiwianNvbiIsInVuYW1lIiwidXNlciIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJyZW1vdmVJdGVtIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwidXBkYXRlRnJvbVN0b3JhZ2UiLCJnZXRJdGVtIiwib25BdXRoQ2hhbmdlZCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJvblN0b3JhZ2UiLCJlIiwia2V5IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImxvZ291dCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInB1c2giLCJoZWFkZXIiLCJzdHlsZSIsInBhZGRpbmciLCJib3JkZXJCb3R0b20iLCJtYXJnaW5Cb3R0b20iLCJocmVmIiwic3Ryb25nIiwic3BhbiIsImZsb2F0IiwibWFyZ2luUmlnaHQiLCJidXR0b24iLCJvbkNsaWNrIiwicGF0aG5hbWUiLCJjbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Header.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/styles.css */ \"./styles/styles.css\");\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Header */ \"./components/Header.js\");\n\n\n\n\nfunction AppLayout({ children }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (false) {}\n        return ()=>{\n            if (false) {}\n        };\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 15,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"notebook\",\n                children: children\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AppLayout, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\pages\\\\_app.js\",\n            lineNumber: 26,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\namra\\\\OneDrive - UNCG\\\\CSC372WebDev\\\\CSC372TermProject\\\\frontend\\\\pages\\\\_app.js\",\n        lineNumber: 25,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUE2QjtBQUNJO0FBQ1E7QUFFekMsU0FBU0UsVUFBVSxFQUFFQyxRQUFRLEVBQUU7SUFDN0JILGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxLQUFrQixFQUFhSSxFQUE0QjtRQUMvRCxPQUFPO1lBQ0wsSUFBSSxLQUFrQixFQUFhQSxFQUErQjtRQUNwRTtJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFOzswQkFDRSw4REFBQ0gsMERBQU1BOzs7OzswQkFDUCw4REFBQ1E7Z0JBQUlDLFdBQVU7MEJBQ1pQOzs7Ozs7OztBQUlUO0FBRWUsU0FBU1EsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNwRCxxQkFDRSw4REFBQ1g7a0JBQ0MsNEVBQUNVO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYWlseS1kaWFyeS1mcm9udGVuZC8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9zdHlsZXMuY3NzJ1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9jb21wb25lbnRzL0hlYWRlcidcclxuXHJcbmZ1bmN0aW9uIEFwcExheW91dCh7IGNoaWxkcmVuIH0pIHtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2pvdXJuYWwtdGhlbWUnKVxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2pvdXJuYWwtdGhlbWUnKVxyXG4gICAgfVxyXG4gIH0sIFtdKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPEhlYWRlciAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdGVib29rXCI+XHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxBcHBMYXlvdXQ+XHJcbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgIDwvQXBwTGF5b3V0PlxyXG4gIClcclxufVxyXG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwiSGVhZGVyIiwiQXBwTGF5b3V0IiwiY2hpbGRyZW4iLCJkb2N1bWVudCIsImJvZHkiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkaXYiLCJjbGFzc05hbWUiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

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