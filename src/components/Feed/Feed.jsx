import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../prop-types';
import Photo from '../Photo';
import './Feed.scss';

export default function Feed({ photos }) {
    return (
        <div className="feed">
            {photos.map((photo) => (
                <Photo
                    key={`photo-${photo.id}`}
                    className="feed__photo"
                    {...photo}
                    showOverlay
                />
            ))}
        </div>
    );
}

Feed.propTypes = {
    photos: PropTypes.arrayOf(CustomPropTypes.photo).isRequired
};
