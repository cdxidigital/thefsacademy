import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AcademySignOut } from "./secure-account-v_ovAAF3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-out-ClNf0WuU.js
var import_jsx_runtime = require_jsx_runtime();
function SignOutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "academy page-section",
		id: "main",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: "YOUR ACCOUNT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Leave this session?" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Signing out does not delete your lessons or progress. You can sign in again whenever you like." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "secure-providers",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcademySignOut, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "button outline",
					children: "Stay in the Academy"
				})]
			})
		]
	});
}
//#endregion
export { SignOutPage as component };
