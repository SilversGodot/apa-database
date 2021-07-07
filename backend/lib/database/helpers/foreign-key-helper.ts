import * as mongoose from 'mongoose';

export default function (model: mongoose.Model<any>, id: any) {
    return new Promise((resolve, reject) => {
        model.findOne({ _id: id }, (err: any, result: any) => {
            if (result) {
                return resolve(true)
            } else
                return reject(
                    new Error(
                        `FK Constraint 'checkObjectsExists' for '${id.toString()}' failed`
                    )
                )
        })
    })
}