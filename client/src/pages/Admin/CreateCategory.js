import React, { useEffect, useState } from 'react';
import AdminMenu from './../../components/AdminMenu.js';
import Layout from '../../components/Layout.js';
import toast from "react-hot-toast";
import axios from 'axios';
import CategoryForm from './../../components/Form/CategoryForm.js';
import { Modal } from 'antd';
axios.defaults.withCredentials = true;
// const CreateCategory = () => {
//     const [categories, setCategories] = useState([]);
//     const [name, setName] = useState("");
//     const [visible, setVisible] = useState(false);
//     const [selected, setSelected] = useState(null);
//     const [updateName, setUpdateName] = useState("");

//     // Handle submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try { 
//            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name }); 
//             // const { data } = await axios.post(`http://localhost:8080/api/v1/category/create-category`, { name }); 
//             if (data?.success) {
//                 toast.success(`${name} category is created`);
//                 getAllCategory();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.log(error.message);
//             toast.error("Something went wrong in the input form");

//         }
//     };

//     // Get all categories
//     const getAllCategory = async () => {
//         try {
//             const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
//             if (data.success) {
//                 setCategories(data.category);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error('Something went wrong in getting categories');
//         }
//     };

//     useEffect(() => {
//         getAllCategory();
//     }, []);

//     // Handle update category
//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updateName });
//             if (data.success) {
//                 toast.success(`${updateName} category is updated`);
//                 setSelected(null);
//                 setUpdateName("");
//                 setVisible(false);
//                 getAllCategory();
//             } else {
//                 toast.error("Something went wrong in updating the category");
//             }
//         } catch (error) {
//             toast.error("Something went wrong in the update submit");
//         }
//     };

//     // Handle delete category
//     const handleDelete = async (pId) => {
//         try {
//             const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`);
//             if (data.success) {
//                 toast.success("Category is deleted");
//                 getAllCategory();
//             } else {
//                 toast.error("Something went wrong in deleting the category");
//             }
//         } catch (error) {
//             toast.error("Something went wrong");
//         }
//     };

//     return (
//         <Layout title={"Dashboard - Create Category"}>
//             <div className="container-fluid m-3 p-3">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <AdminMenu />
//                     </div>
//                     <div className="col-md-9">
//                         <h1>Manage Category</h1>
//                         <div className="col-md-9">
//                             <CategoryForm
//                                 handleSubmit={handleSubmit}
//                                 value={name}
//                                 setValue={setName}
//                             />
//                         </div>
//                         <div className="w-75">
//                             <table className="table">
//                                 <thead>
//                                     <tr>
//                                         <th scope="col">Name</th>
//                                         <th scope="col">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {categories?.map((c) => (
//                                         <tr key={c._id}>
//                                             <td>{c.name}</td>
//                                             <td>
//                                                 <button
//                                                     className="btn btn-primary ms-2"
//                                                     onClick={() => {
//                                                         setVisible(true);
//                                                         setUpdateName(c.name);
//                                                         setSelected(c);
//                                                     }}
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     className="btn btn-danger ms-2"
//                                                     onClick={() => handleDelete(c._id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                         <Modal
//                             onCancel={() => setVisible(false)}
//                             footer={null}
//                             open={visible}
//                         >
//                             <CategoryForm
//                                 value={updateName}
//                                 setValue={setUpdateName}
//                                 handleSubmit={handleUpdate}
//                             />
//                         </Modal>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default CreateCategory;

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/category/create-category`,
                { name } , {
                    withCredentials: true,
                  }
            );
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("somthing went wrong in input form");
        }
    };

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category` ,{ withCredentials: true, });
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };
    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`);
            if (data.success) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };
    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary ms-2"
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => {
                                                        handleDelete(c._id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => {
                                setVisible(false);
                                setSelected(null);
                                setUpdatedName("");
                            }}
                            footer={null}
                            open={visible}
                        >
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                            />
                        </Modal>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;