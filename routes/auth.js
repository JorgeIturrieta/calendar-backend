// TODO: auth // crear, login , renew
/* Rutas de usuarios
   host + /api/auth + [auth route]
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJwt } = require('../middlewares/validate-jwt');
const router = Router();
router.post('/new',
   [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El email no es correcto').isEmail(),
      check('password', 'El password debe de ser de almenos 6 caracteres').isLength({ min: 6 }),
      validateFields
   ],
   createUser);
router.post('/',
   [   check('email', 'El email no es correcto').isEmail(),
       check('password', 'El password debe de ser de almenos 6 caracteres').isLength({ min: 6 }),
       validateFields
   ],
   loginUser);

router.get('/renew',[validateJwt] , revalidateToken);

module.exports = router;