import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryItems from './CategoryItems';
import { useState, useEffect} from 'react'
import '../bootstrap';


function Categories() {
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        fetchCategories()
    },[])

    const fetchCategories = async () => {
        const tmpCategories = await axios.get('/api/categories')
        setCategories(tmpCategories.data)
    }

    const deleteCategory = async (e) => {
        const categoryId = e.target.getAttribute("id")
        const compSign = await axios.delete('/api/categories/' + categoryId)

        if (compSign.data === 'complete') {
            const newCategories = categories.filter(category => category.id != categoryId)
            setCategories(newCategories)
        }
    }

    const editCategory = (targetCategory, newCategoryTitle) => {
        const categoryId = parseInt(targetCategory.getAttribute("id"))
        const updateCategories = categories.map((category) => {
            if (category.id === categoryId) {
                return {id: categoryId, title: newCategoryTitle}
            }
            return category
        })

        console.log(updateCategories)
        setCategories(updateCategories)
    }


    return (
        // <BrowserRouter>
        //     <Routes>
        //         <Route path='/'  element={<CategoryItems />} />
        //         <Route path='/page'  element={<Page />} />
        //     </Routes>
        // </BrowserRouter>
        <>
            <div>category 一覧</div>
            <CategoryItems categories={categories}
                deleteCategory={deleteCategory}
                editCategory={editCategory}
                />
        </>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Categories />);
