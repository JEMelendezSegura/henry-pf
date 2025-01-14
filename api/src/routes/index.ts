import {Router} from 'express'
import exercisesRoutes from './exercisesRoutes'
import productsRoutes from './productsRoutes';
import usersRoutes from './usersRoutes';
import salesRoutes from './salesRoutes';
import routinesRoutes from './routinesRouter';
import dashboardRoutes from './dashboardRoutes';


const router = Router()

router.use('/users',usersRoutes)
router.use('/products',productsRoutes)
router.use('/exercises',exercisesRoutes)
router.use('/sales',salesRoutes)
router.use('/routines',routinesRoutes)
router.use('/dashboard',dashboardRoutes)

module.exports= router


