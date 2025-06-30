import React, { useEffect, useState } from 'react';
import axios from "axios";

export const Todo = () => {
    const [todos, setTodods] = useState([])
    const [filtered, setFilterred] = useState([])
    const [title, setTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const fetchData = async () => {
        try {
            const res = await axios.get('https://fakestoreapi.com/products');
            setTodods(res.data);
            setFilterred(res.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filteredTodo = todos.filter(el =>
            el.title.toLowerCase().includes(title.toLowerCase())
        );
        setFilterred(filteredTodo)
        setCurrentPage(1)
    }, [title, todos])

    
    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem)

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1)
    };

    const handleItemsPerPage = (e) => {
        setItemsPerPage(Number(e.target.value))
        setCurrentPage(1)
    };

    return (
        <>
            <div className='flex justify-around align-center mt-2 sticky top-0 bg-amber-200 p-5'>
                <div>
                    <input
                        type="text"
                        placeholder='search by title'
                        onChange={(e) => setTitle(e.target.value)}
                        className=' border-2 px-2 rounded-xl'
                    />
                </div>
                <div className='flex justify-around gap-3.5'>
                    <button onClick={handlePrev} className='bg-red-400 px-1 rounded-xl hover:cursor-pointer'>prev</button>
                    <button className='bg-green-600 rounded-xl px-2 hover:cursor-pointer'>current: {currentPage}</button>
                    <button onClick={handleNext} className='bg-yellow-600 rounded-xl px-2 hover:cursor-pointer'>Next</button>

                    <select name="page" id="page" onChange={handleItemsPerPage}>
                        <option value="">items for page</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>

            <div className='grid grid-cols-4 gap-7 mt-7'>
                {currentItems.map(el => (
                    <div key={el.id} className='text-center shadow-md h-[70vh] overflow-hidden'>
                        <img src={el.image} alt="title" className='w-full h-1/2' />
                        <h1 className='text-black text-3xl'>{el.title}</h1>
                        <p><strong>Price</strong>{el.price}</p>
                        <p><strong>Category</strong>{el.category}</p>
                    </div>
                ))}
            </div>
        </>
    );
};
