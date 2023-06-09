import images from 'assets/img/index';

const ProductData = [
    {
        id: 1,
        name: 'Apples',
        originalprice: 2.2,
        promotionprice: 2,
        image: images.Apples,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 1.2,
        promotionprice: 1,
        image: images.babySpinach,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 3.2,
        promotionprice: 2,
        image: images.blueberries,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 2.6,
        promotionprice: 1.5,
        image: images.brusselsSprouts,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 7.82,
        promotionprice: 5.6,
        image: images.clementines,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 6.8,
        promotionprice: 4.5,
        image: images.corn,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 12.3,
        promotionprice: 10.4,
        image: images.dates,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 18.5,
        promotionprice: 2,
        image: images.mangoes,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 3.4,
        promotionprice: 1.3,
        image: images.miniPeppers,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 19,
        promotionprice: 11,
        image: images.peelCarots,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 12.54,
        promotionprice: 12,
        image: images.miniPeppers,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        originalprice: 2.23,
        promotionprice: 1.23,
        image: images.peelCarots,
        unit: 'kg',
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
        thumbnailImg: [images.apple1, images.apple2, images.apple3],
        categories: ['Fruits & Vegetables', 'Fruits'],
        desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
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
