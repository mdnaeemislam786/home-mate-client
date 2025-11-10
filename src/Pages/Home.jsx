
import React from 'react';
import HomeSlider from '../Components/HomeComponent/HomeSlider';
import HomeServices from '../Components/HomeComponent/HomeServices';
import HomeStaticSection from '../Components/HomeComponent/HomeStaticSection';

const Home = () => {
    return (
        <div>
           <HomeSlider></HomeSlider>
           <HomeServices></HomeServices>
           <HomeStaticSection></HomeStaticSection>
        </div>
    );
};

export default Home;