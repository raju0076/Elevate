import createstore from 'redux-thunk'
import { todoReducer } from './todoReducer'



const store=createstore(todoReducer,applymiddleware(thunk))