import Image from "next/image";
import LandingPage from "./component/landingPage/page";
import Section from "./component/Section/page";
import Footer from "./component/footer/page";

export default function Home() {
  return (
    <>
      <div className="landingPage">
        <LandingPage />
      </div>
      <div className="">
        <Section />
      </div>
      <div className="">
        <Footer />
      </div>
    </>
  );
}
