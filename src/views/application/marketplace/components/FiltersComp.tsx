import { Fragment, useCallback } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import { HiFilter } from "react-icons/hi";
import { Dir } from 'layouts/application';
import { Filters, CarState, GearType, CarType } from 'views/application/marketplace/definitions/types';
import { useTranslation } from 'react-i18next';


type FiltersOpts = {
  [sd in keyof Filters]: {
    value: CarState | GearType | CarType, label: string;
  }[];
};



function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}


interface Props {
  selectedFilters: Filters;
  onChangeFilters: (filterKey: keyof Filters, filterValue: CarState | GearType | CarType) => void;
}

export default function FiltersComp(props: Props) {
  const { selectedFilters, onChangeFilters } = props;
  const selectedDir: Dir = document.documentElement.dir as Dir;
  const extraClass = selectedDir === "ltr" ? "right-0" : "left-0";
  const { t } = useTranslation();

  const isSelectedOption = useCallback((filterKey: keyof Filters, filterValue: CarState | GearType | CarType) => {
    return selectedFilters[filterKey].includes(filterValue);
  }, [selectedFilters]);

  const filters: FiltersOpts = {
    state: [
      { value: 'New', label: t('cars.filters.state.new') },
      { value: 'Used', label: t('cars.filters.state.used') },
    ],
    gearType: [
      { value: 'Automatic', label: t('cars.filters.gearType.automatic') },
      { value: 'Manual', label: t('cars.filters.gearType.manual') },
    ],
    type: [
      { value: 'Family', label: t('cars.filters.type.family') },
      { value: 'Fun', label: t('cars.filters.type.fun') },
      { value: 'Small', label: t('cars.filters.type.small') },
      { value: 'Suv', label: t('cars.filters.type.suv') },
    ],
  }
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:!bg-navy-800">
            <HiFilter className="-mr-1 h-5 w-5 text-blueSecondary" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className={`absolute ${extraClass} z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:!bg-navy-800`}>
            {
              Object.entries(filters).map(([key, values]) => {
                console.log(`Filter Type: ${key}`);
                return <div className="flex justify-center py-1 mx-1">
                  <div className="w-full grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-1 md:gap-x-6">
                    <fieldset className={'w-full'}>
                      <div>
                        <a
                          href="#"
                          className={classNames('text-gray-700', 'block px-1 py-2 text-sm', 'font-medium')}
                        >
                          {`${t(`cars.filters.${key}.title`)}`}
                        </a>
                      </div>
                      <div className="w-full grid my-2 auto-rows-min mx-4 grid-cols-2 gap-y-3 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                        {
                          // Use map method to iterate over values array
                          values.map((filter, index) => {
                            console.log(`  Value: ${filter.value}, Label: ${filter.label}`);
                            return (
                              <div key={filter.value} className="flex w-[50%] items-center text-base sm:text-sm">
                                <input
                                  id={`opt-${index}`}
                                  name={`opt-${filter.label}`}
                                  disabled={selectedFilters[key as keyof Filters].length === 1 && isSelectedOption(key as keyof Filters, filter.value)}
                                  defaultChecked={isSelectedOption(key as keyof Filters, filter.value)}
                                  onChange={(e) => {
                                    onChangeFilters(key as keyof Filters, filter.value)
                                  }}
                                  type="checkbox"
                                  className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor={`color-${index}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                  {filter.label}
                                </label>
                              </div>
                            )
                          })
                        }
                      </div>
                    </fieldset>
                  </div>
                </div>
              })
            }
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
