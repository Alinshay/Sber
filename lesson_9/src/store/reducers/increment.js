
import{INCREMENT} from '../types'

export default (state=0, action)=>{

    switch(action.type){
        case "":
            return state + action.num;

        default: return state
    }
}
