import initialState from '../initialstate';

import idb from '../../idb';

export default (currentstate, action) => {    
	switch (action.type) {
        case "FAV_FROM_IDB_ADDED":
            console.log(action.favs);
            console.log("FAV_FROM_IDB_ADDED");
            let temp=[];
            for(let i=0;i<action.favs.length;i++){
                temp.push(action.favs[i])
            }
            return Object.assign({}, currentstate, {
				favorite: temp
			});     
            
		case "TOGGLE_FAVORITE":             
            //console.log(action.chosen_title);
            for(let i=0; i<currentstate.favorite.length; i++){                
                if(action.id === currentstate.favorite[i].id){
                    idb.open('eazyDig', 3, (upgradeDb)=> {
                        switch (upgradeDb.oldVersion) {
                            case 0:
                                upgradeDb.createObjectStore('urls', {
                                    keyPath: 'url'
                                });
                            case 1:
                                var store=upgradeDb.createObjectStore('history', { 
                                    keyPath: "timestamp"
                                });
                                store.createIndex('by-time', 'timestamp');

                            case 2:
                                var store=upgradeDb.createObjectStore('fav', { 
                                            keyPath: "id"
                                        });
                                store.createIndex('by-name', 'chosen_title');      
                        }
                    }).then((db)=>{
                        var tx = db.transaction('fav', 'readwrite');
                        var store = tx.objectStore('fav');
                        console.log(action.id);
                        store.delete(action.id);
                    });            
                    //let temp = [];
                    //temp =temp.concat(currentstate.favorite).splice(i, 1);
                    //currentstate.favorite.splice(i, 1); 
                    return Object.assign({}, currentstate,{
                        favorite: [
                            ...currentstate.favorite.slice(0,i),
                            ...currentstate.favorite.slice(i+1)
                        ]
                    } ); 
                }
            }
            
            idb.open('eazyDig', 3, (upgradeDb)=> {
                switch (upgradeDb.oldVersion) {
                    case 0:
                        upgradeDb.createObjectStore('urls', {
                            keyPath: 'url'
                        });
                    case 1:
                        var store=upgradeDb.createObjectStore('history', { 
                            keyPath: "timestamp"
                        });
                        store.createIndex('by-time', 'timestamp');

                    case 2:
                        var store=upgradeDb.createObjectStore('fav', { 
                                    keyPath: "id"
                                });
                        store.createIndex('by-name', 'chosen_title');      
                }
            }).then((db)=>{
                var tx = db.transaction('fav', 'readwrite');
                var store = tx.objectStore('fav');
                console.log(action.id);
                store.add({id: action.id, chosen_title: action.chosen_title});
            });            
            //let temp=[];
            //temp = temp.concat(currentstate.favorite).push({id: action.id, chosen_title: action.chosen_title});
            //temp = [...currentstate.favorite, {id: action.id, chosen_title: action.chosen_title}];
            //currentstate.favorite.push({id: action.id, chosen_title: action.chosen_title});
            return Object.assign({}, currentstate,{
                favorite: [...currentstate.favorite, {id: action.id, chosen_title: action.chosen_title}]    
            } ); 
            
		default: return currentstate || initialState.favorite;
	}
};
         