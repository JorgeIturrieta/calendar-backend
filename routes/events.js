/* Rutas de eventos
   host + /api/events + [events route]
*/
const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJwt } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
let router = require('./auth');
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/isDate');
router = Router();
// Todas las peticiones deben de pasar la validacion JWT
router.use(validateJwt);
// Obtener eventos 
router.get('/', getEvents);
// Crear un nuevo evento
router.post('/', [
   check('title','El titulo es Obligatorio').not().isEmpty() ,
   check('start','Fecha de inicio es obligatoria').custom(isDate) ,
   check('end','Fecha de fin es obligatoria').custom(isDate)  ,    
   validateFields
], createEvent);
// Actualizar un nuevo evento
router.put('/:id',[
   check('title','El titulo es Obligatorio').not().isEmpty() ,
   check('start','Fecha de inicio es obligatoria').custom(isDate) ,
   check('end','Fecha de fin es obligatoria').custom(isDate)  ,    
   validateFields
], updateEvent);
// Borrar un  evento
router.delete('/:id', deleteEvent);

module.exports = router;


