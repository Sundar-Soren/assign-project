"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const key = searchParams.get("search");
    setSearchKey(key ? key : "");
  }, []);

  return (
    <div className="fixed top-0 z-40 w-full px-10 py-5 gap-2 border-b border-gray-500 bg-white flex justify-between items-center">
      <div className="font-extrabold text-2xl">
        <Link href="/">Logo</Link>
      </div>
      <div>
        <Suspense fallback="Loading...">
          <form
            className="flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/?search=${searchKey}`);
            }}
          >
            <Input
              type="text"
              placeholder="Search courses by title, description, chapter, or lesson..."
              onChange={(e) => setSearchKey(e.target.value)}
              className="flex h-10 lg:w-[30rem] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset w-full  rounded-lg rounded-r-none focus-visible:ring-transparent pr-8"
              value={searchKey}
              required
            />
            <Button type="submit" className="rounded-none rounded-r-lg ">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </form>
        </Suspense>
      </div>
      <div>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Navbar;
