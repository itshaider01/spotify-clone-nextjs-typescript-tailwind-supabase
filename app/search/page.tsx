import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import React from "react";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

type SearchPageProps = {
  searchParams: {
    title: string;
  };
};

export const revalidate = 0;

const Search = async ({ searchParams }: SearchPageProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="bg-neutral-900 overflow-hidden overflow-y-auto rounded-lg h-full w-full">
      <Header classname="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;