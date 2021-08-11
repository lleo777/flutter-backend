const { Schema, model } = require('mongoose');

const LocationSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },

    coordinate: {
        type: {

            type: [Number],
            enum: ['point'],
            enum: ['geometry'],
            required: true
            
        }
    }
}, {

    timestamps: true
});

LocationSchema.method('toJSON', function() {
    const { __v, _id, ...Object } = this.toObject();
    return Object;
})

module.exports = model('Coordinate', LocationSchema);