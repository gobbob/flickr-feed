export default {
    flickrApi: {
        url: 'https://api.flickr.com/services/rest',
        params: {
            method: 'flickr.photos.search',
            api_key: '50b10246d82cb5ee767bcf858d47efb8',
            extras: 'description,url_z,url_l,url_o',
            per_page: 50,
            page: 1,
            format: 'json',
            nojsoncallback: 1
        }
    },
    sort: {
        options: {
            title: 'Title',
            likes: 'Likes'
        },
        default: 'title'
    }
};
