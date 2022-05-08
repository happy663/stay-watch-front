import { Tab } from "@headlessui/react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import useSWR from "swr";
import SimulataneousStayLog from "../models/simulataneousStayLog";
import { baseURL } from "../utils/api";
import TabRoom from "./TabRoom";

const GanttChart = dynamic(() => import("../components/GanttChart"), {
  ssr: false,
});

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TabItem() {
  const { data, error } = useSWR<SimulataneousStayLog[]>(
    `${baseURL}/room/v1/list/simultaneous/e7d61ea3f8dd49c88f2ff2484c07acb9-2021-1`
  );
  if (data !== null) {
    // データがまだない場合は読み込み中のUIを表示する
    console.log(data);
  }
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="pt-8  max-w-md sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {data.map((item) => {
            return (
              <Tab
                key={item.id}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {item.date}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className=" w-[1240px] ">
          {data.map((item) => (
            <Tab.Panel key={item.id}>
              <TabRoom rooms={item.rooms} key={item.id} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}