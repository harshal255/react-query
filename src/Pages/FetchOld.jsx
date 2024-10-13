import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../api/api';


const FetchOld = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const getData = async () => {
        try {
            let res = await fetchPosts(1);
            console.log(res);
            if (res.status === 200) {
                setData(res.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    //conditional rendering based on loading as well as error;
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong</p>;


    return (
        <div>
            <h1 className='text-3xl font-bold underline'>Fetch old</h1>
            <ol className="flex flex-col gap-3 text-lg list-decimal m-5">
                {
                    data.length > 0 ? (data.map((ele) => {
                        return <div key={ele.id}><li className='list-decimal font-bold'>{ele.title}</li>
                            <p>{ele.body}</p>
                        </div>
                    })) : <div>NO Data found</div>
                }
            </ol>
        </div>
    )
}

export default FetchOld;
