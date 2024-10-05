import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import SubCard from '../components/SubCard'
import Axios from 'axios'
import { Button } from '@nextui-org/react'




const Pricing = () => {
    const [prices, setPrices] = useState([])
    const [plan, setPlan] = useState()
    


    useEffect(() => {

        const fetchPrices = async () => {
           try {
            const response = await Axios.get('http://localhost:5000/get-prices')

            
            setPrices(response.data.data)
            console.log(response.data)

           } catch (err) {
                console.log(err)
           }
        }
    fetchPrices()
    },[])


    const checkSubs = async () => {
        const token = localStorage.getItem('token')

        try {
            const response = await Axios.get('http://localhost:5000/validateId', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                  }
            })

            setPlan(response.data)

            console.log(response.data)

        } catch (err) {
            console.log(err)
        }

    }

    




    return (
        <>
            <Header />
            
            <div className='bg-[#F3F4F6] h-[100vh] '>
                <div className='flex justify-around flex-wrap h-full items-center'>

                    <SubCard 
                    plan={"FREE"}
                    price={'Free'}
                    contentOne={'Roughly 7 minutes of audio'}
                    />

                    {prices.length > 0 && ( 
                    <SubCard
                    plan={"Basic"}
                    key={prices[2].id}
                    price_id={prices[2].id}
                    price={prices[2].unit_amount / 100}
                    contentOne={'Over 6 Hours of audio'}
                    />
                    )}

                {prices.length > 0 && ( 
                    <SubCard
                    plan={"Premium"}
                    key={prices[0].id}
                    price_id={prices[0].id}
                    price={prices[0].unit_amount / 100}
                    contentOne={'16 Hours of audio'}
                    />
                )}
                
                </div>
                <Button onClick={() => checkSubs()} className="text-tiny w-[10rem] text-[1.3rem]" color="primary" radius="full" size="lg">
                Check Subscription
                </Button>
                 {plan}
            </div>
            

            
        </>
    );
}

export default Pricing