
export default {
    search: {
		results: [],
        page: 1,
        pages: 1
	},
    query: {
        queryHistory: [], //query, timestamp
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
        buttonSign: 'play' // play stop refresh  
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
        showReleaseModal: false,
        showReleaseModalMessage: '',
        showQuaggaModal: false,
        showQuaggaModalMessage: '',
        showWhosampled: {},
        startFrom: 'search',
        currentPage: 'search' //search, releases, release, fav
    }
};
