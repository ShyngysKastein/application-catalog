import React,{useState,useMemo} from 'react';
import Table from '../Table/Table';
import Cell from '../Table/Cell/Cell';
import Row from '../Table/Row/Row';
import InputInfo from '../InputInfo/InputInfo';


const Container = () => {
  const [products, setProducts] = useState([
    { id: 0, title: 'HDD desk', price: 500, stock: 1 },
    { id: 1, title: 'ADATA RAM', price: 1000, stock: 1 },
    { id: 2, title: 'ASUS Zenbook', price: 250, stock: 1 },
    { id: 3, title: 'Aser Zenbook', price: 2000, stock: 0 },
    { id: 4, title: 'Mackbook', price: 3000, stock: 1 },
  ]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [titleSort, setTitleSort] = useState(false);
  const [priceSort, setPriceSort] = useState(false);
  const [stockSort, setStockSort] = useState(false);

  const resetInputs = () => {
    setTitle('');
    setPrice('');
    setStock('');
  }
  
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const createdProduct = products.find((product) => product.title === title);
    
    if(!createdProduct){
      const newProduct = {
        id: Math.random().toString(36).substring(2, 12),
        title,
        price,
        stock,
      }
      setProducts([...products, newProduct]);
    }else {
      let isReplaceProduct = false;
      isReplaceProduct = window.confirm('Товар уже есть, заменить?');
      if (isReplaceProduct) {
        setProducts((prevProducts) => {
          return prevProducts.map((product) => {
            if (product.title === title) {
              product.price = price;
              return { ...product, price, stock: +product.stock + +stock };
            }
            return product;
          })
        })
      } else {
        const newProductWithNewTitle = {
          id: Math.random().toString(36).substring(2, 12),
          title:title + products.length,
          price,
          stock,
        }
        setProducts([...products, newProductWithNewTitle]);
      }
    }
    resetInputs();
  }

  const onReduceStock = (productId, stock) => {
    if (stock === 0) {
      return;
    }
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (productId === product.id) {
          return { ...product, stock: product.stock - 1 };
        }
        return product;
      })
    })
  }

  const totalProductsStock = useMemo(() => {
    return products.reduce((acc, product) => acc + product.stock, 0);
  }, [products]);

  return(
    <div>
    <Table>
    <Row>
          <Cell
            onClick={() => {
              setProducts(() => {
                const newProd = JSON.parse(JSON.stringify(products));

                if (titleSort) {
                  const mapp = newProd.sort((a, b) =>
                    a.title.localeCompare(b.title)
                  )
                  setTitleSort(!titleSort);

                  return mapp;
                } else {
                  const mapp = newProd.sort((a, b) =>
                    b.title.localeCompare(a.title)
                  )
                  setTitleSort(!titleSort);

                  return mapp;
                }
              })
            }}
          >
            Title 
            {titleSort ? <span className='symbol'>▲</span> : <span className='symbol'>▼</span>}
          </Cell>
          <Cell
            onClick={() => {
              setProducts(() => {
                const newProd = JSON.parse(JSON.stringify(products));
                if (priceSort) {
                  const mapp = newProd.sort((a, b) => a.price - b.price);
                  setPriceSort(!priceSort);
                  return mapp;
                } else {
                  const mapp = newProd.sort((a, b) => b.price - a.price);
                  setPriceSort(!priceSort);
                  return mapp;
                }}
              )}
          }>
            Price $ 
            {priceSort ? <span className='symbol'>▲</span> : <span className='symbol'>▼</span>}
          </Cell>
          <Cell
            onClick={() => {
              setProducts(() => {
                const newProd = JSON.parse(JSON.stringify(products));
                if (stockSort) {
                  const mapp = newProd.sort((a, b) => a.stock - b.stock);
                  setStockSort(!stockSort);
                  return mapp;
                } else {
                  const mapp = newProd.sort((a, b) => b.stock - a.stock);
                  setStockSort(!stockSort);
                  return mapp;
                }
              })
            }}
          >
            Stock 
            {stockSort ? <span className='symbol'>▲</span> : <span className='symbol'>▼</span>}
          </Cell>
        </Row>
        {products &&
          products.map((product) => {
            return (
              <Row key={product.id}>
                <Cell>{product.title}</Cell>
                <Cell>{product.price}</Cell>
                <Cell>
                  <div className="stock">
                    <div className="stock_number">{product.stock}</div>
                    <button className='btn_minus'
                      onClick={() => onReduceStock(product.id, product.stock)} 
                    >
                      - 
                    </button>
                  </div>
                </Cell>
              </Row>
            )
          })}
    </Table>
    {products.length  === 0 || (totalProductsStock === 0 &&  (
        <div className="no-products">No products available</div>
      ))}
    <InputInfo 
            handleSubmitForm={handleSubmitForm}
            title={title}
            price={price} 
            stock={stock} 
            setTitle={setTitle}
            setPrice={setPrice}
            setStock={setStock}/>
    </div>
  )
}

export default Container;