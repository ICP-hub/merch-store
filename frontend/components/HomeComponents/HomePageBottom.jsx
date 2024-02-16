/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React from "react"
import { BsArrowLeft, BsArrowRight, BsCart3 } from "react-icons/bs"
import Button from "../common/Button"
import fakeProd from "../../assets/fakeprod.png"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import SmoothList from "react-smooth-list"
import { Tilt } from "react-tilt"
const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
}
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main : HomePage Bottom Component.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageBottom = () => {
  return (
    <div className="flex flex-col py-8  rounded-2xl gap-8 tracking-wider">
      <NewArrival />
      <ExpCategories />
      {/*       <ExploreCategories />
       */}{" "}
    </div>
  )
}

/* ----------------------------------------------------------------------------------------------------- */
/*  @ First Div: HomeBottom : New Arrival Div.
/* ----------------------------------------------------------------------------------------------------- */

const NewArrival = () => {
  return (
    <div className="px-6 md:container md:mx-auto mb-10">
      <div
        data-aos="fade-up"
        className="p-6 grid sm:grid-cols-2 max-h-full overflow-hidden gap-2 border-[1px] border-dashed rounded-2xl"
      >
        <div data-aos="fade-up" className="order-2 sm:order-1 flex flex-col">
          <div className="flex-1 overflow-auto">
            <p className="text-sm text-slate-600">NEW ARRIVAL</p>
            <h1 className="text-4xl max-md:text-3xl font-semibold pb-4">
              Sangkalala Sound
            </h1>
            <p className="text-slate-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              architecto tempore fugiat, temporibus fugit repellendus ipsa!
            </p>
          </div>
          <Features />
        </div>
        <Tilt
          options={defaultOptions}
          className="order-1 sm:order-2 rounded-2xl bg-gray-200 justify-center items-center flex shadow-lg mb-4 md:mb-0"
        >
          <img
            src={fakeProd}
            alt="prod.name"
            className="h-80 w-80 object-contain"
          />
        </Tilt>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Second Div: HomeBottom : ExploreCategories component.
/* ----------------------------------------------------------------------------------------------------- */
/* const ExploreCategories = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
    },
  }

  return (
    <div className="flex flex-col gap-2 relative py-8 container mx-auto">
      <div className="flex justify-between">
        <div className="text-xl font-semibold max-w-2xl sm:text-3xl">
          Explore Our Curated Categories and transform your living spaces
        </div>
      </div>
      <Carousel
        responsive={responsive}
        infinite
        containerClass="carousel-container"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div className="relative rounded-lg bg-sky-500 mr-4" key={index}>
            <img
              src={fakeProd}
              alt={`Product ${index + 1}`}
              className="min-h-80 min-w-80"
            />
            <span className="absolute bottom-2 left-2 p-1 rounded-full bg-white text-xs font-semibold">
              Category
            </span>
          </div>
        ))}
      </Carousel>
    </div>
  )
} */

//category new
const ExpCategories = () => {
  return (
    <div className="md:container md:mx-auto px-6 my-8 ">
      <h1
        data-aos="fade-up"
        className="font-semibold text-5xl text-center text-gray-900 mb-2"
      >
        Featured Collections
      </h1>
      <p
        data-aos="fade-up"
        className="mb-10 font-light text-sm text-center text-gray-400"
      >
        Explore our featured collections for a curated selection of excellence
        in every category.
      </p>
      <SmoothList delay={200}>
        <div className="grid-category">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </SmoothList>
    </div>
  )
}

//category card
const CategoryCard = () => {
  return (
    <div
      data-aos="fade-up"
      className="item-category rounded-2xl bg-[url('https://picsum.photos/1000')] bg-cover bg-center bg-no-repeat grayscale hover:grayscale-0 transition duration-300 ease-in-out cursor-pointer"
    >
      <div className="h-full w-full bg-black/50 rounded-2xl flex flex-col justify-center items-center">
        <h4 className="font-semibold text-white text-4xl ">Category</h4>
      </div>
    </div>
  )
}

// Features
const FeatureItem = ({ title, quality }) => (
  <div className="flex gap-3 items-center">
    <Button className="p-4 rounded-full bg-gray-200">
      <BsCart3 size={20} />
    </Button>
    <div className="flex flex-col">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-xs text-slate-600 font-semibold">{quality}</p>
    </div>
  </div>
)

export const Features = () => {
  const featureData = [
    { title: "Feature Name 1", quality: "Feature Quality 1" },
    { title: "Feature Name 2", quality: "Feature Quality 2" },
    { title: "Feature Name 3", quality: "Feature Quality 3" },
  ]

  return (
    <div className="features flex flex-col gap-4 mt-4">
      {featureData.map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </div>
  )
}

export default HomePageBottom
