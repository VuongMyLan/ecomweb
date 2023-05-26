import images from 'assets/img/index';

const saleOfPercentage = (origPrice, promotePrice) => {
    return (((origPrice - promotePrice) / origPrice) * 100).toFixed(1);
};

const ProductData = [
    {
        name: 'Apples',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.Apples,
        unit: 'kg',
        sale: function () {
            console.log(
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                    100
            );
            return (
                ((this.originalprice - this.promotionprice) /
                    this.originalprice) *
                100
            ).toFixed(1);
        },
    },
    {
        name: 'BabySpinach',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.babySpinach,
        unit: 'kg',
    },

    {
        name: 'Blueberries',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.blueberries,
        unit: 'kg',
    },

    {
        name: 'BrusselsSprouts',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.brusselsSprouts,
        unit: 'kg',
    },

    {
        name: 'Clementines',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.clementines,
        unit: 'kg',
    },

    {
        name: 'Corn',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.corn,
        unit: 'kg',
    },

    {
        name: 'Cucumber',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.dates,
        unit: 'kg',
    },

    {
        name: 'Dates',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.mangoes,
        unit: 'kg',
    },

    {
        name: 'GreenLimes',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.miniPeppers,
        unit: 'kg',
    },

    {
        name: 'Mangoes',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.peelCarots,
        unit: 'kg',
    },

    {
        name: 'MiniPeppers',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.PerformanceMeasure,
        unit: 'kg',
    },

    {
        name: 'Peeled-Carrots',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.Apples,
        unit: 'kg',
    },

    {
        name: 'Pears',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.Apples,
        unit: 'kg',
    },
];

export { ProductData };
