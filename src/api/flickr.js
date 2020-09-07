import axios from 'axios';
import config from '../config';

async function getPhotos(term) {
    const { url, params: defaultParams } = config.flickrApi;
    const params = { ...defaultParams, text: term };

    const { data } = await axios.get(url, { params })

    return data;
}

export {
    getPhotos
};
