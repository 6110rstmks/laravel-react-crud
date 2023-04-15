import CategoryItem from "./CategoryItem"

export default function CategoryItems({categories, deleteCategory, editCategory}) {
    return (
        <div>
            {categories.map(category => {
                return (
                    <CategoryItem key={category.id} category={category}
                        deleteCategory={deleteCategory} editCategory={editCategory}/>
                )
            })}
        </div>
    )
}
