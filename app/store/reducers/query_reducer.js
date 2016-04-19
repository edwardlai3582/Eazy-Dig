import initialState from '../initialstate';

import idb from '../../idb';

export default (currentstate, action) => {    
	switch (action.type) {
		case "HISTORY_QUERY_FROM_IDB_ADDED":
            console.log(action.queryHistory);
            console.log("HISTORY_QUERY_FROM_IDB_ADDED");
            let temp=[];
            for(let i=0;i<action.queryHistory.length;i++){
                temp.push(action.queryHistory[i])
            }
            return Object.assign({}, currentstate, {
				queryHistory: temp
			}); 
            
		case "QUERY_ADDED":
            for(let i=0; i<currentstate.queryHistory.length; i++){
                if(currentstate.queryHistory[i].query===action.query){
                    return currentstate;    
                }
            }
            
            currentstate.queryHistory.slice(0);
            if(currentstate.queryHistory.length===currentstate.historyLength){
                currentstate.queryHistory.shift();    
            }      
            currentstate.queryHistory.push({query:action.query, timestamp:action.timestamp});

            idb.open('eazyDig', 3, function(upgradeDb) {
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
            }).then(function(db){
                var tx = db.transaction('history', 'readwrite');
                var store = tx.objectStore('history');
                store.add({query:action.query, timestamp:action.timestamp});

                // limit store to 10 items
                store.index('by-time').openCursor(null, "prev").then(function(cursor) {
                  return cursor.advance(10);
                }).then(function deleteRest(cursor) {
                  if (!cursor) return;
                  cursor.delete();
                  return cursor.continue().then(deleteRest);
                });   
            });  

            return Object.assign({}, currentstate );                 
            
		default: return currentstate || initialState.query;
	}
};
