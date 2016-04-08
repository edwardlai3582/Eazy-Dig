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
        discogsMarketplace: []
    },
    ebay: {
        ebay: []
    },
    whosampled: {
        currentRelease:'',
        whosampled: {}
    },
    ui: {
        showDiscogsMarketplace: false,
        showEbay: false,
        showWhosampled: {}
    }
};
