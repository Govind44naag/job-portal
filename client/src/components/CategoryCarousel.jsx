import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Graphic Designer",
    "Full Stack Developer",
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <section className="relative py-16 bg-gradient-to-br from-indigo-400 to-purple-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">
                    Explore Top <span className="text-indigo-600 dark:text-indigo-400">Career Paths</span>
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-300 mb-10">
                    Discover opportunities in trending tech roles
                </p>

                <Carousel className="w-full max-w-5xl mx-auto relative">
                    <CarouselContent className="flex gap-6">
                        {category.map((cat, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/3 lg:basis-1/5 flex justify-center"
                            >
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    className="rounded-2xl px-6 py-4 text-base font-medium shadow-xl 
                                        bg-gradient-to-tr from-indigo-500 to-purple-500 text-white 
                                        hover:from-indigo-600 hover:to-purple-600 transform 
                                        hover:scale-[1.07] transition-all duration-300 ease-in-out 
                                        focus:outline-none focus:ring-4 focus:ring-indigo-300/50"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious
                        className="absolute -left-6 top-1/2 transform -translate-y-1/2 h-10 w-10 bg-white/90 text-indigo-600 
                            hover:bg-white hover:text-indigo-800 shadow-lg rounded-full 
                            transition-all duration-200 z-10"
                    />
                    <CarouselNext
                        className="absolute -right-6 top-1/2 transform -translate-y-1/2 h-10 w-10 bg-white/90 text-indigo-600 
                            hover:bg-white hover:text-indigo-800 shadow-lg rounded-full 
                            transition-all duration-200 z-10"
                    />
                </Carousel>
            </div>
        </section>
    );
};

export default CategoryCarousel;
