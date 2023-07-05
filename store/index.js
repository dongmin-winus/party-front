// import {getDistrict, setDistrict} from '../utils/LocalStorage';

import { fetchStores, fetchNearCoords, fetchContactsReview } from '../api/index'

export const state = () => ({
    district: {
        id: 0,
        district: "자유마을"
    },
    postItems: [],
    postLinks: {
        first: null,
        last: null,
        next: null,
        prev: null
    },
    postMeta: {},
    postCurrentY: '',

    //for contacts/review
    contactItem: {},
    contactReviews: null,
    options: [
        { value: 5, color: 'red', label: '최고', image: '/images/contacts/f_5.png' },
        { value: 4, color: '#ffd627', label: '좋음', image: '/images/contacts/f_4.png' },
        { value: 3, color: '#00ba00', label: '보통', image: '/images/contacts/f_3.png' },
        { value: 2, color: '#296fe5', label: '별로', image: '/images/contacts/f_2.png' },
        { value: 1, color: '#837f7f', label: '최악', image: '/images/contacts/f_1.png' },
    ],

    //for mapView
    coords: [],
    currentAddr: '',
    currentStoreList: [],

    // 채팅 옵션
    option: false,
    chatSearch: false,
    emoticonOption: false,
    
});

export const getters = {
    getDistrict: (state) => {
        return state.district
    },
    getPostItems(state) {
        return state.postItems;
    },
    getPostLinks(state) {
        return state.postLinks;
    },
    getPostMeta(state) {
        return state.postMeta;
    },
    getPostCurrentY(state) {
        return state.postCurrentY;
    },

    getContactItem(state) {
        return state.contactItem;
    },
    getOptions(state) {
        return state.options;
    },
    getContactReviews(state) {
        return state.contactReviews;
    }
}

export const actions = {
    //TODO axios codes would be needed here
    FETCH_POST_ITEMS({ commit }, items) {
        commit('SET_POST_ITEMS', items);
    },
    FETCH_POST_LINKS({ commit }, links) {
        commit('SET_POST_LINKS', links);
    },
    FETCH_POST_META({ commit }, meta) {
        commit('SET_POST_META', meta);
    },
    FETCH_POST_Y({ commit }, y) {
        commit("SET_Y", y);
    },
    CLEAR_POST_STATE({ commit }) {
        commit('INIT_POST_STATE')
    },

    //for contacts/review
    async FETCH_CONTACT_ITEM({ commit }, item) {
        // const { data } = await fetchContactItem(payload);
        commit('SET_CONTACT_ITEM', item);
    },
    async FETCH_CONTACT_REVIEW({ commit }, payload) {
        const { data } = await fetchContactsReview(payload);
        commit('SET_CONTACT_REVIEW', data);
    },

    //for mapView
    async fetchCurrentStores({ commit }, payload) {
        const { data } = await fetchStores(payload);
        commit('setCurrentStores', data);
    },
    async fetchNearCoords({ commit }, payload) {
        const { data } = await fetchNearCoords(payload.data);
        commit('setCoords', data);
    },
}

export const mutations = {
    changeDistrict(state, data) {
        state.district = data;
    },

    SET_POST_ITEMS(state, items) {
        state.postItems = items;
    },
    SET_POST_LINKS(state, links) {
        state.postLinks = links;
    },
    SET_POST_META(state, meta) {
        state.postMeta = meta;
    },
    SET_Y(state, y) {
        state.postCurrentY = y;
    },
    INIT_POST_STATE(state) {
        state.postItems = [];
        state.postLinks = {
            first: null,
            last: null,
            next: null,
            prev: null
        };
        state.postMeta = {};
        state.postCurrentY = 0;
    },


    //for contacts/review
    SET_CONTACT_ITEM(state, item) {
        state.contactItem = item;
    },
    SET_CONTACT_REVIEW(state, data) {
        state.contactReviews = data;
    },

    //for mapView
    setCurrentStores(state, stores) {
        state.currentStoreList = stores;
    },
    setCurrentAddr(state, addr) {
        state.currentAddr = addr;
    },
    setCoords(state, coords) {
        state.coords = [...coords];
    },


    // 채팅 option변경
    setOption(state, data) {
        state.option = data;
    },
    setSearchOption(state, data) {
        state.chatSearch = data;
    },
    setEmoticonOption(state, data) {
        state.emoticonOption = data
    }

}
