import Header from 'components/header/Header';
import React from 'react';
import Footer from './Footer';
import { useParams } from 'react-router-dom';

const FooterInfo = () => {
    const params = useParams();
    return (
        <div className='bg-slate-100 '>
            <Header />
            <div className='mt-[80px] mb-[80px] md:w-[70%] md:mx-auto '>
                <div className='text-3xl my-2 p-2'>{params.info}</div>
                {Array(3)
                    .fill(null)
                    .map((item, i) => (
                        <p
                            className='bg-slate-50 my-2 pt-2 px-2 rounded-md'
                            key={i}
                        >
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Iste, excepturi explicabo voluptatibus autem
                            quisquam non suscipit? Facilis doloribus sed
                            repellat necessitatibus odio laudantium impedit
                            laboriosam id eum, eius dolor ipsam nihil. Esse odit
                            eum dolor consequuntur accusamus vel deleniti omnis
                            nulla, laborum commodi quae veritatis culpa iure
                            amet ut expedita consequatur et earum. Excepturi
                            suscipit eum, veniam explicabo accusantium unde quo
                            nam architecto soluta quos, ipsum tempore nemo
                            molestiae a pariatur, nihil hic deleniti laboriosam?
                            Voluptate harum doloribus itaque nisi omnis odio
                            veritatis laborum, velit officiis delectus porro
                            quam fugit sit deserunt libero consequatur impedit
                            ipsum praesentium nostrum facere quae.
                        </p>
                    ))}
            </div>
            <Footer />
        </div>
    );
};

export default FooterInfo;
