const Event = require('../models/Event');

const getEvents = async (req, res) => {
    try {
        const events = await Event.
            find().
            populate('user', 'name');
        return res.json({
            ok: true,
            events
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Hubo un problema contacte con el administrador"
        })
    }
}

const createEvent = async (req, res) => {

    let event = new Event(req.body);
    try {
        event.user = req.uid;
        await event.save();
        return res.json({
            ok: true,
            event
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Hubo un problema contacte con el administrador"
        })
    }


}

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const uid = req.uid;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                message: "El evento que desea actualizar no existe"
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: "No tiene privilegios de editar este evento"
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        return res.json({
            ok: true,
            event: eventUpdated

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Hubo un problema contacte con el administrador"
        })
    }

}

const deleteEvent = async (req, res) => {

    try {
        const eventId = req.params.id;
        const uid = req.uid;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                message: "El evento que desea eliminar no existe"
            })
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: "No tiene privilegios eliminar este evento"
            })
        }

        const eventDeleted = await Event.findByIdAndDelete(eventId);
        return res.json({
            ok: true,
            message: "Evento eliminado correctamente" ,
            event: eventDeleted
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Hubo un problema contacte con el administrador"
        })
    }
  
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}