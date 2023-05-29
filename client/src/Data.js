import images from 'assets/img/index';

const saleOfPercentage = (origPrice, promotePrice) => {
    return (((origPrice - promotePrice) / origPrice) * 100).toFixed(1);
};

const ProductData = [
    {
        id: 1,
        name: 'Apples',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.Apples,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },
    {
        id: 2,
        name: 'BabySpinach',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.babySpinach,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 3,
        name: 'Blueberries',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.blueberries,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 4,
        name: 'BrusselsSprouts',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.brusselsSprouts,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 5,
        name: 'Clementines',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.clementines,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 6,
        name: 'Corn',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.corn,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 7,
        name: 'Dates',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.dates,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 8,
        name: 'Dates',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.mangoes,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 9,
        name: 'GreenLimes',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.miniPeppers,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 10,
        name: 'Mangoes',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.peelCarots,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 11,
        name: 'MiniPeppers',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.miniPeppers,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 12,
        name: 'Peeled-Carrots',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.peelCarots,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },

    {
        id: 13,
        name: 'Pears',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.pears,
        unit: 'kg',
        sale: function () {
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },
];

export { ProductData };
