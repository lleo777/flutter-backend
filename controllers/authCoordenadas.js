const { response } = require('express');

const Coordinate = require('../models/location');
const coordinate = require('../models/location');

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const crearLocation = async(req, res = response) => {
    
    const { uid, coordinate, } = req.body;

    try {

        const usuario = await Usuario.findOne(uid);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'la Ubicacion no puede ser registrada'
            });
        }

        const coordinate = new Coordinate(req.body);
        await coordinate.save();            
        

        res.json({
            ok: true,
            uid,
            coordinate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    crearLocation
}

