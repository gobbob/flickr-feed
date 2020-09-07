import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../prop-types';
import Button from '../Button';
import './Photo.scss';

export default function Photo({
    className,
    id,
    title,
    url_z: squareSrc,
    url_l: largeSrc,
    url_o: originalSrc,
    showOverlay
}) {
    const likes = useSelector((state) => state.likes[id] || 0);
    const favourite = useSelector((state) => state.favourite);
    const dispatch = useDispatch();

    const displayTitle = title && title.length >= 28 ?
        `${title.substr(0, 24)}...` :
        title;

    const hasLikes = likes > 0;
    const isFavourite = favourite && favourite === id;

    const handleLike = useCallback(() => {
        dispatch({ type: 'ADD_LIKE', payload: { id } });
    }, [dispatch, id]);

    const handleFavourite = useCallback(() => {
        dispatch({ type: 'FAVOURITE', payload: { id } });
    }, [dispatch, id]);

    // Hide if missing
    if (!squareSrc) {
        return null;
    }

    return (
        <figure className={`photo ${className}`}>
            <img src={squareSrc} alt={title} />

            {showOverlay && (
                <div className="photo__overlay">
                    <figcaption className="photo__title" title={title !== displayTitle ? title : undefined}>
                        {displayTitle}
                    </figcaption>

                    <div className="photo__tools">
                        <Button
                            className="photo__button photo__button--like"
                            size="large"
                            icon={['far', 'heart']}
                            active={hasLikes}
                            activeIcon={['fas', 'heart']}
                            onClick={handleLike}
                        >
                            {` ${likes}`}
                        </Button>

                        <Button
                            className="photo__button photo__button--favourite"
                            size="large"
                            icon={['far', 'bookmark']}
                            active={isFavourite}
                            activeIcon={['fas', 'bookmark']}
                            onClick={handleFavourite}
                        />
                    </div>
                </div>
            )}
        </figure>
    );
}

Photo.propTypes = {
    className: PropTypes.string,
    ...CustomPropTypes.photoShape,
    showOverlay: PropTypes.bool
}

Photo.defaultProps = {
    className: undefined,
    showOverlay: false
}
