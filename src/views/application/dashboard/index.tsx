import React, { useEffect, useState, useCallback } from 'react';
import { ReactSVG } from 'react-svg'
import RecommendCard from "components/card/RecommendCard";
import SummaryChart from "./components/SummaryChart";
import Banner1 from "./components/Banner";
import Banner2 from "./components/Banner2";
import nft1 from "assets/img/dashboards/img2.png";
import nft2 from "assets/img/dashboards/img1.png";
import car1 from "assets/img/dashboards/car1.png";
import car2 from "assets/img/dashboards/car2.png";
import car3 from "assets/img/dashboards/car3.png";
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from "react-redux";
import { setDasboardData } from './actions/dashboardSlice';
import { RootState } from 'store/rootReducer';
import { DasboardData } from './definitions/types';
import useDashboardActions from './actions/useDashboardActions';
import Progress from 'components/progress';
import { Car } from '../marketplace/definitions/types';


const Dashboard = () => {
  const { t } = useTranslation();
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const { isLoading } = useDashboardActions();
  const { analytics, badges, points, recommendedCars } = dashboard;
  console.log("dashboard", dashboard)

  return (
    <div>
      {isLoading ? <Progress value={50} color='navy' /> :
        <>
          {/* Cards widgets */}
          <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 ">
            <SummaryChart
              extra="!bg-blueSecondary"
              icon={{
                class: 'bg-brandLinear',
                src: <ReactSVG src="/assets/dashboards/Filled.svg" />
              }}
              title={
                {
                  class: "text-white",
                  key: t('dasboard.widgets.energy'),
                }
              }
              value={{
                chartColor: "#fff",
                color: "white",
                key: analytics.energy,
              }}
            />
            <SummaryChart
              extra="!bg-white"
              icon={{
                class: 'bg-rose-50',
                src: <ReactSVG src="/assets/dashboards/resize.svg" />
              }}
              title={
                {
                  class: "text-gray-900",
                  key: t('dasboard.widgets.range'),
                }
              }
              value={{
                chartColor: "#FF7E86",
                color: "black",
                key: analytics.range,
              }}
            />
            <SummaryChart
              extra="!bg-white"
              icon={{
                class: 'bg-violet-50',
                src: <ReactSVG src="/assets/dashboards/blood.svg" />
              }}
              title={
                {
                  class: "text-gray-900",
                  key: t('dasboard.widgets.breakFluid'),
                }
              }
              value={{
                chartColor: "#A162F7",
                color: "black",
                key: analytics.breakFluid,
              }}
            />
            <SummaryChart
              extra="!bg-white"
              icon={{
                class: 'bg-yellow-50',
                src: <ReactSVG src="/assets/dashboards/tier.svg" />
              }}
              title={
                {
                  class: "text-gray-900",
                  key: t('dasboard.widgets.tireWear'),
                }
              }
              value={{
                chartColor: "#F6CC0D",
                color: "black",
                key: analytics.tireWear,
              }}
            />
          </div>

          {/* Banners */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Banner1
              title={t('dasboard.banners.applyBanner.title')}
              subtitle={t('dasboard.banners.applyBanner.subtitle')}
              butText={t('dasboard.banners.applyBanner.butText')}
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Banner2
                title={t('dasboard.banners.badgeBanner.title')}
                value={{
                  key: `${badges}`,
                  unit: `${t('dasboard.banners.badgeBanner.badges')}!`,
                  class: "text-orange-400",
                }}
                image={{
                  src: nft1
                }}
                footer={{
                  key: t('dasboard.banners.badgeBanner.msg1'),
                  class: "text-orange-400",
                }}
                extra="bg-gray-900 dark:!bg-navy-800"
              />
              <Banner2
                title={t('dasboard.banners.badgeBanner.title')}
                value={{
                  key: `${points}`,
                  unit: `${t('dasboard.banners.badgeBanner.points')}!`,
                  class: "text-orange-400",
                }}
                image={{
                  src: nft2
                }}
                footer={{
                  key: t('dasboard.banners.badgeBanner.msg2'),
                  class: "text-orange-400",
                }}
                extra="bg-pink-900 dark:!bg-navy-800"
              />
            </div>
          </div>

          {/* Recommended Cars */}
          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
            {
              recommendedCars.map((car: Car) => {
                return <RecommendCard
                  key={car.id}
                  recommendtion={car.recommendationPresent}
                  image={car.imageSrc}
                  title={car.name}
                  price={car.price}
                  total={`${car.range}`}
                />
              })
            }
          </div>

        </>}


    </div>
  );
};

export default Dashboard;
