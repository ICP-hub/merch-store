import React from 'react'
import Product1 from "../../assets/fakeprod.png"
import { Link } from 'react-router-dom'

const TrendingProductCard = () => {
  return (
    <Link to="/">
        <div className="bg-white/50 backdrop-blur-sm p-2 rounded-2xl overflow-hidden mx-2 border-[1px]">
            <img
              src={Product1}
              alt="product1"
              className="w-full object-cover bg-gray-300 rounded-xl mb-2"
            />
            <div className="flex justify-between items-center px-1 mb-2">
              <h4 className="line-clamp-1 font-semibold text-lg text-gray-900 tracking-wide">Product Title One</h4>
            </div>
            <div className="flex justify-between items-center px-1">
              <h4 className="line-clamp-1 font-semibold text-xl text-gray-900 tracking-wide">
                <span>$100 </span>
                <span className="line-through text-sm text-gray-700 font-light"> $199</span>
              </h4>
            </div>
          </div>
    </Link>
    
  )
}

export default TrendingProductCard