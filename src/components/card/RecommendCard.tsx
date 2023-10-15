import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState, useMemo } from "react";
import Card from "components/card";
import { FaArrowsSpin } from "react-icons/fa6";
import { PiArrowsIn } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { SlEnergy } from "react-icons/sl";
import { useTranslation } from 'react-i18next';

const RecommendCard = (props: {
  recommendtion: number;
  image: string;
  title: string;
  total: string;
  price: string | number;
  extra?: string;
}) => {
  const { recommendtion, title, total, price, image, extra } = props;
  const [heart, setHeart] = useState(true);
  const { t } = useTranslation();

  const recoClass = useMemo(() => {
    if (recommendtion > 80) {
      return 'text-red-600	';
    } else if (80 > recommendtion && recommendtion > 70) {
      return 'text-orange-300	';
    } else {
      return 'text-black';
    }
  }, [recommendtion]);

  return (
    <Card
      extra={`flex flex-col !p-4 3xl:p-![18px] bg-white ${extra} md:h-[100%] xl:h-[100%] 2xl:h-[100%] 3xl:h-[100%] `}
    >
      <div className="h-full w-full">
        <div className="flex items-center md:mb-2">
          <FaArrowsSpin className={"mx-2 text-xl text-gray-700"} />
          <p className={`text-normal font-medium`}>
            <span className={`text-normal mx-1 font-medium ${recoClass}`} >{recommendtion}%</span>
            {`${t('general.vocabularies.recommend')}`}
          </p>
        </div>
        <div className="relative w-full ">
          <img
            src={image}
            className="mb-3 h-full max-h-48 w-full rounded-md 3xl:h-full 3xl:w-full px-2 md:max-h-36 xl:max-h-42 3xl:max-h-48"
            alt=""
          />
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {title}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-row 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between mx-2">
          <div className="flex items-center">
            <PiArrowsIn className="text-xl" />
            <div className="mx-3">
              <span>{`${total}`}</span>
            </div>
            <CiSettings className="text-xl mr-3" />
            <SlEnergy className="text-xl mr-3" />
          </div>
          <div>
            <p className="text-xl font-medium text-gray-700 dark:text-white">
              {`${price}/${t('general.vocabularies.h')}`}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecommendCard;
