import { useState, useEffect} from 'react'
import axios from "axios"
import {Link} from "react-router-dom";
import CategoryCreate from '../Categories/CategoryCreate'
import CategoryItems from '../Categories/CategoryItems'

function Home() {

    const [categories, setCategories] = useState([])

    useEffect(()=>{
        fetchCategories()
    },[])

    const fetchCategories = async () => {
        const tmpCategories = await axios.get('/api/categories')
        setCategories(tmpCategories.data)
    }

    const addCategory = (newCategoryId, inputCategory) => {
        setCategories([{id: newCategoryId, title: inputCategory}, ...categories])
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
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Recipehouse</div>

                        {/* <Link to={'/page'} className="btn btn-primary">Pageへ遷移</Link> */}
                    </div>
                    <CategoryCreate addCategory={addCategory}></CategoryCreate>

                    {/* <ul>{CategoryItems}</ul> */}
                    <CategoryItems categories={categories}
                        deleteCategory={deleteCategory}
                        editCategory={editCategory}
                        />
                </div>
            </div>
        </div>
    );
}

export default Home;
