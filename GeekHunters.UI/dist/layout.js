"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const geek_hunters_header_1 = require("./components/geek-hunters-header");
const geek_hunters_tabs_1 = require("./components/geek-hunters-tabs");
class Layout extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(geek_hunters_header_1.default, null),
            React.createElement(geek_hunters_tabs_1.default, null)));
    }
}
exports.default = Layout;
//# sourceMappingURL=layout.js.map