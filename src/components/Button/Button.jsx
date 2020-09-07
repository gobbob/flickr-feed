import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomPropTypes from '../../prop-types';
import './Button.scss';

export default function Button({
    className: customClassName,
    size,
    icon,
    active: initialActive,
    activeIcon,
    children,
    onClick: handleClick
}) {
    const [active, setActive] = useState(initialActive);

    const hasIcon = icon ? 'icon' : 'no-icon';
    const isActive = active ? 'active' : '';

    const modifiers = [
        size,
        hasIcon,
        isActive
    ];
    const extraClassNames = modifiers
        .filter((modifier) => modifier)
        .map((modifier) => `button--${modifier}`);
    
    if (customClassName) {
        extraClassNames.push(customClassName);
    }

    return (
        <button
            className={`button ${extraClassNames.join(' ')}`}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(initialActive)}
            onClick={handleClick}
        >
            {icon && (
                <FontAwesomeIcon
                    className="button__icon"
                    icon={active && activeIcon ? activeIcon : icon}
                />
            )}
            {children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    icon: CustomPropTypes.icon,
    active: PropTypes.bool,
    activeIcon: CustomPropTypes.icon,
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
    className: undefined,
    type: 'button',
    size: 'medium',
    active: false,
    activeIcon: undefined,
    children: undefined
};
