import {useCallback, useEffect, useMemo, useState} from 'react';
import * as api from '../definitions/apis/index';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from 'store/rootReducer';
import { setIsError } from 'store/generalSlice';
import {setCars} from './marketPlaceSlice';
import { Filters, CarState, GearType, CarType, Car, SortVals } from '../definitions/types';


const useMarketPlaceActions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState<SortVals>("latest");

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    state:["New", "Used"],
    gearType:["Automatic", "Manual"],
    type:["Family","Fun","Small","Suv"]
  });

  const marketPlace = useSelector((state: RootState) => state.marketPlace);
  const dispatch = useDispatch();
  const { cars } = marketPlace;

  const getCarsData = useCallback(() => {
    try{
        api
          .getCarsData()
          .then(data => {
            if(data.code === "2003" ){
                dispatch(setCars(data.result))
            }
        }).catch(()=>{
            dispatch(setIsError(true))
        })
        .finally(() => {
            setIsLoading(false);
        });
    }catch{
        dispatch(setIsError(true))
    }
  }, [dispatch]);

  useEffect(()=>{
    getCarsData();
  },[]);

  const onChangeSort = useCallback((sortState:SortVals)=>{
    setSelectedSort(sortState)
  },[]);

  const onChangeFilters = useCallback((filterKey: keyof Filters, filterValue: CarState | GearType | CarType )=>{
    const selectedIndex = selectedFilters[filterKey].findIndex((filter)=> filter === filterValue)
    if(selectedIndex !== -1){
      if(selectedFilters[filterKey].length === 1){
        return;
      }
      setSelectedFilters((prevFilters)=>{
        const newArr = [...prevFilters[filterKey]];
        newArr.splice(selectedIndex,1);
        return {
          ...prevFilters,
          [filterKey]: newArr
        }
      })
    } else {
      setSelectedFilters((prevFilters)=>{
        return {
          ...prevFilters,
          [filterKey]: [...prevFilters[filterKey],filterValue]
        }
      })
    }
  },[selectedFilters]);


  // {****} //
  const compareDates = useCallback((a: Car,b: Car)=>{
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    if(selectedSort === 'latest'){
      return dateB - dateA;
    }else{
      return dateA - dateB;
    }
  },[selectedSort])


  const IsMeetFilters = useCallback((car: Car)=>{
    // let shouldStop =false;
    let notMatch = Object.entries(selectedFilters).every(([key, values]: [string,string[]]) => {
      const value = car[key as keyof Car];
      if(values.includes(value as string)){
        return true;
      }else{
        return false;
      }
    });
    return notMatch

  },[selectedFilters]);

  //Apply filters
  const filterData = useMemo(()=>{
    const newData = cars.filter((car:Car)=>{
        return IsMeetFilters(car);
    })

    console.log("newData 00", newData)

  //Apply Sort
  const sortedArray = newData.sort(compareDates);

  console.log("newData 11", newData)
  console.log("newData 22", sortedArray)

    return sortedArray;
  },[IsMeetFilters, cars, compareDates]) 

  return {
    filterData,
    isLoading,
    selectedFilters,
    onChangeFilters,
    onChangeSort
  };
};

export default useMarketPlaceActions;
