import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
    to,
    href,
    leftIcon = true,
    rightIcon = true,
    children,
    ...passProps
}) => {
    let Comp = 'button';

    const props = {
        ...passProps,
    };

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    return (
        <Comp {...props}>
            {leftIcon && <span className='mr-2'>{leftIcon}</span>}
            {children}
            {rightIcon && <span className='mr-2'>{rightIcon}</span>}
        </Comp>
    );
};

export default Button;
