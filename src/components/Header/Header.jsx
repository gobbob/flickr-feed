import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomPropTypes from '../../prop-types';
import Sort from '../Sort';
import Button from '../Button';
import Photo from '../Photo';
import './Header.scss';

export default function Header({ bookmark, onSearch: handleSearch, onSort: handleSort }) {
    const searchRef = useRef();
    const term = useSelector(({ search }) => search.term);
    const dispatch = useDispatch();
    const [showBookmark, setShowBookmark] = useState(false);

    useEffect(() => {
        const { current: search } = searchRef;
        console.log(search);

        if (search) {
            search.focus();
        }
    }, []);

    const handleSearchSubmit = useCallback((e) => {
        const { current: search } = searchRef;

        e.preventDefault();

        dispatch({ type: 'SEARCH', payload: { term: search.value } });
    }, [dispatch]);

    return (
        <header className="header">
            <form className="header__search" onSubmit={handleSearchSubmit}>
                <input
                    ref={searchRef}
                    className="header__search-input"
                    defaultValue={term}
                    // onChange={({ target }) => setTerm(target.value)}
                />
                <Button
                    className="header__search-button"
                    type="submit"
                    icon="search"
                />
            </form>

            <Sort className="header__sort" />

            {bookmark && (
                <div className="header__bookmark">
                    <Button
                        className="header__bookmark-button"
                        icon="bookmark"
                        active={showBookmark}
                        onClick={() => setShowBookmark((prevSetShowBookmark) => !prevSetShowBookmark)}
                    />
                    <Photo
                        className={`header__bookmark-photo${showBookmark ? ' header__bookmark-photo--show' : ''}`}
                        {...bookmark}
                    />
                </div>
            )}
        </header>
    );
}

Header.propTypes = {
    bookmark: CustomPropTypes.photo
};

Header.defaultProps = {
    bookmark: undefined
};
