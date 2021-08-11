const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje, grabarLocation } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])
    console.log('cliente Connectado');
    // Verificar autenticación
    if (!valido) { return client.disconnect(); }

    // Cliente autenticado
    usuarioConectado(uid);

    // Ingresar al usuario a una sala en particular
    // sala global, client.id, 5f298534ad4169714548b785
    client.join(uid);

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload) => {
        // TODO: Grabar mensaje
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    })

    // Escuchar del cliente la localizacion
    client.on('location', async(payload) => {
        // TODO: Grabar localizacion
        await grabarLocation(payload);
        io.to(payload.para).emit('location', payload);
    })


    client.on('disconnect', () => {
        console.log('cliente Desconectado');
        usuarioDesconectado(uid);
    });







});