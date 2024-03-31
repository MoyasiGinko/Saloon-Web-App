import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/prod/show");
    return response.data.categories.reduce(
      (acc: { [key: string]: string }, category: any) => {
        acc[category._id] = category.name;
        return acc;
      },
      {}
    );
  } catch (error) {
    console.error("Error fetching categories", error);
    return {};
  }
};
