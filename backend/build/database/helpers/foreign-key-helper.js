"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(model, id) {
    return new Promise((resolve, reject) => {
        model.findOne({ _id: id }, (err, result) => {
            if (result) {
                return resolve(true);
            }
            else
                return reject(new Error(`FK Constraint 'checkObjectsExists' for '${id.toString()}' failed`));
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=foreign-key-helper.js.map