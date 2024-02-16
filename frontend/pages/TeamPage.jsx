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
    discription: "We strive to do what is right and do what we say we will do.",
  },

  {
    name: "Inclusion",
    discription:
      "We value the uniqueness in everyone, respect differences, and foster a sense of belonging.",
  },
  {
    name: "Audacity",
    discription: "We think big and take bold bets.   We change the paradigm.",
  },
  {
    name: "Baise for Action",
    discription:
      "We have a strong sense of urgency to solve problems strategically.",
  },
  {
    name: "Integrity",
    discription: "We strive to do what is right and do what we say we will do.",
  },

  {
    name: "Inclusion",
    discription:
      "We value the uniqueness in everyone, respect differences, and foster a sense of belonging.",
  },
  {
    name: "Audacity",
    discription: "We think big and take bold bets. We change the paradigm.",
  },
  {
    name: "Baise for Action",
    discription:
      "We have a strong sense of urgency to solve problems strategically.",
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
              We're known more by the impact we create than the titles we hold.
              Impact that is brought by working together on audacious challenges
              at scale with an aim to revolutionize for the Indian customer. We
              believe great ideas can emerge from anywhere and must be backed.
              Our people - backed by our culture of end-to-end ownership - have
              revolutionised India's e-commerce sector - several times over!
            </p>
            <div className="flex mt-4  flex-col xl:flex-row ">
              <img
                src=" https://dummyimage.com/500x500/EF9A9A/fff"
                alt=""
                className="p-2 w-20 h-20 rounded-full"
              />
              <p className="text-xl font-semibold  my:4 xl:m-4">
                Stuffus users can choose between English and 11 Indian
                languages. Our teams built vernacular support in just 2.5 years,
                most of it while working remotely!
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
              Our journey of building India's biggest unicorn start-up has been
              full of successes, but also failures and learning from them.
              That's why there's calculated risk-taking, a high willingness to
              learn and improvise, and a growth orientation built into
              everything we do. Whether it be opening a new warehouse, or making
              our mobile app a bit more consumer friendly, we're always
              experimenting, learning and growing!
            </p>
            <div className="flex mt-4  flex-col xl:flex-row ">
              <img
                src="https://dummyimage.com/500x500/EF9A9A/fff"
                alt=""
                className="p-2 h-20 w-20 rounded-full "
              />
              <p className="text-xl font-semibold my-4 xl:m-4">
                We celebrate our biggest risk that didn't work out each year
                with the Chandrayaan Award at our Annual Awards ceremony!
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
              The best people make the best teams. And we put all our efforts
              into finding the right people that fit into our high-performing
              inclusive teams. Everyone has a voice on the table and diversity
              of thoughts, styles and actions is celebrated. From a category
              leader to a wishmaster, we are all bound together and guided by
              our values of audacity, bias for action, customer-first, integrity
              and inclusion.
            </p>
            <div className="flex mt-4  flex-col xl:flex-row ">
              <img
                src="https://dummyimage.com/500x500/EF9A9A/fff"
                alt=""
                className="p-2 w-20 h-20 rounded-full "
              />
              <p className="text-xl font-semibold my-4 xl:m-4">
                Stuffus users can choose between English and 11 Indian
                languages. Our teams built vernacular support in just 2.5 years,
                most of it while working remotely!
              </p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex   flex-col xl:flex-row gap-2 my-4">
          <div className="fLex flex-row  items-center justify-center xl:mr-8 w-full">
            <p className="text-2xl font-bold  md:m-0 mt-4 pb-4">We care</p>
            <p className=" text-sm font-semibold">
              Our culture of care extends to our people, stakeholders, customers
              and the planet! We do not believe in a one size fits all strategy.
              Our benefits and care policies are driven by empathy and
              customised to the unique needs of individual Flipsters. Because
              when Flipsters and their families are cared for, they can focus on
              doing their best work. We put your hopes, dreams and endeavours
              first - always.
            </p>
            <div className="flex mt-4  flex-col xl:flex-row ">
              <img
                src=" https://dummyimage.com/500x500/EF9A9A/fff"
                alt=""
                className="p-2  h-20 w-20 rounded-full"
              />
              <p className="text-xl font-semibold   my:4 xl:m-4">
                Stuffus users can choose between English and 11 Indian
                languages. Our teams built vernacular support in just 2.5 years,
                most of it while working remotely!
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
