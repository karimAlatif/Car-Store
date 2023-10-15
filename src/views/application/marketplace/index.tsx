import { Dir } from "layouts/application";
import CarCard from "./components/CarCard";
import DropDown from "./components/DropDown";
import Progress from 'components/progress';
import FiltersComp from './components/FiltersComp';
import carImage from "assets/img/dashboards/car4.png";
import { useTranslation } from 'react-i18next';
import useMarketPlaceActions from './actions/useMarketPlaceActions';
import { Car, SortVals } from "./definitions/types";

const Marketplace = () => {
  const { t } = useTranslation();
  const selectedDir: Dir = document.documentElement.dir as Dir;
  const { filterData, isLoading, selectedFilters, onChangeFilters, onChangeSort } = useMarketPlaceActions();

  return (
    <div className="mt-3 grid h-full w-full">
      {isLoading ?
        <Progress value={50} color='navy' />
        :
        <>
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            {t('cars.title')}
          </h4>
          {/* Sort && Filters */}
          <div className="mb-4 mt-5 w-full grid grid-flow-col justify-between px-4 md:flex-row md:items-center">
            <div style={{ direction: selectedDir }}>
              <DropDown
                defualtValue="latest"
                options={[
                  { key: "latest", name: t('cars.sort.latest') },
                  { key: "earliest", name: t('cars.sort.earliest') },
                ]}
                onChange={(newVal) => {
                  console.log("newVal --->", newVal)
                  onChangeSort(newVal as SortVals)
                }}
              />
            </div>
            <div style={{ direction: selectedDir }}>
              <FiltersComp
                selectedFilters={selectedFilters}
                onChangeFilters={onChangeFilters}
              />
            </div>
          </div>

          {/* List of Cars */}
          <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 ">
            {
              filterData.map((car: Car) => {
                return <CarCard
                  key={car.id}
                  title={car.name}
                  type={car.type}
                  state={car.state}
                  createdAt={car.createdAt}
                  numberOfPeople={car.size}
                  gearType={car.gearType}
                  price={car.price}
                  image={car.imageSrc}
                />
              })
            }
          </div>

        </>

      }
    </div>
  );
};

export default Marketplace;
