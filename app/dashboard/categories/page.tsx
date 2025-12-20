import AddCategoryBtn from "./_components/add_category_btn";

const Categories = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Categories</h1>
        <AddCategoryBtn />
      </div>
    </div>
  );
};

export default Categories;
