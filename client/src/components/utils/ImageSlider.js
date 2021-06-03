import React from 'react'
import { Carousel } from 'antd';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }} 
                        src={`${global.local_url}:5054/${image}`}/>
                    </div>
                ))}                
            </Carousel>
        </div>
    )
}

export default ImageSlider;
