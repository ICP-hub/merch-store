import React from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import Policy from "../components/common/Policy.jsx";
const returnList = [
  {
    name: "exampleItem1",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan orci vel quam sagittis, sit amet vulputate dolor congue. Fusce tristique justo vel ligula dignissim, in tempor nunc tincidunt. Nulla facilisi. Integer commodo sapien eu tellus rhoncus, vel fermentum orci tincidunt. Proin laoreet ex vel urna tristique, nec ultrices elit fringilla. Vivamus hendrerit, orci in convallis vehicula, elit libero malesuada justo, nec finibus orci neque in massa.",
    ],
  },
  {
    name: "exampleItem2",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et turpis nec nisi ullamcorper euismod at sit amet sapien. Vivamus venenatis odio sit amet interdum congue. Duis eu mi et dui ultricies hendrerit non nec libero. Proin sed justo vel odio fermentum rhoncus. Morbi feugiat orci non dolor auctor, vel accumsan libero bibendum. Nulla facilisi. Quisque vel velit quis dolor pharetra semper in vitae tortor.",
    ],
  },
  {
    name: "exampleItem3",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu dolor vel tortor fringilla iaculis vel in libero. Aliquam pulvinar tincidunt elit, ac facilisis sapien tristique vel. Vestibulum ac ex vitae quam hendrerit finibus. Nam nec hendrerit justo. Maecenas quis neque eget urna auctor eleifend non a elit.",
    ],
  },
  {
    name: "exampleItem1",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan orci vel quam sagittis, sit amet vulputate dolor congue. Fusce tristique justo vel ligula dignissim, in tempor nunc tincidunt. Nulla facilisi. Integer commodo sapien eu tellus rhoncus, vel fermentum orci tincidunt. Proin laoreet ex vel urna tristique, nec ultrices elit fringilla. Vivamus hendrerit, orci in convallis vehicula, elit libero malesuada justo, nec finibus orci neque in massa.",
    ],
  },
  {
    name: "exampleItem2",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et turpis nec nisi ullamcorper euismod at sit amet sapien. Vivamus venenatis odio sit amet interdum congue. Duis eu mi et dui ultricies hendrerit non nec libero. Proin sed justo vel odio fermentum rhoncus. Morbi feugiat orci non dolor auctor, vel accumsan libero bibendum. Nulla facilisi. Quisque vel velit quis dolor pharetra semper in vitae tortor.",
    ],
  },
  {
    name: "exampleItem3",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu dolor vel tortor fringilla iaculis vel in libero. Aliquam pulvinar tincidunt elit, ac facilisis sapien tristique vel. Vestibulum ac ex vitae quam hendrerit finibus. Nam nec hendrerit justo. Maecenas quis neque eget urna auctor eleifend non a elit.",
    ],
  },
  {
    name: "exampleItem1",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan orci vel quam sagittis, sit amet vulputate dolor congue. Fusce tristique justo vel ligula dignissim, in tempor nunc tincidunt. Nulla facilisi. Integer commodo sapien eu tellus rhoncus, vel fermentum orci tincidunt. Proin laoreet ex vel urna tristique, nec ultrices elit fringilla. Vivamus hendrerit, orci in convallis vehicula, elit libero malesuada justo, nec finibus orci neque in massa.",
    ],
  },
  {
    name: "exampleItem2",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et turpis nec nisi ullamcorper euismod at sit amet sapien. Vivamus venenatis odio sit amet interdum congue. Duis eu mi et dui ultricies hendrerit non nec libero. Proin sed justo vel odio fermentum rhoncus. Morbi feugiat orci non dolor auctor, vel accumsan libero bibendum. Nulla facilisi. Quisque vel velit quis dolor pharetra semper in vitae tortor.",
    ],
  },
  {
    name: "exampleItem3",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu dolor vel tortor fringilla iaculis vel in libero. Aliquam pulvinar tincidunt elit, ac facilisis sapien tristique vel. Vestibulum ac ex vitae quam hendrerit finibus. Nam nec hendrerit justo. Maecenas quis neque eget urna auctor eleifend non a elit.",
    ],
  },
  {
    name: "exampleItem1",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan orci vel quam sagittis, sit amet vulputate dolor congue. Fusce tristique justo vel ligula dignissim, in tempor nunc tincidunt. Nulla facilisi. Integer commodo sapien eu tellus rhoncus, vel fermentum orci tincidunt. Proin laoreet ex vel urna tristique, nec ultrices elit fringilla. Vivamus hendrerit, orci in convallis vehicula, elit libero malesuada justo, nec finibus orci neque in massa.",
    ],
  },
  {
    name: "exampleItem2",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et turpis nec nisi ullamcorper euismod at sit amet sapien. Vivamus venenatis odio sit amet interdum congue. Duis eu mi et dui ultricies hendrerit non nec libero. Proin sed justo vel odio fermentum rhoncus. Morbi feugiat orci non dolor auctor, vel accumsan libero bibendum. Nulla facilisi. Quisque vel velit quis dolor pharetra semper in vitae tortor.",
    ],
  },
  {
    name: "exampleItem3",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu dolor vel tortor fringilla iaculis vel in libero. Aliquam pulvinar tincidunt elit, ac facilisis sapien tristique vel. Vestibulum ac ex vitae quam hendrerit finibus. Nam nec hendrerit justo. Maecenas quis neque eget urna auctor eleifend non a elit.",
    ],
  },
  {
    name: "exampleItem1",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan orci vel quam sagittis, sit amet vulputate dolor congue. Fusce tristique justo vel ligula dignissim, in tempor nunc tincidunt. Nulla facilisi. Integer commodo sapien eu tellus rhoncus, vel fermentum orci tincidunt. Proin laoreet ex vel urna tristique, nec ultrices elit fringilla. Vivamus hendrerit, orci in convallis vehicula, elit libero malesuada justo, nec finibus orci neque in massa.",
    ],
  },
  {
    name: "exampleItem2",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et turpis nec nisi ullamcorper euismod at sit amet sapien. Vivamus venenatis odio sit amet interdum congue. Duis eu mi et dui ultricies hendrerit non nec libero. Proin sed justo vel odio fermentum rhoncus. Morbi feugiat orci non dolor auctor, vel accumsan libero bibendum. Nulla facilisi. Quisque vel velit quis dolor pharetra semper in vitae tortor.",
    ],
  },
  {
    name: "exampleItem3",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu dolor vel tortor fringilla iaculis vel in libero. Aliquam pulvinar tincidunt elit, ac facilisis sapien tristique vel. Vestibulum ac ex vitae quam hendrerit finibus. Nam nec hendrerit justo. Maecenas quis neque eget urna auctor eleifend non a elit.",
    ],
  },
];

// Add more items as needed

// You can now use the updated returnList for your return policy page.

const ReturnPolicyPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"RETURN POLICY"} />
      <Policy data={returnList} />

      <Footer></Footer>
    </AnimationView>
  );
};

export default ReturnPolicyPage;
