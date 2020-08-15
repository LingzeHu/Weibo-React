import ajax from "../utils/ajax";

export function getHomeTimeline(params) {
    //return ajax.get('/proxy/2/statuses/home_timeline.json', { params });
    return ajax.get('/2/statuses/home_timeline.json', {params})
}

export function getPost(params) {
    //return ajax.get('/proxy/2/statuses/show.json', { params });
    return ajax.get('/2/statuses/show.json', {params})
}