import nft1 from "assets/img/dashboards/bannerBk.png";

export interface BannerProps {
  title: string;
  value: {
    key: string;
    unit: string;
    class: string;
  };
  image: {
    src: string
  };
  footer: {
    key: string,
    class: string,
  };
  extra?: string,
}

const Banner2 = (props: BannerProps) => {
  const { title, value, image, footer, extra } = props;
  return (
    <div
      className={`flex w-full flex-col rounded-md !h-[222px] bg-cover px-[8px] py-[8px] md:px-[22px] md:py-[8px] ${extra}`}
    >
      <div className="w-full flex justify-between	">
        <div className='w-3/5 py-[18px] 3xl:py-[28px]'>
          <h6 className="mb-[8px] max-w-full text-xl font-bold text-white md:w-[50%] md:text-1xl md:leading-[22px] lg:w-[46%] xl:w-[55%] 2xl:w-[55%] 3xl:w-[85%] dark:text-white ">
            {title}
            <h3 className={`my-2 mx-1 text-2xl font-bold ${value.class}`}>
              {value.key}
            </h3>
            {value.unit}
          </h6>
        </div>
        <div
          className="w-[150px] mx-2 bg-no-repeat 3xl:w-[100px]"
          style={{ backgroundImage: `url(${image.src})` }}
        />
      </div>
      <p className={`mb-[20px] max-w-full text-base font-medium md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[100%] 3xl:w-[100%] dark:text-white ${footer.class}`}>
        {footer.key}
      </p>
    </div>
  );
};

export default Banner2;
