import Image from "next/image";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function ProductsCard({ img, title, desc, rating, price }) {
  const generateRating = (rating) => {
    switch (rating) {
      case 1:
        return (
          <>
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </>
        );
      case 2:
        return (
          <>
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </>
        );
      case 3:
        return (
          <>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </>
        );
      case 4:
        return (
          <>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </>
        );
      case 5:
        return (
          <>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 border border-gray-200 max-w-[400px] rounded-xl">
      <Image
        className="w-full h-auto"
        src={img}
        width={200}
        height={300}
        alt={title}
      />
      <div className="space-y-2 py-2">
        <h2 className="text-accent uppercase font-medium">{title}</h2>
        <p className="text-gray-500 max-w-[150px]">{desc}</p>
        <div className="flex gap-1 text-[20px] text-[#FF9529]">
          {generateRating(rating)}
        </div>
        <div className="font-bold flex gap-4">
          ${price}
          <del className="text-gray-500 font-normal">
            ${parseInt(price) + 50}.00
          </del>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
