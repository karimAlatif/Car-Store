import {useCallback, useEffect, useState} from 'react';
import * as api from '../definitions/apis/index';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from 'store/rootReducer';
import { setIsError } from 'store/generalSlice';
import {setDasboardData} from '../actions/dashboardSlice';

const useDashboardActions = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    

  const getDashBoardData = useCallback(() => {
    setIsLoading(true);
    try{
        api
          .getDashBoardData()
          .then(data => {
            if(data.code === "2003" ){
                dispatch(setDasboardData(data.result))
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
    getDashBoardData();
  },[]);

 
  return {
    isLoading,
  };
};

export default useDashboardActions;
