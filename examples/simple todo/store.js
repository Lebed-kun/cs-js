import Store from '../../core/store.js';

const store = new Store({
    todos : [
        {
            id : 1,
            title : 'Hello world',
            description : 'HHHHHHHHHHHH'
        },
        {
            id : 2,
            title : 'DArulez',
            description : '80s-00s look like they have hope for future'
        },
        {
            id : 3,
            title : 'Jay',
            description : 'No "girlish in guys is a curable sick" conservatives, no "I\'m offended of lacking black muslim transwomen in the scandinavian saga" SJWs'
        }
    ],
    lastId : 3
});

export default store;