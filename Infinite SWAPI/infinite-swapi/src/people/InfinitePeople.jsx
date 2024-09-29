import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import {useInfiniteQuery} from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    "sw-people",
    ({pageParam = initialUrl}) => fetchUrl(pageParam),

  });


  return <InfiniteScroll />;
}
