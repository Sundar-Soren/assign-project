"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import axios from "axios";
import UserCard from "@/app/_components/user-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export interface User {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

const items = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);

const Main = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [userData, setUserData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const getData = async () => {
    setIsLoading(true);
    try {
      if (searchParams.get("search")) {
        const response = await axios.get<ApiResponse>(
          `https://swapi.dev/api/people?search=${searchParams.get(
            "search"
          )}&page=${searchParams.get("page") || 1}`
        );
        setUserData(response.data);
      } else {
        const response = await axios.get<ApiResponse>(
          `https://swapi.dev/api/people?page=${searchParams.get("page") || 1}`
        );
        setUserData(response.data);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleNext = () => {
    router.push(
      pathname +
        "?" +
        createQueryString(
          "page",
          searchParams.get("page")
            ? (Number(searchParams.get("page")) + 1).toString()
            : "2"
        )
    );
  };
  const handlePrevious = () => {
    router.push(
      pathname +
        "?" +
        createQueryString(
          "page",
          (Number(searchParams.get("page")) - 1).toString()
        )
    );
  };

  return (
    <>
      {userData && !isLoading && (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {userData?.results.map((user, index) => (
              <UserCard key={index} user={user} index={index} />
            ))}
          </div>
          <Suspense fallback="Loading...">
            <Pagination className="my-10 ml-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={cn(
                      "cursor-pointer",
                      !userData.previous && "pointer-events-none"
                    )}
                    onClick={() => handlePrevious()}
                  />
                </PaginationItem>
                <PaginationItem>{searchParams.get("page") || 1}</PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={cn(
                      "cursor-pointer",
                      !userData.next && "pointer-events-none"
                    )}
                    onClick={() => handleNext()}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Suspense>
        </>
      )}
      {isLoading && (
        <>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
            {items.map((i) => (
              <Skeleton className="h-[20rem] bg-slate-200 rounded-lg" key={i} />
            ))}
          </div>
        </>
      )}
      {!userData && !isLoading && error && (
        <p className="text-2xl text-center py-8 font-bold text-red-600">
          Somthing went wrong
        </p>
      )}
    </>
  );
};

export default Main;
