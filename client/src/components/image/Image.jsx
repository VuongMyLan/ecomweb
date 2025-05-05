import React, { forwardRef, useState } from 'react';
import './image.scss';
import images from 'assets/img/index';

const Image = forwardRef(
    (
        { fallBack: customerFallBack = images.carousel1, alt, src, ...props },
        ref
    ) => {
        const [fallBack, setFallBack] = useState('');
        const handleError = () => {
            setFallBack(customerFallBack);
        };
        return (
            <img
                ref={ref}
                {...props}
                src={fallBack || src}
                alt={alt}
                onError={handleError}
            />
        );
    }
);

export default Image;
