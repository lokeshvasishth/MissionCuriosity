import { Add_Item, GET_Data } from "../Action/ActionType";

const initialState = []

// {
//     studentsArr:[],
//     studentsObj:{
//         Id:'',
//         Date:'',
//         name:'',
//         Email:'',
//         Mobno:''
//     },
//     }







export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Add_Item:
            //  state = state.studentsArr.push(action.payload);
            let index = state.findIndex(el => el.Id == action.payload.Id);


            if (index == -1)
                return [...state, action.payload];

            
            return state;

            // case GET_Data:
            // //  state = state.studentsArr.push(action.payload);
            // // let index1 = state.findIndex(el => el.Id == action.payload.Id);


            // // if (index1 == -1)
            // let index1 = state.findIndex(el => el.Id == action.payload.Id);


            // if (index1 == -1)
            //     return [ action.payload];

            
            // return state;

            
            // return state;

            







            
            case GET_Data:
                let index1 = state.findIndex(el => el.Id == action.payload.Id);
                // let index2 = state.filter(el=>el.Id !== action.payload.Id)

            if(index1 == -1)
            // return [...state.filter(el=>el.Id == action.payload.Id), action.payload];

            // else if(index1 !== -1)
            // return [state.filter(el=>el.Id !== action.payload.Id)]
                // let index1 = state.findIndex(el => el.Id == action.payload.Id);

                // if (index1 == -1)
                    return [...state, action.payload];

                //     else if(index1 >= -1)
                //     return state.findIndex(el=>el.Id !== action.payload.Id)
    
                
                return state;


        default: {
            return state
        }
    }

}
// export const reducer1 = (state = initialState, action) => {
//     switch (action.type) {
//     case GET_Data:
//         let index1 = state.findIndex(el => el.Id == action.payload.Id);
//         if(index1 == -1)
//         return [...state.filter(el=>el.Id == action.payload.Id), action.payload];
//         return state;


//         default: {
//             return state
//         }

//     }
// }