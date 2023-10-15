import React, { useMemo } from "react";
import Card from "components/card";
import CircleChart from "components/charts/CircleChart";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/rootReducer";

export interface WidgetProps {
  icon: {
    class: string,
    src: JSX.Element
  };
  title: {
    key: string,
    class: string,
  };
  value: {
    key: number;
    color: string;
    chartColor: string;
  };
  extra?: string,
}

const SummaryChart = (props: WidgetProps) => {
  const { extra, icon, title, value } = props;
  const { isDarkMode } = useSelector((state: RootState) => state.generalSlice);

  const optValue = useMemo(() => {
    return {
      ...value,
      color: isDarkMode ? "white" : value.color
    }
  }, [isDarkMode, value]);

  return (
    <Card extra={`!flex-col flex-grow items-center rounded-[20px] h-[266px] ${extra}`}>
      <div className="flex mt-4 h-[60px] w-auto flex-row items-center">
        <div className={`rounded-full p-3 dark:bg-navy-700 ${icon.class}`}>
          <span className="flex items-center text-brand-500 !bg-[${icon.backgroundColor}] dark:text-white">
            {icon.src}
          </span>
        </div>
      </div>

      <div className="h-50 flex w-auto flex-col justify-center items-center">
        <p className={`font-dm text-xl font-bold my-2 ${title.class} dark:text-white`}>{title.key}</p>
        <div className="h-full w-full my-10">
          <CircleChart key={isDarkMode.toString()} value={optValue} />
        </div>
      </div>
    </Card>
  );
};

export default SummaryChart;
