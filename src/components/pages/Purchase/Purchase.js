import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const Purchase = () => {
    const {id} = useParams();
    const {data: tool, isLoading, error} = useQuery('productData', () => fetch(`http://localhost:5000/product/${id}`).then(res=>res.json()));
    console.log(tool)

    return (
        <section>
            <h1>Please confiem payment for: {id}</h1>
        </section>
    );
};

export default Purchase;