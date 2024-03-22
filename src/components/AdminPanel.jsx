import  { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Modal, Form, Pagination, InputGroup  } from 'react-bootstrap';
import Logo from '../../public/images/logo.png';
import Setting from '../../public/images/settings.png';
import Shop from '../../public/images/shop.png';
import Text from '../../public/images/text.png';
import Bin from '../../public/images/bin.png';
import Search from '../../public/images/search.png';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [fullscreen, setFullscreen] = useState(false);
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [formData, setFormData] = useState({
    productName: '',
    articleNumber: '',
    brand: '',
    price: '',
    discountedPrice: ''
  });

const [searchQuery, setSearchQuery] = useState('');
const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};
const getPaginatedProducts = () => {
  const filteredProducts = products.filter((product) => {
    const { title, brand } = product;
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(title) || searchRegex.test(brand);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
};

  useEffect(() => {
  fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => setProducts(data))
    .catch(error => console.log(error));
}, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSave = () => {
    const newProduct = { ...formData };
    setProducts([...products, newProduct]);
    setFormData({
      title: '',
      price: '',
      brand: '',
      stock: '',
      discountedPrice: ''
    });
    setShow(false);
  };
  let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const handleDelete = (productId) => {
  const updatedProducts = products.filter((product) => product.id !== productId);
  
  setProducts(updatedProducts);
};



  

  return (
    <div className='container'>
    
      <Row>
        <Col sm={2} className="sidebar d-grid  p-3 justify-content-center align-items-start gap-4" style={{
            width: '100px',
            height:'950px',
            backgroundColor: '#5B5CE2',
          }}>
          <div className="p-3 text-center">
            <span>
                <img src={Logo} alt="Logo" />
            </span>
          <ul className="d-grid gap-4 mt-5">
            <li className="p-3 mt-5 text-center rounded" onClick={handleClose} style={{ backgroundColor: '#6C6DE5' }}>
              <img src={Shop} alt="Shop" />
            </li>
            <li  className="p-3 text-center rounded active" onClick={handleShow} style={{ backgroundColor: '#6C6DE5' }}>
              <img src={Setting}  alt="Setting" />
            </li>
          </ul>
          </div>
        </Col>
        <Col sm={11} className="content pb-4" style={{ backgroundColor: '#EEEEF5' }}>
            <div className=" ps-5" style={{ width: '1900px',backgroundColor:'white' }}>
            <h2>Товары</h2>
            <div className="d-flex gap-2">
              <p>Главная</p>
              <p>/</p>
              <p>Товары</p>
            </div>
          </div>
          <div className=" mt-5 pt-4 px-3 rounded table-container bg-light">
            <div className='d-flex'>
            <div className="w-100" >
            <h2>Все товары (5)</h2>
          </div>
            <InputGroup className="mb-3 w-25">
  <InputGroup.Text id="basic-addon1">
    <img src={Search} alt="" />
  </InputGroup.Text>
  <Form.Control
    placeholder="Search..."
    aria-label="Search"
    aria-describedby="basic-addon1"
    value={searchQuery}
    onChange={handleSearchChange}
  />
</InputGroup>
          </div>
            <Table  hover className="table table-hover mb-5" style={{  }}>
                <thead>
                <tr className=''>
                  <th className='text-secondary fs-6 fw-medium' colSpan="5">Наименование</th>
                  <th className='text-secondary fs-6 fw-medium'>Артикул</th>
                  <th className='text-secondary fs-6 fw-medium'>Бренд</th>
                  <th className='text-secondary fs-6 fw-medium'>Цена</th>
                  <th className='text-secondary fs-6 fw-medium'>Цена со скидкой </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                
                {getPaginatedProducts().map((products) => (
                <tr key={products.id}  className="justify-content-between">
                    <td scope="row" colSpan="5">{products.title}</td>
                    <td>{products.price}</td>
                    <td>{products.brand}</td>
                    <td>{products.stock}</td>
                    <td>{products.discountPercentage}</td>
                    <td className="d-flex gap-3">
                      <button onClick={handleShow} className="border border-0 rounded px-2 py-1">
                        <img src={Text} alt="" />
                      </button>
                      <button onClick={() => handleDelete(products.id)} className="border border-0 rounded px-2 py-1">
                        <img src={Bin} alt="" />
                      </button>
                    </td>
                  </tr>
                  ))}
                  {getPaginatedProducts().map((product, index) => (
    <tr key={index} className="justify-content-between">
      <td scope="row" colSpan="5">{product.title}</td>
      <td>{product.price}</td>
      <td>{product.brand}</td>
      <td>{product.stock}</td>
      <td>{product.discountPercentage}</td>
      <td className="d-flex gap-3">
        <button onClick={handleShow} className="border border-0 rounded px-2 py-1">
          <img src={Text} alt="" />
        </button>
        <button onClick={() => handleDelete(product.id)} className="border border-0 rounded px-2 py-1">
                        <img src={Bin} alt="" />
        </button>
      </td>
    </tr>
  ))}
                <Pagination className='my-4'>
  {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
    <Pagination.Item
      key={index + 1}
      active={index + 1 === currentPage}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </Pagination.Item>
  ))}
</Pagination>
              </tbody>
            </Table>
          </div>
          <Button variant="success" onClick={handleShow}>+ Новый товар</Button>
        </Col>
      </Row>
        <Modal className='d-flex' show={show} onHide={handleClose} fullscreen>
      <Container>
        <Row >
            <Col sm={3} className="sidebar d-grid  p-3 justify-content-center align-items-start gap-4" style={{
            width: '100px',
            backgroundColor: '#5B5CE2',
          }}>
          <div className="p-3 text-center">
            <span>
                <img src={Logo} alt="Logo" />
            </span>
          <ul className="d-grid gap-4 mt-5">
            <li className="p-3 mt-5 text-center rounded" onClick={handleClose} style={{ backgroundColor: '#6C6DE5' }}>
              <img src={Shop} alt="Shop" />
            </li>
            <li  className="p-3 text-center rounded active" onClick={handleShow} style={{ backgroundColor: '#6C6DE5' }}>
              <img src={Setting}  alt="Setting" />
            </li>
          </ul>
          </div>
        </Col>
            <Col sm={9} className='bg-light'>
                <Modal.Title style={{backgroundColor:'white'}}>
            <div className=" ps-5" style={{  backgroundColor:'white' }}>
            <h2>Новый товар</h2>
            <div className="d-flex gap-2 fs-6 fw-normal">
              <p>Главная</p>
              <p>/</p>
              <p>Товары</p>
              <p>/</p>
              <p>Новый товар</p>
            </div>
          </div>
          </Modal.Title>
          <Form className=' border border-1 rounded mx-5 my-2 ps-4' style={{ backgroundColor:'white'}}>
            <Button className='btn btn-secondary my-2'  type="bottom">Основные</Button>
            <Form.Group className="mb-3 col-8" controlId="title">
                <Form.Label className='d-flex'>Название <p style={{color:'#F1419D'}}>*</p></Form.Label>              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>
            <div className='d-flex gap-3 '>
            <Form.Group className="mb-3 col-3" controlId="price">
              <Form.Label className='d-flex gap-2'>Бренд <p style={{color:'#F1419D'}}>*</p> <p className='rounded-circle text-center' style={{backgroundColor:'#A4A4BA',width:'23px'}}>?</p></Form.Label>
              <Form.Control
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="ms-5 mb-3 col-4" controlId="brand">
              <Form.Label className='d-flex gap-2'>Артикул производителя <p style={{color:'#F1419D'}}>*</p> <p className='rounded-circle text-center' style={{backgroundColor:'#A4A4BA',width:'23px'}}>?</p></Form.Label>
              <Form.Control
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </Form.Group>
            </div>
            <div className='d-flex gap-3'>
            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="discountPercentage">
              <Form.Label>Цена со скидкой</Form.Label>
              <Form.Control
                type="number"
                value={formData.discountPercentage}
                onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
              />
            </Form.Group>
            </div>
          </Form>
        <Modal.Footer className='d-flex justify-content-center mb-5' style={{backgroundColor:'white'}}>
          <Button variant="success" onClick={handleSave}>Сохранить</Button>
          <Button variant="secondary" onClick={handleClose}>Отмена</Button>
        </Modal.Footer>
            </Col>
        </Row>
      </Container>
      </Modal>
      
    
    
    </div>
  );
};

export default AdminPanel;