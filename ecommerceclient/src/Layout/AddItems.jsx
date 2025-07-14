import React from 'react';

import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import SectionTitle from '../Shared/SectionTitle';


const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure()

  // 🔼 Upload image to Cloudinary
  const imageUploadToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  // Submit handler
  const onSubmit = async (data) => {
    const imageFile = data.image[0];

    try {
      const imageUrl = await imageUploadToCloudinary(imageFile);

      const itemData = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        product: data.product,
        image: imageUrl,
        size: data.size,
        brand: data.brand
      };

      console.log('Final Item Data:', itemData);

      // 🔁 Send item to backend
      const menuRes = await axiosSecure.post('/api/menu/', itemData);
      console.log(menuRes.data);

    if (menuRes.status === 201) {
        reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${data.name} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Image upload or item submission failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add item!',
      });
    }
  };

  return (
    <div>
      <SectionTitle heading="Add an Item" subheading="What's new?" />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Recipe Name */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register('name', { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Size */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Size*</span>
            </label>
            <input
              type="text"
              {...register('size', { required: true })}
              placeholder="size"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* brand */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Brand*</span>
            </label>
            <input
              type="text"
              {...register('brand', { required: true })}
              placeholder="brand"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Category + Price */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Category */}
            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register('category', { required: true })}
                defaultValue=""
                className="select select-bordered"
              >
                <option disabled value="">
                  Select a category
                </option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="homekitchen">HomeKitchen</option>
                <option value="beauty">Beauty</option>
                <option value="stationery">Stationery</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register('price', { required: true })}
                placeholder="Price"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          {/* Recipe Description */}
          <div className="form-control my-4">
            <label className="label">
              <span className="label-text">Product Details</span>
            </label>
            <textarea
              {...register('product')}
              placeholder="Write product details here"
              className="textarea textarea-bordered h-24"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Upload Image*</span>
            </label>
            <input
              type="file"
              {...register('image', { required: true })}
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Add Item <FaUtensils className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;