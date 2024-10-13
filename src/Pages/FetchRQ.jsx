import React, { useState } from 'react'
import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, fetchPosts } from '../api/api';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {
  const [pageNum, setPageNum] = useState(0);

  const queryClient = useQueryClient();

  const getData = async () => {
    let res = await fetchPosts(pageNum);
    console.log(res);
    return res.status === 200 ? res.data : [];
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts', pageNum], //useState (provide pageNum for recall api while it's changed)
    queryFn: getData,//useEffect
    // gcTime:1000,//(garbage collection- caching)
    // staleTime: 5000, //(duration between Fresh & stale time)
    refetchInterval: 5000, //(duration for refetch data)
    refetchIntervalInBackground: true,//(refetch data even we on the another tab)
    placeholderData: keepPreviousData
  });

  //mutation function to delete the post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(['posts', pageNum], (curEle) => {
        return curEle?.filter((post) => post.id !== id);
      });
    }
  })

  // console.log(data, isLoading, isError, error);

  //conditional rendering based on loading as well as error;
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error : {error.message}</p>;

  // Handler for next page
  const handleNextPage = () => {
    if (pageNum < 19) {
      setPageNum((prev) => prev + 1);
    }
  };

  // Handler for previous page, ensuring it doesn't go below 0
  const handlePrevPage = () => {
    if (pageNum > 0) {
      setPageNum((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Fetch rq</h1>
      <div className="flex flex-col gap-10 text-lg list-decimal m-5">
        {
          (data?.map((ele) => {
            return <div><NavLink key={ele.id} to={`${ele.id}`}>
              <div className='list-decimal font-bold'>{ele.id} {ele.title}</div>
              <p>{ele.body}</p>
            </NavLink>
              <button onClick={() => deleteMutation.mutate(ele.id)} className='border rounded-lg px-5 text-sm'>Delete</button>
            </div>
          }))
        }
      </div>

      {/* Pagination Controls */}
      <div className="flex w-full justify-between text-4xl my-5">
        <button
          className="font-semibold"
          onClick={handlePrevPage}
          disabled={pageNum === 0} // Disable Prev button on the first page
        >
          Prev
        </button>
        <span>{pageNum + 1}</span>
        <button className="font-semibold" onClick={handleNextPage} disabled={pageNum === 19} >
          Next
        </button>
      </div>
    </div>
  )
}

export default FetchRQ;
