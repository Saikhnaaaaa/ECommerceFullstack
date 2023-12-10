import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import { Link } from 'react-router-dom'

const HomePage = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getProducts = async()=> {
    try {
      setIsLoading(true)
      const response = await axios.get("http://localhost:8888/api/products")
      console.log(response.data)
      setProducts(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    getProducts()
  },[])


  return (
    <div >
      <div>
        <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
        Create a PRoduct
        </Link>
      </div>
      <div className="mt-5 ">
        {isLoading? (
          "Loading"
        ): (
          <>
            {products.length>0? (
              <div className='grid grid-cols-4 gap-5'>
                {
                  products.map((product, index) => {
                    return(
                      <Product key={index} product={product} getProducts={getProducts}/>
                    )
                  })
                }
              </div>
            ): (
              <div>
                There is no products
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}

export default HomePage