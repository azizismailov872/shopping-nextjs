"use client";
import React from "react";
import { PulseLoader } from "react-spinners";

type Props = {
    isLoading: boolean;
};

const Loader = ({ isLoading }: Props) => {
    if(!isLoading) {
      return null
    }

    return (
        <div className="w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center fixed z-50">
            <PulseLoader loading={true} />
        </div>
    );
};

export default Loader;
