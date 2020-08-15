import ajax from '../utils/ajax';

export function createComment(params) {
    // return ajax.post('/proxy/2/comments/create.json', { 
    //     params,
    //     headers: {'content-type': 'application/x-www-form-urlencoded'}
    // });
    return ajax.post('/2/comments/create.json', { 
        params,
        headers: {'content-type': 'application/x-www-form-urlencoded'}
    });
}

export function getComments(params) {
    // return ajax.get('/proxy/2/comments/show.json', { 
    //     params,
    //     headers: {'content-type': 'application/x-www-form-urlencoded'}
    // });
    return ajax.get('/2/comments/show.json', { 
        params,
        headers: {'content-type': 'application/x-www-form-urlencoded'}
    });
}