import React from "react";
import './InputInfo.css';

const InputInfo = ({handleSubmitForm,title,price,stock,setTitle,setPrice,setStock}) => {
    return (
        <form onSubmit={handleSubmitForm}>
        <h2>Create new product</h2>
        <input
            placeholder="Title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
        />
        <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
        />
        <input
            placeholder="Stock availability"
            type="number"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            required
        />
        <button className="btn_create" type="submit">Create product</button>
      </form>
    );
}

export default InputInfo;