import "./Banner.scss";
import BannerImg from "../../assets/banner.jpg";

const Banner = () => {
  return (
    <div className="banner-main">
      <img src={BannerImg} alt="img" />
    </div>
  );
};

export default Banner;
