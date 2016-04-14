import C from '../constants';

export default {
	feedback: {
        msg: "", 
        error: false 
    },
    auth: {
		currently: C.ANONYMOUS,
		username: null,
		uid: null
	},
    events: {
		hasreceiveddata: false,
		submittingnew: false,
		states: {},
		data: {}
	},
    showModal: {
        showSignupform:false,
        showEventform:false
    },
    search: {
		results: [],
        page: 1,
        pages: 1
	},
    query: {
        queryHistory: [],
        historyLength: 10
    },
    loading: {
        loadingNow: false
    },
    release: {
        chosen_title: '',
        id: '',
        release: {}
    },
    suggestPrice: {
        suggestPrice: {}
    },
    discogsMarketplace: {
        discogsMarketplace: [],
        discogsMarketplaceSearching: false 
    },
    ebay: {
        ebay: [],
        ebaySearching: false 
    },
    spotify: {
        currentPosition: '',
        currentId: '',
        link: '',
        buttonSign: 'play' //stop refresh  
    },
    whosampled: {
        currentRelease:'',
        whosampled: {}
    },
    favorite:{
        favorite: []  //id&chosen_title
    },    
    ui: {
        showDiscogsMarketplace: false,
        showEbay: false,
        showWhosampled: {},
        startFrom: 'search',
        currentPage: 'search' //search, releases, release, fav
    }
};
