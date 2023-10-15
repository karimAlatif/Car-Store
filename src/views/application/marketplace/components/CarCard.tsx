import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import { FaArrowsSpin } from "react-icons/fa6";
import { PiArrowsIn } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";

import Card from "components/card";
const CarCard = (props: {
    title: string;
    type: string;
    state: string;
    createdAt: string;
    numberOfPeople: number;
    gearType: string;
    price: string | number;
    image: string;
    extra?: string;
}) => {
    const { title, type, state, createdAt, image, numberOfPeople, gearType, price, extra } = props;
    const [heart, setHeart] = useState(true);
    return (
        <Card
            extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
        >
            <div className="h-full w-full">
                <div className="flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-row xl:items-start 3xl:flex-row 3xl:justify-between">
                    <div className="mb-2">
                        <p className="text-lg font-bold text-navy-700 dark:text-white">
                            {title}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-600 md:mt-1">
                            {state} - {type} - {createdAt}
                        </p>
                    </div>

                    <button
                        onClick={() => setHeart(!heart)}
                        className="right-3 top-3 flex items-center justify-center rounded-md bg-white p-2 text-brand-500 hover:cursor-pointer"
                    >
                        <div className="flex h-full w-full items-center justify-center rounded-md text-xl hover:bg-gray-50 dark:text-navy-900">
                            {heart ? (
                                <IoHeartOutline />
                            ) : (
                                <IoHeart className="text-brand-500" />
                            )}
                        </div>
                    </button>
                </div>
                <div className="relative w-full 2xl:h-[74%] 3xl:h-[76%] ">
                    <img
                        src={image}
                        className="mb-3 h-[95%] w-full rounded-md 3xl:h-full 3xl:h-[96%]"
                        alt=""
                    />
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-row 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between mx-2">
                    <div className="flex items-center">
                        <PiArrowsIn className="text-xl text-blueSecondary" />
                        <div className="mx-3">
                            <span>{`${numberOfPeople}`}</span>
                        </div>
                        <HiOutlineArrowPathRoundedSquare className="text-xl mx-3 text-blueSecondary" />
                        <div className="">
                            <span>{`${gearType}`}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xl font-medium text-gray-700 dark:text-white">
                            {`$${price}/D`}
                        </p>
                    </div>
                </div>


            </div>
        </Card>
    );
};

export default CarCard;