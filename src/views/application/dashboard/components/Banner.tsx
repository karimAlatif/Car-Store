import nft1 from "assets/img/dashboards/bannerBk.png";

export interface BannerProps {
  title: string;
  subtitle: string;
  butText: string;
  extra?: string,
}
const Banner1 = (props: BannerProps) => {
  const { title, subtitle, butText } = props;
  return (
    <div
      className="flex w-full flex-col rounded-md w-[554px] !h-[222px] bg-cover px-[8px] py-[8px] md:px-[22px] md:py-[8px] bg-amber-200 dark:!bg-navy-800"
    // style={{ backgroundImage: `url(${nft1})` }}
    >
      <div className="w-full flex justify-between	">
        <div className='w-3/5 py-[18px]'>
          <h4 className="mb-[8px] max-w-full text-xl font-normal text-black md:w-[50%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[95%] 3xl:w-[90%] dark:text-white ">
            {title}
          </h4>
          <p className="mb-[20px] max-w-full text-base font-medium text-[#152736] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[58%] dark:text-white">
            {subtitle}
          </p>
          <div className="mt-[8px] ml-3 flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
            <button className="text-black linear rounded-md bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70">
              {butText}
            </button>
          </div>
        </div>
        <div
          className="w-[235px] bg-no-repeat dark:!bg-white"
          style={{ backgroundImage: `url(${nft1})` }}
        />
      </div>
    </div>
  );
};

export default Banner1;
