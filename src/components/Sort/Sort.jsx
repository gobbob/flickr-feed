import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import config from '../../config';
import './Sort.scss';
import Button from '../Button';

const { sort: sortConfig } = config;

export default function Sort({ className }) {
    const sort = useSelector(({ search }) => search.sort);
    const dispatch = useDispatch();

    return (
        <div className={`sort ${className}`}>
            <select
                className="sort__select"
                value={sort}
                onChange={({ target }) => dispatch({ type: 'SORT', payload: { sort: target.value } })}
            >
                <option key="option-blank" value="" disabled>Sort by:</option>
                {Object.entries(sortConfig.options).map(([optionValue, option]) => (
                    <option key={`option-${optionValue}`} value={optionValue}>{option}</option>
                ))}
            </select>
            <Button className="sort__button" icon="caret-down" />
        </div>
    );
}

Sort.propTypes = {
    className: PropTypes.string
};

Sort.defaultProps = {
    className: undefined
};
