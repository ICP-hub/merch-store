import React from "react";
import { useState } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const dataList = [
  {
    name: "Integrity",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },

  {
    name: "Inclusion",
    discription:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Audacity",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Baise for Action",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Integrity",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },

  {
    name: "Inclusion",
    discription:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Audacity",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Baise for Action",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const TeamPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"AboutUs"} />
      <div className="container mx-auto mt-4 px-6 flex gap-2 items-center md:items-start justify-between flex-col  ">
        <div className="flex  flex-col xl:flex-row gap-2 my-6">
          <img
            src="https://dummyimage.com/500x500/EF9A9A/fff"
            alt=""
            className="rounded-xl w-96 h-96"
          />
          <div className="fLex flex-row  items-center justify-center xl:ml-8 w-full">
            <p className="text-2xl font-bold  md:m-0 mt-4 pb-4">Leave a Mark</p>
            <p className=" text-sm font-semibold">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <div className="flex mt-4  flex-col xl:flex-row ">
              <img
                src=" https://dummyimage.com/500x500/EF9A9A/fff"
                alt=""
                className="p-2 w-20 h-20 rounded-full"
              />
              <p className="text-xl font-semibold  my:4 xl:m-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex   flex-col xl:flex-row my-6 gap-4">
          <div className="fLex flex-row  items-center justify-center xl:mr-8 w-full">
            <p className="text-2xl font-bold  md:m-0 mt-4 pb-4">
              Experiment Learn Grow
            </p>
            <p className=" text-sm font-semibold">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <div className="flex mt-4  flex-col xl:flex-row ">
              <img
                src="https://dummyimage.com/500x500/EF9A9A/fff"
                alt=""
                className="p-2 h-20 w-20 rounded-full "
              />
              <p className="text-xl font-semibold my-4 xl:m-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <img
            src="https://dummyimage.com/500x500/EF9A9A/fff"
            alt=""
            className="rounded-xl w-96 h-96"
          />
          <div></div>
        </div>
        <div className="flex    flex-col xl:flex-row my-6 gap-4 ">
          <img
            src="https://dummyimage.com/500x500/EF9A9A/fff"
            alt=""
            className="rounded-xl w-96 h-96"
          />
          <div className="fLex flex-row  items-center justify-center   xl:ml-8 w-full">
            <p className="text-2xl font-bold  md:m-0 mt-4 pb-4">
              Work With The Best
            </p>
            <p className=" text-sm font-semibold ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <div className="flex mt-4  flex-col xl:flex-row ">
              <img
                src="https://dummyimage.com/500x500/EF9A9A/fff"
                alt=""
                className="p-2 w-20 h-20 rounded-full "
              />
              <p className="text-xl font-semibold my-4 xl:m-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex   flex-col xl:flex-row gap-2 my-4">
          <div className="fLex flex-row  items-center justify-center xl:mr-8 w-full">
            <p className="text-2xl font-bold  md:m-0 mt-4 pb-4">We care</p>
            <p className=" text-sm font-semibold">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <div className="flex mt-4  flex-col xl:flex-row ">
              <img
                src=" https://dummyimage.com/500x500/EF9A9A/fff"
                alt=""
                className="p-2  h-20 w-20 rounded-full"
              />
              <p className="text-xl font-semibold   my:4 xl:m-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <img
            src="https://dummyimage.com/500x500/EF9A9A/fff"
            alt=""
            className="rounded-xl w-96 h-96"
          />
          <div></div>
        </div>
        <p className="text-center text-4xl font-bold w-full">Values</p>
        <Carousel />
      </div>
      <Footer></Footer>
    </AnimationView>
  );
};

const Carousel = () => {
  const responsive = {
    0: { items: 1 },
    600: { items: 3 },
    1024: { items: 4 },
  };

  return (
    <AliceCarousel
      mouseTracking
      items={dataList.map((data, index) => (
        <div key={index} className=" container p-2 mt-4   ">
          <div className="rounded-xl border bg-gray-900 border-gray-200 shadow-lg h-60 m-2 flex flex-col items-center justify-center ">
            <p className="text-center text-white text-xl   mt-4">{data.name}</p>
            <p className="text-center text-white text-sm mt-4 m-1">
              {data.discription}
            </p>
          </div>
        </div>
      ))}
      responsive={responsive}
    />
  );
};

export default TeamPage;
