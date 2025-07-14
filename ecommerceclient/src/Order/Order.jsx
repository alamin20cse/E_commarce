import React, { useState } from 'react';
// import Cover from '../../Shared/Cover';
// import orderCoverImg from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import { useParams } from 'react-router-dom';
import useMenu from '../Hooks/useMenu';
import OrderTab from './OrderTab';




const Order = () => {
    const categories = ['fashion', 'electronics', 'homekitchen', 'beauty', 'stationery'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    /*
          Select a category
                </option>
                <option value="">Fashion</option>
                <option value="">Electronics</option>
                <option value="">HomeKitchen</option>
                <option value="">Beauty</option>
                <option value="">Stationery</option

                */
    
    const fashion = menu.filter(item => item.category === 'fashion');
    const electronics = menu.filter(item => item.category === 'electronics');
    const homekitchen = menu.filter(item => item.category === 'homekitchen');
    const beauty = menu.filter(item => item.category === 'beauty');
    const stationery = menu.filter(item => item.category === 'stationery');

    return (
        <div className='pt-24'>
           
            {/* <Cover img={orderCoverImg} title="Order Food"></Cover> */}
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Fashion</Tab>
                    <Tab>Electronics</Tab>
                    <Tab>homekitchen</Tab>
                    <Tab>beauty</Tab>
                    <Tab>stationery</Tab>
                </TabList>
               
                <TabPanel>
                   <OrderTab items={fashion}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={electronics}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={homekitchen}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={beauty}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={stationery}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};
export default Order;