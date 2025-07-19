import React from "react";
import { Plus, Circle, CircleCheckBig } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

const Problem = () => {
  return (
    <div className="max-w-[1300px] mt-30 m-auto">
      <div className="w-full p-2">
        <div className=" text-[var(--foreground)] text-3xl font-bold text-center">
          Explore Coding Challenges
        </div>
        <div className="flex p-4 w-full justify-between mt-8 items-center py-4 bg-[var(--card)] rounded-sm">
          <h3 className="text-xl text-[var(--foreground)]">All Problems</h3>
          <button className="bg-[var(--foreground)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer">
            <Plus className="mr-2 size-4" />
            Create PlayList
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 bg-[var(--card)] py-6 px-4 rounded-sm">
          <div className="flex items-center bg-[var(--primary)] rounded">
            <input
              type="text"
              className="py-2 px-4 rounded hover:outline-0 focus:outline-0 w-full placeholder:text-[var(--background)] text-[var(--background)]"
              placeholder="Search Problem"
            />
          </div>
          <div className="flex items-center bg-[var(--primary)] rounded ">
            <select
              name=""
              id=""
              className="w-full focus:outline-0 text-[var(--background)] placeholder:text-[var(--background)] py-2 px-4"
            >
              <option value="">All Difficulty</option>
            </select>
          </div>
          <div className="flex items-center bg-[var(--primary)] rounded ">
            <select
              name=""
              id=""
              className="w-full focus:outline-0 text-[var(--background)] placeholder:text-[var(--primary)] py-2 px-4"
            >
              <option value="">All Tags</option>
            </select>
          </div>
        </div>
        <div>
          <p className="text-[var(--detail-font-color)] text-sm mt-4">
            Showing 298 problems
          </p>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="border w-full p-6 table-auto min-w-[700px]">
            <thead className="bg-[var(--card)] text-[var(--detail-font-color)] text-sm text-left ">
              <tr>
                <th className="px-2 py-3">Solved</th>
                <th className="px-2 py-3">Title</th>
                <th className="px-2 py-3">Tags</th>
                <th className="px-2 py-3">Difficulty</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-[var(--background)] text-sm">
              <tr className="border-b-2">
                <th className="px-2 py-3  text-left">
                  <Circle className="size-4 text-[var(--detail-font-color)]" />
                </th>
                <th className="px-2 py-3 text-left text-[var(--detail-font-color)]">
                  Add Two Numbers
                </th>
                <th className="px-2 py-3 text-left">
                  <Badge className="bg-[var(--foreground)] mx-2">Math</Badge>
                  <Badge className="bg-[var(--foreground)] mx-2">
                    Operaters
                  </Badge>
                  <Badge className="bg-[var(--foreground)] mx-2">Number</Badge>
                </th>
                <th className="px-2 py-3 text-left text-[var(--detail-font-color)]">
                  <Circle />
                </th>
                <th className="px-2 py-3 text-left text-[var(--detail-font-color)]">
                  <Circle />
                </th>
              </tr>
              <tr className="border-b-2">
                <th className="px-2 py-3  text-left">
                  <Circle className="size-4 text-[var(--detail-font-color)]" />
                </th>
                <th className="px-2 py-3 text-left text-[var(--detail-font-color)]">
                  Add Two Numbers
                </th>
                <th className="px-2 py-3 text-left">
                  <Badge className="bg-[var(--foreground)] mx-2 ">Math</Badge>
                  <Badge className="bg-[var(--foreground)] mx-2">
                    Operaters
                  </Badge>
                  <Badge className="bg-[var(--foreground)] mx-2">Number</Badge>
                </th>
                <th className="px-2 py-3 text-left text-[var(--detail-font-color)]">
                  <Circle />
                </th>
                <th className="px-2 py-3 text-left text-[var(--detail-font-color)]">
                  <Circle />
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Problem;
