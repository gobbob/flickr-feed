import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPhotos } from '../api/flickr';
import Feed from '../components/Feed';
import Header from '../components/Header';

export default function App() {
    const search = useSelector((state) => state.search);
    const [feed, setFeed] = useState();
    const [photos, setPhotos] = useState();
    const likes = useSelector((state) => state.likes);
    const favourite = useSelector((state) => state.favourite);
    const [isLoading, setLoading] = useState(!!search.term);

    const bookmark = useMemo(() => (
        photos ?
            photos.find(({ id }) => id === favourite) :
            undefined
    ), [photos, favourite]);

    useEffect(() => {
        async function populateFeed() {
            setLoading(true);

            const { photos: newFeed } = await getPhotos(search.term);

            setFeed(newFeed);
            setLoading(false);
        }

        if (search.term) {
            populateFeed();
        }
    }, [search]);

    useEffect(() => {
        if (feed) {
            const { photo: newPhotos } = feed;

            if (!search.sort) {
                return setPhotos(newPhotos);
            }

            const sortedPhotos = [...newPhotos];

            sortedPhotos.sort((a, b) => {
                if (search.sort === 'likes') {
                    const aLikes = likes[a.id] || 0;
                    const bLikes = likes[b.id] || 0;

                    return Math.sign(bLikes - aLikes);
                }

                return a[search.sort].localeCompare(b[search.sort]);
            });

            setPhotos(sortedPhotos);
        }
    }, [feed, search, likes]);

    return (
        <>
            <Header bookmark={bookmark} />

            {search.term && (
                <>
                    {isLoading && 'Loading...'}
                    {!isLoading && feed && (
                        <Feed photos={photos} />
                    )}
                </>
            )}
        </>
    );
}
