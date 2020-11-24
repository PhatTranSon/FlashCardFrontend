import React from 'react';
import './style.css';
import Slider from 'react-slick';

import Card from '../Card/Card';

class CardCarousel extends React.Component {
    constructor(props) {
        super(props);

        //Set const carousel setting
        this.settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
            adaptiveHeight: true
        };

        this.onCardLike = this.onCardLike.bind(this);
    }

    onCardLike(id, index) {
        this.props.onCardLike(id, index);
    }

    render() {
        const { cards, title } = this.props;

        return (
            <div>
                <h1 className="card-carousel-title">{ title }</h1>
                <Slider {...this.settings}>
                {
                    cards.map((card, index) => {
                        return (
                            <Card 
                                {...card}
                                onLike={id => this.onCardLike(id, index)}
                                showDelete={false}
                                key={index}/>
                        )
                    })
                }
                </Slider>
            </div>
        );
    }
}

export default CardCarousel;