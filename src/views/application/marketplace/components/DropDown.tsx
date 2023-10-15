import { Fragment, useCallback, useMemo, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Dir } from 'layouts/application';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


interface Props {
  defualtValue?: string;
  options: { key: string; name: string }[];
  onChange: (value: string) => void;
}
export default function DropDown(props: Props) {
  const { defualtValue, options, onChange } = props;
  const [value, setValue] = useState(defualtValue);
  const selectedDir: Dir = document.documentElement.dir as Dir;
  const extraClass = selectedDir === "ltr" ? "left-0" : "right-0";

  const handleSelectionChange = useCallback((key: string) => {
    onChange(key)
    setValue(key);
  }, [onChange]);


  const isActiveOption = useCallback((key: string) => {
    return value === key;
  }, [value]);

  return (
    <Menu as="div" className="relative inline-block text-left mr-3 ">
      <div>
        <Menu.Button className="inline-flex rounded-2xl w-full justify-center gap-x-1.5 min-w-fit bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:!bg-navy-800 dark:text-white">
          {value && (options.find((opt) => opt.key === value))?.name || "Sort"}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
        <Menu.Items onClick={() => {}} className={`absolute ${extraClass} z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:!bg-navy-800`}>
          <div className="py-1">
            {
              options.map((option, index) => {
                return <Menu.Item
                  key={option.key}
                >
                  {({ active }) => (
                    <a
                      onClick={() => handleSelectionChange(option.key)}
                      href="#"
                      className={classNames(
                        isActiveOption(option.key) ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm '
                      )}
                    >
                      {option.name}
                    </a>
                  )}
                </Menu.Item>
              })
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
