import React from 'react';
import Media from './Media';

export default function Gallery({items}) {
    return (
        <div>
            <div className='d-flex flex-wrap gap-2 justify-content-evenly'>
                {
                    items.map((item) => {
                        return <Media key={item.href} item={item} />
                    })
                }
            </div>
        </div>
    );
}